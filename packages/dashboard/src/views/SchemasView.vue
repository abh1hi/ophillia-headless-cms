<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { schemasApi } from '@/api/schemas'
import type { SectionSchema } from '@/api/schemas'

import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Loader2, Plus, Pencil, Layers, Search, Tag } from 'lucide-vue-next'
import DirectorySidebar from '@/components/DirectorySidebar.vue'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'

const route = useRoute()
const router = useRouter()
const projectId = route.params.projectId as string

const schemas = ref<SectionSchema[]>([])
const loading = ref(true)
const search = ref('')
const selectedCategory = ref<string | null>(null)
const sidebarSearch = ref('')
const extraCategories = ref<string[]>([])

const categories = computed(() => {
  const counts: Record<string, number> = {}
  schemas.value.forEach(s => {
    // Assuming category is in meta or name prefix for now
    const cat = (s.meta as any)?.category || 'General'
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
  schemas.value.filter(s => {
    const matchesSearch = s.name.toLowerCase().includes(search.value.toLowerCase()) ||
                         s.slug.toLowerCase().includes(search.value.toLowerCase())
    
    const schemaCat = (s.meta as any)?.category || 'General'
    const matchesCategory = selectedCategory.value ? schemaCat === selectedCategory.value : true
    
    return matchesSearch && matchesCategory
  })
)

onMounted(async () => {
  try {
    const result = await schemasApi.list(projectId)
    schemas.value = result.items
  } catch (err) {
    console.error('Failed to load schemas', err)
  } finally {
    loading.value = false
  }
})

function openNewSchema() {
  router.push({ name: 'schema-new', params: { projectId } })
}

function openEdit(schema: SectionSchema) {
  router.push({ name: 'schema-edit', params: { projectId, schemaId: schema.id } })
}

function handleAddCategory() {
  const name = prompt('Enter new category name:')
  if (name && !categories.value.find(c => c.label.toLowerCase() === name.toLowerCase())) {
    extraCategories.value.push(name)
    selectedCategory.value = name
  }
}
</script>

<template>
  <div class="flex h-full overflow-hidden bg-background">
    <!-- Categories Sidebar -->
    <DirectorySidebar 
      title="Schema Categories"
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
            <h1 class="text-2xl font-bold tracking-tight">Schemas</h1>
            <p class="text-sm text-muted-foreground mt-1 text-balance">
              Define the structural architecture for your project sections.
            </p>
          </div>
          <div class="flex items-center gap-3">
             <div class="relative w-48 lg:w-72 group">
                <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
                <Input 
                  v-model="search" 
                  placeholder="Search schemas..." 
                  class="pl-11 pr-11 h-10 text-sm bg-muted/10 border-border/50 focus-visible:ring-primary/20 transition-all rounded-xl hover:bg-muted/20" 
                />
                <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 border rounded-md bg-background/50 text-[10px] font-mono font-medium text-muted-foreground/40 uppercase tracking-widest pointer-events-none group-focus-within:border-primary/20 transition-colors">
                   <span class="text-[8px]">⌘</span>K
                </div>
             </div>
             <Button @click="openNewSchema" class="shadow-sm">
                <Plus class="h-4 w-4 mr-2" />
                New Schema
             </Button>
          </div>
        </div>

        <Separator class="opacity-50" />

        <!-- Loading -->
        <div v-if="loading" class="flex flex-col items-center justify-center py-24 gap-3 text-muted-foreground">
          <Loader2 class="h-6 w-6 animate-spin" />
          <span class="text-xs font-medium">Architecting view...</span>
        </div>

        <!-- Ready State -->
        <div v-else>
          <!-- Empty state -->
          <div
            v-if="filtered.length === 0"
            class="flex flex-col items-center justify-center py-20 text-center border-2 border-dashed rounded-2xl bg-muted/5 mt-4"
          >
            <div class="rounded-full bg-background border p-4 mb-4 shadow-sm">
              <Layers class="h-8 w-8 text-muted-foreground/40" />
            </div>
            <h3 class="text-sm font-bold mb-1">
              {{ search || selectedCategory ? 'No schemas found' : 'Ready to build' }}
            </h3>
            <p class="text-xs text-muted-foreground mb-6 max-w-sm leading-relaxed">
              {{ search || selectedCategory
                ? 'Try adjusting your filters or search terms to find the right template.'
                : 'Schemas act as blueprints for your website sections. Create your first one to start.' }}
            </p>
            <Button v-if="!search && !selectedCategory" @click="openNewSchema" class="shadow-sm">
              <Plus class="h-4 w-4 mr-2" />Create First Schema
            </Button>
          </div>

          <!-- Schema Grid -->
          <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <article
              v-for="schema in filtered"
              :key="schema.id"
              class="group relative flex flex-col gap-4 rounded-2xl border bg-card p-6 shadow-sm hover:shadow-xl hover:border-primary/20 transition-all duration-300 overflow-hidden"
            >
              <!-- Top status strip -->
              <div
                class="absolute top-0 left-0 w-full h-1"
                :class="schema.status === 'active' ? 'bg-emerald-500' : 'bg-zinc-400'"
              />

              <div class="flex flex-col gap-4 flex-1">
                <!-- Header: name + edit -->
                <div class="flex items-start justify-between gap-3">
                  <div class="min-w-0 flex-1">
                    <h2 class="font-bold text-sm leading-tight truncate group-hover:text-primary transition-colors" :title="schema.name">
                      {{ schema.name }}
                    </h2>
                    <code class="text-[10px] text-muted-foreground mt-1.5 block truncate bg-muted/50 w-fit px-1.5 py-0.5 rounded font-mono">{{ schema.slug }}</code>
                  </div>
                  <Button
                    variant="outline"
                    size="icon"
                    class="h-8 w-8 rounded-lg shrink-0 text-muted-foreground group-hover:text-primary group-hover:border-primary/20 transition-all duration-200"
                    @click="openEdit(schema)"
                  >
                    <Pencil class="h-3.5 w-3.5" />
                  </Button>
                </div>

                <!-- Fields Preview -->
                <div class="flex-1">
                  <div class="flex items-center gap-2 mb-2">
                    <Layers class="h-3 w-3 text-muted-foreground/60" />
                    <span class="text-[10px] uppercase font-bold tracking-widest text-muted-foreground/60">Definition</span>
                  </div>
                  <div v-if="schema.fields_schema?.length" class="flex flex-wrap gap-1">
                    <Badge
                      v-for="field in schema.fields_schema.slice(0, 4)"
                      :key="field.name"
                      variant="secondary"
                      class="text-[9px] px-2 py-0 border-0 bg-secondary/50 font-medium"
                    >
                      {{ field.name }}
                    </Badge>
                    <span v-if="schema.fields_schema.length > 4" class="text-[10px] text-muted-foreground self-center ml-1">
                      +{{ schema.fields_schema.length - 4 }} more
                    </span>
                  </div>
                  <p v-else class="text-[11px] text-muted-foreground italic">Static section (no fields)</p>
                </div>

                <!-- Footer -->
                <div class="flex items-center justify-between border-t border-border/50 pt-4">
                  <div class="flex items-center gap-1.5">
                    <div class="w-1.5 h-1.5 rounded-full" :class="schema.status === 'active' ? 'bg-emerald-500' : 'bg-muted-foreground/30'" />
                    <span class="text-[10px] font-bold uppercase tracking-tight text-muted-foreground">{{ schema.status }}</span>
                  </div>
                  <Badge variant="outline" class="text-[9px] px-1.5 py-0 bg-muted/20 border-border/50">{{ (schema.meta as any)?.category || 'General' }}</Badge>
                </div>
              </div>
            </article>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
