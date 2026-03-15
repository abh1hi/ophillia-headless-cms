<script setup lang="ts">
defineProps<{
  data: {
    tag?: string
    headline?: string
    headline_em?: string
    subtext?: string
    cta_primary_label?: string
    cta_primary_url?: string
    cta_secondary_label?: string
    cta_secondary_url?: string
    image_url?: string
    badge_number?: string
    badge_label?: string
  }
}>()
</script>

<template>
  <section class="avs-hero">
    <div class="avs-hero__bg-accent"></div>
    <div class="avs-container avs-hero__grid">
      <div class="avs-hero__content">
        <div v-if="data.tag" class="avs-tag">{{ data.tag }}</div>
        <h1 class="avs-hero__headline">
          {{ data.headline }}
          <em v-if="data.headline_em">{{ data.headline_em }}</em>
          in every Child.
        </h1>
        <p v-if="data.subtext" class="avs-hero__sub">{{ data.subtext }}</p>
        <div class="avs-hero__ctas">
          <a v-if="data.cta_primary_label" :href="data.cta_primary_url || '#donate'" class="avs-btn avs-btn--primary avs-btn--pill avs-btn--lg">
            {{ data.cta_primary_label }}
          </a>
          <a v-if="data.cta_secondary_label" :href="data.cta_secondary_url || '#about'" class="avs-btn avs-btn--outline avs-btn--pill avs-btn--lg">
            {{ data.cta_secondary_label }}
          </a>
        </div>
      </div>

      <div class="avs-hero__visual">
        <div class="avs-hero__img-wrap">
          <img
            :src="data.image_url || 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop'"
            alt="Children at school"
            class="avs-hero__img"
          >
        </div>
        <div class="avs-hero__badge">
          <div class="avs-hero__badge-icon">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22">
              <path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/>
            </svg>
          </div>
          <div>
            <strong>{{ data.badge_number || '500+ Students' }}</strong>
            <span>{{ data.badge_label || 'Supported every single year' }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.avs-hero {
  --orange: #e88d2f;
  --brown: #7c3a26;
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  overflow: hidden;
  background: #fcf9f5;
  font-family: 'Outfit', sans-serif;
}

.avs-hero__bg-accent {
  position: absolute;
  top: 0; right: 0;
  width: 46%; height: 100%;
  background: #fff8f0;
  border-radius: 80px 0 0 80px;
  z-index: 0;
}

.avs-container {
  max-width: 1200px; margin: 0 auto; padding: 0 1.5rem;
}

.avs-hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  padding: 2rem 1.5rem 4rem;
}

.avs-hero__content { display: flex; flex-direction: column; gap: 1.75rem; }

.avs-tag {
  display: inline-block;
  background: #fff0d9; color: var(--orange);
  padding: 0.35rem 1rem; border-radius: 100px;
  font-size: 0.8rem; font-weight: 700;
  letter-spacing: 0.08em; text-transform: uppercase; width: fit-content;
}

.avs-hero__headline {
  font-family: 'Playfair Display', serif;
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  color: var(--brown); line-height: 1.15; margin: 0;
}
.avs-hero__headline em { color: var(--orange); font-style: italic; }

.avs-hero__sub { color: #6b7280; font-size: 1.1rem; line-height: 1.75; max-width: 480px; margin: 0; }

.avs-hero__ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

.avs-btn { display: inline-block; font-weight: 700; cursor: pointer; transition: all 0.3s ease; text-decoration: none; border: none; font-family: inherit; font-size: 1rem; }
.avs-btn--pill { border-radius: 100px; }
.avs-btn--lg { padding: 1rem 2.25rem; }
.avs-btn--primary { background: var(--orange); color: white; }
.avs-btn--primary:hover { background: var(--brown); transform: translateY(-2px); }
.avs-btn--outline { background: transparent; color: var(--brown); border: 2px solid var(--brown); padding: calc(1rem - 2px) calc(2.25rem - 2px); }
.avs-btn--outline:hover { background: var(--brown); color: white; }

.avs-hero__visual { position: relative; }
.avs-hero__img-wrap { width: 100%; height: 480px; border-radius: 36px; overflow: hidden; box-shadow: 0 30px 60px rgba(0,0,0,0.12); }
.avs-hero__img { width: 100%; height: 100%; object-fit: cover; display: block; }

.avs-hero__badge {
  position: absolute; bottom: -1.5rem; left: -1.5rem;
  background: white; border: 1px solid #ffe5c2; border-radius: 24px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  padding: 1.25rem 1.5rem;
  display: flex; align-items: center; gap: 1rem; max-width: 260px;
}
.avs-hero__badge-icon {
  width: 44px; height: 44px; border-radius: 50%;
  background: var(--orange); color: white;
  display: flex; align-items: center; justify-content: center; flex-shrink: 0;
}
.avs-hero__badge strong { display: block; color: var(--brown); font-weight: 700; font-size: 0.95rem; }
.avs-hero__badge span { display: block; color: #9ca3af; font-size: 0.8rem; margin-top: 2px; }

@media (max-width: 900px) {
  .avs-hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .avs-hero__bg-accent { display: none; }
  .avs-hero__img-wrap { height: 320px; }
  .avs-hero__badge { left: 0; bottom: -1rem; }
}
</style>
