// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },

  // SSG — pre-render all pages at build time
  nitro: {
    preset: 'static',
  },

  // Runtime config — values injectable from environment variables
  runtimeConfig: {
    public: {
      pbUrl: process.env.NUXT_PUBLIC_PB_URL || 'http://localhost:8090',
      apiKey: process.env.NUXT_PUBLIC_API_KEY || '',
      projectId: process.env.NUXT_PUBLIC_PROJECT_ID || '',
      previewSecret: process.env.NUXT_PUBLIC_PREVIEW_SECRET || '',
    },
  },

  // Auto-import composables and components
  components: [
    { path: '~/components', pathPrefix: false },
    { path: '~/components/sections', prefix: 'Section' },
  ],

  // App-level head defaults
  app: {
    head: {
      htmlAttrs: { lang: 'en' },
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
    },
  },

  // Hooks: generate page routes from PocketBase at build time
  hooks: {
    async 'nitro:config'(nitroConfig) {
      // Only during prerender — fetch published page slugs from PB
      if (!nitroConfig.prerender) return
      const pbUrl = process.env.NUXT_PUBLIC_PB_URL || 'http://localhost:8090'
      const apiKey = process.env.NUXT_PUBLIC_API_KEY || ''
      const projectSlug = process.env.NUXT_PUBLIC_PROJECT_SLUG || ''

      if (!apiKey || !projectSlug) return

      try {
        // Resolve projectId first
        const projRes = await fetch(
          `${pbUrl}/api/collections/projects/records?filter=slug="${projectSlug}"&perPage=1`,
          { headers: { Authorization: apiKey } }
        )
        const projData = await projRes.json()
        const projectId = projData?.items?.[0]?.id
        if (!projectId) return

        // Fetch all published page slugs
        let page = 1
        const slugs: string[] = []
        while (true) {
          const res = await fetch(
            `${pbUrl}/api/collections/pages/records?filter=project_id="${projectId}"&&status="published"&fields=slug&perPage=200&page=${page}`,
            { headers: { Authorization: apiKey } }
          )
          const data = await res.json()
          slugs.push(...(data.items as { slug: string }[]).map(p => `/${p.slug}`))
          if (page >= data.totalPages) break
          page++
        }

        if (!nitroConfig.prerender.routes) nitroConfig.prerender.routes = []
        nitroConfig.prerender.routes.push(...slugs)
        console.log(`[ophillia] Pre-rendering ${slugs.length} published pages`)
      } catch (e) {
        console.warn('[ophillia] Could not fetch routes for pre-rendering:', e)
      }
    },
  },
})
