// composables/useOphilliaPage.ts
// Reads config directly via useRuntimeConfig() — no plugin injection needed.

export interface PBPage {
    id: string
    title: string
    slug: string
    status: 'draft' | 'published'
    version: number
    meta: Record<string, unknown>
    published_at: string
}

export interface PBSection {
    id: string
    page_id: string
    schema_id: string
    order: number
    data: Record<string, unknown>
    status: 'draft' | 'published'
    expand?: {
        schema_id?: { slug: string; name: string; fields_schema: unknown[] }
    }
}

export const useOphilliaPage = (slug: string) => {
    const config = useRuntimeConfig()
    const pbUrl = (config.public.pbUrl as string) || 'http://localhost:8090'
    const projectId = config.public.projectId as string
    const apiKey = config.public.apiKey as string

    const preview = useOphilliaPreview()

    const authHeaders: Record<string, string> = apiKey
        ? { Authorization: apiKey }
        : {}

    return useAsyncData<{ page: PBPage; sections: PBSection[] } | null>(
        `page:${slug}`,
        async () => {
            if (!projectId) {
                console.warn('[ophillia] NUXT_PUBLIC_PROJECT_ID is not set in .env')
                return null
            }

            // 1. Find the page by slug and project
            const statusFilter = preview.isActive.value
                ? `project_id="${projectId}"&&slug="${slug}"`
                : `project_id="${projectId}"&&slug="${slug}"&&status="published"`

            const pageRes = await $fetch<{ items: PBPage[] }>(
                `${pbUrl}/api/collections/pages/records`,
                {
                    params: { filter: statusFilter, perPage: 1 },
                    headers: authHeaders,
                }
            ).catch(() => null)

            const page = pageRes?.items?.[0]
            if (!page) return null

            // 2. Fetch sections with schema expand
            const sectionFilter = preview.isActive.value
                ? `page_id="${page.id}"`
                : `page_id="${page.id}"&&status="published"`

            const sectionRes = await $fetch<{ items: PBSection[] }>(
                `${pbUrl}/api/collections/sections/records`,
                {
                    params: {
                        filter: sectionFilter,
                        expand: 'schema_id',
                        sort: 'order',
                        perPage: 200,
                    },
                    headers: authHeaders,
                }
            ).catch(() => ({ items: [] }))

            return { page, sections: sectionRes.items }
        },
        { server: true, lazy: false }
    )
}
