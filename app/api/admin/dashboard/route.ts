import { NextResponse } from 'next/server';
import { getDb } from '@/lib/db';
import { verifyAuth } from '@/lib/auth';

export async function GET() {
  const auth = await verifyAuth();
  if (!auth) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  try {
    const db = getDb();

    // Total enquiries
    const totalResult = await db.execute({ sql: 'SELECT COUNT(*) as total FROM enquiries', args: [] });
    const total = Number(totalResult.rows[0].total);

    // Enquiries by status
    const byStatusResult = await db.execute({
      sql: `SELECT status, COUNT(*) as count FROM enquiries GROUP BY status ORDER BY count DESC`,
      args: [],
    });
    const byStatus = byStatusResult.rows.map(r => ({ status: String(r.status), count: Number(r.count) }));

    // Unread count
    const unreadResult = await db.execute({ sql: `SELECT COUNT(*) as c FROM enquiries WHERE is_read = 0`, args: [] });
    const unread = Number(unreadResult.rows[0].c);

    // New this week
    const weekResult = await db.execute({
      sql: `SELECT COUNT(*) as c FROM enquiries WHERE created_at >= datetime('now', '-7 days')`,
      args: [],
    });
    const thisWeek = Number(weekResult.rows[0].c);

    // New this month
    const monthResult = await db.execute({
      sql: `SELECT COUNT(*) as c FROM enquiries WHERE created_at >= datetime('now', '-30 days')`,
      args: [],
    });
    const thisMonth = Number(monthResult.rows[0].c);

    // Won + Lost for conversion
    const wonResult = await db.execute({
      sql: `SELECT COUNT(*) as c FROM enquiries WHERE status IN ('won', 'converted')`,
      args: [],
    });
    const won = Number(wonResult.rows[0].c);

    // Proposals stats
    const proposalResult = await db.execute({ sql: `SELECT COUNT(*) as total FROM proposals`, args: [] });
    const totalProposals = Number(proposalResult.rows[0].total);

    const proposalByStatusResult = await db.execute({
      sql: `SELECT status, COUNT(*) as count FROM proposals GROUP BY status`,
      args: [],
    });
    const proposalsByStatus = proposalByStatusResult.rows.map(r => ({ status: String(r.status), count: Number(r.count) }));

    // Recent 8 enquiries
    const recentResult = await db.execute({
      sql: `SELECT id, full_name, email, package_name, status, priority, created_at FROM enquiries ORDER BY created_at DESC LIMIT 8`,
      args: [],
    });
    const recentLeads = recentResult.rows;

    // Packages & blogs counts
    const pkgResult = await db.execute({ sql: `SELECT COUNT(*) as c FROM packages`, args: [] });
    const totalPackages = Number(pkgResult.rows[0].c);

    const blogResult = await db.execute({ sql: `SELECT COUNT(*) as c FROM blogs WHERE status = 'published'`, args: [] });
    const publishedBlogs = Number(blogResult.rows[0].c);

    // Leads trend — last 6 months
    const trendResult = await db.execute({
      sql: `SELECT strftime('%Y-%m', created_at) as month, COUNT(*) as count
            FROM enquiries
            WHERE created_at >= datetime('now', '-6 months')
            GROUP BY month
            ORDER BY month ASC`,
      args: [],
    });
    const trend = trendResult.rows.map(r => ({ month: String(r.month), count: Number(r.count) }));

    return NextResponse.json({
      leads: { total, unread, thisWeek, thisMonth, won, byStatus },
      proposals: { total: totalProposals, byStatus: proposalsByStatus },
      content: { packages: totalPackages, publishedBlogs },
      recentLeads,
      trend,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to load dashboard' }, { status: 500 });
  }
}
