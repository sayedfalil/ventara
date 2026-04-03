import Link from "next/link";
import { notFound } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDb } from "@/lib/db";
import type { Metadata } from "next";

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const db = getDb();
  let blog: any = null;
  try {
    const res = await db.execute({ sql: "SELECT * FROM blogs WHERE slug = ?", args: [slug] });
    if (res.rows.length) blog = res.rows[0];
  } catch (e) {}

  if (!blog) return { title: "Article Not Found | Ventara Global" };

  return {
    title: blog.meta_title || `${blog.title} | Ventara Global`,
    description: blog.meta_description || blog.excerpt,
    openGraph: {
      title: blog.og_title || blog.meta_title || blog.title,
      description: blog.og_description || blog.meta_description || blog.excerpt,
      images: [blog.og_image || blog.featured_image]
    },
    alternates: {
      canonical: blog.canonical_url || `https://www.ventaraglobal.com/blog/${blog.slug}`
    }
  };
}

export async function generateStaticParams() {
  const db = getDb();
  let slugs: any[] = [];
  try {
    const res = await db.execute("SELECT slug FROM blogs WHERE status = 'published'");
    slugs = res.rows;
  } catch (e) {
    console.error("Failed to generate static params:", e);
  }
  return slugs.map((row) => ({ slug: row.slug as string }));
}

export const revalidate = 60;

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const db = getDb();
  let blog: any = null;
  let tags: any[] = [];
  
  try {
    const res = await db.execute({ sql: "SELECT * FROM blogs WHERE slug = ?", args: [slug] });
    if (res.rows.length) {
      blog = res.rows[0];
      const tagRes = await db.execute({ sql: "SELECT tags.id, tags.name FROM tags JOIN blog_tags ON tags.id = blog_tags.tag_id WHERE blog_tags.blog_id = ?", args: [blog.id] });
      tags = tagRes.rows;
    }
  } catch (e) {
    console.error("Failed to fetch blog post:", e);
  }

  if (!blog) return notFound();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", fontFamily: "var(--font-sans)" }}>
      <Navbar />

      {/* Hero image */}
      {blog.featured_image ? (
        <div style={{ position: "relative", height: "clamp(320px, 55vh, 620px)", overflow: "hidden", background: "var(--teal-deep)" }}>
          <img
            src={blog.featured_image}
            alt={blog.title}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(to bottom, rgba(10,40,48,0.3) 0%, rgba(10,40,48,0.7) 100%)",
            }}
          />
          {/* Title overlay */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              padding: "3rem 4vw",
              maxWidth: "860px",
              margin: "0 auto",
            }}
          >
            <div>
              {blog.category_name && (
                <span
                  style={{
                    display: "inline-block",
                    fontSize: "0.6rem",
                    letterSpacing: "0.25em",
                    textTransform: "uppercase",
                    color: "var(--teal-accent)",
                    fontWeight: 600,
                    marginBottom: "0.8rem",
                  }}
                >
                  {blog.category_name}
                </span>
              )}
              <h1
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "clamp(1.8rem, 4vw, 3rem)",
                  fontWeight: 400,
                  color: "#fff",
                  lineHeight: 1.2,
                  marginBottom: "1rem",
                  maxWidth: "760px",
                }}
              >
                {blog.title}
              </h1>
              <div style={{ display: "flex", gap: "1.5rem", fontSize: "0.75rem", color: "rgba(255,255,255,0.7)" }}>
                <span>{blog.author}</span>
                {blog.published_at && (
                  <>
                    <span>·</span>
                    <span>{formatDate(blog.published_at as string)}</span>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ paddingTop: "120px", paddingBottom: "2rem" }}></div>
      )}

      {/* Content */}
      <main style={{ maxWidth: "780px", margin: "0 auto", padding: "4rem 4vw 6rem" }}>

        {/* Back link */}
        <Link
          href="/blog"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.68rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: "var(--text-light)",
            textDecoration: "none",
            marginBottom: "3rem",
            transition: "color 0.3s",
          }}
          className="blog-back-link"
        >
          ← Back to Journal
        </Link>

        {/* Excerpt */}
        {blog.excerpt && (
          <p
            style={{
              fontSize: "1.15rem",
              color: "var(--text-secondary)",
              fontWeight: 300,
              lineHeight: 1.8,
              borderLeft: "3px solid var(--teal-accent)",
              paddingLeft: "1.5rem",
              marginBottom: "3rem",
              fontStyle: "italic",
            }}
          >
            {blog.excerpt}
          </p>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "3rem" }}>
            {tags.map((tag) => (
              <span
                key={tag.id}
                style={{
                  padding: "4px 14px",
                  background: "rgba(28,95,107,0.08)",
                  color: "var(--teal-dark)",
                  fontSize: "0.65rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: 500,
                  borderRadius: "2px",
                }}
              >
                {tag.name}
              </span>
            ))}
          </div>
        )}

        {/* Divider */}
        <div style={{ width: "48px", height: "2px", background: "var(--teal-accent)", marginBottom: "3rem" }} />

        {/* Body */}
        <div
          className="blog-body"
          dangerouslySetInnerHTML={{ __html: blog.body || "" }}
        />

        {/* Footer meta */}
        <div
          style={{
            marginTop: "4rem",
            paddingTop: "2rem",
            borderTop: "1px solid var(--border)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <p style={{ fontSize: "0.65rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--text-light)", marginBottom: "0.3rem" }}>
              Written by
            </p>
            <p style={{ fontSize: "0.92rem", color: "var(--text-primary)", fontWeight: 500 }}>{blog.author}</p>
          </div>
          <Link
            href="/blog"
            style={{
              padding: "12px 28px",
              border: "1px solid var(--teal-dark)",
              color: "var(--teal-dark)",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              textDecoration: "none",
              fontWeight: 500,
              transition: "all 0.3s",
            }}
            className="more-articles-btn"
          >
            More Articles
          </Link>
        </div>
      </main>

      {/* CTA */}
      <div
        style={{
          background: "var(--teal-deep)",
          padding: "5rem 4vw",
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.62rem", letterSpacing: "0.28em", textTransform: "uppercase", color: "var(--teal-accent)", marginBottom: "1rem" }}>
          Plan Your Journey
        </p>
        <h2
          style={{
            fontFamily: "var(--font-serif)",
            fontSize: "clamp(1.8rem, 3vw, 2.6rem)",
            fontWeight: 400,
            color: "#fff",
            marginBottom: "1.5rem",
            lineHeight: 1.2,
          }}
        >
          Ready to Experience It?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", fontWeight: 300, marginBottom: "2.5rem", maxWidth: "420px", margin: "0 auto 2.5rem" }}>
          Let our concierge team craft a bespoke luxury itinerary tailored exclusively for you.
        </p>
        <a
          href="/#enquire"
          style={{
            display: "inline-block",
            padding: "16px 44px",
            background: "var(--teal-accent)",
            color: "var(--teal-deep)",
            fontSize: "0.68rem",
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            fontWeight: 700,
            textDecoration: "none",
            transition: "opacity 0.3s",
          }}
          className="consultation-btn"
        >
          Request a Consultation
        </a>
      </div>

      <Footer />

      <style>{`
        .blog-back-link:hover { color: var(--teal) !important; }
        .more-articles-btn:hover { background: var(--teal-dark) !important; color: #fff !important; }
        .consultation-btn:hover { opacity: 0.85; }

        .blog-body {
          font-size: 1rem;
          line-height: 1.85;
          color: var(--text-secondary);
          font-weight: 300;
        }
        .blog-body h1, .blog-body h2, .blog-body h3 {
          font-family: var(--font-serif);
          font-weight: 400;
          color: var(--text-primary);
          margin: 2.5rem 0 1rem;
          line-height: 1.25;
        }
        .blog-body h2 { font-size: 1.7rem; }
        .blog-body h3 { font-size: 1.3rem; }
        .blog-body p { margin-bottom: 1.4rem; }
        .blog-body strong { color: var(--text-primary); font-weight: 600; }
        .blog-body em { font-style: italic; }
        .blog-body ul, .blog-body ol {
          padding-left: 1.5rem;
          margin-bottom: 1.4rem;
        }
        .blog-body li { margin-bottom: 0.6rem; }
        .blog-body blockquote {
          border-left: 3px solid var(--teal-accent);
          padding-left: 1.5rem;
          margin: 2rem 0;
          font-style: italic;
          color: var(--text-light);
        }
        .blog-body a { color: var(--teal); text-decoration: underline; }
        .blog-body img { max-width: 100%; border-radius: 2px; margin: 1.5rem 0; }
        .blog-body code {
          background: rgba(28,95,107,0.08);
          padding: 2px 6px;
          font-size: 0.88em;
          border-radius: 2px;
        }
        .blog-body pre {
          background: var(--teal-deep);
          color: #e0f0f0;
          padding: 1.5rem;
          overflow-x: auto;
          margin: 1.5rem 0;
          border-radius: 2px;
        }
      `}</style>
    </div>
  );
}
