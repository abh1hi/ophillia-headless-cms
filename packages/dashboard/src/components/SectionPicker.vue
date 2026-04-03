<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'radix-vue'
import {
  Search,
  LayoutGrid,
  FileText,
  Type,
  Image,
  Link,
  Plus,
  X,
  Layers,
} from 'lucide-vue-next'
import type { SectionSchema } from '@/api/schemas'

const props = defineProps<{
  open: boolean
  schemas: SectionSchema[]
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
  (e: 'select', schemaId: string): void
}>()

const search = ref('')

const filteredSchemas = computed(() => {
  if (!search.value) return props.schemas
  const s = search.value.toLowerCase()
  return props.schemas.filter(schema =>
    schema.name.toLowerCase().includes(s) ||
    schema.slug.toLowerCase().includes(s)
  )
})

function handleSelect(id: string) {
  emit('select', id)
  emit('update:open', false)
}

function getIcon(name: string) {
  const n = name.toLowerCase()
  if (n.includes('hero') || n.includes('banner')) return Image
  if (n.includes('text') || n.includes('content')) return Type
  if (n.includes('list') || n.includes('grid')) return LayoutGrid
  if (n.includes('cta')  || n.includes('button')) return Link
  return FileText
}
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-[100] bg-background/80 backdrop-blur-sm" />
      <DialogContent
        class="fixed left-[50%] top-[50%] z-[101] w-full max-w-xl translate-x-[-50%] translate-y-[-50%] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl transition-all"
      >
        <div class="flex flex-col h-[500px]">
          <!-- Header -->
          <div class="p-4 border-b flex items-center justify-between bg-muted/20">
            <div>
              <DialogTitle class="text-sm font-semibold">Add Section</DialogTitle>
              <DialogDescription class="text-xs text-muted-foreground mt-0.5">
                Choose a content structure for your new section
              </DialogDescription>
            </div>
            <button @click="emit('update:open', false)" class="p-1 rounded-md hover:bg-muted transition-colors">
              <X class="h-4 w-4" />
            </button>
          </div>

          <!-- Search -->
          <div class="p-4 border-b flex items-center gap-3">
            <Search class="h-4 w-4 text-muted-foreground shrink-0" />
            <input
              v-model="search"
              placeholder="Search section types..."
              class="flex-1 bg-transparent text-sm outline-none"
              auto-focus
            />
          </div>

          <!-- Grid -->
          <div class="flex-1 overflow-y-auto p-4">
            <div v-if="filteredSchemas.length === 0" class="flex flex-col items-center justify-center h-full text-muted-foreground gap-2">
              <Layers class="h-8 w-8 opacity-20" />
              <p class="text-sm">No sections found</p>
            </div>
            <div v-else class="grid grid-cols-2 gap-3">
              <button
                v-for="schema in filteredSchemas"
                :key="schema.id"
                @click="handleSelect(schema.id)"
                class="group text-left p-4 rounded-xl border bg-card hover:border-primary hover:ring-1 hover:ring-primary/20 transition-all space-y-3"
              >
                <div class="h-10 w-10 rounded-lg bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <component :is="getIcon(schema.name)" class="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                </div>
                <div>
                  <p class="text-sm font-semibold">{{ schema.name }}</p>
                  <p class="text-[11px] text-muted-foreground mt-0.5 line-clamp-1 italic">{{ schema.slug }}</p>
                </div>
              </button>
            </div>
          </div>

          <!-- Footer -->
          <div class="p-4 border-t bg-muted/10 text-[11px] text-muted-foreground flex items-center gap-2">
             <Plus class="h-3 w-3" />
             Define more structures in the <router-link :to="{ name: 'schemas' }" class="text-primary hover:underline" @click="emit('update:open', false)">Schemas</router-link> tab.
          </div>
        </div>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
