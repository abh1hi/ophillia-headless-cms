<script setup lang="ts">
// components/sections/HeroBanner.vue

defineProps<{
  data: {
    headline?: string
    subline?: string
    cta_label?: string
    cta_url?: string
    background_color?: string
  }
}>()
</script>

<template>
  <section
    class="hero-banner"
    :style="data.background_color ? `background: ${data.background_color}` : ''"
  >
    <div class="hero-inner">
      <h1 v-if="data.headline" class="hero-headline">{{ data.headline }}</h1>
      <p v-if="data.subline" class="hero-subline">{{ data.subline }}</p>
      <a
        v-if="data.cta_label && data.cta_url"
        :href="data.cta_url"
        class="hero-cta"
      >
        {{ data.cta_label }}
      </a>
    </div>
  </section>
</template>

<style scoped>
.hero-banner {
  background: linear-gradient(135deg, #7c3aed 0%, #4f46e5 100%);
  color: white;
  padding: 5rem 2rem;
  text-align: center;
}
.hero-inner {
  max-width: 720px;
  margin: 0 auto;
}
.hero-headline {
  font-size: clamp(2rem, 5vw, 3.5rem);
  font-weight: 800;
  margin: 0 0 1rem;
  line-height: 1.1;
}
.hero-subline {
  font-size: 1.25rem;
  opacity: 0.85;
  margin: 0 0 2rem;
}
.hero-cta {
  display: inline-block;
  background: white;
  color: #7c3aed;
  font-weight: 700;
  padding: 0.75rem 2rem;
  border-radius: 8px;
  text-decoration: none;
  font-size: 1rem;
  transition: transform 0.15s, box-shadow 0.15s;
}
.hero-cta:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
}
</style>
