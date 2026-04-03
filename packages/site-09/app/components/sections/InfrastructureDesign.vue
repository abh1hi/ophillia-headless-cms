<script setup lang="ts">
interface DesignBlock {
  subtitle?: string
  title?: string
  content?: string[]
  image_url?: string
  icon?: string
  reverse?: boolean
}

const props = defineProps<{
  data: {
    blocks?: DesignBlock[]
  }
}>()

const defaultBlocks: DesignBlock[] = [
  { subtitle: 'Philosophy', title: 'Design Philosophy', content: ['Content...'], image_url: '', icon: 'park' }
]

const blocks = computed(() => props.data.blocks || defaultBlocks)
</script>

<template>
  <section class="py-24 bg-white dark:bg-slate-950 overflow-hidden">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div 
        v-for="(block, index) in blocks" 
        :key="index"
        class="grid lg:grid-cols-2 gap-20 items-center mb-32 last:mb-0"
      >
        <div :class="['space-y-8 transition-all duration-1000', block.reverse ? 'lg:order-2' : 'lg:order-1']">
          <h2 v-if="block.subtitle" class="text-primary font-black tracking-widest uppercase text-sm mb-4">{{ block.subtitle }}</h2>
          <h3 v-if="block.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-8 font-serif leading-tight">
            {{ block.title }}
          </h3>
          <div class="space-y-6 text-slate-600 dark:text-slate-400 font-medium text-lg leading-relaxed">
            <p v-for="(p, i) in block.content" :key="i" v-html="p"></p>
          </div>
        </div>
        
        <div :class="['relative group transition-all duration-1000', block.reverse ? 'lg:order-1' : 'lg:order-2']">
          <div class="aspect-[4/3] rounded-[3.5rem] overflow-hidden bg-slate-50 dark:bg-slate-900 flex items-center justify-center border border-slate-100 dark:border-slate-800 shadow-2xl relative">
            <img v-if="block.image_url" :src="block.image_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
            <div v-else class="text-center text-slate-300 dark:text-slate-600">
              <span class="material-symbols-outlined text-8xl mb-4 opacity-50">{{ block.icon || 'park' }}</span>
              <p class="text-xs font-black uppercase tracking-widest opacity-50">Photo Placeholder</p>
            </div>
            <!-- Decorative Overlay -->
            <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>
          </div>
          <!-- Floating Decoration -->
          <div class="absolute -bottom-6 -right-6 w-32 h-32 bg-primary/10 rounded-full blur-2xl group-hover:bg-primary/20 transition-all duration-700"></div>
          <div class="absolute -top-6 -left-6 w-24 h-24 bg-secondary/10 rounded-full blur-xl group-hover:bg-secondary/20 transition-all duration-700"></div>
        </div>
      </div>
    </div>
  </section>
</template>
