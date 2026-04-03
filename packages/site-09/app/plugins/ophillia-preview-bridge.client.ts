// plugins/ophillia-preview-bridge.client.ts
// Listens for section data updates from the CMS dashboard iframe parent
// and exposes live section overrides to composables via useState.

export default defineNuxtPlugin(() => {
  if (!import.meta.client) return

  // Shared reactive store for live section overrides
  const overrides = useState<Record<string, Record<string, unknown>>>(
    'ophillia:preview-overrides',
    () => ({})
  )

  window.addEventListener('message', (event: MessageEvent) => {
    // Allow messages from any localhost origin (dashboard dev server)
    const isLocalhost = event.origin.includes('localhost') || event.origin.includes('127.0.0.1')
    if (!isLocalhost) return

    const msg = event.data
    if (!msg || typeof msg !== 'object') return

    if (msg.type === 'ophillia:section-update') {
      overrides.value = {
        ...overrides.value,
        [msg.sectionId]: msg.data,
      }
    }

    if (msg.type === 'ophillia:ping') {
      // Acknowledge the dashboard connection
      ;(event.source as Window)?.postMessage(
        { type: 'ophillia:pong' },
        { targetOrigin: event.origin }
      )
    }
  })

  // Notify dashboard that the preview page is ready
  if (window.parent !== window) {
    window.parent.postMessage({ type: 'ophillia:ready' }, '*')
  }
})
