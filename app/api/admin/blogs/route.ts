import { NextResponse } from 'next/server';
import { getDb, slugify } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = 10;
    const offset = (page - 1) * limit;
    const status = searchParams.get('status') || '';
    const search = searchParams.get('search') || '';
    const category = searchParams.get('category') || '';

    const db = getDb();
    const conditions: string[] = [];
    const args: (string | number)[] = [];

    if (status) { conditions.push('b.status = ?'); args.push(status); }
    if (category) { conditions.push('b.category_id = ?'); args.push(Number(category)); }
    if (search) { conditions.push('b.title LIKE ?'); args.push(`%${search}%`); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const totalResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM blogs b ${where}`,
      args,
    });
    const total = Number(totalResult.rows[0].total);

    const blogsResult = await db.execute({
      sql: `SELECT b.id, b.title, b.slug, b.status, b.author, b.published_at, b.created_at,
                   c.name as category_name
            FROM blogs b
            LEFT JOIN categories c ON b.category_id = c.id
            ${where}
            ORDER BY b.created_at DESC
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

export async function POST(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const body = await request.json();
    const db = getDb();

    const slug = body.slug || slugify(body.title);
    const publishedAt = body.status === 'published'
      ? (body.published_at || new Date().toISOString())
      : null;

    const result = await db.execute({
      sql: `INSERT INTO blogs (title, slug, excerpt, body, featured_image, category_id, author, status,
              published_at, meta_title, meta_description, focus_keyword, og_title, og_description,
              og_image, twitter_card, canonical_url, robots, schema_type)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`,
      args: [
        body.title, slug, body.excerpt || '', body.body || '',
        body.featured_image || '', body.category_id || null, body.author || 'Ventara Team',
        body.status || 'draft', publishedAt,
        body.meta_title || '', body.meta_description || '', body.focus_keyword || '',
        body.og_title || '', body.og_description || '', body.og_image || '',
        body.twitter_card || 'summary_large_image', body.canonical_url || '',
        body.robots || 'index,follow', body.schema_type || 'BlogPosting',
      ],
    });

    const blogId = Number(result.lastInsertRowid);

    if (Array.isArray(body.tag_ids) && body.tag_ids.length > 0) {
      for (const tid of body.tag_ids) {
        await db.execute({
          sql: 'INSERT OR IGNORE INTO blog_tags (blog_id, tag_id) VALUES (?, ?)',
          args: [blogId, tid],
        });
      }
    }

    const blog = (await db.execute({
      sql: 'SELECT * FROM blogs WHERE id = ?',
      args: [blogId],
    })).rows[0];
    return NextResponse.json(blog, { status: 201 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create blog' }, { status: 500 });
  }
}
