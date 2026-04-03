<script setup lang="ts">
import { ref, computed } from 'vue'
import SectionFormEditor from '@/components/SectionFormEditor.vue'
import RichTextEditor from '@/components/RichTextEditor.vue'
import JsonEditorDrawer from '@/components/JsonEditorDrawer.vue'
import VuePropsEditor from '@/components/VuePropsEditor.vue'
import type { FieldSchema } from '@/components/SectionFormEditor.vue'

// ─── Props ───────────────────────────────────────────────────────────────────

const props = defineProps<{
  modelValue: Record<string, unknown>
  fields: FieldSchema[]
  /** Optional: name of the section for labeling the Monaco drawer */
  sectionName?: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, unknown>): void
}>()

// ─── Mode state persistance ───────────────────────────────────────────────────

const STORAGE_KEY = 'ophillia:editor-mode'

type Mode = 'form' | 'visual' | 'code' | 'props'

const activeMode = ref<Mode>((localStorage.getItem(STORAGE_KEY) as Mode) ?? 'form')

function switchMode(mode: Mode) {
  activeMode.value = mode
  localStorage.setItem(STORAGE_KEY, mode)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

/** Check if there are any richtext fields — show Visual tab only if present */
const hasRichText = computed(() => props.fields.some(f => f.type === 'richtext'))

const MODES = computed(() => [
  {
    id: 'form',
    label: 'Form',
    icon: '📝',
    description: 'Auto-generated form based on schema',
    available: true,
  },
  {
    id: 'visual',
    label: 'Visual',
    icon: '✨',
    description: 'TipTap rich text editor',
    available: hasRichText.value,
  },
  {
    id: 'code',
    label: 'Code',
    icon: '💻',
    description: 'Monaco JSON editor',
    available: true,
  },
  {
    id: 'props',
    label: 'Props',
    icon: '🎨',
    description: 'Visual component props editor',
    available: true,
    soon: false,
  },
])

/** The single richtext field value for the Visual tab */
const richTextField = computed(() => props.fields.find(f => f.type === 'richtext'))
const richTextValue = computed(() =>
  richTextField.value ? (props.modelValue[richTextField.value.name] as string ?? '') : ''
)

function handleRichTextChange(val: string) {
  if (!richTextField.value) return
  emit('update:modelValue', { ...props.modelValue, [richTextField.value.name]: val })
}
</script>

<template>
  <div class="space-y-4">

    <!-- ── Mode Tab Bar ──────────────────────────────────────────────────── -->
    <div class="flex items-center gap-1 p-1 rounded-xl border bg-muted/30 w-fit">
      <button
        v-for="mode in MODES"
        :key="mode.id"
        :disabled="!mode.available"
        :title="mode.soon ? 'Coming in Phase 2' : mode.description"
        @click="switchMode(mode.id as Mode)"
        class="relative flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg transition-all duration-200"
        :class="[
          activeMode === mode.id
            ? 'bg-background shadow-sm text-foreground'
            : mode.available
              ? 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
              : 'text-muted-foreground/40 cursor-not-allowed',
        ]"
      >
        <span>{{ mode.icon }}</span>
        <span>{{ mode.label }}</span>
        <span
          v-if="mode.soon"
          class="absolute -top-1.5 -right-1.5 text-[9px] font-bold bg-primary text-primary-foreground px-1 rounded-full leading-4"
        >
          SOON
        </span>
      </button>
    </div>

    <!-- ── Active Mode Content ───────────────────────────────────────────── -->

    <!-- Form Mode (default) -->
    <template v-if="activeMode === 'form'">
      <SectionFormEditor
        :fields="fields"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </template>

    <!-- Visual Mode (TipTap) — only for richtext fields -->
    <template v-else-if="activeMode === 'visual'">
      <div v-if="richTextField" class="space-y-2">
        <p class="text-xs text-muted-foreground">
          Editing <code class="bg-muted px-1 rounded text-[11px]">{{ richTextField.name }}</code> in visual mode.
          Other fields are saved automatically.
        </p>
        <RichTextEditor
          :model-value="richTextValue"
          @update:model-value="handleRichTextChange"
        />
      </div>
      <p v-else class="text-sm text-muted-foreground italic">
        No richtext fields in this schema.
      </p>
    </template>

    <!-- Code Mode (Monaco) -->
    <template v-else-if="activeMode === 'code'">
      <div class="space-y-2">
        <p class="text-xs text-muted-foreground">
          Edit the complete section data object as JSON.
        </p>
        <JsonEditorDrawer
          :model-value="modelValue"
          :field-name="sectionName ?? 'section.data'"
          @update:model-value="emit('update:modelValue', $event as Record<string, unknown>)"
        />
      </div>
    </template>

    <!-- Props Mode (VuePropsEditor) -->
    <template v-else-if="activeMode === 'props'">
      <VuePropsEditor
        :fields="fields"
        :model-value="modelValue"
        @update:model-value="emit('update:modelValue', $event)"
      />
    </template>

  </div>
</template>
