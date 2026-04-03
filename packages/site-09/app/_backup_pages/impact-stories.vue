<template>
  <div class="relative flex h-auto min-h-screen w-full flex-col bg-slate-50 dark:bg-slate-900 font-sans text-slate-900 dark:text-slate-100">
    <!-- Hero Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full">
      <div class="relative overflow-hidden rounded-xl md:rounded-3xl min-h-[500px] flex flex-col items-center justify-center p-8 text-center bg-cover bg-center" style="background-image: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), url('https://lh3.googleusercontent.com/aida-public/AB6AXuA0rqvmoFLQshG-AW-p8prrJm44-UaA9GJyXFGU1fBzKulAyLf6Rix5n9Ghex7ZNZK3VBvtUvpgOc0Qfk2sdu9gpxtJZFO7ddtSeT6Cg0Uk8Dj43a0RLK1ACXZOZwl0Z4iOYARbAdWrEUG_P-MxVQLZObH1JtBfwtSDW3oIi8DUXje5hTO2EtY57xKzlek8UfhCqXAEg45uyXRr0ZJEXSSotByIufH9yLCq1hnBjI-LghPlGXr4TfPUTmtYhp_dsr1TIJhQB7SrMsvm');" data-alt="Children smiling together in a rural classroom setting">
        <div class="max-w-3xl space-y-6">
          <h1 class="text-white text-4xl md:text-6xl font-black leading-tight tracking-tight">
            Witness the Power of Education
          </h1>
          <p class="text-white/90 text-lg md:text-xl font-normal max-w-2xl mx-auto">
            Every child has a story. Behind every statistic is a life transformed, a dream nurtured, and a community uplifted through your support.
          </p>
          <AppButton href="#stories" variant="primary" class="shadow-xl transition-transform hover:scale-105">
            Read Our Stories
          </AppButton>
        </div>
      </div>
    </section>

    <!-- Impact Stats Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 w-full">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div class="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span class="material-symbols-outlined text-primary text-3xl">school</span>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Students Enrolled</p>
          <p class="text-slate-900 dark:text-slate-100 text-4xl font-extrabold">1,240+</p>
          <p class="text-secondary dark:text-secondary text-sm font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">trending_up</span> +12% this year
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span class="material-symbols-outlined text-primary text-3xl">home_work</span>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Village Outreach</p>
          <p class="text-slate-900 dark:text-slate-100 text-4xl font-extrabold">15</p>
          <p class="text-secondary dark:text-secondary text-sm font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">add_location</span> 3 new villages
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span class="material-symbols-outlined text-primary text-3xl">restaurant</span>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Meals Served</p>
          <p class="text-slate-900 dark:text-slate-100 text-4xl font-extrabold">250k+</p>
          <p class="text-secondary dark:text-secondary text-sm font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">check_circle</span> 100% nutrition goal
          </p>
        </div>
        <div class="flex flex-col gap-2 rounded-2xl p-8 bg-white dark:bg-slate-800 border border-slate-100 dark:border-slate-700 shadow-sm">
          <span class="material-symbols-outlined text-primary text-3xl">auto_stories</span>
          <p class="text-slate-500 dark:text-slate-400 text-sm font-medium uppercase tracking-wider">Literacy Rate</p>
          <p class="text-slate-900 dark:text-slate-100 text-4xl font-extrabold">94%</p>
          <p class="text-secondary dark:text-secondary text-sm font-bold flex items-center gap-1">
            <span class="material-symbols-outlined text-sm">star</span> Above regional avg
          </p>
        </div>
      </div>
    </section>

    <!-- Stories of Change Section -->
    <section id="stories" class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 w-full">
      <div class="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
        <div class="max-w-xl">
          <h2 class="text-primary font-bold text-sm uppercase tracking-widest mb-2">Our Impact Stories</h2>
          <h3 class="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black">Lives Transformed</h3>
          <p class="text-slate-600 dark:text-slate-400 mt-4">Real accounts from students who are breaking the cycle of poverty through education.</p>
        </div>
        <NuxtLink to="/impact-stories" class="text-primary font-bold flex items-center gap-2 hover:gap-3 transition-all">
          View all stories <span class="material-symbols-outlined">arrow_forward</span>
        </NuxtLink>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <!-- Story Card 1 -->
        <div class="group cursor-pointer">
          <div class="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuBR1W5oRzPYsZ8EkcPF9gfzkCyblhCnyNlePJO91xDi0HfIW91zy51HuzOs4WPmgzJP35girPN28vu2-VWW5yNnG0AWcRdbUo3agtkT5Cf1bVHo0k0QTMwnstSBShRL4blXNAKoi1pE8H4PtDAZdM3CIx2adzUdetaRfLITGdz65dam-A0lIwt6VWNs7sFwi2ZyFbbyNpw92FKjsX5UDnoiFrexHtomzc7Tvbm4ycVdsgeGDihk7cSQKbFfvD2-Hz7AcRnIRkS5G3kf" alt="Student portrait" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">Success Story</span>
          <h4 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2 group-hover:text-primary transition-colors">Meena's Journey to Medicine</h4>
          <p class="text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">The daughter of a local farm laborer, Meena is now the first in her village to attend medical school...</p>
        </div>
        <!-- Story Card 2 -->
        <div class="group cursor-pointer">
          <div class="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuCwmIu_1RTKZUV9Ypc4p-RuSeoFYhGYbxYTtjP0WNHPzihGzgQGHvFucJlO93G-MMcJHZRPAwIoNq6FphSuTbOXmX7HG6JHucogqaPAz5Qp5Y5AvN-TQEbSGruotO8DreuSeexnH5WU8MQt1BeXXP4fT88fqJqb43pZRIqfKhicKnId9FpgLSkgF1jUPIXtcHv_vXRTDsaca6lCFm6GYYKU9HS5oBevm1B9ZnOwoG0449HiLA4XjyJ4LcyP_gTxWlXDLSxG79nGvuHH" alt="Student learning" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">Technology</span>
          <h4 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2 group-hover:text-primary transition-colors">Coding the Future: Rohan's App</h4>
          <p class="text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">Using the school's new computer lab, Rohan developed an app to help local farmers track market prices...</p>
        </div>
        <!-- Story Card 3 -->
        <div class="group cursor-pointer">
          <div class="aspect-[4/5] overflow-hidden rounded-2xl mb-4 relative">
            <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuA3NFYpTXJcEmjYjgGWxutF7vmYMemzZELXAWr8CaBRs11O26F-pGvmQycV1jRI5Xq89LOvSAMQwyJj547WqmErXbr_s5mJCMa9LbA3ABeL3fAxOGWCD7rQksy5GpYzTZkgMSM_2ILtq79s7DLeHApy6-wbu04Ma5TMUMfoixL6HdiyTRqmznmcRsvkshT1y2l7JYQWu-nyR-cR0QrcDwtngcNzTlHAzy6-EoxhfiD7Z-CIHZA8wDgTJLoS_36fteAeZGeQ5dwzp3s4" alt="Classroom activity" class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
          </div>
          <span class="bg-primary/10 text-primary text-xs font-bold px-3 py-1 rounded-full uppercase">Community</span>
          <h4 class="text-xl font-bold text-slate-900 dark:text-slate-100 mt-2 group-hover:text-primary transition-colors">The Green School Initiative</h4>
          <p class="text-slate-600 dark:text-slate-400 mt-2 line-clamp-3">How our students led a reforestation project that planted 5,000 trees across five neighboring villages...</p>
        </div>
      </div>
    </section>

    <!-- Community Testimonials -->
    <section class="w-full py-20 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h3 class="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black">Community Voices</h3>
          <p class="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">Hear from the parents and elders who have seen the transformation firsthand.</p>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
            <span class="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-6">format_quote</span>
            <div class="flex items-center gap-4 mb-6">
              <div class="size-14 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAIA9bbD1xTyMVPqHX-n9NfJHWuNI_YQs7ATBFB84p-2DXKUFBEP7oMr5_McTuXDl277rR5CD4IkVnCLVzwSf1rXVutqUn_K3Z7nQK7Y95UDx7bHyCdqgRLqijW6mVPdmgEoRyJ0JQSzthfdHGpjxB1jB6d1dzpJ6-Yo_Jiy_3LryNAaUq4BZBbLYDLWQjgBIhBOOyzgtAO7OX7Nra1HeafCSlQ_mvJ1M2TJ7QGAOMd9gLvv97hF94lndAf7x4I_MuRtX0znezxBRi5" alt="Parent portrait" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="text-slate-900 dark:text-slate-100 font-bold">Lalitha Devi</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Parent of 3 Students</p>
              </div>
            </div>
            <p class="text-slate-700 dark:text-slate-300 italic leading-relaxed">"Before the school, my children spent their days in the fields. Now they come home talking about science and stars. Their future is no longer tied to the soil, but to their dreams."</p>
          </div>

          <div class="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 relative">
            <span class="material-symbols-outlined text-primary/20 text-6xl absolute top-4 right-6">format_quote</span>
            <div class="flex items-center gap-4 mb-6">
              <div class="size-14 rounded-full bg-slate-200 dark:bg-slate-700 overflow-hidden shrink-0">
                <img src="https://lh3.googleusercontent.com/aida-public/AB6AXuAl_K2h4pBK5_2BR_b26lseDI-gwQCHlUFOOO7a8wgeolbAcsb2_n3s5zXgGIOW-nFvg5A8rqupSJyiRwyflRXAJmK8yfkMCa6TcT0htD-YJw8rhInDKz3CYzD1U0dBLfqNbKZxNrBtR4jVBgxsis70HT4QOiXGRcrPgwRstrmHRJ4P0MjFuB1qJO8XUErLR5yNZ5W3tOOP3AI0MGEhO9oXdtSOkf9wARMqMN9UUj96ropu_d2OoNGf0aalDUmjkcWgFbPeJTKl39lB" alt="Elder portrait" class="w-full h-full object-cover" />
              </div>
              <div>
                <p class="text-slate-900 dark:text-slate-100 font-bold">K. Venkatesh</p>
                <p class="text-slate-500 dark:text-slate-400 text-sm">Village Elder</p>
              </div>
            </div>
            <p class="text-slate-700 dark:text-slate-300 italic leading-relaxed">"The school has become the heart of our community. It’s not just for the children; it’s where we learn about health, agriculture, and our rights. We are stronger together."</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Transparency & Financials -->
    <section class="w-full py-20 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-primary font-bold text-sm uppercase tracking-widest mb-2">Transparency &amp; Trust</h2>
            <h3 class="text-slate-900 dark:text-slate-100 text-3xl font-black mb-6">How Your Support is Used</h3>
            <p class="text-slate-600 dark:text-slate-400 mb-8 leading-relaxed">We pride ourselves on 100% financial transparency. Every dollar donated goes directly toward student welfare and educational infrastructure.</p>
            <div class="space-y-6">
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-secondary/10 dark:bg-secondary/30 text-secondary dark:text-secondary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined">verified</span>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-slate-100 text-lg">92% Direct Impact</p>
                  <p class="text-slate-500 dark:text-slate-400">Goes directly to programs and school operations.</p>
                </div>
              </div>
              <div class="flex items-center gap-4">
                <div class="size-12 rounded-lg bg-primary/10 dark:bg-primary/30 text-primary dark:text-primary flex items-center justify-center shrink-0">
                  <span class="material-symbols-outlined">description</span>
                </div>
                <div>
                  <p class="font-bold text-slate-900 dark:text-slate-100 text-lg">Annual Audits</p>
                  <p class="text-slate-500 dark:text-slate-400">Public financial records available for download.</p>
                </div>
              </div>
            </div>
          </div>
          <div class="p-8 rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-100 dark:border-slate-700">
            <p class="text-slate-900 dark:text-slate-100 text-lg font-bold mb-6">Expense Allocation</p>
            <div class="space-y-4">
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-600 dark:text-slate-400">Educational Programs</span>
                  <span class="font-bold text-slate-900 dark:text-slate-100">65%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-primary h-full" style="width: 65%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-600 dark:text-slate-400">Nutrition &amp; Health</span>
                  <span class="font-bold text-slate-900 dark:text-slate-100">20%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-primary/80 h-full" style="width: 20%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-600 dark:text-slate-400">Infrastructure</span>
                  <span class="font-bold text-slate-900 dark:text-slate-100">7%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-primary/60 h-full" style="width: 7%"></div>
                </div>
              </div>
              <div>
                <div class="flex justify-between text-sm mb-1">
                  <span class="text-slate-600 dark:text-slate-400">Administration</span>
                  <span class="font-bold text-slate-900 dark:text-slate-100">8%</span>
                </div>
                <div class="w-full bg-slate-200 dark:bg-slate-700 h-2 rounded-full overflow-hidden">
                  <div class="bg-slate-400 dark:bg-slate-500 h-full" style="width: 8%"></div>
                </div>
              </div>
            </div>
            <div class="mt-8 pt-6 border-t border-slate-200 dark:border-slate-700">
              <button class="w-full flex items-center justify-center gap-2 text-primary font-bold py-2 border-2 border-primary rounded-xl hover:bg-primary hover:text-white transition-all">
                <span class="material-symbols-outlined">download</span> Download 2023 Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Geographic Map Section -->
    <section class="w-full py-20 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center mb-16">
          <h3 class="text-slate-900 dark:text-slate-100 text-3xl md:text-4xl font-black">Our Growing Reach</h3>
          <p class="text-slate-600 dark:text-slate-400 mt-4 max-w-2xl mx-auto">Operating across 15 villages in the Tiruvannamalai district of Tamil Nadu.</p>
        </div>
        <div class="relative w-full h-[450px] rounded-3xl overflow-hidden shadow-xl border border-slate-200 dark:border-slate-700">
          <div class="absolute inset-0 bg-slate-200 dark:bg-slate-800">
            <img class="w-full h-full object-cover grayscale opacity-50 dark:opacity-30" src="https://lh3.googleusercontent.com/aida-public/AB6AXuAVSZIk4c1P23BmCuXv8Uw_zSHMOwDBihZxpdJGzisCrwz-mpKrkm60BsfJBr9cmJnA1gsGE-YXhMxh9JOrYHbuS-YRco5JiXVseX-KVACjVzWwQnXh5JLlyK16SMLYc-cce3uO8roAjrjpxQ1m-LdbPnwxr-Tc_NyJIH8Rb9LWDYuSVuUGnguvE6Sne79tZW9Mnm_NmqvHTsRTi07EI9fheXx3GLSnQFNP0tXwtc5ob91e1KO9kc0vqBccgxe8drNlrlmBkGGQo-Iz" alt="Regional Map" />
          </div>
          <!-- Map UI Elements -->
          <div class="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/60 to-transparent pointer-events-none"></div>
          <div class="absolute top-1/2 left-1/3 size-6 bg-primary rounded-full animate-pulse border-4 border-white dark:border-slate-900"></div>
          <div class="absolute top-1/4 left-1/2 size-4 bg-primary/70 rounded-full border-2 border-white dark:border-slate-900"></div>
          <div class="absolute bottom-1/3 right-1/4 size-4 bg-primary/70 rounded-full border-2 border-white dark:border-slate-900"></div>
          <div class="absolute bottom-6 left-6 right-6 md:left-auto md:w-85 bg-white/95 dark:bg-slate-900/95 backdrop-blur p-6 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-700">
            <h4 class="font-bold text-slate-900 dark:text-slate-100 mb-3">Regional Hub: Tiruvannamalai</h4>
            <ul class="text-sm text-slate-600 dark:text-slate-400 space-y-3">
              <li class="flex items-center gap-3"><span class="size-3 rounded-full bg-primary shrink-0"></span> <span class="leading-tight">850 Students from Main Hub</span></li>
              <li class="flex items-center gap-3"><span class="size-3 rounded-full bg-primary/60 shrink-0"></span> <span class="leading-tight">14 Satellite Learning Centers</span></li>
              <li class="flex items-center gap-3"><span class="size-3 rounded-full bg-primary/60 shrink-0"></span> <span class="leading-tight">4,500+ Community Beneficiaries</span></li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Strong CTA Section -->
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 w-full">
      <div class="bg-primary rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
        <div class="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32"></div>
        <div class="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full -ml-24 -mb-24"></div>
        <div class="relative z-10 max-w-3xl mx-auto space-y-8">
          <h2 class="text-4xl md:text-5xl font-black">Be Part of the Story</h2>
          <p class="text-white/90 text-xl font-medium">Your donation provides more than just school supplies; it provides a future full of possibility. Change a life today.</p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <AppButton href="/donate" class="bg-white text-primary font-bold text-lg px-10 py-4 rounded-xl shadow-xl transition-all hover:bg-slate-50 hover:scale-105 border-0">
              Donate Now
            </AppButton>
            <AppButton href="/volunteer" class="bg-transparent text-white border-2 border-white/40 font-bold text-lg px-10 py-4 rounded-xl transition-all hover:bg-white/10 hover:text-white">
              Volunteer With Us
            </AppButton>
          </div>
        </div>
      </div>
    </section>

  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Our Impact & Stories | Arunachala Village School',
  description: 'Witness the power of education and hear the stories of lives transformed at Arunachala Village School.'
})
</script>
