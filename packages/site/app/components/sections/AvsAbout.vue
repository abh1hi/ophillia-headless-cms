<script setup lang="ts">
defineProps<{
  data: {
    title?: string
    title_line2?: string
    body?: string
    image1_url?: string
    image2_url?: string
    bullet1?: string
    bullet2?: string
    bullet3?: string
  }
}>()
</script>

<template>
  <section id="about" class="avs-about">
    <div class="avs-container avs-about__layout">
      <div class="avs-about__gallery">
        <img
          :src="data.image1_url || 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop'"
          class="avs-about__img avs-about__img--top"
          alt="School Class"
        >
        <img
          :src="data.image2_url || 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop'"
          class="avs-about__img avs-about__img--bottom"
          alt="Learning"
        >
      </div>
      <div class="avs-about__content">
        <h2 class="avs-section-title">
          {{ data.title || 'Rooted in Tradition,' }}<br>
          {{ data.title_line2 || 'Growing for the Future' }}
        </h2>
        <p class="avs-body-text">
          {{ data.body || 'Founded in 2012, Arunachala Village School began as a small initiative to provide children in rural villages with the same opportunities as those in cities.' }}
        </p>
        <ul class="avs-checklist">
          <li v-if="data.bullet1" class="avs-checklist__item">
            <span class="avs-check-icon">✓</span> {{ data.bullet1 }}
          </li>
          <li v-if="data.bullet2" class="avs-checklist__item">
            <span class="avs-check-icon">✓</span> {{ data.bullet2 }}
          </li>
          <li v-if="data.bullet3" class="avs-checklist__item">
            <span class="avs-check-icon">✓</span> {{ data.bullet3 }}
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avs-about { padding: 6rem 0; background: #fff8f0; font-family: 'Outfit', sans-serif; }
.avs-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.avs-about__layout { display: flex; gap: 5rem; align-items: center; }
.avs-about__gallery { flex: 1; display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; flex-shrink: 0; }
.avs-about__img { width: 100%; height: 260px; object-fit: cover; border-radius: 24px; display: block; }
.avs-about__img--bottom { margin-top: 3rem; }
.avs-about__content { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }
.avs-section-title { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #7c3a26; margin: 0 0 1rem; line-height: 1.3; }
.avs-body-text { color: #6b7280; line-height: 1.75; font-size: 1.05rem; margin: 0; }
.avs-checklist { list-style: none; padding: 0; margin: 0.5rem 0 0; display: flex; flex-direction: column; gap: 0.85rem; }
.avs-checklist__item { display: flex; align-items: flex-start; gap: 0.75rem; color: #4b5563; line-height: 1.6; }
.avs-check-icon { color: #e88d2f; font-weight: 700; font-size: 1rem; margin-top: 2px; flex-shrink: 0; }
@media (max-width: 900px) {
  .avs-about__layout { flex-direction: column; gap: 3rem; }
}
</style>
