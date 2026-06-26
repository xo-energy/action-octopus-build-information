// src/inputs.js now uses ESM `import`, so vi.mock intercepts @actions/core directly.
// The hoisted getInput spy is shared with the mock factory and survives vi.resetModules().
const { getInput } = vi.hoisted(() => ({ getInput: vi.fn() }));
vi.mock("@actions/core", () => ({ getInput }));

const mockInputs = {
  githubToken: "inputtoken",
  octopusApiKey: "API-input",
  octopusServer: "https://input/",
  octopusEnvironment: "InputEnvironment",
  octopusProject: "InputProject",
  octopusSpace: "InputSpace",
  outputPath: "octopus",
  pushOverwriteMode: "Input",
  pushPackageIds: "InputPackage",
  pushVersion: "0.0.0-input.1",
  versionTagPrefix: "v",
};
const mockEnv = {
  OCTOPUS_CLI_API_KEY: "API-env",
  OCTOPUS_CLI_SERVER: "https://env/",
  OCTOPUS_ENVIRONMENT: "EnvEnvironment",
  OCTOPUS_PROJECT: "EnvProject",
  OCTOPUS_SPACE: "EnvSpace",
};

function mockInputsOnce() {
  getInput
    .mockReturnValueOnce(mockInputs.githubToken)
    .mockReturnValueOnce(mockInputs.octopusApiKey)
    .mockReturnValueOnce(mockInputs.octopusServer)
    .mockReturnValueOnce(mockInputs.octopusEnvironment)
    .mockReturnValueOnce(mockInputs.octopusProject)
    .mockReturnValueOnce(mockInputs.octopusSpace)
    .mockReturnValueOnce(mockInputs.outputPath)
    .mockReturnValueOnce(mockInputs.pushOverwriteMode)
    .mockReturnValueOnce(mockInputs.pushPackageIds)
    .mockReturnValueOnce(mockInputs.pushVersion)
    .mockReturnValueOnce(mockInputs.versionTagPrefix);
}

describe("inputs", () => {
  const savedEnv = { ...process.env };

  let inputs;

  beforeEach(() => {
    vi.resetModules();
    getInput.mockReset();

    process.env = { ...savedEnv };

    // ensure our test enviornment variables don't leak from the host environment
    Object.keys(mockEnv).forEach((key) => delete process.env[key]);
  });

  test("getInput calls match action.yml", async () => {
    const { readFileSync } = await import("node:fs");
    const { load: loadYaml } = await import("js-yaml");

    // parse the action.yml file and generate a list of the inputs expected
    const action = loadYaml(readFileSync("action.yml"));
    const actionInputs = Object.entries(action.inputs).map(([key, value]) => {
      const args = [key];
      if (value.required) args.push({ required: true });
      return args;
    });

    inputs = (await import("../src/inputs.js")).default;
    expect(getInput.mock.calls).toEqual(actionInputs);
  });

  describe("when missing", () => {
    beforeEach(async () => {
      inputs = (await import("../src/inputs.js")).default;
    });

    test("has default value: octopusEnvironment", () => {
      expect(inputs.octopusEnvironment).toStrictEqual("Production");
    });

    test("is undefined: githubToken", () => {
      expect(inputs.githubToken).toBeUndefined();
    });
    test("is undefined: octopusApiKey", () => {
      expect(inputs.octopusApiKey).toBeUndefined();
    });
    test("is undefined: octopusServer", () => {
      expect(inputs.octopusServer).toBeUndefined();
    });
    test("is undefined: octopusProject", () => {
      expect(inputs.octopusProject).toBeUndefined();
    });
    test("is undefined: octopusSpace", () => {
      expect(inputs.octopusSpace).toBeUndefined();
    });
    test("is undefined: outputPath", () => {
      expect(inputs.outputPath).toBeUndefined();
    });
    test("is undefined: pushOverwriteMode", () => {
      expect(inputs.pushOverwriteMode).toBeUndefined();
    });
    test("is empty: pushPackageIds", () => {
      expect(inputs.pushPackageIds).toEqual([]);
    });
    test("is undefined: pushVersion", () => {
      expect(inputs.pushVersion).toBeUndefined();
    });
    test("is undefined: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toBeUndefined();
    });
  });

  describe("when env is provided", () => {
    beforeEach(async () => {
      ({ ...process.env } = mockEnv);
      inputs = (await import("../src/inputs.js")).default;
    });

    test("has env value: octopusApiKey", () => {
      expect(inputs.octopusApiKey).toStrictEqual(mockEnv.OCTOPUS_CLI_API_KEY);
    });
    test("has env value: octopusServer", () => {
      expect(inputs.octopusServer).toStrictEqual(mockEnv.OCTOPUS_CLI_SERVER);
    });
    test("has env value: octopusEnvironment", () => {
      expect(inputs.octopusEnvironment).toStrictEqual(mockEnv.OCTOPUS_ENVIRONMENT);
    });
    test("has env value: octopusProject", () => {
      expect(inputs.octopusProject).toStrictEqual(mockEnv.OCTOPUS_PROJECT);
    });
    test("has env value: octopusSpace", () => {
      expect(inputs.octopusSpace).toStrictEqual(mockEnv.OCTOPUS_SPACE);
    });

    test("is undefined: githubToken", () => {
      expect(inputs.githubToken).toBeUndefined();
    });
    test("is undefined: outputPath", () => {
      expect(inputs.outputPath).toBeUndefined();
    });
    test("is undefined: pushOverwriteMode", () => {
      expect(inputs.pushOverwriteMode).toBeUndefined();
    });
    test("is empty: pushPackageIds", () => {
      expect(inputs.pushPackageIds).toEqual([]);
    });
    test("is undefined: pushVersion", () => {
      expect(inputs.pushVersion).toBeUndefined();
    });
    test("is undefined: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toBeUndefined();
    });
  });

  describe("when input is provided", () => {
    beforeEach(async () => {
      mockInputsOnce();
      inputs = (await import("../src/inputs.js")).default;
    });

    test("has input value: githubToken", () => {
      expect(inputs.githubToken).toStrictEqual(mockInputs.githubToken);
    });
    test("has input value: octopusApiKey", () => {
      expect(inputs.octopusApiKey).toStrictEqual(mockInputs.octopusApiKey);
    });
    test("has input value: octopusServer", () => {
      expect(inputs.octopusServer).toStrictEqual(mockInputs.octopusServer);
    });
    test("has input value: octopusEnvironment", () => {
      expect(inputs.octopusEnvironment).toStrictEqual(mockInputs.octopusEnvironment);
    });
    test("has input value: octopusProject", () => {
      expect(inputs.octopusProject).toStrictEqual(mockInputs.octopusProject);
    });
    test("has input value: octopusSpace", () => {
      expect(inputs.octopusSpace).toStrictEqual(mockInputs.octopusSpace);
    });
    test("has input value: outputPath", () => {
      expect(inputs.outputPath).toStrictEqual(mockInputs.outputPath);
    });
    test("has input value: pushOverwriteMode", () => {
      expect(inputs.pushOverwriteMode).toStrictEqual(mockInputs.pushOverwriteMode);
    });
    test("has input value: pushPackageIds", () => {
      expect(inputs.pushPackageIds).toStrictEqual([mockInputs.pushPackageIds]);
    });
    test("has input value: pushVersion", () => {
      expect(inputs.pushVersion).toStrictEqual(mockInputs.pushVersion);
    });
    test("has input value: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toStrictEqual(mockInputs.versionTagPrefix);
    });
  });

  describe("when input and env are provided", () => {
    beforeEach(async () => {
      mockInputsOnce();
      ({ ...process.env } = mockEnv);
      inputs = (await import("../src/inputs.js")).default;
    });

    test("has input value: githubToken", () => {
      expect(inputs.githubToken).toStrictEqual(mockInputs.githubToken);
    });
    test("has input value: octopusApiKey", () => {
      expect(inputs.octopusApiKey).toStrictEqual(mockInputs.octopusApiKey);
    });
    test("has input value: octopusServer", () => {
      expect(inputs.octopusServer).toStrictEqual(mockInputs.octopusServer);
    });
    test("has input value: octopusEnvironment", () => {
      expect(inputs.octopusEnvironment).toStrictEqual(mockInputs.octopusEnvironment);
    });
    test("has input value: octopusProject", () => {
      expect(inputs.octopusProject).toStrictEqual(mockInputs.octopusProject);
    });
    test("has input value: octopusSpace", () => {
      expect(inputs.octopusSpace).toStrictEqual(mockInputs.octopusSpace);
    });
    test("has input value: outputPath", () => {
      expect(inputs.outputPath).toStrictEqual(mockInputs.outputPath);
    });
    test("has input value: pushOverwriteMode", () => {
      expect(inputs.pushOverwriteMode).toStrictEqual(mockInputs.pushOverwriteMode);
    });
    test("has input value: pushPackageIds", () => {
      expect(inputs.pushPackageIds).toStrictEqual([mockInputs.pushPackageIds]);
    });
    test("has input value: pushVersion", () => {
      expect(inputs.pushVersion).toStrictEqual(mockInputs.pushVersion);
    });
    test("has input value: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toStrictEqual(mockInputs.versionTagPrefix);
    });
  });
});
