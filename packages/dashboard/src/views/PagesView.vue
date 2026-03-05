<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import type { Page } from '@/api/pages'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow
} from '@/components/ui/table'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Loader2, Plus, Pencil, Trash2, Send } from 'lucide-vue-next'

const router = useRouter()
const route = useRoute()
const projectId = route.params.projectId as string

const pages = ref<Page[]>([])
const loading = ref(true)
const search = ref('')

const filtered = computed(() =>
  pages.value.filter(p =>
    p.title.toLowerCase().includes(search.value.toLowerCase()) ||
    p.slug.toLowerCase().includes(search.value.toLowerCase())
  )
)

async function load() {
  loading.value = true
  const result = await pagesApi.list(projectId)
  pages.value = result.items
  loading.value = false
}

async function deletePage(id: string) {
  await pagesApi.delete(id)
  pages.value = pages.value.filter(p => p.id !== id)
}

async function publishPage(id: string) {
  const updated = await pagesApi.publish(id)
  const idx = pages.value.findIndex(p => p.id === id)
  if (idx !== -1) pages.value[idx] = updated
}

onMounted(load)
</script>

<template>
  <div class="p-6 space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Pages</h1>
        <p class="text-sm text-muted-foreground">Manage all pages for this project</p>
      </div>
      <Button @click="router.push(`/projects/${projectId}/pages/new`)">
        <Plus class="h-4 w-4 mr-2" /> New Page
      </Button>
    </div>

    <Input v-model="search" placeholder="Search pages…" class="max-w-xs" />

    <div v-if="loading" class="flex justify-center py-12">
      <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Title</TableHead>
            <TableHead>Slug</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Version</TableHead>
            <TableHead class="w-[120px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow v-if="filtered.length === 0">
            <TableCell colspan="5" class="text-center text-muted-foreground py-8">
              No pages yet. Create your first page.
            </TableCell>
          </TableRow>
          <TableRow v-for="page in filtered" :key="page.id" class="group">
            <TableCell class="font-medium">{{ page.title }}</TableCell>
            <TableCell class="font-mono text-sm text-muted-foreground">{{ page.slug }}</TableCell>
            <TableCell>
              <Badge :variant="page.status === 'published' ? 'default' : 'secondary'">
                {{ page.status }}
              </Badge>
            </TableCell>
            <TableCell class="text-muted-foreground">v{{ page.version }}</TableCell>
            <TableCell>
              <div class="flex items-center gap-1">
                <Button variant="ghost" size="icon" class="h-7 w-7"
                  @click="router.push(`/projects/${projectId}/pages/${page.id}/edit`)">
                  <Pencil class="h-3.5 w-3.5" />
                </Button>
                <Button variant="ghost" size="icon" class="h-7 w-7"
                  v-if="page.status === 'draft'"
                  @click="publishPage(page.id)">
                  <Send class="h-3.5 w-3.5" />
                </Button>
                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button variant="ghost" size="icon" class="h-7 w-7 text-destructive hover:text-destructive">
                      <Trash2 class="h-3.5 w-3.5" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete page?</AlertDialogTitle>
                      <AlertDialogDescription>
                        "{{ page.title }}" will be permanently deleted along with all its sections.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction @click="deletePage(page.id)">Delete</AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  </div>
</template>
