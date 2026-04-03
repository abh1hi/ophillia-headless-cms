<script setup lang="ts">
interface CoreValue {
  icon?: string
  label?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    content?: string[]
    values?: CoreValue[]
  }
}>()

const defaultValues: CoreValue[] = [
  { icon: 'favorite', label: 'Loving Others' }
]

const values = computed(() => props.data.values || defaultValues)
</script>

<template>
  <section class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-20 items-start">
        <div>
          <h2 v-if="data.subtitle" class="text-primary font-black tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
          <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-8 font-serif leading-tight">
            {{ data.title }}
          </h3>
          <div class="space-y-6 text-slate-600 dark:text-slate-400 leading-relaxed font-medium text-lg">
            <p v-for="(p, i) in data.content" :key="i" v-html="p"></p>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-6">
          <div 
            v-for="(value, index) in values" 
            :key="index" 
            class="aspect-square bg-primary/5 border border-primary/10 rounded-3xl flex flex-col items-center justify-center text-center p-6 hover:bg-primary/20 hover:-translate-y-2 transition-all duration-500 shadow-soft hover:shadow-xl group"
          >
            <span class="material-symbols-outlined text-primary text-5xl mb-4 group-hover:scale-110 transition-transform duration-500">{{ value.icon }}</span>
            <p class="font-black text-slate-800 dark:text-slate-100 text-sm uppercase tracking-wider">{{ value.label }}</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
