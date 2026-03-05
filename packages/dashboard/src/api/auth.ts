import { api } from './client';

export interface PbAuthRecord {
    token: string;
    record: {
        id: string;
        email: string;
        name?: string;
        verified: boolean;
    };
}

export const authApi = {
    /**
     * Login as a PocketBase superuser.
     * Superuser tokens bypass all collection access rules.
     */
    async login(email: string, password: string): Promise<PbAuthRecord> {
        return api.post<PbAuthRecord>('/api/collections/_superusers/auth-with-password', {
            identity: email,
            password,
        });
    },

    /**
     * Refresh the current superuser session token.
     */
    async refresh(): Promise<PbAuthRecord> {
        return api.post<PbAuthRecord>('/api/collections/_superusers/auth-refresh', {});
    },
};
