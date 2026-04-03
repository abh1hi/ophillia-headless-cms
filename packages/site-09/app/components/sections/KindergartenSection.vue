<script setup lang="ts">
const props = defineProps<{
  data: {
    badge?: string
    title?: string
    description?: string
    features?: string[]
    image_url?: string
  }
}>()
</script>

<template>
  <section class="py-24 bg-slate-900 overflow-hidden relative group">
    <!-- Decorative background -->
    <div class="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
    <div class="absolute -top-24 -right-24 w-96 h-96 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-1000"></div>

    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
      <div class="grid lg:grid-cols-2 gap-20 items-center">
        <div class="space-y-8">
          <div v-if="data.badge" class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 text-primary text-sm font-black w-fit mb-2 uppercase tracking-widest border border-primary/20">
            <span class="material-symbols-outlined text-sm font-black">child_friendly</span>
            {{ data.badge }}
          </div>
          <h3 v-if="data.title" class="text-4xl md:text-6xl font-black text-white font-serif leading-tight">
            {{ data.title }}
          </h3>
          <p v-if="data.description" class="text-xl text-slate-300 leading-relaxed font-medium">
            {{ data.description }}
          </p>
          <div class="grid sm:grid-cols-2 gap-4">
            <div 
              v-for="(feature, index) in data.features" 
              :key="index"
              class="flex items-center gap-3 text-slate-200 bg-white/5 p-4 rounded-2xl border border-white/10 hover:bg-white/10 transition-colors group/item"
            >
              <span class="material-symbols-outlined text-primary text-2xl font-black group-hover/item:scale-125 transition-transform duration-300">check_circle</span>
              <span class="font-bold text-sm uppercase tracking-wider">{{ feature }}</span>
            </div>
          </div>
        </div>

        <div class="relative">
          <div class="aspect-square rounded-[4rem] overflow-hidden bg-white/5 border border-white/10 flex items-center justify-center shadow-2xl group/img">
            <img v-if="data.image_url" :src="data.image_url" class="w-full h-full object-cover transition-transform duration-1000 group-hover/img:scale-110">
            <div v-else class="text-center text-slate-500">
              <span class="material-symbols-outlined text-9xl mb-6 opacity-30">child_friendly</span>
              <p class="text-[10px] font-black uppercase tracking-widest opacity-50">Campus Photo</p>
            </div>
          </div>
          <!-- Floating Badge -->
          <div class="absolute -bottom-10 -left-10 bg-white p-8 rounded-[3rem] shadow-2xl border border-slate-100 hidden md:block animate-bounce-slow">
             <div class="flex items-center gap-4">
                <div class="bg-primary/20 p-3 rounded-2xl text-primary">
                   <span class="material-symbols-outlined text-3xl font-black">favorite</span>
                </div>
                <div>
                   <p class="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1">Our Heart</p>
                   <p class="text-xl font-black text-slate-900 font-serif leading-none">Nurturing Joy</p>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.animate-bounce-slow {
  animation: bounce-slow 4s infinite ease-in-out;
}
@keyframes bounce-slow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
</style>
