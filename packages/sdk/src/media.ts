import { getClient } from './client';

// ─── Media Module ─────────────────────────────────────────────────────────────

export const media = {
    /**
     * Resolve the public URL for a stored media file.
     * Constructs the URL from the API base URL and PocketBase's file serving path.
     * @param collectionId - The PocketBase collection ID (usually 'media')
     * @param recordId - The media record ID
     * @param filename - The filename stored in the record
     */
    getUrl(collectionId: string, recordId: string, filename: string): string {
        if (!collectionId || !recordId || !filename) {
            throw new Error('collectionId, recordId, and filename are all required to resolve a media URL.');
        }
        const client = getClient();
        // PocketBase file serving URL pattern:
        // {apiUrl}/api/files/{collectionId}/{recordId}/{filename}
        const apiUrl = (client as unknown as { config: { apiUrl: string } }).config?.apiUrl
            ?? '';

        // We access apiUrl via a dedicated method instead of internal casting
        return `${_getApiUrl()}/api/files/${collectionId}/${recordId}/${filename}`;
    },
};

// ─── Internal helper ──────────────────────────────────────────────────────────
// We need the apiUrl without exposing it on the client's public interface.
// The client stores config privately, so we use a private accessor function.
let _apiUrl = '';

export function _setApiUrl(apiUrl: string) {
    _apiUrl = apiUrl;
}

function _getApiUrl(): string {
    return _apiUrl;
}
