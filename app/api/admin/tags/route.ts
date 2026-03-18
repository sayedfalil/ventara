import { NextResponse } from 'next/server';
import { getDb, slugify } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM tags ORDER BY name', args: [] });
  return NextResponse.json(result.rows);
}

export async function POST(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { name } = await request.json();
  if (!name) return NextResponse.json({ error: 'Name required' }, { status: 400 });

  const db = getDb();
  try {
    const result = await db.execute({
      sql: 'INSERT INTO tags (name, slug) VALUES (?, ?)',
      args: [name, slugify(name)],
    });
    const tag = (await db.execute({
      sql: 'SELECT * FROM tags WHERE id = ?',
      args: [result.lastInsertRowid!],
    })).rows[0];
    return NextResponse.json(tag, { status: 201 });
  } catch {
    return NextResponse.json({ error: 'Tag already exists' }, { status: 409 });
  }
}
