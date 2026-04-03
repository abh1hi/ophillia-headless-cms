<script setup lang="ts">
import { ref, computed } from 'vue'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Grip, Trash2, ChevronUp, ChevronDown, Send, Layers, Plus,
  LayoutGrid, FileText, Type, Image, Link, Check, MousePointer2
} from 'lucide-vue-next'
import type { Section } from '@/api/sections'
import type { SectionSchema } from '@/api/schemas'
import SectionPicker from './SectionPicker.vue'

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
const showPicker = ref(false)

function schemaName(schemaId: string): string {
  return props.schemas.find(s => s.id === schemaId)?.name ?? schemaId
}

function getIcon(schemaId: string) {
  const name = schemaName(schemaId).toLowerCase()
  if (name.includes('hero') || name.includes('banner')) return Image
  if (name.includes('text') || name.includes('content')) return Type
  if (name.includes('list') || name.includes('grid')) return LayoutGrid
  if (name.includes('cta')  || name.includes('button')) return Link
  return FileText
}

const availableSchemas = computed(() =>
  props.schemas.filter(s => s.status === 'active')
)
</script>

<template>
  <div class="space-y-4">
    <!-- Quick Add Header -->
    <div class="flex items-center justify-between">
      <p class="text-[10px] font-bold text-muted-foreground uppercase tracking-[0.1em]">
        Page Outline
      </p>
      <Button
        variant="ghost"
        size="icon"
        class="h-6 w-6 rounded-md hover:bg-primary/10 hover:text-primary transition-colors"
        @click="showPicker = true"
      >
        <Plus class="h-3.5 w-3.5" />
      </Button>
    </div>

    <!-- Section cards -->
    <div class="space-y-2">
      <div
        v-for="(section, index) in sections"
        :key="section.id"
        class="group relative rounded-xl border bg-card/40 transition-all duration-200"
        :class="selectedId?.id === section.id
          ? 'border-primary ring-[3px] ring-primary/10 bg-card shadow-sm z-10'
          : 'hover:border-border/80 hover:bg-card/60'"
        @click="emit('select', section); selectedId = section"
      >
        <!-- Status Indicator Dot -->
        <div
          class="absolute top-2 right-2 h-1.5 w-1.5 rounded-full z-20"
          :class="section.status === 'published' ? 'bg-emerald-500 shadow-[0_0_5px_rgba(16,185,129,0.5)]' : 'bg-amber-400'"
          :title="section.status === 'published' ? 'Live' : 'Draft'"
        />

        <div class="p-3 flex items-start gap-3">
          <!-- Icon + Handle Container -->
          <div class="flex flex-col items-center gap-2 mt-0.5">
            <div class="h-7 w-7 rounded-lg bg-muted flex items-center justify-center transition-colors group-hover:bg-muted/80">
              <component :is="getIcon(section.schema_id)" class="h-3.5 w-3.5 text-muted-foreground" />
            </div>
            <Grip class="h-3 w-3 text-muted-foreground/30 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing" />
          </div>

          <!-- Content -->
          <div class="flex-1 min-w-0 pr-6">
            <p class="text-xs font-semibold truncate leading-none pt-1">
              {{ schemaName(section.schema_id) }}
            </p>
            <div class="flex items-center gap-1.5 mt-1.5">
               <span class="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-tighter">
                 #{{ String(index + 1).padStart(2, '0') }}
               </span>
               <span v-if="section.status === 'published'" class="text-[9px] font-bold text-emerald-600/70 border border-emerald-500/20 px-1 rounded bg-emerald-500/5">
                 LIVE
               </span>
               <span v-else class="text-[9px] font-bold text-amber-600/70 border border-amber-500/20 px-1 rounded bg-amber-500/5">
                 DRAFT
               </span>
            </div>
          </div>

          <!-- Floating Quick Actions (Visible on hover or Selection) -->
          <div
            class="flex items-center gap-0.5 transition-all duration-200"
            :class="selectedId?.id === section.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'"
            @click.stop
          >
            <!-- Reorder -->
            <div class="flex flex-col gap-0.5 mr-1">
              <button
                class="p-0.5 rounded text-muted-foreground hover:bg-muted disabled:opacity-20 transition-colors"
                :disabled="index === 0"
                @click="emit('move', section.id, 'up')"
              >
                <ChevronUp class="h-3 w-3" />
              </button>
              <button
                class="p-0.5 rounded text-muted-foreground hover:bg-muted disabled:opacity-20 transition-colors"
                :disabled="index === sections.length - 1"
                @click="emit('move', section.id, 'down')"
              >
                <ChevronDown class="h-3 w-3" />
              </button>
            </div>

            <!-- Publish/Delete -->
            <Button
              v-if="section.status === 'draft'"
              variant="ghost"
              size="icon"
              class="h-6 w-6 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              @click="emit('update:status', section.id, 'published')"
            >
              <Send class="h-3 w-3" />
            </Button>
            <Button
              variant="ghost" size="icon"
              class="h-6 w-6 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
              @click="emit('remove', section.id)"
            >
              <Trash2 class="h-3 w-3" />
            </Button>
          </div>
        </div>
      </div>
    </div>

    <!-- Empty state -->
    <div
      v-if="!sections.length"
      class="flex flex-col items-center gap-3 py-10 border-2 border-dashed rounded-2xl bg-muted/5 transition-colors hover:bg-muted/10 cursor-pointer"
      @click="showPicker = true"
    >
      <div class="h-10 w-10 rounded-full bg-muted flex items-center justify-center">
        <Layers class="h-5 w-5 text-muted-foreground/50" />
      </div>
      <div class="text-center">
        <p class="text-xs font-semibold">Build your layout</p>
        <p class="text-[10px] text-muted-foreground mt-0.5">Click to add your first section</p>
      </div>
    </div>

    <!-- Massive Add Button -->
    <Button
       v-if="sections.length > 0"
       variant="outline"
       class="w-full h-10 border-dashed rounded-xl gap-2 text-xs font-medium hover:bg-primary/5 hover:border-primary/30 transition-all border-2"
       @click="showPicker = true"
    >
      <Plus class="h-3.5 w-3.5" />
      Add Section
    </Button>

    <!-- Section Picker Dialog -->
    <SectionPicker
      v-model:open="showPicker"
      :schemas="availableSchemas"
      @select="emit('add', $event)"
    />

  </div>
</template>
