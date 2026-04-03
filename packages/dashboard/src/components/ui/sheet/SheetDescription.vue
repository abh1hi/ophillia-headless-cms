<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<DialogDescriptionProps & { class?: HTMLAttributes['class'] }>()
const delegated = computed(() => { const { class: _, ...rest } = props; return rest })
const forwardedProps = useForwardProps(delegated)
</script>

<template>
  <DialogDescription v-bind="forwardedProps" :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </DialogDescription>
</template>
