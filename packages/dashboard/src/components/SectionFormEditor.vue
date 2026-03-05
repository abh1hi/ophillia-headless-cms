<script setup lang="ts">
import { computed } from 'vue'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import RichTextEditor from '@/components/RichTextEditor.vue'

export interface FieldSchema {
  name: string
  type: 'text' | 'richtext' | 'number' | 'boolean' | 'image' | 'url' | 'select' | 'json'
  required: boolean
  options?: Record<string, unknown>
}

const props = defineProps<{
  fields: FieldSchema[]
  modelValue: Record<string, unknown>
}>()

const emit = defineEmits<{
  (e: 'update:modelValue', val: Record<string, unknown>): void
}>()

// We create a computed wrapper that gets/sets values in the modelValue reactive copy
// so that emitting update happens naturally instead of mutating the prop directly.
function updateField(name: string, value: unknown) {
  const next = { ...props.modelValue, [name]: value }
  emit('update:modelValue', next)
}
</script>

<template>
  <div class="space-y-6">
    <div v-if="fields.length === 0" class="text-sm text-muted-foreground p-4 bg-muted/30 rounded-md border text-center">
      This section has no schema fields defined.
    </div>
    
    <div v-for="field in fields" :key="field.name" class="space-y-2">
      <div class="flex items-center gap-2">
        <Label :for="field.name" class="font-medium">
          {{ field.name }}
          <span v-if="field.required" class="text-destructive">*</span>
        </Label>
        <span class="text-[10px] text-muted-foreground uppercase tracking-widest bg-muted px-1.5 py-0.5 rounded">{{ field.type }}</span>
      </div>

      <!-- Rich text using Tiptap -->
      <template v-if="field.type === 'richtext'">
        <RichTextEditor
          :model-value="(modelValue[field.name] as string) || ''"
          @update:model-value="updateField(field.name, $event)"
        />
      </template>

      <!-- Number input -->
      <template v-else-if="field.type === 'number'">
        <Input 
          :id="field.name" 
          type="number" 
          :model-value="(modelValue[field.name] as number) ?? ''" 
          @input="updateField(field.name, Number(($event.target as HTMLInputElement).value))"
          class="max-w-xs"
        />
      </template>

      <!-- Boolean checkbox -->
      <template v-else-if="field.type === 'boolean'">
        <div class="flex items-center space-x-2 pt-1">
          <input 
            type="checkbox" 
            :id="field.name" 
            :checked="(modelValue[field.name] as boolean) || false"
            @change="updateField(field.name, ($event.target as HTMLInputElement).checked)"
            class="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
          />
          <label :for="field.name" class="text-sm font-medium leading-none cursor-pointer">
            Yes
          </label>
        </div>
      </template>

      <!-- Select Dropdown -->
      <template v-else-if="field.type === 'select'">
        <Select 
          :model-value="(modelValue[field.name] as string) || ''"
          @update:model-value="updateField(field.name, $event)"
        >
          <SelectTrigger :id="field.name" class="max-w-xs">
            <SelectValue placeholder="Select an option" />
          </SelectTrigger>
          <SelectContent>
            <!-- In a real scenario, options would be extracted from field.options -->
            <!-- We make a best effort to parse an array if provided -->
            <template v-if="Array.isArray(field.options?.choices)">
              <SelectItem v-for="opt in field.options.choices" :key="String(opt)" :value="String(opt)">
                {{ opt }}
              </SelectItem>
            </template>
            <template v-else>
              <SelectItem value="default">Default</SelectItem>
            </template>
          </SelectContent>
        </Select>
      </template>

      <!-- Text, URL, Image fall back to text inputs -->
      <template v-else>
        <Input 
          :id="field.name" 
          :type="field.type === 'url' ? 'url' : 'text'" 
          :model-value="(modelValue[field.name] as string) || ''" 
          @update:model-value="updateField(field.name, $event)"
        />
      </template>
      
    </div>
  </div>
</template>
