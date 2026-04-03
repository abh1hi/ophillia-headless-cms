export const useOphilliaPreview = () => {
    const route = useRoute()
    const config = useRuntimeConfig().public

    const token = computed(() => route.query.preview as string)
    const isActive = computed(() => {
        return token.value === config.previewSecret && !!config.previewSecret
    })

    return {
        isActive,
        token
    }
}
