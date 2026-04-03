<template>
  <section id="mission" class="py-16 md:py-24 bg-brand-bg px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      
      <!-- Section Header -->
      <div class="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-12 md:mb-16">
        <div class="max-w-2xl">
          <h2 class="font-serif text-[2.5rem] md:text-[3.5rem] leading-[1.1] font-bold text-brand-textDark tracking-tight mb-4">
            Smart and clever kids<br>
            ready to <span class="text-[#9f2802]">fly high!</span>
          </h2>
          <p class="text-[15px] md:text-[17px] font-semibold text-brand-textDark/70 max-w-lg leading-relaxed">
            Learn smartly with us. We teach 'One Smart Lesson' at a time!
          </p>
        </div>
        <NuxtLink to="/enroll" class="bg-white border-2 border-brand-textDark/10 px-8 py-3 rounded-full font-bold text-[15px] flex items-center gap-3 group hover:bg-brand-textDark hover:text-white transition-all duration-300">
          Enroll Now
          <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">north_east</span>
        </NuxtLink>
      </div>

      <!-- Three Card Grid -->
      <div class="grid md:grid-cols-3 gap-6 lg:gap-8">
        
        <!-- Card 1: Mission (Orange) -->
        <div class="relative bg-[#FF7F41] rounded-[40px] px-8 pt-10 pb-12 overflow-hidden group min-h-[480px] flex flex-col justify-between">
          <div class="relative z-10">
            <!-- Cloud Doodle SVG -->
            <div class="absolute -top-4 -left-2 opacity-50 group-hover:scale-110 transition-transform duration-500">
              <svg width="100" height="60" viewBox="0 0 100 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 40C10 32 18 25 28 25C30 20 38 15 48 15C58 15 65 20 68 25C78 25 85 32 85 40C85 48 78 55 68 55H28C18 55 10 48 10 40Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
                <path d="M25 45C25 45 35 48 45 45M55 45C55 45 65 42 70 45" stroke="white" stroke-width="1" stroke-dasharray="4 4"/>
              </svg>
            </div>
            <h3 class="font-serif text-3xl text-white font-bold leading-tight mt-8 mb-6">Mission</h3>
            <p class="text-white/90 text-[15px] leading-relaxed font-medium">
              We aim to foster a learning community rooted in love, support, trust, and respect while promoting creativity, empathy, and peace among children and their communities.
            </p>
          </div>
          
          <div class="relative mt-8">
            <!-- Basketball Doodle -->
            <div class="absolute left-0 bottom-4 z-20 animate-float-fast">
              <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="20" cy="20" r="18" fill="#3A2B24" stroke="white" stroke-width="1.5"/>
                <path d="M5 20H35M20 5V35M10 10C15 15 15 25 10 30M30 10C25 15 25 25 30 30" stroke="white" stroke-width="1.5" stroke-linecap="round"/>
              </svg>
            </div>
            <!-- Kid Placeholder -->
            <div class="ml-12 w-full aspect-[4/5] bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center text-white/40">
              <span class="material-symbols-outlined text-4xl">person</span>
            </div>
          </div>
        </div>

        <!-- Card 2: Volunteer (Green) -->
        <div class="relative bg-[#16A34A] rounded-[40px] px-8 pt-10 pb-12 overflow-hidden group min-h-[480px] flex flex-col justify-between">
          <div class="relative z-10">
            <!-- Swirl Doodle SVG -->
            <div class="absolute -top-6 -left-4 opacity-50 group-hover:rotate-12 transition-transform duration-700">
              <svg width="120" height="120" viewBox="0 0 120 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 80C30 90 60 70 60 40C60 10 30 10 20 40C10 70 40 100 80 80C110 65 110 30 90 20" stroke="#FFD426" stroke-width="3" stroke-linecap="round"/>
              </svg>
            </div>
            <h3 class="font-serif text-3xl text-white font-bold leading-tight mt-8 mb-6">Volunteer</h3>
            <p class="text-white/90 text-[15px] leading-relaxed font-medium">
              Teach, mentor, or assist in farming/yoga. Organize workshops or events. Your time fosters creativity and life skills in rural Tamil Nadu’s youth. Join our mission today!
            </p>
          </div>

          <div class="relative mt-8">
            <!-- Heart Icon -->
            <div class="absolute left-0 bottom-4 z-20 animate-bounce">
              <span class="material-symbols-outlined text-white text-3xl fill-current">favorite</span>
            </div>
            <!-- Kid Placeholder -->
            <div class="ml-auto w-4/5 aspect-[4/5] bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center text-white/40">
              <span class="material-symbols-outlined text-4xl">volunteer_activism</span>
            </div>
          </div>
        </div>

        <!-- Card 3: Donate (Blue) -->
        <div class="relative bg-[#3B82F6] rounded-[40px] px-8 pt-10 pb-12 overflow-hidden group min-h-[480px] flex flex-col justify-between">
          <div class="relative z-10">
            <!-- Scribble Doodle SVG -->
            <div class="absolute top-0 right-0 opacity-40 group-hover:scale-110 transition-transform duration-500">
              <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 20C40 10 80 50 40 80C20 95 10 70 40 40C70 10 90 30 70 60" stroke="white" stroke-width="2" stroke-linecap="round" stroke-dasharray="5 5"/>
              </svg>
            </div>
            <h3 class="font-serif text-3xl text-white font-bold leading-tight mt-8 mb-6">Donate</h3>
            <p class="text-white/90 text-[15px] leading-relaxed font-medium">
              Sponsor a child’s education or fund solar classrooms. Scan UPI QR (India) or donate via PayPal (global). Every rupee empowers sustainable education.
            </p>
          </div>

          <div class="relative mt-8">
            <!-- Coin Icon -->
            <div class="absolute left-2 bottom-8 z-20">
              <div class="w-10 h-10 bg-yellow-400 rounded-full border-2 border-white flex items-center justify-center animate-pulse">
                <span class="material-symbols-outlined text-white text-xl">payments</span>
              </div>
            </div>
            <!-- Kid Placeholder -->
            <div class="mx-auto w-4/5 aspect-[4/5] bg-white/20 backdrop-blur-sm border-2 border-dashed border-white/40 rounded-3xl flex items-center justify-center text-white/40">
              <span class="material-symbols-outlined text-4xl">child_care</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>

<script setup>
// Static content for now as per specific user request
</script>

<style scoped>
#mission {
  scroll-margin-top: 100px;
}
</style>
