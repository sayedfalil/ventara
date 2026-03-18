import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET(request: Request) {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const { searchParams } = new URL(request.url);
    const page = Math.max(1, Number(searchParams.get('page') || 1));
    const limit = 20;
    const offset = (page - 1) * limit;
    const status = searchParams.get('status') || '';
    const pkg = searchParams.get('package') || '';
    const dateFrom = searchParams.get('from') || '';
    const dateTo = searchParams.get('to') || '';

    const db = getDb();
    const conditions: string[] = [];
    const args: (string | number)[] = [];

    if (status) { conditions.push('status = ?'); args.push(status); }
    if (pkg) { conditions.push('package_name LIKE ?'); args.push(`%${pkg}%`); }
    if (dateFrom) { conditions.push('created_at >= ?'); args.push(dateFrom); }
    if (dateTo) { conditions.push('created_at <= ?'); args.push(dateTo + ' 23:59:59'); }

    const where = conditions.length ? 'WHERE ' + conditions.join(' AND ') : '';

    const totalResult = await db.execute({
      sql: `SELECT COUNT(*) as total FROM enquiries ${where}`,
      args,
    });
    const total = Number(totalResult.rows[0].total);

    const enquiriesResult = await db.execute({
      sql: `SELECT * FROM enquiries ${where} ORDER BY created_at DESC LIMIT ? OFFSET ?`,
      args: [...args, limit, offset],
    });

    return NextResponse.json({
      enquiries: enquiriesResult.rows,
      pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to fetch enquiries' }, { status: 500 });
  }
}
