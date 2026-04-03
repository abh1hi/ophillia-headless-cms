<script setup lang="ts">
import { ref, computed, watch, onUnmounted } from 'vue'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import type { FieldSchema } from '@/components/SectionFormEditor.vue'
import {
  Monitor, Smartphone, RefreshCw, ExternalLink, Wifi, WifiOff,
  Image as ImageIcon, Link, Type, Hash, ToggleLeft, Code2, Eye
} from 'lucide-vue-next'

// ─── Props ────────────────────────────────────────────────────────────────────
const props = defineProps<{
  sectionId: string
  data: Record<string, unknown>
  fields: FieldSchema[]
  pageSlug?: string
}>()

// ─── Settings ─────────────────────────────────────────────────────────────────
const STORAGE_KEY = 'ophillia:preview-site-url'
const siteUrl     = ref(localStorage.getItem(STORAGE_KEY) || '')
const editingUrl  = ref(false)
const urlDraft    = ref(siteUrl.value)

function saveUrl() {
  siteUrl.value = urlDraft.value.replace(/\/$/, '')
  localStorage.setItem(STORAGE_KEY, siteUrl.value)
  editingUrl.value = false
  // Reload iframe with new URL
  if (iframeSrc.value) iframeKey.value++
}

// ─── Viewport toggle ──────────────────────────────────────────────────────────
const viewport = ref<'desktop' | 'mobile'>('desktop')

// ─── Iframe state ─────────────────────────────────────────────────────────────
const iframeEl     = ref<HTMLIFrameElement | null>(null)
const iframeKey    = ref(0)
const iframeReady  = ref(false)
const iframeError  = ref(false)

const iframeSrc = computed(() => {
  if (!siteUrl.value) return ''
  const slug = props.pageSlug || 'home'
  return `${siteUrl.value}/${slug}`
})

// Send section data updates to the iframe via postMessage
function pushToIframe() {
  if (!iframeEl.value?.contentWindow || !iframeReady.value) return
  // Deep-clone via JSON to strip Vue reactive Proxy — postMessage uses structured clone
  // which cannot serialize Proxy objects.
  const plainData = JSON.parse(JSON.stringify(props.data ?? {}))
  iframeEl.value.contentWindow.postMessage({
    type: 'ophillia:section-update',
    sectionId: props.sectionId,
    data: plainData,
  }, '*')
}

// Watch for data changes and push to iframe
watch(() => props.data, pushToIframe, { deep: true })

// Listen for messages from iframe
function onMessage(event: MessageEvent) {
  if (event.data?.type === 'ophillia:ready' || event.data?.type === 'ophillia:pong') {
    iframeReady.value = true
    pushToIframe()
  }
}

window.addEventListener('message', onMessage)
onUnmounted(() => window.removeEventListener('message', onMessage))

function handleIframeLoad() {
  iframeError.value = false
  // Ping the iframe to see if the bridge is loaded
  setTimeout(() => {
    iframeEl.value?.contentWindow?.postMessage({ type: 'ophillia:ping' }, '*')
  }, 500)
}

function handleIframeError() {
  iframeError.value = true
  iframeReady.value = false
}

function reloadIframe() {
  iframeReady.value = false
  iframeKey.value++
}

// ─── Inline field renderers ───────────────────────────────────────────────────
const fieldIcons: Record<string, unknown> = {
  text: Type, richtext: Type, number: Hash,
  boolean: ToggleLeft, image: ImageIcon, url: Link,
  select: Type, json: Code2,
}
</script>

<template>
  <div class="flex flex-col h-full space-y-3">

    <!-- ── Toolbar ─────────────────────────────────────────────────── -->
    <div class="flex items-center gap-2 flex-wrap shrink-0">

      <!-- Connection status -->
      <Badge
        class="gap-1.5 text-xs"
        :class="iframeReady
          ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200'
          : 'bg-muted text-muted-foreground border-border'"
      >
        <Wifi v-if="iframeReady" class="h-3 w-3" />
        <WifiOff v-else class="h-3 w-3" />
        {{ iframeReady ? 'Live Connected' : 'Not connected' }}
      </Badge>

      <!-- Viewport toggles -->
      <div class="flex items-center rounded-lg border p-0.5 bg-muted/30 ml-auto">
        <button
          class="p-1.5 rounded-md transition-colors"
          :class="viewport === 'desktop' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
          @click="viewport = 'desktop'"
          title="Desktop preview"
        >
          <Monitor class="h-3.5 w-3.5" />
        </button>
        <button
          class="p-1.5 rounded-md transition-colors"
          :class="viewport === 'mobile' ? 'bg-background shadow-sm text-foreground' : 'text-muted-foreground hover:text-foreground'"
          @click="viewport = 'mobile'"
          title="Mobile preview"
        >
          <Smartphone class="h-3.5 w-3.5" />
        </button>
      </div>

      <Button type="button" variant="ghost" size="icon" class="h-7 w-7" @click="reloadIframe" title="Reload preview">
        <RefreshCw class="h-3.5 w-3.5" />
      </Button>
      <Button
        v-if="iframeSrc"
        type="button"
        variant="ghost"
        size="icon"
        class="h-7 w-7"
        :as="'a'"
        :href="iframeSrc"
        target="_blank"
        title="Open in new tab"
      >
        <ExternalLink class="h-3.5 w-3.5" />
      </Button>
    </div>

    <!-- ── Site URL config ─────────────────────────────────────────── -->
    <div v-if="editingUrl || !siteUrl" class="flex gap-2">
      <Input
        v-model="urlDraft"
        placeholder="http://localhost:3000"
        class="font-mono text-xs h-8 flex-1"
        @keyup.enter="saveUrl"
      />
      <Button size="sm" class="h-8" @click="saveUrl">Connect</Button>
      <Button v-if="siteUrl" size="sm" variant="ghost" class="h-8" @click="editingUrl = false">Cancel</Button>
    </div>
    <div v-else class="flex items-center gap-2">
      <p class="text-xs text-muted-foreground font-mono truncate flex-1">{{ iframeSrc }}</p>
      <button class="text-xs text-primary hover:underline shrink-0" @click="editingUrl = true; urlDraft = siteUrl">Change</button>
    </div>

    <!-- ── Main Preview Area ───────────────────────────────────────── -->
    <div class="flex-1 min-h-0 rounded-xl border bg-muted/20 overflow-hidden flex flex-col items-center py-4">

      <!-- Iframe mode -->
      <div
        v-if="siteUrl"
        class="relative transition-all duration-300 h-full rounded-lg overflow-hidden shadow-sm border border-border bg-white"
        :class="viewport === 'mobile' ? 'w-[375px]' : 'w-full'"
      >
        <iframe
          v-if="iframeSrc"
          ref="iframeEl"
          :key="iframeKey"
          :src="iframeSrc"
          class="w-full h-full border-0"
          sandbox="allow-same-origin allow-scripts allow-forms allow-popups"
          @load="handleIframeLoad"
          @error="handleIframeError"
        />

        <!-- Connection overlay while loading -->
        <div
          v-if="!iframeReady && !iframeError"
          class="absolute inset-0 bg-background/80 backdrop-blur-sm flex flex-col items-center justify-center gap-3"
        >
          <div class="h-6 w-6 rounded-full border-2 border-primary border-t-transparent animate-spin" />
          <p class="text-xs text-muted-foreground">Connecting to preview…</p>
        </div>

        <!-- Error state -->
        <div v-if="iframeError" class="absolute inset-0 bg-background flex flex-col items-center justify-center gap-3 p-6 text-center">
          <WifiOff class="h-8 w-8 text-muted-foreground opacity-40" />
          <p class="text-sm font-medium">Cannot connect to site</p>
          <p class="text-xs text-muted-foreground">Make sure your site is running at <code class="bg-muted px-1 rounded">{{ siteUrl }}</code></p>
          <Button size="sm" variant="outline" @click="reloadIframe">
            <RefreshCw class="h-3.5 w-3.5 mr-1.5" />Retry
          </Button>
        </div>
      </div>

      <!-- No URL configured → fallback Inline Render -->
      <div v-else class="w-full h-full overflow-y-auto p-4 space-y-4">
        <div class="flex items-center gap-2 pb-2 border-b">
          <Eye class="h-4 w-4 text-muted-foreground" />
          <p class="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Inline Preview</p>
          <Badge variant="outline" class="text-xs ml-auto">No site URL configured</Badge>
        </div>

        <div v-if="!fields.length" class="text-center py-8 text-muted-foreground text-sm">
          No fields to preview.
        </div>

        <div v-for="field in fields" :key="field.name" class="space-y-1.5">
          <div class="flex items-center gap-1.5">
            <component :is="fieldIcons[field.type]" class="h-3 w-3 text-muted-foreground" />
            <p class="text-[10px] font-semibold text-muted-foreground uppercase tracking-widest">{{ field.name }}</p>
          </div>

          <!-- image -->
          <img
            v-if="field.type === 'image' && data[field.name]"
            :src="String(data[field.name])"
            class="w-full rounded-lg object-cover max-h-48"
          />
          <div v-else-if="field.type === 'image'" class="w-full h-24 rounded-lg bg-muted/50 border border-dashed flex items-center justify-center">
            <ImageIcon class="h-6 w-6 text-muted-foreground opacity-30" />
          </div>

          <!-- richtext HTML -->
          <div
            v-else-if="field.type === 'richtext'"
            class="prose prose-sm dark:prose-invert max-w-none rounded-lg border p-3 bg-background text-sm leading-relaxed"
            v-html="String(data[field.name] || '<em class=\'text-muted-foreground\'>Empty</em>')"
          />

          <!-- boolean toggle -->
          <div v-else-if="field.type === 'boolean'">
            <Badge :class="data[field.name] ? 'bg-emerald-500/10 text-emerald-600 border-emerald-200' : 'bg-muted text-muted-foreground'">
              {{ data[field.name] ? '✓ Enabled' : '✗ Disabled' }}
            </Badge>
          </div>

          <!-- url -->
          <a
            v-else-if="field.type === 'url' && data[field.name]"
            :href="String(data[field.name])"
            target="_blank"
            class="flex items-center gap-1 text-sm text-primary hover:underline font-mono break-all"
          >
            <Link class="h-3 w-3 shrink-0" />{{ data[field.name] }}
          </a>

          <!-- number -->
          <p v-else-if="field.type === 'number'" class="text-3xl font-bold tabular-nums">
            {{ data[field.name] ?? '—' }}
          </p>

          <!-- json -->
          <pre v-else-if="field.type === 'json'" class="text-xs bg-muted/50 rounded-lg border p-3 overflow-x-auto">{{ JSON.stringify(data[field.name] ?? {}, null, 2) }}</pre>

          <!-- text / select fallback -->
          <p v-else class="text-sm text-foreground leading-relaxed">
            {{ data[field.name] || '—' }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
