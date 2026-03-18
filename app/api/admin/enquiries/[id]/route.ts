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

    if (body.status !== undefined) { fields.push('status = ?'); vals.push(body.status); }
    if (body.is_read !== undefined) { fields.push('is_read = ?'); vals.push(body.is_read ? 1 : 0); }
    if (body.notes !== undefined) { fields.push('notes = ?'); vals.push(body.notes); }

    if (fields.length === 0) return NextResponse.json({ error: 'Nothing to update' }, { status: 400 });

    await db.execute({
      sql: `UPDATE enquiries SET ${fields.join(', ')} WHERE id = ?`,
      args: [...vals, Number(id)],
    });

    const enquiry = (await db.execute({
      sql: 'SELECT * FROM enquiries WHERE id = ?',
      args: [Number(id)],
    })).rows[0];
    return NextResponse.json(enquiry);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update enquiry' }, { status: 500 });
  }
}
