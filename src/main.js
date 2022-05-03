const core = require("@actions/core");
const { context, getOctokit } = require("@actions/github");
const fp = require("lodash/fp");
const fs = require("fs").promises;
const { join: joinPath } = require("path");

const inputs = require("./inputs");
const { OctopusClient } = require("./octopus");

/**
 * Discover the previous release's SHA by querying the Octopus Deploy API.
 * @param {GitHub} github an authenticated octokit REST client
 * @param {OctopusClient} octopus an authenticated Octopus Deploy API client
 * @returns {Promise<string>} the SHA of the previous release, or undefined
 */
async function getPreviousRef(github, octopus) {
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
    space = await octopus.getSpace(inputs.octopusSpace);
    core.info(`Detected Octopus space ${space.Name} (${space.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus space: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus project
  try {
    project = await octopus.getProject(space.Id, inputs.octopusProject);
    core.info(`Detected Octopus project ${project.Name} (${project.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus project: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus environments and find ours
  try {
    environment = await octopus.getEnvironmentOrDefault(space.Id, inputs.octopusEnvironment);
    core.info(`Detected Octopus environment ${environment.Name} (${environment.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus environments: ${e.message}`);
    return undefined;
  }

  // fetch the most recent Octopus deployment for this project and environment
  try {
    deployment = await octopus.getLastDeployment(space.Id, project.Id, environment.Id);

    if (!deployment) {
      core.info("No previous Octopus deployment found");
      return undefined;
    }

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

async function run() {
  try {
    const github = getOctokit(inputs.githubToken);
    const octopus = new OctopusClient(inputs.octopusApiKey, inputs.octopusServer);
    const previousRef = await getPreviousRef(github, octopus);

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
      const { Id: spaceId } = await octopus.getSpace(inputs.octopusSpace);

      // push build information for each package in sequence, pipeline the response writes
      for (let i = 0; i < inputs.pushPackageIds.length; ++i) {
        const packageId = inputs.pushPackageIds[i];
        core.info(`Pushing build information for ${packageId} version ${version}`);

        // eslint-disable-next-line no-await-in-loop
        const response = await octopus.postBuildInformation(
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
