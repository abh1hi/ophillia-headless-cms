import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createClient, _resetClient } from '../src/client';
import { sections } from '../src/sections';

const mockSection = {
    id: 'sec-1', page_id: 'page-1', schema_id: 'schema-1', order: 0, data: {}, status: 'published',
};

describe('sections', () => {
    beforeEach(() => {
        _resetClient();
        createClient({ apiUrl: 'http://api.test', apiKey: 'k', projectSlug: 'test-project' });
    });

    afterEach(() => vi.unstubAllGlobals());

    describe('getByType()', () => {
        it('returns sections matching the given schema slug', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [mockSection], totalItems: 1, totalPages: 1, page: 1, perPage: 100 }),
            }));
            const result = await sections.getByType('hero-banner');
            expect(result).toHaveLength(1);
            expect(result[0].id).toBe('sec-1');
        });

        it('passes schema slug in the filter query', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 100 }),
            });
            vi.stubGlobal('fetch', fetchMock);
            await sections.getByType('my-schema');
            const [url] = fetchMock.mock.calls[0];
            expect(url).toContain('my-schema');
        });

        it('applies status filter', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 100 }),
            });
            vi.stubGlobal('fetch', fetchMock);
            await sections.getByType('hero', { status: 'draft' });
            const [url] = fetchMock.mock.calls[0];
            expect(url).toContain('draft');
        });

        it('returns empty array when no sections match', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 100 }),
            }));
            const result = await sections.getByType('nonexistent-type');
            expect(result).toEqual([]);
        });
    });
});
