<script setup lang="ts">
defineProps<{
  data: {
    title?: string
    subtitle?: string
    bg_image_url?: string
  }
}>()
</script>

<template>
  <section class="relative pt-32 pb-40 overflow-hidden bg-slate-900 font-sans">
    <div class="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <img v-if="data.bg_image_url" :src="data.bg_image_url" class="w-full h-full object-cover">
      <div class="absolute inset-0 bg-gradient-to-b from-slate-900/60 via-slate-900/20 to-slate-900/80"></div>
    </div>
    
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="max-w-4xl">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-black w-fit mb-8 uppercase tracking-widest border border-primary/20 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <span class="material-symbols-outlined text-sm">home_work</span>
          Our Campus \ Infrastructure
        </div>
        <h1 v-if="data.title" class="text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-white mb-8 font-serif animate-in fade-in slide-in-from-bottom-6 duration-1000">
          {{ data.title }}
        </h1>
        <p v-if="data.subtitle" class="text-xl md:text-2xl text-slate-300 leading-relaxed font-medium max-w-2xl animate-in fade-in slide-in-from-bottom-8 duration-1000">
          {{ data.subtitle }}
        </p>
      </div>
    </div>

    <!-- Decorative Bottom Divider -->
    <div class="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-slate-950 to-transparent"></div>
  </section>
</template>
