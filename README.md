# GitHub Action - Octopus Build Information

This GitHub Action (written in JavaScript) generates a JSON build information file for Octopus Deploy. Optionally, it can also query the Octopus Deploy API to detect the previously-deployed release and push the generated build information to the Octopus Deploy server.

## Usage

This repository uses automation to compile and tag releases. Only **tagged releases** contain the compiled `dist` folder required to run the action. Reference the action in your workflow using floating version tags, like `v1` or `v1.1`. These tags are updated every time a GitHub Release is published.

### Inputs

All inputs are optional (or have reasonable default values). However, without inputs, the action does nothing. Enable features by providing the appropriate input. Also, an `octopus_api_key` and `octopus_server` URL are required when either `octopus_project` or `push_package_ids` is set, and `push_version` is required when `push_package_ids` is set.

- `github_token`: GitHub personal access token. Used get commit history from the repository. Defaults to the token provided by the workflow run.
- `octopus_api_key`: Authentication key for the Octopus Deploy API. Can also be set via the environment variable `OCTOPUS_CLI_API_KEY`.
- `octopus_server`: URL of the Octopus Deploy server. Can also be set via the environment variable `OCTOPUS_CLI_SERVER`.
- `octopus_environment`: Use the previous release deployed to this environment to generate commit history. Defaults to "Production" or, if there is no such environment, to the last environment in the space. Can also be set via the environment variable `OCTOPUS_ENVIRONMENT`.
- `octopus_project`: Name of the Octopus Deploy project to query for the previous deployment. Omit to skip querying Octopus Deploy and generating commit history. Can also be set via the environment variable `OCTOPUS_PROJECT`.
- `octopus_space`: Name of the Octopus Deploy space that contains `octopus_project`. Defaults to the default space. Can also be set via the environment variable `OCTOPUS_SPACE`.
- `output_path`: The path to an output directory. When present, this action writes these files:
  - `${output_path}/buildInformation.json`: the build information JSON.
  - `${output_path}/buildInformationMapped-${package_id}.json`: the full, mapped build information returned by the Octopus Deploy server after pushing build information for `${package_id}`.
- `push_overwrite_mode`: Action to take when pushing build information that already exists: **FailIfExists**, **IgnoreIfExists**, or **OverwriteExisting**. Defaults to **FailIfExists**.
- `push_package_ids`: Whitespace-separated list of package IDs. Omit to skip pushing the discovered build information to the Octopus Deploy server.
- `push_version`: Version of the package(s) listed in `push_package_ids`. When the workflow run was triggered by a tag, you may pass the `github.ref`, and the prefix `refs/tags/${version_tag_prefix}` will be stripped.
- `version_tag_prefix`: Prefix for release version tags, used to probe for a GitHub release tag when the previous Octopus Deploy deployment metadata contains a version number but not a commit SHA. Defaults to `v`.

The inputs `octopus_environment`, `octopus_project`, and `octopus_space` accept names ("My Project"), slugs ("my-project"), and hyphenated Octopus IDs ("Projects-1").

### Outputs

- `output_file`: The full path to `${output_path}/buildInformation.json`.
- `previous_release_sha`: The commit SHA of the previous release, if one was detected by querying Octopus Deploy for the previous deployment.

### Example Workflow

```yaml
name: Octopus Deploy
on:
  push:
    tags:
      - 'v*'

jobs:
  build:
    runs-on: ubuntu-latest:
    steps:
      - uses: actions/checkout@v2
      - name: Generate Octopus Deploy build information
        uses: xo-energy/action-octopus-build-information@v1
        with:
          octopus_api_key: ${{ secrets.OCTOPUS_CLI_API_KEY }}
          octopus_server: ${{ secrets.OCTOPUS_CLI_SERVER }}
          octopus_project: MyProject
          output_path: octopus
          push_package_ids: MyProject
          push_version: ${{ github.ref }}
```

### Example Output

#### buildInformation.json

```json
{
  "BuildEnvironment": "GitHub Actions",
  "BuildNumber": "12345",
  "BuildUrl": "https://github.com/owner/MyProject/actions/runs/12345",
  "VcsType": "Git",
  "VcsRoot": "https://github.com/owner/MyProject.git",
  "VcsCommitNumber": "579233b2c479241523cba5e3af55d0f50f2d6414",
  "Commits": [
    {
      "Id": "d18b00a2d8c180617dca89074be134ed9a78da03",
      "Comment": "First commit"
    },
    {
      "Id": "579233b2c479241523cba5e3af55d0f50f2d6414",
      "Comment": "Second commit\nfixes #1"
    }
  ]
}
```

#### buildInformationMapped-MyProject.json

```json
{
  "Id": "BuildInformation-1",
  "PackageId": "MyProject",
  "Version": "0.0.1-alpha.1",
  "BuildEnvironment": "GitHub Actions",
  "BuildNumber": "12345",
  "BuildUrl": "https://github.com/owner/MyProject/actions/runs/12345",
  "Branch": "main",
  "VcsType": "Git",
  "VcsRoot": "https://github.com/owner/MyProject.git",
  "VcsCommitNumber": "579233b2c479241523cba5e3af55d0f50f2d6414",
  "VcsCommitUrl": "https://github.com/owner/MyProject/commit/579233b2c479241523cba5e3af55d0f50f2d6414",
  "IssueTrackerName": "GitHub",
  "WorkItems": [
    {
      "Id": "1",
      "LinkUrl": "https://github.com/owner/MyProject/issues/1",
      "LinkText": "Example issue title"
    }
  ],
  "Commits": [
    {
      "Id": "d18b00a2d8c180617dca89074be134ed9a78da03",
      "LinkUrl": "https://github.com/owner/MyProject/commit/d18b00a2d8c180617dca89074be134ed9a78da03",
      "Comment": "First commit"
    },
    {
      "Id": "579233b2c479241523cba5e3af55d0f50f2d6414",
      "LinkUrl": "https://github.com/owner/MyProject/commit/579233b2c479241523cba5e3af55d0f50f2d6414",
      "Comment": "Second commit\nfixes #1"
    }
  ]
}
```
