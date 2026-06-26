// main.js reads @actions/github `context`, @actions/core, and ./inputs at the
// module level; getPreviousRef/getCommits take the octokit client as a param,
// so we pass a mock `github` directly and only mock the module-level deps.
const mockInputs = vi.hoisted(() => ({}));
const context = vi.hoisted(() => ({ repo: {}, sha: "", ref: "" }));
const getOctokit = vi.hoisted(() => vi.fn());

vi.mock("@actions/github", () => ({ context, getOctokit }));
vi.mock("@actions/core", () => ({
  info: vi.fn(),
  warning: vi.fn(),
  debug: vi.fn(),
  setOutput: vi.fn(),
  setFailed: vi.fn(),
  getInput: vi.fn(),
}));
vi.mock("../src/inputs.js", () => ({ default: mockInputs }));
vi.mock("../src/octopus.js", () => ({ OctopusClient: vi.fn() }));

import * as core from "@actions/core";
import { OctopusClient } from "../src/octopus.js";
import { getPreviousRef, getCommits, run } from "../src/main.js";

function makeGithub() {
  return {
    rest: {
      git: { getRef: vi.fn() },
      repos: { compareCommits: { endpoint: { merge: vi.fn() } } },
    },
    paginate: { iterator: vi.fn() },
  };
}

function makeOctopus(overrides = {}) {
  return {
    getSpace: vi.fn().mockResolvedValue({ Id: "Spaces-1", Name: "Space" }),
    getProject: vi.fn().mockResolvedValue({ Id: "Projects-1", Name: "Proj" }),
    getEnvironmentOrDefault: vi.fn().mockResolvedValue({ Id: "Environments-1", Name: "Env" }),
    getLastDeployment: vi.fn().mockResolvedValue(undefined),
    ...overrides,
  };
}

beforeEach(() => {
  vi.resetAllMocks();

  // inputs and context are plain objects read at call time; reset to defaults
  for (const key of Object.keys(mockInputs)) delete mockInputs[key];
  Object.assign(mockInputs, {
    githubToken: "tok",
    octopusApiKey: undefined,
    octopusServer: undefined,
    octopusProject: undefined,
    octopusSpace: undefined,
    octopusEnvironment: "Production",
    outputPath: undefined,
    pushPackageIds: [],
    pushVersion: undefined,
    versionTagPrefix: "v",
  });
  Object.assign(context, {
    repo: { owner: "o", repo: "r" },
    sha: "HEADSHA",
    ref: "refs/heads/main",
  });
});

describe("getCommits", () => {
  test("returns [] when base is falsy, without calling the API", async () => {
    const github = makeGithub();
    expect(await getCommits(github, "")).toEqual([]);
    expect(github.rest.repos.compareCommits.endpoint.merge).not.toHaveBeenCalled();
    expect(github.paginate.iterator).not.toHaveBeenCalled();
  });

  test("merges the compareCommits request and concatenates paginated commits", async () => {
    const github = makeGithub();
    const request = { method: "GET", url: "/compare" };
    github.rest.repos.compareCommits.endpoint.merge.mockReturnValue(request);
    const a = { sha: "a", commit: { message: "first" } };
    const b = { sha: "b", commit: { message: "second" } };
    github.paginate.iterator.mockReturnValue([
      { data: { commits: [a] } },
      { data: { commits: [b] } },
    ]);

    const commits = await getCommits(github, "BASESHA");

    expect(github.rest.repos.compareCommits.endpoint.merge).toHaveBeenCalledWith({
      owner: "o",
      repo: "r",
      base: "BASESHA",
      head: "HEADSHA",
    });
    expect(github.paginate.iterator).toHaveBeenCalledWith(request);
    expect(commits).toEqual([a, b]);
  });

  test("returns [] and warns when pagination fails", async () => {
    const github = makeGithub();
    github.rest.repos.compareCommits.endpoint.merge.mockReturnValue({});
    github.paginate.iterator.mockImplementation(() => {
      throw new Error("boom");
    });

    expect(await getCommits(github, "BASESHA")).toEqual([]);
    expect(core.warning).toHaveBeenCalledWith("Failed to compare commits: boom");
  });
});

describe("getPreviousRef", () => {
  test("returns undefined when no Octopus project is configured", async () => {
    const github = makeGithub();
    const octopus = makeOctopus();

    expect(await getPreviousRef(github, octopus)).toBeUndefined();
    expect(octopus.getSpace).not.toHaveBeenCalled();
    expect(github.rest.git.getRef).not.toHaveBeenCalled();
  });

  test("resolves a deployment version to a tag SHA via github.rest.git.getRef", async () => {
    mockInputs.octopusProject = "Proj";
    const github = makeGithub();
    github.rest.git.getRef.mockResolvedValue({ data: { object: { sha: "TAGSHA" } } });
    const octopus = makeOctopus({
      getLastDeployment: vi.fn().mockResolvedValue({
        Id: "Deployments-1",
        Created: "2026-01-01",
        Changes: [{ BuildInformation: [], Version: "1.2.3" }],
      }),
    });

    const ref = await getPreviousRef(github, octopus);

    expect(github.rest.git.getRef).toHaveBeenCalledWith({
      owner: "o",
      repo: "r",
      ref: "tags/v1.2.3",
    });
    expect(ref).toBe("TAGSHA");
  });

  test("uses the build information commit and does not call getRef", async () => {
    mockInputs.octopusProject = "Proj";
    mockInputs.pushPackageIds = ["pkg"];
    const github = makeGithub();
    const octopus = makeOctopus({
      getLastDeployment: vi.fn().mockResolvedValue({
        Id: "Deployments-1",
        Created: "2026-01-01",
        Changes: [
          {
            BuildInformation: [{ PackageId: "pkg", VcsCommitNumber: "COMMITSHA" }],
            Version: "1.2.3",
          },
        ],
      }),
    });

    const ref = await getPreviousRef(github, octopus);

    expect(ref).toBe("COMMITSHA");
    expect(github.rest.git.getRef).not.toHaveBeenCalled();
  });

  test("returns undefined and warns when getRef fails", async () => {
    mockInputs.octopusProject = "Proj";
    const github = makeGithub();
    github.rest.git.getRef.mockRejectedValue(new Error("not found"));
    const octopus = makeOctopus({
      getLastDeployment: vi.fn().mockResolvedValue({
        Id: "Deployments-1",
        Created: "2026-01-01",
        Changes: [{ BuildInformation: [], Version: "1.2.3" }],
      }),
    });

    expect(await getPreviousRef(github, octopus)).toBeUndefined();
    expect(core.warning).toHaveBeenCalledWith("Failed to fetch ref: not found");
  });

  test("returns undefined when the Octopus space lookup fails", async () => {
    mockInputs.octopusProject = "Proj";
    const github = makeGithub();
    const octopus = makeOctopus({
      getSpace: vi.fn().mockRejectedValue(new Error("nope")),
    });

    expect(await getPreviousRef(github, octopus)).toBeUndefined();
    expect(octopus.getProject).not.toHaveBeenCalled();
    expect(github.rest.git.getRef).not.toHaveBeenCalled();
    expect(core.warning).toHaveBeenCalledWith("Failed to fetch Octopus space: nope");
  });

  test("returns undefined when there is no previous deployment", async () => {
    mockInputs.octopusProject = "Proj";
    const github = makeGithub();
    const octopus = makeOctopus({ getLastDeployment: vi.fn().mockResolvedValue(undefined) });

    expect(await getPreviousRef(github, octopus)).toBeUndefined();
    expect(github.rest.git.getRef).not.toHaveBeenCalled();
  });
});

describe("run", () => {
  test("authenticates with the github token and skips outputs when no project is set", async () => {
    process.env.GITHUB_RUN_ID = "42";
    const github = makeGithub();
    getOctokit.mockReturnValue(github);

    await run();

    expect(getOctokit).toHaveBeenCalledWith("tok");
    expect(OctopusClient).toHaveBeenCalledWith(undefined, undefined);
    expect(core.setFailed).not.toHaveBeenCalled();
    expect(core.setOutput).not.toHaveBeenCalled();

    delete process.env.GITHUB_RUN_ID;
  });
});
