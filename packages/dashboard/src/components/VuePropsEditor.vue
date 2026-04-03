<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { mediaApi } from '@/api/media'
import type { MediaRecord } from '@/api/media'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RichTextEditor from '@/components/RichTextEditor.vue'
import JsonEditorDrawer from '@/components/JsonEditorDrawer.vue'
import CodeFieldEditor from '@/components/CodeFieldEditor.vue'
import type { FieldSchema } from '@/components/SectionFormEditor.vue'
import {
  ImageIcon, Link, Hash, Type, ToggleLeft, List, Code2,
  AlignLeft, Upload, X, Check, FileText, Braces, FileCode
} from 'lucide-vue-next'

const props = defineProps<{
  fields: FieldSchema[]
  modelValue: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, unknown>): void
}>()

const route = useRoute()
const projectId = route.params.projectId as string

function update(name: string, value: unknown) {
  emit('update:modelValue', { ...props.modelValue, [name]: value })
}

// ─── Image picker per field ───────────────────────────────────────────────────
const imagePickerField = ref<string | null>(null)
const mediaList = ref<MediaRecord[]>([])
const mediaLoading = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)
const uploading = ref(false)

async function openImagePicker(fieldName: string) {
  imagePickerField.value = fieldName
  mediaLoading.value = true
  const res = await mediaApi.list(projectId)
  mediaList.value = res.items
  mediaLoading.value = false
}

async function onLocalUpload(e: Event) {
  const input = e.target as HTMLInputElement
  if (!input.files?.length) return
  uploading.value = true
  try {
    const uploaded = await Promise.all(
      Array.from(input.files).map(f => mediaApi.upload(projectId, f))
    )
    mediaList.value.unshift(...uploaded)
  } finally {
    uploading.value = false
    input.value = ''
  }
}

function selectMedia(record: MediaRecord) {
  if (!imagePickerField.value) return
  update(imagePickerField.value, mediaApi.getUrl(record))
  imagePickerField.value = null
}

// ─── URL validation ───────────────────────────────────────────────────────────
function isValidUrl(val: string): boolean {
  if (!val) return true
  try { new URL(val); return true } catch { return false }
}

// ─── Field icons ─────────────────────────────────────────────────────────────
const fieldIcons: Record<string, unknown> = {
  text: Type,
  richtext: AlignLeft,
  number: Hash,
  boolean: ToggleLeft,
  image: ImageIcon,
  url: Link,
  select: List,
  json: Code2,
  markdown: FileText,
  html: FileCode,
  yaml: Braces,
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="fields.length === 0" class="text-sm text-muted-foreground p-4 bg-muted/30 rounded-md border text-center">
      No schema fields defined for this section.
    </div>

    <div v-for="field in fields" :key="field.name" class="rounded-xl border bg-card p-4 space-y-3 shadow-sm">

      <!-- Field Label Row -->
      <div class="flex items-center justify-between">
        <div class="flex items-center gap-2">
          <div class="h-7 w-7 rounded-md flex items-center justify-center"
            :class="{
              'bg-blue-500/10 text-blue-500': ['text','richtext'].includes(field.type),
              'bg-orange-500/10 text-orange-500': field.type === 'number',
              'bg-violet-500/10 text-violet-500': field.type === 'boolean',
              'bg-emerald-500/10 text-emerald-500': field.type === 'image',
              'bg-indigo-500/10 text-indigo-500': field.type === 'url',
              'bg-amber-500/10 text-amber-500': field.type === 'select',
              'bg-purple-500/10 text-purple-500': ['json','html','yaml'].includes(field.type),
              'bg-pink-500/10 text-pink-500': field.type === 'markdown',
            }"
          >
            <component :is="fieldIcons[field.type]" class="h-3.5 w-3.5" />
          </div>
          <Label :for="field.name" class="font-semibold text-sm cursor-pointer">
            {{ field.name }}
            <span v-if="field.required" class="text-destructive ml-0.5">*</span>
          </Label>
        </div>
        <Badge variant="outline" class="text-[10px] font-mono py-0 uppercase tracking-wide">
          {{ field.type }}
        </Badge>
      </div>

      <!-- ── text ─────────────────────────────────────────────────────────── -->
      <template v-if="field.type === 'text'">
        <div class="relative">
          <Input
            :id="field.name"
            :value="(modelValue[field.name] as string) || ''"
            :placeholder="`Enter ${field.name}…`"
            @input="update(field.name, ($event.target as HTMLInputElement).value)"
            class="pr-16"
          />
          <span class="absolute right-3 top-1/2 -translate-y-1/2 text-[11px] text-muted-foreground tabular-nums">
            {{ String(modelValue[field.name] || '').length }}
          </span>
        </div>
      </template>

      <!-- ── richtext ──────────────────────────────────────────────────────── -->
      <template v-else-if="field.type === 'richtext'">
        <RichTextEditor
          :model-value="(modelValue[field.name] as string) || ''"
          @update:model-value="update(field.name, $event)"
        />
      </template>

      <!-- ── number ─────────────────────────────────────────────────────── -->
      <template v-else-if="field.type === 'number'">
        <div class="flex items-center gap-3">
          <input
            type="range"
            min="0"
            max="1000"
            step="1"
            :value="Number(modelValue[field.name] ?? 0)"
            @input="update(field.name, Number(($event.target as HTMLInputElement).value))"
            class="flex-1 h-2 rounded-full accent-primary cursor-pointer"
          />
          <Input
            :id="field.name"
            type="number"
            :value="Number(modelValue[field.name] ?? 0)"
            @input="update(field.name, Number(($event.target as HTMLInputElement).value))"
            class="w-24 text-right font-mono text-sm"
          />
        </div>
      </template>

      <!-- ── boolean (toggle switch) ───────────────────────────────────────── -->
      <template v-else-if="field.type === 'boolean'">
        <button
          type="button"
          class="flex items-center gap-3 group"
          @click="update(field.name, !(modelValue[field.name] as boolean))"
        >
          <!-- Track -->
          <div
            class="relative w-11 h-6 rounded-full border-2 transition-all duration-200"
            :class="modelValue[field.name]
              ? 'bg-primary border-primary'
              : 'bg-muted border-input'"
          >
            <!-- Thumb -->
            <div
              class="absolute top-0.5 left-0.5 h-4 w-4 rounded-full bg-white shadow transition-transform duration-200"
              :class="modelValue[field.name] ? 'translate-x-5' : 'translate-x-0'"
            />
          </div>
          <span class="text-sm font-medium" :class="modelValue[field.name] ? 'text-primary' : 'text-muted-foreground'">
            {{ modelValue[field.name] ? 'Enabled' : 'Disabled' }}
          </span>
        </button>
      </template>

      <!-- ── url ──────────────────────────────────────────────────────────── -->
      <template v-else-if="field.type === 'url'">
        <div class="relative">
          <Link class="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <Input
            :id="field.name"
            type="url"
            :value="(modelValue[field.name] as string) || ''"
            placeholder="https://example.com"
            @input="update(field.name, ($event.target as HTMLInputElement).value)"
            class="pl-9 pr-9 font-mono text-sm"
            :class="!isValidUrl(String(modelValue[field.name] || ''))
              ? 'border-destructive focus-visible:ring-destructive'
              : ''"
          />
          <Check
            v-if="modelValue[field.name] && isValidUrl(String(modelValue[field.name]))"
            class="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-emerald-500"
          />
        </div>
        <p v-if="!isValidUrl(String(modelValue[field.name] || ''))" class="text-xs text-destructive">
          Please enter a valid URL including https://
        </p>
      </template>

      <!-- ── image picker ──────────────────────────────────────────────────── -->
      <template v-else-if="field.type === 'image'">
        <!-- Preview of current value -->
        <div v-if="modelValue[field.name]" class="relative w-full rounded-lg overflow-hidden border aspect-video bg-muted/30 group">
          <img :src="String(modelValue[field.name])" alt="Preview" class="w-full h-full object-cover" />
          <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <Button type="button" size="sm" @click="openImagePicker(field.name)">Change</Button>
            <Button type="button" size="sm" variant="destructive" @click="update(field.name, '')">
              <X class="h-3.5 w-3.5" />
            </Button>
          </div>
        </div>
        <!-- No image yet -->
        <div
          v-else
          @click="openImagePicker(field.name)"
          class="w-full rounded-lg border-2 border-dashed border-border hover:border-primary hover:bg-primary/5 transition-all cursor-pointer aspect-video flex flex-col items-center justify-center gap-2 text-muted-foreground"
        >
          <ImageIcon class="h-8 w-8 opacity-40" />
          <p class="text-xs font-medium">Click to select an image</p>
        </div>

        <!-- Inline image picker panel -->
        <div v-if="imagePickerField === field.name" class="mt-3 rounded-xl border bg-muted/20 p-4 space-y-3">
          <div class="flex items-center justify-between">
            <p class="text-xs font-semibold text-muted-foreground uppercase tracking-widest">Select Media</p>
            <div class="flex gap-2">
              <input ref="fileInput" type="file" class="hidden" accept="image/*" multiple @change="onLocalUpload" />
              <Button type="button" size="sm" variant="outline" @click="(fileInput as HTMLInputElement)?.click()">
                <Upload class="h-3.5 w-3.5 mr-1.5" />Upload
              </Button>
              <Button type="button" size="sm" variant="ghost" @click="imagePickerField = null">
                <X class="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
          <div v-if="mediaLoading" class="text-xs text-muted-foreground text-center py-4">Loading media…</div>
          <div v-else-if="!mediaList.length" class="text-xs text-muted-foreground text-center py-4">No media uploaded yet.</div>
          <div v-else class="grid grid-cols-4 gap-2 max-h-48 overflow-y-auto">
            <button
              v-for="m in mediaList"
              :key="m.id"
              type="button"
              class="aspect-square rounded-md overflow-hidden border hover:ring-2 hover:ring-primary transition-all"
              :title="m.file_path"
              @click="selectMedia(m)"
            >
              <img :src="mediaApi.getUrl(m)" :alt="m.file_path" class="w-full h-full object-cover" />
            </button>
          </div>
        </div>
      </template>

      <!-- ── select ─────────────────────────────────────────────────────── -->
      <template v-else-if="field.type === 'select'">
        <Select
          :model-value="(modelValue[field.name] as string) || ''"
          @update:model-value="update(field.name, $event)"
        >
          <SelectTrigger :id="field.name">
            <SelectValue :placeholder="`Choose ${field.name}…`" />
          </SelectTrigger>
          <SelectContent>
            <template v-if="Array.isArray(field.options?.choices)">
              <SelectItem v-for="opt in (field.options as any).choices" :key="String(opt)" :value="String(opt)">
                {{ opt }}
              </SelectItem>
            </template>
            <template v-else>
              <SelectItem value="default">Default</SelectItem>
            </template>
          </SelectContent>
        </Select>
      </template>

      <!-- ── json (Monaco drawer) ──────────────────────────────────────────── -->
      <template v-else-if="field.type === 'json'">
        <JsonEditorDrawer
          :model-value="(modelValue[field.name] as Record<string, unknown>) ?? {}"
          :field-name="field.name"
          @update:model-value="update(field.name, $event)"
        />
      </template>

      <!-- ── code fields (Monaco inline) ──────────────────────────────────── -->
      <template v-else-if="['markdown', 'html', 'yaml'].includes(field.type)">
        <CodeFieldEditor
          :model-value="(modelValue[field.name] as string) || ''"
          :language="field.type as any"
          :label="field.name"
          @update:model-value="update(field.name, $event)"
        />
      </template>

    </div>
  </div>
</template>
