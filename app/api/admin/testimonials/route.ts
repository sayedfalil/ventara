import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT * FROM testimonials ORDER BY display_order ASC, created_at DESC`,
      args: [],
    });
    return NextResponse.json(result.rows);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch testimonials' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const { client_name, client_role, client_company, body: testimonialBody, rating, image_url, package_name, is_active, display_order } = body;

    if (!client_name || !testimonialBody) {
      return NextResponse.json({ error: 'Name and testimonial text are required' }, { status: 400 });
    }

    const db = getDb();
    const result = await db.execute({
      sql: `INSERT INTO testimonials (client_name, client_role, client_company, body, rating, image_url, package_name, is_active, display_order)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      args: [
        client_name, client_role || '', client_company || '',
        testimonialBody, rating ?? 5, image_url || '',
        package_name || '', is_active ? 1 : 0, display_order ?? 0,
      ],
    });

    const row = (await db.execute({ sql: 'SELECT * FROM testimonials WHERE id = ?', args: [result.lastInsertRowid!] })).rows[0];
    return NextResponse.json(row, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create testimonial' }, { status: 500 });
  }
}
