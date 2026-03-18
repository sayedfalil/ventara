import { NextResponse } from 'next/server';
import { getDb, slugify } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const db = getDb();
    const blogResult = await db.execute({
      sql: 'SELECT * FROM blogs WHERE id = ?',
      args: [Number(id)],
    });
    const blog = blogResult.rows[0];
    if (!blog) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    const tagsResult = await db.execute({
      sql: `SELECT t.id, t.name, t.slug FROM tags t
            JOIN blog_tags bt ON bt.tag_id = t.id WHERE bt.blog_id = ?`,
      args: [Number(id)],
    });

    return NextResponse.json({ ...blog, tags: tagsResult.rows });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch blog' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const body = await request.json();
    const db = getDb();

    const slug = body.slug || slugify(body.title);
    const publishedAt = body.status === 'published'
      ? (body.published_at || new Date().toISOString())
      : null;

    const result = await db.execute({
      sql: `UPDATE blogs SET title=?, slug=?, excerpt=?, body=?, featured_image=?, category_id=?,
              author=?, status=?, published_at=?, meta_title=?, meta_description=?, focus_keyword=?,
              og_title=?, og_description=?, og_image=?, twitter_card=?, canonical_url=?, robots=?,
              schema_type=?, updated_at=datetime('now')
            WHERE id=?`,
      args: [
        body.title, slug, body.excerpt || '', body.body || '',
        body.featured_image || '', body.category_id || null, body.author || 'Vantara Team',
        body.status || 'draft', publishedAt,
        body.meta_title || '', body.meta_description || '', body.focus_keyword || '',
        body.og_title || '', body.og_description || '', body.og_image || '',
        body.twitter_card || 'summary_large_image', body.canonical_url || '',
        body.robots || 'index,follow', body.schema_type || 'BlogPosting',
        Number(id),
      ],
    });

    if (result.rowsAffected === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });

    await db.execute({ sql: 'DELETE FROM blog_tags WHERE blog_id = ?', args: [Number(id)] });
    if (Array.isArray(body.tag_ids) && body.tag_ids.length > 0) {
      for (const tid of body.tag_ids) {
        await db.execute({
          sql: 'INSERT OR IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)',
          args: [Number(id), tid],
        });
      }
    }

    const blog = (await db.execute({
      sql: 'SELECT * FROM blogs WHERE id = ?',
      args: [Number(id)],
    })).rows[0];
    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to update blog' }, { status: 500 });
  }
}

export async function DELETE(_req: Request, { params }: { params: Promise<{ id: string }> }) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { id } = await params;
    const db = getDb();
    const result = await db.execute({
      sql: 'DELETE FROM blogs WHERE id = ?',
      args: [Number(id)],
    });
    if (result.rowsAffected === 0) return NextResponse.json({ error: 'Not found' }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to delete blog' }, { status: 500 });
  }
}
