/* eslint-disable global-require */
jest.mock("@actions/core");
jest.unmock("../src/inputs");

const mockInputs = {
  githubToken: "inputtoken",
  octopusApiKey: "API-input",
  octopusServer: "https://input/",
  octopusEnvironment: "InputEnvironment",
  octopusProject: "InputProject",
  octopusSpace: "InputSpace",
  output: "output.json",
  versionTagPrefix: "v",
};
const mockEnv = {
  OCTOPUS_CLI_API_KEY: "API-env",
  OCTOPUS_CLI_SERVER: "https://env/",
  OCTOPUS_ENVIRONMENT: "EnvEnvironment",
  OCTOPUS_PROJECT: "EnvProject",
  OCTOPUS_SPACE: "EnvSpace",
};

describe("inputs", () => {
  const savedEnv = { ...process.env };

  let core;
  let inputs;

  beforeEach(() => {
    jest.resetModules();

    core = require("@actions/core");
    process.env = { ...savedEnv };
  });

  describe("when missing", () => {
    beforeEach(() => {
      inputs = require("../src/inputs");
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
    test("is undefined: output", () => {
      expect(inputs.output).toBeUndefined();
    });
    test("is undefined: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toBeUndefined();
    });
  });

  describe("when env is provided", () => {
    beforeEach(() => {
      ({ ...process.env } = mockEnv);
      inputs = require("../src/inputs");
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
    test("is undefined: output", () => {
      expect(inputs.output).toBeUndefined();
    });
    test("is undefined: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toBeUndefined();
    });
  });

  describe("when input is provided", () => {
    beforeEach(() => {
      core.getInput = jest
        .fn()
        .mockReturnValueOnce(mockInputs.githubToken)
        .mockReturnValueOnce(mockInputs.octopusApiKey)
        .mockReturnValueOnce(mockInputs.octopusServer)
        .mockReturnValueOnce(mockInputs.octopusEnvironment)
        .mockReturnValueOnce(mockInputs.octopusProject)
        .mockReturnValueOnce(mockInputs.octopusSpace)
        .mockReturnValueOnce(mockInputs.output)
        .mockReturnValueOnce(mockInputs.versionTagPrefix);
      inputs = require("../src/inputs");
    });

    test("getInput called with expected args", () => {
      expect(core.getInput.mock.calls).toEqual([
        ["github_token", { required: true }],
        ["octopus_api_key"],
        ["octopus_server"],
        ["octopus_environment"],
        ["octopus_project"],
        ["octopus_space"],
        ["output", { required: true }],
        ["version_tag_prefix", { required: true }],
      ]);
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
    test("has input value: output", () => {
      expect(inputs.output).toStrictEqual(mockInputs.output);
    });
    test("has input value: versionTagPrefix", () => {
      expect(inputs.versionTagPrefix).toStrictEqual(mockInputs.versionTagPrefix);
    });
  });

  describe("when input and env are provided", () => {
    beforeEach(() => {
      core.getInput = jest
        .fn()
        .mockReturnValueOnce(mockInputs.githubToken)
        .mockReturnValueOnce(mockInputs.octopusApiKey)
        .mockReturnValueOnce(mockInputs.octopusServer)
        .mockReturnValueOnce(mockInputs.octopusEnvironment)
        .mockReturnValueOnce(mockInputs.octopusProject)
        .mockReturnValueOnce(mockInputs.octopusSpace)
        .mockReturnValueOnce(mockInputs.output)
        .mockReturnValueOnce(mockInputs.versionTagPrefix);
      ({ ...process.env } = mockEnv);
      inputs = require("../src/inputs");
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
  });
});
