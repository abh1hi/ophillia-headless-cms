<script setup lang="ts">
interface PillarPillar {
  icon?: string
  label?: string
  description?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    description?: string
    pillars?: PillarPillar[]
    footer_content?: string[]
  }
}>()

const defaultPillars: PillarPillar[] = [
  { icon: 'favorite', label: 'Pillar', description: 'Description...' }
]

const pillars = computed(() => props.data.pillars || defaultPillars)
</script>

<template>
  <section class="py-24 bg-primary/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mx-auto text-center mb-20">
        <h2 v-if="data.subtitle" class="text-primary font-black tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-8 font-serif leading-tight">{{ data.title }}</h3>
        <p v-if="data.description" class="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {{ data.description }}
        </p>
      </div>

      <!-- 3 Pillars -->
      <div class="grid md:grid-cols-3 gap-10 mb-20">
        <div 
          v-for="(pillar, index) in pillars" 
          :key="index" 
          class="bg-white dark:bg-slate-800 rounded-[3rem] p-10 text-center shadow-soft border border-slate-100 dark:border-slate-700 hover:shadow-2xl hover:border-primary/30 hover:-translate-y-2 transition-all duration-500 group"
        >
          <div class="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-500 shadow-inner">
            <span class="material-symbols-outlined text-primary text-4xl font-black">{{ pillar.icon }}</span>
          </div>
          <h4 class="text-2xl font-black text-slate-900 dark:text-slate-100 mb-4 font-serif leading-tight">{{ pillar.label }}</h4>
          <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">{{ pillar.description }}</p>
        </div>
      </div>

      <!-- Philosophy Text -->
      <div v-if="data.footer_content?.length" class="max-w-5xl mx-auto bg-white dark:bg-slate-800 rounded-[3rem] p-10 md:p-14 shadow-2xl border border-slate-100 dark:border-slate-700 relative overflow-hidden group">
        <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150"></div>
        <div class="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg relative z-10">
          <p v-for="(p, i) in data.footer_content" :key="i" v-html="p"></p>
        </div>
      </div>
    </div>
  </section>
</template>
