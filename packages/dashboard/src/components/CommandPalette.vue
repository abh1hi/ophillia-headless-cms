<script setup lang="ts">
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import {
  ComboboxRoot,
  ComboboxInput,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxGroup,
  ComboboxItem,
  ComboboxLabel,
  DialogRoot,
  DialogPortal,
  DialogOverlay,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from 'radix-vue'
import {
  Search,
  FileText,
  LayoutDashboard,
  Layers,
  Image,
  Plus,
  Settings,
  LogOut,
  Save,
  Send,
  Eye,
  Command,
  ArrowRight,
  FileEdit,
} from 'lucide-vue-next'
import { useProjectStore } from '@/stores/project'
import { useAuthStore } from '@/stores/auth'
import { pagesApi } from '@/api/pages'
import type { Page } from '@/api/pages'

const props = defineProps<{
  open: boolean
}>()

const emit = defineEmits<{
  (e: 'update:open', value: boolean): void
}>()

const router = useRouter()
const route = useRoute()
const projectStore = useProjectStore()
const authStore = useAuthStore()

const search = ref('')
const pages = ref<Page[]>([])
const loadingPages = ref(false)

// ─── Fetch Pages ─────────────────────────────────────────────────────────────
async function fetchPages() {
  if (!projectStore.currentProject) return
  loadingPages.value = true
  try {
    const res = await pagesApi.list(projectStore.currentProject.id)
    pages.value = res.items
  } catch (err) {
    console.error('Failed to fetch pages for command palette:', err)
  } finally {
    loadingPages.value = false
  }
}

watch(() => props.open, (isOpen) => {
  if (isOpen) {
    search.value = ''
    fetchPages()
  }
})

// ─── Commands ────────────────────────────────────────────────────────────────
interface CommandItem {
  id: string
  label: string
  icon: any
  category: string
  shortcut?: string
  action: () => void
}

const commands = computed<CommandItem[]>(() => {
  const items: CommandItem[] = []

  // 1. Navigation
  items.push({
    id: 'nav-dashboard',
    label: 'Go to Dashboard',
    icon: LayoutDashboard,
    category: 'Navigation',
    action: () => router.push('/projects'),
  })

  if (projectStore.currentProject) {
    const pId = projectStore.currentProject.id
    items.push({
      id: 'nav-pages',
      label: 'Go to Pages',
      icon: FileText,
      category: 'Navigation',
      action: () => router.push(`/projects/${pId}/pages`),
    })
    items.push({
      id: 'nav-schemas',
      label: 'Go to Schemas',
      icon: Layers,
      category: 'Navigation',
      action: () => router.push(`/projects/${pId}/schemas`),
    })
    items.push({
      id: 'nav-media',
      label: 'Go to Media',
      icon: Image,
      category: 'Navigation',
      action: () => router.push(`/projects/${pId}/media`),
    })
  }

  // 2. Pages (dynamic)
  if (pages.value.length > 0) {
    pages.value.forEach(p => {
      items.push({
        id: `page-${p.id}`,
        label: `Jump to: ${p.title}`,
        icon: FileText,
        category: 'Pages',
        action: () => {
          if (projectStore.currentProject) {
            router.push(`/projects/${projectStore.currentProject.id}/pages/${p.id}/edit`)
          }
        },
      })
    })
  }

  // 3. Editor Actions (Contextual)
  if (route.name?.toString().includes('page-')) {
    items.push({
      id: 'action-save',
      label: 'Save Draft',
      icon: Save,
      category: 'Actions',
      shortcut: '⌘S',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:save-draft'))
      },
    })
    items.push({
      id: 'action-save-alt',
      label: 'Save Content',
      icon: Save,
      category: 'Actions',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:save-draft'))
      },
    })
    items.push({
      id: 'action-publish',
      label: 'Publish Page',
      icon: Send,
      category: 'Actions',
      shortcut: '⌘P',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:publish'))
      },
    })
    items.push({
      id: 'action-unpublish',
      label: 'Unpublish / Revert to Draft',
      icon: FileEdit,
      category: 'Actions',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:unpublish'))
      },
    })
    items.push({
      id: 'action-unpublish-alt',
      label: 'Mark as Draft',
      icon: FileEdit,
      category: 'Actions',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:unpublish'))
      },
    })
    items.push({
      id: 'action-preview',
      label: 'Toggle Preview',
      icon: Eye,
      category: 'Actions',
      shortcut: 'P',
      action: () => {
        window.dispatchEvent(new CustomEvent('ophillia:toggle-preview'))
      },
    })
  }

  // 4. Projects
  projectStore.projects.forEach(p => {
    if (p.id !== projectStore.currentProject?.id) {
      items.push({
        id: `project-${p.id}`,
        label: `Switch to Project: ${p.name}`,
        icon: LayoutDashboard,
        category: 'Projects',
        action: () => {
          projectStore.setCurrentProject(p)
          router.push(`/projects/${p.id}/pages`)
        },
      })
    }
  })

  // 5. System
  items.push({
    id: 'sys-logout',
    label: 'Logout',
    icon: LogOut,
    category: 'System',
    action: () => {
      authStore.logout()
      router.push('/login')
    },
  })

  return items
})

const filteredCommands = computed(() => {
  if (!search.value) return commands.value
  const s = search.value.toLowerCase()
  return commands.value.filter(c =>
    c.label.toLowerCase().includes(s) ||
    c.category.toLowerCase().includes(s)
  )
})

const groups = computed(() => {
  const g: Record<string, CommandItem[]> = {}
  filteredCommands.value.forEach(c => {
    if (!g[c.category]) g[c.category] = []
    g[c.category].push(c)
  })
  return g
})

function handleSelect(cmd: CommandItem) {
  cmd.action()
  emit('update:open', false)
}
</script>

<template>
  <DialogRoot :open="open" @update:open="emit('update:open', $event)">
    <DialogPortal>
      <DialogOverlay class="fixed inset-0 z-50 bg-background/80 backdrop-blur-sm transition-all" />
      <DialogContent
        class="fixed left-[50%] top-[20%] z-50 w-full max-w-2xl translate-x-[-50%] overflow-hidden rounded-xl border bg-popover text-popover-foreground shadow-2xl transition-all"
      >
        <DialogTitle class="sr-only">Command Palette</DialogTitle>
        <DialogDescription class="sr-only">Search for pages, projects, and actions...</DialogDescription>
        <ComboboxRoot
          class="flex flex-col overflow-hidden"
          @update:model-value="(val: any) => handleSelect(val)"
        >
          <!-- Search Header -->
          <div class="flex items-center border-b px-4 py-3 gap-3">
            <Search class="h-5 w-5 text-muted-foreground shrink-0" />
            <ComboboxInput
              v-model="search"
              placeholder="Type a command or search pages..."
              class="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
              auto-focus
            />
            <div class="flex items-center gap-1.5 px-1.5 py-0.5 rounded bg-muted border text-[10px] font-medium text-muted-foreground uppercase opacity-50">
              <span class="text-[12px] font-sans">Esc</span>
            </div>
          </div>

          <!-- Content List -->
          <ComboboxContent class="max-h-[360px] overflow-y-auto py-2">
            <ComboboxEmpty class="flex flex-col items-center justify-center py-10 px-6 gap-2 text-center text-muted-foreground">
              <Command class="h-8 w-8 opacity-20" />
              <p class="text-sm font-medium">No results found for "{{ search }}"</p>
              <p class="text-xs">Try searching for a page name or an action like "Save".</p>
            </ComboboxEmpty>

            <ComboboxGroup v-for="(items, category) in groups" :key="category" class="px-2">
              <ComboboxLabel class="flex items-center gap-2 px-3 py-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground/60">
                {{ category }}
              </ComboboxLabel>
              <ComboboxItem
                v-for="cmd in items"
                :key="cmd.id"
                :value="cmd"
                class="group relative flex cursor-default select-none items-center gap-3 rounded-md px-3 py-2.5 text-sm outline-none data-[highlighted]:bg-accent data-[highlighted]:text-accent-foreground data-[disabled]:opacity-50 transition-colors"
              >
                <div class="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-muted/50 group-data-[highlighted]:bg-background transition-colors">
                  <component :is="cmd.icon" class="h-3.5 w-3.5" />
                </div>
                <span class="flex-1 font-medium truncate">{{ cmd.label }}</span>
                <span v-if="cmd.shortcut" class="hidden sm:inline-block text-[10px] font-mono text-muted-foreground/60 border rounded px-1.5 py-0.5 bg-muted/40">
                  {{ cmd.shortcut }}
                </span>
                <ArrowRight class="h-3 w-3 text-muted-foreground/0 group-data-[highlighted]:text-muted-foreground group-data-[highlighted]:opacity-50 transition-all opacity-0 group-data-[highlighted]:opacity-100" />
              </ComboboxItem>
            </ComboboxGroup>
          </ComboboxContent>

          <!-- Footer -->
          <div class="flex items-center justify-between border-t px-4 py-3 bg-muted/20 text-[10px] text-muted-foreground font-medium">
            <div class="flex gap-3">
              <span class="flex items-center gap-1.5"><kbd class="bg-muted px-1.5 py-0.5 rounded border">↓↑</kbd> Navigate</span>
              <span class="flex items-center gap-1.5"><kbd class="bg-muted px-1.5 py-0.5 rounded border">↵</kbd> Select</span>
            </div>
            <div class="flex items-center gap-1.5 opacity-60">
              Ophillia Command <Command class="h-3 w-3" />
            </div>
          </div>
        </ComboboxRoot>
      </DialogContent>
    </DialogPortal>
  </DialogRoot>
</template>
