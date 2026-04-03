<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-32 overflow-hidden bg-secondary">
      <!-- Glowing orb background -->
      <div class="absolute inset-0 overflow-hidden pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px]"></div>
      </div>
      <div class="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-bold w-fit mx-auto mb-8">
          <span class="material-symbols-outlined text-sm">star</span>
          What Makes Us Different
        </div>
        <h1 class="text-5xl lg:text-7xl font-black leading-tight tracking-tight text-white mb-8">
          Why AVS is <br /><span class="text-primary">So Special?</span>
        </h1>
        <p class="text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed">
          A place where childhood is honoured, curiosity is sparked, and every child is equipped to change the world.
        </p>
      </div>
    </section>

    <!-- Wisdom Through Freedom -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section Header -->
        <div class="max-w-3xl mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Section 1</h2>
          <h3 class="text-5xl font-black text-slate-900 dark:text-slate-100 mb-6 leading-tight">
            Wisdom Through <span class="text-primary">Freedom</span>
          </h3>
        </div>

        <!-- Pull Quote -->
        <div class="relative bg-primary/5 border-l-4 border-primary rounded-r-3xl p-10 mb-16 max-w-4xl">
          <span class="material-symbols-outlined text-primary text-5xl absolute -top-4 -left-2 opacity-30">format_quote</span>
          <p class="text-2xl font-bold text-slate-800 dark:text-slate-100 leading-relaxed italic">
            "We don't force-feed facts – we kindle fires of curiosity, courage, and that magical moment when a child realizes, 'I can figure this out myself.'"
          </p>
        </div>

        <!-- Content Grid -->
        <div class="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <div class="space-y-5 text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              At Arunachala Village School, <strong class="text-slate-800 dark:text-slate-200">childhood isn't sacrificed for academics</strong>. Here, sunlight dances through classroom windows as students dig their hands into the soil, wrestle with big ideas, and discover that true learning feels more like wonder than work.
            </p>
            <p>
              This is where values aren't just taught but lived. Math lessons include measuring the harvest they made from their own school garden, and science means looking into daily life uses of science.
            </p>
            <p>
              Our children don't just prepare for tests—they prepare for life, developing the wisdom to see what's wrong in the world and the heart to make it right.
            </p>
            <p class="font-semibold text-slate-700 dark:text-slate-300 border-t border-slate-200 dark:border-slate-700 pt-5">
              This isn't just education—it's the quiet revolution of raising a generation that thinks deeply, cares fiercely, and dares to imagine better.
            </p>
          </div>

          <!-- Feature Cards -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="card in wisdomCards" :key="card.label" class="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-md transition-all">
              <span class="material-symbols-outlined text-primary text-3xl mb-4 block">{{ card.icon }}</span>
              <h4 class="font-bold text-slate-900 dark:text-slate-100 text-sm mb-2">{{ card.label }}</h4>
              <p class="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{{ card.desc }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Life Education -->
    <section class="py-24 bg-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        <!-- Section Header -->
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Section 2</h2>
          <h3 class="text-5xl font-black text-white mb-6 leading-tight">Life Education</h3>
          <p class="text-xl text-slate-300 leading-relaxed">
            A Holistic Approach to Empowerment and Social Transformation
          </p>
        </div>

        <!-- Intro -->
        <div class="bg-white/5 border border-white/10 rounded-3xl p-10 mb-10 max-w-4xl mx-auto">
          <p class="text-slate-300 text-lg leading-relaxed">
            Arunachala Village School distinguishes itself through an innovative life education curriculum integrating academic learning with critical real-world competencies. Designed to address the systemic disadvantages students from underserved rural communities face, the program equips learners with the <strong class="text-white">knowledge, skills, and perspectives</strong> necessary for socioeconomic mobility and active citizenship.
          </p>
        </div>

        <!-- Programme Pillars -->
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          <div v-for="pillar in lifePillars" :key="pillar.title" class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-primary/40 transition-all duration-300">
            <span class="material-symbols-outlined text-primary text-3xl mb-4 block">{{ pillar.icon }}</span>
            <h4 class="text-lg font-extrabold text-white mb-3">{{ pillar.title }}</h4>
            <p class="text-slate-400 text-sm leading-relaxed">{{ pillar.desc }}</p>
          </div>
        </div>

        <!-- Body Paragraphs -->
        <div class="max-w-4xl mx-auto space-y-6 text-slate-300 leading-relaxed mb-16">
          <p>
            Recognizing the isolation of rural learners, the school facilitates structured exposure programs, including educational visits to <strong class="text-white">urban centres, technological hubs, and cultural heritage sites</strong>. These initiatives broaden aspirational horizons while developing digital literacy and technological proficiency.
          </p>
          <p>
            The pedagogy incorporates community-based learning, where students analyze local challenges—such as resource scarcity or educational disparities—and propose solutions, thereby cultivating problem-solving and leadership skills.
          </p>
          <p>
            A core philosophical tenet underpinning this model is the conviction that <strong class="text-white">education is the most effective mechanism for breaking intergenerational poverty</strong>. By aligning classroom instruction with livelihood readiness and social empowerment, the program motivates students to perceive education as both a personal imperative and a communal responsibility.
          </p>
        </div>

        <!-- Outcomes Banner -->
        <div class="bg-primary rounded-3xl p-10 max-w-4xl mx-auto text-center">
          <h4 class="text-2xl font-extrabold text-white mb-4">Transformative Outcomes</h4>
          <p class="text-white/90 text-lg leading-relaxed mb-6">
            Graduates emerge not merely as academically proficient individuals, but as <strong>socially aware, self-reliant, and civically engaged change agents</strong>.
          </p>
          <p class="text-white/80 text-sm leading-relaxed">
            The school's life education framework represents a replicable model for rural education reform, demonstrating how pedagogy can concurrently address cognitive development, socioeconomic barriers, and community upliftment.
          </p>
        </div>
      </div>
    </section>

    <!-- Closing Statement -->
    <section class="py-24 bg-primary/5">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span class="material-symbols-outlined text-primary text-5xl mb-6 block">public</span>
        <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">
          Education Redefined
        </h3>
        <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed mb-10">
          Arunachala Village School redefines education as a synergistic interplay of knowledge, skills, and social transformation — preparing students not just to navigate the world, but to <strong class="text-slate-800 dark:text-slate-200">reshape it</strong>.
        </p>
        <AppButton href="/#volunteer" variant="primary">Join Our Mission</AppButton>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Why AVS is Special | Arunachala Village School',
  description: 'Discover what makes Arunachala Village School truly special — from wisdom through freedom to a life education curriculum that transforms rural children into change agents.'
})

const wisdomCards = [
  { icon: 'eco', label: 'Garden-Based Math', desc: 'Students measure real harvests from their school garden, making numbers tangible and meaningful.' },
  { icon: 'science', label: 'Everyday Science', desc: 'Science is explored through daily life, turning ordinary moments into discovery.' },
  { icon: 'psychology', label: 'Curiosity-Led', desc: 'Children are guided to think for themselves, not just memorize answers.' },
  { icon: 'diversity_3', label: 'Values in Action', desc: 'Kindness, courage and empathy are practised daily, not just mentioned in lessons.' },
]

const lifePillars = [
  {
    icon: 'balance',
    title: 'Gender Equity & Social Justice',
    desc: 'Fostering critical consciousness about structural inequalities and ethical reasoning in everyday contexts.'
  },
  {
    icon: 'account_balance',
    title: 'Financial & Legal Literacy',
    desc: 'Practical modules in financial literacy, household management, and legal awareness for independent living.'
  },
  {
    icon: 'gavel',
    title: 'Civic Exposure',
    desc: 'Structured visits to courts, police stations, banking institutions, and governance offices for firsthand civic understanding.'
  },
  {
    icon: 'computer',
    title: 'Digital & Tech Literacy',
    desc: 'Exposure to urban centres and technological hubs to develop digital proficiency and broaden aspirations.'
  },
  {
    icon: 'groups',
    title: 'Community-Based Learning',
    desc: 'Students analyse local challenges and propose solutions, cultivating problem-solving and leadership skills.'
  },
  {
    icon: 'trending_up',
    title: 'Livelihood Readiness',
    desc: 'Education aligned with real-world readiness — motivating students to see learning as a communal responsibility.'
  },
]
</script>
