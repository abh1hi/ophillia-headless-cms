<template>
  <div class="bg-brand-bg text-brand-textDark min-h-screen flex flex-col">
    <AppHeader />
    <main class="flex-grow">
      <NuxtPage />
    </main>
    <AppFooter />
  </div>
</template>

<style>
/* Page transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.4s ease, transform 0.4s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
  transform: translateY(10px);
}
</style>
