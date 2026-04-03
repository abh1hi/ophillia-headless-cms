<script setup lang="ts">
import { DropdownMenuSeparator, type DropdownMenuSeparatorProps, useForwardProps } from 'radix-vue'
import { computed, type HTMLAttributes } from 'vue'
import { cn } from '@/lib/utils'

const props = defineProps<DropdownMenuSeparatorProps & { class?: HTMLAttributes['class'] }>()

const delegatedProps = computed(() => {
  const { class: _, ...delegated } = props
  return delegated
})

const forwardedProps = useForwardProps(delegatedProps)
</script>

<template>
  <DropdownMenuSeparator v-bind="forwardedProps" :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>
