<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-24 bg-primary/5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit mb-6">
            <span class="material-symbols-outlined text-sm">info</span>
            About Us
          </div>
          <h1 class="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            "Arunachala..."
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Empowering children through love, innovation, and sustainable education since 1999.
          </p>
        </div>
      </div>
    </section>

    <!-- Origin & History -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center mb-20">
          <div>
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Origin and History</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
              Founder's Vision – The Legacy of Aldis Jaspers
            </h3>
            <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
              <p>
                Arunachala Village School was born from the compassion and determination of <strong class="text-slate-800 dark:text-slate-200">Ms Aldis Jaspers</strong>, a teacher from Switzerland whose heart was deeply moved by the lives of rural children in Tiruvannamalai. Guided by her dream that every child, no matter how poor, deserves a joyful childhood and a meaningful education, she laid the school's foundation in 1999 along with <strong class="text-slate-800 dark:text-slate-200">Mr Raja Kandaiah</strong>.
              </p>
              <p>
                With her husband, Mr Rudi Jaspers, standing firmly beside her, Aldis worked tirelessly—helping children under a simple coconut-thatched roof, fundraising, mobilising support from Switzerland, and shaping the school's early systems and values. Her commitment, simplicity, and unwavering belief in the children became the soul of AVS.
              </p>
              <p>
                The strong foundations she and Mr Rudi built continue to guide the school's growth today, inspiring everyone who walks through its gates.
              </p>
            </div>
          </div>
          <div class="relative">
            <div class="aspect-[4/3] rounded-3xl overflow-hidden bg-slate-200 dark:bg-slate-700 flex items-center justify-center shadow-xl">
              <div class="text-center text-slate-400 dark:text-slate-500">
                <span class="material-symbols-outlined text-6xl mb-3">image</span>
                <p class="text-sm font-medium">Founders Photo</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Timeline -->
        <div class="border-l-2 border-primary/20 pl-8 space-y-10 max-w-3xl">
          <div v-for="event in timeline" :key="event.year" class="relative">
            <div class="absolute -left-11 top-1 w-6 h-6 rounded-full bg-primary flex items-center justify-center ring-4 ring-primary/10">
              <div class="w-2 h-2 rounded-full bg-white"></div>
            </div>
            <p class="text-primary font-bold text-sm mb-1">{{ event.year }}</p>
            <p class="text-slate-700 dark:text-slate-300">{{ event.text }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission & Vision -->
    <section class="py-24 bg-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Purpose</h2>
          <h3 class="text-4xl font-extrabold text-white">Mission and Vision</h3>
        </div>
        <div class="grid md:grid-cols-2 gap-8">
          <div class="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">track_changes</span>
              </div>
              <h4 class="text-2xl font-extrabold text-white">Mission</h4>
            </div>
            <p class="text-slate-300 leading-relaxed">
              We aim to foster a learning community rooted in love, support, trust, and respect while promoting creativity, empathy, and peace among children and their surrounding communities. We empower children through education that cultivates knowledge, gratitude, and responsibility, clearing the path for a brighter, more sustainable future.
            </p>
          </div>
          <div class="bg-white/5 border border-white/10 rounded-3xl p-10">
            <div class="flex items-center gap-3 mb-6">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">visibility</span>
              </div>
              <h4 class="text-2xl font-extrabold text-white">Vision</h4>
            </div>
            <p class="text-slate-300 leading-relaxed">
              To foster a harmonious society in which education drives innovation, upholds ethics and values, promotes unity and happiness, and nurtures a community based on transparency, empathy, and mutual respect for one another and the environment.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Leadership -->
    <section class="py-24 bg-white dark:bg-slate-950">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-2xl mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Leadership</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Our Team</h3>
          <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            The school's leadership is thoughtfully organised, which truly contributes to its success. The board of Arunachala Village School Trust oversees everything with great care, creating a warm and supportive community. It feels just like a family where everyone is there for each other, and that's what makes our school so special!
          </p>
        </div>
        <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-8">
          <div v-for="member in team" :key="member.name" class="group bg-background-light dark:bg-slate-800 rounded-2xl overflow-hidden border border-slate-100 dark:border-slate-700 hover:shadow-lg hover:border-primary/30 transition-all duration-300">
            <div class="aspect-square bg-slate-200 dark:bg-slate-700 flex items-center justify-center">
              <div class="text-center text-slate-400 dark:text-slate-500">
                <span class="material-symbols-outlined text-5xl mb-2">person</span>
                <p class="text-xs font-medium">Photo Placeholder</p>
              </div>
            </div>
            <div class="p-6">
              <h4 class="text-xl font-bold text-slate-900 dark:text-slate-100 mb-1">{{ member.name }}</h4>
              <p class="text-primary font-semibold text-sm mb-4">{{ member.role }}</p>
              <a href="#" class="inline-flex items-center gap-1 text-sm font-bold text-slate-500 dark:text-slate-400 hover:text-primary transition-colors group">
                Know more <span class="material-symbols-outlined text-sm group-hover:translate-x-1 transition-transform">arrow_forward</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Accreditations -->
    <section class="py-24 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-12">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Accreditations & Compliance</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Upholding Excellence with Integrity</h3>
        </div>
        <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            <p>
              Arunachala Village Trust and School operate with an unwavering commitment to legal compliance, ethical governance, and institutional accountability.
            </p>
            <p>
              We meticulously adhere to all statutory regulations, educational standards, and financial transparency protocols required by governmental and academic authorities. Our operations are regularly audited, and all necessary certifications and affiliations are maintained in good standing, reflecting our commitment to lawful and responsible stewardship.
            </p>
            <p>
              As a trusted institution, we prioritize rigorous compliance frameworks to ensure donor confidence, operational excellence, and sustainable impact—demonstrating that every initiative aligns with our mission and the highest standards of integrity.
            </p>
            <p class="font-semibold text-slate-700 dark:text-slate-300">
              Your trust is our mandate, and we safeguard it through transparent, regulation-compliant practices that stand up to scrutiny.
            </p>
          </div>
          <div class="bg-primary/5 rounded-2xl p-6 border border-primary/10 flex items-start gap-4">
            <span class="material-symbols-outlined text-primary mt-0.5">mail</span>
            <p class="text-sm text-slate-600 dark:text-slate-400">
              For detailed documentation of our accreditations, please contact us at
              <a href="mailto:president@arunachalaschool.org" class="text-primary font-bold hover:underline ml-1">president@arunachalaschool.org</a>
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'About Us | Arunachala Village School',
  description: 'Learn about the origin, mission, vision, and leadership of Arunachala Village School — empowering children through love, innovation, and sustainable education since 1999.'
})

const timeline = [
  {
    year: 'February 1999',
    text: 'Aldis Jaspers and Raja Kandaiah established the Arunachala Village School and registered it as a charitable trust. The school\'s 42 kindergarten children were sheltered beneath a coconut-thatched roof.'
  },
  {
    year: '2001',
    text: 'Mr Madhan Mohan succeeded Mr Raja Kandaiah as the organisation\'s leader, marking the beginning of a new chapter of growth and transformation.'
  },
  {
    year: '2022',
    text: 'Ms Ramya stepped into the role of Managing Trustee, supported by Trustees Rakesh Thiyagarajan and Selvam. Madhan Mohan continues to inspire as school patron and academic director.'
  }
]

const team = [
  { name: 'Ramya', role: 'Managing Trustee / Correspondent' },
  { name: 'Selvam', role: 'Trustee' },
  { name: 'Rakesh', role: 'Trustee' },
  { name: 'Yogalakshmi', role: 'Headmistress' },
  { name: 'Giridharan', role: 'Manager' },
  { name: 'Madhan Mohan', role: 'Patron' }
]
</script>
