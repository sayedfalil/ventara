import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const db = getDb();
  
  let blogs: any[] = [];
  let pkgs: any[] = [];

  try {
    const blogRes = await db.execute("SELECT slug, published_at FROM blogs WHERE status = 'published'");
    blogs = blogRes.rows;
  } catch (e) {}

  try {
    const pkgRes = await db.execute("SELECT id, created_at FROM packages");
    pkgs = pkgRes.rows;
  } catch (e) {}

  const staticPages: MetadataRoute.Sitemap = [
    { url: "https://www.ventaraglobal.com", priority: 1.0 },
    { url: "https://www.ventaraglobal.com/blog", priority: 0.8 },
    { url: "https://www.ventaraglobal.com/packages", priority: 0.9 },
  ];

  const blogPages: MetadataRoute.Sitemap = blogs.map((post) => ({
    url: `https://www.ventaraglobal.com/blog/${post.slug}`,
    lastModified: post.published_at ? new Date(post.published_at as string) : new Date(),
    priority: 0.7,
  }));

  const packagePages: MetadataRoute.Sitemap = pkgs.map((pkg) => ({
    url: `https://www.ventaraglobal.com/packages/${pkg.id}`,
    lastModified: pkg.created_at ? new Date(pkg.created_at as string) : new Date(),
    priority: 0.9,
  }));

  return [...staticPages, ...blogPages, ...packagePages];
}
