import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { OphilliaClient, createClient, getClient, _resetClient } from '../src/client';

describe('OphilliaClient', () => {
    beforeEach(() => {
        _resetClient();
    });

    it('throws if getClient called before init', () => {
        expect(() => getClient()).toThrow('Ophillia SDK not initialized');
    });

    it('createClient returns an OphilliaClient instance', () => {
        const client = createClient({ apiUrl: 'http://localhost:8090', apiKey: 'test-key', projectSlug: 'my-project' });
        expect(client).toBeInstanceOf(OphilliaClient);
    });

    it('getClient returns the same instance after creation', () => {
        createClient({ apiUrl: 'http://localhost:8090', apiKey: 'k', projectSlug: 'p' });
        expect(getClient()).toBeInstanceOf(OphilliaClient);
    });

    it('getProjectSlug returns correct slug', () => {
        const client = createClient({ apiUrl: 'http://api.test', apiKey: 'key', projectSlug: 'test-slug' });
        expect(client.getProjectSlug()).toBe('test-slug');
    });

    it('setPreviewToken and clearPreviewToken work', () => {
        const client = createClient({ apiUrl: 'http://api.test', apiKey: 'key', projectSlug: 'p' });
        client.setPreviewToken('abc123');
        // Subsequent gets should include the token header — tested via fetch mock
        client.clearPreviewToken();
        // No error = success
    });

    describe('GET requests', () => {
        beforeEach(() => {
            createClient({ apiUrl: 'http://api.test', apiKey: 'key-123', projectSlug: 'test' });
        });

        it('sends correct headers', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 50 }),
            });
            vi.stubGlobal('fetch', fetchMock);

            const client = getClient();
            await client.get('/api/collections/pages/records');

            expect(fetchMock).toHaveBeenCalledOnce();
            const [url, options] = fetchMock.mock.calls[0];
            expect(url).toContain('/api/collections/pages/records');
            expect(options.headers['X-API-Key']).toBe('key-123');
            expect(options.headers['Content-Type']).toBe('application/json');
            vi.unstubAllGlobals();
        });

        it('appends query params correctly', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({}),
            });
            vi.stubGlobal('fetch', fetchMock);

            await getClient().get('/api/collections/pages/records', { page: 2, perPage: 10 });
            const [url] = fetchMock.mock.calls[0];
            expect(url).toContain('page=2');
            expect(url).toContain('perPage=10');
            vi.unstubAllGlobals();
        });

        it('throws normalized ApiError on non-ok response', async () => {
            const fetchMock = vi.fn().mockResolvedValue({
                ok: false,
                status: 404,
                statusText: 'Not Found',
                json: async () => ({ message: 'Record not found' }),
            });
            vi.stubGlobal('fetch', fetchMock);

            await expect(getClient().get('/api/collections/pages/records/missing'))
                .rejects.toMatchObject({ code: 'HTTP_404', message: 'Record not found' });
            vi.unstubAllGlobals();
        });

        it('sends X-Preview-Token header when preview is active', async () => {
            const client = getClient();
            client.setPreviewToken('preview-xyz');

            const fetchMock = vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({}),
            });
            vi.stubGlobal('fetch', fetchMock);

            await client.get('/api/test');
            const [, options] = fetchMock.mock.calls[0];
            expect(options.headers['X-Preview-Token']).toBe('preview-xyz');
            vi.unstubAllGlobals();
        });
    });
});
