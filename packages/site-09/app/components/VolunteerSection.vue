<template>
  <section id="volunteer" class="py-24">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-secondary rounded-3xl p-8 md:p-16 relative overflow-hidden">
        <!-- Background Pattern -->
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10">
          <img 
            alt="Pattern" 
            class="w-full h-full object-cover" 
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuBIXA-huOi23ywDpwrzysi_C0CuNx61bhiDFjZSg2tVSmQTAxalNCvHJPfGz_NIdgM0mSlKHAti5q2_2UejGyCQ0tiAEWOeWvrPk3k0D3jd6BDh1EeOYaBQ7mxJmcVIfy-IdpTi_Q3xgUhYAxtcaV99TnDQcIpbV5bRmLfheD6zuDXbGVrWG88XfYcJouilo3XV4vu2i55_o7IidT5jAWgjaPnS9FTECkiEk79WBZo_RPMN4U9MRq4u_iLzzmQVvA4z0te2Hk9sVyW2" 
          />
        </div>
        
        <div class="relative z-10 grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 class="text-white text-4xl font-extrabold mb-6">Want to make a tangible difference?</h3>
            <p class="text-slate-300 text-lg mb-8 leading-relaxed">
              We are always looking for passionate volunteers, subject matter experts, and mentors to help our students grow. Whether you have two weeks or two months, your impact matters.
            </p>
            <div class="flex flex-col sm:flex-row gap-4">
              <AppButton variant="primary">Become a Volunteer</AppButton>
              <AppButton variant="outline-white">Corporate Partnerships</AppButton>
            </div>
          </div>
          
          <!-- Stats Grid -->
          <div class="grid grid-cols-2 gap-4">
            <div v-for="stat in stats" :key="stat.label" class="bg-white/5 p-6 rounded-2xl border border-white/10 transition-colors hover:bg-white/10">
              <div class="text-primary font-black text-3xl mb-1">{{ stat.value }}</div>
              <div class="text-slate-400 text-sm">{{ stat.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const stats = [
  { value: '15+', label: 'Countries Represented' },
  { value: '200+', label: 'Active Volunteers' },
  { value: '50k+', label: 'Teaching Hours' },
  { value: '98%', label: 'Satisfaction Rate' }
];
</script>
