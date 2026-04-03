<template>
  <header class="sticky top-0 z-50 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md border-b border-primary/10">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="flex items-center justify-between h-20">
        <div class="flex items-center gap-12">
          <!-- Logo -->
          <NuxtLink to="/" class="flex items-center gap-2 sm:gap-3 group shrink-0">
            <img alt="Arunachala Village School Logo" class="h-10 sm:h-12 w-auto transition-transform group-hover:scale-105" src="/media/Arunachala-Village-School-Logo.png" />
            <h2 class="text-sm sm:text-xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100 group-hover:text-primary transition-colors truncate max-w-[110px] sm:max-w-none hidden xs:block sm:block">Arunachala</h2>
          </NuxtLink>

          <!-- Desktop Navigation -->
          <nav class="hidden md:flex items-center gap-6">
            <div v-for="item in navItems" :key="item.label" class="relative group">
              <!-- Direct Link -->
              <NuxtLink 
                v-if="!item.children" 
                :to="item.href" 
                class="text-sm font-bold text-slate-600 dark:text-slate-400 hover:text-primary transition-colors py-2"
              >
                {{ item.label }}
              </NuxtLink>

              <!-- Dropdown Trigger -->
              <button 
                v-else 
                class="flex items-center gap-1 text-sm font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary transition-colors py-2"
              >
                {{ item.label }}
                <span class="material-symbols-outlined text-xs transition-transform group-hover:rotate-180">expand_more</span>
              </button>

              <!-- Dropdown Menu -->
              <div 
                v-if="item.children"
                class="absolute left-0 top-full pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0 z-50 w-56"
              >
                <div class="bg-white dark:bg-slate-800 border border-primary/10 rounded-2xl shadow-2xl p-2">
                  <NuxtLink 
                    v-for="child in item.children" 
                    :key="child.href" 
                    :to="child.href"
                    class="block px-4 py-3 text-sm font-semibold text-slate-600 dark:text-slate-400 hover:text-primary hover:bg-primary/5 rounded-xl transition-all"
                  >
                    {{ child.label }}
                  </NuxtLink>
                </div>
              </div>
            </div>
          </nav>
        </div>

        <!-- Header Actions -->
        <div class="flex items-center gap-2 sm:gap-4 shrink-0">
          <div class="hidden lg:flex items-center bg-primary/5 rounded-xl px-3 py-2 border border-primary/10">
            <span class="material-symbols-outlined text-primary text-sm mr-2">search</span>
            <input 
              class="bg-transparent border-none focus:ring-0 text-sm w-40 placeholder:text-slate-400 focus:outline-none dark:text-slate-300" 
              placeholder="Search..." 
              type="text" 
            />
          </div>
          
          <!-- Donate Now always visible, but smaller on mobile -->
          <AppButton size="sm" href="/donate" customClass="text-[12px] sm:text-sm !px-3 !py-1.5 sm:!px-6 sm:!py-2.5 whitespace-nowrap">Donate Now</AppButton>

          <!-- Mobile Menu Button -->
          <button 
            @click="isMobileMenuOpen = !isMobileMenuOpen"
            class="md:hidden flex items-center justify-center p-2 rounded-xl text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:text-primary hover:bg-primary/10 transition-all duration-200"
          >
            <span class="material-symbols-outlined">{{ isMobileMenuOpen ? 'close' : 'menu' }}</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Mobile Sidebar -->
    <ClientOnly>
      <Teleport to="body">
        <!-- Mobile Sidebar Backdrop -->
        <Transition
          enter-active-class="transition-opacity duration-300"
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          leave-active-class="transition-opacity duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <div 
            v-if="isMobileMenuOpen" 
            class="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-[998] md:hidden"
            @click="isMobileMenuOpen = false"
          ></div>
        </Transition>

        <!-- Mobile Sidebar Content -->
        <Transition
          enter-active-class="transition-transform duration-300 ease-out"
          enter-from-class="translate-x-full"
          enter-to-class="translate-x-0"
          leave-active-class="transition-transform duration-300 ease-in"
          leave-from-class="translate-x-0"
          leave-to-class="translate-x-full"
        >
          <div 
            v-if="isMobileMenuOpen" 
            class="fixed right-0 top-0 bottom-0 w-[85%] max-w-sm bg-white dark:bg-slate-900 z-[999] shadow-2xl flex flex-col md:hidden"
          >
            <!-- Sidebar Header -->
            <div class="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
              <NuxtLink to="/" class="flex items-center gap-2" @click="isMobileMenuOpen = false">
                <img alt="Arunachala School Logo" class="h-8 w-auto" src="/media/Arunachala-Village-School-Logo.png" />
                <h2 class="text-sm font-extrabold tracking-tight text-slate-900 dark:text-slate-100">Arunachala School</h2>
              </NuxtLink>
              <button 
                @click="isMobileMenuOpen = false"
                class="flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-primary transition-colors"
              >
                <span class="material-symbols-outlined">close</span>
              </button>
            </div>

            <!-- Sidebar Navigation -->
            <nav class="flex-grow overflow-y-auto px-4 py-6 scroll-smooth">
              <div class="space-y-4">
                <div v-for="item in navItems" :key="item.label" class="space-y-2">
                  <NuxtLink 
                    v-if="!item.children" 
                    :to="item.href" 
                    class="flex items-center px-4 py-3 rounded-xl text-base font-bold text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 transition-all"
                    @click="isMobileMenuOpen = false"
                  >
                    {{ item.label }}
                  </NuxtLink>

                  <div v-else class="space-y-1">
                    <button 
                      class="flex items-center justify-between w-full px-4 py-3 rounded-xl text-base font-bold text-slate-700 dark:text-slate-300 hover:text-primary hover:bg-primary/5 transition-all"
                      @click="toggleSubMenu(item.label)"
                    >
                      {{ item.label }}
                      <span 
                        class="material-symbols-outlined text-sm transition-transform duration-200"
                        :class="{ 'rotate-180': openSubMenus.includes(item.label) }"
                      >expand_more</span>
                    </button>
                    <div 
                      v-show="openSubMenus.includes(item.label)"
                      class="pl-4 space-y-1"
                    >
                      <NuxtLink 
                        v-for="child in item.children" 
                        :key="child.href" 
                        :to="child.href"
                        class="block px-4 py-2 text-sm font-semibold text-slate-500 dark:text-slate-400 hover:text-primary transition-all"
                        @click="isMobileMenuOpen = false"
                      >
                        {{ child.label }}
                      </NuxtLink>
                    </div>
                  </div>
                </div>
              </div>
            </nav>

            <!-- Sidebar Footer -->
            <div class="p-6 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-4">
              <div class="flex items-center bg-primary/5 rounded-xl px-4 py-3 border border-primary/10">
                <span class="material-symbols-outlined text-primary text-sm mr-2">search</span>
                <input 
                  class="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-slate-400 focus:outline-none dark:text-slate-300" 
                  placeholder="Search..." 
                  type="text" 
                />
              </div>
              <AppButton size="md" href="/donate" @click="isMobileMenuOpen = false" class="w-full text-center py-4">
                Donate Now
              </AppButton>
            </div>
          </div>
        </Transition>
      </Teleport>
    </ClientOnly>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue';

const isMobileMenuOpen = ref(false);
const openSubMenus = ref([]);

const toggleSubMenu = (label) => {
  if (openSubMenus.value.includes(label)) {
    openSubMenus.value = openSubMenus.value.filter(item => item !== label);
  } else {
    openSubMenus.value.push(label);
  }
};

// Lock body scroll when mobile menu is open
watch(isMobileMenuOpen, (val) => {
  if (typeof document !== 'undefined') {
    if (val) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  }
});
const navItems = [
  { label: 'About', href: '/about' },
  { 
    label: 'School', 
    children: [
      { label: 'Methodology', href: '/methodology' },
      { label: 'Why AVS', href: '/why-avs' },
      { label: 'Infrastructure', href: '/infrastructure' },
    ]
  },
  {
    label: 'Support',
    children: [
      { label: 'Volunteer', href: '/volunteer' },
      { label: 'Donor Duties', href: '/donor-duties' },
      { label: 'Donate', href: '/donate' },
    ]
  },
  { label: 'Blog', href: '/blog' },
  { label: 'Programs', href: '/#programs' },
];
</script>
