/// <reference path="../pb_data/types.d.ts" />

// Migration: 001_initial_collections
// Compatible with PocketBase v0.36.5

migrate(
    (app) => {
        // ─── projects ─────────────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "projects",
            fields: [
                { type: "text", name: "name", required: true },
                { type: "text", name: "slug", required: true },
                { type: "text", name: "api_key", required: true },
                { type: "json", name: "settings" },
            ],
            indexes: ["CREATE UNIQUE INDEX idx_projects_slug ON projects (slug)"],
        }));

        // Fetch the saved collection to get its auto-assigned ID
        const projectsId = app.findCollectionByNameOrId("projects").id;

        // ─── section_schemas ──────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "section_schemas",
            fields: [
                { type: "relation", name: "project_id", required: true, collectionId: projectsId, cascadeDelete: false, maxSelect: 1 },
                { type: "text", name: "name", required: true },
                { type: "text", name: "slug", required: true },
                { type: "number", name: "version", required: true, min: 1 },
                { type: "json", name: "fields_schema", required: true },
                { type: "select", name: "status", required: true, values: ["active", "deprecated"], maxSelect: 1 },
            ],
            indexes: [
                "CREATE UNIQUE INDEX idx_schemas_project_slug ON section_schemas (project_id, slug, version)",
            ],
        }));

        const schemasId = app.findCollectionByNameOrId("section_schemas").id;

        // ─── pages ────────────────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "pages",
            fields: [
                { type: "relation", name: "project_id", required: true, collectionId: projectsId, cascadeDelete: false, maxSelect: 1 },
                { type: "text", name: "title", required: true },
                { type: "text", name: "slug", required: true },
                { type: "select", name: "status", required: true, values: ["draft", "published"], maxSelect: 1 },
                { type: "number", name: "version", required: true, min: 1 },
                { type: "json", name: "meta" },
                { type: "date", name: "published_at" },
            ],
            indexes: [
                "CREATE UNIQUE INDEX idx_pages_project_slug ON pages (project_id, slug)",
            ],
        }));

        const pagesId = app.findCollectionByNameOrId("pages").id;

        // ─── sections ─────────────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "sections",
            fields: [
                { type: "relation", name: "page_id", required: true, collectionId: pagesId, cascadeDelete: true, maxSelect: 1 },
                { type: "relation", name: "schema_id", required: true, collectionId: schemasId, cascadeDelete: false, maxSelect: 1 },
                { type: "number", name: "order", required: true, min: 0 },
                { type: "json", name: "data", required: true },
                { type: "select", name: "status", required: true, values: ["draft", "published"], maxSelect: 1 },
            ],
        }));

        // ─── media ────────────────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "media",
            fields: [
                { type: "relation", name: "project_id", required: true, collectionId: projectsId, cascadeDelete: false, maxSelect: 1 },
                { type: "file", name: "file_path", required: true, maxSelect: 1 },
                { type: "text", name: "mime_type", required: true },
                { type: "number", name: "size_bytes", required: true, min: 0 },
                { type: "json", name: "meta" },
            ],
        }));

        // ─── audit_log ────────────────────────────────────────────────────────────
        app.save(new Collection({
            type: "base",
            name: "audit_log",
            fields: [
                { type: "text", name: "user_id" },
                { type: "text", name: "action", required: true },
                { type: "text", name: "entity_type", required: true },
                { type: "text", name: "entity_id", required: true },
                { type: "json", name: "diff" },
            ],
        }));
    },

    // Rollback
    (app) => {
        for (const name of ["audit_log", "media", "sections", "pages", "section_schemas", "projects"]) {
            try { app.delete(app.findCollectionByNameOrId(name)); } catch (_) { }
        }
    }
);
