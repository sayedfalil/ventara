/**
 * Schema v2 migration: adds all new tables and columns for
 * testimonials, proposals, lead activity log, and extended enquiry CRM fields.
 *
 * Safe to run multiple times — uses IF NOT EXISTS and try/catch for ALTER TABLE.
 *
 * Run ONCE before deploying:
 *   node scripts/migrate-schema-v2.mjs
 */

import { createClient } from '@libsql/client';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

// ── Load .env.local ────────────────────────────────────────────────
const envPath = join(process.cwd(), '.env.local');
if (existsSync(envPath)) {
  const envContent = readFileSync(envPath, 'utf-8');
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eqIdx = trimmed.indexOf('=');
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim();
    if (key) process.env[key] = val;
  }
}

const TURSO_URL   = process.env.TURSO_DATABASE_URL;
const TURSO_TOKEN = process.env.TURSO_AUTH_TOKEN;

// Prefer remote Turso; fall back to local SQLite for local dev
const db = TURSO_URL && TURSO_TOKEN
  ? createClient({ url: TURSO_URL, authToken: TURSO_TOKEN })
  : createClient({ url: 'file:data/ventara.db' });

const isRemote = !!(TURSO_URL && TURSO_TOKEN);
console.log(`🗄  Using ${isRemote ? 'Turso remote' : 'local SQLite'} database`);

// ── Helper: run a SQL statement and swallow expected errors ─────────
async function safeExec(sql, label) {
  try {
    await db.execute({ sql, args: [] });
    console.log(`  ✅  ${label}`);
  } catch (err) {
    const msg = err.message || '';
    // Ignore "already exists" and "duplicate column" errors
    if (
      msg.includes('already exists') ||
      msg.includes('duplicate column') ||
      msg.includes('UNIQUE constraint') ||
      msg.includes('no such column') // some ALTERs on non-existent col
    ) {
      console.log(`  ⏭   ${label} (already exists — skipped)`);
    } else {
      throw err;
    }
  }
}

async function run() {
  console.log('\n🚀  Starting schema v2 migration…\n');

  // ── 1. Extend enquiries table ──────────────────────────────────
  console.log('📋  Extending enquiries table…');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN budget TEXT NOT NULL DEFAULT ''`, 'enquiries.budget');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN priority TEXT NOT NULL DEFAULT 'medium'`, 'enquiries.priority');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN follow_up_date TEXT NOT NULL DEFAULT ''`, 'enquiries.follow_up_date');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN utm_source TEXT NOT NULL DEFAULT ''`, 'enquiries.utm_source');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN utm_medium TEXT NOT NULL DEFAULT ''`, 'enquiries.utm_medium');
  await safeExec(`ALTER TABLE enquiries ADD COLUMN utm_campaign TEXT NOT NULL DEFAULT ''`, 'enquiries.utm_campaign');

  // ── 2. Testimonials ────────────────────────────────────────────
  console.log('\n⭐  Creating testimonials table…');
  await safeExec(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      client_name  TEXT    NOT NULL,
      client_role  TEXT    NOT NULL DEFAULT '',
      client_company TEXT  NOT NULL DEFAULT '',
      body         TEXT    NOT NULL,
      rating       INTEGER NOT NULL DEFAULT 5,
      image_url    TEXT    NOT NULL DEFAULT '',
      package_name TEXT    NOT NULL DEFAULT '',
      is_active    INTEGER NOT NULL DEFAULT 1,
      display_order INTEGER NOT NULL DEFAULT 0,
      created_at   TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `, 'testimonials table');

  // ── 3. Proposals ───────────────────────────────────────────────
  console.log('\n📄  Creating proposals table…');
  await safeExec(`
    CREATE TABLE IF NOT EXISTS proposals (
      id              INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_id      INTEGER REFERENCES enquiries(id) ON DELETE SET NULL,
      title           TEXT    NOT NULL,
      client_name     TEXT    NOT NULL DEFAULT '',
      client_email    TEXT    NOT NULL DEFAULT '',
      company_logo    TEXT    NOT NULL DEFAULT '',
      status          TEXT    NOT NULL DEFAULT 'draft',
      tax_rate        REAL    NOT NULL DEFAULT 0,
      discount_amount REAL    NOT NULL DEFAULT 0,
      terms           TEXT    NOT NULL DEFAULT '',
      notes           TEXT    NOT NULL DEFAULT '',
      valid_until     TEXT    NOT NULL DEFAULT '',
      created_at      TEXT    NOT NULL DEFAULT (datetime('now')),
      updated_at      TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `, 'proposals table');

  // ── 4. Proposal line items ─────────────────────────────────────
  console.log('\n📝  Creating proposal_items table…');
  await safeExec(`
    CREATE TABLE IF NOT EXISTS proposal_items (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      proposal_id  INTEGER NOT NULL REFERENCES proposals(id) ON DELETE CASCADE,
      description  TEXT    NOT NULL,
      quantity     REAL    NOT NULL DEFAULT 1,
      unit_price   REAL    NOT NULL DEFAULT 0,
      sort_order   INTEGER NOT NULL DEFAULT 0
    )
  `, 'proposal_items table');

  // ── 5. Lead activity log ───────────────────────────────────────
  console.log('\n🗒   Creating lead_activity_log table…');
  await safeExec(`
    CREATE TABLE IF NOT EXISTS lead_activity_log (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      enquiry_id  INTEGER NOT NULL REFERENCES enquiries(id) ON DELETE CASCADE,
      action_type TEXT    NOT NULL,
      description TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now'))
    )
  `, 'lead_activity_log table');

  // ── 6. Add updated_at to enquiries (nice-to-have) ─────────────
  await safeExec(`ALTER TABLE enquiries ADD COLUMN updated_at TEXT NOT NULL DEFAULT ''`, 'enquiries.updated_at');

  console.log('\n🎉  Schema v2 migration complete!\n');
  console.log('    New capabilities unlocked:');
  console.log('    • Enquiries: budget, priority, follow-up date, UTM params');
  console.log('    • Testimonials table');
  console.log('    • Proposals + line items tables');
  console.log('    • Lead activity log');
  console.log('\n    Next: deploy to Vercel and run this against your Turso DB.\n');
}

run().catch(err => {
  console.error('\n❌  Migration failed:', err.message);
  process.exit(1);
});
