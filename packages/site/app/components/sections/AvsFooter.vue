<script setup lang="ts">
defineProps<{
  data: {
    org_name?: string
    description?: string
    address?: string
    email?: string
    phone?: string
    facebook_url?: string
    instagram_url?: string
    youtube_url?: string
    copyright?: string
    quick_links?: Array<{ label: string; url: string }>
  }
}>()

const defaultLinks = [
  { label: 'Our Founders', url: '#' },
  { label: 'Annual Reports', url: '#' },
  { label: 'Success Stories', url: '#' },
  { label: 'Privacy Policy', url: '#' },
]
</script>

<template>
  <footer class="avs-footer">
    <div class="avs-container avs-footer__grid">
      <!-- Brand col -->
      <div class="avs-footer__brand">
        <div class="avs-footer__brand-row">
          <svg viewBox="0 0 100 80" class="avs-footer-logo" fill="none">
            <path d="M20 60C30 35 70 35 80 60" stroke="white" stroke-width="4" stroke-linecap="round"/>
            <path d="M50 5 L50 25" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M20 15 L35 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
            <path d="M80 15 L65 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span>{{ data.org_name || 'Arunachala Village School' }}</span>
        </div>
        <p class="avs-footer__desc">
          {{ data.description || 'A non-profit educational institution dedicated to empowering rural India through quality education and community development.' }}
        </p>
        <div class="avs-social">
          <a :href="data.facebook_url || '#'" class="avs-social__icon" aria-label="Facebook">
            <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
          </a>
          <a :href="data.instagram_url || '#'" class="avs-social__icon" aria-label="Instagram">
            <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/></svg>
          </a>
          <a :href="data.youtube_url || '#'" class="avs-social__icon" aria-label="YouTube">
            <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
          </a>
        </div>
      </div>

      <!-- Quick Links -->
      <div class="avs-footer__col">
        <h4 class="avs-footer__col-title">Quick Links</h4>
        <ul class="avs-footer__links">
          <li v-for="link in (data.quick_links || defaultLinks)" :key="link.label">
            <a :href="link.url">{{ link.label }}</a>
          </li>
        </ul>
      </div>

      <!-- Contact -->
      <div class="avs-footer__col">
        <h4 class="avs-footer__col-title">Visit Us</h4>
        <p class="avs-footer__address" v-html="(data.address || 'Tiruvannamalai Village,<br>Tamil Nadu, India 606601').replace(/\\n/g, '<br>')"></p>
        <p class="avs-footer__address">
          {{ data.email || 'info@arunachalavillage.org' }}<br>
          {{ data.phone || '+91 (0) 4175 234 567' }}
        </p>
      </div>
    </div>
    <div class="avs-footer__bottom">
      {{ data.copyright || '© 2024 Arunachala Village School. All Rights Reserved.' }}
    </div>
  </footer>
</template>

<style scoped>
.avs-footer { background: #111827; color: white; padding: 5rem 0 0; font-family: 'Outfit', sans-serif; }
.avs-container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
.avs-footer__grid { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 3rem; padding-bottom: 4rem; }
.avs-footer__brand { display: flex; flex-direction: column; gap: 1rem; }
.avs-footer__brand-row { display: flex; align-items: center; gap: 0.75rem; font-size: 1.2rem; font-weight: 700; }
.avs-footer-logo { width: 36px; height: 36px; }
.avs-footer__desc { color: #9ca3af; line-height: 1.7; max-width: 320px; margin: 0; font-size: 0.95rem; }
.avs-social { display: flex; gap: 0.75rem; margin-top: 0.25rem; }
.avs-social__icon {
  width: 38px; height: 38px; border-radius: 50%; border: 1px solid #374151;
  color: white; display: flex; align-items: center; justify-content: center;
  transition: background 0.2s, border-color 0.2s; text-decoration: none;
}
.avs-social__icon:hover { background: #e88d2f; border-color: #e88d2f; }
.avs-footer__col-title { font-size: 1rem; font-weight: 700; margin: 0 0 1.25rem; }
.avs-footer__links { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.9rem; }
.avs-footer__links a { color: #9ca3af; text-decoration: none; transition: color 0.2s; font-size: 0.95rem; }
.avs-footer__links a:hover { color: #e88d2f; }
.avs-footer__address { color: #9ca3af; line-height: 1.7; margin: 0 0 1rem; font-size: 0.95rem; }
.avs-footer__bottom { border-top: 1px solid #1f2937; text-align: center; padding: 1.5rem; color: #6b7280; font-size: 0.875rem; }
@media (max-width: 820px) { .avs-footer__grid { grid-template-columns: 1fr 1fr; } .avs-footer__brand { grid-column: 1 / -1; } }
@media (max-width: 480px) { .avs-footer__grid { grid-template-columns: 1fr; } }
</style>
