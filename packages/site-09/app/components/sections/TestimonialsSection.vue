<script setup lang="ts">
interface Testimonial {
  quote?: string
  author?: string
  role?: string
  image_url?: string
}

const props = defineProps<{
  data: {
    title?: string
    subtitle?: string
    testimonials?: Testimonial[]
  }
}>()

const defaultTestimonials: Testimonial[] = [
  { quote: 'Testimonial quote...', author: 'Author Name', role: 'Role' }
]

const items = computed(() => props.data.testimonials || defaultTestimonials)
</script>

<template>
  <section class="w-full py-24 bg-primary/5">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-20">
        <h3 v-if="data.title" class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black font-serif">{{ data.title }}</h3>
        <p v-if="data.subtitle" class="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">{{ data.subtitle }}</p>
      </div>

      <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div 
          v-for="(item, index) in items" 
          :key="index"
          class="bg-white dark:bg-slate-800 p-10 rounded-[3rem] shadow-soft border border-slate-100 dark:border-slate-700 relative hover:shadow-2xl transition-all duration-500 group"
        >
          <span class="material-symbols-outlined text-primary/10 text-8xl absolute top-4 right-10 group-hover:scale-110 transition-transform duration-500">format_quote</span>
          <div class="flex items-center gap-6 mb-8 relative z-10">
            <div class="size-20 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0 border-4 border-primary/10 shadow-lg group-hover:scale-110 transition-transform duration-500">
               <img v-if="item.image_url" :src="item.image_url" class="w-full h-full object-cover" :alt="item.author" />
               <div v-else class="w-full h-full flex items-center justify-center text-slate-400">
                 <span class="material-symbols-outlined text-4xl">person</span>
               </div>
            </div>
            <div>
              <p class="text-slate-900 dark:text-slate-100 text-2xl font-black font-serif">{{ item.author }}</p>
              <p class="text-primary font-black text-xs uppercase tracking-widest mt-1">{{ item.role }}</p>
            </div>
          </div>
          <p class="text-slate-700 dark:text-slate-300 italic text-lg leading-relaxed font-medium relative z-10">
            "{{ item.quote }}"
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
