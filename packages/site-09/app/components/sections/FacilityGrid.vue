<script setup lang="ts">
interface Facility {
  icon?: string
  title?: string
  description?: string
  image_url?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    description?: string
    facilities?: Facility[]
  }
}>()

const defaultFacilities: Facility[] = [
  { icon: 'school', title: 'Classrooms', description: 'Description...' }
]

const facilities = computed(() => props.data.facilities || defaultFacilities)
</script>

<template>
  <section class="py-24 bg-primary/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-3xl mx-auto mb-20">
        <h2 v-if="data.subtitle" class="text-primary font-black tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-slate-900 dark:text-slate-100 mb-8 font-serif leading-tight">{{ data.title }}</h3>
        <p v-if="data.description" class="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed">
          {{ data.description }}
        </p>
      </div>

      <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
        <div 
          v-for="(facility, index) in facilities" 
          :key="index" 
          class="bg-white dark:bg-slate-800 rounded-[3rem] p-1 shadow-soft hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 group"
        >
          <!-- Image Container -->
          <div class="aspect-video rounded-[2.8rem] overflow-hidden bg-slate-100 dark:bg-slate-700 relative">
             <img v-if="facility.image_url" :src="facility.image_url" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
             <div v-else class="w-full h-full flex flex-col items-center justify-center text-slate-400">
                <span class="material-symbols-outlined text-5xl mb-2">{{ facility.icon || 'home_work' }}</span>
                <p class="text-[10px] font-black uppercase tracking-widest">Image Placeholder</p>
             </div>
             <div class="absolute top-4 right-4 bg-white/90 backdrop-blur p-3 rounded-2xl shadow-lg group-hover:bg-primary group-hover:text-white transition-colors duration-500">
                <span class="material-symbols-outlined">{{ facility.icon || 'home_work' }}</span>
             </div>
          </div>
          <div class="p-8">
            <h4 class="text-2xl font-black text-slate-900 dark:text-slate-100 mb-4 font-serif leading-tight group-hover:text-primary transition-colors">
              {{ facility.title }}
            </h4>
            <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed font-medium">
              {{ facility.description }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
