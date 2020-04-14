# GitHub Action - Octopus Build Information

This GitHub Action (written in JavaScript) generates a JSON build information file for Octopus Deploy. Optionally, it can also query the Octopus Deploy API to detect the previously-deployed release and generate a list of commits since.

## Usage

### Inputs

- `octopus-api-key`: Authentication key for the Octopus Deploy API. Required when `octopus-project` is present. Can also be set via the environment variable `OCTOPUS_CLI_API_KEY`.
- `octopus-server`: URL of the Octopus Deploy server. Required when `octopus-project` is present. Can also be set via the environment variable `OCTOPUS_CLI_SERVER`.
- `octopus-environment`: Use the previous release deployed to this environment to generate commit history. Defaults to "Production". Can also be set via the environment variable `OCTOPUS_ENVIRONMENT`.
- `octopus-project`: Name of the Octopus Deploy project to query for the previous deployment. When this is set, you must also provide `octopus-api-key` and `octopus-server`. Can also be set via the environment variable `OCTOPUS_PROJECT`.
- `octopus-space`: Name of the Octopus Deploy space that contains `octopus-project`. Defaults to the default space. Can also be set via the environment variable `OCTOPUS_SPACE`.
- `output`: Path of the output file. Defaults to `buildInformation.json`.
- `version-tag-prefix`: Prefix for release version tags, used to probe for a GitHub release tag when the previous Octopus Deploy deployment metadata contains a version number but not a commit SHA. Defaults to `v`.

The inputs `octopus-environment`, `octopus-project`, and `octopus-space` accept names ("My Project"), slugs ("my-project"), and hyphenated Octopus IDs ("Projects-1").
