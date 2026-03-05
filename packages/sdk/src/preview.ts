import { getClient } from './client';

// ─── Preview Module ───────────────────────────────────────────────────────────

export const preview = {
    /**
     * Enable preview mode by attaching the token to all subsequent requests.
     * When preview is active, draft content will be returned by the API.
     */
    enable(token: string): void {
        if (!token || typeof token !== 'string' || token.trim() === '') {
            throw new Error('Preview token must be a non-empty string.');
        }
        const client = getClient();
        client.setPreviewToken(token);
    },

    /**
     * Disable preview mode. Subsequent requests will only return published content.
     */
    disable(): void {
        const client = getClient();
        client.clearPreviewToken();
    },
};
