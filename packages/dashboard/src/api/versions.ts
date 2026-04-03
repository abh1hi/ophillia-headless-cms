import { api } from './client';
import type { PbListResult } from './projects';
import type { Page } from './pages';
import type { Section } from './sections';

export interface PageVersion {
    id: string;
    page_id: string;
    version_number: number;
    label: string;
    snapshot: { page: Partial<Page>; sections: Partial<Section>[] };
    created: string;
}

export const versionsApi = {
    /** List all versions for a page, newest first */
    list(pageId: string): Promise<PbListResult<PageVersion>> {
        return api.get('/api/collections/page_versions/records', {
            filter: `page_id="${pageId}"`,
            sort: '-version_number',
            perPage: 50,
        });
    },

    /** Create a new version snapshot */
    create(
        pageId: string,
        versionNumber: number,
        label: string,
        snapshot: { page: Partial<Page>; sections: Partial<Section>[] }
    ): Promise<PageVersion> {
        return api.post('/api/collections/page_versions/records', {
            page_id: pageId,
            version_number: versionNumber,
            label,
            snapshot,
        });
    },

    /** Delete a specific version */
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/page_versions/records/${id}`);
    },
};
