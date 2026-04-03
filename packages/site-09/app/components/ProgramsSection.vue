<template>
  <section id="programs" class="py-16 md:py-24 bg-brand-bg px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
        <div class="max-w-2xl">
          <h2 class="font-serif text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-bold text-brand-textDark tracking-tight mb-4">
            Nurturing young minds through <span class="text-brand-orange">holistic growth</span>
          </h2>
          <p class="text-[15px] md:text-[17px] font-semibold text-brand-textDark/70 max-w-lg leading-relaxed">
            Explore our diverse range of educational programs designed for every stage of a child's development.
          </p>
        </div>
        <NuxtLink to="/programs" class="text-brand-orange font-bold flex items-center gap-2 group hover:gap-3 transition-all duration-300">
          View All Programs 
          <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">arrow_forward</span>
        </NuxtLink>
      </div>

      <!-- Educational Programs Grid -->
      <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <!-- Program Card 1: Primary Years (Yellow) -->
        <div class="group relative bg-[#FFD426] rounded-[32px] p-6 pt-10 overflow-hidden shadow-soft hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px]">
          <div class="relative z-10 flex-grow">
            <!-- Icon/Doodle Placeholder -->
            <div class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-6 text-white rotate-3 group-hover:rotate-12 transition-transform">
              <span class="material-symbols-outlined text-3xl">school</span>
            </div>
            <h3 class="font-serif text-2xl text-brand-textDark font-bold mb-3">Primary Years</h3>
            <p class="text-brand-textDark/80 text-sm leading-relaxed font-medium">
              Laying a strong foundation through activity-based learning and creative expression.
            </p>
          </div>
          
          <!-- Image Placeholder -->
          <div class="relative mt-6 -mx-6 -mb-6 aspect-[4/3] bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-white/40 group-hover:scale-125 transition-transform duration-500">face</span>
            <div class="absolute inset-0 bg-gradient-to-t from-[#FFD426]/40 to-transparent"></div>
          </div>
        </div>

        <!-- Program Card 2: Secondary School (Red) -->
        <div class="group relative bg-[#EB5C3F] rounded-[32px] p-6 pt-10 overflow-hidden shadow-soft hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px]">
          <div class="relative z-10 flex-grow">
            <!-- Icon/Doodle Placeholder -->
            <div class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-6 text-white -rotate-3 group-hover:-rotate-12 transition-transform">
              <span class="material-symbols-outlined text-3xl">auto_stories</span>
            </div>
            <h3 class="font-serif text-2xl text-white font-bold mb-3">Secondary School</h3>
            <p class="text-white/90 text-sm leading-relaxed font-medium">
              Empowering students with critical thinking and leadership skills for the future.
            </p>
          </div>
          
          <!-- Image Placeholder -->
          <div class="relative mt-6 -mx-6 -mb-6 aspect-[4/3] bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-white/40 group-hover:scale-125 transition-transform duration-500">child_care</span>
            <div class="absolute inset-0 bg-gradient-to-t from-[#EB5C3F]/40 to-transparent"></div>
          </div>
        </div>

        <!-- Program Card 3: Digital Literacy (Green) -->
        <div class="group relative bg-[#79B949] rounded-[32px] p-6 pt-10 overflow-hidden shadow-soft hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px]">
          <div class="relative z-10 flex-grow">
            <!-- Icon/Doodle Placeholder -->
            <div class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-6 text-white rotate-6 group-hover:rotate-0 transition-transform">
              <span class="material-symbols-outlined text-3xl">computer</span>
            </div>
            <h3 class="font-serif text-2xl text-white font-bold mb-3">Digital Literacy</h3>
            <p class="text-white/90 text-sm leading-relaxed font-medium">
              Bridging the digital divide with hands-on training in technology and modern tools.
            </p>
          </div>
          
          <!-- Image Placeholder -->
          <div class="relative mt-6 -mx-6 -mb-6 aspect-[4/3] bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-white/40 group-hover:scale-125 transition-transform duration-500">laptop_chromebook</span>
            <div class="absolute inset-0 bg-gradient-to-t from-[#79B949]/40 to-transparent"></div>
          </div>
        </div>

        <!-- Program Card 4: Arts & Sports (Blue) -->
        <div class="group relative bg-[#3B82F6] rounded-[32px] p-6 pt-10 overflow-hidden shadow-soft hover:-translate-y-2 transition-all duration-500 flex flex-col min-h-[400px]">
          <div class="relative z-10 flex-grow">
            <!-- Icon/Doodle Placeholder -->
            <div class="w-12 h-12 bg-white/30 rounded-2xl flex items-center justify-center mb-6 text-white -rotate-6 group-hover:rotate-0 transition-transform">
              <span class="material-symbols-outlined text-3xl">palette</span>
            </div>
            <h3 class="font-serif text-2xl text-white font-bold mb-3">Arts & Sports</h3>
            <p class="text-white/90 text-sm leading-relaxed font-medium">
              Encouraging self-discovery through artistic expression and physical fitness activities.
            </p>
          </div>
          
          <!-- Image Placeholder -->
          <div class="relative mt-6 -mx-6 -mb-6 aspect-[4/3] bg-white/20 backdrop-blur-sm border-t border-white/40 flex items-center justify-center overflow-hidden">
            <span class="material-symbols-outlined text-4xl text-white/40 group-hover:scale-125 transition-transform duration-500">sports_basketball</span>
            <div class="absolute inset-0 bg-gradient-to-t from-[#3B82F6]/40 to-transparent"></div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Programs data is now integrated into the template for more granular styling control
</script>

<style scoped>
#programs {
  scroll-margin-top: 100px;
}
</style>
