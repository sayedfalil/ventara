import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  try {
    const db = getDb();
    const result = await db.execute({
      sql: 'SELECT * FROM packages ORDER BY is_featured DESC, created_at DESC',
      args: [],
    });
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch packages' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await verifyAuth();
  if (!auth) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { title, description, duration, price, image_url, tag, highlights, is_featured } = body;

    if (!title || !description || !duration || !price || !image_url || !tag) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: `INSERT INTO packages (title, description, duration, price, image_url, tag, highlights, is_featured)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        title, description, duration, price, image_url, tag,
        JSON.stringify(Array.isArray(highlights) ? highlights : []),
        is_featured ? 1 : 0,
      ],
    });

    const pkg = (await db.execute({
      sql: 'SELECT * FROM packages WHERE id = ?',
      args: [result.lastInsertRowid!],
    })).rows[0];

    return NextResponse.json(pkg, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create package' }, { status: 500 });
  }
}
