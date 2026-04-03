<script setup lang="ts">
import { ref, computed } from 'vue'

// Multi-root component: Button + Sheet — prevent class from trying to auto-inherit
defineOptions({ inheritAttrs: false })
import { versionsApi } from '@/api/versions'
import type { PageVersion } from '@/api/versions'
import type { Page } from '@/api/pages'
import type { Section } from '@/api/sections'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger
} from '@/components/ui/alert-dialog'
import { History, RotateCcw, Trash2, Loader2, Clock } from 'lucide-vue-next'

// ─── Props / Emits ────────────────────────────────────────────────────────────
const props = defineProps<{
  pageId: string
  currentVersion: number
}>()

const emit = defineEmits<{
  (e: 'restore', snapshot: { page: Partial<Page>; sections: Partial<Section>[] }): void
}>()

// ─── State ────────────────────────────────────────────────────────────────────
const open      = ref(false)
const loading   = ref(false)
const versions  = ref<PageVersion[]>([])
const restoring = ref<string | null>(null)

async function fetchVersions() {
  if (!props.pageId) return
  loading.value = true
  try {
    const res = await versionsApi.list(props.pageId)
    versions.value = res.items
  } catch (err) {
    console.error('Failed to fetch versions:', err)
    versions.value = []
  } finally {
    loading.value = false
  }
}

function handleOpen() {
  open.value = true
  fetchVersions()
}

async function handleRestore(v: PageVersion) {
  restoring.value = v.id
  emit('restore', v.snapshot)
  restoring.value = null
  open.value = false
}

async function handleDelete(id: string) {
  await versionsApi.delete(id)
  versions.value = versions.value.filter(v => v.id !== id)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function timeAgo(dateStr: string): string {
  const diff = Date.now() - new Date(dateStr).getTime()
  const mins  = Math.floor(diff / 60000)
  const hours = Math.floor(mins / 60)
  const days  = Math.floor(hours / 24)
  if (mins < 1)    return 'just now'
  if (mins < 60)   return `${mins}m ago`
  if (hours < 24)  return `${hours}h ago`
  return `${days}d ago`
}

function isPublishSnapshot(label: string) {
  return label.startsWith('Published')
}
</script>

<template>
  <!-- Trigger button -->
  <Button type="button" variant="ghost" size="icon" class="h-8 w-8" title="Version history" @click="handleOpen">
    <History class="h-4 w-4" />
  </Button>

  <!-- Sheet drawer -->
  <Sheet :open="open" @update:open="open = $event">
    <SheetContent side="right" class="w-full sm:max-w-sm p-0 flex flex-col">
      <SheetHeader class="px-5 pt-5 pb-4 border-b shrink-0">
        <div class="flex items-center gap-2.5">
          <div class="h-8 w-8 rounded-md bg-amber-500/10 flex items-center justify-center">
            <History class="h-4 w-4 text-amber-500" />
          </div>
          <div>
            <SheetTitle>Version History</SheetTitle>
            <SheetDescription>Restore any previous snapshot</SheetDescription>
          </div>
        </div>
      </SheetHeader>

      <!-- Version list -->
      <div class="flex-1 overflow-y-auto">

        <!-- Loading -->
        <div v-if="loading" class="flex items-center justify-center py-12 gap-2 text-muted-foreground">
          <Loader2 class="h-4 w-4 animate-spin" />
          <span class="text-sm">Loading history…</span>
        </div>

        <!-- Empty -->
        <div v-else-if="!versions.length" class="flex flex-col items-center justify-center py-16 gap-2 text-muted-foreground px-6 text-center">
          <Clock class="h-8 w-8 opacity-30" />
          <p class="text-sm font-medium">No snapshots yet</p>
          <p class="text-xs">Save this page to create your first version.</p>
        </div>

        <!-- List -->
        <ul v-else class="divide-y">
          <li
            v-for="v in versions"
            :key="v.id"
            class="flex items-start gap-3 px-5 py-4 group hover:bg-muted/30 transition-colors"
          >
            <!-- Timeline dot -->
            <div class="mt-1 shrink-0">
              <div
                class="h-2.5 w-2.5 rounded-full mt-0.5"
                :class="v.version_number === currentVersion
                  ? 'bg-primary ring-2 ring-primary/20'
                  : isPublishSnapshot(v.label)
                    ? 'bg-emerald-500'
                    : 'bg-muted-foreground/30'"
              />
            </div>

            <!-- Info -->
            <div class="flex-1 min-w-0">
              <div class="flex items-center gap-2 flex-wrap">
                <p class="text-sm font-medium truncate">{{ v.label }}</p>
                <Badge
                  v-if="v.version_number === currentVersion"
                  class="text-[10px] py-0 px-1.5 bg-primary/10 text-primary border-primary/20"
                >
                  current
                </Badge>
                <Badge
                  v-else-if="isPublishSnapshot(v.label)"
                  class="text-[10px] py-0 px-1.5 bg-emerald-500/10 text-emerald-600 border-emerald-200"
                >
                  published
                </Badge>
              </div>
              <p class="text-xs text-muted-foreground mt-0.5 flex items-center gap-1">
                <Clock class="h-3 w-3" />
                {{ timeAgo(v.created) }}
                · v{{ v.version_number }}
                · {{ v.snapshot.sections?.length ?? 0 }} sections
              </p>
            </div>

            <!-- Actions (visible on hover) -->
            <div class="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
              <!-- Restore -->
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button
                    variant="ghost"
                    size="icon"
                    class="h-7 w-7"
                    :disabled="v.version_number === currentVersion"
                    title="Restore this version"
                  >
                    <RotateCcw v-if="restoring !== v.id" class="h-3.5 w-3.5" />
                    <Loader2 v-else class="h-3.5 w-3.5 animate-spin" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Restore "{{ v.label }}"?</AlertDialogTitle>
                    <AlertDialogDescription>
                      The current unsaved changes will be replaced with this snapshot.
                      You can re-save afterward to create a new version.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction @click="handleRestore(v)">Restore</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>

              <!-- Delete -->
              <AlertDialog>
                <AlertDialogTrigger as-child>
                  <Button variant="ghost" size="icon" class="h-7 w-7 hover:text-destructive" title="Delete version">
                    <Trash2 class="h-3.5 w-3.5" />
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete this version?</AlertDialogTitle>
                    <AlertDialogDescription>
                      "{{ v.label }}" will be permanently deleted and cannot be recovered.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction class="bg-destructive text-destructive-foreground hover:bg-destructive/90" @click="handleDelete(v.id)">
                      Delete
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </li>
        </ul>
      </div>
    </SheetContent>
  </Sheet>
</template>
