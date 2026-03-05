<script setup lang="ts">
// components/sections/FallbackSection.vue
// Shown in dev for unknown section types, hidden in production.

defineProps<{
  data: Record<string, unknown>
  schema?: { slug?: string; name?: string }
}>()

const isDev = process.env.NODE_ENV === 'development'
</script>

<template>
  <section v-if="isDev" class="fallback-section">
    <p>
      <strong>Unknown section type: <code>{{ schema?.slug ?? 'unknown' }}</code></strong>
      — create a component and add it to the
      <code>SectionRenderer</code> componentMap.
    </p>
    <pre>{{ JSON.stringify(data, null, 2) }}</pre>
  </section>
</template>

<style scoped>
.fallback-section {
  margin: 1rem;
  padding: 1rem;
  border: 2px dashed #e5e7eb;
  border-radius: 6px;
  background: #fafafa;
  font-family: monospace;
  font-size: 0.8rem;
  color: #6b7280;
}
.fallback-section pre {
  overflow: auto;
  max-height: 200px;
  margin: 0.5rem 0 0;
}
</style>
