import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT * FROM testimonials WHERE is_active = 1 ORDER BY display_order ASC, created_at DESC`,
      args: [],
    });
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}
