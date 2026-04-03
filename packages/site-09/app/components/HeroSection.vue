<template>
  <section class="bg-brand-bg font-sans text-brand-textDark antialiased overflow-x-hidden selection:bg-brand-orange selection:text-white relative">
    <div class="w-full max-w-[1400px] mx-auto pt-16 md:pt-24 px-4 sm:px-6 lg:px-8 relative">
      
      <!-- Background Decorative Elements -->
      <div class="absolute top-10 left-[10%] animate-float-slow z-0">
        <!-- Hot Air Balloon SVG -->
        <svg width="40" height="50" viewBox="0 0 40 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M20 35C31.0457 35 40 26.0457 40 15C40 3.95431 31.0457 0 20 0C8.9543 0 0 3.95431 0 15C0 26.0457 8.9543 35 20 35Z" fill="#F4F4F4"/>
          <path d="M20 35C25.5228 35 30 26.0457 30 15C30 3.95431 25.5228 0 20 0C14.4772 0 10 3.95431 10 15C10 26.0457 14.4772 35 20 35Z" fill="#E84C3D"/>
          <rect x="16" y="42" width="8" height="8" rx="2" fill="#D4A373"/>
          <path d="M12 30L16 42M28 30L24 42" stroke="#8D6E63" stroke-width="1.5" stroke-linecap="round"/>
        </svg>
      </div>
      <div class="absolute top-20 right-[15%] animate-float-fast z-0">
        <!-- Tennis Ball SVG -->
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="16" cy="16" r="14" fill="#C5E138" stroke="#A9C721" stroke-width="2"/>
          <path d="M10 4C14 10 14 22 10 28M22 4C18 10 18 22 22 28" stroke="white" stroke-width="2.5" stroke-linecap="round"/>
        </svg>
      </div>

      <!-- Hero Content Section -->
      <div class="text-center relative z-10 max-w-4xl mx-auto">
        <h1 class="font-serif text-[2.8rem] sm:text-[3.5rem] md:text-[4.5rem] leading-[1.1] font-bold text-brand-textDark tracking-tight">
          Illuminating the lives of  
 <span class="font-medium text-[#4A3B34]">children</span><br>
through education        </h1>

        <!-- Features Pills -->
        <div class="flex flex-wrap justify-center items-center gap-4 mt-8">
          <div v-for="feature in features" :key="feature" class="bg-white rounded-full px-5 py-2.5 flex items-center gap-2 shadow-soft">
            <div class="w-5 h-5 rounded-full bg-gray-100 flex items-center justify-center">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 3L4.5 8.5L2 6" stroke="#3A2B24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
            <span class="text-[13px] font-bold text-brand-textDark tracking-wide">{{ feature }}</span>
          </div>
        </div>

        <!-- CTA Button -->
        <NuxtLink to="/get-started" class="mt-10 bg-gradient-to-r from-[#FF874A] to-[#FF6721] text-white px-8 py-3.5 rounded-full font-bold text-[15px] shadow-orange hover:-translate-y-1 transition-transform duration-300 inline-flex items-center gap-3 mx-auto group">
          Start Learning
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" class="group-hover:translate-x-1 transition-transform">
            <path d="M3.33334 8H12.6667M12.6667 8L8 3.33334M12.6667 8L8 12.6667" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </NuxtLink>

        <!-- Subtitle -->
        <p class="mt-10 text-[15px] sm:text-[17px] font-semibold text-brand-textDark max-w-md mx-auto leading-relaxed">
          We just don't give our students only lecture but real life experiences.
        </p>
      </div>

      <!-- Center Visuals Layout -->
      <div class="relative w-full flex flex-col md:flex-row justify-center items-end mt-12 md:mt-16 min-h-[400px] mb-16 md:mb-24 px-4 md:px-0 gap-16 md:gap-0">
        
        <!-- Left Side: Boy & Green Shape -->
        <div class="relative w-full md:w-[350px] flex justify-center md:absolute md:left-[5%] md:bottom-0">
          <!-- Floating Target -->
          <div class="absolute -left-4 md:-left-12 top-1/2 -translate-y-1/2 z-20 animate-float-slow">
            <svg width="60" height="60" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="40" cy="40" r="30" fill="white" stroke="#60BDE4" stroke-width="6"/>
              <circle cx="40" cy="40" r="20" fill="white" stroke="#60BDE4" stroke-width="6"/>
              <circle cx="40" cy="40" r="10" fill="#60BDE4"/>
              <path d="M5 50L30 40M5 50L15 45M5 50L10 55" stroke="#FF6B21" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M5 50L35 40" stroke="#FF6B21" stroke-width="4" stroke-linecap="round"/>
            </svg>
          </div>
          
          <!-- Green Background Shape -->
          <div class="w-[260px] h-[300px] bg-brand-green rounded-tl-[130px] rounded-tr-[130px] rounded-bl-[130px] rounded-br-[20px] relative mt-16 md:mt-0 flex items-center justify-center">
            <!-- Placeholder for Kid Image -->
            <div class="absolute bottom-0 w-[240px] h-full flex flex-col items-center justify-end pb-12 z-10">
              <div class="bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl w-4/5 aspect-[3/4] flex flex-col items-center justify-center text-white/60 text-center px-4">
                <span class="material-symbols-outlined text-4xl mb-2">person</span>
                <p class="text-[10px] font-bold uppercase tracking-widest">Kid Image<br>Placeholder</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Center Illustration (Laptop Doodle) -->
        <div class="relative w-full md:w-[400px] flex justify-center md:mx-auto z-0 order-first md:order-none mb-10 md:mb-0">
          <svg width="300" height="280" viewBox="0 0 300 280" fill="none" xmlns="http://www.w3.org/2000/svg" class="scale-90 md:scale-100">
            <!-- SVG content -->
            <path d="M160 220C180 200 220 180 210 120" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M210 120C220 100 240 100 250 120C260 140 240 160 210 160" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M200 130C230 110 260 140 240 180" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" fill="none"/>
            <path d="M240 180C260 190 270 170 260 150" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" fill="#29B6F6"/>
            <path d="M150 120C130 90 150 60 180 70C210 80 190 120 150 120Z" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="none"/>
            <path d="M150 120C130 90 150 60 180 70C210 80 190 120 150 120Z" fill="white"/>
            <path d="M150 120C130 90 150 60 180 70C210 80 190 120 150 120Z" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M120 90C110 110 90 120 110 140" stroke="#1C1C1C" stroke-width="3" stroke-linecap="round" fill="#FFD426"/>
            <circle cx="120" cy="140" r="8" fill="#FF6584" stroke="#1C1C1C" stroke-width="2"/>
            <path d="M115 135L125 145M125 135L115 145" stroke="white" stroke-width="2"/>
            <path d="M80 180L95 185M70 160L85 165M85 135L100 145M120 220L110 200M100 240L110 225M170 260L165 240" stroke="#FFD426" stroke-width="4" stroke-linecap="round"/>
            <path d="M110 230L170 260L230 220L170 190L110 230Z" fill="#29B6F6" stroke="#1C1C1C" stroke-width="4" stroke-linejoin="round"/>
            <path d="M120 230L170 255L220 220" stroke="white" stroke-width="2" stroke-linecap="round"/>
            <path d="M160 240L180 250L190 240L170 230Z" fill="white" stroke="#1C1C1C" stroke-width="2" stroke-linejoin="round"/>
            <path d="M85 160L165 140L195 210L115 230L85 160Z" fill="white" stroke="#1C1C1C" stroke-width="4" stroke-linejoin="round"/>
            <path d="M95 165L160 148L182 200L118 218L95 165Z" fill="#FFD426" stroke="#1C1C1C" stroke-width="3" stroke-linejoin="round"/>
            <path d="M102 170L155 155L170 190L118 205L102 170Z" fill="white" stroke="#1C1C1C" stroke-width="2" stroke-linejoin="round"/>
            <path d="M115 185C125 175 145 170 155 180C145 190 125 195 115 185Z" fill="white" stroke="#1C1C1C" stroke-width="3" stroke-linejoin="round"/>
            <circle cx="137" cy="182" r="6" fill="#1C1C1C"/>
          </svg>
        </div>

        <!-- Right Side: Girl & Yellow Shape -->
        <div class="relative w-full md:w-[350px] flex justify-center md:absolute md:right-[5%] md:bottom-0">
          <!-- Floating Backpack -->
          <div class="absolute -right-4 md:-right-8 top-1/2 -translate-y-1/2 z-20 animate-float-slow" style="animation-delay: 1s;">
            <svg width="50" height="60" viewBox="0 0 50 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 20C10 10 20 5 25 5C30 5 40 10 40 20V50C40 55 35 55 25 55C15 55 10 55 10 50V20Z" fill="#E83B2B" stroke="#C0281A" stroke-width="2"/>
              <path d="M15 35C15 30 20 28 25 28C30 28 35 30 35 35V45C35 48 30 50 25 50C20 50 15 48 15 45V35Z" fill="#FF5241" stroke="#C0281A" stroke-width="2"/>
              <rect x="20" y="2" width="10" height="6" rx="3" fill="#C0281A"/>
              <path d="M12 25V40M38 25V40" stroke="#C0281A" stroke-width="2" stroke-linecap="round"/>
            </svg>
          </div>

          <!-- Yellow Background Shape -->
          <div class="w-[260px] h-[300px] bg-brand-yellow rounded-tl-[130px] rounded-tr-[130px] rounded-bl-[20px] rounded-br-[130px] relative mt-16 md:mt-0 flex items-center justify-center">
            <!-- Placeholder for Kid Image -->
            <div class="absolute bottom-0 w-[240px] h-full flex flex-col items-center justify-end pb-12 z-10">
              <div class="bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl w-4/5 aspect-[3/4] flex flex-col items-center justify-center text-white/60 text-center px-4">
                <span class="material-symbols-outlined text-4xl mb-2">person</span>
                <p class="text-[10px] font-bold uppercase tracking-widest">Kid Image<br>Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const features = [
  'Quality Education',
  'Rural Empowerment',
  'Sustainable Impact'
]
</script>

<style scoped>
/* Scoped styles if needed */
</style>
