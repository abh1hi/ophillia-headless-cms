<script setup lang="ts">
import { DialogTitle, type DialogTitleProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogTitleProps & { class?: HTMLAttributes['class'] }>()
const delegated = computed(() => { const { class: _, ...rest } = props; return rest })
const forwardedProps = useForwardProps(delegated)
</script>

<template>
  <DialogTitle v-bind="forwardedProps" :class="cn('text-lg font-semibold text-foreground', props.class)">
    <slot />
  </DialogTitle>
</template>
