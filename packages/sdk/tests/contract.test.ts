import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { createClient, _resetClient } from '../src/client';
import { pages } from '../src/pages';
import { sections } from '../src/sections';
import { schema } from '../src/schema';
import { ophillia } from '../src/index';

// ─── Contract Tests ───────────────────────────────────────────────────────────
// These tests verify SDK behaviour against edge cases that represent the published
// SDK contract: malformed data, missing schemas, network errors, draft vs published.

describe('SDK Contract Tests', () => {
    beforeEach(() => {
        _resetClient();
        createClient({ apiUrl: 'http://api.test', apiKey: 'contract-key', projectSlug: 'contract-project' });
    });

    afterEach(() => vi.unstubAllGlobals());

    // ─── ophillia.init() ───────────────────────────────────────────────────────

    describe('ophillia.init()', () => {
        it('throws if apiUrl is missing', () => {
            _resetClient();
            expect(() => ophillia.init({ apiUrl: '', apiKey: 'k', projectSlug: 'p' }))
                .toThrow('apiUrl is required');
        });

        it('throws if apiKey is missing', () => {
            _resetClient();
            expect(() => ophillia.init({ apiUrl: 'http://x', apiKey: '', projectSlug: 'p' }))
                .toThrow('apiKey is required');
        });

        it('throws if projectSlug is missing', () => {
            _resetClient();
            expect(() => ophillia.init({ apiUrl: 'http://x', apiKey: 'k', projectSlug: '' }))
                .toThrow('projectSlug is required');
        });

        it('initializes correctly with valid config', () => {
            _resetClient();
            expect(() => ophillia.init({ apiUrl: 'http://x', apiKey: 'k', projectSlug: 'p' }))
                .not.toThrow();
        });
    });

    // ─── Network failures ──────────────────────────────────────────────────────

    describe('Network errors', () => {
        it('pages.list() propagates network error', async () => {
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network failure')));
            await expect(pages.list()).rejects.toThrow('Network failure');
        });

        it('pages.getBySlug() propagates network error', async () => {
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Connection refused')));
            await expect(pages.getBySlug('home')).rejects.toThrow();
        });

        it('sections.getByType() propagates network error', async () => {
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Timeout')));
            await expect(sections.getByType('hero')).rejects.toThrow('Timeout');
        });

        it('schema.getVersion() propagates network error', async () => {
            vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('DNS failure')));
            await expect(schema.getVersion()).rejects.toThrow();
        });
    });

    // ─── Malformed API response ────────────────────────────────────────────────

    describe('Malformed API responses', () => {
        it('pages.list() throws on non-ok HTTP response', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: false, status: 500, statusText: 'Server Error',
                json: async () => ({ message: 'Internal error' }),
            }));
            await expect(pages.list()).rejects.toMatchObject({ code: 'HTTP_500' });
        });

        it('pages.getBySlug() throws NOT_FOUND when result is empty', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 1 }),
            }));
            await expect(pages.getBySlug('does-not-exist'))
                .rejects.toMatchObject({ code: 'NOT_FOUND' });
        });

        it('returns empty array for sections with no matching type', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 100 }),
            }));
            const result = await sections.getByType('ghost-schema');
            expect(result).toEqual([]);
        });
    });

    // ─── Draft vs Published ────────────────────────────────────────────────────

    describe('Draft vs Published content', () => {
        const draftPage = {
            id: 'p2', project_id: 'proj-1', title: 'Draft Page', slug: 'draft-page',
            status: 'draft', version: 1, meta: {}, published_at: null, created: '2026-01-01',
        };

        it('pages.list(status: draft) returns draft pages', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [draftPage], totalItems: 1, totalPages: 1, page: 1, perPage: 50 }),
            }));
            const result = await pages.list({ status: 'draft' });
            expect(result[0].status).toBe('draft');
        });

        it('pages.list(status: published) does not include draft pages', async () => {
            vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
                ok: true,
                json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 50 }),
            }));
            const result = await pages.list({ status: 'published' });
            expect(result.some((p) => p.status === 'draft')).toBe(false);
        });
    });

    // ─── Uninitialized SDK ─────────────────────────────────────────────────────

    describe('Uninitialized SDK', () => {
        beforeEach(() => _resetClient());

        it('pages.list() throws if SDK not initialized', async () => {
            await expect(pages.list()).rejects.toThrow('Ophillia SDK not initialized');
        });

        it('sections.getByType() throws if SDK not initialized', async () => {
            await expect(sections.getByType('any')).rejects.toThrow('Ophillia SDK not initialized');
        });

        it('schema.getVersion() throws if SDK not initialized', async () => {
            await expect(schema.getVersion()).rejects.toThrow('Ophillia SDK not initialized');
        });
    });
});
