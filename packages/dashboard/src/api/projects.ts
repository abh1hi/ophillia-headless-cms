import { api } from './client';

export interface Project {
    id: string;
    name: string;
    slug: string;
    api_key: string;
    settings: Record<string, unknown>;
    created: string;
    updated: string;
}

export interface PbListResult<T> {
    items: T[];
    totalItems: number;
    totalPages: number;
    page: number;
    perPage: number;
}

export const projectsApi = {
    list(): Promise<PbListResult<Project>> {
        return api.get('/api/collections/projects/records', { perPage: 100, sort: 'name' });
    },
    get(id: string): Promise<Project> {
        return api.get(`/api/collections/projects/records/${id}`);
    },
    create(data: Partial<Project>): Promise<Project> {
        return api.post('/api/collections/projects/records', data);
    },
    update(id: string, data: Partial<Project>): Promise<Project> {
        return api.patch(`/api/collections/projects/records/${id}`, data);
    },
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/projects/records/${id}`);
    },
};
