// composables/useOphilliaPreview.ts
// Preview mode: when ?preview=<secret> is in the URL, draft content is shown.

const _isActive = ref(false)

export const useOphilliaPreview = () => {
    const config = useRuntimeConfig()
    const previewSecret = config.public.previewSecret as string

    if (import.meta.client) {
        const route = useRoute()
        watch(
            () => route.query.preview,
            (token) => {
                _isActive.value = !!token && token === previewSecret
            },
            { immediate: true }
        )
    }

    const disable = () => {
        _isActive.value = false
        if (import.meta.client) {
            const router = useRouter()
            const route = useRoute()
            const query = { ...route.query }
            delete query.preview
            router.replace({ query })
        }
    }

    return {
        isActive: readonly(_isActive),
        disable,
    }
}
