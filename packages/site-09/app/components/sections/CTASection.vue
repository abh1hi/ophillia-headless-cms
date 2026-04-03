<script setup lang="ts">
const props = defineProps<{
  data: {
    title?: string
    description?: string
    cta_primary_text?: string
    cta_primary_url?: string
    cta_secondary_text?: string
    cta_secondary_url?: string
    bg_color?: string
  }
}>()
</script>

<template>
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
    <div 
      class="rounded-[3rem] p-8 md:p-20 text-center text-white relative overflow-hidden shadow-2xl transition-all duration-700 hover:shadow-primary/20 group"
      :style="{ backgroundColor: data.bg_color || '#EB5C3F' }"
    >
      <!-- Decorative Elements -->
      <div class="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full -mr-40 -mt-40 transition-transform duration-1000 group-hover:scale-150"></div>
      <div class="absolute bottom-0 left-0 w-64 h-64 bg-black/5 rounded-full -ml-32 -mb-32 transition-transform duration-1000 group-hover:scale-150"></div>
      
      <div class="relative z-10 max-w-4xl mx-auto space-y-10 transition-transform duration-700 group-hover:scale-105">
        <h2 class="text-5xl md:text-7xl font-black font-serif leading-tight">
          {{ data.title ?? 'Be Part of the Story' }}
        </h2>
        <p class="text-white/90 text-xl md:text-2xl font-medium leading-relaxed max-w-3xl mx-auto">
          {{ data.description ?? 'Your donation provides more than just school supplies; it provides a future full of possibility. Change a life today.' }}
        </p>
        <div class="flex flex-col sm:flex-row gap-6 justify-center pt-4">
          <AppButton 
            v-if="data.cta_primary_text" 
            :to="data.cta_primary_url ?? '/'" 
            class="bg-white text-primary font-black text-xl px-12 py-5 rounded-2xl shadow-2xl transition-all hover:bg-slate-50 hover:scale-110 border-0 uppercase tracking-widest"
          >
            {{ data.cta_primary_text }}
          </AppButton>
          <AppButton 
            v-else
            to="/donate"
            class="bg-white text-[#EB5C3F] font-black text-xl px-12 py-5 rounded-2xl shadow-2xl transition-all hover:bg-slate-50 hover:scale-110 border-0 uppercase tracking-widest"
          >
            Donate Now
          </AppButton>

          <AppButton 
            v-if="data.cta_secondary_text" 
            :to="data.cta_secondary_url ?? '/'" 
            class="bg-transparent text-white border-2 border-white/40 font-black text-xl px-12 py-5 rounded-2xl transition-all hover:bg-white/10 hover:text-white hover:scale-110 uppercase tracking-widest"
          >
            {{ data.cta_secondary_text }}
          </AppButton>
          <AppButton 
            v-else
            to="/volunteer"
            class="bg-transparent text-white border-2 border-white/40 font-black text-xl px-12 py-5 rounded-2xl transition-all hover:bg-white/10 hover:text-white hover:scale-110 uppercase tracking-widest"
          >
            Volunteer With Us
          </AppButton>
        </div>
      </div>
    </div>
  </section>
</template>
