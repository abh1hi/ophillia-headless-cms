<script setup lang="ts">
interface Pillar {
  title?: string
  points?: string[]
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    pillars?: Pillar[]
  }
}>()

const defaultPillars: Pillar[] = [
  { title: 'Pillar Title', points: ['Point 1', 'Point 2'] }
]

const pillars = computed(() => props.data.pillars || defaultPillars)
</script>

<template>
  <section class="py-24 bg-secondary overflow-hidden relative">
    <!-- Background Decoration -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full -mr-48 -mt-48 pointer-events-none"></div>
    <div class="absolute bottom-0 left-0 w-96 h-96 bg-black/5 rounded-full -ml-48 -mb-48 pointer-events-none"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="text-center max-w-2xl mx-auto mb-20">
        <h2 v-if="data.subtitle" class="text-primary font-black tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-white font-serif leading-tight">{{ data.title }}</h3>
      </div>
      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(pillar, index) in pillars"
          :key="index"
          class="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 hover:bg-white/10 hover:border-primary/30 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
        >
          <div class="flex items-center gap-5 mb-8">
            <div class="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform">
              <span class="text-white font-black text-xl font-serif">{{ index + 1 }}</span>
            </div>
            <h4 class="text-xl font-black text-white leading-tight font-serif">{{ pillar.title }}</h4>
          </div>
          <ul class="space-y-4">
            <li
              v-for="(point, pi) in pillar.points"
              :key="pi"
              class="flex items-start gap-3 text-slate-300 font-medium leading-relaxed group/item"
            >
              <span class="text-primary mt-1.5 shrink-0 material-symbols-outlined text-[10px] font-black group-hover/item:translate-x-1 transition-transform">arrow_forward</span>
              {{ point }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
