import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import { authApi } from '@/api/auth';

export const useAuthStore = defineStore('auth', () => {
    const token = ref<string | null>(localStorage.getItem('pb_token'));
    const userEmail = ref<string | null>(localStorage.getItem('pb_user_email'));
    const userId = ref<string | null>(localStorage.getItem('pb_user_id'));

    const isLoggedIn = computed(() => !!token.value);

    async function login(email: string, password: string) {
        const result = await authApi.login(email, password);
        token.value = result.token;
        userEmail.value = result.record.email;
        userId.value = result.record.id;

        localStorage.setItem('pb_token', result.token);
        localStorage.setItem('pb_user_email', result.record.email);
        localStorage.setItem('pb_user_id', result.record.id);
    }

    function logout() {
        token.value = null;
        userEmail.value = null;
        userId.value = null;
        localStorage.removeItem('pb_token');
        localStorage.removeItem('pb_user_email');
        localStorage.removeItem('pb_user_id');
    }

    return { token, userEmail, userId, isLoggedIn, login, logout };
});
