<script setup lang="ts">
interface Program {
  icon_svg?: string
  title: string
  description: string
  link_label?: string
  link_url?: string
}
defineProps<{
  data: {
    title?: string
    subtitle?: string
    programs?: Program[]
  }
}>()

const defaultPrograms: Program[] = [
  {
    title: 'Academic Excellence',
    description: 'A bilingual curriculum focusing on linguistic mastery and scientific inquiry for ages 5 to 16.',
    link_label: 'Learn More',
    link_url: '#',
  },
  {
    title: 'Arts & Culture',
    description: 'Reviving local folk arts, music, and dance to keep students connected to their heritage.',
    link_label: 'Learn More',
    link_url: '#',
  },
  {
    title: 'Sustainability Hub',
    description: 'Hands-on learning in our organic garden teaches responsibility and environmental ethics.',
    link_label: 'Learn More',
    link_url: '#',
  },
]
</script>

<template>
  <section id="programs" class="avs-programs">
    <div class="avs-container">
      <div class="avs-section-header">
        <h2 class="avs-section-title">{{ data.title || 'Our Core Programs' }}</h2>
        <p class="avs-section-sub">{{ data.subtitle || 'We provide more than just textbooks; we provide a foundation for life.' }}</p>
      </div>
      <div class="avs-cards">
        <div
          v-for="(program, i) in (data.programs || defaultPrograms)"
          :key="i"
          class="avs-card"
        >
          <div class="avs-card__icon" v-if="program.icon_svg" v-html="program.icon_svg"></div>
          <div class="avs-card__icon avs-card__icon--default" v-else>
            <span>{{ i + 1 }}</span>
          </div>
          <h3 class="avs-card__title">{{ program.title }}</h3>
          <p class="avs-card__desc">{{ program.description }}</p>
          <a v-if="program.link_label" :href="program.link_url || '#'" class="avs-card__link">
            {{ program.link_label }} →
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avs-programs { padding: 6rem 0; background: white; font-family: 'Outfit', sans-serif; }
.avs-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.avs-section-header { text-align: center; max-width: 600px; margin: 0 auto 4rem; }
.avs-section-title { font-family: 'Playfair Display', serif; font-size: 2.4rem; color: #7c3a26; margin: 0 0 0.75rem; }
.avs-section-sub { color: #9ca3af; font-size: 1.1rem; margin: 0; }
.avs-cards { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.avs-card {
  background: white; border-radius: 20px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 2.25rem; display: flex; flex-direction: column; gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.avs-card:hover { transform: translateY(-8px); box-shadow: 0 20px 40px rgba(0,0,0,0.08); }
.avs-card__icon {
  width: 60px; height: 60px; background: #fff0d9; color: #e88d2f;
  border-radius: 16px; display: flex; align-items: center; justify-content: center;
  margin-bottom: 0.5rem; font-size: 1.5rem; font-weight: 700;
  transition: background 0.3s, color 0.3s;
}
.avs-card:hover .avs-card__icon { background: #e88d2f; color: white; }
.avs-card__title { font-family: 'Playfair Display', serif; font-size: 1.4rem; color: #7c3a26; margin: 0; }
.avs-card__desc { color: #9ca3af; line-height: 1.65; margin: 0; flex: 1; }
.avs-card__link { text-decoration: none; color: #7c3a26; font-weight: 700; transition: color 0.2s; margin-top: 0.5rem; }
.avs-card__link:hover { color: #e88d2f; }
@media (max-width: 820px) {
  .avs-cards { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
}
</style>
