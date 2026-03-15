<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { schemasApi } from '@/api/schemas'
import type { SectionSchema, FieldSchema } from '@/api/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Loader2, Plus, Trash2, Pencil, Layers } from 'lucide-vue-next'

const route = useRoute()
const projectId = route.params.projectId as string

const schemas = ref<SectionSchema[]>([])
const loading = ref(true)
const dialogOpen = ref(false)
const editingId = ref<string | null>(null)

const FIELD_TYPES = ['text', 'richtext', 'number', 'boolean', 'image', 'url', 'select', 'json'] as const

const form = reactive({
  name: '',
  slug: '',
  status: 'active' as 'active' | 'deprecated',
  fields_schema: [] as FieldSchema[],
})

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function onNameInput() {
  if (!editingId.value) {
    form.slug = toSlug(form.name)
  }
}

onMounted(async () => {
  const result = await schemasApi.list(projectId)
  schemas.value = result.items
  loading.value = false
})

function resetForm() {
  form.name = ''
  form.slug = ''
  form.status = 'active'
  form.fields_schema = []
  editingId.value = null
}

function openEdit(schema: SectionSchema) {
  editingId.value = schema.id
  form.name = schema.name
  form.slug = schema.slug
  form.status = schema.status
  form.fields_schema = [...schema.fields_schema]
  dialogOpen.value = true
}

function addField() {
  form.fields_schema.push({ name: '', type: 'text', required: false })
}

function removeField(index: number) {
  form.fields_schema.splice(index, 1)
}

async function saveSchema() {
  const payload = {
    project_id: projectId,
    name: form.name,
    slug: form.slug,
    status: form.status,
    version: 1,
    fields_schema: form.fields_schema,
  }
  if (editingId.value) {
    const updated = await schemasApi.update(editingId.value, payload)
    const idx = schemas.value.findIndex(s => s.id === editingId.value)
    if (idx !== -1) schemas.value[idx] = updated
  } else {
    const created = await schemasApi.create(payload)
    schemas.value.unshift(created)
  }
  dialogOpen.value = false
  resetForm()
}
</script>

<template>
  <div class="p-6 space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Schemas</h1>
        <p class="text-sm text-muted-foreground">Define content section types for this project</p>
      </div>
      <Dialog v-model:open="dialogOpen" @update:open="!$event && resetForm()">
        <DialogTrigger as-child>
          <Button><Plus class="h-4 w-4 mr-2" />New Schema</Button>
        </DialogTrigger>
        <DialogContent class="max-w-lg">
          <DialogHeader>
            <DialogTitle>{{ editingId ? 'Edit Schema' : 'New Schema' }}</DialogTitle>
          </DialogHeader>
          <div class="space-y-4">
            <div class="grid grid-cols-2 gap-3">
              <div class="space-y-1.5">
                <Label>Name</Label>
                <Input v-model="form.name" placeholder="Hero Banner" @input="onNameInput" />
              </div>
              <div class="space-y-1.5">
                <Label>Slug</Label>
                <Input v-model="form.slug" placeholder="hero-banner" class="font-mono text-sm" />
              </div>
            </div>
            <div class="space-y-1.5">
              <Label>Status</Label>
              <Select v-model="form.status">
                <SelectTrigger><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="deprecated">Deprecated</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div class="space-y-2">
              <div class="flex items-center justify-between">
                <Label>Fields</Label>
                <Button variant="outline" size="sm" @click="addField">
                  <Plus class="h-3.5 w-3.5 mr-1" />Add Field
                </Button>
              </div>
              <div v-for="(field, i) in form.fields_schema" :key="i" class="flex gap-2 items-end">
                <div class="flex-1 space-y-1">
                  <Label class="text-xs">Name</Label>
                  <Input v-model="field.name" placeholder="field_name" class="font-mono text-xs h-8" />
                </div>
                <div class="w-28 space-y-1">
                  <Label class="text-xs">Type</Label>
                  <Select v-model="field.type">
                    <SelectTrigger class="h-8 text-xs"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem v-for="t in FIELD_TYPES" :key="t" :value="t" class="text-xs">{{ t }}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div class="flex items-center gap-1 pb-0.5">
                  <input type="checkbox" v-model="field.required" :id="`req-${i}`" class="h-3.5 w-3.5" />
                  <label :for="`req-${i}`" class="text-xs text-muted-foreground">Req</label>
                </div>
                <Button variant="ghost" size="icon" class="h-8 w-8 text-destructive" @click="removeField(i)">
                  <Trash2 class="h-3.5 w-3.5" />
                </Button>
              </div>
              <p v-if="!form.fields_schema.length" class="text-xs text-muted-foreground">No fields defined yet.</p>
            </div>
          </div>
          <DialogFooter>
            <Button @click="saveSchema">Save Schema</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else>
      <!-- Empty state -->
      <div
        v-if="!schemas.length"
        class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl"
      >
        <div class="rounded-full bg-muted p-4 mb-4">
          <Layers class="h-8 w-8 text-muted-foreground opacity-40" />
        </div>
        <h3 class="text-sm font-semibold mb-1">No schemas yet</h3>
        <p class="text-sm text-muted-foreground mb-5 max-w-xs">
          Create your first schema to define the structure of content sections.
        </p>
        <Button size="sm" @click="dialogOpen = true">
          <Plus class="h-3.5 w-3.5 mr-1.5" />New Schema
        </Button>
      </div>

      <!-- Schema card grid -->
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <article
          v-for="schema in schemas"
          :key="schema.id"
          class="relative flex flex-col gap-3 rounded-xl border bg-card p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all duration-200 overflow-hidden"
        >
          <!-- Status strip -->
          <div
            class="absolute inset-y-0 left-0 w-1"
            :class="schema.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-400'"
          />

          <div class="pl-3 flex flex-col gap-3 flex-1">
            <!-- Top row: name + edit button -->
            <div class="flex items-start justify-between gap-2">
              <div class="min-w-0">
                <h2 class="font-semibold text-sm leading-snug truncate" :title="schema.name">
                  {{ schema.name }}
                </h2>
                <code class="text-xs text-muted-foreground mt-0.5 block truncate">{{ schema.slug }}</code>
              </div>
              <Button
                variant="ghost"
                size="icon"
                class="h-7 w-7 shrink-0 text-muted-foreground hover:text-foreground"
                @click="openEdit(schema)"
              >
                <Pencil class="h-3.5 w-3.5" />
              </Button>
            </div>

            <!-- Status badge -->
            <Badge
              class="w-fit capitalize text-[11px] px-2 py-0 border"
              :class="schema.status === 'active'
                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-zinc-500/10 text-zinc-600 border-zinc-300 dark:text-zinc-400 dark:border-zinc-700'"
            >
              {{ schema.status }}
            </Badge>

            <!-- Divider -->
            <div class="border-t" />

            <!-- Fields -->
            <div>
              <p class="text-[10px] uppercase tracking-wide font-semibold text-muted-foreground mb-1.5">Fields</p>
              <div v-if="schema.fields_schema?.length" class="flex flex-wrap gap-1">
                <Badge
                  v-for="field in schema.fields_schema"
                  :key="field.name"
                  variant="outline"
                  class="text-[10px] px-1.5 py-0 font-mono"
                >
                  {{ field.name }}<span class="text-muted-foreground ml-1">{{ field.type }}</span>
                </Badge>
              </div>
              <p v-else class="text-xs text-muted-foreground">No fields defined</p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>
