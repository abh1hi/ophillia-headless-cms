<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { projectsApi } from '@/api/projects'
import type { Project } from '@/api/projects'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Loader2, Plus, FolderOpen, ArrowRight } from 'lucide-vue-next'

const router = useRouter()
const projectStore = useProjectStore()

const projects = ref<Project[]>([])
const loading = ref(true)
const search = ref('')

onMounted(async () => {
  await projectStore.fetchProjects()
  projects.value = projectStore.projects
  loading.value = false
})

const filtered = computed(() =>
  projects.value.filter(p =>
    p.name.toLowerCase().includes(search.value.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.value.toLowerCase())
  )
)

function openProject(project: Project) {
  projectStore.setCurrentProject(project)
  router.push(`/projects/${project.id}/pages`)
}
</script>

<template>
  <div class="p-6 max-w-4xl mx-auto space-y-6">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Projects</h1>
        <p class="text-sm text-muted-foreground mt-0.5">Select a project to manage its content</p>
      </div>
    </div>

    <Input v-model="search" placeholder="Search projects…" class="max-w-xs" />

    <div v-if="loading" class="flex justify-center py-12">
      <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="filtered.length === 0" class="text-center py-12 text-muted-foreground">
      <FolderOpen class="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p class="text-sm">No projects found.</p>
    </div>

    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <Card
        v-for="project in filtered"
        :key="project.id"
        class="cursor-pointer hover:border-primary transition-colors group"
        @click="openProject(project)"
      >
        <CardHeader class="pb-2">
          <div class="flex items-start justify-between">
            <CardTitle class="text-base">{{ project.name }}</CardTitle>
            <ArrowRight class="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors mt-0.5" />
          </div>
          <CardDescription class="font-mono text-xs">{{ project.slug }}</CardDescription>
        </CardHeader>
        <CardContent>
          <Badge variant="outline" class="text-xs">Active</Badge>
        </CardContent>
      </Card>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
export default { name: 'ProjectsView' }
</script>
