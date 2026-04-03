<script setup lang="ts">
import { ref, computed } from 'vue'
import MonacoEditor from './MonacoEditor.vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Maximize2, Minimize2, Check, Copy, Wand2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
  language: 'markdown' | 'html' | 'yaml' | 'css' | 'json'
  label?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const isExpanded = ref(false)
const copied = ref(false)

function handleCopy() {
  navigator.clipboard.writeText(props.modelValue)
  copied.value = true
  setTimeout(() => { copied.value = false }, 2000)
}

const languageLabel = computed(() => {
  switch (props.language) {
    case 'markdown': return 'Markdown'
    case 'html': return 'HTML'
    case 'yaml': return 'YAML'
    default: return props.language.toUpperCase()
  }
})
</script>

<template>
  <div 
    class="flex flex-col border rounded-lg overflow-hidden bg-background transition-all"
    :class="isExpanded ? 'fixed inset-10 z-[100] shadow-2xl' : 'relative w-full'"
  >
    <!-- Header Area -->
    <div class="flex items-center justify-between px-3 py-2 bg-muted/30 border-b shrink-0">
      <div class="flex items-center gap-2">
        <Badge variant="outline" class="text-[10px] font-mono px-1.5 py-0 uppercase opacity-70">
          {{ languageLabel }}
        </Badge>
        <span v-if="label && !isExpanded" class="text-xs font-medium text-muted-foreground truncate max-w-[120px]">
          {{ label }}
        </span>
      </div>

      <div class="flex items-center gap-1">
        <Button variant="ghost" size="icon" class="h-7 w-7 text-muted-foreground" @click="handleCopy">
          <Check v-if="copied" class="h-3.5 w-3.5 text-emerald-500" />
          <Copy v-else class="h-3.5 w-3.5" />
        </Button>
        <Button 
          variant="ghost" 
          size="icon" 
          class="h-7 w-7 text-muted-foreground" 
          @click="isExpanded = !isExpanded"
          :title="isExpanded ? 'Minimize' : 'Expand editor'"
        >
          <Minimize2 v-if="isExpanded" class="h-3.5 w-3.5" />
          <Maximize2 v-else class="h-3.5 w-3.5" />
        </Button>
      </div>
    </div>

    <!-- Editor -->
    <div :class="isExpanded ? 'flex-1' : 'h-[200px]'">
      <MonacoEditor
        :model-value="modelValue"
        :language="language"
        height="100%"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </div>

    <!-- Overlay for Expanded mode -->
    <div v-if="isExpanded" class="fixed inset-0 -z-10 bg-background/80 backdrop-blur-sm" @click="isExpanded = false" />
  </div>
</template>
