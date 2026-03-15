<template>
  <div class="avs-page">
    <!-- Header / Navigation -->
    <nav :class="['avs-nav', scrolled ? 'avs-nav--scrolled' : '']">
      <div class="avs-nav__inner">
        <div class="avs-brand">
          <svg viewBox="0 0 100 80" class="avs-logo" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 60C30 35 70 35 80 60" stroke="#e88d2f" stroke-width="4" stroke-linecap="round"/>
            <path d="M45 45C45 43 46 42 48 42C50 42 51 43 51 45C51 47 50 48 48 48C46 48 45 47 45 45Z" fill="#e88d2f"/>
            <path d="M55 42C57 42 58 43 58 45C58 47 57 48 55 48C53 48 52 47 52 45C52 43 53 42 55 42Z" fill="#e88d2f"/>
            <path d="M30 65C30 65 25 68 20 70" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <path d="M70 65C70 65 75 68 80 70" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <line x1="50" y1="5" x2="50" y2="25" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <line x1="20" y1="15" x2="35" y2="30" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <line x1="80" y1="15" x2="65" y2="30" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <line x1="10" y1="40" x2="30" y2="45" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
            <line x1="90" y1="40" x2="70" y2="45" stroke="#e88d2f" stroke-width="3" stroke-linecap="round"/>
          </svg>
          <span class="avs-brand__name">Arunachala Village School</span>
        </div>

        <div class="avs-nav__links">
          <a href="#about" class="avs-nav__link">Our Story</a>
          <a href="#programs" class="avs-nav__link">Programs</a>
          <a href="#impact" class="avs-nav__link">Impact</a>
          <a href="#volunteer" class="avs-nav__link">Volunteer</a>
          <a href="#donate" class="avs-btn avs-btn--primary avs-btn--pill">Support Us</a>
        </div>

        <button class="avs-menu-btn" @click="toggleMenu" aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      <!-- Mobile Menu -->
      <div v-if="menuOpen" class="avs-mobile-menu">
        <a href="#about" class="avs-mobile-menu__link" @click="menuOpen = false">Our Story</a>
        <a href="#programs" class="avs-mobile-menu__link" @click="menuOpen = false">Programs</a>
        <a href="#impact" class="avs-mobile-menu__link" @click="menuOpen = false">Impact</a>
        <a href="#volunteer" class="avs-mobile-menu__link" @click="menuOpen = false">Volunteer</a>
        <a href="#donate" class="avs-mobile-menu__link avs-mobile-menu__link--cta" @click="menuOpen = false">Support Us</a>
      </div>
    </nav>

    <!-- Hero Section -->
    <section class="avs-hero">
      <div class="avs-hero__bg-accent"></div>
      <div class="avs-container avs-hero__grid">
        <div class="avs-hero__content">
          <div class="avs-tag">Education for all</div>
          <h1 class="avs-hero__headline">
            Nurturing <em>Potential</em> in every Child.
          </h1>
          <p class="avs-hero__sub">
            Arunachala Village School provides quality, holistic education to rural communities, fostering a generation of confident and compassionate leaders.
          </p>
          <div class="avs-hero__ctas">
            <a href="#donate" class="avs-btn avs-btn--primary avs-btn--pill avs-btn--lg">Donate Now</a>
            <a href="#about" class="avs-btn avs-btn--outline avs-btn--pill avs-btn--lg">Learn More</a>
          </div>
        </div>
        <div class="avs-hero__visual">
          <div class="avs-hero__img-wrap">
            <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop" alt="Children at school" class="avs-hero__img">
          </div>
          <div class="avs-hero__badge">
            <div class="avs-hero__badge-icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="22" height="22"><path d="M12 21.593c-5.63-5.539-11-10.297-11-14.402 0-3.791 3.068-5.191 5.281-5.191 1.312 0 4.151.501 5.719 4.457 1.59-3.968 4.464-4.447 5.726-4.447 2.54 0 5.274 1.621 5.274 5.181 0 4.069-5.136 8.625-11 14.402z"/></svg>
            </div>
            <div>
              <strong>500+ Students</strong>
              <span>Supported every single year</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Mission Stats -->
    <section class="avs-stats">
      <div class="avs-container avs-stats__grid">
        <div class="avs-stat scroll-reveal">
          <div class="avs-stat__number">95%</div>
          <div class="avs-stat__label">Literacy Rate</div>
          <p class="avs-stat__desc">In the communities we serve compared to 60% regional average.</p>
        </div>
        <div class="avs-stat avs-stat--bordered scroll-reveal" style="transition-delay: 0.2s">
          <div class="avs-stat__number">12:1</div>
          <div class="avs-stat__label">Student-Teacher Ratio</div>
          <p class="avs-stat__desc">Personalized attention for every child's unique learning curve.</p>
        </div>
        <div class="avs-stat scroll-reveal" style="transition-delay: 0.4s">
          <div class="avs-stat__number">100%</div>
          <div class="avs-stat__label">Community Funded</div>
          <p class="avs-stat__desc">Every rupee goes directly to student supplies and facilities.</p>
        </div>
      </div>
    </section>

    <!-- About Section -->
    <section id="about" class="avs-about">
      <div class="avs-container avs-about__layout">
        <div class="avs-about__gallery">
          <img src="https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop" class="avs-about__img avs-about__img--top" alt="School Class">
          <img src="https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop" class="avs-about__img avs-about__img--bottom" alt="Learning">
        </div>
        <div class="avs-about__content">
          <h2 class="avs-section-title">Rooted in Tradition,<br>Growing for the Future</h2>
          <p class="avs-body-text">
            Founded in 2012, Arunachala Village School began as a small initiative to provide children in rural villages with the same opportunities as those in cities. We believe education is the sunlight that lets a village flourish.
          </p>
          <ul class="avs-checklist">
            <li class="avs-checklist__item">
              <span class="avs-check-icon">✓</span>
              Holistic curriculum including arts, yoga, and organic farming.
            </li>
            <li class="avs-checklist__item">
              <span class="avs-check-icon">✓</span>
              Environmentally conscious campus powered by solar energy.
            </li>
            <li class="avs-checklist__item">
              <span class="avs-check-icon">✓</span>
              Deep engagement with village parents and local councils.
            </li>
          </ul>
        </div>
      </div>
    </section>

    <!-- Programs -->
    <section id="programs" class="avs-programs">
      <div class="avs-container">
        <div class="avs-section-header">
          <h2 class="avs-section-title">Our Core Programs</h2>
          <p class="avs-section-sub">We provide more than just textbooks; we provide a foundation for life.</p>
        </div>

        <div class="avs-cards">
          <div class="avs-card">
            <div class="avs-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 4.5L17 8v2c0 3.5-2.5 6.79-5 7.93-2.5-1.14-5-4.43-5-7.93V8l5-2.5z"/></svg>
            </div>
            <h3 class="avs-card__title">Academic Excellence</h3>
            <p class="avs-card__desc">A bilingual curriculum focusing on linguistic mastery and scientific inquiry for ages 5 to 16.</p>
            <a href="#" class="avs-card__link">Learn More →</a>
          </div>
          <div class="avs-card">
            <div class="avs-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M12 2C6.49 2 2 6.49 2 12s4.49 10 10 10 10-4.49 10-10S17.51 2 12 2zm-1 17.93V18c0-.55.45-1 1-1s1 .45 1 1v1.93C9.06 19.48 6.52 16.94 6.07 14H8c.55 0 1 .45 1 1s-.45 1-1 1H6.07zm5 0V18c0-.55.45-1 1-1h1.93c-.45 2.94-2.99 5.48-5.93 5.93zM18 13h-1.93C16.52 10.06 14 7.52 11.07 7.07V6c0-.55.45-1 1-1s1 .45 1 1v.07C16.94 6.52 19.48 9.06 19.93 12H18zm-8 0H8.07C7.52 9.06 9.06 7.52 12 7.07V8c0 .55-.45 1-1 1s-1-.45-1-1h-.07z"/></svg>
            </div>
            <h3 class="avs-card__title">Arts &amp; Culture</h3>
            <p class="avs-card__desc">Reviving local folk arts, music, and dance to keep students connected to their heritage.</p>
            <a href="#" class="avs-card__link">Learn More →</a>
          </div>
          <div class="avs-card">
            <div class="avs-card__icon">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17 8C8 10 5.9 16.17 3.82 21.94L5.71 22l1-2.3A4.49 4.49 0 008 20C19 20 22 3 22 3c-1 2-8 2-13 6s-3 9-3 9l.43-.28C8.17 14.22 10.5 10 17 8z"/></svg>
            </div>
            <h3 class="avs-card__title">Sustainability Hub</h3>
            <p class="avs-card__desc">Hands-on learning in our organic garden teaches responsibility and environmental ethics.</p>
            <a href="#" class="avs-card__link">Learn More →</a>
          </div>
        </div>
      </div>
    </section>

    <!-- Donation/CTA Section -->
    <section id="donate" class="avs-donate">
      <div class="avs-donate__pattern" aria-hidden="true">
        <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
          <defs><pattern id="dots" x="0" y="0" width="40" height="40" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="2" fill="white"/></pattern></defs>
          <rect width="100%" height="100%" fill="url(#dots)"/>
        </svg>
      </div>
      <div class="avs-donate__inner">
        <h2 class="avs-donate__title">Change a Life Today</h2>
        <p class="avs-donate__sub">Your contribution provides uniforms, midday meals, and quality education. Be a part of the village that raises a child.</p>

        <div class="avs-donate__amounts">
          <button class="avs-amount-btn">$25</button>
          <button class="avs-amount-btn">$50</button>
          <button class="avs-amount-btn avs-amount-btn--active">$100</button>
          <button class="avs-amount-btn">Custom</button>
        </div>

        <button class="avs-btn avs-btn--white avs-btn--pill avs-btn--xl">
          Proceed to Secure Donation
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="avs-footer">
      <div class="avs-container avs-footer__grid">
        <div class="avs-footer__brand">
          <div class="avs-footer__brand-row">
            <svg viewBox="0 0 100 80" class="avs-footer-logo" fill="none">
              <path d="M20 60C30 35 70 35 80 60" stroke="white" stroke-width="4" stroke-linecap="round"/>
              <path d="M50 5 L50 25" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M20 15 L35 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
              <path d="M80 15 L65 30" stroke="white" stroke-width="3" stroke-linecap="round"/>
            </svg>
            <span>Arunachala Village School</span>
          </div>
          <p class="avs-footer__desc">
            A non-profit educational institution dedicated to empowering rural India through quality education and community development.
          </p>
          <div class="avs-social">
            <a href="#" class="avs-social__icon" aria-label="Facebook">
              <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg>
            </a>
            <a href="#" class="avs-social__icon" aria-label="Instagram">
              <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8A1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5a5 5 0 0 1-5 5a5 5 0 0 1-5-5a5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3a3 3 0 0 0 3 3a3 3 0 0 0 3-3a3 3 0 0 0-3-3z"/></svg>
            </a>
            <a href="#" class="avs-social__icon" aria-label="YouTube">
              <svg fill="currentColor" viewBox="0 0 24 24" width="18" height="18"><path d="M10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83-.25.9-.83 1.48-1.73 1.73-.47.13-1.33.22-2.65.28-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44-.9-.25-1.48-.83-1.73-1.73-.13-.47-.22-1.1-.28-1.9-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83.25-.9.83-1.48 1.73-1.73.47-.13 1.33-.22 2.65-.28 1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44.9.25 1.48.83 1.73 1.73z"/></svg>
            </a>
          </div>
        </div>

        <div class="avs-footer__col">
          <h4 class="avs-footer__col-title">Quick Links</h4>
          <ul class="avs-footer__links">
            <li><a href="#">Our Founders</a></li>
            <li><a href="#">Annual Reports</a></li>
            <li><a href="#">Success Stories</a></li>
            <li><a href="#">Privacy Policy</a></li>
          </ul>
        </div>

        <div class="avs-footer__col">
          <h4 class="avs-footer__col-title">Visit Us</h4>
          <p class="avs-footer__address">
            Tiruvannamalai Village,<br>
            Tamil Nadu, India 606601
          </p>
          <p class="avs-footer__address">
            info@arunachalavillage.org<br>
            +91 (0) 4175 234 567
          </p>
        </div>
      </div>

      <div class="avs-footer__bottom">
        &copy; 2024 Arunachala Village School. All Rights Reserved.
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'

const scrolled = ref(false)
const menuOpen = ref(false)

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  document.querySelectorAll('.scroll-reveal').forEach(el => {
    if (el.getBoundingClientRect().top < window.innerHeight - 100) {
      el.classList.add('visible')
    }
  })
}

const toggleMenu = () => {
  menuOpen.value = !menuOpen.value
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})

useHead({
  title: 'Arunachala Village School | Empowering Minds, Enriching Lives',
  link: [
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
    { rel: 'stylesheet', href: 'https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,700;1,700&display=swap' },
  ]
})
</script>

<style scoped>
/* ─── Design Tokens ───────────────────────────── */
.avs-page {
  --orange: #e88d2f;
  --brown: #7c3a26;
  --bg: #fcf9f5;
  --text: #333;
  --gray: #6b7280;
  --light-gray: #9ca3af;

  font-family: 'Outfit', sans-serif;
  background: var(--bg);
  color: var(--text);
  scroll-behavior: smooth;
}

h1, h2, h3 {
  font-family: 'Playfair Display', serif;
}

/* ─── Shared Utilities ───────────────────────── */
.avs-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}

.avs-btn {
  display: inline-block;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s ease;
  text-decoration: none;
  border: none;
  font-family: inherit;
  font-size: 1rem;
}

.avs-btn--pill { border-radius: 100px; }

.avs-btn--primary {
  background: var(--orange);
  color: white;
  padding: 0.75rem 1.75rem;
}
.avs-btn--primary:hover {
  background: var(--brown);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(124,58,38,0.25);
}

.avs-btn--outline {
  background: transparent;
  color: var(--brown);
  border: 2px solid var(--brown);
  padding: 0.7rem 1.75rem;
}
.avs-btn--outline:hover {
  background: var(--brown);
  color: white;
}

.avs-btn--white {
  background: white;
  color: var(--brown);
  padding: 1.1rem 3rem;
}
.avs-btn--white:hover { background: #fff3e0; }

.avs-btn--lg { padding: 1rem 2.25rem; }
.avs-btn--xl { font-size: 1.1rem; }

.avs-section-title {
  font-size: 2.4rem;
  color: var(--brown);
  margin: 0 0 1rem;
  line-height: 1.3;
}

.avs-body-text {
  color: var(--gray);
  line-height: 1.75;
  font-size: 1.05rem;
}

/* ─── Scroll Reveal ──────────────────────────── */
.scroll-reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s ease-out;
}
.scroll-reveal.visible {
  opacity: 1;
  transform: translateY(0);
}

/* ─── Nav ────────────────────────────────────── */
.avs-nav {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  padding: 1.5rem 1.5rem;
  transition: all 0.3s ease;
}

.avs-nav--scrolled {
  background: rgba(255,255,255,0.95);
  backdrop-filter: blur(10px);
  box-shadow: 0 2px 20px rgba(0,0,0,0.06);
  padding: 0.9rem 1.5rem;
}

.avs-nav__inner {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}

.avs-brand {
  display: flex;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
}

.avs-brand__name {
  font-weight: 700;
  font-size: 1.1rem;
  color: var(--brown);
  white-space: nowrap;
}

.avs-logo { width: 48px; height: 48px; }

.avs-nav__links {
  display: flex;
  align-items: center;
  gap: 2rem;
}

.avs-nav__link {
  text-decoration: none;
  font-weight: 500;
  color: var(--text);
  transition: color 0.2s;
}
.avs-nav__link:hover { color: var(--orange); }

.avs-menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
}
.avs-menu-btn span {
  display: block;
  width: 26px;
  height: 3px;
  background: var(--brown);
  border-radius: 2px;
  transition: background 0.2s;
}

.avs-mobile-menu {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 1.5rem 1.5rem;
  gap: 0.25rem;
  background: rgba(255,255,255,0.98);
}

.avs-mobile-menu__link {
  text-decoration: none;
  font-weight: 600;
  color: var(--brown);
  padding: 0.75rem 0;
  border-bottom: 1px solid #f0e8e2;
  transition: color 0.2s;
}
.avs-mobile-menu__link:hover { color: var(--orange); }
.avs-mobile-menu__link--cta {
  color: var(--orange);
  border-bottom: none;
  margin-top: 0.5rem;
}

@media (max-width: 900px) {
  .avs-nav__links { display: none; }
  .avs-menu-btn { display: flex; }
  .avs-brand__name { display: none; }
}

/* ─── Hero ───────────────────────────────────── */
.avs-hero {
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding-top: 5rem;
  overflow: hidden;
}

.avs-hero__bg-accent {
  position: absolute;
  top: 0;
  right: 0;
  width: 46%;
  height: 100%;
  background: #fff8f0;
  border-radius: 80px 0 0 80px;
  z-index: 0;
}

.avs-hero__grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  align-items: center;
  position: relative;
  z-index: 1;
  padding-top: 2rem;
  padding-bottom: 4rem;
}

.avs-hero__content { display: flex; flex-direction: column; gap: 1.75rem; }

.avs-tag {
  display: inline-block;
  background: #fff0d9;
  color: var(--orange);
  padding: 0.35rem 1rem;
  border-radius: 100px;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  width: fit-content;
}

.avs-hero__headline {
  font-size: clamp(2.6rem, 5vw, 4.2rem);
  color: var(--brown);
  line-height: 1.15;
  margin: 0;
}
.avs-hero__headline em {
  color: var(--orange);
  font-style: italic;
}

.avs-hero__sub {
  color: var(--gray);
  font-size: 1.1rem;
  line-height: 1.75;
  max-width: 480px;
  margin: 0;
}

.avs-hero__ctas { display: flex; gap: 1rem; flex-wrap: wrap; }

.avs-hero__visual { position: relative; }

.avs-hero__img-wrap {
  width: 100%;
  height: 480px;
  border-radius: 36px;
  overflow: hidden;
  box-shadow: 0 30px 60px rgba(0,0,0,0.12);
}

.avs-hero__img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.avs-hero__badge {
  position: absolute;
  bottom: -1.5rem;
  left: -1.5rem;
  background: white;
  border: 1px solid #ffe5c2;
  border-radius: 24px;
  box-shadow: 0 12px 30px rgba(0,0,0,0.08);
  padding: 1.25rem 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  max-width: 260px;
}

.avs-hero__badge-icon {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: var(--orange);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
}

.avs-hero__badge strong {
  display: block;
  color: var(--brown);
  font-weight: 700;
  font-size: 0.95rem;
}
.avs-hero__badge span {
  display: block;
  color: var(--light-gray);
  font-size: 0.8rem;
  margin-top: 2px;
}

@media (max-width: 900px) {
  .avs-hero__grid { grid-template-columns: 1fr; gap: 3rem; }
  .avs-hero__bg-accent { display: none; }
  .avs-hero__img-wrap { height: 320px; }
  .avs-hero__badge { left: 0; bottom: -1rem; }
}

/* ─── Stats ──────────────────────────────────── */
.avs-stats {
  padding: 5rem 0;
  background: white;
}

.avs-stats__grid {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 0;
}

.avs-stat {
  padding: 2.5rem;
  text-align: center;
}

.avs-stat--bordered {
  border-left: 1px solid #f0f0f0;
  border-right: 1px solid #f0f0f0;
}

.avs-stat__number {
  font-size: 3.5rem;
  font-weight: 700;
  color: var(--orange);
  margin-bottom: 0.35rem;
  line-height: 1;
}

.avs-stat__label {
  font-size: 1.1rem;
  font-weight: 700;
  color: var(--brown);
  margin-bottom: 0.5rem;
}

.avs-stat__desc {
  color: var(--light-gray);
  font-size: 0.95rem;
  line-height: 1.6;
  margin: 0;
}

@media (max-width: 680px) {
  .avs-stats__grid { grid-template-columns: 1fr; }
  .avs-stat--bordered { border: none; border-top: 1px solid #f0f0f0; border-bottom: 1px solid #f0f0f0; }
}

/* ─── About ──────────────────────────────────── */
.avs-about {
  padding: 6rem 0;
  background: #fff8f0;
}

.avs-about__layout {
  display: flex;
  gap: 5rem;
  align-items: center;
}

.avs-about__gallery {
  flex: 1;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  flex-shrink: 0;
}

.avs-about__img {
  width: 100%;
  height: 260px;
  object-fit: cover;
  border-radius: 24px;
  display: block;
}

.avs-about__img--bottom { margin-top: 3rem; }

.avs-about__content { flex: 1; display: flex; flex-direction: column; gap: 1.25rem; }

.avs-checklist {
  list-style: none;
  padding: 0;
  margin: 0.5rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.85rem;
}

.avs-checklist__item {
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  color: #4b5563;
  line-height: 1.6;
}

.avs-check-icon {
  color: var(--orange);
  font-weight: 700;
  font-size: 1rem;
  margin-top: 2px;
  flex-shrink: 0;
}

@media (max-width: 900px) {
  .avs-about__layout { flex-direction: column; gap: 3rem; }
}

/* ─── Programs ───────────────────────────────── */
.avs-programs {
  padding: 6rem 0;
  background: white;
}

.avs-section-header {
  text-align: center;
  max-width: 600px;
  margin: 0 auto 4rem;
}

.avs-section-sub {
  color: var(--light-gray);
  font-size: 1.1rem;
  margin: 0;
}

.avs-cards {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
}

.avs-card {
  background: white;
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
  padding: 2.25rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.avs-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0,0,0,0.08);
}

.avs-card__icon {
  width: 60px;
  height: 60px;
  background: #fff0d9;
  color: var(--orange);
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 0.5rem;
  transition: background 0.3s, color 0.3s;
}
.avs-card:hover .avs-card__icon {
  background: var(--orange);
  color: white;
}

.avs-card__title {
  font-size: 1.4rem;
  color: var(--brown);
  margin: 0;
}

.avs-card__desc {
  color: var(--light-gray);
  line-height: 1.65;
  margin: 0;
  flex: 1;
}

.avs-card__link {
  text-decoration: none;
  color: var(--brown);
  font-weight: 700;
  transition: color 0.2s;
  margin-top: 0.5rem;
}
.avs-card__link:hover { color: var(--orange); }

@media (max-width: 820px) {
  .avs-cards { grid-template-columns: 1fr; max-width: 440px; margin: 0 auto; }
}

/* ─── Donate ─────────────────────────────────── */
.avs-donate {
  position: relative;
  padding: 6rem 1.5rem;
  background: var(--brown);
  color: white;
  text-align: center;
  overflow: hidden;
}

.avs-donate__pattern {
  position: absolute;
  inset: 0;
  opacity: 0.08;
  pointer-events: none;
}

.avs-donate__inner {
  position: relative;
  z-index: 1;
  max-width: 720px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.avs-donate__title {
  font-size: clamp(2rem, 4vw, 3rem);
  margin: 0;
  color: white;
}

.avs-donate__sub {
  font-size: 1.15rem;
  opacity: 0.9;
  line-height: 1.7;
  margin: 0;
}

.avs-donate__amounts {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 1rem;
  width: 100%;
  max-width: 560px;
  margin: 0.5rem 0;
}

.avs-amount-btn {
  background: rgba(255,255,255,0.1);
  color: white;
  border: 1px solid rgba(255,255,255,0.2);
  border-radius: 12px;
  padding: 1rem;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  font-family: inherit;
  transition: background 0.2s;
}
.avs-amount-btn:hover { background: rgba(255,255,255,0.2); }
.avs-amount-btn--active {
  background: var(--orange);
  border-color: var(--orange);
  box-shadow: 0 6px 20px rgba(232,141,47,0.4);
}

@media (max-width: 520px) {
  .avs-donate__amounts { grid-template-columns: 1fr 1fr; }
}

/* ─── Footer ─────────────────────────────────── */
.avs-footer {
  background: #111827;
  color: white;
  padding: 5rem 0 0;
}

.avs-footer__grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 3rem;
  padding-bottom: 4rem;
}

.avs-footer__brand { display: flex; flex-direction: column; gap: 1rem; }

.avs-footer__brand-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  font-size: 1.2rem;
  font-weight: 700;
}

.avs-footer-logo { width: 36px; height: 36px; }

.avs-footer__desc {
  color: #9ca3af;
  line-height: 1.7;
  max-width: 320px;
  margin: 0;
  font-size: 0.95rem;
}

.avs-social {
  display: flex;
  gap: 0.75rem;
  margin-top: 0.25rem;
}

.avs-social__icon {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  border: 1px solid #374151;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s, border-color 0.2s;
}
.avs-social__icon:hover {
  background: var(--orange);
  border-color: var(--orange);
}

.avs-footer__col-title {
  font-size: 1rem;
  font-weight: 700;
  margin: 0 0 1.25rem;
}

.avs-footer__links {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0.9rem;
}

.avs-footer__links a {
  color: #9ca3af;
  text-decoration: none;
  transition: color 0.2s;
  font-size: 0.95rem;
}
.avs-footer__links a:hover { color: var(--orange); }

.avs-footer__address {
  color: #9ca3af;
  line-height: 1.7;
  margin: 0 0 1rem;
  font-size: 0.95rem;
}

.avs-footer__bottom {
  border-top: 1px solid #1f2937;
  text-align: center;
  padding: 1.5rem;
  color: #6b7280;
  font-size: 0.875rem;
}

@media (max-width: 820px) {
  .avs-footer__grid { grid-template-columns: 1fr 1fr; }
  .avs-footer__brand { grid-column: 1 / -1; }
}

@media (max-width: 480px) {
  .avs-footer__grid { grid-template-columns: 1fr; }
}
</style>
