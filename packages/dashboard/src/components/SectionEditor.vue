<script setup lang="ts">
import { computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Grip, Trash2, Plus, ChevronUp, ChevronDown } from 'lucide-vue-next'
import type { Section } from '@/api/sections'
import type { SectionSchema } from '@/api/schemas'

const props = defineProps<{
  sections: Section[]
  schemas: SectionSchema[]
}>()

const emit = defineEmits<{
  (e: 'add', schemaId: string): void
  (e: 'remove', sectionId: string): void
  (e: 'move', sectionId: string, direction: 'up' | 'down'): void
  (e: 'select', section: Section): void
}>()

const selectedId = defineModel<string | null>('selected', { default: null })

function schemaName(schemaId: string): string {
  return props.schemas.find(s => s.id === schemaId)?.name ?? schemaId
}

const availableSchemas = computed(() =>
  props.schemas.filter(s => s.status === 'active')
)
</script>

<template>
  <div class="space-y-2">
    <!-- Section list -->
    <div
      v-for="(section, index) in sections"
      :key="section.id"
      class="flex items-center gap-2 rounded-lg border p-3 cursor-pointer transition-colors"
      :class="selectedId === section.id ? 'border-primary bg-primary/5' : 'hover:bg-muted/50'"
      @click="emit('select', section); selectedId = section.id"
    >
      <Grip class="h-4 w-4 text-muted-foreground shrink-0 cursor-grab" />

      <div class="flex-1 min-w-0">
        <p class="text-sm font-medium truncate">{{ schemaName(section.schema_id) }}</p>
        <p class="text-xs text-muted-foreground">Order {{ index + 1 }}</p>
      </div>

      <Badge :variant="section.status === 'published' ? 'default' : 'secondary'" class="text-xs">
        {{ section.status }}
      </Badge>

      <!-- Reorder controls -->
      <div class="flex flex-col gap-0.5">
        <Button
          variant="ghost" size="icon"
          class="h-5 w-5"
          :disabled="index === 0"
          @click.stop="emit('move', section.id, 'up')"
        >
          <ChevronUp class="h-3 w-3" />
        </Button>
        <Button
          variant="ghost" size="icon"
          class="h-5 w-5"
          :disabled="index === sections.length - 1"
          @click.stop="emit('move', section.id, 'down')"
        >
          <ChevronDown class="h-3 w-3" />
        </Button>
      </div>

      <Button
        variant="ghost" size="icon" class="h-7 w-7 text-destructive hover:text-destructive"
        @click.stop="emit('remove', section.id)"
      >
        <Trash2 class="h-3.5 w-3.5" />
      </Button>
    </div>

    <p v-if="!sections.length" class="text-sm text-muted-foreground text-center py-6 border rounded-lg border-dashed">
      No sections yet. Add one below.
    </p>

    <!-- Add section -->
    <div class="flex gap-2 pt-2">
      <select
        class="flex-1 h-9 rounded-md border bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
        @change="emit('add', ($event.target as HTMLSelectElement).value); ($event.target as HTMLSelectElement).value = ''"
      >
        <option value="" disabled selected>Add section…</option>
        <option v-for="s in availableSchemas" :key="s.id" :value="s.id">{{ s.name }}</option>
      </select>
    </div>
  </div>
</template>
