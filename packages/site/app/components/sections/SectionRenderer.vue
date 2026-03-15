<script setup lang="ts">
// components/sections/SectionRenderer.vue
// Uses direct static imports — bypasses auto-import name resolution entirely.

import type { PBSection } from '~/composables/useOphilliaPage'
import HeroBanner from './HeroBanner.vue'
import RichTextBlock from './RichTextBlock.vue'
import FallbackSection from './FallbackSection.vue'
import AvsHero from './AvsHero.vue'
import AvsStats from './AvsStats.vue'
import AvsAbout from './AvsAbout.vue'
import AvsPrograms from './AvsPrograms.vue'
import AvsDonate from './AvsDonate.vue'
import AvsFooter from './AvsFooter.vue'

interface Schema {
    slug: string
    name: string
    fields_schema: unknown[]
}

const props = defineProps<{
    section: PBSection
    schema?: Schema
}>()

// Map schema slugs to imported component definitions
const componentMap: Record<string, unknown> = {
    'hero-banner': HeroBanner,
    'rich-text-block': RichTextBlock,
    'avs-hero': AvsHero,
    'avs-stats': AvsStats,
    'avs-about': AvsAbout,
    'avs-programs': AvsPrograms,
    'avs-donate': AvsDonate,
    'avs-footer': AvsFooter,
}

const resolvedComponent = computed(() =>
    props.schema?.slug && componentMap[props.schema.slug]
        ? componentMap[props.schema.slug]
        : FallbackSection
)
</script>

<template>
    <component
        :is="resolvedComponent"
        :data="section.data"
        :schema="schema"
        :section-id="section.id"
    />
</template>
