<template>
  <div>
    <!-- Hero Section -->


    <!-- Blog Grid -->
    <section class="py-24 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <!-- Categories / Filters (Static for now) -->
        <div class="flex flex-wrap items-center justify-center gap-3 mb-16">
          <button class="px-5 py-2 rounded-full bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-sm shadow-md transition-transform hover:-translate-y-0.5">All Posts</button>
          <button class="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Events</button>
          <button class="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Student Stories</button>
          <button class="px-5 py-2 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-semibold text-sm hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors">Volunteers</button>
        </div>

        <!-- Featured Post -->
        <div class="mb-16">
          <NuxtLink to="/blog/example-post" class="group grid lg:grid-cols-2 gap-8 lg:gap-12 bg-slate-50 dark:bg-slate-800 rounded-3xl p-4 lg:p-8 border border-slate-100 dark:border-slate-700 hover:border-primary/30 transition-all duration-300 items-center">
            <div class="aspect-[4/3] lg:aspect-video rounded-2xl overflow-hidden bg-slate-200 dark:bg-slate-700 w-full flex items-center justify-center relative">
              <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
              <div class="text-center text-slate-400 z-0">
                <span class="material-symbols-outlined text-5xl mb-2">image</span>
                <p class="font-bold text-sm">Post Image</p>
              </div>
            </div>
            <div>
              <div class="flex items-center gap-3 mb-4">
                <span class="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">Featured</span>
                <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">May 15, 2024</span>
              </div>
              <h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6 group-hover:text-primary transition-colors leading-tight">
                The Impact of Art Therapy on Our Students
              </h2>
              <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed mb-8 line-clamp-3">
                Discover how integrating creative arts into our daily curriculum has transformed the way children express themselves and process complex emotions. See the beautiful murals and projects crafted by our talented students this semester.
              </p>
              <div class="flex items-center gap-3">
                <div class="w-10 h-10 rounded-full bg-slate-300 dark:bg-slate-600"></div>
                <div>
                  <p class="text-sm font-bold text-slate-900 dark:text-slate-100">Lakshmi R.</p>
                  <p class="text-xs text-slate-500">Arts Coordinator</p>
                </div>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Latest Posts Grid -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <NuxtLink v-for="post in posts" :key="post.id" :to="`/blog/${post.slug}`" class="group bg-white dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col h-full">
            <div class="aspect-[16/10] bg-slate-100 dark:bg-slate-700 relative overflow-hidden flex items-center justify-center shrink-0">
              <div class="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors z-10"></div>
              <img v-if="post.image" :src="post.image" :alt="post.title" class="w-full h-full object-cover z-0 group-hover:scale-105 transition-transform duration-500" />
              <div v-else class="text-center text-slate-400 z-0 group-hover:scale-105 transition-transform duration-500">
                <span class="material-symbols-outlined text-4xl mb-2">image</span>
                <p class="font-bold text-xs uppercase">{{ post.category }} Image</p>
              </div>
            </div>
            <div class="p-6 md:p-8 flex flex-col flex-grow">
              <div class="flex items-center gap-3 mb-4">
                <span class="text-primary text-xs font-bold uppercase tracking-wider">{{ post.category }}</span>
                <span class="w-1 h-1 rounded-full bg-slate-300 dark:bg-slate-600"></span>
                <span class="text-slate-500 dark:text-slate-400 text-sm font-medium">{{ post.date }}</span>
              </div>
              <h3 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-4 group-hover:text-primary transition-colors leading-snug">
                {{ post.title }}
              </h3>
              <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed mb-6 flex-grow line-clamp-3">
                {{ post.excerpt }}
              </p>
              <div class="inline-flex items-center gap-1 font-bold text-sm text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors mt-auto w-fit">
                Read Article <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </div>
            </div>
          </NuxtLink>
        </div>

        <!-- Pagination -->
        <div class="mt-16 flex justify-center items-center gap-2">
          <button class="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400 flex items-center justify-center cursor-not-allowed border border-slate-200 dark:border-slate-700">
            <span class="material-symbols-outlined text-sm">chevron_left</span>
          </button>
          <button class="w-10 h-10 rounded-full bg-primary text-white font-bold flex items-center justify-center shadow-md border border-primary">1</button>
          <button class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">2</button>
          <button class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">3</button>
          <button class="w-10 h-10 rounded-full bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 transition-colors">
            <span class="material-symbols-outlined text-sm">chevron_right</span>
          </button>
        </div>

      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Blog | Arunachala Village School',
  description: 'Read the latest updates, stories, and educational insights from Arunachala Village School.'
})

const posts = [
  {
    id: 1,
    slug: 'example-post-1',
    category: 'Events',
    date: 'May 10, 2024',
    title: 'Annual Sports Day: A Celebration of Teamwork and Joy',
    excerpt: 'Our students showcased incredible spirit and athleticism during this year\'s Sports Day. From track events to joyful relay races, see the highlights.',
    image: null
  },
  {
    id: 2,
    slug: 'example-post-2',
    category: 'Volunteers',
    date: 'April 28, 2024',
    title: 'Welcome to Our New International Volunteers',
    excerpt: 'This month we welcomed three new volunteers who will be helping with our English and Computer Science curriculums. Read about their journey.',
    image: null
  },
  {
    id: 3,
    slug: 'example-post-3',
    category: 'Education',
    date: 'April 15, 2024',
    title: 'How Our Organic Garden is Teaching Math',
    excerpt: 'Connecting classroom theory to real-world application. Students are now using geometry and algebra to plan crop rotations in our campus garden.',
    image: null
  },
  {
    id: 4,
    slug: 'example-post-4',
    category: 'Student Stories',
    date: 'March 22, 2024',
    title: 'Karthik\'s Journey: From Shy Observer to Public Speaker',
    excerpt: 'Discover how a supportive environment and our tailored confidence-building workshops helped one of our quietest students find his voice.',
    image: null
  },
  {
    id: 5,
    slug: 'example-post-5',
    category: 'Infrastructure',
    date: 'March 10, 2024',
    title: 'New Solar Panels Installed: Reaching 100% Sustainability',
    excerpt: 'We are proud to announce that our main building is now entirely powered by renewable energy, reinforcing our commitment to the environment.',
    image: null
  },
  {
    id: 6,
    slug: 'example-post-6',
    category: 'Events',
    date: 'February 28, 2024',
    title: 'Science Fair 2024: Innovation in Rural Tamil Nadu',
    excerpt: 'From water filtration systems to homemade robotics, our students displayed breathtaking scientific models using upcycled materials and deep thinking.',
    image: null
  }
]
</script>
