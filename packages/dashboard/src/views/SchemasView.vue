<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute } from 'vue-router'
import { schemasApi } from '@/api/schemas'
import type { SectionSchema, FieldSchema } from '@/api/schemas'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogFooter
} from '@/components/ui/dialog'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { Loader2, Plus, Trash2, Pencil } from 'lucide-vue-next'

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

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <p v-if="!schemas.length" class="text-sm text-muted-foreground col-span-full py-8 text-center">
        No schemas defined. Create your first schema.
      </p>
      <Card v-for="schema in schemas" :key="schema.id">
        <CardHeader class="pb-2 flex flex-row items-start justify-between">
          <div>
            <CardTitle class="text-sm">{{ schema.name }}</CardTitle>
            <code class="text-xs text-muted-foreground">{{ schema.slug }}</code>
          </div>
          <div class="flex gap-1">
            <Button variant="ghost" size="icon" class="h-7 w-7" @click="openEdit(schema)">
              <Pencil class="h-3.5 w-3.5" />
            </Button>
          </div>
        </CardHeader>
        <CardContent class="space-y-1.5">
          <Badge :variant="schema.status === 'active' ? 'default' : 'secondary'" class="text-xs">{{ schema.status }}</Badge>
          <div class="flex flex-wrap gap-1 mt-2">
            <Badge v-for="field in schema.fields_schema" :key="field.name" variant="outline" class="text-xs">
              {{ field.name }}: {{ field.type }}
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
