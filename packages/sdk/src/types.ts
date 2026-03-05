// ─── Core Entities ────────────────────────────────────────────────────────────

export interface OphilliaConfig {
    apiUrl: string;
    apiKey: string;
    projectSlug: string;
}

export interface Project {
    id: string;
    name: string;
    slug: string;
    api_key: string;
    settings: Record<string, unknown>;
    created: string;
    updated: string;
}

export interface SectionSchema {
    id: string;
    project_id: string;
    name: string;
    slug: string;
    version: number;
    fields_schema: FieldSchema[];
    status: 'active' | 'deprecated';
    created: string;
}

export interface FieldSchema {
    name: string;
    type: 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'url' | 'select' | 'json';
    required: boolean;
    options?: Record<string, unknown>;
}

export interface Page {
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

export interface PageMeta {
    title?: string;
    description?: string;
    ogImage?: string;
    [key: string]: unknown;
}

export interface Section {
    id: string;
    page_id: string;
    schema_id: string;
    order: number;
    data: Record<string, unknown>;
    status: 'draft' | 'published';
}

export interface Media {
    id: string;
    project_id: string;
    file_path: string;
    mime_type: string;
    size_bytes: number;
    meta: Record<string, unknown>;
}

// ─── SDK Response Types ────────────────────────────────────────────────────────

export interface ListResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    perPage: number;
}

export interface ValidationResult {
    valid: boolean;
    errors: ValidationError[];
}

export interface ValidationError {
    field: string;
    message: string;
    code: string;
}

export interface ApiError {
    code: string;
    message: string;
    details?: Record<string, unknown>;
}

// ─── Filter Types ─────────────────────────────────────────────────────────────

export interface PageFilters {
    status?: 'draft' | 'published';
    page?: number;
    perPage?: number;
    sort?: string;
}

export interface SectionFilters {
    status?: 'draft' | 'published';
    page?: number;
    perPage?: number;
}
