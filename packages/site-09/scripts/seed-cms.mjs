import 'dotenv/config'

const PB_URL = process.env.NUXT_PUBLIC_PB_URL || 'http://localhost:8090'
const PROJECT_SLUG = process.env.NUXT_PUBLIC_PROJECT_SLUG || 'regenboog'
const PROJECT_API_KEY = process.env.NUXT_PUBLIC_API_KEY || 'placeholder-api-key'
const EMAIL = process.env.PB_SUPERUSER_EMAIL
const PASSWORD = process.env.PB_SUPERUSER_PASSWORD

async function authenticate() {
    const res = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identity: EMAIL, password: PASSWORD })
    })
    if (!res.ok) {
        const err = await res.json()
        console.error('Auth failed:', err)
        process.exit(1)
    }
    return (await res.json()).token
}

async function upsertProject(token) {
    const res = await fetch(`${PB_URL}/api/collections/projects/records?filter=(slug="${PROJECT_SLUG}")`, {
        headers: { 'Authorization': token }
    })
    const data = await res.json()
    const projectData = { name: 'Regenboog India', slug: PROJECT_SLUG, api_key: PROJECT_API_KEY, settings: {} }
    if (data.items?.length) {
        const id = data.items[0].id
        await fetch(`${PB_URL}/api/collections/projects/records/${id}`, {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
        return id
    } else {
        const resCreate = await fetch(`${PB_URL}/api/collections/projects/records`, {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(projectData)
        })
        return (await resCreate.json()).id
    }
}

async function upsertSchema(token, projectId, slug, name, fields) {
    const res = await fetch(`${PB_URL}/api/collections/section_schemas/records?filter=(project_id="${projectId}" && slug="${slug}")`, {
        headers: { 'Authorization': token }
    })
    const data = await res.json()
    const schemaData = { project_id: projectId, slug, name, fields_schema: fields, status: 'active', version: 1 }

    if (data.items?.length) {
        const id = data.items[0].id
        const patchRes = await fetch(`${PB_URL}/api/collections/section_schemas/records/${id}`, {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(schemaData)
        })
        if (!patchRes.ok) console.error(`Failed to patch schema ${slug}:`, await patchRes.json())
        return id
    } else {
        const resCreate = await fetch(`${PB_URL}/api/collections/section_schemas/records`, {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(schemaData)
        })
        const result = await resCreate.json()
        if (!resCreate.ok) {
            console.error(`Failed to create schema ${slug}:`, result)
            return null
        }
        return result.id
    }
}

async function upsertPage(token, projectId, slug, title) {
    const res = await fetch(`${PB_URL}/api/collections/pages/records?filter=(project_id="${projectId}" && slug="${slug}")`, {
        headers: { 'Authorization': token }
    })
    const data = await res.json()
    const pageData = { project_id: projectId, slug, title, status: 'published', version: 1 }

    let pageId;
    if (data.items?.length) {
        pageId = data.items[0].id
        const patchRes = await fetch(`${PB_URL}/api/collections/pages/records/${pageId}`, {
            method: 'PATCH',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(pageData)
        })
        if (!patchRes.ok) console.error(`Failed to patch page ${slug}:`, await patchRes.json())
    } else {
        const resCreate = await fetch(`${PB_URL}/api/collections/pages/records`, {
            method: 'POST',
            headers: { 'Authorization': token, 'Content-Type': 'application/json' },
            body: JSON.stringify(pageData)
        })
        const result = await resCreate.json()
        if (!resCreate.ok) {
            console.error(`Failed to create page ${slug}:`, result)
            return null
        }
        pageId = result.id
    }

    if (pageId) {
        // Delete existing sections to re-seed
        const sectionsRes = await fetch(`${PB_URL}/api/collections/sections/records?filter=(page_id="${pageId}")`, {
            headers: { 'Authorization': token }
        })
        const sectionsData = await sectionsRes.json()
        for (const s of sectionsData.items || []) {
            await fetch(`${PB_URL}/api/collections/sections/records/${s.id}`, { method: 'DELETE', headers: { 'Authorization': token } })
        }
    }
    return pageId
}

async function createSection(token, pageId, schemaId, order, data) {
    const res = await fetch(`${PB_URL}/api/collections/sections/records`, {
        method: 'POST',
        headers: { 'Authorization': token, 'Content-Type': 'application/json' },
        body: JSON.stringify({ page_id: pageId, schema_id: schemaId, order, status: 'published', data })
    })
    if (!res.ok) {
        console.error('Failed to create section:', await res.json())
    }
}

async function run() {
    console.log('--- Starting Content Migration ---')
    const token = await authenticate()
    const projectId = await upsertProject(token)
    console.log('Project ID:', projectId)

    // 1. Define Schemas
    const s = {
        hero: await upsertSchema(token, projectId, 'hero-section', 'Hero Section', [{ name: 'title', type: 'text' }, { name: 'title_highlight', type: 'text' }, { name: 'cta_text', type: 'text' }, { name: 'cta_url', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'features', type: 'json' }, { name: 'left_image_url', type: 'url' }, { name: 'right_image_url', type: 'url' }]),
        stats: await upsertSchema(token, projectId, 'stats-section', 'Stats Section', [{ name: 'items', type: 'json' }]),
        mission: await upsertSchema(token, projectId, 'mission-section', 'Mission Section', [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'cta_text', type: 'text' }, { name: 'cta_url', type: 'text' }, { name: 'cards', type: 'json' }]),
        programs: await upsertSchema(token, projectId, 'programs-section', 'Programs Section', [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'cta_text', type: 'text' }, { name: 'cta_url', type: 'text' }, { name: 'programs', type: 'json' }]),
        news: await upsertSchema(token, projectId, 'news-section', 'News Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'news', type: 'json' }]),
        volunteer: await upsertSchema(token, projectId, 'volunteer-section', 'Volunteer Section', [{ name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'cta_primary_text', type: 'text' }, { name: 'cta_primary_url', type: 'text' }, { name: 'cta_secondary_text', type: 'text' }, { name: 'cta_secondary_url', type: 'text' }, { name: 'stats', type: 'json' }]),
        aboutHero: await upsertSchema(token, projectId, 'about-hero', 'About Hero', [{ name: 'badge', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }]),
        history: await upsertSchema(token, projectId, 'history-section', 'History Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'content', type: 'json' }, { name: 'image_url', type: 'url' }, { name: 'image_label', type: 'text' }, { name: 'timeline', type: 'json' }]),
        purpose: await upsertSchema(token, projectId, 'purpose-section', 'Purpose Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'cards', type: 'json' }]),
        team: await upsertSchema(token, projectId, 'team-section', 'Team Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'team', type: 'json' }]),
        compliance: await upsertSchema(token, projectId, 'compliance-section', 'Compliance Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'content', type: 'json' }, { name: 'contact_text', type: 'text' }, { name: 'contact_email', type: 'text' }]),
        impactHero: await upsertSchema(token, projectId, 'impact-hero', 'Impact Hero', [{ name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'cta_text', type: 'text' }, { name: 'cta_url', type: 'text' }, { name: 'bg_image_url', type: 'url' }]),
        impactStats: await upsertSchema(token, projectId, 'impact-stats', 'Impact Stats', [{ name: 'stats', type: 'json' }]),
        storiesGrid: await upsertSchema(token, projectId, 'stories-grid', 'Stories Grid', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'cta_text', type: 'text' }, { name: 'cta_url', type: 'text' }, { name: 'stories', type: 'json' }]),
        testimonials: await upsertSchema(token, projectId, 'testimonials-section', 'Testimonials Section', [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'testimonials', type: 'json' }]),
        transparency: await upsertSchema(token, projectId, 'transparency-section', 'Transparency Section', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'stats', type: 'json' }, { name: 'expenses', type: 'json' }, { name: 'report_text', type: 'text' }, { name: 'report_url', type: 'text' }]),
        map: await upsertSchema(token, projectId, 'map-section', 'Map Section', [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'map_image_url', type: 'url' }, { name: 'hub_title', type: 'text' }, { name: 'hub_points', type: 'json' }, { name: 'points', type: 'json' }]),
        cta: await upsertSchema(token, projectId, 'cta-section', 'CTA Section', [{ name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'cta_primary_text', type: 'text' }, { name: 'cta_primary_url', type: 'text' }, { name: 'cta_secondary_text', type: 'text' }, { name: 'cta_secondary_url', type: 'text' }, { name: 'bg_color', type: 'text' }]),
        methodologyIntro: await upsertSchema(token, projectId, 'methodology-intro', 'Methodology Intro', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'content', type: 'json' }, { name: 'values', type: 'json' }]),
        sixPillars: await upsertSchema(token, projectId, 'six-pillars', 'Six Pillars', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'pillars', type: 'json' }]),
        strategyOutcome: await upsertSchema(token, projectId, 'strategy-outcome', 'Strategy Outcome', [{ name: 'strategies_title', type: 'text' }, { name: 'strategies', type: 'json' }, { name: 'outcomes_title', type: 'text' }, { name: 'outcomes', type: 'json' }, { name: 'description', type: 'text' }]),
        pillarDetail: await upsertSchema(token, projectId, 'pillar-detail', 'Pillar Detail', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'pillars', type: 'json' }, { name: 'footer_content', type: 'json' }]),
        infraHero: await upsertSchema(token, projectId, 'infrastructure-hero', 'Infra Hero', [{ name: 'title', type: 'text' }, { name: 'subtitle', type: 'text' }, { name: 'bg_image_url', type: 'url' }]),
        facilityGrid: await upsertSchema(token, projectId, 'facility-grid', 'Facility Grid', [{ name: 'subtitle', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'facilities', type: 'json' }]),
        infraDesign: await upsertSchema(token, projectId, 'infrastructure-design', 'Infra Design', [{ name: 'blocks', type: 'json' }]),
        kgSection: await upsertSchema(token, projectId, 'kindergarten-section', 'KG Section', [{ name: 'badge', type: 'text' }, { name: 'title', type: 'text' }, { name: 'description', type: 'text' }, { name: 'features', type: 'json' }, { name: 'image_url', type: 'url' }]),
        statBanner: await upsertSchema(token, projectId, 'generic-stat-banner', 'Stat Banner', [{ name: 'stats', type: 'json' }])
    }
    console.log('Schemas verified.')

    // 2. Home Page
    const hId = await upsertPage(token, projectId, 'home', 'Home')
    await createSection(token, hId, s.hero, 1, { title: 'Illuminating the lives of', title_highlight: 'underserved children', cta_text: 'DONATE TODAY', cta_url: '/donate', subtitle: 'Arunachala Village School provides quality education to rural children in Tiruvannamalai.', features: ['Holistic Education', 'Nutritional Support', 'Community Empowerment'] })
    await createSection(token, hId, s.stats, 2, { items: [{ icon: 'school', value: '50+', label: 'Schools are supported across 29 states', color: '#EB5C3F' }, { icon: 'diversity_3', value: '1.2M+', label: 'Children are given a direct impact', color: '#EB5C3F' }, { icon: 'volunteer_activism', value: '100+', label: 'Volunteers joined our movement', color: '#EB5C3F' }] })
    await createSection(token, hId, s.mission, 3, { subtitle: 'WHO WE ARE', title: 'Our Mission & Vision', cards: [{ title: 'The Mission', description: 'To provide high-quality education that is accessible to the most remote villages.', icon: 'track_changes', color: 'orange' }, { title: 'The Vision', description: 'A world where every child has the tools to succeed regardless of their background.', icon: 'visibility', color: 'blue' }] })
    await createSection(token, hId, s.programs, 4, { subtitle: 'WHAT WE DO', title: 'Our Core Programs', programs: [{ title: 'Smart Classrooms', description: 'Integrating technology with traditional teaching.', icon: 'computer' }, { title: 'Nutrition Program', description: 'Daily healthy meals for all students.', icon: 'restaurant' }] })
    await createSection(token, hId, s.volunteer, 5, { title: 'Help us make a difference', description: 'Join our community of supporters and volunteers.', cta_primary_text: 'DONATE NOW', cta_secondary_text: 'VOLUNTEER', stats: [{ value: '1,240+', label: 'Students' }, { value: '15', label: 'Villages' }] })

    // 3. About Page
    const aId = await upsertPage(token, projectId, 'about', 'About')
    await createSection(token, aId, s.aboutHero, 1, { badge: 'Our Journey', title: 'A Legacy of Love and Learning', description: 'Building a brighter future for rural children since 1994.' })
    await createSection(token, aId, s.history, 2, { subtitle: 'ORIGIN & HISTORY', title: 'How it all started', content: ['Founder\'s story and the growth of the school over the decades.'], timeline: [{ year: '1994', event: 'School founded with 10 students.' }, { year: '2010', event: 'Reached 500 students milestone.' }] })
    await createSection(token, aId, s.purpose, 3, { subtitle: 'CORE PURPOSE', title: 'Driven by Values', cards: [{ title: 'Mission', description: 'Empowering children through holistic education.', icon: 'track_changes' }, { title: 'Vision', description: 'A community where every child thrives.', icon: 'visibility' }] })
    await createSection(token, aId, s.compliance, 4, { subtitle: 'LEGAL & COMPLIANCE', title: 'Transparency & Trust', content: ['We are a registered non-profit complying with all local regulations.'], contact_email: 'office@avschool.in' })

    // 4. Impact Stories
    const iId = await upsertPage(token, projectId, 'impact-stories', 'Impact Stories')
    await createSection(token, iId, s.impactHero, 1, { title: 'Witness the Power of Education', description: 'Every child has a story of transformation.', cta_text: 'Read Our Stories' })
    await createSection(token, iId, s.impactStats, 2, { stats: [{ icon: 'school', label: 'Graduates', value: '450+', trend: '+15% this year' }] })
    await createSection(token, iId, s.storiesGrid, 3, { title: 'Lives Transformed', stories: [{ tag: 'Success', title: 'Meena\'s Journey', description: 'From a village girl to a medical student.', image_url: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c' }] })
    await createSection(token, iId, s.testimonials, 4, { title: 'Community Voices', testimonials: [{ author: 'Lalitha Devi', role: 'Parent', quote: 'The school changed my children\'s lives.' }] })
    await createSection(token, iId, s.map, 5, { title: 'Our Growing Reach', hub_title: 'Tiruvannamalai Hub', hub_points: ['15 Villages covered'] })
    await createSection(token, iId, s.cta, 6, { title: 'Be Part of the Story', cta_primary_text: 'Donate Now' })

    // 5. Methodology
    const mId = await upsertPage(token, projectId, 'methodology', 'Methodology')
    await createSection(token, mId, s.aboutHero, 1, { badge: 'Methodology', title: 'How We Teach & Why We Believe', description: 'Nurturing the whole child through joy and love.' })
    await createSection(token, mId, s.methodologyIntro, 2, { title: 'Our Approach to Education', content: ['Rooted in values of helping and respecting others.'], values: [{ icon: 'volunteer_activism', label: 'Helping' }, { icon: 'handshake', label: 'Respect' }] })
    await createSection(token, mId, s.strategyOutcome, 3, { strategies_title: 'Implementation', strategies: [{ label: 'Warmth', detail: 'Teachers act with warmth and patience.' }], outcomes_title: 'Outcomes', outcomes: ['Happy and confident individuals.'] })

    // 6. Infrastructure
    const infId = await upsertPage(token, projectId, 'infrastructure', 'Infrastructure')
    await createSection(token, infId, s.infraHero, 1, { title: 'A Campus Designed for Discovery', subtitle: 'Where nature and learning coexist.' })
    await createSection(token, infId, s.statBanner, 2, { stats: [{ label: 'Acre Campus', value: '1.5' }, { label: 'Classrooms', value: '18' }] })
    await createSection(token, infId, s.facilityGrid, 3, { title: 'Designed for Joy', facilities: [{ title: 'Resource Center', description: 'A library and digital hub.', icon: 'library_books' }] })

    console.log('Migration complete!')
}

run().catch(console.error)
