const core = require("@actions/core");
const { defaults, pickBy } = require("lodash");

const inputs = defaults(
  // use specific inputs when set
  pickBy({
    octopusApiKey: core.getInput("octopus_api_key"),
    octopusServer: core.getInput("octopus_server"),
    octopusEnvironment: core.getInput("octopus_environment"),
    octopusProject: core.getInput("octopus_project"),
    octopusSpace: core.getInput("octopus_space"),
    output: core.getInput("output", { required: true }),
    versionTagPrefix: core.getInput("version_tag_prefix", { required: true }),
  }),
  // use environment variables as a fallback
  pickBy({
    octopusApiKey: process.env.OCTOPUS_CLI_API_KEY,
    octopusServer: process.env.OCTOPUS_CLI_SERVER,
    octopusEnvironment: process.env.OCTOPUS_ENVIRONMENT,
    octopusProject: process.env.OCTOPUS_PROJECT,
    octopusSpace: process.env.OCTOPUS_SPACE,
  }),
  // use these explicit defaults
  {
    octopusEnvironment: "Production",
  }
);

module.exports = inputs;
