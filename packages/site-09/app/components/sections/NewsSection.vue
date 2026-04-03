<script setup lang="ts">
interface NewsItem {
  category?: string
  date?: string
  title?: string
  description?: string
  image?: string
  alt?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    news_items?: NewsItem[]
  }
}>()

const defaultNews: NewsItem[] = [
  {
    category: 'Event',
    date: 'Oct 24, 2023',
    title: 'Class of 2023 Graduation Highlights',
    description: 'Celebrating our largest graduating class yet as they head off to prestigious universities across the country.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3hMkLVk_dCCuagDZHFryuw9-cXFLXdX7UuH2BQ7hDE6lNf_2wnnHqVwjIEf0jw_A4e2FZ6kOM-506ZEs0VjVaJs6bf-aODpdwHwDH5ODPoYLtP6yGzISOqqp5fH4fEx4YbKAadsXFLsL6lnK0MS7ivDx1XsniNk7WAv012f79jo2ErI6M_DI8yYTTx4iLpPPHMQeJcvlRHGXs9Jo7RStwWO3iArMcs4nzVkv1wMswW7gaYhoFB5sxViDAeE7Voips-D8vXYuzYyt6',
    alt: 'Graduation Day'
  }
]

const items = computed(() => props.data.news_items || defaultNews)
</script>

<template>
  <section id="news" class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <SectionHeading 
          :subtitle="data.subtitle ?? 'Inside the School'"
          :title="data.title ?? 'Latest Updates'"
          titleClass="text-4xl"
        />
      </div>
      
      <div class="grid md:grid-cols-3 gap-10">
        <article v-for="(news, index) in items" :key="index" class="flex flex-col group transition-all duration-300">
          <div class="overflow-hidden rounded-2xl mb-6 shadow-soft group-hover:shadow-xl transition-all">
            <img 
              :alt="news.alt ?? news.title" 
              class="w-full aspect-video object-cover group-hover:scale-105 transition-transform duration-500 cursor-pointer" 
              :src="news.image" 
            />
          </div>
          <div class="flex items-center gap-4 mb-3">
            <span class="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">{{ news.category }}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ news.date }}</span>
          </div>
          <h4 class="text-xl font-bold mb-3 group-hover:text-primary cursor-pointer text-slate-900 dark:text-slate-100 transition-colors">
            {{ news.title }}
          </h4>
          <p class="text-slate-600 dark:text-slate-400 line-clamp-2 text-sm leading-relaxed">
            {{ news.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>
