<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { Image } from '@tiptap/extension-image'
import { Link } from '@tiptap/extension-link'
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
import { TableCell } from '@tiptap/extension-table-cell'
import { TableHeader } from '@tiptap/extension-table-header'
import { MdcBlock } from '@/extensions/MdcBlock'
import { watch, onBeforeUnmount } from 'vue'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote, Image as ImageIcon, Link as LinkIcon, Unlink, Table as TableIcon, Puzzle } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [
    StarterKit,
    Image,
    Link.configure({ openOnClick: false }),
    Table.configure({ resizable: true }),
    TableRow,
    TableHeader,
    TableCell,
    MdcBlock,
  ],
  editorProps: {
    attributes: {
      class: 'prose prose-sm dark:prose-invert max-w-none min-h-[150px] p-3 focus:outline-none',
    },
  },
  onUpdate: ({ editor }) => {
    emit('update:modelValue', editor.getHTML())
  },
})

watch(
  () => props.modelValue,
  (val) => {
    const isSame = editor.value?.getHTML() === val
    if (!isSame && editor.value) {
      editor.value.commands.setContent(val, false)
    }
  }
)

onBeforeUnmount(() => {
  editor.value?.destroy()
})

function setLink() {
  const previousUrl = editor.value?.getAttributes('link').href
  const url = window.prompt('URL', previousUrl)
  if (url === null) return
  if (url === '') {
    editor.value?.chain().focus().extendMarkRange('link').unsetLink().run()
    return
  }
  editor.value?.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
}

function setImage() {
  const url = window.prompt('Image URL')
  if (url) {
    editor.value?.chain().focus().setImage({ src: url }).run()
  }
}
</script>

<template>
  <div class="border rounded-md overflow-hidden bg-background focus-within:ring-2 focus-within:ring-ring focus-within:border-input">
    <!-- Toolbar -->
    <div v-if="editor" class="flex flex-wrap items-center gap-1 p-1 border-b bg-muted/30">
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('bold') }"
        @click="editor.chain().focus().toggleBold().run()"
      >
        <Bold class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('italic') }"
        @click="editor.chain().focus().toggleItalic().run()"
      >
        <Italic class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('strike') }"
        @click="editor.chain().focus().toggleStrike().run()"
      >
        <Strikethrough class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('code') }"
        @click="editor.chain().focus().toggleCode().run()"
      >
        <Code class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border mx-1" />

      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('link') }"
        @click="setLink"
      >
        <LinkIcon class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :disabled="!editor.isActive('link')"
        @click="editor.chain().focus().unsetLink().run()"
      >
        <Unlink class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        @click="setImage"
      >
        <ImageIcon class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border mx-1" />

      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('heading', { level: 1 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
      >
        <Heading1 class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('heading', { level: 2 }) }"
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
      >
        <Heading2 class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border mx-1" />

      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('bulletList') }"
        @click="editor.chain().focus().toggleBulletList().run()"
      >
        <List class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('orderedList') }"
        @click="editor.chain().focus().toggleOrderedList().run()"
      >
        <ListOrdered class="h-4 w-4" />
      </Button>
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-muted': editor.isActive('blockquote') }"
        @click="editor.chain().focus().toggleBlockquote().run()"
      >
        <Quote class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border mx-1" />

      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()"
      >
        <TableIcon class="h-4 w-4" />
      </Button>

      <div class="w-px h-4 bg-border mx-1" />

      <!-- MDC Component Block -->
      <Button
        variant="ghost" size="icon" class="h-8 w-8"
        :class="{ 'bg-violet-500/10 text-violet-500': editor.isActive('mdcBlock') }"
        title="Insert MDC Component Block"
        @click="editor.chain().focus().insertMdcBlock().run()"
      >
        <Puzzle class="h-4 w-4" />
      </Button>
    </div>

    <!-- Editor Content -->
    <EditorContent :editor="editor" />
  </div>
</template>

<style>
/* Basic prose styles for Tiptap since we didn't install @tailwindcss/typography plugin */
.prose p { margin-top: 0.5em; margin-bottom: 0.5em; }
.prose h1 { font-size: 1.5em; font-weight: bold; margin-top: 0.8em; margin-bottom: 0.4em; }
.prose h2 { font-size: 1.25em; font-weight: bold; margin-top: 0.8em; margin-bottom: 0.4em; }
.prose ul { list-style-type: disc; padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0.5em; }
.prose ol { list-style-type: decimal; padding-left: 1.5em; margin-top: 0.5em; margin-bottom: 0.5em; }
.prose blockquote { border-left: 4px solid #e5e7eb; padding-left: 1em; color: #6b7280; font-style: italic; }
.prose code { background-color: #f3f4f6; padding: 0.2em 0.4em; border-radius: 0.25em; font-size: 0.875em; }
.dark .prose blockquote { border-left-color: #374151; color: #9ca3af; }
.dark .prose code { background-color: #1f2937; }
.prose table { border-collapse: collapse; table-layout: fixed; width: 100%; margin: 0; overflow: hidden; }
.prose table td, .prose table th { min-width: 1em; border: 1px solid #e5e7eb; padding: 3px 5px; vertical-align: top; box-sizing: border-box; position: relative; }
.prose table th { font-weight: bold; text-align: left; background-color: #f9fafb; }
.dark .prose table td, .dark .prose table th { border-color: #374151; }
.dark .prose table th { background-color: #1f2937; }
.prose img { max-width: 100%; height: auto; border-radius: 0.25em; }
/* basic link styles */
.prose a { color: #3b82f6; text-decoration: underline; cursor: pointer; }
/* MDC Block node view */
.mdc-node-wrapper { position: relative; display: block; }
</style>
