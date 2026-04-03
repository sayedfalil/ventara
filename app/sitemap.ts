import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ventaraglobal.com';

  const routes: MetadataRoute.Sitemap = [
    { url: `${baseUrl}`, lastModified: new Date(), changeFrequency: 'weekly', priority: 1, },
    { url: `${baseUrl}/packages`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9, },
    { url: `${baseUrl}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8, },
  ];

  try {
    const db = getDb();
    
    // Blog routes
    const blogRes = await db.execute("SELECT slug, published_at FROM blogs WHERE status = 'published' ORDER BY published_at DESC LIMIT 1000");
    const blogRoutes: MetadataRoute.Sitemap = blogRes.rows.map((row) => ({
      url: `${baseUrl}/blog/${row.slug}`,
      lastModified: row.published_at ? new Date(row.published_at as string) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    // Package routes
    const packageRes = await db.execute("SELECT id FROM packages LIMIT 1000");
    const packageRoutes: MetadataRoute.Sitemap = packageRes.rows.map((row) => ({
      url: `${baseUrl}/packages/${row.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    }));

    return [...routes, ...blogRoutes, ...packageRoutes];
  } catch (error) {
    console.error('Error fetching dynamic routes for sitemap:', error);
    return routes;
  }
}
