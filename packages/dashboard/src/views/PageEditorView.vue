<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import { sectionsApi } from '@/api/sections'
import { schemasApi } from '@/api/schemas'
import type { Section } from '@/api/sections'
import type { SectionSchema } from '@/api/schemas'
import { useProjectStore } from '@/stores/project'
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
import { Loader2, Save, SendHorizonal, ArrowLeft, Code2, LayoutTemplate } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
const projectStore = useProjectStore()

const projectId = route.params.projectId as string
const pageId = route.params.pageId as string
const isNew = !pageId

const loading = ref(true)
const saving = ref(false)
const viewMode = ref<'form' | 'json'>('form')

const form = reactive({
  title: '',
  slug: '',
  status: 'draft' as 'draft' | 'published',
  meta: { title: '', description: '' },
  version: 1,
})

const sections = ref<Section[]>([])
const schemas = ref<SectionSchema[]>([])
const selectedSection = ref<Section | null>(null)
const sectionDataValid = ref(true)

onMounted(async () => {
  const [schemasRes] = await Promise.all([
    schemasApi.list(projectId),
    pageId
      ? pagesApi.get(pageId).then(page => {
          Object.assign(form, {
            title: page.title,
            slug: page.slug,
            status: page.status,
            version: page.version,
            meta: page.meta ?? { title: '', description: '' },
          })
        })
      : Promise.resolve(),
    pageId
      ? sectionsApi.listForPage(pageId).then(res => { sections.value = res.items })
      : Promise.resolve(),
  ])
  schemas.value = schemasRes.items
  loading.value = false
})

// Auto-generate slug from title on new pages
function onTitleInput() {
  if (isNew) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

async function save(publish = false) {
  saving.value = true
  try {
    const payload = {
      project_id: projectId,
      title: form.title,
      slug: form.slug,
      status: publish ? 'published' : 'draft',
      version: form.version,
      meta: form.meta,
      ...(publish ? { published_at: new Date().toISOString() } : {}),
    }
    if (isNew) {
      const created = await pagesApi.create(payload)
      router.replace(`/projects/${projectId}/pages/${created.id}/edit`)
    } else {
      await pagesApi.update(pageId, payload)
    }
  } finally {
    saving.value = false
  }
}

async function addSection(schemaId: string) {
  if (!pageId && isNew) return
  const currentPageId = pageId || route.params.pageId as string
  const newSection = await sectionsApi.create({
    page_id: currentPageId,
    schema_id: schemaId,
    order: sections.value.length,
    data: {},
    status: 'draft',
  })
  sections.value.push(newSection)
}

async function removeSection(id: string) {
  await sectionsApi.delete(id)
  sections.value = sections.value.filter(s => s.id !== id)
  if (selectedSection.value?.id === id) selectedSection.value = null
}

function moveSection(id: string, direction: 'up' | 'down') {
  const idx = sections.value.findIndex(s => s.id === id)
  if (direction === 'up' && idx > 0) {
    [sections.value[idx], sections.value[idx - 1]] = [sections.value[idx - 1], sections.value[idx]]
  } else if (direction === 'down' && idx < sections.value.length - 1) {
    [sections.value[idx], sections.value[idx + 1]] = [sections.value[idx + 1], sections.value[idx]]
  }
  sectionsApi.reorder(sections.value.map(s => s.id))
}

async function updateSectionData(data: Record<string, unknown>) {
  if (!selectedSection.value) return
  selectedSection.value.data = data
  if (sectionDataValid.value) {
    await sectionsApi.update(selectedSection.value.id, { data })
  }
}

const selectedSchemaFields = computed(() => {
  if (!selectedSection.value) return []
  return schemas.value.find(s => s.id === selectedSection.value!.schema_id)?.fields_schema ?? []
})
</script>

<template>
  <div class="flex h-full overflow-hidden">
    <!-- Left panel: Page meta + section list -->
    <div class="w-80 border-r flex flex-col overflow-hidden">
      <div class="p-4 border-b flex items-center gap-2">
        <Button variant="ghost" size="icon" class="h-7 w-7" @click="router.push(`/projects/${projectId}/pages`)">
          <ArrowLeft class="h-4 w-4" />
        </Button>
        <h2 class="text-sm font-semibold">{{ isNew ? 'New Page' : 'Edit Page' }}</h2>
        <Badge class="ml-auto" :variant="form.status === 'published' ? 'default' : 'secondary'">
          {{ form.status }}
        </Badge>
      </div>

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
              <SelectTrigger class="h-8 text-xs">
                <SelectValue />
              </SelectTrigger>
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

        <!-- Section editor -->
        <div>
          <p class="text-xs font-semibold mb-2 text-muted-foreground uppercase tracking-wide">Sections</p>
          <SectionEditor
            :sections="sections"
            :schemas="schemas"
            v-model:selected="selectedSection"
            @add="addSection"
            @remove="removeSection"
            @move="moveSection"
            @select="selectedSection = $event"
          />
        </div>
      </div>

      <!-- Save actions -->
      <div class="p-4 border-t flex gap-2">
        <Button variant="outline" class="flex-1" :disabled="saving" @click="save(false)">
          <Save class="h-3.5 w-3.5 mr-1.5" />
          Save Draft
        </Button>
        <Button class="flex-1" :disabled="saving" @click="save(true)">
          <SendHorizonal class="h-3.5 w-3.5 mr-1.5" />
          Publish
        </Button>
      </div>
    </div>

    <!-- Right panel: Section JSON editor -->
    <div class="flex-1 overflow-y-auto p-6">
      <div v-if="!selectedSection" class="flex h-full items-center justify-center text-muted-foreground">
        <div class="text-center space-y-2">
          <p class="text-sm font-medium">Select a section to edit its data</p>
          <p class="text-xs">Or add a new section from the panel on the left</p>
        </div>
      </div>

      <div v-else class="space-y-4 max-w-2xl">
        <div class="flex items-start justify-between">
          <div>
            <h3 class="text-sm font-semibold">
              {{ schemas.find(s => s.id === selectedSection!.schema_id)?.name }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">Edit content for this section</p>
          </div>
          
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

        <!-- Schema fields reference -->
        <div v-if="selectedSchemaFields.length" class="rounded-md border p-3 bg-muted/30 space-y-1">
          <p class="text-xs font-medium text-muted-foreground mb-2">Schema fields</p>
          <div v-for="field in selectedSchemaFields" :key="field.name" class="flex items-center gap-2">
            <code class="text-xs font-mono">{{ field.name }}</code>
            <Badge variant="outline" class="text-xs py-0">{{ field.type }}</Badge>
            <Badge v-if="field.required" class="text-xs py-0" variant="destructive">required</Badge>
          </div>
        </div>

        <template v-if="viewMode === 'form'">
          <SectionFormEditor
            :fields="selectedSchemaFields"
            :model-value="selectedSection.data"
            @update:model-value="updateSectionData"
          />
        </template>
        
        <template v-else>
          <JsonEditor
            :model-value="selectedSection.data"
            @update:model-value="updateSectionData"
            @valid-change="sectionDataValid = $event"
          />
        </template>
      </div>
    </div>
  </div>
</template>
