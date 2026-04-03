<script setup lang="ts">
defineProps<{
  data: any
  schema?: any
}>()

const isDev = process.dev
</script>

<template>
  <div class="fallback-section py-12 px-4 border-2 border-dashed border-slate-200 dark:border-slate-800 rounded-3xl bg-slate-50 dark:bg-slate-900/50 flex flex-col items-center justify-center text-center">
    <div class="bg-slate-200 dark:bg-slate-800 p-3 rounded-full mb-4">
      <span class="material-symbols-outlined text-slate-500">extension_off</span>
    </div>
    <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-2">
      Section Component Missing
    </h3>
    <p class="text-slate-500 dark:text-slate-400 max-w-sm mx-auto mb-6">
      The schema slug <code class="bg-slate-200 dark:bg-slate-800 px-1.5 py-0.5 rounded text-primary font-mono text-sm">{{ schema?.slug || 'unknown' }}</code> is not registered in SectionRenderer.vue.
    </p>

    <div v-if="isDev" class="w-full max-w-2xl text-left bg-slate-900 rounded-xl p-4 overflow-hidden">
      <p class="text-[10px] uppercase tracking-wider font-bold text-slate-500 mb-2">Raw Data (Dev Only)</p>
      <pre class="text-xs text-slate-300 overflow-auto max-h-48 font-mono">{{ JSON.stringify(data, null, 2) }}</pre>
    </div>
  </div>
</template>

<style scoped>
.fallback-section {
  min-height: 200px;
}
</style>
