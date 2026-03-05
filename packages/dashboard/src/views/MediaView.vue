<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { mediaApi } from '@/api/media'
import type { MediaRecord } from '@/api/media'
import { useProjectStore } from '@/stores/project'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { Loader2, Upload, Trash2, Image, FileText } from 'lucide-vue-next'

const route = useRoute()
const projectStore = useProjectStore()
const projectId = route.params.projectId as string

const files = ref<MediaRecord[]>([])
const loading = ref(true)
const uploading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

onMounted(async () => {
  const result = await mediaApi.list(projectId)
  files.value = result.items
  loading.value = false
})

function formatSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`
}

async function onFileSelected(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  try {
    const uploadPromises = Array.from(input.files).map(file =>
      mediaApi.upload(projectId, file)
    )
    const uploaded = await Promise.all(uploadPromises)
    files.value.unshift(...uploaded)
  } finally {
    uploading.value = false
    input.value = ''
  }
}

async function deleteFile(id: string) {
  await mediaApi.delete(id)
  files.value = files.value.filter(f => f.id !== id)
}

function isImage(mime: string): boolean {
  return mime.startsWith('image/')
}
</script>

<template>
  <div class="p-6 space-y-5">
    <div class="flex items-center justify-between">
      <div>
        <h1 class="text-2xl font-semibold">Media</h1>
        <p class="text-sm text-muted-foreground">Upload and manage project assets</p>
      </div>
      <div>
        <input
          ref="fileInput"
          type="file"
          multiple
          accept="image/*,video/*,application/pdf"
          class="hidden"
          @change="onFileSelected"
        />
        <Button :disabled="uploading" @click="fileInput?.click()">
          <Loader2 v-if="uploading" class="h-4 w-4 mr-2 animate-spin" />
          <Upload v-else class="h-4 w-4 mr-2" />
          {{ uploading ? 'Uploading…' : 'Upload Files' }}
        </Button>
      </div>
    </div>

    <div v-if="loading" class="flex justify-center py-12">
      <Loader2 class="h-6 w-6 animate-spin text-muted-foreground" />
    </div>

    <div v-else-if="!files.length" class="border border-dashed rounded-lg py-16 text-center text-muted-foreground">
      <Upload class="h-10 w-10 mx-auto mb-3 opacity-40" />
      <p class="text-sm font-medium">No media files yet</p>
      <p class="text-xs mt-1">Click "Upload Files" to add assets</p>
    </div>

    <div v-else class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4">
      <div
        v-for="file in files"
        :key="file.id"
        class="group relative rounded-lg border overflow-hidden bg-muted/30 hover:border-primary transition-colors"
      >
        <!-- Preview -->
        <div class="aspect-square flex items-center justify-center overflow-hidden bg-muted">
          <img
            v-if="isImage(file.mime_type)"
            :src="mediaApi.getUrl(file)"
            :alt="file.file_path"
            class="w-full h-full object-cover"
          />
          <FileText v-else class="h-8 w-8 text-muted-foreground" />
        </div>

        <!-- Info -->
        <div class="p-2 space-y-1">
          <p class="text-xs font-medium truncate" :title="file.file_path">{{ file.file_path }}</p>
          <div class="flex items-center justify-between">
            <Badge variant="outline" class="text-xs py-0">{{ formatSize(file.size_bytes) }}</Badge>
            <AlertDialog>
              <AlertDialogTrigger as-child>
                <Button variant="ghost" size="icon" class="h-6 w-6 text-destructive hover:text-destructive opacity-0 group-hover:opacity-100 transition-opacity">
                  <Trash2 class="h-3 w-3" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete file?</AlertDialogTitle>
                  <AlertDialogDescription>
                    "{{ file.file_path }}" will be permanently deleted and cannot be recovered.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction @click="deleteFile(file.id)">Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
