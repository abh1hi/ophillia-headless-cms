interface OphilliaConfig {
    apiUrl: string;
    apiKey: string;
    projectSlug: string;
}
interface Project {
    id: string;
    name: string;
    slug: string;
    api_key: string;
    settings: Record<string, unknown>;
    created: string;
    updated: string;
}
interface SectionSchema {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    version: number;
    fields_schema: FieldSchema[];
    status: 'active' | 'deprecated';
    created: string;
}
interface FieldSchema {
    name: string;
    type: 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'url' | 'select' | 'json';
    required: boolean;
    options?: Record<string, unknown>;
}
interface Page {
    id: string;
    project_id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    version: number;
    meta: PageMeta;
    published_at: string | null;
    created: string;
}
interface PageMeta {
    title?: string;
    description?: string;
    ogImage?: string;
    [key: string]: unknown;
}
interface Section {
    id: string;
    page_id: string;
    schema_id: string;
    order: number;
    data: Record<string, unknown>;
    status: 'draft' | 'published';
}
interface Media {
    id: string;
    project_id: string;
    file_path: string;
    mime_type: string;
    size_bytes: number;
    meta: Record<string, unknown>;
}
interface ListResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    perPage: number;
}
interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}
interface ValidationError {
    field: string;
    message: string;
    code: string;
}
interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}
interface PageFilters {
    status?: 'draft' | 'published';
    page?: number;
    perPage?: number;
    sort?: string;
}
interface SectionFilters {
    status?: 'draft' | 'published';
    page?: number;
    perPage?: number;
}

/** For testing: reset the singleton. */
declare function _resetClient(): void;

declare const pages: {
    /**
     * List all pages for the current project.
     */
    list(filters?: PageFilters): Promise<Page[]>;
    /**
     * Get a single page by its slug.
     */
    getBySlug(slug: string): Promise<Page>;
    /**
     * Get all sections belonging to a page, ordered by their `order` field.
     */
    getSections(pageId: string, filters?: SectionFilters): Promise<Section[]>;
};

declare const sections: {
    /**
     * Get all sections of a specific schema type (identified by schema slug).
     */
    getByType(schemaSlug: string, filters?: SectionFilters): Promise<Section[]>;
};

declare const schema: {
    /**
     * Get the current schema version for the project.
     * Returns the highest version number across all schemas.
     */
    getVersion(): Promise<number>;
    /**
     * Validate a section's data against its schema definition.
     * This is client-side validation — does not make a write request.
     */
    validate(section: Pick<Section, "schema_id" | "data">): Promise<ValidationResult>;
};

declare const preview: {
    /**
     * Enable preview mode by attaching the token to all subsequent requests.
     * When preview is active, draft content will be returned by the API.
     */
    enable(token: string): void;
    /**
     * Disable preview mode. Subsequent requests will only return published content.
     */
    disable(): void;
};

declare const media: {
    /**
     * Resolve the public URL for a stored media file.
     * Constructs the URL from the API base URL and PocketBase's file serving path.
     * @param collectionId - The PocketBase collection ID (usually 'media')
     * @param recordId - The media record ID
     * @param filename - The filename stored in the record
     */
    getUrl(collectionId: string, recordId: string, filename: string): string;
};

declare const ophillia: {
    /**
     * Initialize the Ophillia SDK. Must be called before any other method.
     *
     * @example
     * ophillia.init({ apiUrl: 'https://api.example.com', apiKey: 'my-key', projectSlug: 'my-project' });
     */
    init(config: OphilliaConfig): void;
    pages: {
        list(filters?: PageFilters): Promise<Page[]>;
        getBySlug(slug: string): Promise<Page>;
        getSections(pageId: string, filters?: SectionFilters): Promise<Section[]>;
    };
    sections: {
        getByType(schemaSlug: string, filters?: SectionFilters): Promise<Section[]>;
    };
    schema: {
        getVersion(): Promise<number>;
        validate(section: Pick<Section, "schema_id" | "data">): Promise<ValidationResult>;
    };
    preview: {
        enable(token: string): void;
        disable(): void;
    };
    media: {
        getUrl(collectionId: string, recordId: string, filename: string): string;
    };
    /** @internal — For testing only. Reset the SDK singleton. */
    _reset: typeof _resetClient;
};

export { type ApiError, type FieldSchema, type ListResult, type Media, type OphilliaConfig, type Page, type PageFilters, type PageMeta, type Project, type Section, type SectionFilters, type SectionSchema, type ValidationError, type ValidationResult, media, ophillia, pages, preview, schema, sections };
