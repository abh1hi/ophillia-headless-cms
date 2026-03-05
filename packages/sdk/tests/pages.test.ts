import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createClient, _resetClient } from '../src/client';
import { pages } from '../src/pages';

const mockPage = {
    id: 'page-1', project_id: 'proj-1', title: 'Home', slug: 'home',
    status: 'published', version: 1, meta: {}, published_at: null, created: '2026-01-01',
};
const mockSection = {
    id: 'sec-1', page_id: 'page-1', schema_id: 'schema-1', order: 0, data: {}, status: 'published',
};

function setupClient() {
    createClient({ apiUrl: 'http://api.test', apiKey: 'k', projectSlug: 'test-project' });
}

function mockFetch(data: unknown, ok = true) {
    return vi.fn().mockResolvedValue({
        ok,
        status: ok ? 200 : 404,
        statusText: ok ? 'OK' : 'Not Found',
        json: async () => data,
    });
}

describe('pages', () => {
    beforeEach(() => {
        _resetClient();
        setupClient();
    });

    afterEach(() => vi.unstubAllGlobals());

    describe('list()', () => {
        it('returns items array from API response', async () => {
            vi.stubGlobal('fetch', mockFetch({ items: [mockPage], totalItems: 1, totalPages: 1, page: 1, perPage: 50 }));
            const result = await pages.list();
            expect(result).toHaveLength(1);
            expect(result[0].slug).toBe('home');
        });

        it('applies status filter when provided', async () => {
            const fetchMock = mockFetch({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 50 });
            vi.stubGlobal('fetch', fetchMock);
            await pages.list({ status: 'draft' });
            const [url] = fetchMock.mock.calls[0];
            expect(url).toContain('draft');
        });

        it('returns empty array when no pages exist', async () => {
            vi.stubGlobal('fetch', mockFetch({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 50 }));
            const result = await pages.list();
            expect(result).toEqual([]);
        });
    });

    describe('getBySlug()', () => {
        it('returns the matching page', async () => {
            vi.stubGlobal('fetch', mockFetch({ items: [mockPage], totalItems: 1, totalPages: 1, page: 1, perPage: 1 }));
            const result = await pages.getBySlug('home');
            expect(result.id).toBe('page-1');
        });

        it('throws NOT_FOUND when no page matches slug', async () => {
            vi.stubGlobal('fetch', mockFetch({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 1 }));
            await expect(pages.getBySlug('nonexistent')).rejects.toMatchObject({ code: 'NOT_FOUND' });
        });
    });

    describe('getSections()', () => {
        it('returns sections ordered by order field', async () => {
            vi.stubGlobal('fetch', mockFetch({ items: [mockSection], totalItems: 1, totalPages: 1, page: 1, perPage: 100 }));
            const result = await pages.getSections('page-1');
            expect(result).toHaveLength(1);
            expect(result[0].page_id).toBe('page-1');
        });

        it('applies status filter when provided', async () => {
            const fetchMock = mockFetch({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 100 });
            vi.stubGlobal('fetch', fetchMock);
            await pages.getSections('page-1', { status: 'draft' });
            const [url] = fetchMock.mock.calls[0];
            expect(url).toContain('draft');
        });
    });
});
