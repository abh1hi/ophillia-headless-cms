/// <reference path="../pb_data/types.d.ts" />

// Migration: 002_page_versions
// Creates the page_versions collection for content versioning snapshots.
// Compatible with PocketBase v0.36.5

migrate(
    (app) => {
        const pagesId = app.findCollectionByNameOrId("pages").id;

        app.save(new Collection({
            type: "base",
            name: "page_versions",
            fields: [
                {
                    type: "relation",
                    name: "page_id",
                    required: true,
                    collectionId: pagesId,
                    cascadeDelete: true,
                    maxSelect: 1,
                },
                {
                    type: "number",
                    name: "version_number",
                    required: true,
                    min: 1,
                },
                {
                    // Human-readable label e.g. "Auto-save · v3" or "Published · v4"
                    type: "text",
                    name: "label",
                    required: true,
                },
                {
                    // Full JSON snapshot: { page: Page, sections: Section[] }
                    type: "json",
                    name: "snapshot",
                    required: true,
                },
            ],
            indexes: [
                "CREATE INDEX idx_page_versions_page_id ON page_versions (page_id)",
                "CREATE INDEX idx_page_versions_number ON page_versions (page_id, version_number)",
            ],
        }));
    },

    // Rollback
    (app) => {
        try {
            app.delete(app.findCollectionByNameOrId("page_versions"));
        } catch (_) {}
    }
);
