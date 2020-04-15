# GitHub Action - Octopus Build Information

This GitHub Action (written in JavaScript) generates a JSON build information file for Octopus Deploy. Optionally, it can also query the Octopus Deploy API to detect the previously-deployed release and generate a list of commits since.

## Usage

### Inputs

- `github_token`: GitHub personal access token. Used get commit history from the repository. Defaults to the token provided by the workflow run.
- `octopus_api_key`: Authentication key for the Octopus Deploy API. Required when `octopus_project` is present. Can also be set via the environment variable `OCTOPUS_CLI_API_KEY`.
- `octopus_server`: URL of the Octopus Deploy server. Required when `octopus_project` is present. Can also be set via the environment variable `OCTOPUS_CLI_SERVER`.
- `octopus_environment`: Use the previous release deployed to this environment to generate commit history. Defaults to "Production". Can also be set via the environment variable `OCTOPUS_ENVIRONMENT`.
- `octopus_project`: Name of the Octopus Deploy project to query for the previous deployment. When this is set, you must also provide `octopus_api_key` and `octopus_server`. Can also be set via the environment variable `OCTOPUS_PROJECT`.
- `octopus_space`: Name of the Octopus Deploy space that contains `octopus_project`. Defaults to the default space. Can also be set via the environment variable `OCTOPUS_SPACE`.
- `output`: Path of the output file. Defaults to `buildInformation.json`.
- `version_tag_prefix`: Prefix for release version tags, used to probe for a GitHub release tag when the previous Octopus Deploy deployment metadata contains a version number but not a commit SHA. Defaults to `v`.

The inputs `octopus_environment`, `octopus_project`, and `octopus_space` accept names ("My Project"), slugs ("my-project"), and hyphenated Octopus IDs ("Projects-1").
