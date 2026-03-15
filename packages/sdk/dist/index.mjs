// src/client.ts
var OphilliaClient = class {
  config;
  constructor(config) {
    this.config = config;
  }
  setPreviewToken(token) {
    this.config = { ...this.config, previewToken: token };
  }
  clearPreviewToken() {
    const { previewToken: _, ...rest } = this.config;
    this.config = rest;
  }
  getProjectSlug() {
    return this.config.projectSlug;
  }
  async get(path, params) {
    const url = new URL(`${this.config.apiUrl}${path}`);
    if (params) {
      for (const [key, value] of Object.entries(params)) {
        url.searchParams.set(key, String(value));
      }
    }
    const headers = {
      "Content-Type": "application/json",
      "X-API-Key": this.config.apiKey
    };
    if (this.config.previewToken) {
      headers["X-Preview-Token"] = this.config.previewToken;
    }
    const response = await fetch(url.toString(), { headers });
    if (!response.ok) {
      const body = await response.json().catch(() => ({}));
      const err = {
        code: `HTTP_${response.status}`,
        message: (body == null ? void 0 : body.message) ?? response.statusText,
        details: body
      };
      throw err;
    }
    return response.json();
  }
};
var _client = null;
function getClient() {
  if (!_client) {
    throw new Error(
      "Ophillia SDK not initialized. Call ophillia.init({ apiUrl, apiKey, projectSlug }) first."
    );
  }
  return _client;
}
function createClient(config) {
  _client = new OphilliaClient(config);
  return _client;
}
function _resetClient() {
  _client = null;
}

// src/pages.ts
var pages = {
  /**
   * List all pages for the current project.
   */
  async list(filters = {}) {
    const client = getClient();
    const params = {
      filter: `project_id.slug="${client.getProjectSlug()}"`,
      perPage: filters.perPage ?? 50,
      page: filters.page ?? 1
    };
    if (filters.status) {
      params.filter = `${params.filter} && status="${filters.status}"`;
    }
    if (filters.sort) {
      params.sort = filters.sort;
    }
    const result = await client.get(
      "/api/collections/pages/records",
      params
    );
    return result.items;
  },
  /**
   * Get a single page by its slug.
   */
  async getBySlug(slug) {
    const client = getClient();
    const result = await client.get(
      "/api/collections/pages/records",
      {
        filter: `slug="${slug}" && project_id.slug="${client.getProjectSlug()}"`,
        perPage: 1
      }
    );
    if (!result.items.length) {
      const err = {
        code: "NOT_FOUND",
        message: `Page with slug "${slug}" not found.`
      };
      throw err;
    }
    return result.items[0];
  },
  /**
   * Get all sections belonging to a page, ordered by their `order` field.
   */
  async getSections(pageId, filters = {}) {
    const client = getClient();
    const params = {
      filter: `page_id="${pageId}"`,
      sort: "order",
      perPage: filters.perPage ?? 100,
      page: filters.page ?? 1
    };
    if (filters.status) {
      params.filter = `${params.filter} && status="${filters.status}"`;
    }
    const result = await client.get(
      "/api/collections/sections/records",
      params
    );
    return result.items;
  }
};

// src/sections.ts
var sections = {
  /**
   * Get all sections of a specific schema type (identified by schema slug).
   */
  async getByType(schemaSlug, filters = {}) {
    const client = getClient();
    const params = {
      filter: `schema_id.slug="${schemaSlug}" && schema_id.project_id.slug="${client.getProjectSlug()}"`,
      sort: "order",
      perPage: filters.perPage ?? 100,
      page: filters.page ?? 1
    };
    if (filters.status) {
      params.filter = `${params.filter} && status="${filters.status}"`;
    }
    const result = await client.get(
      "/api/collections/sections/records",
      params
    );
    return result.items;
  }
};

// src/schema.ts
var schema = {
  /**
   * Get the current schema version for the project.
   * Returns the highest version number across all schemas.
   */
  async getVersion() {
    const client = getClient();
    const result = await client.get(
      "/api/collections/section_schemas/records",
      {
        filter: `project_id.slug="${client.getProjectSlug()}"`,
        sort: "-version",
        perPage: 1
      }
    );
    if (!result.items.length) return 0;
    return result.items[0].version;
  },
  /**
   * Validate a section's data against its schema definition.
   * This is client-side validation — does not make a write request.
   */
  async validate(section) {
    const client = getClient();
    const schemaResult = await client.get(
      `/api/collections/section_schemas/records/${section.schema_id}`
    );
    return validateAgainstSchema(section.data, schemaResult.fields_schema);
  }
};
function validateAgainstSchema(data, fields) {
  const errors = [];
  for (const field of fields) {
    const value = data[field.name];
    if (field.required && (value === void 0 || value === null || value === "")) {
      errors.push({
        field: field.name,
        message: `Field "${field.name}" is required.`,
        code: "REQUIRED"
      });
      continue;
    }
    if (value === void 0 || value === null) continue;
    switch (field.type) {
      case "text":
      case "richtext":
      case "url":
        if (typeof value !== "string") {
          errors.push({ field: field.name, message: `Field "${field.name}" must be a string.`, code: "TYPE_MISMATCH" });
        }
        break;
      case "number":
        if (typeof value !== "number") {
          errors.push({ field: field.name, message: `Field "${field.name}" must be a number.`, code: "TYPE_MISMATCH" });
        }
        break;
      case "boolean":
        if (typeof value !== "boolean") {
          errors.push({ field: field.name, message: `Field "${field.name}" must be a boolean.`, code: "TYPE_MISMATCH" });
        }
        break;
      case "json":
        if (typeof value !== "object") {
          errors.push({ field: field.name, message: `Field "${field.name}" must be an object.`, code: "TYPE_MISMATCH" });
        }
        break;
    }
  }
  return { valid: errors.length === 0, errors };
}

// src/preview.ts
var preview = {
  /**
   * Enable preview mode by attaching the token to all subsequent requests.
   * When preview is active, draft content will be returned by the API.
   */
  enable(token) {
    if (!token || typeof token !== "string" || token.trim() === "") {
      throw new Error("Preview token must be a non-empty string.");
    }
    const client = getClient();
    client.setPreviewToken(token);
  },
  /**
   * Disable preview mode. Subsequent requests will only return published content.
   */
  disable() {
    const client = getClient();
    client.clearPreviewToken();
  }
};

// src/media.ts
var media = {
  /**
   * Resolve the public URL for a stored media file.
   * Constructs the URL from the API base URL and PocketBase's file serving path.
   * @param collectionId - The PocketBase collection ID (usually 'media')
   * @param recordId - The media record ID
   * @param filename - The filename stored in the record
   */
  getUrl(collectionId, recordId, filename) {
    var _a;
    if (!collectionId || !recordId || !filename) {
      throw new Error("collectionId, recordId, and filename are all required to resolve a media URL.");
    }
    const client = getClient();
    const apiUrl = ((_a = client.config) == null ? void 0 : _a.apiUrl) ?? "";
    return `${_getApiUrl()}/api/files/${collectionId}/${recordId}/${filename}`;
  }
};
var _apiUrl = "";
function _setApiUrl(apiUrl) {
  _apiUrl = apiUrl;
}
function _getApiUrl() {
  return _apiUrl;
}

// src/index.ts
var ophillia = {
  /**
   * Initialize the Ophillia SDK. Must be called before any other method.
   *
   * @example
   * ophillia.init({ apiUrl: 'https://api.example.com', apiKey: 'my-key', projectSlug: 'my-project' });
   */
  init(config) {
    if (!config.apiUrl) throw new Error("ophillia.init: apiUrl is required.");
    if (!config.apiKey) throw new Error("ophillia.init: apiKey is required.");
    if (!config.projectSlug) throw new Error("ophillia.init: projectSlug is required.");
    createClient(config);
    _setApiUrl(config.apiUrl);
  },
  pages,
  sections,
  schema,
  preview,
  media,
  /** @internal — For testing only. Reset the SDK singleton. */
  _reset: _resetClient
};
export {
  media,
  ophillia,
  pages,
  preview,
  schema,
  sections
};
