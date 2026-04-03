<script setup lang="ts">
interface TransparencyStat {
  icon?: string
  label?: string
  description?: string
  color_class?: string
}

interface Expense {
  label?: string
  percentage?: number
  color?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    description?: string
    stats?: TransparencyStat[]
    expenses?: Expense[]
    report_text?: string
    report_url?: string
  }
}>()

const defaultStats: TransparencyStat[] = [
  { icon: 'verified', label: '92% Direct Impact', description: 'Goes directly to programs and school operations.', color_class: 'bg-secondary/10 text-secondary' },
  { icon: 'description', label: 'Annual Audits', description: 'Public financial records available for download.', color_class: 'bg-primary/10 text-primary' }
]

const defaultExpenses: Expense[] = [
  { label: 'Educational Programs', percentage: 65, color: '#FF7F41' },
  { label: 'Nutrition & Health', percentage: 20, color: '#FF7F41cc' },
  { label: 'Infrastructure', percentage: 7, color: '#FF7F41aa' },
  { label: 'Administration', percentage: 8, color: '#94a3b8' }
]

const stats = computed(() => props.data.stats || defaultStats)
const expenses = computed(() => props.data.expenses || defaultExpenses)
</script>

<template>
  <section class="w-full py-24 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <div>
          <h2 v-if="data.subtitle" class="text-primary font-black text-sm uppercase tracking-widest mb-3">{{ data.subtitle }}</h2>
          <h3 v-if="data.title" class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black mb-8 font-serif leading-tight">{{ data.title }}</h3>
          <p v-if="data.description" class="text-slate-600 dark:text-slate-400 mb-12 text-lg font-medium leading-relaxed">{{ data.description }}</p>
          <div class="space-y-8">
            <div v-for="(stat, index) in stats" :key="index" class="flex items-center gap-5 group">
              <div :class="['size-14 rounded-2xl flex items-center justify-center shrink-0 shadow-lg group-hover:scale-110 transition-transform duration-500', stat.color_class || 'bg-primary/10 text-primary']">
                <span class="material-symbols-outlined text-2xl">{{ stat.icon || 'verified' }}</span>
              </div>
              <div>
                <p class="font-black text-slate-900 dark:text-slate-100 text-xl font-serif">{{ stat.label }}</p>
                <p class="text-slate-500 dark:text-slate-400 font-medium">{{ stat.description }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="p-10 rounded-[3rem] bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-2xl relative overflow-hidden group">
          <div class="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 transition-all duration-700 group-hover:scale-150"></div>
          <p class="text-slate-900 dark:text-slate-100 text-2xl font-black mb-8 font-serif relative z-10">Expense Allocation</p>
          <div class="space-y-6 relative z-10">
            <div v-for="(expense, index) in expenses" :key="index">
              <div class="flex justify-between text-sm mb-2 font-black uppercase tracking-widest">
                <span class="text-slate-600 dark:text-slate-400">{{ expense.label }}</span>
                <span class="text-slate-900 dark:text-slate-100">{{ expense.percentage }}%</span>
              </div>
              <div class="w-full bg-slate-200 dark:bg-slate-700 h-3 rounded-full overflow-hidden shadow-inner">
                <div 
                  class="h-full rounded-full transition-all duration-1000 ease-out" 
                  :style="{ width: expense.percentage + '%', backgroundColor: expense.color || '#FF7F41' }"
                ></div>
              </div>
            </div>
          </div>
          <div class="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700 relative z-10">
            <a :href="data.report_url ?? '#'" class="w-full flex items-center justify-center gap-3 text-primary font-black py-4 border-2 border-primary rounded-2xl hover:bg-primary hover:text-white transition-all duration-300 shadow-soft hover:shadow-xl">
              <span class="material-symbols-outlined text-xl">download</span> {{ data.report_text ?? 'Download Report' }}
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
