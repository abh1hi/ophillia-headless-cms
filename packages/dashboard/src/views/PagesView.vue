<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { pagesApi } from '@/api/pages'
import type { Page } from '@/api/pages'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Loader2, Plus, Pencil, Trash2, Send, FileText, Search, FileEdit, Tag } from 'lucide-vue-next'
import DirectorySidebar from '@/components/DirectorySidebar.vue'

const router = useRouter()
const route = useRoute()
const projectId = route.params.projectId as string

const pages = ref<Page[]>([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref<string | null>(null)
const sidebarSearch = ref('')
const extraCategories = ref<string[]>([])

const categories = computed(() => {
  const counts: Record<string, number> = {}
  pages.value.forEach(p => {
    const cat = p.meta?.category || 'Uncategorized'
    counts[cat] = (counts[cat] || 0) + 1
  })
  
  // Merge with extra categories
  extraCategories.value.forEach(cat => {
    if (!counts[cat]) counts[cat] = 0
  })

  return Object.entries(counts).map(([label, count]) => ({
    id: label,
    label,
    count,
    icon: Tag
  }))
})

const filtered = computed(() =>
  pages.value.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(search.value.toLowerCase()) ||
                         p.slug.toLowerCase().includes(search.value.toLowerCase())
    
    const pageCat = p.meta?.category || 'Uncategorized'
    const matchesCategory = selectedCategory.value ? pageCat === selectedCategory.value : true
    
    return matchesSearch && matchesCategory
  })
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

async function unpublishPage(id: string) {
  const updated = await pagesApi.unpublish(id)
  const idx = pages.value.findIndex(p => p.id === id)
  if (idx !== -1) pages.value[idx] = updated
}

function handleAddCategory() {
  const name = prompt('Enter new category name:')
  if (name && !categories.value.find(c => c.label.toLowerCase() === name.toLowerCase())) {
    extraCategories.value.push(name)
    selectedCategory.value = name
  }
}

onMounted(load)
</script>

<template>
  <div class="flex h-full overflow-hidden bg-background">
    <!-- Categories Sidebar -->
    <DirectorySidebar 
      title="Categories"
      type="category"
      :items="categories"
      :selected-id="selectedCategory"
      v-model:search-query="sidebarSearch"
      @select="selectedCategory = $event"
      @add="handleAddCategory" 
    />

    <!-- Main Content -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden">
      <div class="p-6 md:p-8 space-y-6 overflow-y-auto h-full custom-scrollbar">
        
        <!-- Header -->
        <div class="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 class="text-2xl font-bold tracking-tight">Pages</h1>
            <p class="text-sm text-muted-foreground mt-1">
              Manage and organize your project's digital content.
            </p>
          </div>
          <div class="flex items-center gap-3">
             <div class="relative w-full md:w-72 group">
                <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                <Input 
                  v-model="search" 
                  placeholder="Search pages..." 
                  class="pl-11 pr-11 h-10 text-sm bg-muted/10 border-border/50 focus-visible:ring-primary/20 transition-all rounded-xl hover:bg-muted/20" 
                />
                <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 border rounded-md bg-background/50 text-[10px] font-mono font-medium text-muted-foreground/40 uppercase tracking-widest pointer-events-none group-focus-within:border-primary/20 transition-colors">
                   <span class="text-[8px]">⌘</span>K
                </div>
             </div>
             <Button @click="router.push(`/projects/${projectId}/pages/new`)" class="shadow-sm">
                <Plus class="h-4 w-4 mr-2" />
                New Page
             </Button>
          </div>
        </div>

        <Separator class="opacity-50" />

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <Loader2 class="h-6 w-6 animate-spin" />
          <span class="text-xs font-medium">Fetching contents...</span>
        </div>

        <!-- Empty state -->
        <div
          v-else-if="filtered.length === 0"
          class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-muted/5 mt-4"
        >
          <div class="rounded-full bg-background border p-4 mb-4 shadow-sm">
            <FileText class="h-8 w-8 text-muted-foreground/40" />
          </div>
          <h3 class="text-sm font-bold mb-1">
            {{ search || selectedCategory ? 'No pages found' : 'Start your journey' }}
          </h3>
          <p class="text-xs text-muted-foreground mb-6 max-w-xs leading-relaxed">
            {{ search || selectedCategory
              ? 'Try adjusting your filters or search terms to find what you need.'
              : 'Create your first page to start building content for this project.' }}
          </p>
          <Button
            v-if="!search && !selectedCategory"
            size="sm"
            @click="router.push(`/projects/${projectId}/pages/new`)"
          >
            <Plus class="h-3.5 w-3.5 mr-1.5" />
            Create Your First Page
          </Button>
        </div>

        <!-- Page cards grid -->
        <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          <article
            v-for="page in filtered"
            :key="page.id"
            class="group relative flex flex-col gap-4 rounded-2xl border bg-card p-5 shadow-sm
                   hover:shadow-lg hover:border-primary/20 transition-all duration-300 overflow-hidden"
          >
            <!-- Coloured status strip -->
            <div
              class="absolute inset-y-0 left-0 w-1"
              :class="page.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'"
            />

            <!-- Category Badge (Top Right) -->
            <div class="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
               <Badge variant="outline" class="text-[9px] bg-background/80 backdrop-blur-sm uppercase tracking-tighter">
                  {{ page.meta?.category || 'General' }}
               </Badge>
            </div>

            <!-- Content -->
            <div class="pl-2 flex flex-col gap-4 flex-1">
              <!-- Title + slug -->
              <div class="min-w-0">
                <h2 class="font-bold text-sm leading-tight truncate group-hover:text-primary transition-colors" :title="page.title">
                  {{ page.title }}
                </h2>
                <p class="text-[10px] text-muted-foreground font-mono mt-1 opacity-60 truncate">/{{ page.slug }}</p>
              </div>

              <!-- Meta Info -->
              <div class="flex items-center justify-between text-[10px] text-muted-foreground border-t border-border/50 pt-3">
                 <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full" :class="page.status === 'published' ? 'bg-emerald-500' : 'bg-amber-400'" />
                    <span class="capitalize font-medium">{{ page.status }}</span>
                 </div>
                 <span class="font-mono">v{{ page.version }}</span>
              </div>

              <!-- Actions -->
              <div class="flex items-center gap-1.5 mt-auto">
                <Button
                  variant="outline"
                  size="sm"
                  class="h-8 gap-1.5 flex-1 text-[11px] font-bold rounded-lg shadow-sm"
                  @click="router.push(`/projects/${projectId}/pages/${page.id}/edit`)"
                >
                  <Pencil class="h-3 w-3" />
                  Edit
                </Button>

                <Button
                  v-if="page.status === 'draft'"
                  variant="outline"
                  size="sm"
                  class="h-8 gap-1.5 flex-1 text-[11px] font-bold rounded-lg shadow-sm text-emerald-600 border-emerald-100 hover:bg-emerald-50"
                  @click="publishPage(page.id)"
                >
                  <Send class="h-3 w-3" />
                  Live
                </Button>

                <Button
                  v-else
                  variant="outline"
                  size="sm"
                  class="h-8 gap-1.5 flex-1 text-[11px] font-bold rounded-lg shadow-sm"
                  @click="unpublishPage(page.id)"
                >
                  <FileEdit class="h-3 w-3" />
                  Draft
                </Button>

                <AlertDialog>
                  <AlertDialogTrigger as-child>
                    <Button variant="ghost" size="icon" class="h-8 w-8 rounded-lg text-muted-foreground hover:text-destructive hover:bg-destructive/10">
                      <Trash2 class="h-3 w-3" />
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent class="rounded-2xl">
                    <AlertDialogHeader>
                      <AlertDialogTitle>Delete "{{ page.title }}"?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently remove this page and all associated sections. This action is irreversible.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel class="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl" @click="deletePage(page.id)">
                        Delete Page
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>
</template>
