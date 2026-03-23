import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Use environment variable for base URL or fallback to production URL
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.ventaraglobal.com';

  const routes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
  ];

  try {
    const db = getDb();
    const result = await db.execute({
      sql: `SELECT slug, published_at FROM blogs WHERE status = 'published' ORDER BY published_at DESC LIMIT 1000`,
      args: [],
    });

    const blogRoutes: MetadataRoute.Sitemap = result.rows.map((row) => ({
      url: `${baseUrl}/blog/${row.slug}`,
      // Fallback to current date if published_at is not available
      lastModified: row.published_at ? new Date(row.published_at as string) : new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    }));

    return [...routes, ...blogRoutes];
  } catch (error) {
    console.error('Error fetching blogs for sitemap:', error);
    // If database connection fails during build or runtime, return only static routes
    return routes;
  }
}
