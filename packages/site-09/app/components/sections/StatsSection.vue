<script setup lang="ts">
interface StatItem {
  icon?: string
  value?: string
  label?: string
  color?: string
}

const props = defineProps<{
  data: {
    items?: StatItem[]
  }
}>()

const defaultStats: StatItem[] = [
  { icon: 'school', value: '50+', label: 'Schools are supported across 29 states', color: '#EB5C3F' },
  { icon: 'groups', value: '12K+', label: 'Helping the students of all ages thrive', color: '#F4C622' },
  { icon: 'workspaces', value: '70+', label: 'Available field workspaces and increasing', color: '#79B949' }
]

const stats = computed(() => props.data.items || defaultStats)
</script>

<template>
  <section class="bg-brand-bg px-4 sm:px-6 lg:px-8 pb-16 md:pb-24">
    <div class="max-w-[1100px] mx-auto relative group">
      <!-- Floating Paper Airplane -->
      <div class="absolute -top-10 -right-4 z-20 animate-float-fast transition-transform group-hover:translate-x-2">
        <svg width="60" height="50" viewBox="0 0 60 50" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M55 5L5 25L25 35M55 5L35 45L25 35M55 5L25 35" stroke="#29B6F6" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" fill="#4FC3F7"/>
          <path d="M25 35V45L30 38" fill="#0288D1" stroke="#0288D1" stroke-width="2"/>
        </svg>
      </div>

      <!-- Main Banner Container -->
      <div class="bg-[#33231C] rounded-tl-[16px] rounded-bl-[16px] rounded-tr-[120px] rounded-br-[16px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-[#45342C]">
        
        <div 
          v-for="(item, index) in stats" 
          :key="index"
          class="flex-1 p-8 md:p-12 flex items-start gap-5 border-b md:border-b-0 border-[#45342C]/50 hover:bg-[#3D2C24] transition-colors duration-300"
          :class="{'md:border-r': index < stats.length - 1}"
        >
          <div 
            class="w-[52px] h-[52px] rounded-xl flex items-center justify-center shrink-0 shadow-lg"
            :style="{ backgroundColor: item.color || '#EB5C3F' }"
          >
            <span class="material-symbols-outlined text-white text-2xl">{{ item.icon || 'school' }}</span>
          </div>
          <div>
            <div class="flex items-baseline gap-1">
              <h3 class="text-white font-serif text-4xl md:text-[44px] font-bold leading-none mb-2">{{ item.value || '0' }}</h3>
            </div>
            <p class="text-gray-300/80 text-[13px] leading-relaxed font-medium" v-html="item.label || ''">
            </p>
          </div>
        </div>

      </div>
    </div>
  </section>
</template>
