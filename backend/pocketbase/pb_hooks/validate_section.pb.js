// PocketBase Hook: Validate section data against its schema before write
// Compatible with PocketBase v0.36 JS hooks API

$app.onRecordCreate("sections", (e) => {
    validateSectionData(e);
    e.next();
});

$app.onRecordUpdate("sections", (e) => {
    validateSectionData(e);
    e.next();
});

// ─── Validation Logic ──────────────────────────────────────────────────────────

function validateSectionData(e) {
    const record = e.record;
    const schemaId = record.get("schema_id");
    const data = record.get("data");

    if (!schemaId) {
        throw new BadRequestError("sections: schema_id is required.");
    }

    if (data === null || data === undefined) {
        throw new BadRequestError("sections: data is required.");
    }

    // Fetch the linked schema
    let sectionSchema;
    try {
        sectionSchema = $app.findRecordById("section_schemas", schemaId);
    } catch (_) {
        throw new BadRequestError(`sections: Schema with ID "${schemaId}" not found.`);
    }

    const fieldsSchema = sectionSchema.get("fields_schema");
    if (!Array.isArray(fieldsSchema)) {
        throw new BadRequestError("sections: Linked schema has invalid fields_schema (expected array).");
    }

    // Validate each required field
    const errors = [];
    for (const field of fieldsSchema) {
        const value = data[field.name];
        const isEmpty = value === undefined || value === null || value === "";

        if (field.required && isEmpty) {
            errors.push({ field: field.name, code: "REQUIRED", message: `Field "${field.name}" is required.` });
            continue;
        }
        if (isEmpty) continue;

        switch (field.type) {
            case "text":
            case "richtext":
            case "url":
                if (typeof value !== "string") {
                    errors.push({ field: field.name, code: "TYPE_MISMATCH", message: `Field "${field.name}" must be a string.` });
                }
                break;
            case "number":
                if (typeof value !== "number") {
                    errors.push({ field: field.name, code: "TYPE_MISMATCH", message: `Field "${field.name}" must be a number.` });
                }
                break;
            case "boolean":
                if (typeof value !== "boolean") {
                    errors.push({ field: field.name, code: "TYPE_MISMATCH", message: `Field "${field.name}" must be a boolean.` });
                }
                break;
        }
    }

    if (errors.length > 0) {
        throw new BadRequestError(JSON.stringify({ code: "VALIDATION_ERROR", errors }));
    }

    // Write audit log entry (non-fatal)
    try {
        const authRecord = e.auth;
        const auditCol = $app.findCollectionByNameOrId("audit_log");
        const auditRecord = new Record(auditCol);
        auditRecord.set("user_id", authRecord?.id ?? "");
        auditRecord.set("action", record.isNew() ? "create_section" : "update_section");
        auditRecord.set("entity_type", "sections");
        auditRecord.set("entity_id", record.id ?? "pending");
        auditRecord.set("diff", data);
        $app.save(auditRecord);
    } catch (_) {
        // Non-fatal — audit logging failure must not block writes
    }
}
