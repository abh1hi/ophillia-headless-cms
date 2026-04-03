// plugins/ophillia-preview-bridge.client.ts
// Listens for section data updates from the CMS dashboard iframe parent
// and triggers a page refetch to reflect live edits without a full reload.

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  const ORIGIN_WHITELIST = [
    'http://localhost:5173',
    'http://localhost:3000',
    'http://127.0.0.1:5173',
  ]

  // Shared reactive store for live section overrides
  const overrides = useState<Record<string, Record<string, unknown>>>(
    'ophillia:preview-overrides',
    () => ({})
  )

  window.addEventListener('message', (event: MessageEvent) => {
    // Security: only accept messages from known CMS origins
    if (!ORIGIN_WHITELIST.some(o => event.origin.startsWith(o))) return

    const msg = event.data
    if (!msg || typeof msg !== 'object') return

    if (msg.type === 'ophillia:section-update') {
      // Merge the live data override
      overrides.value = {
        ...overrides.value,
        [msg.sectionId]: msg.data,
      }
    }

    if (msg.type === 'ophillia:page-reload') {
      window.location.reload()
    }

    if (msg.type === 'ophillia:ping') {
      // Acknowledge the dashboard connection
      event.source?.postMessage({ type: 'ophillia:pong' }, { targetOrigin: event.origin })
    }
  })

  // Notify CMS dashboard that the preview page is ready
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'ophillia:ready' }, '*')
  }
})
