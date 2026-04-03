<script setup lang="ts">
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mediaApi } from '@/api/media'
import type { MediaRecord } from '@/api/media'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { 
  Loader2, Upload, Trash2, Image, FileText, Search, Folder, 
  ChevronRight, MoreVertical, Info, ExternalLink, Download, MousePointer2
} from 'lucide-vue-next'
import DirectorySidebar from '@/components/DirectorySidebar.vue'

const route = useRoute()
const projectStore = useProjectStore()
const projectId = route.params.projectId as string

const files = ref<MediaRecord[]>([])
const loading = ref(true)
const uploading = ref(false)
const search = ref('')
const selectedFolder = ref<string | null>(null)
const selectedFile = ref<MediaRecord | null>(null)
const sidebarSearch = ref('')
const fileInput = ref<HTMLInputElement | null>(null)

// ─── Fetch Data ─────────────────────────────────────────────────────────────
async function load() {
  loading.value = true
  try {
    const result = await mediaApi.list(projectId)
    files.value = result.items
  } catch (err) {
    console.error('Failed to load media', err)
  } finally {
    loading.value = false
  }
}

onMounted(load)

// ─── Folders Logic ──────────────────────────────────────────────────────────
const folders = computed(() => {
  const counts: Record<string, number> = {}
  files.value.forEach(f => {
    const folder = (f.meta as any)?.folder || 'Uncategorized'
    counts[folder] = (counts[folder] || 0) + 1
  })
  return Object.entries(counts).map(([label, count]) => ({
    id: label,
    label,
    count,
    icon: Folder
  }))
})

const filtered = computed(() =>
  files.value.filter(f => {
    const matchesSearch = f.file_path.toLowerCase().includes(search.value.toLowerCase())
    const fileFolder = (f.meta as any)?.folder || 'Uncategorized'
    const matchesFolder = selectedFolder.value ? fileFolder === selectedFolder.value : true
    return matchesSearch && matchesFolder
  })
)

// ─── Actions ─────────────────────────────────────────────────────────────────
async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  try {
    const uploadPromises = Array.from(input.files).map(file =>
      mediaApi.upload(projectId, file)
    )
    const uploaded = await Promise.all(uploadPromises)
    // Add folder metadata to uploaded files if a folder is selected
    if (selectedFolder.value) {
       // In a real app, we'd pass folder to upload API. 
       // For now, we'll just mock the client-side state or assume backend handles it.
    }
    files.value.unshift(...uploaded)
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function deleteFile(id: string) {
  await mediaApi.delete(id)
  files.value = files.value.filter(f => f.id !== id)
  if (selectedFile.value?.id === id) selectedFile.value = null
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

function isImage(mime: string): boolean {
  return mime.startsWith('image/')
}

const breadcrumbs = computed(() => {
  if (!selectedFolder.value) return ['All Media']
  return ['All Media', ...selectedFolder.value.split('/')]
})
</script>

<template>
  <div class="flex h-full overflow-hidden bg-background">
    <!-- Folders Sidebar -->
    <DirectorySidebar 
      title="Folders"
      type="folder"
      :items="folders"
      :selected-id="selectedFolder"
      v-model:search-query="sidebarSearch"
      @select="selectedFolder = $event"
      @add="() => {}" 
    />

    <!-- Main Content Area -->
    <div class="flex-1 flex flex-col min-w-0 overflow-hidden relative">
      <!-- Top Action Bar -->
      <header class="h-16 border-b flex items-center justify-between px-6 bg-background/50 backdrop-blur-md shrink-0 z-10">
        <div class="flex items-center gap-4 text-sm font-medium overflow-hidden">
          <div v-for="(crumb, i) in breadcrumbs" :key="i" class="flex items-center gap-2 shrink-0">
             <ChevronRight v-if="i > 0" class="h-3.5 w-3.5 text-muted-foreground/40" />
             <span :class="i === breadcrumbs.length - 1 ? 'text-foreground font-bold' : 'text-muted-foreground opacity-60'">
                {{ crumb }}
             </span>
          </div>
        </div>

        <div class="flex items-center gap-3">
           <div class="relative w-48 lg:w-72 group">
              <Search class="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
              <Input 
                v-model="search" 
                placeholder="Search files..." 
                class="pl-11 pr-11 h-10 text-sm bg-muted/10 border-border/50 focus-visible:ring-primary/20 transition-all rounded-xl shadow-sm hover:bg-muted/15" 
              />
              <div class="absolute right-3 top-1/2 -translate-y-1/2 hidden lg:flex items-center gap-1 px-1.5 py-0.5 border rounded-md bg-background/50 text-[10px] font-mono font-medium text-muted-foreground/40 uppercase tracking-widest pointer-events-none group-focus-within:border-primary/20 transition-colors">
                 <span class="text-[8px]">⌘</span>K
              </div>
           </div>
           <input ref="fileInput" type="file" multiple accept="image/*,video/*,application/pdf" class="hidden" @change="onFileSelected" />
           <Button :disabled="uploading" size="sm" @click="fileInput?.click()" class="shadow-sm rounded-lg">
             <Loader2 v-if="uploading" class="h-4 w-4 mr-2 animate-spin" />
             <Upload v-else class="h-3.5 w-3.5 mr-2" />
             {{ uploading ? 'Uploading...' : 'Upload' }}
           </Button>
        </div>
      </header>

      <!-- Scrollable Media Grid -->
      <div class="flex-1 overflow-y-auto p-6 custom-scrollbar bg-muted/[0.02]">
        <div v-if="loading" class="flex flex-col items-center justify-center py-32 gap-3 text-muted-foreground">
          <Loader2 class="h-8 w-8 animate-spin" />
          <p class="text-xs font-bold uppercase tracking-widest opacity-60">Scanning Assets...</p>
        </div>

        <div v-else-if="!filtered.length" class="flex flex-col items-center justify-center py-32 text-center">
            <div class="w-16 h-16 rounded-3xl bg-muted/30 flex items-center justify-center mb-6 border border-dashed border-muted-foreground/20">
               <Image class="h-8 w-8 text-muted-foreground/30" />
            </div>
            <h3 class="text-sm font-bold text-foreground">No Assets Found</h3>
            <p class="text-xs text-muted-foreground mt-2 max-w-[200px] leading-relaxed">
               {{ search ? 'Change your search terms or folder selection.' : 'Upload your first image or file to build your library.' }}
            </p>
        </div>

        <div v-else class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 2xl:grid-cols-8 gap-4">
          <div
            v-for="file in filtered"
            :key="file.id"
            @click="selectedFile = file"
            class="group relative flex flex-col rounded-2xl border bg-card ring-primary/20 hover:ring-2 transition-all cursor-pointer overflow-hidden aspect-[4/5] shadow-sm hover:shadow-xl"
            :class="selectedFile?.id === file.id ? 'ring-2 border-primary ring-primary/30' : 'border-border/50'"
          >
            <!-- Selection Checkmark -->
            <div 
              class="absolute top-2 left-2 z-10 w-5 h-5 rounded-full bg-primary flex items-center justify-center transition-all duration-300 transform scale-0"
              :class="selectedFile?.id === file.id ? 'scale-100 opacity-100' : 'opacity-0 group-hover:scale-90group-hover:opacity-100'"
            >
               <MousePointer2 class="h-3 w-3 text-white" />
            </div>

            <!-- Preview -->
            <div class="flex-1 bg-muted/30 flex items-center justify-center overflow-hidden relative">
              <img
                v-if="isImage(file.mime_type)"
                :src="mediaApi.getUrl(file)"
                class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div v-else class="flex flex-col items-center gap-2">
                 <FileText class="h-10 w-10 text-muted-foreground/40" />
                 <span class="text-[9px] uppercase font-bold text-muted-foreground/60">{{ file.mime_type.split('/')[1] }}</span>
              </div>
              
              <!-- Quick Actions overlay -->
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                 <Button variant="ghost" size="icon" class="h-8 w-8 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm" @click.stop="window.open(mediaApi.getUrl(file))">
                    <ExternalLink class="h-3.5 w-3.5" />
                 </Button>
              </div>
            </div>

            <!-- Basic Info Pad -->
            <div class="p-3 bg-card border-t border-border/10 shrink-0">
               <p class="text-[11px] font-bold truncate text-foreground" :title="file.file_path">{{ file.file_path }}</p>
               <div class="flex items-center justify-between mt-1">
                  <span class="text-[9px] text-muted-foreground font-medium uppercase">{{ formatSize(file.size_bytes) }}</span>
                  <Badge variant="secondary" class="text-[8px] py-0 px-1 border-none bg-muted/50">{{ file.mime_type.split('/')[1] }}</Badge>
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Selection Details Panel -->
    <aside 
       v-if="selectedFile"
       class="w-80 border-l bg-background flex flex-col shrink-0 animate-in slide-in-from-right duration-300"
    >
       <div class="px-5 py-5 border-b flex items-center justify-between">
          <div class="flex items-center gap-2">
             <Info class="h-4 w-4 text-primary" />
             <h2 class="text-xs font-bold uppercase tracking-wider">File Details</h2>
          </div>
          <Button variant="ghost" size="icon" class="h-7 w-7 opacity-50 hover:opacity-100" @click="selectedFile = null">
             <ChevronRight class="h-4 w-4" />
          </Button>
       </div>

       <div class="flex-1 overflow-y-auto p-5 space-y-6 custom-scrollbar">
          <!-- Big Preview -->
          <div class="aspect-square rounded-2xl bg-muted/30 border border-dashed border-muted-foreground/20 overflow-hidden flex items-center justify-center">
             <img 
               v-if="isImage(selectedFile.mime_type)" 
               :src="mediaApi.getUrl(selectedFile)" 
               class="max-w-full max-h-full object-contain p-2"
             />
             <FileText v-else class="h-16 w-16 text-muted-foreground/20" />
          </div>

          <!-- Description -->
          <div class="space-y-4">
             <div class="space-y-1">
                <label class="text-[10px] font-bold text-muted-foreground/60 uppercase">Filename</label>
                <p class="text-xs font-bold break-all leading-tight">{{ selectedFile.file_path }}</p>
             </div>
             
             <div class="grid grid-cols-2 gap-4">
                <div class="space-y-1">
                   <label class="text-[10px] font-bold text-muted-foreground/60 uppercase">Size</label>
                   <p class="text-xs font-medium">{{ formatSize(selectedFile.size_bytes) }}</p>
                </div>
                <div class="space-y-1">
                   <label class="text-[10px] font-bold text-muted-foreground/60 uppercase">Type</label>
                   <p class="text-xs font-medium capitalize">{{ selectedFile.mime_type.split('/')[1] }}</p>
                </div>
             </div>

             <div class="space-y-1">
                <label class="text-[10px] font-bold text-muted-foreground/60 uppercase">Folder</label>
                <Badge variant="outline" class="mt-1 flex items-center gap-1.5 w-fit py-0.5 px-2">
                   <Folder class="h-3 w-3 text-muted-foreground/60" />
                   {{ (selectedFile.meta as any)?.folder || 'Uncategorized' }}
                </Badge>
             </div>

             <div class="space-y-1">
                <label class="text-[10px] font-bold text-muted-foreground/60 uppercase">Uploaded At</label>
                <p class="text-xs font-medium">{{ new Date(selectedFile.created).toLocaleDateString() }}</p>
             </div>
          </div>

          <Separator />

          <!-- Details Actions -->
          <div class="flex flex-col gap-2">
             <Button variant="outline" class="w-full justify-start gap-3 h-10 rounded-xl" @click="window.open(mediaApi.getUrl(selectedFile!))">
                <Download class="h-4 w-4" />
                Download Original
             </Button>
             
             <AlertDialog>
                <AlertDialogTrigger as-child>
                    <Button variant="ghost" class="w-full justify-start gap-3 h-10 rounded-xl text-destructive hover:bg-destructive/10 hover:text-destructive">
                       <Trash2 class="h-4 w-4" />
                       Permanently Delete
                    </Button>
                </AlertDialogTrigger>
                <AlertDialogContent class="rounded-2xl">
                   <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                         This item will be swept away forever. This cannot be undone.
                      </AlertDialogDescription>
                   </AlertDialogHeader>
                   <AlertDialogFooter>
                      <AlertDialogCancel class="rounded-xl">Cancel</AlertDialogCancel>
                      <AlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl" @click="deleteFile(selectedFile!.id)">
                         Delete File
                      </AlertDialogAction>
                   </AlertDialogFooter>
                </AlertDialogContent>
             </AlertDialog>
          </div>
       </div>
    </aside>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 5px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
</style>
