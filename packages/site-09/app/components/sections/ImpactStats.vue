<script setup lang="ts">
interface ImpactStat {
  icon?: string
  label?: string
  value?: string
  trend?: string
  trend_icon?: string
}

const props = defineProps<{
  data: {
    stats?: ImpactStat[]
  }
}>()

const defaultStats: ImpactStat[] = [
  { icon: 'school', label: 'Students Enrolled', value: '1,240+', trend: '+12% this year', trend_icon: 'trending_up' }
]

const impactStats = computed(() => props.data.stats || defaultStats)
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div 
        v-for="(stat, index) in impactStats" 
        :key="index"
        class="flex flex-col gap-3 rounded-[2rem] p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-soft hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 group"
      >
        <div class="bg-primary/10 p-3 rounded-2xl w-fit group-hover:scale-110 transition-transform duration-500">
          <span class="material-symbols-outlined text-primary text-3xl">{{ stat.icon || 'school' }}</span>
        </div>
        <p class="text-slate-500 dark:text-slate-400 text-xs font-black uppercase tracking-widest">{{ stat.label }}</p>
        <p class="text-slate-900 dark:text-slate-100 text-5xl font-black font-serif">{{ stat.value }}</p>
        <p v-if="stat.trend" class="text-secondary dark:text-secondary text-sm font-black flex items-center gap-1">
          <span class="material-symbols-outlined text-sm font-black">{{ stat.trend_icon || 'trending_up' }}</span> 
          {{ stat.trend }}
        </p>
      </div>
    </div>
  </section>
</template>
