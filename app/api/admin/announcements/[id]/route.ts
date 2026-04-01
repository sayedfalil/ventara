import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const fields: string[] = [];
    const vals: (string | number)[] = [];

    const allowed = ['title', 'image_url', 'link_url', 'start_date', 'end_date', 'is_active'] as const;
    for (const key of allowed) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        vals.push(key === 'is_active' ? (body[key] ? 1 : 0) : body[key]);
      }
    }

    if (fields.length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

    await db.execute({
      sql: `UPDATE announcements SET ${fields.join(', ')} WHERE id = ?`,
      args: [...vals, Number(id)],
    });

    const row = (await db.execute({
      sql: 'SELECT * FROM announcements WHERE id = ?',
      args: [Number(id)],
    })).rows[0];

    return NextResponse.json(row);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await getDb().execute({ sql: 'DELETE FROM announcements WHERE id = ?', args: [Number(id)] });
  return NextResponse.json({ success: true });
}
