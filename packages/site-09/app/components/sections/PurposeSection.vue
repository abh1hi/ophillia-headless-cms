<script setup lang="ts">
interface PurposeCard {
  title?: string
  icon?: string
  description?: string
}

const props = defineProps<{
  data: {
    subtitle?: string
    title?: string
    cards?: PurposeCard[]
  }
}>()

const defaultCards: PurposeCard[] = [
  { title: 'Mission', icon: 'track_changes', description: 'Mission description...' },
  { title: 'Vision', icon: 'visibility', description: 'Vision description...' }
]

const purposeCards = computed(() => props.data.cards || defaultCards)
</script>

<template>
  <section class="py-24 bg-secondary">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center max-w-2xl mx-auto mb-16">
        <h2 v-if="data.subtitle" class="text-primary font-bold tracking-widest uppercase text-sm mb-4">{{ data.subtitle }}</h2>
        <h3 v-if="data.title" class="text-4xl md:text-5xl font-black text-white font-serif">{{ data.title }}</h3>
      </div>
      <div class="grid md:grid-cols-2 gap-8">
        <div 
          v-for="(card, index) in purposeCards" 
          :key="index"
          class="bg-white/5 border border-white/10 rounded-[40px] p-10 hover:bg-white/10 transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group"
        >
          <div class="flex items-center gap-4 mb-6">
            <div class="bg-primary/20 p-4 rounded-2xl group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined text-primary text-3xl">{{ card.icon || 'track_changes' }}</span>
            </div>
            <h4 class="text-3xl font-black text-white font-serif">{{ card.title }}</h4>
          </div>
          <p class="text-slate-300 text-lg leading-relaxed font-medium">
            {{ card.description }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
