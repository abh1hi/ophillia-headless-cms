<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-24 bg-primary/5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit mx-auto mb-6">
          <span class="material-symbols-outlined text-sm">newspaper</span>
          Media & Recognition
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6">
          In the <span class="text-primary">Spotlight</span>
        </h1>
        <p class="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
          Explore our features in the press, awards received, and public recognition for our continued efforts in rural education and community development.
        </p>
      </div>
    </section>

    <!-- Awards & Accolades -->
    <section class="py-24 bg-slate-900 text-white">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold mb-4">Awards & Accolades</h2>
          <p class="text-slate-400 max-w-2xl mx-auto">Honoring our commitment to educational excellence and social impact.</p>
        </div>
        <div class="grid md:grid-cols-3 gap-8 text-center">
          <div v-for="award in awards" :key="award.title" class="p-8 border border-white/10 rounded-3xl bg-white/5 hover:bg-white/10 transition-colors">
            <span class="material-symbols-outlined text-primary text-5xl mb-4 block">{{ award.icon }}</span>
            <h3 class="text-xl font-bold mb-2">{{ award.title }}</h3>
            <p class="text-primary text-sm font-semibold mb-4">{{ award.year }}</p>
            <p class="text-slate-400 text-sm">{{ award.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Press Mentions -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h2 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">Press Releases & Mentions</h2>
          <p class="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">See what the media is saying about Arunachala Village School.</p>
        </div>
        
        <div class="grid lg:grid-cols-2 gap-8">
          <a v-for="article in press" :key="article.title" :href="article.link" target="_blank" class="flex flex-col sm:flex-row gap-6 p-6 rounded-2xl border border-slate-100 dark:border-slate-700 hover:border-primary/40 hover:shadow-md transition group">
            <div class="sm:w-1/3 bg-slate-100 dark:bg-slate-800 rounded-xl aspect-video flex-shrink-0 flex items-center justify-center text-slate-400">
               <span class="material-symbols-outlined text-4xl opacity-50">article</span>
            </div>
            <div class="flex flex-col flex-grow justify-center">
              <div class="flex items-center gap-2 mb-2">
                <span class="text-xs font-bold bg-primary/10 text-primary px-2 py-1 rounded">{{ article.publisher }}</span>
                <span class="text-xs text-slate-400">{{ article.date }}</span>
              </div>
              <h3 class="text-lg font-bold text-slate-900 dark:text-slate-100 mb-2 group-hover:text-primary transition-colors">{{ article.title }}</h3>
              <p class="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">{{ article.snippit }}</p>
            </div>
          </a>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Media & Recognition | Arunachala Village School',
  description: 'View the awards, accolades, and press mentions of Arunachala Village School.'
})

const awards = [
  {
    icon: 'workspace_premium',
    title: 'Excellence in Rural Education',
    year: '2023',
    description: 'Awarded for outstanding contribution to uplifting rural communities through quality, free education.'
  },
  {
    icon: 'public',
    title: 'Global Social Impact Award',
    year: '2022',
    description: 'Recognized by international NGOs for sustainable development and holistic child care models.'
  },
  {
    icon: 'verified',
    title: 'Best NGO School - Regional',
    year: '2020',
    description: 'Honored by the state education council for maintaining high academic and ethical standards.'
  }
]

const press = [
  {
    publisher: 'The Daily Tribune',
    date: 'Dec 15, 2023',
    title: 'How One School is Changing the Face of Rural Education',
    snippit: 'Arunachala Village School continues to set benchmarks with its holistic approach, offering free education and meals to hundreds of underprivileged children.',
    link: '#'
  },
  {
    publisher: 'Education World',
    date: 'Sep 08, 2023',
    title: 'Spotlight: The Methodology Rooted in Love',
    snippit: 'A deep dive into the unique child-centric pedagogy that makes learning stress-free and joyful at Arunachala.',
    link: '#'
  },
  {
    publisher: 'Local News Network',
    date: 'Jan 22, 2023',
    title: 'NGO Celebrates 25 Years of Service',
    snippit: 'The community gathered to celebrate a quarter-century of the school\'s profound impact on local villages.',
    link: '#'
  },
  {
    publisher: 'Global Times',
    date: 'Nov 05, 2022',
    title: 'Volunteers from Across the Globe Connect Here',
    snippit: 'The cultural exchange and volunteer program at this Indian village school is creating a truly global family.',
    link: '#'
  }
]
</script>
