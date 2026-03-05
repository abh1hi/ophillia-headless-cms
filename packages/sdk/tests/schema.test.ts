import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { validateAgainstSchema } from '../src/schema';
import { createClient, _resetClient } from '../src/client';
import { schema } from '../src/schema';
import type { FieldSchema } from '../src/types';

// ─── Pure client-side validator tests (no network) ────────────────────────────

describe('validateAgainstSchema()', () => {
    const fields: FieldSchema[] = [
        { name: 'title', type: 'text', required: true },
        { name: 'body', type: 'richtext', required: false },
        { name: 'count', type: 'number', required: true },
        { name: 'active', type: 'boolean', required: false },
        { name: 'meta', type: 'json', required: false },
    ];

    it('returns valid for correct data', () => {
        const result = validateAgainstSchema({ title: 'Hello', count: 5 }, fields);
        expect(result.valid).toBe(true);
        expect(result.errors).toHaveLength(0);
    });

    it('fails when required text field is missing', () => {
        const result = validateAgainstSchema({ count: 1 }, fields);
        expect(result.valid).toBe(false);
        expect(result.errors).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'title', code: 'REQUIRED' })])
        );
    });

    it('fails when required number field is missing', () => {
        const result = validateAgainstSchema({ title: 'Hello' }, fields);
        expect(result.valid).toBe(false);
        expect(result.errors).toEqual(
            expect.arrayContaining([expect.objectContaining({ field: 'count', code: 'REQUIRED' })])
        );
    });

    it('fails on type mismatch: string expected, number given', () => {
        const result = validateAgainstSchema({ title: 42, count: 1 }, fields);
        expect(result.valid).toBe(false);
        expect(result.errors[0].code).toBe('TYPE_MISMATCH');
    });

    it('fails on type mismatch: number expected, string given', () => {
        const result = validateAgainstSchema({ title: 'Hi', count: 'not-a-number' }, fields);
        expect(result.valid).toBe(false);
        expect(result.errors[0].code).toBe('TYPE_MISMATCH');
    });

    it('fails on type mismatch: boolean expected, number given', () => {
        const boolField: FieldSchema[] = [{ name: 'active', type: 'boolean', required: true }];
        const result = validateAgainstSchema({ active: 1 }, boolField);
        expect(result.valid).toBe(false);
    });

    it('fails on type mismatch: json/object expected, string given', () => {
        const jsonField: FieldSchema[] = [{ name: 'meta', type: 'json', required: true }];
        const result = validateAgainstSchema({ meta: 'not-an-object' }, jsonField);
        expect(result.valid).toBe(false);
    });

    it('skips type check for optional empty fields', () => {
        const result = validateAgainstSchema({ title: 'Hi', count: 1 }, fields);
        expect(result.valid).toBe(true);
    });

    it('accumulates multiple errors', () => {
        const result = validateAgainstSchema({}, fields);
        // Both 'title' (required text) and 'count' (required number) should error
        expect(result.errors.length).toBeGreaterThanOrEqual(2);
    });
});

// ─── Network-dependent schema tests ───────────────────────────────────────────

describe('schema.getVersion()', () => {
    beforeEach(() => {
        _resetClient();
        createClient({ apiUrl: 'http://api.test', apiKey: 'k', projectSlug: 'test-project' });
    });

    afterEach(() => vi.unstubAllGlobals());

    it('returns 0 when no schemas exist', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({ items: [], totalItems: 0, totalPages: 1, page: 1, perPage: 1 }),
        }));
        const v = await schema.getVersion();
        expect(v).toBe(0);
    });

    it('returns the highest version number', async () => {
        vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
            ok: true,
            json: async () => ({
                items: [{ id: 's1', version: 3 }], totalItems: 1, totalPages: 1, page: 1, perPage: 1,
            }),
        }));
        const v = await schema.getVersion();
        expect(v).toBe(3);
    });
});
