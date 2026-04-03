<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Folder, FolderOpen, Tag, Hash, ChevronRight, ChevronLeft, Plus, Search, MoreVertical,
  Layers, FileText
} from 'lucide-vue-next'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { cn } from '@/lib/utils'

interface DirectoryItem {
  id: string
  label: string
  count: number
  icon?: any
}

const props = defineProps<{
  title: string
  items: DirectoryItem[]
  selectedId: string | null
  type: 'folder' | 'category'
  searchQuery?: string
}>()

const emit = defineEmits<{
  (e: 'select', id: string | null): void
  (e: 'add'): void
  (e: 'update:searchQuery', value: string): void
}>()

const isCollapsed = ref(false)

const filteredItems = computed(() => {
  if (!props.searchQuery) return props.items
  const s = props.searchQuery.toLowerCase()
  return props.items.filter(i => i.label.toLowerCase().includes(s))
})
</script>

<template>
  <aside 
    :class="cn(
      'shrink-0 border-r flex flex-col bg-muted/5 h-full overflow-hidden transition-all duration-300 ease-in-out',
      isCollapsed ? 'w-14' : 'w-60'
    )"
  >
    <!-- Sidebar Header -->
    <div :class="cn('px-4 py-4 border-b space-y-3', isCollapsed && 'px-2 flex flex-col items-center')">
      <div class="flex items-center justify-between w-full">
        <h2 v-if="!isCollapsed" class="text-xs font-bold uppercase tracking-wider text-muted-foreground/70 truncate">{{ title }}</h2>
        <div class="flex items-center gap-1">
          <Button 
            v-if="!isCollapsed"
            variant="ghost" 
            size="icon" 
            class="h-6 w-6 rounded-md hover:bg-primary/10 hover:text-primary transition-colors" 
            @click="emit('add')"
          >
            <Plus class="h-3.5 w-3.5" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            class="h-6 w-6 rounded-md hover:bg-muted-foreground/10" 
            @click="isCollapsed = !isCollapsed"
          >
            <ChevronLeft v-if="!isCollapsed" class="h-3.5 w-3.5" />
            <ChevronRight v-else class="h-3.5 w-3.5" />
          </Button>
        </div>
      </div>
      
      <!-- Quick Search inside Sidebar -->
      <div v-if="!isCollapsed" class="relative group">
        <Search class="absolute left-2.5 top-1/2 -translate-y-1/2 h-3 w-3 text-muted-foreground/50 group-focus-within:text-primary transition-colors" />
        <Input 
          :model-value="searchQuery" 
          @update:model-value="emit('update:searchQuery', $event)" 
          placeholder="Filter..." 
          class="h-7 pl-8 text-[11px] bg-background/50 border-muted-foreground/10 focus-visible:ring-primary/20" 
        />
      </div>
      <Button 
        v-else 
        variant="ghost" 
        size="icon" 
        class="h-7 w-7 rounded-md"
        @click="isCollapsed = false"
      >
        <Search class="h-3.5 w-3.5 text-muted-foreground/50" />
      </Button>
    </div>

    <!-- Navigation List -->
    <div :class="cn('flex-1 overflow-y-auto px-2 py-3 space-y-0.5 custom-scrollbar', isCollapsed && 'px-1.5')">
      <!-- "All" default option -->
      <button
        @click="emit('select', null)"
        class="w-full flex items-center gap-2.5 rounded-lg text-sm transition-all group relative"
        :class="[
          selectedId === null 
            ? 'bg-primary/10 text-primary font-bold shadow-[0_0_15px_rgba(var(--primary),0.02)]' 
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
          isCollapsed ? 'justify-center py-2' : 'px-3 py-2'
        ]"
        :title="isCollapsed ? `All ${title}` : ''"
      >
        <component :is="type === 'folder' ? Folder : Layers" class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110" />
        <span v-if="!isCollapsed" class="flex-1 text-left truncate">All {{ title }}</span>
        <div v-if="selectedId === null" :class="cn('absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full', isCollapsed && 'h-6')" />
      </button>

      <Separator class="my-2 opacity-30" />

      <!-- Dynamic items -->
      <div v-if="!isCollapsed && filteredItems.length === 0 && searchQuery" class="px-3 py-4 text-center">
         <p class="text-[10px] text-muted-foreground">No matches found</p>
      </div>

      <button
        v-for="item in filteredItems"
        :key="item.id"
        @click="emit('select', item.id)"
        class="w-full flex items-center gap-2.5 rounded-lg text-sm transition-all group relative"
        :class="[
          selectedId === item.id 
            ? 'bg-primary/10 text-primary font-bold shadow-[0_0_15px_rgba(var(--primary),0.05)]' 
            : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground',
          isCollapsed ? 'justify-center py-2' : 'px-3 py-2'
        ]"
        :title="isCollapsed ? item.label : ''"
      >
        <component 
          :is="item.icon || (type === 'folder' ? Folder : Tag)" 
          class="h-4 w-4 shrink-0 transition-transform group-hover:scale-110"
          :class="selectedId === item.id ? 'text-primary' : 'text-muted-foreground/60'"
        />
        <span v-if="!isCollapsed" class="flex-1 text-left truncate tracking-tight">{{ item.label }}</span>
        <span v-if="!isCollapsed" class="text-[10px] font-mono opacity-40 tabular-nums">{{ item.count }}</span>
        
        <div v-if="selectedId === item.id" :class="cn('absolute left-0 top-1/2 -translate-y-1/2 w-1 h-4 bg-primary rounded-r-full shadow-[0_0_8px_rgba(var(--primary),0.5)]', isCollapsed && 'h-6')" />
        
        <div v-if="!isCollapsed" class="opacity-0 group-hover:opacity-100 transition-opacity">
           <MoreVertical class="h-3 w-3 text-muted-foreground/40" />
        </div>
      </button>

      <!-- Add Action when collapsed -->
      <button
        v-if="isCollapsed"
        @click="emit('add')"
        class="w-full flex items-center justify-center py-2 rounded-lg text-muted-foreground hover:bg-muted/50 hover:text-primary transition-all group mt-2"
        title="Add New"
      >
        <Plus class="h-4 w-4 transition-transform group-hover:rotate-90" />
      </button>
    </div>

    <!-- Sidebar Footer (Stats) -->
    <div v-if="!isCollapsed" class="px-4 py-3 border-t bg-muted/5">
       <div class="flex items-center gap-2 text-[10px] text-muted-foreground/60 font-bold uppercase tracking-widest truncate">
          <Hash class="h-3 w-3" />
          {{ items.length }} {{ type === 'folder' ? 'Folders' : 'Categories' }}
       </div>
    </div>
  </aside>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background: rgba(var(--primary), 0.1);
}
</style>
