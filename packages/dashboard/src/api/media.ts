import { api, getApiBase } from './client';
import type { PbListResult } from './projects';

export interface MediaRecord {
    id: string;
    collectionId: string;
    collectionName: string;
    project_id: string;
    file_path: string;
    mime_type: string;
    size_bytes: number;
    meta: Record<string, unknown>;
    created: string;
}

export const mediaApi = {
    list(projectId: string): Promise<PbListResult<MediaRecord>> {
        return api.get('/api/collections/media/records', {
            filter: `project_id="${projectId}"`,
            sort: '-id',
            perPage: 100,
        });
    },
    delete(id: string): Promise<void> {
        return api.delete(`/api/collections/media/records/${id}`);
    },
    getUrl(record: MediaRecord): string {
        return `${getApiBase()}/api/files/${record.collectionId}/${record.id}/${record.file_path}`;
    },
    async upload(projectId: string, file: File): Promise<MediaRecord> {
        const form = new FormData();
        form.append('project_id', projectId);
        form.append('file_path', file);
        form.append('mime_type', file.type);
        form.append('size_bytes', String(file.size));
        return api.upload<MediaRecord>('/api/collections/media/records', form);
    },
};
