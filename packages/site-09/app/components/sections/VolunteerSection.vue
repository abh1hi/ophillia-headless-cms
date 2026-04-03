<script setup lang="ts">
interface VolunteerStat {
  value?: string
  label?: string
}

const props = defineProps<{
  data: {
    title?: string
    description?: string
    cta_primary_text?: string
    cta_primary_url?: string
    cta_secondary_text?: string
    cta_secondary_url?: string
    stats?: VolunteerStat[]
  }
}>()

const defaultStats: VolunteerStat[] = [
  { value: '15+', label: 'Countries Represented' },
  { value: '200+', label: 'Active Volunteers' },
  { value: '50k+', label: 'Teaching Hours' },
  { value: '98%', label: 'Satisfaction Rate' }
]

const volunteerStats = computed(() => props.data.stats || defaultStats)
</script>

<template>
  <section id="volunteer" class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-secondary rounded-[40px] p-8 md:p-16 relative overflow-hidden shadow-2xl">
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
          <img 
            alt="Pattern" 
            class="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIXA-huOi23ywDpwrzysi_C0CuNx61bhiDFjZSg2tVSmQTAxalNCvHJPfGz_NIdgM0mSlKHAti5q2_2UejGyCQ0tiAEWOeWvrPk3k0D3jd6BDh1EeOYaBQ7mxJmcVIfy-IdpTi_Q3xgUhYAxtcaV99TnDQcIpbV5bRmLfheD6zuDXbGVrWG88XfYcJouilo3XV4vu2i55_o7IidT5jAWgjaPnS9FTECkiEk79WBZo_RPMN4U9MRq4u_iLzzmQVvA4z0te2Hk9sVyW2" 
          />
        </div>
        
        <div class="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-white text-4xl md:text-5xl font-black mb-6 leading-tight">
              {{ data.title ?? 'Want to make a tangible difference?' }}
            </h3>
            <p class="text-slate-300 text-lg mb-8 leading-relaxed font-medium">
              {{ data.description ?? 'We are always looking for passionate volunteers, subject matter experts, and mentors to help our students grow. Whether you have two weeks or two months, your impact matters.' }}
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <AppButton v-if="data.cta_primary_text" variant="primary" :to="data.cta_primary_url">{{ data.cta_primary_text }}</AppButton>
              <AppButton v-else variant="primary" to="/volunteer">Become a Volunteer</AppButton>
              
              <AppButton v-if="data.cta_secondary_text" variant="outline-white" :to="data.cta_secondary_url">{{ data.cta_secondary_text }}</AppButton>
              <AppButton v-else variant="outline-white" to="/partnerships">Corporate Partnerships</AppButton>
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="(stat, index) in volunteerStats" :key="index" class="bg-white/5 p-6 rounded-3xl border border-white/10 transition-all hover:bg-white/10 hover:scale-105 group duration-300">
              <div class="text-primary font-black text-3xl md:text-4xl mb-1 group-hover:animate-pulse">{{ stat.value }}</div>
              <div class="text-slate-400 text-sm font-bold uppercase tracking-wider">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
#volunteer {
  scroll-margin-top: 100px;
}
</style>
