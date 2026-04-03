<template>
  <section class="bg-brand-bg px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
    <div class="max-w-[1100px] mx-auto relative group">
      <!-- Floating Paper Airplane (Matches image placement) -->
      <div class="absolute -top-10 -right-4 z-20 animate-float-fast transition-transform group-hover:translate-x-2">
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 5L5 25L25 35M55 5L35 45L25 35M55 5L25 35" stroke="#29B6F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#4FC3F7"/>
          <path d="M25 35V45L30 38" fill="#0288D1" stroke="#0288D1" stroke-width="2"/>
        </svg>
      </div>

      <!-- Main Banner Container -->
      <div class="bg-[#33231C] rounded-tl-[16px] rounded-bl-[16px] rounded-tr-[120px] rounded-br-[16px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#45342C]">
        
        <!-- Stat Item 1 -->
        <div class="flex-1 p-8 md:p-12 flex items-start gap-5 border-b md:border-b-0 md:border-r border-[#45342C]/50 hover:bg-[#3D2C24] transition-colors duration-300">
          <div class="w-[52px] h-[52px] bg-[#EB5C3F] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <span class="material-symbols-outlined text-white text-2xl">school</span>
          </div>
          <div>
            <div class="flex items-baseline gap-1">
              <h3 class="text-white font-serif text-4xl md:text-[44px] font-bold leading-none mb-2">50+</h3>
            </div>
            <p class="text-gray-300/80 text-[13px] leading-relaxed font-medium">
              Schools are supported<br>across 29 states
            </p>
          </div>
        </div>

        <!-- Stat Item 2 -->
        <div class="flex-1 p-8 md:p-12 flex items-start gap-5 border-b md:border-b-0 md:border-r border-[#45342C]/50 hover:bg-[#3D2C24] transition-colors duration-300">
          <div class="w-[52px] h-[52px] bg-[#F4C622] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <span class="material-symbols-outlined text-white text-2xl">groups</span>
          </div>
          <div>
            <h3 class="text-white font-serif text-4xl md:text-[44px] font-bold leading-none mb-2">12K+</h3>
            <p class="text-gray-300/80 text-[13px] leading-relaxed font-medium">
              Helping the students<br>of all ages thrive
            </p>
          </div>
        </div>

        <!-- Stat Item 3 -->
        <div class="flex-1 p-8 md:p-12 flex items-start gap-5 hover:bg-[#3D2C24] transition-colors duration-300">
          <div class="w-[52px] h-[52px] bg-[#79B949] rounded-xl flex items-center justify-center shrink-0 shadow-lg">
            <span class="material-symbols-outlined text-white text-2xl">workspaces</span>
          </div>
          <div>
            <h3 class="text-white font-serif text-4xl md:text-[44px] font-bold leading-none mb-2">70+</h3>
            <p class="text-gray-300/80 text-[13px] leading-relaxed font-medium">
              Available field workspaces<br>and increasing
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// No reactive data needed here as it's static banner for now, 
// but could be prop-driven in future.
</script>

<style scoped>
/* Individual column hover effects handled by Tailwind */
</style>
