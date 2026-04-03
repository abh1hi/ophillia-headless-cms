import { api } from './client';
import type { PbListResult } from './projects';

export interface Section {
    id: string;
    page_id: string;
    schema_id: string;
    order: number;
    data: Record<string, unknown>;
    status: 'draft' | 'published';
}

export const sectionsApi = {
    listForPage(pageId: string): Promise<PbListResult<Section>> {
        return api.get('/api/collections/sections/records', {
            filter: `page_id="${pageId}"`,
            sort: 'order',
            perPage: 200,
        });
    },
    create(data: Partial<Section>): Promise<Section> {
        return api.post('/api/collections/sections/records', data);
    },
    update(id: string, data: Partial<Section>): Promise<Section> {
        return api.patch(`/api/collections/sections/records/${id}`, data);
    },
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/sections/records/${id}`);
    },
    async reorder(sectionIds: string[]): Promise<void> {
        await Promise.all(
            sectionIds.map((id, index) =>
                api.patch(`/api/collections/sections/records/${id}`, { order: index })
            )
        );
    },
    async publishAll(sectionIds: string[]): Promise<void> {
        await Promise.all(
            sectionIds.map(id =>
                api.patch(`/api/collections/sections/records/${id}`, { status: 'published' })
            )
        );
    },
    async unpublishAll(sectionIds: string[]): Promise<void> {
        await Promise.all(
            sectionIds.map(id =>
                api.patch(`/api/collections/sections/records/${id}`, { status: 'draft' })
            )
        );
    },
};
