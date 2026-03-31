import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await params;
    const db = getDb();
    const result = await db.execute({ sql: 'SELECT * FROM packages WHERE id = ?', args: [Number(id)] });
    const pkg = result.rows[0];
    if (!pkg) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json(pkg);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch package' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const { 
      title, description, duration, price, image_url, tag, highlights, is_featured,
      itinerary, whats_included, things_to_carry
    } = body;

    if (!title || !description || !duration || !price || !image_url || !tag) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: `UPDATE packages
            SET title=?, description=?, duration=?, price=?, image_url=?, tag=?, highlights=?, is_featured=?,
                itinerary=?, whats_included=?, things_to_carry=?
            WHERE id=?`,
      args: [
        title, description, duration, price, image_url, tag,
        JSON.stringify(Array.isArray(highlights) ? highlights : []),
        is_featured ? 1 : 0,
        JSON.stringify(Array.isArray(itinerary) ? itinerary : []),
        JSON.stringify(Array.isArray(whats_included) ? whats_included : []),
        JSON.stringify(Array.isArray(things_to_carry) ? things_to_carry : []),
        Number(id),
      ],
    });

    if (result.rowsAffected === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    const pkg = (await db.execute({ sql: 'SELECT * FROM packages WHERE id = ?', args: [Number(id)] })).rows[0];
    return NextResponse.json(pkg);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update package' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const db = getDb();
    const result = await db.execute({ sql: 'DELETE FROM packages WHERE id = ?', args: [Number(id)] });
    if (result.rowsAffected === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete package' }, { status: 500 });
  }
}
