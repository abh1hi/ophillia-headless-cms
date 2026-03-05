import { describe, it, expect, beforeEach } from 'vitest';
import { createClient, _resetClient } from '../src/client';
import { preview } from '../src/preview';

describe('preview', () => {
    beforeEach(() => {
        _resetClient();
        createClient({ apiUrl: 'http://api.test', apiKey: 'k', projectSlug: 'test' });
    });

    describe('enable()', () => {
        it('does not throw for a valid token', () => {
            expect(() => preview.enable('my-valid-token-123')).not.toThrow();
        });

        it('throws for an empty string token', () => {
            expect(() => preview.enable('')).toThrow('Preview token must be a non-empty string');
        });

        it('throws for a whitespace-only token', () => {
            expect(() => preview.enable('   ')).toThrow();
        });

        it('throws if SDK not initialized', () => {
            _resetClient();
            expect(() => preview.enable('token')).toThrow('Ophillia SDK not initialized');
        });
    });

    describe('disable()', () => {
        it('does not throw when called after enable', () => {
            preview.enable('some-token');
            expect(() => preview.disable()).not.toThrow();
        });

        it('does not throw when called without a prior enable', () => {
            expect(() => preview.disable()).not.toThrow();
        });

        it('throws if SDK not initialized', () => {
            _resetClient();
            expect(() => preview.disable()).toThrow('Ophillia SDK not initialized');
        });
    });
});
