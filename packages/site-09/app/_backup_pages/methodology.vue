<template>
  <div>
    <!-- Hero -->
    <section class="relative pt-20 pb-24 bg-primary/5 overflow-hidden">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl">
          <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-bold w-fit mb-6">
            <span class="material-symbols-outlined text-sm">auto_stories</span>
            Methodology & Philosophy
          </div>
          <h1 class="text-5xl lg:text-6xl font-black leading-tight tracking-tight text-slate-900 dark:text-slate-100 mb-6">
            How We <span class="text-primary">Teach</span> & Why We <span class="text-primary">Believe</span>
          </h1>
          <p class="text-xl text-slate-600 dark:text-slate-400 leading-relaxed">
            Rooted in love, respect, and the joy of learning — our approach nurtures the whole child, not just the student.
          </p>
        </div>
      </div>
    </section>

    <!-- Methodology Intro -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-start">
          <div>
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Methodology</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Our Approach to Education</h3>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6">
              The methodology of Arunachala Village School is rooted in the core values of <strong class="text-slate-800 dark:text-slate-200">helping others, respecting others, and loving others</strong>, fostering a nurturing and joyful learning environment.
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
              The primary objective is ensuring every child feels happy, secure, and valued, transforming the school into a second home where learning is natural, stress-free, and deeply meaningful.
            </p>
          </div>
          <div class="grid grid-cols-3 gap-4">
            <div v-for="value in coreValues" :key="value.label" class="aspect-square bg-primary/5 border border-primary/10 rounded-2xl flex flex-col items-center justify-center text-center p-6 hover:bg-primary/10 transition-colors">
              <span class="material-symbols-outlined text-primary text-4xl mb-3">{{ value.icon }}</span>
              <p class="font-bold text-slate-800 dark:text-slate-100 text-sm">{{ value.label }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Key Principles -->
    <section class="py-24 bg-secondary">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Key Principles</h2>
          <h3 class="text-4xl font-extrabold text-white">Six Pillars of Our Methodology</h3>
        </div>
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div
            v-for="(principle, index) in principles"
            :key="principle.title"
            class="bg-white/5 border border-white/10 rounded-2xl p-8 hover:bg-white/10 hover:border-primary/30 transition-all duration-300"
          >
            <div class="flex items-center gap-4 mb-5">
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center shrink-0">
                <span class="text-white font-black text-sm">{{ index + 1 }}</span>
              </div>
              <h4 class="text-lg font-extrabold text-white leading-tight">{{ principle.title }}</h4>
            </div>
            <ul class="space-y-2">
              <li
                v-for="point in principle.points"
                :key="point"
                class="flex items-start gap-2 text-slate-400 text-sm leading-relaxed"
              >
                <span class="text-primary mt-0.5 shrink-0">–</span>
                {{ point }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Implementation & Outcomes -->
    <section class="py-24">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-12">

          <!-- Implementation -->
          <div class="bg-primary/5 rounded-3xl p-10 border border-primary/10">
            <div class="flex items-center gap-3 mb-8">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">settings</span>
              </div>
              <h3 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Implementation Strategies</h3>
            </div>
            <ul class="space-y-4">
              <li v-for="strategy in strategies" :key="strategy.label" class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-sm mt-1 shrink-0">check_circle</span>
                <div>
                  <span class="font-bold text-slate-800 dark:text-slate-200">{{ strategy.label }}:</span>
                  <span class="text-slate-600 dark:text-slate-400 ml-1">{{ strategy.detail }}</span>
                </div>
              </li>
            </ul>
          </div>

          <!-- Outcomes -->
          <div class="bg-secondary/40 backdrop-blur-sm border border-white/5 rounded-3xl p-10">
            <div class="flex items-center gap-3 mb-8">
              <div class="bg-primary/20 p-3 rounded-full">
                <span class="material-symbols-outlined text-primary">emoji_events</span>
              </div>
              <h3 class="text-2xl font-extrabold text-white">Achieved Outcomes</h3>
            </div>
            <p class="text-slate-400 text-sm mb-6">By adopting this methodology, Arunachala Village School achieved the following:</p>
            <ul class="space-y-4">
              <li v-for="outcome in outcomes" :key="outcome" class="flex items-start gap-3 text-slate-300">
                <span class="text-primary mt-0.5 shrink-0 font-bold">–</span>
                {{ outcome }}
              </li>
            </ul>
            <p class="text-slate-400 text-sm mt-8 italic border-t border-white/10 pt-6">
              This approach ensures that education is not merely about academic success but about nurturing well-rounded, joyful, and kind-hearted human beings.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Philosophy -->
    <section class="py-24 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="max-w-3xl mx-auto text-center mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Philosophy</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Our Foundational Beliefs</h3>
          <p class="text-lg text-slate-600 dark:text-slate-400">
            The foundational philosophy of Arunachala Village School is encapsulated in three enduring principles:
          </p>
        </div>

        <!-- 3 Pillars -->
        <div class="grid md:grid-cols-3 gap-8 mb-16">
          <div v-for="pillar in pillars" :key="pillar.label" class="bg-white dark:bg-slate-800 rounded-3xl p-10 text-center shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md hover:border-primary/30 transition-all">
            <div class="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <span class="material-symbols-outlined text-primary text-3xl">{{ pillar.icon }}</span>
            </div>
            <h4 class="text-2xl font-extrabold text-slate-900 dark:text-slate-100 mb-3">{{ pillar.label }}</h4>
            <p class="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>

        <!-- Philosophy Text -->
        <div class="max-w-4xl mx-auto bg-white dark:bg-slate-800 rounded-3xl p-10 shadow-sm border border-slate-100 dark:border-slate-700">
          <div class="space-y-4 text-slate-600 dark:text-slate-400 leading-relaxed">
            <p>
              These core values guide the institution's commitment to fostering holistic student development, cultivating meaningful partnerships with parents, and contributing positively to society. Through this ethos, Arunachala Village School endeavours to nurture compassionate, ethical, and socially responsible individuals who embody these principles in their personal and collective growth.
            </p>
            <p>
              By integrating these values into its educational framework, the school supports academic excellence and promotes a culture of empathy, mutual respect, and communal harmony. This philosophy reflects the institution's dedication to shaping future generations who are intellectually capable, morally grounded, and committed to the betterment of humanity.
            </p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
useSeoMeta({
  title: 'Methodology & Philosophy | Arunachala Village School',
  description: 'Discover the child-centred methodology and foundational philosophy of Arunachala Village School — rooted in love, respect, and helping others.'
})

const coreValues = [
  { icon: 'volunteer_activism', label: 'Helping Others' },
  { icon: 'handshake', label: 'Respecting Others' },
  { icon: 'favorite', label: 'Loving Others' },
]

const principles = [
  {
    title: 'Child-Centered, Happiness-Focused Learning',
    points: [
      'Prioritizes the emotional well-being of students, ensuring a joyful and friendly atmosphere.',
      'Encourages experiential and play-based learning to make education engaging and enjoyable.',
      'Avoids excessive academic pressure, allowing children to learn independently.',
    ]
  },
  {
    title: 'Moral and Ethical Development',
    points: [
      'Integrates value-based education through stories, discussions, and real-life examples.',
      'Encourages kindness, empathy, honesty, and responsibility in daily interactions.',
      'Teachers serve as role models, demonstrating ethical behaviour in and out of the classroom.',
    ]
  },
  {
    title: 'Family-Like Environment',
    points: [
      'Maintains small class sizes to ensure personalized attention and strong teacher-student bonds.',
      'Promotes a mutual respect and care culture, where every child feels heard and supported.',
      'Encourages parent involvement to strengthen the school-home connection.',
    ]
  },
  {
    title: 'Stress-Free and Friendly School Culture',
    points: [
      'Avoids rigid disciplinary measures, opting for positive reinforcement and gentle guidance.',
      'Incorporates mindfulness, storytelling, and creative arts to reduce anxiety.',
      'Ensures a no-bullying policy, creating a safe and inclusive space for all students.',
    ]
  },
  {
    title: 'Environmental Care and Sustainability',
    points: [
      'Teaches children nature conservation through gardening and recycling activities.',
      'Maintains a green campus with natural surroundings to foster an environmental connection.',
      'Encourages sustainable practices such as waste reduction and eco-friendly habits.',
    ]
  },
  {
    title: 'Holistic and Experiential Learning',
    points: [
      'Balances academics with life skills, arts, sports, and community service.',
      'Uses interactive and collaborative teaching methods rather than rote memorization.',
      'Organizes field trips, nature walks, and group activities to make learning dynamic.',
    ]
  },
]

const strategies = [
  { label: 'Teachers as Facilitators', detail: 'Educators act as mentors, guiding children with patience and warmth.' },
  { label: 'Flexible Curriculum', detail: 'Adapts to individual learning styles while maintaining academic rigour.' },
  { label: 'Celebration of Diversity', detail: 'Encourages cultural exchange and inclusivity.' },
  { label: 'Regular Feedback', detail: 'Ensures continuous improvement based on student and parent input.' },
]

const outcomes = [
  'Happy, confident, and compassionate individuals.',
  'Students with strong moral and ethical foundations.',
  'Environmentally conscious and socially responsible citizens.',
  'A loving school community where every child feels at home.',
]

const pillars = [
  {
    icon: 'volunteer_activism',
    label: 'Helping Others',
    description: 'We cultivate a spirit of selfless service, teaching children that their greatest strength lies in lifting those around them.'
  },
  {
    icon: 'handshake',
    label: 'Respecting Others',
    description: 'We build a community where every voice matters, every background is honoured, and mutual respect is practised daily.'
  },
  {
    icon: 'favorite',
    label: 'Loving Others',
    description: 'We nurture genuine warmth and empathy, creating bonds that transform the school into a true family for every child.'
  },
]
</script>
