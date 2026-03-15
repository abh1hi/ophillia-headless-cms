<script setup lang="ts">
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Grip, Trash2, ChevronUp, ChevronDown, Send, Layers } from 'lucide-vue-next'
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
  (e: 'update:status', sectionId: string, status: 'draft' | 'published'): void
}>()

const selectedId = defineModel<Section | null>('selected', { default: null })
const addSchemaId = ref('')

function schemaName(schemaId: string): string {
  return props.schemas.find(s => s.id === schemaId)?.name ?? schemaId
}

const availableSchemas = computed(() =>
  props.schemas.filter(s => s.status === 'active')
)

function handleAdd() {
  if (!addSchemaId.value) return
  emit('add', addSchemaId.value)
  addSchemaId.value = ''
}
</script>

<template>
  <div class="space-y-2">

    <!-- Section cards -->
    <div
      v-for="(section, index) in sections"
      :key="section.id"
      class="relative rounded-lg border overflow-hidden cursor-pointer transition-all duration-150"
      :class="selectedId?.id === section.id
        ? 'border-primary shadow-sm ring-1 ring-primary/20'
        : 'hover:border-border/80 hover:shadow-sm'"
      @click="emit('select', section); selectedId = section"
    >
      <!-- Status strip left border -->
      <div
        class="absolute inset-y-0 left-0 w-0.5"
        :class="section.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'"
      />

      <div class="pl-3 pr-2 py-2.5 flex items-center gap-2">
        <!-- Drag handle -->
        <Grip class="h-3.5 w-3.5 text-muted-foreground/50 shrink-0 cursor-grab" />

        <!-- Name + status -->
        <div class="flex-1 min-w-0">
          <p class="text-xs font-semibold truncate leading-tight">
            {{ schemaName(section.schema_id) }}
          </p>
          <div class="flex items-center gap-1.5 mt-0.5">
            <span
              class="inline-flex items-center gap-1 text-[10px] font-medium leading-none"
              :class="section.status === 'published' ? 'text-emerald-600 dark:text-emerald-400' : 'text-amber-600 dark:text-amber-400'"
            >
              <span
                class="h-1.5 w-1.5 rounded-full"
                :class="section.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'"
              />
              {{ section.status === 'published' ? 'Published' : 'Draft' }}
            </span>
            <span class="text-[10px] text-muted-foreground">· #{{ index + 1 }}</span>
          </div>
        </div>

        <!-- Publish button (only for drafts) -->
        <Button
          v-if="section.status === 'draft'"
          variant="ghost"
          size="icon"
          class="h-6 w-6 shrink-0 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 dark:hover:bg-emerald-950"
          title="Publish this section"
          @click.stop="emit('update:status', section.id, 'published')"
        >
          <Send class="h-3 w-3" />
        </Button>

        <!-- Reorder -->
        <div class="flex flex-col gap-0.5 shrink-0" @click.stop>
          <Button variant="ghost" size="icon" class="h-4 w-4" :disabled="index === 0"
            @click.stop="emit('move', section.id, 'up')">
            <ChevronUp class="h-3 w-3" />
          </Button>
          <Button variant="ghost" size="icon" class="h-4 w-4" :disabled="index === sections.length - 1"
            @click.stop="emit('move', section.id, 'down')">
            <ChevronDown class="h-3 w-3" />
          </Button>
        </div>

        <!-- Delete -->
        <Button
          variant="ghost" size="icon"
          class="h-6 w-6 shrink-0 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
          title="Delete section"
          @click.stop="emit('remove', section.id)"
        >
          <Trash2 class="h-3 w-3" />
        </Button>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!sections.length"
      class="flex flex-col items-center gap-2 py-8 border-2 border-dashed rounded-lg text-center"
    >
      <Layers class="h-6 w-6 text-muted-foreground/40" />
      <p class="text-xs text-muted-foreground">No sections yet</p>
    </div>

    <!-- Add section -->
    <div class="flex gap-2 pt-1">
      <Select v-model="addSchemaId">
        <SelectTrigger class="flex-1 h-8 text-xs">
          <SelectValue placeholder="Add section…" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem
            v-for="s in availableSchemas"
            :key="s.id"
            :value="s.id"
            class="text-xs"
          >
            {{ s.name }}
          </SelectItem>
        </SelectContent>
      </Select>
      <Button
        size="sm"
        class="h-8 px-3 shrink-0"
        :disabled="!addSchemaId"
        @click="handleAdd"
      >
        Add
      </Button>
    </div>

  </div>
</template>
