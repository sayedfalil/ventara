import { MetadataRoute } from 'next';
import { getDb } from '@/lib/db';

// Rebuild the sitemap hourly so blog posts and packages published from the
// admin panel appear without needing a redeploy.
export const revalidate = 3600;

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
    { url: "https://www.ventaraglobal.com/kashmir-luxury-tour-packages-from-kerala", priority: 0.8 },
    { url: "https://www.ventaraglobal.com/kashmir-honeymoon-packages", priority: 0.9 },
    { url: "https://www.ventaraglobal.com/kashmir-tour-packages-for-nri", priority: 0.8 },
    { url: "https://www.ventaraglobal.com/kerala-luxury-backwater-packages", priority: 0.8 },
  ];

  // Blog posts that are hand-written pages (not stored in the database).
  const staticBlogSlugs = [
    "best-time-to-visit-kashmir-from-kerala",
    "kerala-vs-kashmir-which-to-visit-first",
  ];
  const dbSlugs = new Set(blogs.map((post) => String(post.slug)));

  const staticBlogPages: MetadataRoute.Sitemap = staticBlogSlugs
    .filter((slug) => !dbSlugs.has(slug))
    .map((slug) => ({
      url: `https://www.ventaraglobal.com/blog/${slug}`,
      priority: 0.7,
    }));

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

  return [...staticPages, ...staticBlogPages, ...blogPages, ...packagePages];
}
