<script setup lang="ts">
import { ref, reactive, onMounted, onUnmounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import { schemasApi } from '@/api/schemas'
import { sectionsApi } from '@/api/sections'
import { versionsApi } from '@/api/versions'
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
import EditorSwitcher from '@/components/EditorSwitcher.vue'
import SectionPreviewPanel from '@/components/SectionPreviewPanel.vue'
import VersionHistorySidebar from '@/components/VersionHistorySidebar.vue'
import { Loader2, Save, ArrowLeft, Eye, Send, EyeOff, Globe, FileEdit } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const projectStore = useProjectStore()

const projectId = route.params.projectId as string
const pageId    = route.params.pageId as string
const isNew     = !pageId

const loading     = ref(true)
const saving      = ref(false)
const publishing  = ref(false)
const showPreview = ref(false)
const activeSidebarTab = ref<'outline' | 'settings'>('outline')

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

  // ─── Command Palette Listeners ─────────────────────────────────────────────
  window.addEventListener('ophillia:save-draft', cmdSaveDraft)
  window.addEventListener('ophillia:publish', cmdPublish)
  window.addEventListener('ophillia:unpublish', cmdUnpublish)
  window.addEventListener('ophillia:toggle-preview', cmdTogglePreview)
})

onUnmounted(() => {
  window.removeEventListener('ophillia:save-draft', cmdSaveDraft)
  window.removeEventListener('ophillia:publish', cmdPublish)
  window.removeEventListener('ophillia:unpublish', cmdUnpublish)
  window.removeEventListener('ophillia:toggle-preview', cmdTogglePreview)
})

const cmdSaveDraft = () => saveDraft()
const cmdPublish = () => publishPage()
const cmdUnpublish = () => unpublishPage()
const cmdTogglePreview = () => { showPreview.value = !showPreview.value }

// Auto-slug from title on new pages
function onTitleInput() {
  if (isNew) {
    form.slug = form.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
  }
}

// ─── Save Draft ──────────────────────────────────────────────────────────────

async function saveDraft() {
  saving.value = true
  try {
    const nextVersion = form.version + (isNew ? 0 : 1)
    const payload = {
      project_id: projectId,
      title:      form.title,
      slug:       form.slug,
      status:     form.status,
      version:    nextVersion,
      meta:       form.meta,
    }

    let finalPageId = pageId

    if (isNew) {
      const created = await pagesApi.create(payload)
      finalPageId   = created.id
      router.replace(`/projects/${projectId}/pages/${finalPageId}/edit`)
    } else {
      await pagesApi.update(pageId, payload)
      form.version = nextVersion
    }

    // Flush only changed sections (min diff)
    const flushed = await flushSections(finalPageId)

    // Auto-snapshot
    if (!isNew) {
      await versionsApi.create(
        finalPageId,
        form.version,
        `Auto-save · v${form.version}`,
        { page: { ...form }, sections: flushed }
      )
    }

    // Sync selectedSection ref
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

// ─── Publish ──────────────────────────────────────────────────────────────────

async function publishPage() {
  publishing.value = true
  try {
    // 1. Save latest data first
    const nextVersion = form.version + 1
    await pagesApi.update(pageId, {
      title:   form.title,
      slug:    form.slug,
      meta:    form.meta,
      version: nextVersion,
    })
    form.version = nextVersion

    const flushed = await flushSections(pageId)

    // 2. Flip page + all sections to published
    await pagesApi.publish(pageId)
    await sectionsApi.publishAll(flushed.map(s => s.id))
    form.status = 'published'

    // 3. Create a "Published" snapshot
    await versionsApi.create(
      pageId,
      form.version,
      `Published · v${form.version}`,
      { page: { ...form, status: 'published' }, sections: flushed }
    )

    // Sync selectedSection
    if (selectedSection.value) {
      const match = flushed.find(
        s => s.schema_id === selectedSection.value!.schema_id &&
             s.order     === selectedSection.value!.order
      )
      if (match) selectedSection.value = { ...match, status: 'published' }
    }
  } catch (err) {
    console.error('Publish failed:', err)
  } finally {
    publishing.value = false
  }
}

// ─── Unpublish ────────────────────────────────────────────────────────────────

async function unpublishPage() {
  publishing.value = true
  try {
    await pagesApi.unpublish(pageId)
    form.status = 'draft'
  } catch (err) {
    console.error('Unpublish failed:', err)
  } finally {
    publishing.value = false
  }
}

// ─── Restore Version ─────────────────────────────────────────────────────────

function restoreVersion(snapshot: { page: any; sections: any[] }) {
  Object.assign(form, {
    title:   snapshot.page.title ?? form.title,
    slug:    snapshot.page.slug ?? form.slug,
    status:  snapshot.page.status ?? form.status,
    meta:    snapshot.page.meta ?? form.meta,
    version: snapshot.page.version ?? form.version,
  })
  loadSections(snapshot.sections)
  selectedSection.value = null
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
    <!-- ── Left panel: section list & layout ────────────────────────── -->
    <div class="w-[300px] border-r flex flex-col bg-muted/10 relative">
      
      <!-- Sticky Sidebar Header -->
      <div class="p-4 border-b bg-background/50 backdrop-blur-md shrink-0">
        <div class="flex items-center justify-between mb-4">
          <Badge 
            variant="outline" 
            class="text-[10px] uppercase font-bold py-0 h-5 px-1.5 rounded-sm"
            :class="form.status === 'published' ? 'border-emerald-500/30 text-emerald-600 bg-emerald-500/5' : 'border-amber-500/30 text-amber-600 bg-amber-500/5'"
          >
            {{ form.status }}
          </Badge>

          <!-- History button -->
          <VersionHistorySidebar
            v-if="!isNew && pageId"
            :page-id="pageId"
            :current-version="form.version"
            @restore="restoreVersion"
          />
        </div>

        <!-- Tabs -->
        <div class="flex p-1 bg-muted/30 rounded-lg border">
          <button
            class="flex-1 px-3 py-1.5 text-[11px] font-bold rounded-md transition-all uppercase tracking-wider"
            :class="activeSidebarTab === 'outline' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="activeSidebarTab = 'outline'"
          >
            Outline
          </button>
          <button
            class="flex-1 px-3 py-1.5 text-[11px] font-bold rounded-md transition-all uppercase tracking-wider"
            :class="activeSidebarTab === 'settings' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
            @click="activeSidebarTab = 'settings'"
          >
            Settings
          </button>
        </div>
      </div>

      <!-- Scrollable Area -->
      <div class="flex-1 overflow-y-auto no-scrollbar">
        <div v-if="loading" class="flex-1 flex items-center justify-center py-20">
          <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
        </div>

        <div v-else class="p-4 flex flex-col gap-6">
          
          <!-- TAB: OUTLINE -->
          <div v-if="activeSidebarTab === 'outline'" class="space-y-6">
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

          <!-- TAB: SETTINGS -->
          <div v-if="activeSidebarTab === 'settings'" class="space-y-6">
            <div class="space-y-4">
              <div class="space-y-1.5">
                <Label class="text-[11px] font-semibold text-muted-foreground uppercase opacity-70">Page Title</Label>
                <Input v-model="form.title" placeholder="Home Page" @input="onTitleInput" class="h-9 text-sm" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-[11px] font-semibold text-muted-foreground uppercase opacity-70">URL Slug</Label>
                <Input v-model="form.slug" placeholder="index" class="font-mono text-sm h-9 bg-muted/20" />
              </div>
            </div>

            <Separator />

            <div class="space-y-4">
              <p class="text-[11px] font-bold text-muted-foreground uppercase tracking-widest">SEO Meta</p>
              <div class="space-y-1.5">
                <Label class="text-[11px] font-semibold text-muted-foreground uppercase opacity-70">Meta Title</Label>
                <Input v-model="form.meta.title" placeholder="Meta title..." class="h-9 text-sm" />
              </div>
              <div class="space-y-1.5">
                <Label class="text-[11px] font-semibold text-muted-foreground uppercase opacity-70">Meta Description</Label>
                <textarea 
                  v-model="form.meta.description" 
                  placeholder="The best CMS..." 
                  class="w-full min-h-[100px] rounded-md border bg-transparent p-3 text-sm focus:ring-1 focus:ring-primary outline-none" 
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>

      <!-- Sticky Action Bar -->
      <div class="p-4 border-t bg-background/50 backdrop-blur-md shrink-0 space-y-3">
        <!-- Status indicator -->
        <div class="flex items-center justify-between">
          <div class="flex flex-col">
            <span class="text-[10px] font-bold text-muted-foreground leading-none">Draft #{{ form.version }}</span>
            <span v-if="isDirty" class="text-[9px] font-medium text-amber-600 mt-1 uppercase tracking-widest flex items-center gap-1">
              <span class="h-1 w-1 bg-amber-500 rounded-full animate-pulse" />
              Unsaved changes
            </span>
          </div>
          <div v-if="form.status === 'published'" class="text-[10px] font-bold text-emerald-600 flex items-center gap-1">
            <Globe class="h-3 w-3" />
            LIVE
          </div>
        </div>

        <div class="flex gap-2">
          <Button 
            class="flex-1 h-10 rounded-xl" 
            variant="outline" 
            :disabled="saving || publishing" 
            @click="saveDraft"
          >
            <Loader2 v-if="saving" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
            <Save v-else class="h-3.5 w-3.5 mr-1.5 opacity-60" />
            {{ saving ? '...' : 'Save' }}
          </Button>

          <Button
            v-if="form.status !== 'published'"
            class="flex-[2] h-10 rounded-xl bg-primary text-primary-foreground font-bold"
            :disabled="saving || publishing || isNew"
            @click="publishPage"
          >
            <Loader2 v-if="publishing" class="h-3.5 w-3.5 mr-1.5 animate-spin" />
            <Send v-else class="h-3.5 w-3.5 mr-1.5 opacity-80" />
            {{ publishing ? '...' : 'Publish' }}
          </Button>
          <Button
            v-else
            variant="ghost"
            class="flex-1 h-10 rounded-xl text-muted-foreground hover:text-foreground"
            :disabled="publishing"
            @click="unpublishPage"
          >
            <FileEdit class="h-3.5 w-3.5 mr-1.5" />
            Revert
          </Button>
        </div>
      </div>
    </div>

    <!-- ── Right panel: section content editor ───────────────────────── -->
    <div class="flex-1 flex flex-col overflow-hidden">

      <!-- Empty state -->
      <div v-if="!selectedSection"
        class="flex-1 flex items-center justify-center text-muted-foreground">
        <div class="text-center space-y-2">
          <p class="text-sm font-medium">Select a section to edit its content</p>
          <p class="text-xs">Or add a new section from the panel on the left</p>
        </div>
      </div>

      <template v-else>
        <!-- Panel header with Edit / Preview toggle -->
        <div class="shrink-0 flex items-center justify-between px-6 pt-5 pb-4 border-b">
          <div>
            <h3 class="text-sm font-semibold">
              {{ schemas.find(s => s.id === selectedSection!.schema_id)?.name }}
            </h3>
            <p class="text-xs text-muted-foreground mt-0.5">{{ showPreview ? 'Live preview' : 'Edit content' }}</p>
          </div>

          <!-- Edit / Preview toggle -->
          <div class="flex items-center rounded-lg border p-1 bg-muted/30">
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
              :class="!showPreview ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
              @click="showPreview = false"
            >
              Edit
            </button>
            <button
              class="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-all"
              :class="showPreview ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
              @click="showPreview = true"
            >
              <Eye class="h-3.5 w-3.5" />
              Preview
            </button>
          </div>
        </div>

        <!-- Edit mode -->
        <div v-if="!showPreview" class="flex-1 overflow-y-auto p-6">
          <div class="space-y-4 max-w-2xl">
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

            <!-- Unified Editor Switcher -->
            <EditorSwitcher
              :fields="selectedSchemaFields"
              :model-value="selectedSection.data ?? {}"
              :section-name="schemas.find(s => s.id === selectedSection!.schema_id)?.name"
              @update:model-value="handleSectionData"
            />
          </div>
        </div>

        <!-- Preview mode -->
        <div v-else class="flex-1 overflow-hidden p-4">
          <SectionPreviewPanel
            :section-id="selectedSection.id"
            :data="selectedSection.data ?? {}"
            :fields="selectedSchemaFields"
            :page-slug="form.slug"
          />
        </div>
      </template>
    </div>

  </div>
</template>
