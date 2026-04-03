import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getDb } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Travel Journal – Luxury India Travel Insights | Ventara Global",
  description: "Stories, guides and curated perspectives on luxury travel across India. By Ventara Global.",
};

export const revalidate = 60;

function formatDate(dateStr: string | null | undefined) {
  if (!dateStr) return "";
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function BlogPage() {
  const db = getDb();
  let blogs: any[] = [];
  try {
    const res = await db.execute("SELECT * FROM blogs WHERE status = 'published' ORDER BY published_at DESC LIMIT 20");
    blogs = res.rows as any[];
  } catch (e) {
    console.error("Failed to fetch blogs:", e);
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-primary)", fontFamily: "var(--font-sans)" }}>
      <Navbar />

      {/* Hero banner */}
      <div
        style={{
          background: "var(--teal-deep)",
          paddingTop: "140px",
          paddingBottom: "80px",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* V watermark */}
        <img
          src="/logo.png"
          alt="Watermark"
          style={{
            position: "absolute",
            right: "8%",
            top: "50%",
            transform: "translateY(-50%)",
            width: "320px",
            opacity: 0.06,
            objectFit: "contain",
          }}
        />

        <div style={{ position: "relative", zIndex: 10 }}>
          <p
            style={{
              fontSize: "0.62rem",
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: "var(--teal-accent)",
              marginBottom: "1.2rem",
              fontWeight: 500,
            }}
          >
            Travel Insights
          </p>
          <h1
            style={{
              fontFamily: "var(--font-serif)",
              fontSize: "clamp(2.5rem, 5vw, 4rem)",
              fontWeight: 400,
              color: "#fff",
              letterSpacing: "0.02em",
              lineHeight: 1.15,
              marginBottom: "1.2rem",
            }}
          >
            The Ventara Journal
          </h1>
          <p
            style={{
              fontSize: "1rem",
              color: "rgba(255,255,255,0.65)",
              fontWeight: 300,
              maxWidth: "480px",
              margin: "0 auto",
              lineHeight: 1.7,
            }}
          >
            Stories, guides and curated perspectives from the world's most extraordinary destinations.
          </p>
        </div>
      </div>

      {/* Blog grid */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "5rem 4vw" }}>
        {blogs.length === 0 ? (
          <div style={{ textAlign: "center", padding: "8rem 2rem" }}>
            <div
              style={{
                width: 64,
                height: 64,
                borderRadius: "50%",
                background: "rgba(28,95,107,0.08)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 2rem",
                fontSize: "1.5rem",
              }}
            >
              ✦
            </div>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.8rem",
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              Coming Soon
            </h2>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300 }}>
              Our travel stories and luxury guides are being meticulously crafted. Check back shortly.
            </p>
            <div style={{ marginTop: "2rem" }}></div>
          </div>
        ) : (
          <>
            {/* Featured first post */}
            {blogs[0] && (
              <div style={{ marginBottom: "4rem" }}>
                <Link href={`/blog/${blogs[0].slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "0",
                      background: "#fff",
                      border: "1px solid var(--border)",
                      overflow: "hidden",
                    }}
                    className="featured-card"
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        overflow: "hidden",
                        minHeight: "420px",
                        background: "var(--teal-deep)",
                      }}
                    >
                      {blogs[0].featured_image && (
                        <img
                          src={blogs[0].featured_image}
                          alt={blogs[0].title}
                          style={{ width: "100%", height: "100%", objectFit: "cover", position: "absolute", inset: 0 }}
                          className="blog-img"
                        />
                      )}
                      <div
                        style={{
                          position: "absolute",
                          top: "1.5rem",
                          left: "1.5rem",
                          padding: "5px 14px",
                          background: "var(--teal-accent)",
                          color: "var(--teal-deep)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 600,
                        }}
                      >
                        Featured
                      </div>
                    </div>

                    {/* Content */}
                    <div
                      style={{
                        padding: "3.5rem",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                      }}
                    >
                      {blogs[0].category_name && (
                        <span
                          style={{
                            fontSize: "0.6rem",
                            letterSpacing: "0.22em",
                            textTransform: "uppercase",
                            color: "var(--teal)",
                            fontWeight: 600,
                            marginBottom: "1rem",
                            display: "block",
                          }}
                        >
                          {blogs[0].category_name}
                        </span>
                      )}
                      <h2
                        style={{
                          fontFamily: "var(--font-serif)",
                          fontSize: "clamp(1.6rem, 2.5vw, 2.2rem)",
                          fontWeight: 400,
                          color: "var(--text-primary)",
                          lineHeight: 1.25,
                          marginBottom: "1.2rem",
                        }}
                      >
                        {blogs[0].title}
                      </h2>
                      {blogs[0].excerpt && (
                        <p
                          style={{
                            color: "var(--text-secondary)",
                            fontWeight: 300,
                            lineHeight: 1.75,
                            marginBottom: "2rem",
                            fontSize: "0.95rem",
                          }}
                        >
                          {blogs[0].excerpt}
                        </p>
                      )}
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "1.5rem",
                          marginBottom: "2rem",
                          fontSize: "0.75rem",
                          color: "var(--text-light)",
                        }}
                      >
                        <span>{blogs[0].author}</span>
                        {blogs[0].published_at && (
                          <>
                            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--border)", display: "inline-block" }} />
                            <span>{formatDate(blogs[0].published_at as string)}</span>
                          </>
                        )}
                      </div>
                      <span
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "0.68rem",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                          color: "var(--teal-dark)",
                          fontWeight: 600,
                        }}
                      >
                        Read Article →
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Remaining posts grid */}
            {blogs.length > 1 && (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(340px, 1fr))",
                  gap: "2rem",
                }}
              >
                {blogs.slice(1).map((blog) => (
                  <div key={blog.id}>
                    <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", display: "block" }}>
                      <div
                        style={{
                          background: "#fff",
                          border: "1px solid var(--border)",
                          overflow: "hidden",
                        }}
                      >
                        {/* Image */}
                        <div style={{ position: "relative", height: "220px", overflow: "hidden", background: "var(--teal-deep)" }}>
                          {blog.featured_image && (
                            <img
                              src={blog.featured_image}
                              alt={blog.title}
                              style={{ width: "100%", height: "100%", objectFit: "cover" }}
                              className="blog-img"
                            />
                          )}
                          {blog.category_name && (
                            <span
                              style={{
                                position: "absolute",
                                bottom: "1rem",
                                left: "1rem",
                                padding: "4px 12px",
                                background: "rgba(255,255,255,0.92)",
                                color: "var(--teal-deep)",
                                fontSize: "0.58rem",
                                letterSpacing: "0.18em",
                                textTransform: "uppercase",
                                fontWeight: 600,
                              }}
                            >
                              {blog.category_name}
                            </span>
                          )}
                        </div>

                        {/* Content */}
                        <div style={{ padding: "1.8rem 2rem 2rem" }}>
                          <h3
                            style={{
                              fontFamily: "var(--font-serif)",
                              fontSize: "1.25rem",
                              fontWeight: 400,
                              color: "var(--text-primary)",
                              lineHeight: 1.3,
                              marginBottom: "0.8rem",
                            }}
                          >
                            {blog.title}
                          </h3>
                          {blog.excerpt && (
                            <p
                              style={{
                                fontSize: "0.85rem",
                                color: "var(--text-light)",
                                fontWeight: 300,
                                lineHeight: 1.65,
                                marginBottom: "1.4rem",
                                display: "-webkit-box",
                                WebkitLineClamp: 3,
                                WebkitBoxOrient: "vertical",
                                overflow: "hidden",
                              }}
                            >
                              {blog.excerpt}
                            </p>
                          )}
                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "space-between",
                              fontSize: "0.72rem",
                              color: "var(--text-light)",
                            }}
                          >
                            <span>{blog.published_at ? formatDate(blog.published_at as string) : ""}</span>
                            <span style={{ color: "var(--teal)", fontWeight: 600, letterSpacing: "0.1em", textTransform: "uppercase" }}>
                              Read →
                            </span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      <Footer />

      <style>{`
        @media (max-width: 768px) {
          .featured-card { grid-template-columns: 1fr !important; }
          .featured-card > div:first-child { min-height: 260px !important; }
        }
        .blog-img { transition: transform 0.5s; }
        .blog-img:hover { transform: scale(1.04); }
      `}</style>
    </div>
  );
}
