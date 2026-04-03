<script setup lang="ts">
import FallBackSection from './FallBackSection.vue'

// Import sections here
import HeroSection from './HeroSection.vue'
import StatsSection from './StatsSection.vue'
import MissionSection from './MissionSection.vue'
import ProgramsSection from './ProgramsSection.vue'
import NewsSection from './NewsSection.vue'
import VolunteerSection from './VolunteerSection.vue'
import AboutHero from './AboutHero.vue'
import HistorySection from './HistorySection.vue'
import PurposeSection from './PurposeSection.vue'
import TeamSection from './TeamSection.vue'
import ComplianceSection from './ComplianceSection.vue'
import ImpactHero from './ImpactHero.vue'
import ImpactStats from './ImpactStats.vue'
import StoriesGrid from './StoriesGrid.vue'
import TestimonialsSection from './TestimonialsSection.vue'
import TransparencySection from './TransparencySection.vue'
import MapSection from './MapSection.vue'
import CTASection from './CTASection.vue'
import MethodologyIntro from './MethodologyIntro.vue'
import SixPillars from './SixPillars.vue'
import StrategyOutcome from './StrategyOutcome.vue'
import PillarDetail from './PillarDetail.vue'
import InfrastructureHero from './InfrastructureHero.vue'
import FacilityGrid from './FacilityGrid.vue'
import InfrastructureDesign from './InfrastructureDesign.vue'
import KindergartenSection from './KindergartenSection.vue'
import GenericStatBanner from './GenericStatBanner.vue'

defineProps<{
  sections: any[]
}>()

const componentMap: Record<string, any> = {
  'hero-section': HeroSection,
  'stats-section': StatsSection,
  'mission-section': MissionSection,
  'programs-section': ProgramsSection,
  'news-section': NewsSection,
  'volunteer-section': VolunteerSection,
  'about-hero': AboutHero,
  'history-section': HistorySection,
  'purpose-section': PurposeSection,
  'team-section': TeamSection,
  'compliance-section': ComplianceSection,
  'impact-hero': ImpactHero,
  'impact-stats': ImpactStats,
  'stories-grid': StoriesGrid,
  'testimonials-section': TestimonialsSection,
  'transparency-section': TransparencySection,
  'map-section': MapSection,
  'cta-section': CTASection,
  'methodology-intro': MethodologyIntro,
  'six-pillars': SixPillars,
  'strategy-outcome': StrategyOutcome,
  'pillar-detail': PillarDetail,
  'infrastructure-hero': InfrastructureHero,
  'facility-grid': FacilityGrid,
  'infrastructure-design': InfrastructureDesign,
  'kindergarten-section': KindergartenSection,
  'generic-stat-banner': GenericStatBanner,
}

const getComponent = (slug: string) => {
  return componentMap[slug] || FallBackSection
}
</script>

<template>
  <div class="sections-wrapper">
    <component
      v-for="section in sections"
      :is="getComponent(section.expand?.schema_id?.slug)"
      :key="section.id"
      :data="section.data"
      :schema="section.expand?.schema_id"
    />
  </div>
</template>
