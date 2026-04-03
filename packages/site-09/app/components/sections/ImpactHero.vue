<script setup lang="ts">
defineProps<{
  data: {
    title?: string
    description?: string
    cta_text?: string
    cta_url?: string
    bg_image_url?: string
  }
}>()
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
    <div 
      class="relative overflow-hidden rounded-[2rem] md:rounded-[3rem] min-h-[500px] flex flex-col items-center justify-center p-8 text-center bg-cover bg-center shadow-2xl transition-all duration-700 hover:shadow-primary/10 group" 
      :style="{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('${data.bg_image_url ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuA0rqvmoFLQshG-AW-p8prrJm44-UaA9GJyXFGU1fBzKulAyLf6Rix5n9Ghex7ZNZK3VBvtUvpgOc0Qfk2sdu9gpxtJZFO7ddtSeT6Cg0Uk8Dj43a0RLK1ACXZOZwl0Z4iOYARbAdWrEUG_P-MxVQLZObH1JtBfwtSDW3oIi8DUXje5hTO2EtY57xKzlek8UfhCqXAEg45uyXRr0ZJEXSSotByIufH9yLCq1hnBjI-LghPlGXr4TfPUTmtYhp_dsr1TIJhQB7SrMsvm'}')` }"
    >
      <div class="max-w-3xl space-y-8 relative z-10 transition-transform duration-700 group-hover:scale-105">
        <h1 class="text-white text-5xl md:text-7xl font-black leading-tight tracking-tight font-serif">
          {{ data.title ?? 'Witness the Power of Education' }}
        </h1>
        <p class="text-white/90 text-xl md:text-2xl font-medium max-w-2xl mx-auto leading-relaxed">
          {{ data.description ?? 'Every child has a story. Behind every statistic is a life transformed, a dream nurtured, and a community uplifted through your support.' }}
        </p>
        <AppButton v-if="data.cta_text" :to="data.cta_url ?? '#'" variant="primary" class="shadow-2xl transition-all hover:scale-110 px-10 py-4 text-lg">
          {{ data.cta_text }}
        </AppButton>
      </div>
      <!-- Decorative Overlay -->
      <div class="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
    </div>
  </section>
</template>
