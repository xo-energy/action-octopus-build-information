const core = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const fp = require("lodash/fp");
const fs = require("fs").promises;
const nodeFetch = require("node-fetch");
const { join: joinPath } = require("path");
const { URL } = require("url");

const inputs = require("./inputs");
const { memoizeAsync } = require("./util");

/**
 * Make an HTTP request to the Octopus Deploy API.
 * @param {?string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} resource the API resource path
 * @param {object} options request options
 * @param {string} options.method HTTP request method
 * @param {object} options.headers HTTP request headers
 * @param {object} [params={}] HTTP query parameters
 * @returns {Promise<object>} de-serialized response JSON
 */
async function octopusRequest(spaceId, resource, options, params = {}) {
  if (!inputs.octopusApiKey) throw new Error("Missing required input: octopus_api_key");
  if (!inputs.octopusServer) throw new Error("Missing required input: octopus_server");

  const url = spaceId
    ? new URL(`/api/${spaceId}/${resource}`, inputs.octopusServer)
    : new URL(`/api/${resource}`, inputs.octopusServer);
  url.search = new URLSearchParams(params);

  // deep-merge defaults with passed-in options
  const merged = fp.merge(
    {
      method: "GET",
      headers: {
        "X-Octopus-ApiKey": inputs.octopusApiKey,
      },
    },
    options
  );
  core.debug(`Octopus Deploy API request ${merged.method} ${url}`);

  // send the request
  const response = await nodeFetch(url, merged);
  core.debug(
    // eslint-disable-next-line prettier/prettier
    `Octopus Deploy API response ${response.status} ${response.statusText} ${response.headers.get("content-type")}`
  );
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

/**
 * Make an HTTP GET request to the Octopus Deploy API.
 * @param {?string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} resource the API resource path
 * @param {object} [params={}] HTTP query parameters
 * @returns {Promise<object>} de-serialized response JSON
 */
async function octopusGet(spaceId, resource, params = {}) {
  return octopusRequest(spaceId, resource, { method: "GET" }, params);
}

/**
 * Tests whether any of item.Name, item.Id, or item.Slug matches search.
 * @param {object} item an Octopus Deploy API response item
 * @param {string} search search term
 */
function octopusFuzzyMatch(item, search) {
  return item.Name === search || item.Id === search || item.Slug === search;
}

/**
 * Queries the Octopus Deploy API for a space.
 * @param {?string} spaceName the name, id, or slug of the space, or null to find the default space
 * @returns {Promise<object>} de-serialized response JSON
 */
const getOctopusSpace = memoizeAsync(async (spaceName) => {
  const payload = await octopusGet(null, "spaces/all");

  const space = spaceName
    ? payload.find((item) => octopusFuzzyMatch(item, spaceName))
    : payload.find((item) => item.IsDefault);
  if (!space) {
    throw new Error(`No space named '${spaceName || "Default"}' was found`);
  }

  return space;
});

/**
 * Discover the previous release's SHA by querying the Octopus Deploy API.
 * @param {GitHub} github an authenticated octokit REST client
 * @returns {Promise<string>} the SHA of the previous release, or undefined
 */
async function getPreviousRef(github) {
  let space;
  let project;
  let environment;
  let deployment;

  // without a project name, give up immediately
  if (!inputs.octopusProject) {
    core.info("Octopus project name undefined; skipping commits detection");
    return undefined;
  }

  // fetch the space
  try {
    space = await getOctopusSpace(inputs.octopusSpace);
    core.info(`Detected Octopus space ${space.Name} (${space.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus space: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus project
  try {
    const payload = await octopusGet(space.Id, `projects/all`);

    // allow project to match name, slug, or id
    project = payload.find((item) => octopusFuzzyMatch(item, inputs.octopusProject));
    if (!project) {
      throw new Error(`No project named '${inputs.octopusProject}' was found`);
    }
    core.info(`Detected Octopus project ${project.Name} (${project.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus project: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus environments and find ours
  try {
    const payload = await octopusGet(space.Id, "environments/all");

    // fall back to the last environment in the sort order
    environment =
      payload.find((item) => octopusFuzzyMatch(item, inputs.octopusEnvironment)) ||
      payload[payload.length - 1];
    core.info(`Detected Octopus environment ${environment.Name} (${environment.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus environments: ${e.message}`);
    return undefined;
  }

  // fetch the most recent Octopus deployment for this project and environment
  try {
    const payload = await octopusGet(space.Id, "deployments", {
      take: 1,
      projects: project.Id,
      environments: environment.Id,
      taskState: "Success",
    });

    // there should be 0 or 1 deployments in the payload
    if (payload.TotalResults < 1) {
      core.info("No previous Octopus deployment found");
      return undefined;
    }
    deployment = payload.Items[0];
    core.info(`Detected latest Octopus deployment ${deployment.Id} @ ${deployment.Created}`);
  } catch (e) {
    core.warning(`Failed to fetch previous Octopus deployment: ${e.message}`);
    return undefined;
  }

  // we're looking for the "Changes" in this deployment
  if (deployment.Changes.length < 1) {
    core.warning("Deployment does not contain any changes");
    return undefined;
  }

  // find a BuildInformation object matching one of our push packages
  const buildInformationSequence = fp.flatMap(
    (x) => x.BuildInformation,
    fp.reverse(deployment.Changes)
  );
  const buildInformationForPackage = fp.head(
    fp.filter(
      (x) => x.VcsCommitNumber && inputs.pushPackageIds.includes(x.PackageId),
      buildInformationSequence
    )
  );

  // use that one, if we found one, or if not look for any
  const buildInformation =
    buildInformationForPackage ||
    fp.head(fp.filter((x) => x.VcsCommitNumber, buildInformationSequence));

  // success! use this commit as the previous version
  if (buildInformation) {
    core.info(`Detected previous build @ ${buildInformation.VcsCommitNumber}`);
    return buildInformation.VcsCommitNumber;
  }

  // try using the last version number (changes appear to be in sequential order)
  const version = fp.last(
    fp.filter(
      fp.identity,
      fp.map((x) => x.Version, deployment.Changes)
    )
  );
  if (!version) {
    core.warning("Deployment does not contain any build information");
    return undefined;
  }

  // we found a version, see if there is a matching tag on GitHub
  core.info(`Detected previous version ${version}, looking for a matching tag...`);
  try {
    const tag = `${inputs.versionTagPrefix}${version}`;
    const response = await github.rest.git.getRef({
      owner: context.repo.owner,
      repo: context.repo.repo,
      ref: `tags/${tag}`,
    });
    core.info(`Mapped tag ${tag} to ${response.data.object.sha}`);
    return response.data.object.sha;
  } catch (e) {
    core.warning(`Failed to fetch ref: ${e.message}`);
    return undefined;
  }
}

/**
 * Get the commits since a base commit.
 * @param {GitHub} github an authenticated octokit REST client
 * @param {string} base the SHA of the base commit
 * @returns {Promise<array>} an array of commit objects
 */
async function getCommits(github, base) {
  if (!base) return [];

  // compare commits with pagination
  let commits = [];
  try {
    const request = github.rest.repos.compareCommits.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      base,
      head: context.sha,
    });
    // eslint-disable-next-line no-restricted-syntax
    for await (const response of github.paginate.iterator(request)) {
      commits = commits.concat(response.data.commits);
    }
  } catch (e) {
    core.warning(`Failed to compare commits: ${e.message}`);
  }

  return commits;
}

/**
 * Push build information to the Octopus Deploy API.
 * @param {string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
 * @param {string} packageId the package ID
 * @param {string} version the package version
 * @param {object} buildInformation the build information
 * @param {string} overwriteMode action to take when the build information already exists
 * @returns {Promise<object>} the de-serialized response JSON
 */
async function pushBuildInformation(spaceId, packageId, version, buildInformation, overwriteMode) {
  const payload = {
    PackageId: packageId,
    Version: version,
    OctopusBuildInformation: buildInformation,
  };
  const options = {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  };
  core.info(`Pushing build information for ${packageId} version ${version}`);
  return octopusRequest(spaceId, "build-information", options, { overwriteMode });
}

async function run() {
  try {
    const github = getOctokit(inputs.githubToken);
    const previousRef = await getPreviousRef(github);

    // compare the previous release to the current tag
    const commits = await getCommits(github, previousRef);
    core.info(`Collected ${commits.length} commits`);

    // detect branch name
    let branch = null;
    if (context.ref.startsWith("refs/heads/")) {
      branch = context.ref.substring("refs/heads/".length);
    }

    // construct build information
    const repoUri = `https://github.com/${context.repo.owner}/${context.repo.repo}`;
    const runId = process.env.GITHUB_RUN_ID;
    const build = {
      BuildEnvironment: "GitHub Actions",
      BuildNumber: runId.toString(),
      BuildUrl: `${repoUri}/actions/runs/${runId}`,
      Branch: branch,
      VcsType: "Git",
      VcsRoot: `${repoUri}.git`,
      VcsCommitNumber: context.sha,
      Commits: commits.map((item) => ({
        Id: item.sha,
        Comment: item.commit.message,
      })),
    };

    // create the output directory
    let outputFile;
    if (inputs.outputPath) {
      core.debug(`Creating output directory '${inputs.outputPath}'`);
      await fs.mkdir(inputs.outputPath, { recursive: true });

      outputFile = joinPath(inputs.outputPath, "buildInformation.json");
    }

    // write to a file
    if (outputFile) {
      core.info(`Writing build information to ${outputFile}`);
      await fs.writeFile(outputFile, JSON.stringify(build));
    }

    // push build information to the server
    if (inputs.pushPackageIds.length > 0) {
      if (!inputs.pushVersion) throw new Error("Missing required input push_version");
      const versionRefPattern = new RegExp(`^refs/tags/(?:${inputs.versionTagPrefix})?`);
      const version = inputs.pushVersion.trim().replace(versionRefPattern, "");
      const writes = [];

      // get the Octopus space
      const { Id: spaceId } = await getOctopusSpace(inputs.octopusSpace);

      // push build information for each package in sequence, pipeline the response writes
      for (let i = 0; i < inputs.pushPackageIds.length; ++i) {
        const packageId = inputs.pushPackageIds[i];

        // eslint-disable-next-line no-await-in-loop
        const response = await pushBuildInformation(
          spaceId,
          packageId,
          version,
          build,
          inputs.pushOverwriteMode
        );

        // write response to a file
        if (inputs.outputPath) {
          const packageIdSanitized = packageId.replace(/[^\w.-]+/g, "_");
          const responsePath = joinPath(
            inputs.outputPath,
            `buildInformationMapped-${packageIdSanitized}.json`
          );

          core.info(`Writing mapped build information response to ${responsePath}`);
          writes.push(fs.writeFile(responsePath, JSON.stringify(response)));
        }
      }

      await Promise.all(writes);
    }

    // outputs
    if (outputFile) core.setOutput("output_file", outputFile);
    if (previousRef) core.setOutput("previous_release_sha", previousRef);
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
