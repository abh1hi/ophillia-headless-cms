<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LayoutDashboard, FileText, Layers, Image, LogOut, ChevronRight, Command,
  PanelLeftClose, PanelLeftOpen, ChevronDown
} from 'lucide-vue-next'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import CommandPalette from './CommandPalette.vue'
import { onMounted, onUnmounted, ref, watch } from 'vue'

const auth = useAuthStore()
const projectStore = useProjectStore()
const router = useRouter()
const route = useRoute()

const isPaletteOpen = ref(false)
const isSidebarCollapsed = ref(localStorage.getItem('sidebar-collapsed') === 'true')

watch(isSidebarCollapsed, (val) => {
  localStorage.setItem('sidebar-collapsed', String(val))
})

// ─── Global Keyboard Listener ────────────────────────────────────────────────
function handleGlobalKeyDown(e: KeyboardEvent) {
  // Cmd/Ctrl + K: Command Palette
  if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
    e.preventDefault()
    isPaletteOpen.value = !isPaletteOpen.value
  }

  // Cmd/Ctrl + S: Save Draft (if on an editor page)
  if ((e.metaKey || e.ctrlKey) && e.key === 's') {
    if (route.name?.toString().includes('page-')) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('ophillia:save-draft'))
    }
  }

  // Cmd/Ctrl + P: Publish (if on an editor page)
  if ((e.metaKey || e.ctrlKey) && e.key === 'p') {
    if (route.name?.toString().includes('page-')) {
      e.preventDefault()
      window.dispatchEvent(new CustomEvent('ophillia:publish'))
    }
  }
}

onMounted(() => {
  window.addEventListener('keydown', handleGlobalKeyDown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleGlobalKeyDown)
})

const projectId = computed(() => projectStore.currentProject?.id ?? '')

const navItems = computed(() => [
  { label: 'Projects', icon: LayoutDashboard, to: '/projects', exact: true },
  ...(projectId.value ? [
    { label: 'Pages',   icon: FileText, to: `/projects/${projectId.value}/pages` },
    { label: 'Schemas', icon: Layers,   to: `/projects/${projectId.value}/schemas` },
    { label: 'Media',   icon: Image,    to: `/projects/${projectId.value}/media` },
  ] : []),
])

function isActive(path: string) {
  return route.path.startsWith(path)
}

function onProjectChange(id: string) {
  const p = projectStore.projects.find(p => p.id === id)
  if (p) {
    projectStore.setCurrentProject(p)
    router.push(`/projects/${id}/pages`)
  }
}

function logout() {
  auth.logout()
  projectStore.clearProject()
  router.push('/login')
}
</script>

<template>
  <div class="flex h-screen overflow-hidden bg-background">
    <!-- Sidebar -->
    <aside 
      class="flex flex-col border-r bg-sidebar text-sidebar-foreground transition-all duration-300 ease-in-out"
      :class="isSidebarCollapsed ? 'w-16' : 'w-64'"
    >
      <!-- Logo -->
      <div 
        class="flex items-center gap-3 px-4 py-4 border-b border-sidebar-border h-14 overflow-hidden shrink-0"
        :class="isSidebarCollapsed ? 'justify-center' : ''"
      >
        <div class="w-8 h-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-sm shrink-0 shadow-lg shadow-sidebar-primary/20">O</div>
        <span v-if="!isSidebarCollapsed" class="font-bold text-sm tracking-tight truncate">Ophillia <span class="text-sidebar-primary-foreground/60">CMS</span></span>
      </div>

      <!-- Project Selector (Modern Switcher) -->
      <div class="px-3 py-4 border-b border-sidebar-border overflow-hidden shrink-0" v-if="projectStore.projects.length">
        <DropdownMenu>
          <DropdownMenuTrigger as-child>
            <button 
              class="w-full flex items-center gap-3 p-2 rounded-xl transition-all hover:bg-sidebar-accent group overflow-hidden"
              :class="isSidebarCollapsed ? 'justify-center' : 'bg-sidebar-accent/50 border border-sidebar-border shadow-sm'"
              :title="projectStore.currentProject?.name"
            >
              <div class="w-8 h-8 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold text-[11px] shrink-0 border border-primary/20 transition-transform active:scale-95 group-hover:bg-primary/20">
                {{ projectStore.currentProject?.name.charAt(0).toUpperCase() || 'P' }}
              </div>
              <div v-if="!isSidebarCollapsed" class="flex-1 text-left min-w-0">
                <p class="text-[11px] font-bold text-sidebar-foreground truncate leading-tight">{{ projectStore.currentProject?.name }}</p>
                <p class="text-[9px] text-sidebar-foreground/40 font-mono tracking-tighter uppercase mt-0.5">Project ID: {{ projectId.slice(0,6) }}</p>
              </div>
              <ChevronDown v-if="!isSidebarCollapsed" class="h-3 w-3 text-sidebar-foreground/40 shrink-0" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" class="w-[200px] rounded-xl">
            <DropdownMenuItem 
              v-for="p in projectStore.projects" 
              :key="p.id" 
              @select="onProjectChange(p.id)"
              class="gap-2 py-2 cursor-pointer"
            >
               <div class="w-6 h-6 rounded bg-muted flex items-center justify-center text-[10px] font-bold">{{ p.name.charAt(0).toUpperCase() }}</div>
               <span class="flex-1 text-xs font-medium">{{ p.name }}</span>
               <div v-if="p.id === projectId" class="w-1.5 h-1.5 rounded-full bg-primary" />
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-3 py-6 space-y-2 overflow-y-auto no-scrollbar">
        <button
          v-for="item in navItems"
          :key="item.to"
          @click="router.push(item.to)"
          class="w-full flex items-center gap-3 p-2.5 rounded-xl text-sm transition-all relative group"
          :class="[
            isActive(item.to)
              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-bold shadow-sm ring-1 ring-sidebar-border'
              : 'text-sidebar-foreground/60 hover:bg-sidebar-accent/40 hover:text-sidebar-foreground',
            isSidebarCollapsed ? 'justify-center' : ''
          ]"
          :title="isSidebarCollapsed ? item.label : undefined"
        >
          <component 
            :is="item.icon" 
            class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" 
            :class="isActive(item.to) ? 'text-primary' : ''"
          />
          <span v-if="!isSidebarCollapsed" class="flex-1 text-left truncate tracking-tight">{{ item.label }}</span>
          
          <!-- Active Dot (Collapsed) -->
          <div 
            v-if="isSidebarCollapsed && isActive(item.to)"
            class="absolute right-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-l-full shadow-[0_0_8px_rgba(var(--primary),0.5)]"
          />
        </button>
      </nav>

      <!-- Sidebar Toggle (Fixed at bottom) -->
      <div class="px-3 py-3 border-t border-sidebar-border shrink-0">
        <button 
           @click="isSidebarCollapsed = !isSidebarCollapsed"
           class="w-full flex items-center justify-center p-2 rounded-lg hover:bg-sidebar-accent text-sidebar-foreground/40 hover:text-sidebar-foreground transition-all group"
        >
           <PanelLeftClose v-if="!isSidebarCollapsed" class="h-4 w-4 transition-transform group-hover:-translate-x-0.5" />
           <PanelLeftOpen v-else class="h-4 w-4 transition-transform group-hover:scale-110" />
           <span v-if="!isSidebarCollapsed" class="ml-2.5 text-[10px] font-bold uppercase tracking-widest opacity-60">Collapse</span>
        </button>
      </div>

      <!-- User -->
      <div 
        class="px-3 py-4 border-t border-sidebar-border flex items-center gap-3 shrink-0"
        :class="isSidebarCollapsed ? 'justify-center' : 'justify-between bg-sidebar-accent/20'"
      >
        <div v-if="!isSidebarCollapsed" class="min-w-0">
          <p class="text-[10px] font-bold text-sidebar-foreground truncate tracking-tight">{{ auth.userEmail }}</p>
          <p class="text-[9px] text-sidebar-foreground/40 uppercase tracking-tighter mt-0.5">Admin Account</p>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          class="h-8 w-8 rounded-xl text-sidebar-foreground/40 hover:text-sidebar-foreground hover:bg-sidebar-accent transition-all shrink-0" 
          @click="logout"
          title="Sign Out"
        >
          <LogOut class="h-4 w-4" />
        </Button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top bar -->
        <header class="h-14 border-b flex items-center px-6 transition-all shrink-0">
          <div class="flex items-center gap-2 text-sm text-muted-foreground mr-auto">
            <span v-if="projectStore.currentProject" class="flex items-center gap-1.5">
              {{ projectStore.currentProject.name }}
              <ChevronRight class="h-3.5 w-3.5" />
            </span>
            <span class="text-foreground font-medium capitalize">{{ route.name?.toString().replace('-', ' ') }}</span>
          </div>

          <!-- Quick Search Button -->
          <button
            @click="isPaletteOpen = true"
            class="flex items-center gap-2 px-3 py-1.5 h-9 rounded-md border bg-muted/30 hover:bg-muted/50 transition-colors text-xs text-muted-foreground group"
          >
            <Command class="h-3.5 w-3.5 group-hover:text-primary transition-colors" />
            <span class="hidden sm:inline-block pr-8">Search or run command...</span>
            <span class="flex items-center gap-1 bg-background border rounded px-1.5 py-0.5 font-mono text-[10px] opacity-60">
              <span class="text-[12px] font-sans">⌘</span> K
            </span>
          </button>
        </header>

      <div class="flex-1 overflow-auto">
        <RouterView />
      </div>
    </main>
    <!-- Command Palette -->
    <CommandPalette v-model:open="isPaletteOpen" />
  </div>
</template>
