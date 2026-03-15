<script setup lang="ts">
defineProps<{
  data: {
    title?: string
    subtitle?: string
    amounts?: string[]
    active_amount?: string
    cta_label?: string
  }
}>()

const defaultAmounts = ['$25', '$50', '$100', 'Custom']
</script>

<template>
  <section id="donate" class="avs-donate">
    <div class="avs-donate__pattern" aria-hidden="true">
      <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="avs-dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse">
            <circle cx="2" cy="2" r="2" fill="white"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#avs-dots)"/>
      </svg>
    </div>
    <div class="avs-donate__inner">
      <h2 class="avs-donate__title">{{ data.title || 'Change a Life Today' }}</h2>
      <p class="avs-donate__sub">
        {{ data.subtitle || 'Your contribution provides uniforms, midday meals, and quality education. Be a part of the village that raises a child.' }}
      </p>
      <div class="avs-donate__amounts">
        <button
          v-for="amount in (data.amounts || defaultAmounts)"
          :key="amount"
          :class="['avs-amount-btn', amount === (data.active_amount || '$100') ? 'avs-amount-btn--active' : '']"
        >
          {{ amount }}
        </button>
      </div>
      <button class="avs-donate__cta">
        {{ data.cta_label || 'Proceed to Secure Donation' }}
      </button>
    </div>
  </section>
</template>

<style scoped>
.avs-donate {
  position: relative; padding: 6rem 1.5rem;
  background: #7c3a26; color: white; text-align: center; overflow: hidden;
  font-family: 'Outfit', sans-serif;
}
.avs-donate__pattern { position: absolute; inset: 0; opacity: 0.08; pointer-events: none; }
.avs-donate__inner {
  position: relative; z-index: 1; max-width: 720px; margin: 0 auto;
  display: flex; flex-direction: column; align-items: center; gap: 1.5rem;
}
.avs-donate__title { font-family: 'Playfair Display', serif; font-size: clamp(2rem, 4vw, 3rem); margin: 0; color: white; }
.avs-donate__sub { font-size: 1.15rem; opacity: 0.9; line-height: 1.7; margin: 0; }
.avs-donate__amounts {
  display: grid; grid-template-columns: repeat(4, 1fr); gap: 1rem;
  width: 100%; max-width: 560px; margin: 0.5rem 0;
}
.avs-amount-btn {
  background: rgba(255,255,255,0.1); color: white;
  border: 1px solid rgba(255,255,255,0.2); border-radius: 12px;
  padding: 1rem; font-weight: 700; font-size: 1rem;
  cursor: pointer; font-family: inherit; transition: background 0.2s;
}
.avs-amount-btn:hover { background: rgba(255,255,255,0.2); }
.avs-amount-btn--active { background: #e88d2f; border-color: #e88d2f; box-shadow: 0 6px 20px rgba(232,141,47,0.4); }
.avs-donate__cta {
  background: white; color: #7c3a26;
  border: none; border-radius: 100px;
  padding: 1.1rem 3rem; font-weight: 700; font-size: 1.1rem;
  cursor: pointer; font-family: inherit;
  transition: background 0.2s; box-shadow: 0 10px 30px rgba(0,0,0,0.15);
}
.avs-donate__cta:hover { background: #fff3e0; }
@media (max-width: 520px) {
  .avs-donate__amounts { grid-template-columns: 1fr 1fr; }
}
</style>
