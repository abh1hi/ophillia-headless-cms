<script setup lang="ts">
interface Stat {
  number: string
  label: string
  description: string
}
defineProps<{
  data: {
    stats?: Stat[]
  }
}>()

const defaultStats: Stat[] = [
  { number: '95%', label: 'Literacy Rate', description: 'In the communities we serve compared to 60% regional average.' },
  { number: '12:1', label: 'Student-Teacher Ratio', description: "Personalized attention for every child's unique learning curve." },
  { number: '100%', label: 'Community Funded', description: 'Every rupee goes directly to student supplies and facilities.' },
]
</script>

<template>
  <section class="avs-stats">
    <div class="avs-container avs-stats__grid">
      <div
        v-for="(stat, i) in (data.stats || defaultStats)"
        :key="i"
        :class="['avs-stat', i === 1 ? 'avs-stat--bordered' : '']"
      >
        <div class="avs-stat__number">{{ stat.number }}</div>
        <div class="avs-stat__label">{{ stat.label }}</div>
        <p class="avs-stat__desc">{{ stat.description }}</p>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avs-stats { padding: 5rem 0; background: white; font-family: 'Outfit', sans-serif; }
.avs-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.avs-stats__grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; }
.avs-stat { padding: 2.5rem; text-align: center; }
.avs-stat--bordered { border-left: 1px solid #f0f0f0; border-right: 1px solid #f0f0f0; }
.avs-stat__number { font-size: 3.5rem; font-weight: 700; color: #e88d2f; margin-bottom: 0.35rem; line-height: 1; }
.avs-stat__label { font-size: 1.1rem; font-weight: 700; color: #7c3a26; margin-bottom: 0.5rem; }
.avs-stat__desc { color: #9ca3af; font-size: 0.95rem; line-height: 1.6; margin: 0; }
@media (max-width: 680px) {
  .avs-stats__grid { grid-template-columns: 1fr; }
  .avs-stat--bordered { border: none; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
}
</style>
