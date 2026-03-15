<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import { schemasApi } from '@/api/schemas'
import type { Section } from '@/api/sections'
import type { SectionSchema } from '@/api/schemas'
import { useProjectStore } from '@/stores/project'
import { usePageEditor } from '@/composables/usePageEditor'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue
} from '@/components/ui/select'
import SectionEditor from '@/components/SectionEditor.vue'
import SectionFormEditor from '@/components/SectionFormEditor.vue'
import JsonEditor from '@/components/JsonEditor.vue'
import { Loader2, Save, ArrowLeft, Code2, LayoutTemplate } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectStore = useProjectStore()

const projectId = route.params.projectId as string
const pageId    = route.params.pageId as string
const isNew     = !pageId

const loading   = ref(true)
const saving    = ref(false)
const viewMode  = ref<'form' | 'json'>('form')

const form = reactive({
  title:   '',
  slug:    '',
  status:  'draft' as 'draft' | 'published',
  meta:    { title: '', description: '' },
  version: 1,
})

const schemas          = ref<SectionSchema[]>([])
const selectedSection  = ref<Section | null>(null)

// Local-first section state — all changes buffered until save()
const {
  sections,
  isDirty,
  loadSections,
  addSection:      editorAddSection,
  removeSection:   editorRemoveSection,
  moveSection:     editorMoveSection,
  updateSectionData:   editorUpdateData,
  updateSectionStatus: editorUpdateStatus,
  flushSections,
} = usePageEditor()

onMounted(async () => {
  const [schemasRes] = await Promise.all([
    schemasApi.list(projectId),
    pageId
      ? pagesApi.get(pageId).then(page => {
          Object.assign(form, {
            title:   page.title,
            slug:    page.slug,
            status:  page.status,
            version: page.version,
            meta:    page.meta ?? { title: '', description: '' },
          })
        })
      : Promise.resolve(),
    pageId
      ? import('@/api/sections')
          .then(m => m.sectionsApi.listForPage(pageId))
          .then(res => loadSections(res.items))
      : Promise.resolve(),
  ])
  schemas.value = schemasRes.items
  loading.value = false
})

// Auto-slug from title on new pages
function onTitleInput() {
  if (isNew) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

// ─── Save ───────────────────────────────────────────────────────────────────

async function save() {
  saving.value = true
  try {
    const payload = {
      project_id: projectId,
      title:      form.title,
      slug:       form.slug,
      status:     form.status,
      version:    form.version,
      meta:       form.meta,
    }

    let finalPageId = pageId

    if (isNew) {
      const created = await pagesApi.create(payload)
      finalPageId   = created.id
      router.replace(`/projects/${projectId}/pages/${finalPageId}/edit`)
    } else {
      await pagesApi.update(pageId, payload)
    }

    // Flush only changed sections (min diff)
    const flushed = await flushSections(finalPageId)

    // Sync selectedSection ref — temp ID may have been replaced with real ID
    if (selectedSection.value) {
      const match = flushed.find(
        s => s.schema_id === selectedSection.value!.schema_id &&
             s.order     === selectedSection.value!.order
      )
      if (match) selectedSection.value = match
    }
  } catch (err) {
    console.error('Save failed:', err)
  } finally {
    saving.value = false
  }
}

// ─── Section handlers (all local only) ──────────────────────────────────────

function handleAddSection(schemaId: string) {
  const schema = schemas.value.find(s => s.id === schemaId)
  const stub   = editorAddSection(schemaId, schema)
  selectedSection.value = stub
}

function handleRemoveSection(id: string) {
  if (selectedSection.value?.id === id) selectedSection.value = null
  editorRemoveSection(id)
}

function handleMoveSection(id: string, direction: 'up' | 'down') {
  editorMoveSection(id, direction)
}

function handleSectionData(data: Record<string, unknown>) {
  if (!selectedSection.value) return
  editorUpdateData(selectedSection.value.id, data)
  // Keep selectedSection.data reactive in the right-panel
  selectedSection.value = { ...selectedSection.value, data }
}

function handleSectionStatus(id: string, status: 'draft' | 'published') {
  editorUpdateStatus(id, status)
  // Reflect status change in selectedSection if it's the active one
  if (selectedSection.value?.id === id) {
    selectedSection.value = { ...selectedSection.value, status }
  }
}

const selectedSchemaFields = computed(() => {
  if (!selectedSection.value) return []
  return schemas.value.find(s => s.id === selectedSection.value!.schema_id)?.fields_schema ?? []
})
</script>

<template>
  <div class="flex h-full overflow-hidden">

    <!-- ── Left panel ─────────────────────────────────────── -->
    <div class="w-80 border-r flex flex-col overflow-hidden">

      <!-- Header -->
      <div class="p-4 border-b flex items-center gap-2">
        <Button variant="ghost" size="icon" class="h-7 w-7"
          @click="router.push(`/projects/${projectId}/pages`)">
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <h2 class="text-sm font-semibold">{{ isNew ? 'New Page' : 'Edit Page' }}</h2>
        <Badge
          class="ml-auto capitalize text-[11px] px-2 py-0 border"
          :class="form.status === 'published'
            ? 'bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:text-emerald-400 dark:border-emerald-800'
            : 'bg-amber-400/10 text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-800'"
        >
          {{ form.status }}
        </Badge>
      </div>

      <!-- Loading -->
      <div v-if="loading" class="flex-1 flex items-center justify-center">
        <Loader2 class="h-5 w-5 animate-spin text-muted-foreground" />
      </div>

      <div v-else class="flex-1 overflow-y-auto p-4 space-y-4">

        <!-- Page metadata -->
        <div class="space-y-3">
          <div class="space-y-1.5">
            <Label class="text-xs">Title</Label>
            <Input v-model="form.title" placeholder="Page title" @input="onTitleInput" />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">Slug</Label>
            <Input v-model="form.slug" placeholder="page-slug" class="font-mono text-xs" />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">Status</Label>
            <Select v-model="form.status">
              <SelectTrigger class="h-8 text-xs"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="draft">Draft</SelectItem>
                <SelectItem value="published">Published</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">SEO Title</Label>
            <Input v-model="form.meta.title" placeholder="Meta title" />
          </div>
          <div class="space-y-1.5">
            <Label class="text-xs">Meta Description</Label>
            <Input v-model="form.meta.description" placeholder="Meta description" />
          </div>
        </div>

        <Separator />

        <!-- Sections -->
        <div>
          <p class="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">
            Sections
          </p>
          <SectionEditor
            :sections="sections"
            :schemas="schemas"
            v-model:selected="selectedSection"
            @add="handleAddSection"
            @remove="handleRemoveSection"
            @move="handleMoveSection"
            @select="selectedSection = $event"
            @update:status="handleSectionStatus"
          />
        </div>
      </div>

      <!-- Save bar -->
      <div class="p-4 border-t space-y-2">
        <!-- Unsaved-changes indicator -->
        <p v-if="isDirty" class="text-[11px] text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
          <span class="h-1.5 w-1.5 rounded-full bg-amber-500 inline-block" />
          Unsaved changes
        </p>
        <Button class="w-full" :disabled="saving" @click="save">
          <Loader2 v-if="saving" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
          <Save v-else class="h-3.5 w-3.5 mr-1.5" />
          {{ saving ? 'Saving…' : 'Save' }}
        </Button>
      </div>
    </div>

    <!-- ── Right panel: section content editor ────────────── -->
    <div class="flex-1 overflow-y-auto p-6">

      <!-- Empty state -->
      <div v-if="!selectedSection"
        class="flex h-full items-center justify-center text-muted-foreground">
        <div class="text-center space-y-2">
          <p class="text-sm font-medium">Select a section to edit its content</p>
          <p class="text-xs">Or add a new section from the panel on the left</p>
        </div>
      </div>

      <div v-else class="space-y-4 max-w-2xl">

        <!-- Section header -->
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-sm font-semibold">
              {{ schemas.find(s => s.id === selectedSection!.schema_id)?.name }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">Edit content for this section</p>
          </div>

          <!-- Form / JSON toggle -->
          <div class="flex items-center rounded-md border p-1 bg-muted/30">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
              :class="viewMode === 'form' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'"
              @click="viewMode = 'form'"
            >
              <LayoutTemplate class="h-3.5 w-3.5" /> Form
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-sm transition-colors"
              :class="viewMode === 'json' ? 'bg-background shadow-sm' : 'text-muted-foreground hover:text-foreground'"
              @click="viewMode = 'json'"
            >
              <Code2 class="h-3.5 w-3.5" /> JSON
            </button>
          </div>
        </div>

        <!-- Schema field reference pills -->
        <div v-if="selectedSchemaFields.length"
          class="rounded-md border p-3 bg-muted/30 space-y-1">
          <p class="text-xs font-medium text-muted-foreground mb-2">Schema fields</p>
          <div v-for="field in selectedSchemaFields" :key="field.name"
            class="flex items-center gap-2">
            <code class="text-xs font-mono">{{ field.name }}</code>
            <Badge variant="outline" class="text-xs py-0">{{ field.type }}</Badge>
            <Badge v-if="field.required" class="text-xs py-0" variant="destructive">required</Badge>
          </div>
        </div>

        <!-- Editors -->
        <template v-if="viewMode === 'form'">
          <SectionFormEditor
            :fields="selectedSchemaFields"
            :model-value="selectedSection.data ?? {}"
            @update:model-value="handleSectionData"
          />
        </template>

        <template v-else>
          <JsonEditor
            :model-value="selectedSection.data"
            @update:model-value="handleSectionData"
          />
        </template>

      </div>
    </div>

  </div>
</template>
