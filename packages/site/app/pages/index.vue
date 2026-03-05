<script setup lang="ts">
const { data, pending, error } = await useOphilliaPage('home')

useHead({
  title: () => data.value?.page?.title ?? 'Home',
  meta: [
    { name: 'description', content: () => (data.value?.page?.meta?.description as string) ?? '' },
  ],
})
</script>

<template>
  <main>
    <!-- Loading -->
    <div v-if="pending" class="state-box">Loading…</div>

    <!-- Error fetching -->
    <div v-else-if="error" class="state-box error">
      Failed to connect to the CMS. Make sure PocketBase is running.
    </div>

    <!-- No home page configured -->
    <div v-else-if="!data" class="state-box muted">
      No published "home" page found in this project.<br>
      Create a page with slug <code>home</code> and status <code>published</code> in the CMS.
    </div>

    <!-- Page content -->
    <template v-else>
      <SectionRenderer
        v-for="section in data.sections"
        :key="section.id"
        :section="section"
        :schema="section.expand?.schema_id"
      />
      <div v-if="data.sections.length === 0" class="state-box muted">
        Page exists but has no published sections yet.
      </div>
    </template>
  </main>
</template>

<style scoped>
.state-box {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  min-height: 60vh;
  font-family: sans-serif;
  font-size: 1rem;
  color: #6b7280;
  text-align: center;
  padding: 2rem;
}
.state-box.error { color: #dc2626; }
.state-box.muted code {
  background: #f3f4f6;
  border-radius: 4px;
  padding: 0.1rem 0.4rem;
  font-size: 0.875rem;
}
</style>
