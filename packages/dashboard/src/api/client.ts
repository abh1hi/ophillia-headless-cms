// ─── Dashboard API Client ──────────────────────────────────────────────────────
// A thin wrapper around fetch for PocketBase endpoints.
// Auto-injects the superuser JWT token stored in localStorage.

const PB_URL = import.meta.env.VITE_PB_URL ?? 'http://localhost:8090';

export interface ApiError {
    code: string;
    message: string;
    status: number;
}

export function getApiBase(): string {
    return PB_URL;
}

function buildUrl(path: string, params?: Record<string, string | number | boolean>): string {
    if (!params) return `${PB_URL}${path}`;
    const qs = new URLSearchParams();
    Object.entries(params).forEach(([k, v]) => qs.set(k, String(v)));
    return `${PB_URL}${path}?${qs.toString()}`;
}

async function request<T>(
    url: string,
    options: RequestInit = {}
): Promise<T> {
    const token = localStorage.getItem('pb_token');
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
        ...(options.headers as Record<string, string>),
    };

    if (options.body instanceof FormData) {
        delete headers['Content-Type'];
    }

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const body = await response.json().catch(() => ({}));
        const err: ApiError & { rawData?: any } = {
            code: `HTTP_${response.status}`,
            message: body?.message ?? response.statusText,
            status: response.status,
            rawData: body,
        };
        throw err;
    }

    // 204 No Content
    if (response.status === 204) return undefined as T;

    return response.json() as Promise<T>;
}

export const api = {
    get: <T>(path: string, params?: Record<string, string | number | boolean>) =>
        request<T>(buildUrl(path, params)),

    post: <T>(path: string, body: unknown) =>
        request<T>(`${PB_URL}${path}`, { method: 'POST', body: JSON.stringify(body) }),

    patch: <T>(path: string, body: unknown) =>
        request<T>(`${PB_URL}${path}`, { method: 'PATCH', body: JSON.stringify(body) }),

    delete: (path: string) =>
        request<void>(`${PB_URL}${path}`, { method: 'DELETE' }),

    upload: <T>(path: string, formData: FormData) => {
        const token = localStorage.getItem('pb_token');
        const headers: Record<string, string> = {};
        if (token) headers['Authorization'] = `Bearer ${token}`;
        return request<T>(`${PB_URL}${path}`, { method: 'POST', body: formData, headers });
    },
};
