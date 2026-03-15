#!/usr/bin/env node
/**
 * seed-arunachala.mjs
 * 
 * Automatically creates the Arunachala Village School page in PocketBase as a
 * fully CMS-managed page with 6 sections. Idempotent — safe to run multiple times.
 *
 * Usage:
 *   node packages/site/scripts/seed-arunachala.mjs
 *
 * Required env vars (reads from packages/site/.env):
 *   NUXT_PUBLIC_PB_URL        — PocketBase URL (default: http://localhost:8090)
 *   NUXT_PUBLIC_PROJECT_ID    — Your project's PocketBase record ID
 *   PB_SUPERUSER_EMAIL        — Superuser email for PocketBase
 *   PB_SUPERUSER_PASSWORD     — Superuser password for PocketBase
 */

import { readFileSync } from 'fs'
import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'

// ─── Load .env from packages/site/.env ──────────────────────────────────────
const __dirname = dirname(fileURLToPath(import.meta.url))
const envPath = resolve(__dirname, '../.env')

try {
    const envContent = readFileSync(envPath, 'utf-8')
    for (const line of envContent.split('\n')) {
        const trimmed = line.trim()
        if (!trimmed || trimmed.startsWith('#')) continue
        const eqIdx = trimmed.indexOf('=')
        if (eqIdx === -1) continue
        const key = trimmed.slice(0, eqIdx).trim()
        const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, '')
        if (!process.env[key]) process.env[key] = val
    }
} catch {
    // .env not found — rely on actual environment variables
}

// ─── Config ──────────────────────────────────────────────────────────────────
const PB_URL = process.env.NUXT_PUBLIC_PB_URL || 'http://localhost:8090'
const PROJECT_ID = process.env.NUXT_PUBLIC_PROJECT_ID || ''
const EMAIL = process.env.PB_SUPERUSER_EMAIL || ''
const PASSWORD = process.env.PB_SUPERUSER_PASSWORD || ''

if (!PROJECT_ID) {
    console.error('❌  Missing NUXT_PUBLIC_PROJECT_ID in .env')
    process.exit(1)
}
if (!EMAIL || !PASSWORD) {
    console.error('❌  Missing PB_SUPERUSER_EMAIL / PB_SUPERUSER_PASSWORD in .env')
    process.exit(1)
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
async function pb(method, path, body, token) {
    const headers = { 'Content-Type': 'application/json' }
    if (token) headers['Authorization'] = `Bearer ${token}`
    const res = await fetch(`${PB_URL}${path}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : undefined,
    })
    if (!res.ok) {
        const errBody = await res.json().catch(() => ({}))
        const detail = JSON.stringify(errBody)
        throw new Error(`${method} ${path} → ${res.status}: ${detail}`)
    }
    if (res.status === 204) return null
    return res.json()
}

function buildFilter(conditions) {
    // Build a PocketBase filter query string properly
    const params = new URLSearchParams()
    params.set('filter', conditions)
    params.set('perPage', '1')
    return params.toString()
}

async function authenticate() {
    console.log('🔐  Authenticating as superuser…')
    // PocketBase v0.23+ uses _superusers; older versions use /api/admins
    const endpoints = [
        '/api/collections/_superusers/auth-with-password',
        '/api/admins/auth-with-password',
    ]
    for (const endpoint of endpoints) {
        try {
            const data = await pb('POST', endpoint, { identity: EMAIL, password: PASSWORD })
            return data.token
        } catch (err) {
            if (!err.message.includes('404')) throw err
        }
    }
    throw new Error('Could not authenticate: no valid superuser endpoint found')
}

/** Upsert: find by slug+project, return existing ID or create and return new ID */
async function upsertSchema(token, slug, name, fieldsSchema) {
    const qs = buildFilter(`project_id="${PROJECT_ID}" && slug="${slug}"`)
    const existing = await pb('GET', `/api/collections/section_schemas/records?${qs}`, null, token)
    if (existing?.items?.length > 0) {
        console.log(`  ↩  Schema "${slug}" already exists, skipping.`)
        return existing.items[0].id
    }
    const created = await pb('POST', '/api/collections/section_schemas/records', {
        project_id: PROJECT_ID,
        name,
        slug,
        version: 1,
        status: 'active',
        fields_schema: fieldsSchema,
    }, token)
    console.log(`  ✅  Schema "${slug}" created.`)
    return created.id
}

async function upsertPage(token, slug, title) {
    const qs = buildFilter(`project_id="${PROJECT_ID}" && slug="${slug}"`)
    const existing = await pb('GET', `/api/collections/pages/records?${qs}`, null, token)
    if (existing?.items?.length > 0) {
        console.log(`  ↩  Page "${slug}" already exists, skipping creation.`)
        return existing.items[0].id
    }
    const created = await pb('POST', '/api/collections/pages/records', {
        project_id: PROJECT_ID,
        title,
        slug,
        status: 'published',
        version: 1,
        published_at: new Date().toISOString(),
        meta: {
            title: 'Arunachala Village School | Empowering Minds, Enriching Lives',
            description: 'Arunachala Village School provides quality, holistic education to rural communities.',
        },
    }, token)
    console.log(`  ✅  Page "${slug}" created.`)
    return created.id
}

async function sectionExists(token, pageId, schemaId) {
    const qs = buildFilter(`page_id="${pageId}" && schema_id="${schemaId}"`)
    const existing = await pb('GET', `/api/collections/sections/records?${qs}`, null, token)
    return existing?.items?.length > 0
}

async function createSection(token, pageId, schemaId, order, data) {
    const exists = await sectionExists(token, pageId, schemaId)
    if (exists) {
        console.log(`  ↩  Section for schema ${schemaId} already exists, skipping.`)
        return
    }
    await pb('POST', '/api/collections/sections/records', {
        page_id: pageId,
        schema_id: schemaId,
        order,
        status: 'published',
        data,
    }, token)
    console.log(`  ✅  Section (order ${order}) created.`)
}

// ─── Schema definitions ───────────────────────────────────────────────────────
const SCHEMAS = [
    {
        slug: 'avs-hero',
        name: 'AVS Hero',
        fields: [
            { name: 'tag', type: 'text', required: false },
            { name: 'headline', type: 'text', required: true },
            { name: 'headline_em', type: 'text', required: false },
            { name: 'subtext', type: 'text', required: false },
            { name: 'cta_primary_label', type: 'text', required: false },
            { name: 'cta_primary_url', type: 'url', required: false },
            { name: 'cta_secondary_label', type: 'text', required: false },
            { name: 'cta_secondary_url', type: 'url', required: false },
            { name: 'image_url', type: 'url', required: false },
            { name: 'badge_number', type: 'text', required: false },
            { name: 'badge_label', type: 'text', required: false },
        ],
        data: {
            tag: 'Education for all',
            headline: 'Nurturing',
            headline_em: 'Potential',
            subtext: 'Arunachala Village School provides quality, holistic education to rural communities, fostering a generation of confident and compassionate leaders.',
            cta_primary_label: 'Donate Now',
            cta_primary_url: '#donate',
            cta_secondary_label: 'Learn More',
            cta_secondary_url: '#about',
            image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?q=80&w=1200&auto=format&fit=crop',
            badge_number: '500+ Students',
            badge_label: 'Supported every single year',
        },
    },
    {
        slug: 'avs-stats',
        name: 'AVS Stats',
        fields: [{ name: 'stats', type: 'json', required: false }],
        data: {
            stats: [
                { number: '95%', label: 'Literacy Rate', description: 'In the communities we serve compared to 60% regional average.' },
                { number: '12:1', label: 'Student-Teacher Ratio', description: "Personalized attention for every child's unique learning curve." },
                { number: '100%', label: 'Community Funded', description: 'Every rupee goes directly to student supplies and facilities.' },
            ],
        },
    },
    {
        slug: 'avs-about',
        name: 'AVS About',
        fields: [
            { name: 'title', type: 'text', required: false },
            { name: 'title_line2', type: 'text', required: false },
            { name: 'body', type: 'richtext', required: false },
            { name: 'image1_url', type: 'url', required: false },
            { name: 'image2_url', type: 'url', required: false },
            { name: 'bullet1', type: 'text', required: false },
            { name: 'bullet2', type: 'text', required: false },
            { name: 'bullet3', type: 'text', required: false },
        ],
        data: {
            title: 'Rooted in Tradition,',
            title_line2: 'Growing for the Future',
            body: 'Founded in 2012, Arunachala Village School began as a small initiative to provide children in rural villages with the same opportunities as those in cities. We believe education is the sunlight that lets a village flourish.',
            image1_url: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=800&auto=format&fit=crop',
            image2_url: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop',
            bullet1: 'Holistic curriculum including arts, yoga, and organic farming.',
            bullet2: 'Environmentally conscious campus powered by solar energy.',
            bullet3: 'Deep engagement with village parents and local councils.',
        },
    },
    {
        slug: 'avs-programs',
        name: 'AVS Programs',
        fields: [
            { name: 'title', type: 'text', required: false },
            { name: 'subtitle', type: 'text', required: false },
            { name: 'programs', type: 'json', required: false },
        ],
        data: {
            title: 'Our Core Programs',
            subtitle: 'We provide more than just textbooks; we provide a foundation for life.',
            programs: [
                { title: 'Academic Excellence', description: 'A bilingual curriculum focusing on linguistic mastery and scientific inquiry for ages 5 to 16.', link_label: 'Learn More', link_url: '#' },
                { title: 'Arts & Culture', description: 'Reviving local folk arts, music, and dance to keep students connected to their heritage.', link_label: 'Learn More', link_url: '#' },
                { title: 'Sustainability Hub', description: 'Hands-on learning in our organic garden teaches responsibility and environmental ethics.', link_label: 'Learn More', link_url: '#' },
            ],
        },
    },
    {
        slug: 'avs-donate',
        name: 'AVS Donate',
        fields: [
            { name: 'title', type: 'text', required: false },
            { name: 'subtitle', type: 'text', required: false },
            { name: 'amounts', type: 'json', required: false },
            { name: 'active_amount', type: 'text', required: false },
            { name: 'cta_label', type: 'text', required: false },
        ],
        data: {
            title: 'Change a Life Today',
            subtitle: 'Your contribution provides uniforms, midday meals, and quality education. Be a part of the village that raises a child.',
            amounts: ['$25', '$50', '$100', 'Custom'],
            active_amount: '$100',
            cta_label: 'Proceed to Secure Donation',
        },
    },
    {
        slug: 'avs-footer',
        name: 'AVS Footer',
        fields: [
            { name: 'org_name', type: 'text', required: false },
            { name: 'description', type: 'text', required: false },
            { name: 'address', type: 'text', required: false },
            { name: 'email', type: 'text', required: false },
            { name: 'phone', type: 'text', required: false },
            { name: 'facebook_url', type: 'url', required: false },
            { name: 'instagram_url', type: 'url', required: false },
            { name: 'youtube_url', type: 'url', required: false },
            { name: 'copyright', type: 'text', required: false },
            { name: 'quick_links', type: 'json', required: false },
        ],
        data: {
            org_name: 'Arunachala Village School',
            description: 'A non-profit educational institution dedicated to empowering rural India through quality education and community development.',
            address: 'Tiruvannamalai Village,\nTamil Nadu, India 606601',
            email: 'info@arunachalavillage.org',
            phone: '+91 (0) 4175 234 567',
            facebook_url: '#',
            instagram_url: '#',
            youtube_url: '#',
            copyright: '© 2024 Arunachala Village School. All Rights Reserved.',
            quick_links: [
                { label: 'Our Founders', url: '#' },
                { label: 'Annual Reports', url: '#' },
                { label: 'Success Stories', url: '#' },
                { label: 'Privacy Policy', url: '#' },
            ],
        },
    },
]

// ─── Main ─────────────────────────────────────────────────────────────────────
async function main() {
    console.log(`\n🚀  Seeding Arunachala Village School page into PocketBase`)
    console.log(`    PB_URL:     ${PB_URL}`)
    console.log(`    PROJECT_ID: ${PROJECT_ID}\n`)

    const token = await authenticate()
    console.log('✅  Authenticated\n')

    // 1. Create/upsert schemas
    console.log('📐  Creating section schemas…')
    const schemaIds = {}
    for (const schema of SCHEMAS) {
        schemaIds[schema.slug] = await upsertSchema(token, schema.slug, schema.name, schema.fields)
    }

    // 2. Create/upsert page
    console.log('\n📄  Creating page…')
    const pageId = await upsertPage(token, 'arunachala-village-school', 'Arunachala Village School')

    // 3. Create sections in order (order starts at 1 — PocketBase rejects 0 for min:0 number fields)
    console.log('\n🔧  Creating sections…')
    for (let i = 0; i < SCHEMAS.length; i++) {
        const schema = SCHEMAS[i]
        await createSection(token, pageId, schemaIds[schema.slug], i + 1, schema.data)
    }

    console.log(`
✨  Done!

Next steps:
  1. Open the CMS dashboard → your project → Pages
  2. You should see "Arunachala Village School" listed
  3. Visit http://localhost:3000/arunachala-village-school — it now renders via the CMS
  4. Optionally delete packages/site/app/pages/arunachala-village-school.vue (the static file)
`)
}

main().catch(err => {
    console.error('\n❌  Seed failed:', err.message)
    process.exit(1)
})
