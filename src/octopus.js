const core = require("@actions/core");
const fp = require("lodash/fp");
const nodeFetch = require("node-fetch");
const { URL } = require("url");

const { memoizeAsync } = require("./util");

/**
 * Tests whether any of item.Name, item.Id, or item.Slug matches search.
 * @param {object} item an Octopus Deploy API response item
 * @param {string} search search term
 */
function octopusFuzzyMatch(item, search) {
  return item.Name === search || item.Id === search || item.Slug === search;
}

/**
 * Client for the Octopus Deploy API.
 */
class OctopusClient {
  #octopusApiKey;
  #octopusServer;

  /**
   * Initializes a new instance of OctopusClient.
   * @param {string} octopusApiKey the API key to use to authenticate requests
   * @param {string} octopusServer the URL of the Octopus Deploy server
   */
  constructor(octopusApiKey, octopusServer) {
    this.#octopusApiKey = octopusApiKey;
    this.#octopusServer = octopusServer;

    // cache spaces
    this.getSpace = memoizeAsync(this.getSpace);
  }

  /**
   * Make an HTTP request to the Octopus Deploy API.
   * @param {URL} url the request URL
   * @param {object} options request options
   * @param {string} options.method HTTP request method
   * @param {object} options.headers HTTP request headers
   * @returns {Promise<object>} de-serialized response JSON
   */
  async sendRequest(url, options) {
    const absoluteUrl = new URL(url, this.#octopusServer);

    // deep-merge defaults with passed-in options
    const merged = fp.merge(
      {
        method: "GET",
        headers: {
          "X-Octopus-ApiKey": this.#octopusApiKey,
        },
      },
      options
    );
    core.debug(`Octopus Deploy API request ${merged.method} ${absoluteUrl}`);

    // send the request
    const response = await nodeFetch(absoluteUrl, merged);
    core.debug(
      // eslint-disable-next-line prettier/prettier
      `Octopus Deploy API response ${response.status} ${response.statusText} ${response.headers.get("content-type")}`
    );
    if (response.ok) return response.json();
    throw new Error(response.statusText);
  }

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
  async sendResourceRequest(spaceId, resource, options, params = {}) {
    const url = spaceId
      ? new URL(`/api/${spaceId}/${resource}`, this.#octopusServer)
      : new URL(`/api/${resource}`, this.#octopusServer);
    url.search = new URLSearchParams(params);

    return this.sendRequest(url, options);
  }

  /**
   * Make an HTTP GET request for the next page in an Octopus Deploy collection
   * @param {object} payload the response JSON from the previous request
   * @returns {Promise<object>} de-serialized response JSON
   */
  async sendPageNextRequest(payload) {
    if (!payload.Links) return null;
    const link = payload.Links["Page.Next"];
    if (!link) return null;
    const url = new URL(link, this.#octopusServer);
    return this.sendRequest(url, { method: "GET" });
  }

  /**
   * Gets a collection of Octopus Deploy resources with pagination.
   * @param {?string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
   * @param {string} resource the API resource path
   * @param {object} [params={}] HTTP query parameters
   * @returns {Promise<object>} de-serialized response JSON
   */
  async *getResourceCollection(spaceId, resource, params = {}) {
    let payload = await this.sendResourceRequest(spaceId, resource, { method: "GET" }, params);
    do {
      for (const item of payload.Items) {
        yield item;
      }

      // look for pagination
      // eslint-disable-next-line no-await-in-loop
      payload = await this.sendPageNextRequest(payload);
    } while (payload);
  }

  /**
   * Queries the Octopus Deploy API for an environment, defaulting to the last one in the list.
   * @param {string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
   * @param {string} environmentName the name, id, or slug of the environment
   * @returns {Promise<object>} de-serialized response JSON
   */
  async getEnvironmentOrDefault(spaceId, environmentName) {
    let item;

    for await (item of this.getResourceCollection(spaceId, "environments")) {
      if (octopusFuzzyMatch(item, environmentName)) {
        return item;
      }
    }

    // fall back to the last environment in the sort order
    if (item) {
      return item;
    }

    throw new Error(`No environments found!`);
  }

  /**
   * Queries the Octopus Deploy API for the most recent deployment of a project.
   * @param {string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
   * @param {string} projectId the Octopus ID of the project (e.g. 'Projects-1')
   * @param {string} environmentId the Octopus ID of the environment (e.g. 'Environments-1')
   * @returns {Promise<object>} the most recent deployment to the specified environment
   */
  async getLastDeployment(spaceId, projectId, environmentId) {
    const payload = await this.sendResourceRequest(
      spaceId,
      "deployments",
      { method: "GET" },
      {
        take: 1,
        projects: projectId,
        environments: environmentId,
        taskState: "Success",
      }
    );

    // there should be 0 or 1 deployments in the payload
    if (payload.TotalResults < 1) {
      return undefined;
    }

    return payload.Items[0];
  }

  /**
   * Queries the Octopus Deploy API for a project.
   * @param {string} spaceId the Octopus ID of the space (e.g. 'Spaces-1')
   * @param {string} projectName the name, id, or slug of the project
   * @returns {Promise<object>} de-serialized response JSON
   */
  async getProject(spaceId, projectName) {
    for await (const item of this.getResourceCollection(spaceId, "projects")) {
      if (octopusFuzzyMatch(item, projectName)) {
        return item;
      }
    }

    // if we ran out of pages without finding it, give up
    throw new Error(`No project named '${projectName}' was found`);
  }

  /**
   * Queries the Octopus Deploy API for a space.
   * @param {?string} spaceName the name, id, or slug of the space, or null to find the default space
   * @returns {Promise<object>} de-serialized response JSON
   */
  async getSpace(spaceName) {
    for await (const item of this.getResourceCollection(null, "spaces")) {
      if (spaceName === null && item.IsDefault) {
        return item;
      }
      if (spaceName !== null && octopusFuzzyMatch(item, spaceName)) {
        return item;
      }
    }

    throw new Error(`No space named '${spaceName || "Default"}' was found`);
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
  async postBuildInformation(spaceId, packageId, version, buildInformation, overwriteMode) {
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
    return this.sendResourceRequest(spaceId, "build-information", options, { overwriteMode });
  }
}

module.exports = { OctopusClient };
