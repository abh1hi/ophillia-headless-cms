<template>
  <section id="news" class="py-24 bg-white dark:bg-slate-900">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <SectionHeading 
          subtitle="Inside the School"
          title="Latest Updates"
          titleClass="text-4xl"
        />
      </div>
      
      <div class="grid md:grid-cols-3 gap-10">
        <article v-for="news in newsItems" :key="news.title" class="flex flex-col">
          <img 
            :alt="news.alt" 
            class="rounded-2xl w-full aspect-video object-cover mb-6 hover:opacity-90 transition-opacity cursor-pointer" 
            :src="news.image" 
          />
          <div class="flex items-center gap-4 mb-3">
            <span class="text-xs font-bold text-primary px-2 py-1 bg-primary/10 rounded">{{ news.category }}</span>
            <span class="text-xs text-slate-500 dark:text-slate-400">{{ news.date }}</span>
          </div>
          <h4 class="text-xl font-bold mb-3 hover:text-primary cursor-pointer text-slate-900 dark:text-slate-100">
            {{ news.title }}
          </h4>
          <p class="text-slate-600 dark:text-slate-400 line-clamp-2">
            {{ news.description }}
          </p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup>
const newsItems = [
  {
    category: 'Event',
    date: 'Oct 24, 2023',
    title: 'Class of 2023 Graduation Highlights',
    description: 'Celebrating our largest graduating class yet as they head off to prestigious universities across the country.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC3hMkLVk_dCCuagDZHFryuw9-cXFLXdX7UuH2BQ7hDE6lNf_2wnnHqVwjIEf0jw_A4e2FZ6kOM-506ZEs0VjVaJs6bf-aODpdwHwDH5ODPoYLtP6yGzISOqqp5fH4fEx4YbKAadsXFLsL6lnK0MS7ivDx1XsniNk7WAv012f79jo2ErI6M_DI8yYTTx4iLpPPHMQeJcvlRHGXs9Jo7RStwWO3iArMcs4nzVkv1wMswW7gaYhoFB5sxViDAeE7Voips-D8vXYuzYyt6',
    alt: 'Graduation Day'
  },
  {
    category: 'School News',
    date: 'Oct 12, 2023',
    title: 'Opening of the Community Tech Library',
    description: 'Our new library phase is complete, providing students with access to over 5,000 digital and physical resources.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCD5hUKJvj8NL3IpVsKiKggJF4d3vCjYNQbiZyIezMwVmikcvZ2Iej3EIK9ZqXJzqLMtbKV9Uj6i0PtlqJXPxKcU-yRJERWBfDMzbGj3qxWelV70fjE_mAWHeDLrSB-elpI_qTSyvpMZ_qc-XRrJ2JFM_tWxBY-841EkN9kS5qSWxPEBXr8uLcObKKBKoxea6Df2OXDYrTnRaI9n5Z0w2ustC_IyKygoXaDIcfMuFvIg_su5WcsQ71w7MNpJz8tn9UYWoc2dGfD9YG1',
    alt: 'New Library'
  },
  {
    category: 'Community',
    date: 'Sep 28, 2023',
    title: 'Winter Volunteer Program Openings',
    description: 'Applications are now open for the upcoming winter session. Join our international team of educators.',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDnxABzY9QpKueAOAwolaxglVBC4oB-71-HpsYxgP_9hRCeY95xi9k6P3JF7NPmBqt84D6Ml8itsbX93oJDQmx5c0w1EipsksvnsMzMlO9Ns4sV1mUFxr14vsy_fzIFGXqY90RVlNhYBUK3iUdXJuDByca5AZPTFeHw0hy9T8NPZCCGhZiSpCgdIRMADM3Z3aJ8zs7z2AKHnUvM0vfSvYqjmj2qDckzaiO6xYYasXf5vS4IQCDrn4Y2-lGjEP9m-brIAiF5YIYmqHmQ',
    alt: 'Volunteers working'
  }
];
</script>
