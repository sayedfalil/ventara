import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const db = getDb();
  const result = await db.execute({
    sql: 'SELECT * FROM lead_activity_log WHERE enquiry_id = ? ORDER BY created_at DESC',
    args: [Number(id)],
  });
  return NextResponse.json(result.rows);
}

export async function POST(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { id } = await params;
  const { action_type, description } = await request.json();
  if (!action_type || !description) return NextResponse.json({ error: 'action_type and description required' }, { status: 400 });

  const db = getDb();
  const result = await db.execute({
    sql: 'INSERT INTO lead_activity_log (enquiry_id, action_type, description) VALUES (?, ?, ?)',
    args: [Number(id), action_type, description],
  });
  const row = (await db.execute({ sql: 'SELECT * FROM lead_activity_log WHERE id = ?', args: [result.lastInsertRowid!] })).rows[0];
  return NextResponse.json(row, { status: 201 });
}
