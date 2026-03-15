import { ref, computed } from 'vue'
import { sectionsApi } from '@/api/sections'
import type { Section } from '@/api/sections'
import type { SectionSchema } from '@/api/schemas'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function buildDefaultData(schema: SectionSchema): Record<string, unknown> {
    const data: Record<string, unknown> = {}
    for (const field of schema.fields_schema ?? []) {
        if (['text', 'richtext', 'url', 'select'].includes(field.type)) {
            data[field.name] = ''
        } else if (field.type === 'number') {
            data[field.name] = 0
        } else if (field.type === 'boolean') {
            data[field.name] = false
        } else if (field.type === 'image') {
            data[field.name] = null
        } else if (field.type === 'json') {
            data[field.name] = {}
        }
    }
    // PocketBase rejects empty JSON objects on required relation fields
    if (Object.keys(data).length === 0) data['_empty'] = false
    return data
}

// ---------------------------------------------------------------------------
// Composable
// ---------------------------------------------------------------------------

export function usePageEditor() {
    const sections = ref<Section[]>([])

    // Change-tracking sets — never exposed, purely internal
    const newSectionIds = new Set<string>() // temp IDs not yet in DB
    const deletedSectionIds = new Set<string>() // real IDs queued for deletion
    const dirtySectionIds = new Set<string>() // existing IDs with changed data/status
    let orderDirty = false             // whether position changed

    // True when there is at least one pending local change
    const isDirty = computed(() =>
        newSectionIds.size > 0 ||
        deletedSectionIds.size > 0 ||
        dirtySectionIds.size > 0 ||
        orderDirty
    )

    // -------------------------------------------------------------------------
    // Init
    // -------------------------------------------------------------------------

    function loadSections(items: Section[]) {
        sections.value = items
        newSectionIds.clear()
        deletedSectionIds.clear()
        dirtySectionIds.clear()
        orderDirty = false
    }

    // -------------------------------------------------------------------------
    // Local mutations (zero network calls)
    // -------------------------------------------------------------------------

    function addSection(schemaId: string, schema: SectionSchema | undefined): Section {
        const tempId = `__new__${crypto.randomUUID()}`
        const stub: Section = {
            id: tempId,
            page_id: '',              // filled in at flush time
            schema_id: schemaId,
            order: sections.value.length,
            data: schema ? buildDefaultData(schema) : { _empty: false },
            status: 'draft',
        }
        sections.value.push(stub)
        newSectionIds.add(tempId)
        return stub
    }

    function removeSection(id: string) {
        if (newSectionIds.has(id)) {
            // Never persisted — just discard
            newSectionIds.delete(id)
        } else {
            // Existing DB record — queue for deletion
            deletedSectionIds.add(id)
        }
        dirtySectionIds.delete(id)
        sections.value = sections.value.filter(s => s.id !== id)
        // Recompute orders
        sections.value.forEach((s, i) => (s.order = i))
    }

    function moveSection(id: string, direction: 'up' | 'down') {
        const idx = sections.value.findIndex(s => s.id === id)
        if (direction === 'up' && idx > 0) {
            ;[sections.value[idx], sections.value[idx - 1]] =
                [sections.value[idx - 1], sections.value[idx]]
        } else if (direction === 'down' && idx < sections.value.length - 1) {
            ;[sections.value[idx], sections.value[idx + 1]] =
                [sections.value[idx + 1], sections.value[idx]]
        } else {
            return // no-op
        }
        sections.value.forEach((s, i) => (s.order = i))
        orderDirty = true
    }

    function updateSectionData(id: string, data: Record<string, unknown>) {
        const section = sections.value.find(s => s.id === id)
        if (!section) return
        section.data = data
        // New sections don't need the dirty flag — they'll be created fresh
        if (!newSectionIds.has(id)) dirtySectionIds.add(id)
    }

    function updateSectionStatus(id: string, status: 'draft' | 'published') {
        const section = sections.value.find(s => s.id === id)
        if (!section) return
        section.status = status
        if (!newSectionIds.has(id)) dirtySectionIds.add(id)
    }

    // -------------------------------------------------------------------------
    // Flush — minimum diff written to server
    // -------------------------------------------------------------------------

    async function flushSections(pageId: string): Promise<Section[]> {
        // 1. Delete removed sections (parallel)
        if (deletedSectionIds.size) {
            await Promise.all([...deletedSectionIds].map(id => sectionsApi.delete(id)))
            deletedSectionIds.clear()
        }

        // 2. Create new sections (sequential — need real IDs back)
        for (let i = 0; i < sections.value.length; i++) {
            const s = sections.value[i]
            if (!newSectionIds.has(s.id)) continue

            const created = await sectionsApi.create({
                page_id: pageId,
                schema_id: s.schema_id,
                order: s.order,
                data: s.data,
                status: s.status,
            })
            // Replace stub with the real DB record in-place
            newSectionIds.delete(s.id)
            sections.value[i] = created
        }

        // 3. Update only dirty *existing* sections (parallel)
        const dirtyExisting = [...dirtySectionIds]
        if (dirtyExisting.length) {
            await Promise.all(
                dirtyExisting.map(id => {
                    const s = sections.value.find(sec => sec.id === id)
                    if (!s) return Promise.resolve()
                    return sectionsApi.update(id, { data: s.data, status: s.status })
                })
            )
            dirtySectionIds.clear()
        }

        // 4. Reorder if position changed
        if (orderDirty && sections.value.length) {
            await sectionsApi.reorder(sections.value.map(s => s.id))
            orderDirty = false
        }

        return sections.value
    }

    return {
        sections,
        isDirty,
        loadSections,
        addSection,
        removeSection,
        moveSection,
        updateSectionData,
        updateSectionStatus,
        flushSections,
    }
}
