import { getClient } from './client';
import type { SectionSchema, ListResult, Section, ValidationResult, FieldSchema } from './types';

// ─── Schema Module ────────────────────────────────────────────────────────────

export const schema = {
    /**
     * Get the current schema version for the project.
     * Returns the highest version number across all schemas.
     */
    async getVersion(): Promise<number> {
        const client = getClient();
        const result = await client.get<ListResult<SectionSchema>>(
            '/api/collections/section_schemas/records',
            {
                filter: `project_id.slug="${client.getProjectSlug()}"`,
                sort: '-version',
                perPage: 1,
            }
        );

        if (!result.items.length) return 0;
        return result.items[0].version;
    },

    /**
     * Validate a section's data against its schema definition.
     * This is client-side validation — does not make a write request.
     */
    async validate(section: Pick<Section, 'schema_id' | 'data'>): Promise<ValidationResult> {
        const client = getClient();

        // Fetch the schema to validate against
        const schemaResult = await client.get<SectionSchema>(
            `/api/collections/section_schemas/records/${section.schema_id}`
        );

        return validateAgainstSchema(section.data, schemaResult.fields_schema);
    },
};

// ─── Internal Validator ───────────────────────────────────────────────────────

export function validateAgainstSchema(
    data: Record<string, unknown>,
    fields: FieldSchema[]
): ValidationResult {
    const errors = [];

    for (const field of fields) {
        const value = data[field.name];

        // Required field check
        if (field.required && (value === undefined || value === null || value === '')) {
            errors.push({
                field: field.name,
                message: `Field "${field.name}" is required.`,
                code: 'REQUIRED',
            });
            continue;
        }

        if (value === undefined || value === null) continue;

        // Type checks
        switch (field.type) {
            case 'text':
            case 'richtext':
            case 'url':
                if (typeof value !== 'string') {
                    errors.push({ field: field.name, message: `Field "${field.name}" must be a string.`, code: 'TYPE_MISMATCH' });
                }
                break;
            case 'number':
                if (typeof value !== 'number') {
                    errors.push({ field: field.name, message: `Field "${field.name}" must be a number.`, code: 'TYPE_MISMATCH' });
                }
                break;
            case 'boolean':
                if (typeof value !== 'boolean') {
                    errors.push({ field: field.name, message: `Field "${field.name}" must be a boolean.`, code: 'TYPE_MISMATCH' });
                }
                break;
            case 'json':
                if (typeof value !== 'object') {
                    errors.push({ field: field.name, message: `Field "${field.name}" must be an object.`, code: 'TYPE_MISMATCH' });
                }
                break;
        }
    }

    return { valid: errors.length === 0, errors };
}
