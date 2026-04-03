<script setup lang="ts">
interface Story {
  tag?: string
  title?: string
  description?: string
  image_url?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    description?: string
    cta_text?: string
    cta_url?: string
    stories?: Story[]
  }
}>()

const defaultStories: Story[] = [
  { tag: 'Success Story', title: 'Story Title', description: 'Description...', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=800&auto=format&fit=crop' }
]

const stories = computed(() => props.data.stories || defaultStories)
</script>

<template>
  <section id="stories" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full bg-white dark:bg-slate-900 rounded-[3rem] my-12 shadow-soft">
    <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
      <div class="max-w-xl">
        <h2 v-if="data.subtitle" class="text-primary font-black text-sm uppercase tracking-widest mb-3">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black font-serif">{{ data.title }}</h3>
        <p v-if="data.description" class="text-slate-600 dark:text-slate-400 mt-6 text-lg font-medium leading-relaxed">{{ data.description }}</p>
      </div>
      <NuxtLink v-if="data.cta_text" :to="data.cta_url ?? '#'" class="text-primary font-black flex items-center gap-2 hover:gap-4 transition-all duration-300 text-lg uppercase tracking-wider">
        {{ data.cta_text }} <span class="material-symbols-outlined font-black">arrow_forward</span>
      </NuxtLink>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      <div 
        v-for="(story, index) in stories" 
        :key="index" 
        class="group cursor-pointer flex flex-col"
      >
        <div class="aspect-[4/5] overflow-hidden rounded-[2.5rem] mb-6 relative shadow-xl">
          <img 
            :src="story.image_url" 
            :alt="story.title" 
            class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
        </div>
        <div class="flex flex-col flex-grow">
          <span class="bg-primary/10 text-primary text-[10px] font-black px-4 py-1.5 rounded-full uppercase w-fit tracking-widest">{{ story.tag }}</span>
          <h4 class="text-2xl font-black text-slate-900 dark:text-slate-100 mt-4 group-hover:text-primary transition-colors font-serif leading-tight">
            {{ story.title }}
          </h4>
          <p class="text-slate-600 dark:text-slate-400 mt-4 line-clamp-3 font-medium leading-relaxed">
            {{ story.description }}
          </p>
          <div class="mt-auto pt-6 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span class="text-primary font-black text-xs uppercase tracking-widest flex items-center gap-2">
              Learn More <span class="material-symbols-outlined text-sm">north_east</span>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
