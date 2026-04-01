import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

/**
 * Public endpoint: returns the single active announcement whose date range
 * covers right now. Returns null if nothing is active.
 */
export async function GET() {
  try {
    const db = getDb();
    const now = new Date().toISOString().slice(0, 10); // YYYY-MM-DD

    const result = await db.execute({
      sql: `SELECT * FROM announcements
            WHERE is_active = 1
              AND start_date <= ?
              AND end_date   >= ?
            ORDER BY created_at DESC
            LIMIT 1`,
      args: [now, now],
    });

    return NextResponse.json(result.rows[0] ?? null);
  } catch (err) {
    console.error(err);
    return NextResponse.json(null);
  }
}
