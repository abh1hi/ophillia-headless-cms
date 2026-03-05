<script setup lang="ts">
import { ref, watch } from 'vue'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { AlertCircle, CheckCircle2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: Record<string, unknown>
  readonly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, unknown>): void
  (e: 'valid-change', isValid: boolean): void
}>()

const raw = ref(JSON.stringify(props.modelValue, null, 2))
const parseError = ref<string | null>(null)

watch(
  () => props.modelValue,
  (val) => {
    // Only sync if external change (not from user typing)
    try {
      if (JSON.stringify(JSON.parse(raw.value), null, 2) !== JSON.stringify(val, null, 2)) {
        raw.value = JSON.stringify(val, null, 2)
      }
    } catch { /* ignore */ }
  },
  { deep: true }
)

function onInput(e: Event) {
  const text = (e.target as HTMLTextAreaElement).value
  raw.value = text
  try {
    const parsed = JSON.parse(text)
    parseError.value = null
    emit('update:modelValue', parsed)
    emit('valid-change', true)
  } catch (err) {
    parseError.value = (err as Error).message
    emit('valid-change', false)
  }
}
</script>

<template>
  <div class="space-y-2">
    <div class="relative">
      <textarea
        :value="raw"
        @input="onInput"
        :readonly="readonly"
        rows="12"
        class="w-full rounded-md border font-mono text-sm p-3 resize-y focus:outline-none focus:ring-2 focus:ring-ring bg-background"
        :class="parseError ? 'border-destructive' : 'border-input'"
        spellcheck="false"
      />
    </div>

    <Alert v-if="parseError" variant="destructive" class="py-2">
      <AlertCircle class="h-3.5 w-3.5" />
      <AlertDescription class="text-xs">{{ parseError }}</AlertDescription>
    </Alert>

    <div v-else class="flex items-center gap-1.5 text-xs text-green-600">
      <CheckCircle2 class="h-3.5 w-3.5" />
      Valid JSON
    </div>
  </div>
</template>
