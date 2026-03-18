import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';

export async function GET(_req: Request, { params }: { params: Promise<{ slug: string }> }) {
  try {
    const { slug } = await params;
    const db = getDb();

    const blogResult = await db.execute({
      sql: `SELECT b.*, c.name as category_name, c.slug as category_slug
            FROM blogs b
            LEFT JOIN categories c ON b.category_id = c.id
            WHERE b.slug = ? AND b.status = 'published'`,
      args: [slug],
    });

    const blog = blogResult.rows[0];
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const tagsResult = await db.execute({
      sql: `SELECT t.name, t.slug FROM tags t
            JOIN blog_tags bt ON bt.tag_id = t.id
            WHERE bt.blog_id = ?`,
      args: [blog.id as number],
    });

    return NextResponse.json({ ...blog, tags: tagsResult.rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}
