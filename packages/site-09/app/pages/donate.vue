<template>
  <div>
    <!-- Hero -->
    <!-- Donation Widget (Moved out of card UI) -->
    <section id="donate-widget" class="py-16 bg-slate-50 dark:bg-slate-800 border-b border-slate-100 dark:border-slate-700">
      <div class="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="w-full relative min-h-[600px]">
          <!-- danamojo code -->
          <div id="dmScriptContainer" style="display:none;"><a href="#">Donate Now</a></div>
          <div id="ngoContentContainer" iNGOId="1377" oDisplay="product" oDisplayTab="once,monthly" oQRCode="YES" class="w-full flex justify-center items-center h-full min-h-[400px]">
            <div class="flex flex-col items-center justify-center text-center">
              <img alt="Please wait while the secure donation form loads..." src="https://danamojo.org/dm/css/images/loading.gif" class="w-16 h-16 object-contain" />
              <p class="mt-4 text-slate-500 font-semibold animate-pulse">Loading secure donation form...</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Impact Numbers -->
    <section class="py-16 bg-white dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-2 md:grid-cols-4 gap-8">
          <div v-for="impact in impacts" :key="impact.label" class="text-center">
            <p class="text-4xl font-black text-primary mb-2">{{ impact.value }}</p>
            <p class="text-sm text-slate-500 dark:text-slate-400 font-medium">{{ impact.label }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Sponsor a Child -->
    <section id="sponsor" class="py-24 bg-white dark:bg-slate-900">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="text-center max-w-2xl mx-auto mb-16">
          <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Make a Difference</h2>
          <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-4">Sponsor a Child</h3>
          <p class="text-slate-600 dark:text-slate-400 text-lg">Choose a sponsorship tier that works for you — every level creates real, lasting impact.</p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="tier in sponsorTiers"
            :key="tier.title"
            :class="[
              'relative rounded-2xl p-8 border transition-all duration-300 flex flex-col',
              tier.featured
                ? 'bg-primary border-primary text-white shadow-2xl shadow-primary/30 scale-105'
                : 'bg-white dark:bg-slate-800 border-slate-100 dark:border-slate-700 hover:border-primary/40 hover:shadow-lg'
            ]"
          >
            <div v-if="tier.featured" class="absolute -top-4 left-1/2 -translate-x-1/2 bg-slate-900 text-primary text-xs font-extrabold px-4 py-1.5 rounded-full border border-primary/30 whitespace-nowrap">
              Most Impactful
            </div>
            <span
              :class="['material-symbols-outlined text-3xl mb-4 block', tier.featured ? 'text-white' : 'text-primary']"
            >{{ tier.icon }}</span>
            <h4 :class="['text-lg font-extrabold mb-2', tier.featured ? 'text-white' : 'text-slate-900 dark:text-slate-100']">
              {{ tier.title }}
            </h4>
            <p :class="['text-3xl font-black mb-1', tier.featured ? 'text-white' : 'text-primary']">
              {{ tier.amount }}
            </p>
            <p :class="['text-xs font-semibold mb-6', tier.featured ? 'text-white/70' : 'text-slate-400']">
              {{ tier.period }}
            </p>
            <p :class="['text-sm leading-relaxed mb-8 flex-grow', tier.featured ? 'text-white/85' : 'text-slate-500 dark:text-slate-400']">
              {{ tier.description }}
            </p>
            <a
              href="#donate-widget"
              :class="[
                'w-full text-center py-3 rounded-xl font-bold text-sm transition-all',
                tier.featured
                  ? 'bg-white text-primary hover:bg-slate-100'
                  : 'bg-primary/10 text-primary hover:bg-primary hover:text-white'
              ]"
            >
              Choose This Plan
            </a>
          </div>
        </div>

        <!-- Annual Tiers -->
        <div class="mt-10 grid sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div v-for="tier in annualTiers" :key="tier.title" class="bg-slate-50 dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 hover:border-primary/30 hover:shadow-md transition-all flex gap-5 items-start">
            <span class="material-symbols-outlined text-primary text-3xl shrink-0">{{ tier.icon }}</span>
            <div>
              <h4 class="text-lg font-extrabold text-slate-900 dark:text-slate-100 mb-1">{{ tier.title }}</h4>
              <p class="text-2xl font-black text-primary mb-1">{{ tier.amount }}</p>
              <p class="text-xs text-slate-400 font-semibold mb-3">{{ tier.period }}</p>
              <p class="text-sm text-slate-500 dark:text-slate-400">{{ tier.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Why We Need Your Support -->
    <section id="why" class="py-24 bg-primary/5">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">Our Need</h2>
            <h3 class="text-4xl font-extrabold text-slate-900 dark:text-slate-100 mb-6">Why We Need Your Support</h3>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              While there are many achievements, the challenges we face are equally significant. As a charity school, we rely entirely on the generosity of individuals and organisations who believe in our mission.
            </p>
            <p class="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
              Your support ensures that we can continue to provide:
            </p>
            <ul class="space-y-4 mb-8">
              <li v-for="reason in reasons" :key="reason" class="flex items-start gap-3">
                <span class="material-symbols-outlined text-primary text-sm mt-1 shrink-0">arrow_right</span>
                <span class="text-slate-700 dark:text-slate-300 leading-relaxed">{{ reason }}</span>
              </li>
            </ul>
          </div>

          <!-- Quote block -->
          <div class="space-y-6">
            <div v-for="quote in impactQuotes" :key="quote.text" class="bg-white dark:bg-slate-800 rounded-2xl p-8 border border-slate-100 dark:border-slate-700 shadow-sm hover:shadow-md hover:border-primary/20 transition-all">
              <span class="material-symbols-outlined text-primary text-3xl mb-4 block">{{ quote.icon }}</span>
              <p class="text-slate-700 dark:text-slate-300 text-lg font-semibold leading-relaxed">
                "{{ quote.text }}"
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Banner -->
    <section class="py-24 bg-slate-900">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 class="text-4xl font-extrabold text-white mb-6">Every Contribution Counts</h3>
        <p class="text-xl text-slate-300 leading-relaxed mb-10">
          Every contribution, no matter how small, makes a world of difference. It means hope, dignity, and a brighter future for a child in Arunachala.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <AppButton href="#donate-widget" variant="primary">
            Donate Now
          </AppButton>
          <AppButton href="/about" variant="outline-white">
            Learn About Us
          </AppButton>
        </div>
        <p class="text-slate-500 text-sm mt-8">
          For queries, write to us at
          <a href="mailto:president@arunachalaschool.org" class="text-primary hover:underline font-semibold ml-1">president@arunachalaschool.org</a>
        </p>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';

useHead({
  title: 'Donate | Arunachala Village School',
  description: 'Support Arunachala Village School with a secure online donation. Your generosity provides free education and infrastructure to rural children.',
  script: [
    {
      src: 'https://danamojo.org/dm/js/widget.js',
      type: 'text/javascript',
      async: true
    }
  ]
})

const impacts = [
  { value: '1,200+', label: 'Students Supported' },
  { value: '100%', label: 'Free Education' },
  { value: '25+', label: 'Years of Service' },
  { value: '15+', label: 'Countries Supporting' },
]

const sponsorTiers = [
  {
    icon: 'spa',
    title: 'Seed Supporter',
    amount: '₹500',
    period: 'per month',
    description: 'A small but powerful contribution that helps cover daily essentials like stationery and snacks for a child.',
    featured: false
  },
  {
    icon: 'person',
    title: 'Student Support',
    amount: '₹2,800',
    period: 'per month',
    description: 'Fully supports one student\'s monthly educational needs, meals, and learning materials.',
    featured: false
  },
  {
    icon: 'menu_book',
    title: 'Materials Sponsor',
    amount: '₹23,660',
    period: 'per month',
    description: 'Provides complete educational materials — books, tools, and supplies — for an entire class.',
    featured: false
  },
  {
    icon: 'directions_bus',
    title: 'Transport Angel',
    amount: '₹40,457',
    period: 'per month',
    description: 'Keeps both school buses running, ensuring safe daily transport for dozens of students from remote villages.',
    featured: true
  },
]

const annualTiers = [
  {
    icon: 'calendar_month',
    title: 'Support One Student / Year',
    amount: '₹33,223',
    period: 'per year',
    description: 'A full year of education, meals, materials, and support for one child.',
  },
  {
    icon: 'class',
    title: 'Classroom Friend',
    amount: '₹58,800',
    period: 'per month',
    description: 'Funds the running of an entire classroom including teacher support and resources.',
  },
  {
    icon: 'school',
    title: 'Teacher Sponsor',
    amount: '₹1,80,000',
    period: 'per month',
    description: 'Sponsors a dedicated teacher\'s salary and supports their professional development.',
  },
  {
    icon: 'groups',
    title: 'Sponsor Ten Students',
    amount: '₹3,32,230',
    period: 'per year',
    description: 'A transformative annual gift covering the complete education of ten deserving children.',
  },
]

const reasons = [
  'Free, high-quality education to children from economically disadvantaged families.',
  'Safe and nurturing infrastructure that fosters holistic development.',
  'Extracurricular activities that ignite creativity, confidence, and a love for learning.',
]

const impactQuotes = [
  {
    icon: 'favorite',
    text: 'It means a child can attend school without fear of financial burden.'
  },
  {
    icon: 'psychology',
    text: 'It means a young mind can explore its potential without limitations.'
  },
  {
    icon: 'emoji_events',
    text: 'It means hope, dignity, and a brighter future — one child at a time.'
  },
]

onMounted(() => {
  setTimeout(function(){ 
    if(document.getElementById("ngoContentContainer") && document.getElementById("ngoContentContainer").innerHTML.length < 40){ 
      document.getElementById("ngoContentContainer").innerHTML="<div class='flex flex-col items-center justify-center text-center'> <p style='color:#a94442;' class='text-red-500 font-bold p-8 bg-red-50 rounded-xl'>We are sorry that our systems are down. We will be up shortly. Apologies for the inconvenience.</p></div>";
    }
  }, 20000);
});
</script>
