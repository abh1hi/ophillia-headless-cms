<template>
  <component 
    :is="href ? 'a' : (to ? resolveComponent('NuxtLink') : 'button')"
    :href="href"
    :to="to"
    :class="[
      'inline-flex items-center justify-center font-bold transition-all',
      sizeClasses[size],
      variantClasses[variant],
      customClass
    ]"
    v-bind="$attrs"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  href: { type: String, default: null },
  to: { type: [String, Object], default: null },
  variant: {
    type: String,
    default: 'primary',
    validator: (value) => ['primary', 'outline', 'outline-white'].includes(value)
  },
  size: {
    type: String,
    default: 'md',
    validator: (value) => ['sm', 'md', 'lg'].includes(value)
  },
  customClass: { type: String, default: '' }
});

const sizeClasses = {
  sm: 'px-6 py-2.5 rounded-xl text-sm',
  md: 'px-8 py-4 rounded-xl text-lg',
  lg: 'px-8 py-4 rounded-xl text-lg' // Similar to md in provided design
};

const variantClasses = {
  primary: 'bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 hover:shadow-xl hover:scale-105',
  outline: 'bg-white border-2 border-slate-200 text-slate-900 hover:border-primary',
  'outline-white': 'bg-transparent border-2 border-white/20 text-white hover:bg-white/10'
};
</script>
