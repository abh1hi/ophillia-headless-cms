<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import type { Page } from '@/api/pages'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Loader2, Plus, Pencil, Trash2, Send, FileText, Search } from 'lucide-vue-next'

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
  <div class="p-6 max-w-5xl mx-auto space-y-6">

    <!-- Header -->
    <div class="flex items-center justify-between gap-4">
      <div>
        <h1 class="text-2xl font-semibold tracking-tight">Pages</h1>
        <p class="text-sm text-muted-foreground mt-0.5">
          Manage all pages for this project
        </p>
      </div>
      <Button @click="router.push(`/projects/${projectId}/pages/new`)">
        <Plus class="h-4 w-4 mr-2" />
        New Page
      </Button>
    </div>

    <!-- Search -->
    <div class="relative max-w-sm">
      <Search class="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
      <Input v-model="search" placeholder="Search pages…" class="pl-9" />
    </div>

    <!-- Loading -->
    <div v-if="loading" class="flex justify-center py-16">
      <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
    </div>

    <!-- Empty state -->
    <div
      v-else-if="filtered.length === 0"
      class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-xl"
    >
      <div class="rounded-full bg-muted p-4 mb-4">
        <FileText class="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 class="text-sm font-semibold mb-1">
        {{ search ? 'No pages match your search' : 'No pages yet' }}
      </h3>
      <p class="text-sm text-muted-foreground mb-5 max-w-xs">
        {{ search
          ? 'Try a different keyword or clear the search.'
          : 'Create your first page to start building content for this project.' }}
      </p>
      <Button
        v-if="!search"
        size="sm"
        @click="router.push(`/projects/${projectId}/pages/new`)"
      >
        <Plus class="h-3.5 w-3.5 mr-1.5" />
        Create Page
      </Button>
    </div>

    <!-- Page cards grid -->
    <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      <article
        v-for="page in filtered"
        :key="page.id"
        class="relative flex flex-col gap-4 rounded-xl border bg-card p-5 shadow-sm
               hover:shadow-md hover:border-primary/40 transition-all duration-200 overflow-hidden"
      >
        <!-- Coloured left border strip -->
        <div
          class="absolute inset-y-0 left-0 w-1"
          :class="page.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'"
        />

        <!-- Content (padded away from strip) -->
        <div class="pl-3 flex flex-col gap-3 flex-1">

          <!-- Title + badge -->
          <div class="flex items-start justify-between gap-2">
            <div class="min-w-0">
              <h2
                class="font-semibold text-sm leading-snug truncate"
                :title="page.title"
              >
                {{ page.title }}
              </h2>
              <p
                class="text-xs text-muted-foreground font-mono mt-0.5 truncate"
                :title="`/${page.slug}`"
              >
                /{{ page.slug }}
              </p>
            </div>
            <Badge
              class="shrink-0 capitalize text-[11px] px-2 py-0 border"
              :class="page.status === 'published'
                ? 'bg-emerald-500/10 text-emerald-700 border-emerald-300 dark:text-emerald-400 dark:border-emerald-800'
                : 'bg-amber-400/10 text-amber-700 border-amber-300 dark:text-amber-400 dark:border-amber-800'"
            >
              {{ page.status }}
            </Badge>
          </div>

          <!-- Meta -->
          <p class="text-xs text-muted-foreground">
            Version <span class="font-mono font-medium text-foreground">v{{ page.version }}</span>
          </p>

          <!-- Divider -->
          <div class="border-t" />

          <!-- Actions -->
          <div class="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              class="h-8 gap-1.5 flex-1"
              title="Open page editor"
              @click="router.push(`/projects/${projectId}/pages/${page.id}/edit`)"
            >
              <Pencil class="h-3.5 w-3.5" />
              Edit
            </Button>

            <Button
              v-if="page.status === 'draft'"
              variant="outline"
              size="sm"
              class="h-8 gap-1.5 flex-1 text-emerald-700 border-emerald-300
                     hover:bg-emerald-50 hover:text-emerald-800 hover:border-emerald-400
                     dark:text-emerald-400 dark:border-emerald-800 dark:hover:bg-emerald-950"
              title="Publish this page"
              @click="publishPage(page.id)"
            >
              <Send class="h-3.5 w-3.5" />
              Publish
            </Button>

            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button
                  variant="ghost"
                  size="icon"
                  class="h-8 w-8 text-muted-foreground hover:text-destructive hover:bg-destructive/10"
                  title="Delete page"
                >
                  <Trash2 class="h-3.5 w-3.5" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete "{{ page.title }}"?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This will permanently delete the page and all its sections. This action cannot be undone.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    class="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    @click="deletePage(page.id)"
                  >
                    Delete
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </article>
    </div>

  </div>
</template>
