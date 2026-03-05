<script setup lang="ts">
import { type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'
const props = defineProps<{ class?: HTMLAttributes['class'] }>()
</script>
<template>
  <DialogOverlay class="fixed inset-0 z-50 bg-black/80" />
  <div :class="cn('fixed left-[50%] top-[50%] z-50 translate-x-[-50%] translate-y-[-50%] w-full max-w-lg rounded-lg border bg-background p-6 shadow-lg', props.class)">
    <slot />
  </div>
</template>

<script lang="ts">
import { DialogOverlay } from 'radix-vue'
export default { components: { DialogOverlay } }
</script>
