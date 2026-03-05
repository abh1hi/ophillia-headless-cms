<script setup lang="ts">
import { useEditor, EditorContent } from '@tiptap/vue-3'
import StarterKit from '@tiptap/starter-kit'
import { watch, onBeforeUnmount } from 'vue'
import { Button } from '@/components/ui/button'
import { Bold, Italic, Strikethrough, Code, Heading1, Heading2, List, ListOrdered, Quote } from 'lucide-vue-next'

const props = defineProps<{
  modelValue: string
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: string): void
}>()

const editor = useEditor({
  content: props.modelValue,
  extensions: [StarterKit],
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
</style>
