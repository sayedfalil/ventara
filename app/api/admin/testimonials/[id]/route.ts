import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const result = await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [Number(id)] });
  if (!result.rows[0]) return NextResponse.json({ error: 'Not found' }, { status: 404 });
  return NextResponse.json(result.rows[0]);
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const fields: string[] = [];
    const vals: (string | number)[] = [];

    const allowed = ['client_name','client_role','client_company','body','rating','image_url','package_name','is_active','display_order'] as const;
    for (const key of allowed) {
      if (body[key] !== undefined) {
        fields.push(`${key} = ?`);
        vals.push(key === 'is_active' ? (body[key] ? 1 : 0) : body[key]);
      }
    }

    if (fields.length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

    await db.execute({ sql: `UPDATE testimonials SET ${fields.join(', ')} WHERE id = ?`, args: [...vals, Number(id)] });
    const row = (await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [Number(id)] })).rows[0];
    return NextResponse.json(row);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update testimonial' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  await getDb().execute({ sql: 'DELETE FROM testimonials WHERE id = ?', args: [Number(id)] });
  return NextResponse.json({ success: true });
}
