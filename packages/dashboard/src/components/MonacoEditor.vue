<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, watch } from 'vue'
import * as monaco from 'monaco-editor'

// Import workers using Vite's ?worker syntax
import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'
import CssWorker from 'monaco-editor/esm/vs/language/css/css.worker?worker'
import HtmlWorker from 'monaco-editor/esm/vs/language/html/html.worker?worker'
import TsWorker from 'monaco-editor/esm/vs/language/typescript/ts.worker?worker'

// Configure Monaco environment to use local workers
if (typeof window !== 'undefined') {
  (window as any).MonacoEnvironment = {
    getWorker(_: any, label: string) {
      if (label === 'json') {
        return new JsonWorker()
      }
      if (label === 'css' || label === 'scss' || label === 'less') {
        return new CssWorker()
      }
      if (label === 'html' || label === 'handlebars' || label === 'razor') {
        return new HtmlWorker()
      }
      if (label === 'typescript' || label === 'javascript') {
        return new TsWorker()
      }
      return new EditorWorker()
    }
  }
}

const props = defineProps<{
  modelValue: string
  language?: string
  height?: string
  readOnly?: boolean
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', value: string): void
}>()

const editorContainer = ref<HTMLElement | null>(null)
let editorInstance: monaco.editor.IStandaloneCodeEditor | null = null

onMounted(() => {
  if (!editorContainer.value) return

  editorInstance = monaco.editor.create(editorContainer.value, {
    value: props.modelValue || '',
    language: props.language || 'json',
    readOnly: props.readOnly || false,
    theme: document.documentElement.classList.contains('dark') ? 'vs-dark' : 'vs',
    fontSize: 13,
    lineHeight: 21,
    tabSize: 2,
    minimap: { enabled: false },
    scrollBeyondLastLine: false,
    wordWrap: 'on',
    formatOnPaste: true,
    formatOnType: true,
    automaticLayout: true,
    padding: { top: 12, bottom: 12 },
    scrollbar: {
      vertical: 'auto',
      horizontal: 'auto',
      verticalScrollbarSize: 6,
      horizontalScrollbarSize: 6,
    },
    lineNumbers: 'on',
    renderLineHighlight: 'line',
    cursorBlinking: 'smooth',
    smoothScrolling: true,
    bracketPairColorization: { enabled: true },
  })

  // Emit changes back to parent
  editorInstance.onDidChangeModelContent(() => {
    emit('update:modelValue', editorInstance?.getValue() || '')
  })

  // Enable JSON auto-format on open
  if (props.language === 'json' || !props.language) {
    setTimeout(() => {
      editorInstance?.getAction('editor.action.formatDocument')?.run()
    }, 100)
  }
})

// Sync external value changes into editor (e.g., when field is reset)
watch(() => props.modelValue, (newVal) => {
  if (editorInstance && editorInstance.getValue() !== newVal) {
    const pos = editorInstance.getPosition()
    editorInstance.setValue(newVal || '')
    if (pos) editorInstance.setPosition(pos)
  }
})

// Sync theme changes
watch(() => document.documentElement.classList.contains('dark'), (isDark) => {
  monacoInstance?.editor.setTheme(isDark ? 'vs-dark' : 'vs')
})

onBeforeUnmount(() => {
  editorInstance?.dispose()
  editorInstance = null
})
</script>

<template>
  <div 
    ref="editorContainer" 
    :style="{ height: height || '400px' }"
    class="w-full rounded-lg overflow-hidden border border-border"
  />
</template>
