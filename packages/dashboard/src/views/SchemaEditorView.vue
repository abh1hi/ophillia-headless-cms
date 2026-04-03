<script setup lang="ts">
import { ref, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { schemasApi } from '@/api/schemas'
import type { FieldSchema } from '@/api/schemas'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import { 
  DropdownMenu, 
  DropdownMenuTrigger, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuSeparator,
  DropdownMenuLabel 
} from '@/components/ui/dropdown-menu'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Loader2, Plus, Trash2, ArrowLeft, Save, Layers, ChevronDown, Image, Type, Hash, Link, Code, Settings, FileText, Braces, FileCode } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId as string
const schemaId = route.params.schemaId as string | undefined

const loading = ref(!!schemaId)
const isSaving = ref(false)

const FIELD_TYPES = ['text', 'richtext', 'number', 'boolean', 'image', 'url', 'select', 'json', 'markdown', 'html', 'yaml'] as const

const PRESETS = [
  {
    name: 'Visual Block',
    icon: Image,
    fields: [
      { name: 'image_url', type: 'image', required: true },
      { name: 'image_alt', type: 'text', required: false }
    ]
  },
  {
    name: 'Action CTA',
    icon: Link,
    fields: [
      { name: 'cta_label', type: 'text', required: true },
      { name: 'cta_link', type: 'url', required: true }
    ]
  },
  {
    name: 'Content Block',
    icon: Type,
    fields: [
      { name: 'title', type: 'text', required: true },
      { name: 'subtitle', type: 'text', required: false },
      { name: 'body', type: 'richtext', required: true }
    ]
  }
]

const form = reactive({
  name: '',
  slug: '',
  status: 'active' as 'active' | 'deprecated',
  fields_schema: [] as FieldSchema[],
})

onMounted(async () => {
  if (schemaId) {
    try {
      const schema = await schemasApi.get(schemaId)
      form.name = schema.name
      form.slug = schema.slug
      form.status = schema.status
      form.fields_schema = JSON.parse(JSON.stringify(schema.fields_schema || []))
    } catch (err) {
      console.error('Failed to load schema', err)
      router.push({ name: 'schemas', params: { projectId } })
    } finally {
      loading.value = false
    }
  }
})

function toSlug(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

function onNameInput() {
  if (!schemaId) {
    form.slug = toSlug(form.name)
  }
}

function addField(type: typeof FIELD_TYPES[number] = 'text') {
  form.fields_schema.push({ name: '', type, required: false })
}

function addPreset(preset: typeof PRESETS[number]) {
  preset.fields.forEach(f => {
    form.fields_schema.push({ ...f })
  })
}

function removeField(index: number) {
  form.fields_schema.splice(index, 1)
}

async function handleSave() {
  isSaving.value = true
  const payload = {
    project_id: projectId,
    name: form.name,
    slug: form.slug,
    status: form.status,
    version: 1,
    fields_schema: form.fields_schema,
  }

  try {
    if (schemaId) {
      await schemasApi.update(schemaId, payload)
    } else {
      await schemasApi.create(payload)
    }
    router.push({ name: 'schemas', params: { projectId } })
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    isSaving.value = false
  }
}

function handleBack() {
  router.push({ name: 'schemas', params: { projectId } })
}
</script>

<template>
  <div class="p-6 md:p-8 space-y-8 max-w-4xl mx-auto">
    <!-- Header -->
    <div class="flex items-center justify-between">
      <div class="flex items-center gap-4">
        <Button variant="outline" size="icon" @click="handleBack" class="h-9 w-9 rounded-full">
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <div>
          <h1 class="text-3xl font-bold tracking-tight text-foreground">
            {{ schemaId ? 'Edit Schema' : 'New Schema' }}
          </h1>
          <p class="text-sm text-muted-foreground mt-1">
            {{ schemaId ? 'Update your content structure template.' : 'Define a new structural template for content sections.' }}
          </p>
        </div>
      </div>
      <div class="flex items-center gap-3">
        <Button variant="outline" @click="handleBack" :disabled="isSaving">Cancel</Button>
        <Button @click="handleSave" :disabled="isSaving">
          <Loader2 v-if="isSaving" class="mr-2 h-4 w-4 animate-spin" />
          <Save v-else class="mr-2 h-4 w-4" />
          {{ isSaving ? 'Saving...' : 'Save Schema' }}
        </Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-20">
      <Loader2 class="h-8 w-8 animate-spin text-muted-foreground" />
    </div>

    <div v-else class="space-y-6">
      <!-- Basic Info Card -->
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>Primary identification for the schema.</CardDescription>
        </CardHeader>
        <CardContent class="grid grid-cols-2 gap-6">
          <div class="space-y-1.5">
            <Label for="name">Name</Label>
            <Input id="name" v-model="form.name" placeholder="Hero Banner" @input="onNameInput" />
          </div>
          <div class="space-y-1.5">
            <Label for="slug">Slug</Label>
            <Input id="slug" v-model="form.slug" placeholder="hero-banner" class="font-mono" :disabled="!!schemaId" />
          </div>
          <div class="space-y-1.5 col-span-2">
            <Label for="status">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger id="status"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="deprecated">Deprecated</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <!-- Fields Configuration Card -->
      <Card>
        <CardHeader class="flex flex-row items-center justify-between pb-2">
          <div>
            <CardTitle>Fields Configuration</CardTitle>
            <CardDescription>Define the data structure for this schema.</CardDescription>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger as-child>
              <Button variant="secondary" size="sm">
                <Plus class="h-3.5 w-3.5 mr-1.5" />Add Field
                <ChevronDown class="ml-2 h-3 w-3 opacity-50" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" class="w-48">
              <DropdownMenuLabel>Individual Types</DropdownMenuLabel>
              <DropdownMenuItem v-for="t in FIELD_TYPES" :key="t" @click="addField(t)" class="capitalize">
                <!-- Text/Content -->
                <template v-if="['text', 'richtext', 'markdown'].includes(t)">
                  <Type v-if="t !== 'markdown'" class="mr-2 h-4 w-4 text-blue-500" />
                  <FileText v-else class="mr-2 h-4 w-4 text-emerald-500" />
                </template>
                <!-- Code/Data -->
                <template v-else-if="['json', 'html', 'yaml'].includes(t)">
                  <Code v-if="t === 'json'" class="mr-2 h-4 w-4 text-purple-500" />
                  <FileCode v-else-if="t === 'html'" class="mr-2 h-4 w-4 text-orange-500" />
                  <Braces v-else class="mr-2 h-4 w-4 text-indigo-500" />
                </template>
                <!-- Media/Inputs -->
                <template v-else>
                  <Image v-if="t === 'image'" class="mr-2 h-4 w-4 text-emerald-500" />
                  <Hash v-else-if="t === 'number'" class="mr-2 h-4 w-4 text-orange-500" />
                  <Link v-else-if="t === 'url'" class="mr-2 h-4 w-4 text-indigo-500" />
                  <Settings v-else class="mr-2 h-4 w-4 text-slate-500" />
                </template>
                {{ t }}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuLabel>Smart Presets</DropdownMenuLabel>
              <DropdownMenuItem v-for="p in PRESETS" :key="p.name" @click="addPreset(p)">
                <component :is="p.icon" class="mr-2 h-4 w-4 text-primary" />
                {{ p.name }}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardHeader>
        <CardContent class="space-y-4 pt-4">
          <div 
            v-for="(field, i) in form.fields_schema" 
            :key="i" 
            class="flex gap-4 items-end p-4 rounded-xl border bg-muted/30 group relative transition-all hover:border-primary/20"
          >
            <div class="flex-1 space-y-1.5">
              <Label class="text-xs font-semibold text-muted-foreground">Name</Label>
              <Input v-model="field.name" placeholder="field_name" class="font-mono text-sm h-9 bg-background" />
            </div>
            <div class="w-32 space-y-1.5">
              <Label class="text-xs font-semibold text-muted-foreground">Type</Label>
              <Select v-model="field.type">
                <SelectTrigger class="h-9 text-sm bg-background"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem v-for="t in FIELD_TYPES" :key="t" :value="t" class="text-sm">{{ t }}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div class="flex items-center gap-2 pb-2">
              <input type="checkbox" v-model="field.required" :id="`req-${i}`" class="h-4 w-4 rounded border-input ring-offset-background focus-visible:ring-2 focus-visible:ring-ring" />
              <label :for="`req-${i}`" class="text-sm font-medium text-muted-foreground cursor-pointer">Required</label>
            </div>
            <div class="pb-1">
              <Button type="button" variant="ghost" size="icon" class="h-9 w-9 text-destructive hover:bg-destructive/10" @click="removeField(i)">
                <Trash2 class="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div v-if="!form.fields_schema.length" class="text-center py-12 rounded-xl border border-dashed bg-muted/10">
            <Layers class="h-8 w-8 text-muted-foreground opacity-20 mx-auto mb-3" />
            <p class="text-sm text-muted-foreground">No fields defined yet. Click "Add Field" to start building your schema.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  </div>
</template>
