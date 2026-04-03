<template>
  <footer class="bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 pt-20 pb-10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="grid md:grid-cols-4 gap-12 mb-16">
        <div class="col-span-1 md:col-span-1">
          <div class="flex items-center gap-3 mb-6">
            <img alt="Logo" class="h-10 w-auto" src="/media/Arunachala-Village-School-Logo.png" />
            <span class="text-lg font-bold text-slate-900 dark:text-slate-100">Arunachala School</span>
          </div>
          <p class="text-slate-500 text-sm leading-relaxed mb-6">
            Empowering children through love, innovation, and sustainable education since 1999.
          </p>
          <div class="flex gap-4">
            <a href="#" class="text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">public</span></a>
            <a href="#" class="text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">share</span></a>
            <a href="#" class="text-slate-400 hover:text-primary transition-colors"><span class="material-symbols-outlined">mail</span></a>
          </div>
        </div>
        
        <div v-for="section in linkSections" :key="section.title">
          <h5 class="font-bold mb-6 text-slate-900 dark:text-slate-100">{{ section.title }}</h5>
          <ul class="space-y-4 text-sm text-slate-500">
            <li v-for="link in section.links" :key="link.label">
              <a :href="link.href" class="hover:text-primary">{{ link.label }}</a>
            </li>
          </ul>
        </div>

        <div>
          <h5 class="font-bold mb-6 text-slate-900 dark:text-slate-100">Our Location</h5>
          <div class="rounded-xl overflow-hidden h-32 mb-4">
            <img alt="Map" class="w-full h-full object-cover" src="https://lh3.googleusercontent.com/aida-public/AB6AXuBjZUNk0sAqZbgiHPp3koqA9z7S8MUoW4v9pEVDWI_mwNoEYXj1rvPoENfLrgJkqk--3D-MyNSe1pXshLfcXc09B5WZSLJqDPjN-lzK_lRBeH3JUZJwI-dY4C9jdZQcS6zah7B0O2g8rIprwsYYvVDoIlc_Nh_aljNGg--hVlBaF5ykv98-U9By4uXbJhfTbbRlRINo6d4_z5OH9bVOBpqpD2EvKzGL5UG7WMpUx1DmEap9-j8y_5Gz2euF9PXAje1e2_PjaLKRrIyR" />
          </div>
          <div class="space-y-4 text-sm text-slate-500">
            <p class="flex items-start gap-2">
              <span class="material-symbols-outlined text-xs mt-1">location_on</span>
              371/1, Vediyappanur Village, Adi Annamalai Post, Tiruvannamalai 606604, Tamilnadu, India
            </p>
            <p class="flex items-center gap-2">
              <span class="material-symbols-outlined text-xs">call</span>
              +91 99411 79727 | +91 87782 25254
            </p>
            <p class="flex items-center gap-2">
              <span class="material-symbols-outlined text-xs">mail</span>
              president@arunachalaschool.org
            </p>
          </div>
        </div>
      </div>
      
      <div class="border-t border-slate-100 dark:border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
        <p class="text-sm text-slate-400">© 2024 Arunachala Village School. All rights reserved.</p>
        <div class="flex gap-6 text-sm text-slate-400">
          <a href="#" class="hover:underline">Privacy Policy</a>
          <a href="#" class="hover:underline">Terms of Service</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup>
const linkSections = [
  {
    title: 'Quick Links',
    links: [
      { label: 'About Our Founders', href: '#' },
      { label: 'Financial Transparency', href: '#' },
      { label: 'Annual Reports', href: '#' },
      { label: 'Careers', href: '#' },
    ]
  },
  {
    title: 'Programs',
    links: [
      { label: 'Kindergarten', href: '#' },
      { label: 'Science Program', href: '#' },
      { label: 'Women\'s Literacy', href: '#' },
      { label: 'Health Initiatives', href: '#' },
    ]
  }
];
</script>
