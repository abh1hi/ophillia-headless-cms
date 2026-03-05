import { api } from './client';
import type { PbListResult } from './projects';

export interface FieldSchema {
    name: string;
    type: 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'url' | 'select' | 'json';
    required: boolean;
    options?: Record<string, unknown>;
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

export const schemasApi = {
    list(projectId: string): Promise<PbListResult<SectionSchema>> {
        return api.get('/api/collections/section_schemas/records', {
            filter: `project_id="${projectId}"`,
            sort: 'name',
            perPage: 200,
        });
    },
    get(id: string): Promise<SectionSchema> {
        return api.get(`/api/collections/section_schemas/records/${id}`);
    },
    create(data: Partial<SectionSchema>): Promise<SectionSchema> {
        return api.post('/api/collections/section_schemas/records', data);
    },
    update(id: string, data: Partial<SectionSchema>): Promise<SectionSchema> {
        return api.patch(`/api/collections/section_schemas/records/${id}`, data);
    },
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/section_schemas/records/${id}`);
    },
};
