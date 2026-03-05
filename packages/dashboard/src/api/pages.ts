import { api } from './client';
import type { PbListResult } from './projects';

export interface Page {
    id: string;
    project_id: string;
    title: string;
    slug: string;
    status: 'draft' | 'published';
    version: number;
    meta: { title?: string; description?: string; ogImage?: string };
    published_at: string | null;
    created: string;
}

export const pagesApi = {
    list(projectId: string, page = 1): Promise<PbListResult<Page>> {
        return api.get('/api/collections/pages/records', {
            filter: `project_id="${projectId}"`,
            sort: '-id',
            perPage: 50,
            page,
        });
    },
    get(id: string): Promise<Page> {
        return api.get(`/api/collections/pages/records/${id}`);
    },
    create(data: Partial<Page>): Promise<Page> {
        return api.post('/api/collections/pages/records', data);
    },
    update(id: string, data: Partial<Page>): Promise<Page> {
        return api.patch(`/api/collections/pages/records/${id}`, data);
    },
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/pages/records/${id}`);
    },
    publish(id: string): Promise<Page> {
        return api.patch(`/api/collections/pages/records/${id}`, {
            status: 'published',
            published_at: new Date().toISOString(),
        });
    },
};
