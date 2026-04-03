<script setup lang="ts">
interface MapPoint {
  top?: string
  left?: string
  right?: string
  bottom?: string
  size?: string
  pulse?: boolean
  opacity?: number
}

const props = defineProps<{
  data: {
    title?: string
    subtitle?: string
    map_image_url?: string
    hub_title?: string
    hub_points?: string[]
    points?: MapPoint[]
  }
}>()

const defaultPoints: MapPoint[] = [
  { top: '50%', left: '33%', size: '1.5rem', pulse: true },
  { top: '25%', left: '50%', size: '1rem', pulse: false, opacity: 0.7 },
  { bottom: '33%', right: '25%', size: '1rem', pulse: false, opacity: 0.7 }
]

const mapPoints = computed(() => props.data.points || defaultPoints)
</script>

<template>
  <section class="w-full py-24 bg-slate-50 dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="text-center mb-16">
        <h3 v-if="data.title" class="text-slate-900 dark:text-slate-100 text-4xl md:text-5xl font-black font-serif leading-tight">{{ data.title }}</h3>
        <p v-if="data.subtitle" class="text-slate-600 dark:text-slate-400 mt-6 max-w-2xl mx-auto text-lg font-medium leading-relaxed">{{ data.subtitle }}</p>
      </div>
      <div class="relative w-full h-[500px] rounded-[3rem] overflow-hidden shadow-2xl border border-slate-200 dark:border-slate-700 group">
        <div class="absolute inset-0 bg-slate-200 dark:bg-slate-800">
          <img 
            class="w-full h-full object-cover grayscale opacity-50 dark:opacity-30 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0 group-hover:opacity-100" 
            :src="data.map_image_url ?? 'https://lh3.googleusercontent.com/aida-public/AB6AXuAVSZIk4c1P23BmCuXv8Uw_zSHMOwDBihZxpdJGzisCrwz-mpKrkm60BsfJBr9cmJnA1gsGE-YXhMxh9JOrYHbuS-YRco5JiXVseX-KVACjVzWwQnXh5JLlyK16SMLYc-cce3uO8roAjrjpxQ1m-LdbPnwxr-Tc_NyJIH8Rb9LWDYuSVuUGnguvE6Sne79tZW9Mnm_NmqvHTsRTi07EI9fheXx3GLSnQFNP0tXwtc5ob91e1KO9kc0vqBccgxe8drNlrlmBkGGQo-Iz'" 
            alt="Regional Map" 
          />
        </div>
        <!-- Map UI Elements -->
        <div class="absolute inset-0 bg-gradient-to-t from-black/40 dark:from-black/60 to-transparent pointer-events-none transition-opacity duration-700 group-hover:opacity-0"></div>
        
        <div 
          v-for="(point, index) in mapPoints" 
          :key="index"
          class="absolute bg-primary rounded-full border-4 border-white dark:border-slate-900 shadow-xl transition-all duration-500 hover:scale-150 cursor-pointer z-10"
          :class="{'animate-pulse': point.pulse}"
          :style="{ 
            top: point.top, 
            left: point.left, 
            right: point.right, 
            bottom: point.bottom, 
            width: point.size, 
            height: point.size,
            opacity: point.opacity ?? 1
          }"
        ></div>

        <div class="absolute bottom-8 left-8 right-8 md:left-auto md:right-8 md:w-96 bg-white/95 dark:bg-slate-900/95 backdrop-blur-xl p-8 rounded-[2rem] shadow-2xl border border-slate-100 dark:border-slate-700 transition-all duration-500 hover:-translate-y-2 relative z-20">
          <h4 class="font-black text-slate-900 dark:text-slate-100 mb-5 text-xl font-serif leading-tight">{{ data.hub_title ?? 'Regional Hub: Tiruvannamalai' }}</h4>
          <ul class="text-base text-slate-600 dark:text-slate-400 space-y-4 font-medium">
            <li v-for="(point, pi) in (data.hub_points ?? ['850 Students from Main Hub', '14 Satellite Learning Centers', '4,500+ Community Beneficiaries'])" :key="pi" class="flex items-center gap-4">
              <span class="size-3 rounded-full bg-primary shrink-0 shadow-lg shadow-primary/30"></span> 
              <span class="leading-tight">{{ point }}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>
