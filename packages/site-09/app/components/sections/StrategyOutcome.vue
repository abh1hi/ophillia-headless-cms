<script setup lang="ts">
interface Strategy {
  label?: string
  detail?: string
}

const props = defineProps<{
  data: {
    strategies_title?: string
    strategies?: Strategy[]
    outcomes_title?: string
    outcomes?: string[]
    description?: string
  }
}>()

const defaultStrategies: Strategy[] = [
  { label: 'Strategy', detail: 'Detail...' }
]

const defaultOutcomes: string[] = ['Outcome 1']

const strategies = computed(() => props.data.strategies || defaultStrategies)
const outcomes = computed(() => props.data.outcomes || defaultOutcomes)
</script>

<template>
  <section class="py-24 bg-brand-bg">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-12">

        <!-- Implementation -->
        <div class="bg-primary/5 rounded-[3rem] p-10 md:p-14 border border-primary/10 shadow-soft hover:shadow-xl transition-all duration-500 group">
          <div class="flex items-center gap-5 mb-10">
            <div class="bg-primary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-primary text-3xl font-black">settings</span>
            </div>
            <h3 class="text-3xl font-black text-slate-900 dark:text-slate-100 font-serif leading-tight">
              {{ data.strategies_title ?? 'Implementation Strategies' }}
            </h3>
          </div>
          <ul class="space-y-6">
            <li v-for="(strategy, index) in strategies" :key="index" class="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white/50 group/item">
              <span class="material-symbols-outlined text-primary text-2xl mt-1 shrink-0 group-hover/item:animate-bounce">check_circle</span>
              <div class="text-lg">
                <span class="font-black text-slate-900 dark:text-slate-200 block mb-1 uppercase tracking-wider text-sm">{{ strategy.label }}:</span>
                <span class="text-slate-600 dark:text-slate-400 font-medium leading-relaxed">{{ strategy.detail }}</span>
              </div>
            </li>
          </ul>
        </div>

        <!-- Outcomes -->
        <div class="bg-secondary p-10 md:p-14 border border-white/5 rounded-[3rem] shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-150"></div>
          <div class="flex items-center gap-5 mb-10 relative z-10">
            <div class="bg-primary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-primary text-3xl font-black">emoji_events</span>
            </div>
            <h3 class="text-3xl font-black text-white font-serif leading-tight">
              {{ data.outcomes_title ?? 'Achieved Outcomes' }}
            </h3>
          </div>
          <p v-if="data.description" class="text-slate-300 text-lg mb-8 relative z-10 font-medium leading-relaxed">{{ data.description }}</p>
          <ul class="space-y-6 relative z-10">
            <li v-for="(outcome, index) in outcomes" :key="index" class="flex items-start gap-4 p-4 rounded-2xl transition-colors hover:bg-white/5 group/item">
              <div class="w-8 h-8 rounded-full bg-primary flex items-center justify-center shrink-0 shadow-lg group-hover/item:scale-110 transition-transform">
                <span class="text-white font-black text-xs">{{ index + 1 }}</span>
              </div>
              <p class="text-white text-lg font-medium leading-relaxed">
                {{ outcome }}
              </p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
