import { copyFileSync, mkdirSync, existsSync } from 'fs';
import { resolve } from 'path';

console.log('Seeding initial data for Ophillia HCMS...');

// This script will eventually insert base schema data into SQLite.
// For Phase 0, we just ensure directories exist and perhaps copy a starter db if one exists.
const dataDir = resolve(__dirname, '../pocketbase/pb_data');
const migrationsDir = resolve(__dirname, '../pocketbase/pb_migrations');

if (!existsSync(dataDir)) {
    mkdirSync(dataDir, { recursive: true });
    console.log(`Created data dir at ${dataDir}`);
}

if (!existsSync(migrationsDir)) {
    mkdirSync(migrationsDir, { recursive: true });
    console.log(`Created migrations dir at ${migrationsDir}`);
}

console.log('Seed preparation complete.');
