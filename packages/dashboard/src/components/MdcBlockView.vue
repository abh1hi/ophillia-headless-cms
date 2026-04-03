<script setup lang="ts">
import { ref, computed } from 'vue'
import { NodeViewWrapper } from '@tiptap/vue-3'
import { Puzzle, Pencil, Trash2, Check, X } from 'lucide-vue-next'

// TipTap NodeView standard props
const props = defineProps<{
  node: { attrs: { component: string; props: string } }
  updateAttributes: (attrs: Record<string, unknown>) => void
  deleteNode: () => void
  selected: boolean
}>()

// ─── Edit Popover State ───────────────────────────────────────────────────────
const editing = ref(false)
const draftComponent = ref('')
const draftProps = ref('')

function openEdit() {
  draftComponent.value = props.node.attrs.component
  draftProps.value = props.node.attrs.props
  editing.value = true
}

function applyEdit() {
  props.updateAttributes({
    component: draftComponent.value.trim() || 'MyComponent',
    props: draftProps.value.trim(),
  })
  editing.value = false
}

function cancelEdit() {
  editing.value = false
}

// ─── Pretty display ───────────────────────────────────────────────────────────
const displayText = computed(() => {
  const name = props.node.attrs.component
  const p = props.node.attrs.props
  return p ? `:::${name}{${p}}:::` : `:::${name}:::`
})

const previewText = computed(() => {
  const name = draftComponent.value || 'MyComponent'
  const p = draftProps.value
  return p ? `:::${name}{${p}}:::` : `:::${name}:::`
})
</script>

<template>
  <NodeViewWrapper
    class="mdc-node-wrapper my-2 inline-block w-full"
    :data-drag-handle="''"
  >
    <!-- The chip pill -->
    <div
      class="group relative flex items-center gap-2.5 rounded-lg border px-3 py-2 transition-colors cursor-pointer select-none"
      :class="selected
        ? 'border-primary bg-primary/5 ring-2 ring-primary/20'
        : 'border-border bg-muted/30 hover:border-primary/50 hover:bg-muted/50'"
      @dblclick="openEdit"
    >
      <!-- Icon -->
      <div class="h-6 w-6 rounded-md bg-violet-500/10 flex items-center justify-center shrink-0">
        <Puzzle class="h-3.5 w-3.5 text-violet-500" />
      </div>

      <!-- Component text -->
      <code class="text-xs font-mono text-violet-600 dark:text-violet-400 flex-1 truncate">
        {{ displayText }}
      </code>

      <!-- Action buttons (show on hover) -->
      <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          type="button"
          class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          title="Edit component"
          @click.stop="openEdit"
        >
          <Pencil class="h-3 w-3" />
        </button>
        <button
          type="button"
          class="h-6 w-6 rounded flex items-center justify-center text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          title="Delete block"
          @click.stop="deleteNode()"
        >
          <Trash2 class="h-3 w-3" />
        </button>
      </div>
    </div>

    <!-- Edit Popover -->
    <Transition
      enter-from-class="opacity-0 translate-y-1"
      enter-to-class="opacity-100 translate-y-0"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 translate-y-1"
      enter-active-class="transition duration-150"
      leave-active-class="transition duration-100"
    >
      <div
        v-if="editing"
        class="absolute z-50 mt-1 w-80 rounded-xl border bg-popover shadow-xl p-4 space-y-3"
      >
        <p class="text-xs font-semibold text-muted-foreground uppercase tracking-widest flex items-center gap-1.5">
          <Puzzle class="h-3 w-3 text-violet-500" />
          MDC Component Block
        </p>

        <div class="space-y-1.5">
          <label class="text-xs text-muted-foreground">Component Name</label>
          <input
            v-model="draftComponent"
            class="w-full h-8 px-3 text-sm font-mono rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder="HeroBanner"
            @keyup.enter="applyEdit"
            @keyup.escape="cancelEdit"
          />
        </div>

        <div class="space-y-1.5">
          <label class="text-xs text-muted-foreground">
            Props <span class="opacity-60">(key="value" format)</span>
          </label>
          <input
            v-model="draftProps"
            class="w-full h-8 px-3 text-sm font-mono rounded-md border bg-background focus:outline-none focus:ring-2 focus:ring-ring"
            placeholder='title="Hello" variant="primary"'
            @keyup.enter="applyEdit"
            @keyup.escape="cancelEdit"
          />
        </div>

        <!-- Preview -->
        <div class="text-[11px] font-mono text-muted-foreground bg-muted/50 rounded-md px-2 py-1.5 border truncate">
          {{ previewText }}
        </div>

        <div class="flex justify-end gap-2">
          <button
            type="button"
            class="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md border hover:bg-muted transition-colors"
            @click="cancelEdit"
          >
            <X class="h-3 w-3" />Cancel
          </button>
          <button
            type="button"
            class="flex items-center gap-1 text-xs px-3 py-1.5 rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
            @click="applyEdit"
          >
            <Check class="h-3 w-3" />Apply
          </button>
        </div>
      </div>
    </Transition>
  </NodeViewWrapper>
</template>
