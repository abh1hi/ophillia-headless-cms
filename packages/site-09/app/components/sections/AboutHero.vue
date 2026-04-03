<script setup lang="ts">
defineProps<{
  data: {
    badge?: string
    title?: string
    description?: string
  }
}>()
</script>

<template>
  <section class="relative pt-20 pb-24 bg-primary/5 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl">
        <div v-if="data.badge" class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit mb-6">
          <span class="material-symbols-outlined text-sm">info</span>
          {{ data.badge }}
        </div>
        <h1 v-if="data.title" class="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6 font-serif">
          {{ data.title }}
        </h1>
        <p v-if="data.description" class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {{ data.description }}
        </p>
      </div>
    </div>
  </section>
</template>
