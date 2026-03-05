import { getClient } from './client';
import type { Section, ListResult, SectionFilters } from './types';

// ─── Sections Module ──────────────────────────────────────────────────────────

export const sections = {
    /**
     * Get all sections of a specific schema type (identified by schema slug).
     */
    async getByType(schemaSlug: string, filters: SectionFilters = {}): Promise<Section[]> {
        const client = getClient();
        const params: Record<string, string | number | boolean> = {
            filter: `schema_id.slug="${schemaSlug}" && schema_id.project_id.slug="${client.getProjectSlug()}"`,
            sort: 'order',
            perPage: filters.perPage ?? 100,
            page: filters.page ?? 1,
        };

        if (filters.status) {
            params.filter = `${params.filter} && status="${filters.status}"`;
        }

        const result = await client.get<ListResult<Section>>(
            '/api/collections/sections/records',
            params
        );

        return result.items;
    },
};
