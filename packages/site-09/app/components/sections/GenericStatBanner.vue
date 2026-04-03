<script setup lang="ts">
interface SimpleStat {
  label?: string
  value?: string
}

const props = defineProps<{
  data: {
    stats?: SimpleStat[]
  }
}>()

const stats = computed(() => props.data.stats || [])
</script>

<template>
  <section class="py-20 bg-white dark:bg-slate-900 border-y border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:divide-x lg:divide-slate-100 dark:lg:divide-slate-800">
        <div 
          v-for="(stat, index) in stats" 
          :key="index"
          class="flex flex-col items-center justify-center text-center px-4 transition-all duration-500 hover:scale-110"
        >
          <p class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-2 font-serif">{{ stat.value }}</p>
          <p class="text-xs font-black text-primary uppercase tracking-widest">{{ stat.label }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
