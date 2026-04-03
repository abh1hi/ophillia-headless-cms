<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-slate-900">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute -top-20 -left-20 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mx-auto mb-8">
          <span class="material-symbols-outlined text-sm">front_hand</span>
          Volunteering
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-8">
          Join Us in Making a <span class="text-primary">Difference</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
          Volunteers have played a vital role in our school, dedicating their time and skills to greatly benefit our students.
        </p>
        <AppButton href="mailto:president@arunachalaschool.org" variant="primary">Become a Volunteer</AppButton>
      </div>
    </section>

    <!-- Main Content Section -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Text Content -->
          <div>
            <h2 class="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
              How You Can Help
            </h2>
            <div class="space-y-6 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                We welcome individuals with expertise in teaching, arts & crafts, music, yoga, sports, computers, or other fields to conduct workshops or ongoing sessions.
              </p>
              <p>
                Support is also needed to organize fundraising events, assist with daily activities like sports, painting, classroom help, and office work, and maintain our serene campus environment.
              </p>
              <div class="bg-primary/5 border-l-4 border-primary p-6 rounded-r-2xl my-8">
                <p class="text-slate-800 dark:text-slate-200 font-medium italic">
                  "Your contribution can take many forms—whether through fundraising, creative projects, or ambitious initiatives such as school expeditions. We're eager to hear your proposals and welcome you as part of our extended family."
                </p>
              </div>
            </div>
            
            <div class="mt-8 flex flex-col sm:flex-row gap-4">
              <div class="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">palette</span>
                </div>
                <p class="font-bold text-slate-800 dark:text-slate-200 text-sm">Arts & Crafts</p>
              </div>
              <div class="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">sports_handball</span>
                </div>
                <p class="font-bold text-slate-800 dark:text-slate-200 text-sm">Sports & Yoga</p>
              </div>
              <div class="flex items-center gap-3 bg-white dark:bg-slate-800 rounded-xl p-4 border border-slate-100 dark:border-slate-700 shadow-sm">
                <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined text-primary">computer</span>
                </div>
                <p class="font-bold text-slate-800 dark:text-slate-200 text-sm">Tech & Computers</p>
              </div>
            </div>
          </div>

          <!-- Image Placeholder -->
          <div class="relative">
             <div class="aspect-[4/5] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-xl border-8 border-white dark:border-slate-800">
              <div class="text-center text-slate-400 dark:text-slate-500 p-8">
                <span class="material-symbols-outlined text-6xl mb-4 text-slate-300 dark:text-slate-600">volunteer_activism</span>
                <p class="font-bold text-lg mb-2">Volunteer Photo Placeholder</p>
                <p class="text-sm">Place an image showing volunteers interacting with students or helping around the campus.</p>
              </div>
            </div>
            
            <!-- Floating element -->
            <div class="absolute -bottom-6 -left-6 bg-white dark:bg-slate-800 p-6 rounded-2xl shadow-xl border border-primary/10 hidden md:block">
              <div class="flex gap-4 items-center">
                 <div class="bg-primary/20 p-3 rounded-full">
                  <span class="material-symbols-outlined text-primary">groups</span>
                </div>
                <div>
                   <p class="font-black text-2xl text-slate-900 dark:text-slate-100">Extended Family</p>
                   <p class="text-sm text-slate-500">Join our community</p>
                </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Volunteering | Arunachala Village School',
  description: 'Join Arunachala Village School as a volunteer. We welcome expertise in teaching, arts, sports, and more to make a difference in our students\' lives.'
})
</script>
