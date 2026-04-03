# Ophillia CMS Master Integration Guide

Ophillia is a schema-first headless CMS that connects your content blueprints (Schemas) to your frontend components. This guide covers how to integrate Ophillia into **new** and **existing** websites using our unified SDK.

---

## 1. Quick Start: New Website (Vite + Vue 3)

If you are starting a fresh project, follow these steps to connect to the CMS.

### Step 1: Install the SDK
```bash
npm install @ophillia/sdk
# or pnpm add @ophillia/sdk
```

### Step 2: Initialize the Client
Create a file `src/lib/cms.ts` to manage your connection:

```typescript
import { ophillia } from '@ophillia/sdk';

ophillia.init({
  apiUrl: import.meta.env.VITE_PB_URL || 'http://localhost:8090',
  apiKey: import.meta.env.VITE_PROJECT_API_KEY,
  projectSlug: 'my-awesome-project'
});

export const cms = ophillia;
```

### Step 3: Create a Dynamic Page Component
Use a catch-all route (e.g., `[slug].vue`) to handle all CMS-managed pages.

```vue
<script setup>
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { cms } from '@/lib/cms'

const route = useRoute()
const page = ref(null)
const sections = ref([])

onMounted(async () => {
  const slug = route.params.slug || 'home'
  page.value = await cms.pages.getBySlug(slug)
  sections.value = await cms.pages.getSections(page.value.id)
})
</script>

<template>
  <main v-if="page">
    <SectionRenderer 
      v-for="section in sections" 
      :key="section.id" 
      :section="section" 
    />
  </main>
</template>
```

---

## 2. Integrating into an Existing Website

Integrating Ophillia into a live production site is designed to be non-intrusive.

### Approach: The "Hybrid" Model
You don't need to migrate your whole site. You can start by making just one section or one sub-page (like `/blog` or `/pricing`) managed by the CMS.

1.  **Install SDK**: Follow "Step 1" above.
2.  **Schema Alignment**: In the Ophillia Dashboard, create a **Schema** that matches your existing UI component's props. 
    *   *Example*: If your existing `HeroSection.vue` takes a `title` and `bg_image`, create a schema named `hero-section` with those two fields.
3.  **Data Injection**: In your existing page component, fetch the section data and pass it to your component.

```vue
<!-- Existing LandingPage.vue -->
<script setup>
import HeroSection from './components/HeroSection.vue'
// ... fetch cms data ...
const cmsHero = sections.value.find(s => s.schema_id.slug === 'hero-section')
</script>

<template>
  <HeroSection v-if="cmsHero" :title="cmsHero.data.title" />
  <HeroSection v-else title="Default Static Title" />
</template>
```

---

## 3. Dynamic Component Mapping (The Section Renderer)

This is the most powerful part of Ophillia. It allows non-technical users to "build" pages by choosing schemas in the dashboard.

### `SectionRenderer.vue` Implementation
Create a component that acts as a switchboard:

```vue
<script setup>
import HeroBanner from './sections/HeroBanner.vue'
import FeatureGrid from './sections/FeatureGrid.vue'
import ContactForm from './sections/ContactForm.vue'

const props = defineProps(['section'])

const componentMap = {
  'hero-banner': HeroBanner,
  'feature-grid': FeatureGrid,
  'contact-form': ContactForm,
}

const ResolvedComponent = componentMap[props.section.expand.schema_id.slug]
</script>

<template>
  <component :is="ResolvedComponent" :data="section.data" />
</template>
```

---

## 4. Local Development vs. Production Deployment

Managing your environment correctly ensures your local edits don't break the live site.

### A. Local Development (Docker)
In your `.env` file, point to your local PocketBase instance:
```env
# Local Development
VITE_PB_URL=http://localhost:8090
VITE_PROJECT_ID=local-test-id
```
> [!TIP]
> Use the `docker-compose.yml` provided in `/infra` to spin up a local instance of PocketBase and the Dashboard instantly.

### B. Production Deployment
When deploying to Vercel, Netlify, or AWS:
1.  Set your production environment variables to point to your live PocketBase URL.
2.  **API Keys**: Use a dedicated "Production" API key with **Read-Only** permissions for the public site.
3.  **Media URLs**: Ensure `VITE_PB_URL` is used as the base for all images fetched via the SDK:
    ```typescript
    // The SDK handles this automatically if initialized correctly:
    const imageUrl = cms.media.getUrl(section.data.image_field);
    ```

---

## 5. Summary Checklist

- [x] **Initialize SDK** with `apiUrl` and `apiKey`.
- [x] **Define Schemas** that match your UI components.
- [x] **Fetch Content** using `getBySlug()`.
- [x] **Render Dynamically** using a mapping object.
- [x] **Preview Mode**: (Optional) Use `preview.init()` to see draft changes live.

> [!IMPORTANT]
> Always ensure your Schema Slugs in the Dashboard **exactly match** the keys in your `componentMap` in the frontend code.
