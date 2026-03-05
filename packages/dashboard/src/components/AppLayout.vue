<script setup lang="ts">
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useAuthStore } from '@/stores/auth'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  LayoutDashboard, FileText, Layers, Image, LogOut, ChevronRight
} from 'lucide-vue-next'

const auth = useAuthStore()
const projectStore = useProjectStore()
const router = useRouter()
const route = useRoute()

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
    <aside class="w-60 flex flex-col border-r bg-sidebar text-sidebar-foreground">
      <!-- Logo -->
      <div class="flex items-center gap-3 px-5 py-4 border-b border-sidebar-border">
        <div class="w-8 h-8 rounded-lg bg-sidebar-primary text-sidebar-primary-foreground flex items-center justify-center font-bold text-sm">O</div>
        <span class="font-semibold text-sm">Ophillia HCMS</span>
      </div>

      <!-- Project Selector -->
      <div class="px-3 py-3 border-b border-sidebar-border" v-if="projectStore.projects.length">
        <Select :model-value="projectId" @update:model-value="onProjectChange">
          <SelectTrigger class="w-full h-8 text-xs bg-sidebar-accent border-sidebar-border text-sidebar-foreground">
            <SelectValue placeholder="Select project…" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem v-for="p in projectStore.projects" :key="p.id" :value="p.id" class="text-xs">
              {{ p.name }}
            </SelectItem>
          </SelectContent>
        </Select>
      </div>

      <!-- Nav -->
      <nav class="flex-1 px-2 py-3 space-y-1">
        <button
          v-for="item in navItems"
          :key="item.to"
          @click="router.push(item.to)"
          class="w-full flex items-center gap-3 px-3 py-2 rounded-md text-sm transition-colors"
          :class="isActive(item.to)
            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground'"
        >
          <component :is="item.icon" class="h-4 w-4 shrink-0" />
          {{ item.label }}
        </button>
      </nav>

      <!-- User -->
      <div class="px-3 py-3 border-t border-sidebar-border flex items-center justify-between">
        <div class="truncate">
          <p class="text-xs font-medium text-sidebar-foreground truncate">{{ auth.userEmail }}</p>
        </div>
        <Button variant="ghost" size="icon" class="h-7 w-7 text-sidebar-foreground/60 hover:text-sidebar-foreground" @click="logout">
          <LogOut class="h-3.5 w-3.5" />
        </Button>
      </div>
    </aside>

    <!-- Main content -->
    <main class="flex-1 flex flex-col overflow-hidden">
      <!-- Top bar -->
      <header class="h-14 border-b flex items-center px-6 gap-2 text-sm text-muted-foreground shrink-0">
        <span v-if="projectStore.currentProject" class="flex items-center gap-1.5">
          {{ projectStore.currentProject.name }}
          <ChevronRight class="h-3.5 w-3.5" />
        </span>
        <span class="text-foreground font-medium capitalize">{{ route.name?.toString().replace('-', ' ') }}</span>
      </header>

      <div class="flex-1 overflow-auto">
        <RouterView />
      </div>
    </main>
  </div>
</template>
