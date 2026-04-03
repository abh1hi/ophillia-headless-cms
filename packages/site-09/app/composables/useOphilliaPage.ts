export const useOphilliaPage = async (slug: string | string[]) => {
    const config = useRuntimeConfig().public
    const { isActive: isPreview } = useOphilliaPreview()

    // Ensure slug is a string (handle catch-all array)
    const pageSlug = Array.isArray(slug) ? slug.join('/') || 'home' : slug || 'home'

    return useAsyncData(`page-${pageSlug}-${isPreview.value}`, async () => {
        const pbUrl = config.pbUrl
        const projectId = config.projectId

        if (!pbUrl || !projectId) {
            console.warn('Ophillia CMS: pbUrl or projectId missing in runtimeConfig')
            return null
        }

        // 1. Fetch Page
        const pageFilter = `project_id="${projectId}" && slug="${pageSlug}"` + (isPreview.value ? '' : ' && status="published"')
        const pageRes = await fetch(`${pbUrl}/api/collections/pages/records?filter=(${encodeURIComponent(pageFilter)})`, {
            headers: { 'X-API-Key': config.apiKey }
        })
        const pageData = await pageRes.json()

        if (!pageData.items?.length) return null
        const page = pageData.items[0]

        // 2. Fetch Sections
        const sectionFilter = `page_id="${page.id}"` + (isPreview.value ? '' : ' && status="published"')
        const sectionRes = await fetch(`${pbUrl}/api/collections/sections/records?filter=(${encodeURIComponent(sectionFilter)})&sort=order&expand=schema_id`, {
            headers: { 'X-API-Key': config.apiKey }
        })
        const sectionData = await sectionRes.json()

        return {
            page,
            sections: sectionData.items || []
        }
    })
}
