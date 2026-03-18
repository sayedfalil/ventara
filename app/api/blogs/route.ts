import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = Math.min(20, Number(searchParams.get('limit') || 10));
    const category = searchParams.get('category') || '';
    const offset = (page - 1) * limit;

    const db = getDb();

    let where = "b.status = 'published'";
    const args: (string | number)[] = [];
    if (category) { where += ' AND c.slug = ?'; args.push(category); }

    const totalResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM blogs b
            LEFT JOIN categories c ON b.category_id = c.id
            WHERE ${where}`,
      args,
    });
    const total = Number(totalResult.rows[0].total);

    const blogsResult = await db.execute({
      sql: `SELECT b.id, b.title, b.slug, b.excerpt, b.featured_image,
                   b.author, b.published_at, b.meta_title, b.meta_description,
                   b.og_title, b.og_description, b.og_image, b.twitter_card,
                   b.canonical_url, b.robots, b.schema_type,
                   c.name as category_name, c.slug as category_slug
            FROM blogs b
            LEFT JOIN categories c ON b.category_id = c.id
            WHERE ${where}
            ORDER BY b.published_at DESC
            LIMIT ? OFFSET ?`,
      args: [...args, limit, offset],
    });

    return NextResponse.json({
      blogs: blogsResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
