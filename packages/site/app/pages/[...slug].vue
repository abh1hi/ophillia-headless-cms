<script setup lang="ts">
// pages/[...slug].vue
// Dynamic catch-all page that renders CMS content.

const route = useRoute()
const slug = computed(() => {
  const parts = route.params.slug as string[]
  return Array.isArray(parts) ? parts.join('/') : parts || 'home'
})

const { data, pending, error } = await useOphilliaPage(slug.value)
const preview = useOphilliaPreview()

// SEO meta from page data
useHead({
  title: () => data.value?.page?.title ?? 'Ophillia Site',
  meta: [
    {
      name: 'description',
      content: () => (data.value?.page?.meta?.description as string) ?? '',
    },
    {
      property: 'og:title',
      content: () => data.value?.page?.title ?? '',
    },
    {
      property: 'og:description',
      content: () => (data.value?.page?.meta?.description as string) ?? '',
    },
  ],
})

// Redirect to 404-style if page not found
if (!pending.value && !data.value && !error.value) {
  throw createError({ statusCode: 404, statusMessage: 'Page not found' })
}
</script>

<template>
  <main>
    <!-- Preview bar -->
    <div
      v-if="preview.isActive.value"
      class="preview-bar"
      role="status"
    >
      👁 Preview mode active
      <button @click="preview.disable()">Exit preview</button>
    </div>

    <!-- Loading -->
    <div v-if="pending" class="page-loading">
      Loading…
    </div>

    <!-- Error -->
    <div v-else-if="error" class="page-error">
      Failed to load page.
    </div>

    <!-- Page content -->
    <template v-else-if="data">
      <SectionRenderer
        v-for="section in data.sections"
        :key="section.id"
        :section="section"
        :schema="section.expand?.schema_id"
      />
    </template>
  </main>
</template>

<style scoped>
.preview-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 9999;
  background: #7c3aed;
  color: white;
  padding: 0.5rem 1rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 0.875rem;
  font-family: sans-serif;
}
.preview-bar button {
  background: rgba(255,255,255,0.2);
  border: none;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  cursor: pointer;
}
.page-loading,
.page-error {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  font-family: sans-serif;
  color: #666;
}
</style>
