<script setup lang="ts">
interface Program {
  title?: string
  description?: string
  color?: string
  icon?: string
  image_icon?: string
}

const props = defineProps<{
  data: {
    title?: string
    subtitle?: string
    cta_text?: string
    cta_url?: string
    programs?: Program[]
  }
}>()

const defaultPrograms: Program[] = [
  {
    title: 'Primary Years',
    description: 'Laying a strong foundation through activity-based learning and creative expression.',
    color: '#FFD426',
    icon: 'school',
    image_icon: 'face'
  },
  {
    title: 'Secondary School',
    description: 'Empowering students with critical thinking and leadership skills for the future.',
    color: '#EB5C3F',
    icon: 'auto_stories',
    image_icon: 'child_care'
  },
  {
    title: 'Digital Literacy',
    description: 'Bridging the digital divide with hands-on training in technology and modern tools.',
    color: '#79B949',
    icon: 'computer',
    image_icon: 'laptop_chromebook'
  },
  {
    title: 'Arts & Sports',
    description: 'Encouraging self-discovery through artistic expression and physical fitness activities.',
    color: '#3B82F6',
    icon: 'palette',
    image_icon: 'sports_basketball'
  }
]

const programs = computed(() => props.data.programs || defaultPrograms)
</script>

<template>
  <section id="programs" class="py-16 md:py-24 bg-brand-bg px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
        <div class="max-w-2xl">
          <h2 class="font-serif text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-bold text-brand-textDark tracking-tight mb-4" v-html="data.title ?? 'Nurturing young minds through <span class=\'text-brand-orange\'>holistic growth</span>'">
          </h2>
          <p class="text-[15px] md:text-[17px] font-semibold text-brand-textDark/70 max-w-lg leading-relaxed">
            {{ data.subtitle ?? 'Explore our diverse range of educational programs designed for every stage of a child\'s development.' }}
          </p>
        </div>
        <NuxtLink v-if="data.cta_text" :to="data.cta_url ?? '/'" class="text-brand-orange font-bold flex items-center gap-2 group hover:gap-3 transition-all duration-300">
          {{ data.cta_text }}
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </NuxtLink>
      </div>

      <!-- Educational Programs Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div 
          v-for="(program, index) in programs"
          :key="index"
          class="group relative rounded-[32px] p-6 pt-10 overflow-hidden shadow-soft hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px]"
          :style="{ backgroundColor: program.color }"
        >
          <div class="relative z-10 flex-grow">
            <!-- Icon/Doodle Placeholder -->
            <div 
              class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-6 text-white transition-transform"
              :class="index % 2 === 0 ? 'rotate-3 group-hover:rotate-12' : '-rotate-3 group-hover:-rotate-12'"
            >
              <span class="material-symbols-outlined text-3xl">{{ program.icon || 'school' }}</span>
            </div>
            <h3 class="font-serif text-2xl text-brand-textDark font-bold mb-3" :class="{'text-white': program.color !== '#FFD426'}">{{ program.title }}</h3>
            <p class="text-sm leading-relaxed font-medium" :class="program.color === '#FFD426' ? 'text-brand-textDark/80' : 'text-white/90'">
              {{ program.description }}
            </p>
          </div>
          
          <!-- Image Placeholder -->
          <div class="relative mt-6 -mx-6 -mb-6 aspect-[4/3] bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-white/40 group-hover:scale-125 transition-transform duration-500">{{ program.image_icon || 'face' }}</span>
            <div class="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<style scoped>
#programs {
  scroll-margin-top: 100px;
}
</style>
