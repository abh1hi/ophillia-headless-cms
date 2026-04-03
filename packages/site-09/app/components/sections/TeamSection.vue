<script setup lang="ts">
interface TeamMember {
  name?: string
  role?: string
  image_url?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    description?: string
    team?: TeamMember[]
  }
}>()

const defaultTeam: TeamMember[] = [
  { name: 'Member Name', role: 'Role' }
]

const members = computed(() => props.data.team || defaultTeam)
</script>

<template>
  <section class="py-24 bg-white dark:bg-slate-950">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="max-w-3xl mb-16">
        <h2 v-if="data.subtitle" class="text-primary font-bold tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 font-serif">{{ data.title }}</h3>
        <p v-if="data.description" class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed font-medium">
          {{ data.description }}
        </p>
      </div>
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        <div 
          v-for="(member, index) in members" 
          :key="index" 
          class="group bg-slate-50 dark:bg-slate-900 rounded-[32px] overflow-hidden border border-slate-100 dark:border-slate-800 hover:shadow-2xl hover:border-primary/30 transition-all duration-500"
        >
          <div class="aspect-square bg-slate-200 dark:bg-slate-800 flex items-center justify-center overflow-hidden">
            <img v-if="member.image_url" :src="member.image_url" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" :alt="member.name">
            <div v-else class="text-center text-slate-400 dark:text-slate-500">
              <span class="material-symbols-outlined text-6xl mb-2">person</span>
              <p class="text-xs font-bold uppercase tracking-widest">Photo Placeholder</p>
            </div>
          </div>
          <div class="p-8">
            <h4 class="text-2xl font-black text-slate-900 dark:text-slate-100 mb-1 font-serif">{{ member.name }}</h4>
            <p class="text-primary font-bold text-sm mb-6 uppercase tracking-wider">{{ member.role }}</p>
            <a href="#" class="inline-flex items-center gap-2 text-sm font-black text-slate-500 dark:text-slate-400 hover:text-primary transition-colors group/link">
              KNOW MORE 
              <span class="material-symbols-outlined text-sm group-hover/link:translate-x-1 transition-transform">arrow_forward</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
