import { createClient, type Client } from '@libsql/client';

declare global {
  // eslint-disable-next-line no-var
  var __vantaraDb: Client | undefined;
}

/**
 * Returns the Turso / libSQL client.
 * - Production (Vercel): uses TURSO_DATABASE_URL + TURSO_AUTH_TOKEN
 * - Local dev: falls back to local SQLite file via libsql file: protocol
 */
export function getDb(): Client {
  if (!global.__vantaraDb) {
    global.__vantaraDb = createClient({
      url: process.env.TURSO_DATABASE_URL ?? 'file:data/vantara.db',
      authToken: process.env.TURSO_AUTH_TOKEN,
    });
  }
  return global.__vantaraDb;
}

export function slugify(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}
