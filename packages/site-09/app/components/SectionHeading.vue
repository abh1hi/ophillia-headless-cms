<template>
  <div>
    <h2 class="text-primary font-bold tracking-widest uppercase text-sm mb-4">
      {{ subtitle }}
    </h2>
    <h3 :class="['font-extrabold text-slate-900 dark:text-slate-100', titleClass]">
      {{ title }}
    </h3>
    <p v-if="description" class="text-lg text-slate-600 dark:text-slate-400 mt-6">
      {{ description }}
    </p>
  </div>
</template>

<script setup>
defineProps({
  subtitle: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    default: ''
  },
  titleClass: {
    type: String,
    default: 'text-4xl'
  }
});
</script>
