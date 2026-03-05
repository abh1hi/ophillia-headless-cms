import { createClient, _resetClient } from './client';
import { pages } from './pages';
import { sections } from './sections';
import { schema } from './schema';
import { preview } from './preview';
import { media, _setApiUrl } from './media';
import type { OphilliaConfig } from './types';

// ─── Public SDK Object ────────────────────────────────────────────────────────

export const ophillia = {
    /**
     * Initialize the Ophillia SDK. Must be called before any other method.
     *
     * @example
     * ophillia.init({ apiUrl: 'https://api.example.com', apiKey: 'my-key', projectSlug: 'my-project' });
     */
    init(config: OphilliaConfig): void {
        if (!config.apiUrl) throw new Error('ophillia.init: apiUrl is required.');
        if (!config.apiKey) throw new Error('ophillia.init: apiKey is required.');
        if (!config.projectSlug) throw new Error('ophillia.init: projectSlug is required.');

        createClient(config);
        _setApiUrl(config.apiUrl);
    },

    pages,
    sections,
    schema,
    preview,
    media,

    /** @internal — For testing only. Reset the SDK singleton. */
    _reset: _resetClient,
};

// ─── Named Exports ─────────────────────────────────────────────────────────────
export { pages, sections, schema, preview, media };
export * from './types';
export type { OphilliaConfig };
