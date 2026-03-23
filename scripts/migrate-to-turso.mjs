/**
 * Migration script: copies all data from local SQLite → Turso
 * Run ONCE before deploying to Vercel:
 *   node scripts/migrate-to-turso.mjs
 *
 * Requires: TURSO_DATABASE_URL and TURSO_AUTH_TOKEN in .env.local
 */

import { createClient } from '@libsql/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// ── Load .env.local ────────────────────────────────────────────────
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const [key, ...rest] = line.split('=');
    if (key && rest.length) process.env[key.trim()] = rest.join('=').trim();
  }
}

const TURSO_URL = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;
const LOCAL_DB = join(process.cwd(), 'data', 'ventara.db');

if (!TURSO_URL || !TURSO_TOKEN) {
  console.error('❌  TURSO_DATABASE_URL and TURSO_AUTH_TOKEN must be set in .env.local');
  process.exit(1);
}
if (!existsSync(LOCAL_DB)) {
  console.error(`❌  Local database not found at ${LOCAL_DB}`);
  process.exit(1);
}

const local = createClient({ url: `file:${LOCAL_DB}` });
const turso = createClient({ url: TURSO_URL, authToken: TURSO_TOKEN });

async function run() {
  console.log('🚀  Starting Turso migration…');

  // ── 1. Create schema in Turso ──────────────────────────────────
  console.log('📐  Creating schema…');
  await turso.executeMultiple(`
    CREATE TABLE IF NOT EXISTS packages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      duration TEXT NOT NULL,
      price TEXT NOT NULL,
      image_url TEXT NOT NULL,
      tag TEXT NOT NULL,
      highlights TEXT NOT NULL DEFAULT '[]',
      is_featured INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE NOT NULL,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS tags (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blogs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      slug TEXT UNIQUE NOT NULL,
      excerpt TEXT NOT NULL DEFAULT '',
      body TEXT NOT NULL DEFAULT '',
      featured_image TEXT NOT NULL DEFAULT '',
      category_id INTEGER REFERENCES categories(id) ON DELETE SET NULL,
      author TEXT NOT NULL DEFAULT 'Ventara Team',
      status TEXT NOT NULL DEFAULT 'draft',
      published_at TEXT,
      meta_title TEXT NOT NULL DEFAULT '',
      meta_description TEXT NOT NULL DEFAULT '',
      focus_keyword TEXT NOT NULL DEFAULT '',
      og_title TEXT NOT NULL DEFAULT '',
      og_description TEXT NOT NULL DEFAULT '',
      og_image TEXT NOT NULL DEFAULT '',
      twitter_card TEXT NOT NULL DEFAULT 'summary_large_image',
      canonical_url TEXT NOT NULL DEFAULT '',
      robots TEXT NOT NULL DEFAULT 'index,follow',
      schema_type TEXT NOT NULL DEFAULT 'BlogPosting',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS blog_tags (
      blog_id INTEGER NOT NULL REFERENCES blogs(id) ON DELETE CASCADE,
      tag_id INTEGER NOT NULL REFERENCES tags(id) ON DELETE CASCADE,
      PRIMARY KEY (blog_id, tag_id)
    );

    CREATE TABLE IF NOT EXISTS enquiries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      email TEXT NOT NULL,
      phone TEXT NOT NULL DEFAULT '',
      package_name TEXT NOT NULL DEFAULT '',
      travelers INTEGER NOT NULL DEFAULT 1,
      travel_date TEXT NOT NULL DEFAULT '',
      message TEXT NOT NULL DEFAULT '',
      source_url TEXT NOT NULL DEFAULT '',
      status TEXT NOT NULL DEFAULT 'new',
      is_read INTEGER NOT NULL DEFAULT 0,
      notes TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );
  `);
  console.log('  ✅  Schema created');

  // ── Helper: copy a table ───────────────────────────────────────
  async function copyTable(table, insertFn) {
    const rows = (await local.execute({ sql: `SELECT * FROM ${table}`, args: [] })).rows;
    if (rows.length === 0) { console.log(`  ⏭   ${table}: empty, skipping`); return; }
    let count = 0;
    for (const row of rows) {
      try {
        await insertFn(row);
        count++;
      } catch (e) {
        if (!e.message?.includes('UNIQUE')) throw e;
        // Skip duplicates silently
      }
    }
    console.log(`  ✅  ${table}: ${count} rows copied`);
  }

  // ── 2. Copy data ───────────────────────────────────────────────
  console.log('📦  Copying data…');

  await copyTable('admin_users', (r) => turso.execute({
    sql: 'INSERT OR IGNORE INTO admin_users (id, username, password_hash, created_at) VALUES (?,?,?,?)',
    args: [r.id, r.username, r.password_hash, r.created_at],
  }));

  await copyTable('categories', (r) => turso.execute({
    sql: 'INSERT OR IGNORE INTO categories (id, name, slug, created_at) VALUES (?,?,?,?)',
    args: [r.id, r.name, r.slug, r.created_at],
  }));

  await copyTable('tags', (r) => turso.execute({
    sql: 'INSERT OR IGNORE INTO tags (id, name, slug, created_at) VALUES (?,?,?,?)',
    args: [r.id, r.name, r.slug, r.created_at],
  }));

  await copyTable('packages', (r) => turso.execute({
    sql: `INSERT OR IGNORE INTO packages
            (id, title, description, duration, price, image_url, tag, highlights, is_featured, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?)`,
    args: [r.id, r.title, r.description, r.duration, r.price, r.image_url, r.tag, r.highlights, r.is_featured, r.created_at],
  }));

  await copyTable('blogs', (r) => turso.execute({
    sql: `INSERT OR IGNORE INTO blogs
            (id, title, slug, excerpt, body, featured_image, category_id, author, status,
             published_at, meta_title, meta_description, focus_keyword, og_title, og_description,
             og_image, twitter_card, canonical_url, robots, schema_type, created_at, updated_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      r.id, r.title, r.slug, r.excerpt, r.body, r.featured_image, r.category_id,
      r.author, r.status, r.published_at, r.meta_title, r.meta_description,
      r.focus_keyword, r.og_title, r.og_description, r.og_image, r.twitter_card,
      r.canonical_url, r.robots, r.schema_type, r.created_at, r.updated_at,
    ],
  }));

  await copyTable('blog_tags', (r) => turso.execute({
    sql: 'INSERT OR IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?,?)',
    args: [r.blog_id, r.tag_id],
  }));

  await copyTable('enquiries', (r) => turso.execute({
    sql: `INSERT OR IGNORE INTO enquiries
            (id, full_name, email, phone, package_name, travelers, travel_date,
             message, source_url, status, is_read, notes, created_at)
          VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?)`,
    args: [
      r.id, r.full_name, r.email, r.phone, r.package_name, r.travelers,
      r.travel_date, r.message, r.source_url, r.status, r.is_read, r.notes, r.created_at,
    ],
  }));

  console.log('\n🎉  Migration complete! Your Turso database is ready.');
  console.log('    Next steps:');
  console.log('    1. Push to GitHub: git push origin main');
  console.log('    2. Import repo to Vercel and add env vars');
}

run().catch((err) => {
  console.error('❌  Migration failed:', err.message);
  process.exit(1);
});
