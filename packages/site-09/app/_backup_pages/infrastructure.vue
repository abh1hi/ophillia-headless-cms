<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-slate-900">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -right-20 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[120px]"></div>
        <div class="absolute bottom-0 left-0 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-[100px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mb-8">
            <span class="material-symbols-outlined text-sm">apartment</span>
            Infrastructure
          </div>
          <h1 class="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white mb-8">
            A Campus That <span class="text-primary">Teaches</span>
          </h1>
          <p class="text-xl text-slate-300 max-w-2xl leading-relaxed">
            Arunachala Village School is an innovative education model — a child-friendly, nature-integrated campus where every element is intentionally crafted to stimulate curiosity, critical thinking, and artistic expression.
          </p>
        </div>
      </div>
    </section>

    <!-- Intro stat cards -->
    <section class="py-16 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div v-for="stat in stats" :key="stat.label" class="bg-primary/5 border border-primary/10 rounded-2xl p-6 text-center hover:bg-primary/10 transition-colors">
            <span class="material-symbols-outlined text-primary text-3xl mb-3 block">{{ stat.icon }}</span>
            <p class="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1">{{ stat.value }}</p>
            <p class="text-xs font-semibold text-slate-500 dark:text-slate-400">{{ stat.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- A Campus That Teaches -->
    <section class="py-24 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Design Philosophy</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">A Campus That Teaches</h3>
            <div class="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                The school's design is highly creative and artistic, with <strong class="text-slate-800 dark:text-slate-200">vibrant murals, interactive installations, and open spaces</strong> encouraging exploration.
              </p>
              <p>
                Classrooms extend beyond four walls, with <strong class="text-slate-800 dark:text-slate-200">treehouse learning pods</strong> offering a unique perspective on education—literally elevating the learning experience.
              </p>
              <p>
                The campus is lush with greenery, featuring native plants, butterfly gardens, and shaded groves that make the environment a living classroom for ecology and biodiversity lessons.
              </p>
            </div>
          </div>
          <!-- Image Placeholder -->
          <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <div class="text-center text-slate-400 dark:text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-3">park</span>
              <p class="text-sm font-medium">Campus Overview Photo</p>
            </div>
          </div>
        </div>

        <!-- Play Section -->
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <!-- Image Placeholder -->
          <div class="order-2 lg:order-1 aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <div class="text-center text-slate-400 dark:text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-3">sports_soccer</span>
              <p class="text-sm font-medium">Play & Adventure Photo</p>
            </div>
          </div>
          <div class="order-1 lg:order-2">
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Active Learning</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Learning Through Play and Challenge</h3>
            <div class="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Play is central to the school's philosophy, with <strong class="text-slate-800 dark:text-slate-200">obstacle courses, climbing structures, and adventure zones</strong> that build physical resilience and problem-solving skills.
              </p>
              <p>
                Playway learning tools — sensory paths, musical walls, and math-based playground games — ensure that education is hands-on and engaging.
              </p>
              <p>
                The school also promotes sustainability through <strong class="text-slate-800 dark:text-slate-200">upcycled play equipment</strong>, where discarded materials are creatively transformed into swings, balance beams, and art installations.
              </p>
            </div>
          </div>
        </div>

        <!-- Sustainability Section -->
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Sustainability</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Sustainable and Self-Sufficient Practices</h3>
            <div class="space-y-4 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                As a <strong class="text-slate-800 dark:text-slate-200">fully solar-powered campus</strong>, the school demonstrates renewable energy in action.
              </p>
              <p>
                Students actively maintain the vegetable and fruit garden and learn organic farming while contributing to the school's kitchen.
              </p>
              <p>
                Each class tends to its <strong class="text-slate-800 dark:text-slate-200">mini-farm plot</strong>, reinforcing responsibility and environmental stewardship lessons.
              </p>
            </div>
          </div>
          <!-- Image Placeholder -->
          <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 flex items-center justify-center border border-slate-200 dark:border-slate-700 shadow-lg">
            <div class="text-center text-slate-400 dark:text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-3">solar_power</span>
              <p class="text-sm font-medium">Gardens & Solar Photo</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spaces Grid -->
    <section class="py-24 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Spaces</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100">Spaces Designed for Exploration</h3>
        </div>
        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div v-for="space in spaces" :key="space.title" class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-md transition-all duration-300">
            <span class="material-symbols-outlined text-primary text-3xl mb-4 block">{{ space.icon }}</span>
            <h4 class="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-2">{{ space.title }}</h4>
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{{ space.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Kindergarten -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mb-6">
              <span class="material-symbols-outlined text-sm">child_care</span>
              Early Childhood
            </div>
            <h3 class="text-4xl font-extrabold text-white mb-6">Kindergarten: A Wonderland for Young Minds</h3>
            <p class="text-slate-300 text-lg leading-relaxed mb-8">
              The kindergarten campus is a magical space tailored for tiny explorers. It features <strong class="text-white">soft-play areas, sensory gardens, and storytelling corners</strong>. Low shelves with Montessori-inspired tools encourage independence, while child-sized furniture and art stations nurture creativity.
            </p>
            <div class="grid grid-cols-2 gap-4">
              <div v-for="kgFeature in kgFeatures" :key="kgFeature" class="flex items-start gap-2 text-slate-400 text-sm">
                <span class="material-symbols-outlined text-primary text-sm mt-0.5 shrink-0">check_circle</span>
                {{ kgFeature }}
              </div>
            </div>
          </div>
          <!-- Image Placeholder -->
          <div class="aspect-square rounded-3xl overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center">
            <div class="text-center text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-3">child_friendly</span>
              <p class="text-sm font-medium">Kindergarten Campus Photo</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Closing Statement -->
    <section class="py-24 bg-white dark:bg-slate-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="material-symbols-outlined text-primary text-5xl mb-6 block">nature</span>
        <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">A Living, Breathing Ecosystem of Learning</h3>
        <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
          Every pathway, treehouse, garden, and game is designed to inspire, challenge, and educate. By merging sustainability, creativity, and play, the campus ensures that students don't just learn about the world — they <strong class="text-slate-800 dark:text-slate-200">experience it in the most joyful and meaningful ways</strong>.
        </p>
        <AppButton href="/about" variant="primary">Learn About Our Story</AppButton>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Infrastructure | Arunachala Village School',
  description: 'Explore the creative, nature-integrated campus of Arunachala Village School — from treehouse classrooms to solar power, butterfly gardens, and a Montessori kindergarten.'
})

const stats = [
  { icon: 'solar_power', value: '100%', label: 'Solar Powered' },
  { icon: 'park', value: '2+', label: 'Dedicated Gardens' },
  { icon: 'directions_bus', value: '2', label: 'School Buses' },
  { icon: 'local_library', value: '24/7', label: 'Open Library' },
]

const spaces = [
  {
    icon: 'local_library',
    title: 'Open 24/7 Library',
    desc: 'Nestled in a cozy nook, this library invites students to read anytime — a quiet haven always accessible.'
  },
  {
    icon: 'forest',
    title: 'Open-Air Classrooms',
    desc: 'Learning spaces under canopies and beside gardens, allowing lessons to flow with nature and fresh air.'
  },
  {
    icon: 'wc',
    title: 'Hygiene Facilities',
    desc: 'Well-designed toilet facilities that prioritize hygiene, comfort, and dignity for every student.'
  },
  {
    icon: 'sports',
    title: 'Vast Playground',
    desc: 'Zones for sports, creative play, and quiet reflection — something for every child\'s energy and mood.'
  },
  {
    icon: 'directions_bus',
    title: 'School Transportation',
    desc: 'Two dedicated school buses ensuring safe and eco-friendly transportation for every student.'
  },
  {
    icon: 'deck',
    title: 'Treehouse Learning Pods',
    desc: 'Elevated learning spaces that give students a fresh vantage point, sparking imagination and focus.'
  },
]

const kgFeatures = [
  'Soft-play areas',
  'Sensory gardens',
  'Storytelling corners',
  'Montessori-inspired tools',
  'Child-sized furniture',
  'Creative art stations',
]
</script>
