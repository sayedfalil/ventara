import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM announcements ORDER BY created_at DESC',
    args: [],
  });
  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { title, image_url, link_url, start_date, end_date, is_active } = body;

    if (!title || !start_date || !end_date) {
      return NextResponse.json({ error: 'Title, start date and end date are required' }, { status: 400 });
    }
    if (start_date > end_date) {
      return NextResponse.json({ error: 'Start date must be before end date' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: `INSERT INTO announcements (title, image_url, link_url, start_date, end_date, is_active)
            VALUES (?, ?, ?, ?, ?, ?)`,
      args: [title, image_url || '', link_url || '', start_date, end_date, is_active ? 1 : 0],
    });

    const row = (await db.execute({
      sql: 'SELECT * FROM announcements WHERE id = ?',
      args: [result.lastInsertRowid!],
    })).rows[0];

    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create announcement' }, { status: 500 });
  }
}
