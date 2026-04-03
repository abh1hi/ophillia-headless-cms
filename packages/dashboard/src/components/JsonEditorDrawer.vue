<script setup lang="ts">
import { ref, computed } from 'vue'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetFooter } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import MonacoEditor from '@/components/MonacoEditor.vue'
import { Code2, CheckCircle2, AlertCircle, Maximize2 } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string | object | undefined | null
  fieldName: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: object | string): void
}>()

const isOpen = ref(false)

// Serialize incoming value to string for the editor
const editorValue = ref(
  typeof props.modelValue === 'string'
    ? props.modelValue
    : JSON.stringify(props.modelValue ?? {}, null, 2)
)

// JSON validation state
const validationError = ref<string | null>(null)
const isValid = computed(() => validationError.value === null)

function handleEditorChange(raw: string) {
  editorValue.value = raw
  try {
    JSON.parse(raw)
    validationError.value = null
  } catch (e: any) {
    validationError.value = e.message
  }
}

function handleApply() {
  if (!isValid.value) return
  try {
    const parsed = JSON.parse(editorValue.value)
    emit('update:modelValue', parsed)
    isOpen.value = false
  } catch {
    // do nothing, guard already prevents apply
  }
}

function handleDiscard() {
  // Reset editor to the last saved value
  editorValue.value = typeof props.modelValue === 'string'
    ? props.modelValue
    : JSON.stringify(props.modelValue ?? {}, null, 2)
  validationError.value = null
  isOpen.value = false
}

// Pretty-print preview of current committed value
const preview = computed(() => {
  try {
    const val = typeof props.modelValue === 'string'
      ? JSON.parse(props.modelValue)
      : props.modelValue
    const keys = Object.keys(val ?? {})
    if (keys.length === 0) return 'Empty object'
    return keys.slice(0, 3).join(', ') + (keys.length > 3 ? ` +${keys.length - 3} more` : '')
  } catch {
    return 'Invalid JSON'
  }
})
</script>

<template>
  <!-- Compact trigger button shown inline in the form -->
  <div class="flex items-center gap-2">
    <div class="flex-1 flex items-center gap-2 rounded-md border bg-muted/30 px-3 py-2 text-xs text-muted-foreground font-mono min-h-[36px] cursor-default truncate">
      <Code2 class="h-3.5 w-3.5 shrink-0 text-purple-500" />
      <span class="truncate">{{ preview }}</span>
    </div>
    <Button type="button" variant="outline" size="sm" class="shrink-0 gap-1.5" @click="isOpen = true">
      <Maximize2 class="h-3.5 w-3.5" />
      Edit JSON
    </Button>
  </div>

  <!-- Panel / Drawer -->
  <Sheet :open="isOpen" @update:open="(v) => { if (!v) handleDiscard() }">
    <SheetContent side="right" class="w-full sm:max-w-3xl p-0 flex flex-col">
      <SheetHeader class="px-6 pt-6 pb-4 border-b shrink-0">
        <div class="flex items-center gap-3">
          <div class="flex h-8 w-8 items-center justify-center rounded-md bg-purple-500/10">
            <Code2 class="h-4 w-4 text-purple-500" />
          </div>
          <div>
            <SheetTitle>JSON Editor — <code class="text-sm font-mono text-purple-500">{{ fieldName }}</code></SheetTitle>
            <SheetDescription>Edit the JSON value directly with syntax highlighting and validation.</SheetDescription>
          </div>
        </div>

        <!-- Validation badge -->
        <div class="mt-3">
          <Badge
            v-if="isValid"
            class="gap-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-200 dark:border-emerald-900"
          >
            <CheckCircle2 class="h-3 w-3" /> Valid JSON
          </Badge>
          <Badge
            v-else
            class="gap-1.5 bg-destructive/10 text-destructive border-destructive/20 max-w-xs truncate"
            :title="validationError ?? ''"
          >
            <AlertCircle class="h-3 w-3 shrink-0" />
            <span class="truncate">{{ validationError }}</span>
          </Badge>
        </div>
      </SheetHeader>

      <!-- Monaco Editor occupies all remaining space -->
      <div class="flex-1 overflow-hidden px-4 py-4">
        <MonacoEditor
          :model-value="editorValue"
          language="json"
          height="100%"
          @update:model-value="handleEditorChange"
        />
      </div>

      <SheetFooter class="px-6 py-4 border-t shrink-0 bg-muted/30">
        <Button type="button" variant="outline" @click="handleDiscard">Discard Changes</Button>
        <Button type="button" :disabled="!isValid" @click="handleApply">
          <CheckCircle2 class="mr-2 h-4 w-4" />
          Apply Changes
        </Button>
      </SheetFooter>
    </SheetContent>
  </Sheet>
</template>
