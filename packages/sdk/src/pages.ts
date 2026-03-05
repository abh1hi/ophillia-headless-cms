import { getClient } from './client';
import type { Page, Section, ListResult, PageFilters, SectionFilters } from './types';

// ─── Pages Module ─────────────────────────────────────────────────────────────

export const pages = {
    /**
     * List all pages for the current project.
     */
    async list(filters: PageFilters = {}): Promise<Page[]> {
        const client = getClient();
        const params: Record<string, string | number | boolean> = {
            filter: `project_id.slug="${client.getProjectSlug()}"`,
            perPage: filters.perPage ?? 50,
            page: filters.page ?? 1,
        };

        if (filters.status) {
            params.filter = `${params.filter} && status="${filters.status}"`;
        }

        if (filters.sort) {
            params.sort = filters.sort;
        }

        const result = await client.get<ListResult<Page>>(
            '/api/collections/pages/records',
            params
        );

        return result.items;
    },

    /**
     * Get a single page by its slug.
     */
    async getBySlug(slug: string): Promise<Page> {
        const client = getClient();
        const result = await client.get<ListResult<Page>>(
            '/api/collections/pages/records',
            {
                filter: `slug="${slug}" && project_id.slug="${client.getProjectSlug()}"`,
                perPage: 1,
            }
        );

        if (!result.items.length) {
            const err = {
                code: 'NOT_FOUND',
                message: `Page with slug "${slug}" not found.`,
            };
            throw err;
        }

        return result.items[0];
    },

    /**
     * Get all sections belonging to a page, ordered by their `order` field.
     */
    async getSections(pageId: string, filters: SectionFilters = {}): Promise<Section[]> {
        const client = getClient();
        const params: Record<string, string | number | boolean> = {
            filter: `page_id="${pageId}"`,
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
