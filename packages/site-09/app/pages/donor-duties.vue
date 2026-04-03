<template>
  <div>
    <!-- Hero Section -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-slate-900">
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mx-auto mb-8">
          <span class="material-symbols-outlined text-sm">favorite_border</span>
          Donor Duties
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-8">
          More Than <span class="text-primary">Money</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-6">
          Building a Family Bond with Arunachala Village School
        </p>
      </div>
    </section>

    <!-- Intro Section -->
    <section class="py-24 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="material-symbols-outlined text-primary text-5xl mb-6 block">handshake</span>
        <h2 class="text-3xl lg:text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-8 leading-tight">
          We deeply value the generosity of our donors, but we believe proper support goes beyond financial contributions.
        </h2>
        <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
          While monetary donations help sustain our mission, what truly enriches our children's lives is the enduring relationship we build with you — <strong class="text-slate-800 dark:text-slate-200">our extended family</strong>.
        </p>
      </div>
    </section>

    <!-- Expectations Grid -->
    <section class="py-24 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">A Shared Commitment</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100">What We Expect from Our Donors</h3>
        </div>

        <div class="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          <div v-for="duty in duties" :key="duty.title" class="bg-white dark:bg-slate-800 rounded-3xl p-10 border border-slate-100 dark:border-slate-700 hover:border-primary/40 hover:shadow-lg transition-all duration-300 group">
            <div class="flex items-center gap-4 mb-6">
              <div class="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                <span class="material-symbols-outlined text-3xl">{{ duty.icon }}</span>
              </div>
              <h4 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">{{ duty.title }}</h4>
            </div>
            <p class="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
              {{ duty.description }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- A Lifelong Connection Section -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          
          <!-- Image Placeholder -->
          <div class="relative order-2 lg:order-1">
             <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-white/5 flex items-center justify-center shadow-xl border border-white/10">
              <div class="text-center text-slate-400 p-8">
                <span class="material-symbols-outlined text-6xl mb-4 text-slate-500">family_restroom</span>
                <p class="font-bold text-lg text-white mb-2">Donor & Student Photo Placeholder</p>
                <p class="text-sm">Place an image showing a donor interacting happily with students at the school.</p>
              </div>
            </div>
            
            <div class="absolute -bottom-6 -right-6 bg-primary p-6 rounded-2xl shadow-xl hidden md:block text-white border-4 border-slate-900">
              <p class="font-black text-3xl mb-1">Impact</p>
              <p class="text-sm font-semibold text-white/80">That lasts a lifetime</p>
            </div>
          </div>
          
          <!-- Text Content -->
          <div class="order-1 lg:order-2 text-white">
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Be Part of the AVS Family</h2>
            <h3 class="text-4xl font-extrabold mb-6 leading-tight">
              A Lifelong Connection
            </h3>
            <div class="space-y-6 text-lg text-slate-300 leading-relaxed">
              <p>
                We don't just see you as donors but as mentors, well-wishers, and an integral part of the AVS journey. Together, we shape a school and a brighter future for every child who walks through our doors.
              </p>
              <p>
                AVS welcomes your gracious donations, but we cherish your continued engagement even more. Because when you invest your time, heart, wisdom, and resources, that's when real transformation happens.
              </p>
              <div class="bg-white/5 border-l-4 border-primary p-6 rounded-r-2xl mt-8">
                <p class="text-white font-bold text-xl italic">
                  Let's grow, learn, and thrive—together as one AVS family.
                </p>
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
  title: 'Donor Duties | Arunachala Village School',
  description: 'At Arunachala Village School, we believe proper support goes beyond financial contributions. Discover how you can build a lifelong bond with our children.'
})

const duties = [
  {
    icon: 'diversity_1',
    title: 'Regular Visits & Personal Connection',
    description: 'Your presence at AVS means the world to our students. Visiting the school, interacting with the children, and seeing firsthand the impact of your support fosters a deeper bond and inspires both the students and the school community.'
  },
  {
    icon: 'sentiment_satisfied',
    title: 'Moral Support & Encouragement',
    description: 'A kind word, a letter, or even a virtual check-in can uplift our children\'s spirits. Your belief in their potential motivates them to dream bigger and work harder.'
  },
  {
    icon: 'celebration',
    title: 'Active Participation in Activities',
    description: 'Your involvement makes the AVS experience more vibrant and meaningful, whether you attend annual events, volunteer for workshops, or celebrate festivals with us.'
  },
  {
    icon: 'forum',
    title: 'Open Communication & Guidance',
    description: 'We encourage our donors to ask questions, share ideas, and hold us accountable. Your insights help us improve and ensure transparency for these children\'s future.'
  }
]
</script>
