const core = require("@actions/core");
const { context, GitHub } = require("@actions/github");
const fs = require("fs").promises;
const nodeFetch = require("node-fetch");
const { URL } = require("url");

const inputs = require("./inputs");

async function octopusFetch(spaceId, resource, params = {}) {
  if (!inputs.octopusApiKey) throw new Error("Missing required input: octopus_api_key");
  if (!inputs.octopusServer) throw new Error("Missing required input: octopus_server");

  const url = spaceId
    ? new URL(`/api/${spaceId}/${resource}`, inputs.octopusServer)
    : new URL(`/api/${resource}`, inputs.octopusServer);

  url.search = new URLSearchParams(params);
  core.debug(`Octopus Deploy API request ${url}`);

  const response = await nodeFetch(url, {
    method: "GET",
    headers: {
      "X-Octopus-ApiKey": inputs.octopusApiKey,
    },
  });
  core.debug(
    // eslint-disable-next-line prettier/prettier
    `Octopus Deploy API response ${response.status} ${response.statusText} ${response.headers.get("content-type")}`
  );
  if (response.ok) return response.json();
  throw new Error(response.statusText);
}

function octopusFuzzyMatch(item, search) {
  return item.Name === search || item.Id === search || item.Slug === search;
}

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
    const payload = await octopusFetch(null, "spaces");

    space = inputs.octopusSpace
      ? payload.Items.find((item) => octopusFuzzyMatch(item, inputs.octopusSpace))
      : payload.Items.find((item) => item.IsDefault);
    if (!space) {
      throw new Error(`No space named '${inputs.octopusSpace || "Default"}' was found`);
    }
    core.info(`Detected Octopus space ${space.Name} (${space.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus space: ${e.message}`);
    return undefined;
  }

  // fetch the Octopus project
  try {
    const payload = await octopusFetch(space.Id, `projects`);

    // allow project to match name, slug, or id
    project = payload.Items.find((item) => octopusFuzzyMatch(item, inputs.octopusProject));
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
    const payload = await octopusFetch(space.Id, "environments");

    // fall back to the last environment in the sort order
    environment =
      payload.Items.find((item) => octopusFuzzyMatch(item, inputs.octopusEnvironment)) ||
      payload.Items[payload.Items.length - 1];
    core.info(`Detected Octopus environment ${environment.Name} (${environment.Id})`);
  } catch (e) {
    core.warning(`Failed to fetch Octopus environments: ${e.message}`);
    return undefined;
  }

  // fetch the most recent Octopus deployment for this project and environment
  try {
    const payload = await octopusFetch(space.Id, "deployments", {
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

  // take the first one and the first BuildInformation if there is one
  const changes = deployment.Changes[0];
  if (changes.BuildInformation.length > 0) {
    const build = changes.BuildInformation[0];

    if (build.VcsCommitNumber) {
      core.info(`Detected previous build @ ${build.VcsCommitNumber}`);
      return build.VcsCommitNumber;
    }
  }

  // use the version number to probe for a matching ref
  const version = changes.Version;
  if (!version) {
    core.warning("Deployment does not contain any build information");
    return undefined;
  }

  // we found a version, see if there is a matching tag on GitHub
  core.info(`Detected previous version ${version}, looking for a matching tag...`);
  try {
    const tag = `${inputs.versionTagPrefix}${version}`;
    const response = await github.git.getRef({
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

async function getCommits(github, previousRef) {
  if (!previousRef) return [];

  // compare commits with pagination
  let commits = [];
  try {
    const request = github.repos.compareCommits.endpoint.merge({
      owner: context.repo.owner,
      repo: context.repo.repo,
      base: previousRef,
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
    const github = new GitHub(inputs.githubToken);
    const previousRef = await getPreviousRef(github);

    // compare the previous release to the current tag
    const commits = await getCommits(github, previousRef);
    core.info(`Collected ${commits.length} commits`);

    // construct build information
    const repoUri = `https://github.com/${context.repo.owner}/${context.repo.repo}`;
    const runId = process.env.GITHUB_RUN_ID;
    const build = {
      BuildEnvironment: "GitHub Actions",
      BuildNumber: runId.toString(),
      BuildUrl: `${repoUri}/actions/runs/${runId}`,
      VcsType: "Git",
      VcsRoot: `${repoUri}.git`,
      VcsCommitNumber: context.sha,
      Commits: commits.map((item) => ({
        Id: item.sha,
        Comment: item.commit.message,
      })),
    };

    // write to a file
    const path = core.getInput("output", { required: true });
    core.info(`Writing build information to ${path}`);
    await fs.writeFile(path, JSON.stringify(build));

    // output the previous commit
    if (previousRef) core.setOutput("previous_release_sha", previousRef);
  } catch (e) {
    core.setFailed(e.message);
  }
}

run();
