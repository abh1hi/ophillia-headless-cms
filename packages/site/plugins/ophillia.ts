// plugins/ophillia.ts
export default defineNuxtPlugin(() => {
    const config = useRuntimeConfig()
    return {
        provide: {
            pbUrl: config.public.pbUrl as string,
            apiKey: config.public.apiKey as string,
            projectId: config.public.projectId as string,
            previewSecret: config.public.previewSecret as string,
        },
    }
})
