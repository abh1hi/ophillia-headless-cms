<script setup lang="ts">
const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    content?: string[]
    contact_text?: string
    contact_email?: string
  }
}>()
</script>

<template>
  <section class="py-24 bg-primary/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center mb-12">
        <h2 v-if="data.subtitle" class="text-primary font-bold tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 font-serif">{{ data.title }}</h3>
      </div>
      <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-[40px] p-10 shadow-2xl border border-slate-100 dark:border-slate-700">
        <div class="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium mb-10">
          <p v-for="(p, i) in data.content" :key="i" v-html="p"></p>
        </div>
        <div class="bg-primary/10 rounded-3xl p-8 border border-primary/20 flex items-start gap-5 group transition-all duration-500 hover:bg-primary/20">
          <div class="bg-primary p-3 rounded-full text-white group-hover:scale-110 transition-transform">
            <span class="material-symbols-outlined">mail</span>
          </div>
          <p class="text-lg text-slate-700 dark:text-slate-300 font-semibold">
            {{ data.contact_text ?? 'For detailed documentation, please contact us at' }}
            <a v-if="data.contact_email" :href="'mailto:' + data.contact_email" class="text-primary font-black hover:underline block mt-1 text-2xl tracking-tight">
              {{ data.contact_email }}
            </a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
