<script setup lang="ts">
import SectionRenderer from '~/components/sections/SectionRenderer.vue'

const route = useRoute()
const { data: pageData, pending, error } = await useOphilliaPage(route.params.slug)
const { isActive: isPreview } = useOphilliaPreview()

// SEO Metadata
useSeoMeta({
  title: () => pageData.value?.page?.title || 'Loading...',
  description: () => pageData.value?.page?.description || '',
})

const exitPreview = () => {
  const url = new URL(window.location.href)
  url.searchParams.delete('preview')
  window.location.href = url.toString()
}
</script>

<template>
  <main>
    <!-- Preview Bar -->
    <div v-if="isPreview" class="fixed top-0 left-0 right-0 z-[100] bg-primary text-white py-2 px-4 flex justify-between items-center shadow-lg animate-in slide-in-from-top duration-500">
      <div class="flex items-center gap-2 text-sm font-bold">
        <span class="material-symbols-outlined text-sm">visibility</span>
        MODO PREVIEW ACTIVO (Viendo borradores)
      </div>
      <button 
        @click="exitPreview"
        class="bg-white/20 hover:bg-white/30 px-3 py-1 rounded-full text-xs font-bold transition-colors uppercase tracking-wider"
      >
        Salir del modo preview
      </button>
    </div>

    <!-- Loading State -->
    <div v-if="pending" class="min-h-[60vh] flex flex-col items-center justify-center gap-4 bg-brand-bg transition-opacity duration-300">
      <div class="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
      <p class="text-slate-500 font-bold uppercase tracking-widest text-xs animate-pulse">Cargando contenido...</p>
    </div>

    <!-- Error/404 State -->
    <div v-else-if="error || !pageData" class="min-h-[80vh] flex flex-col items-center justify-center text-center px-4 bg-brand-bg">
      <div class="bg-primary/10 p-6 rounded-full mb-8">
         <span class="material-symbols-outlined text-7xl text-primary animate-bounce">error</span>
      </div>
      <h1 class="text-6xl font-black text-slate-900 dark:text-slate-100 mb-6 font-serif">404</h1>
      <p class="text-2xl font-bold text-slate-500 dark:text-slate-400 mb-10 max-w-md mx-auto leading-relaxed">
        Página no encontrada. El contenido que buscas no existe o no ha sido publicado.
      </p>
      <NuxtLink 
        to="/" 
        class="bg-primary text-white px-8 py-4 rounded-full font-black hover:scale-105 transition-transform shadow-xl"
      >
        VOLVER AL INICIO
      </NuxtLink>
    </div>

    <!-- CMS Content -->
    <div v-else :class="{'pt-12': isPreview}">
      <SectionRenderer :sections="pageData.sections" />
    </div>
  </main>
</template>

<style>
.animate-in {
  animation: animate-in 0.5s ease-out;
}
@keyframes animate-in {
  from { opacity: 0; transform: translateY(-100%); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
