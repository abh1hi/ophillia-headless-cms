// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  // Disable DevTools when embedded in an iframe (CMS preview panel) to avoid
  // cross-origin SecurityError warnings — they are harmless but noisy.
  devtools: { enabled: typeof window !== 'undefined' ? window.parent === window : true },
  ssr: true,
  nitro: {
    static: true,
  },
  modules: [
    '@nuxtjs/tailwindcss'
  ],
  app: {
    head: {
      title: 'Regenboog | Premium Nuxt SSG',
      meta: [
        { name: 'description', content: 'A premium, high-performance website built with Nuxt SSG.' }
      ],
      link: [
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Lexend:wght@300;400;500;600;700;800&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght@100..700,0..1&display=swap' },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap' }
      ]
    }
  },
  runtimeConfig: {
    public: {
      pbUrl: process.env.NUXT_PUBLIC_PB_URL,
      projectId: process.env.NUXT_PUBLIC_PROJECT_ID,
      apiKey: process.env.NUXT_PUBLIC_API_KEY,
      previewSecret: process.env.NUXT_PUBLIC_PREVIEW_SECRET,
      projectSlug: process.env.NUXT_PUBLIC_PROJECT_SLUG,
    }
  },
  css: ['~/assets/css/main.css']
})
