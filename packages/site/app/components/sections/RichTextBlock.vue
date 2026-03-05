<script setup lang="ts">
// components/sections/RichTextBlock.vue

defineProps<{
  data: {
    content?: string
    align?: 'left' | 'center' | 'right'
    max_width?: string
  }
}>()
</script>

<template>
  <section class="rich-text-block">
    <div
      class="rich-text-inner"
      :style="{
        textAlign: data.align ?? 'left',
        maxWidth: data.max_width ?? '720px',
      }"
      v-html="data.content ?? ''"
    />
  </section>
</template>

<style scoped>
.rich-text-block {
  padding: 3rem 2rem;
}
.rich-text-inner {
  margin: 0 auto;
  font-size: 1.0625rem;
  line-height: 1.75;
  color: #1f2937;
}
.rich-text-inner :deep(h1),
.rich-text-inner :deep(h2),
.rich-text-inner :deep(h3) {
  font-weight: 700;
  line-height: 1.2;
  margin: 2rem 0 0.75rem;
}
.rich-text-inner :deep(p) {
  margin: 0 0 1.25rem;
}
.rich-text-inner :deep(a) {
  color: #7c3aed;
  text-decoration: underline;
}
.rich-text-inner :deep(ul),
.rich-text-inner :deep(ol) {
  padding-left: 1.5rem;
  margin: 0 0 1.25rem;
}
</style>
