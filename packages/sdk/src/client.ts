import type { ApiError } from './types';

// ─── HTTP Client ──────────────────────────────────────────────────────────────

export interface ClientConfig {
    apiUrl: string;
    apiKey: string;
    projectSlug: string;
    previewToken?: string;
}

export class OphilliaClient {
    private config: ClientConfig;

    constructor(config: ClientConfig) {
        this.config = config;
    }

    setPreviewToken(token: string) {
        this.config = { ...this.config, previewToken: token };
    }

    clearPreviewToken() {
        const { previewToken: _, ...rest } = this.config;
        this.config = rest;
    }

    getProjectSlug(): string {
        return this.config.projectSlug;
    }

    async get<T>(path: string, params?: Record<string, string | number | boolean>): Promise<T> {
        const url = new URL(`${this.config.apiUrl}${path}`);

        if (params) {
            for (const [key, value] of Object.entries(params)) {
                url.searchParams.set(key, String(value));
            }
        }

        const headers: Record<string, string> = {
            'Content-Type': 'application/json',
            'X-API-Key': this.config.apiKey,
        };

        if (this.config.previewToken) {
            headers['X-Preview-Token'] = this.config.previewToken;
        }

        const response = await fetch(url.toString(), { headers });

        if (!response.ok) {
            const body = await response.json().catch(() => ({}));
            const err: ApiError = {
                code: `HTTP_${response.status}`,
                message: body?.message ?? response.statusText,
                details: body,
            };
            throw err;
        }

        return response.json() as Promise<T>;
    }
}

// ─── Singleton ─────────────────────────────────────────────────────────────────

let _client: OphilliaClient | null = null;

export function getClient(): OphilliaClient {
    if (!_client) {
        throw new Error(
            'Ophillia SDK not initialized. Call ophillia.init({ apiUrl, apiKey, projectSlug }) first.'
        );
    }
    return _client;
}

export function createClient(config: ClientConfig): OphilliaClient {
    _client = new OphilliaClient(config);
    return _client;
}

/** For testing: reset the singleton. */
export function _resetClient() {
    _client = null;
}
