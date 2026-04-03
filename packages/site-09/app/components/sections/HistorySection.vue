<script setup lang="ts">
interface TimelineEvent {
  year?: string
  text?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    content?: string[]
    image_url?: string
    image_label?: string
    timeline?: TimelineEvent[]
  }
}>()

const defaultTimeline: TimelineEvent[] = [
  { year: '1999', text: 'Arunachala Village School established.' }
]

const events = computed(() => props.data.timeline || defaultTimeline)
</script>

<template>
  <section class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
        <div>
          <h2 v-if="data.subtitle" class="text-primary font-bold tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
          <h3 v-if="data.title" class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 font-serif">
            {{ data.title }}
          </h3>
          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
            <p v-for="(p, i) in data.content" :key="i" v-html="p"></p>
          </div>
        </div>
        <div class="relative">
          <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-2xl transition-all duration-500 hover:shadow-primary/20">
            <img v-if="data.image_url" :src="data.image_url" class="w-full h-full object-cover" :alt="data.image_label">
            <div v-else class="text-center text-slate-400 dark:text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-3">image</span>
              <p class="text-sm font-bold uppercase tracking-widest">{{ data.image_label ?? 'Photo Placeholder' }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Timeline -->
      <div v-if="events.length" class="border-l-2 border-primary/20 pl-8 space-y-10 max-w-3xl ml-4">
        <div v-for="(event, index) in events" :key="index" class="relative group">
          <div class="absolute -left-11 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/10 group-hover:scale-125 transition-transform duration-300">
            <div class="w-2 h-2 rounded-full bg-white"></div>
          </div>
          <p class="text-primary font-black text-sm mb-1 tracking-wider uppercase">{{ event.year }}</p>
          <p class="text-slate-700 dark:text-slate-300 font-medium leading-relaxed">{{ event.text }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
