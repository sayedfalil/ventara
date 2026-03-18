"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";

type Blog = {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image: string;
  author: string;
  published_at: string;
  category_name: string | null;
};

export default function JournalSection() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  useEffect(() => {
    fetch("/api/blogs?limit=3")
      .then((r) => r.json())
      .then((d) => {
        setBlogs(Array.isArray(d.blogs) ? d.blogs : []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  function formatDate(dateStr: string) {
    if (!dateStr) return "";
    return new Date(dateStr).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  }

  if (!loading && blogs.length === 0) return null;

  return (
    <section
      ref={ref}
      id="journal"
      style={{
        background: "var(--bg-primary)",
        padding: "7rem 4vw",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: "1300px", margin: "0 auto" }}>

        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            marginBottom: "4rem",
            flexWrap: "wrap",
            gap: "1.5rem",
          }}
        >
          <div>
            <p
              style={{
                fontSize: "0.6rem",
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: "var(--teal)",
                fontWeight: 500,
                marginBottom: "0.8rem",
              }}
            >
              Travel Insights
            </p>
            <h2
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "clamp(2rem, 4vw, 3rem)",
                fontWeight: 400,
                color: "var(--text-primary)",
                lineHeight: 1.15,
              }}
            >
              The Vantara <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Journal</em>
            </h2>
          </div>
          <Link
            href="/blog"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              fontSize: "0.68rem",
              letterSpacing: "0.18em",
              textTransform: "uppercase",
              color: "var(--teal-dark)",
              textDecoration: "none",
              fontWeight: 600,
              paddingBottom: "2px",
              borderBottom: "1px solid var(--teal-dark)",
              transition: "opacity 0.3s",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "0.65")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.opacity = "1")}
          >
            View All Articles →
          </Link>
        </motion.div>

        {/* Blog cards */}
        {loading ? (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))",
              gap: "2rem",
            }}
          >
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                style={{
                  height: "380px",
                  background: "var(--border)",
                  opacity: 0.3,
                  borderRadius: "2px",
                  animation: "pulse 1.5s infinite",
                }}
              />
            ))}
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
              gap: "2rem",
            }}
          >
            {blogs.map((blog, i) => (
              <motion.div
                key={blog.id}
                initial={{ opacity: 0, y: 32 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.12 }}
              >
                <Link href={`/blog/${blog.slug}`} style={{ textDecoration: "none", display: "block" }}>
                  <div
                    style={{
                      background: "#fff",
                      border: "1px solid var(--border)",
                      overflow: "hidden",
                      transition: "box-shadow 0.35s, transform 0.35s",
                    }}
                    onMouseEnter={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "0 20px 60px rgba(0,0,0,0.09)";
                      (e.currentTarget as HTMLDivElement).style.transform = "translateY(-5px)";
                    }}
                    onMouseLeave={(e) => {
                      (e.currentTarget as HTMLDivElement).style.boxShadow = "none";
                      (e.currentTarget as HTMLDivElement).style.transform = "none";
                    }}
                  >
                    {/* Image */}
                    <div
                      style={{
                        position: "relative",
                        height: "220px",
                        overflow: "hidden",
                        background: "var(--teal-deep)",
                      }}
                    >
                      {blog.featured_image ? (
                        <img
                          src={blog.featured_image}
                          alt={blog.title}
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                            transition: "transform 0.6s cubic-bezier(0.16,1,0.3,1)",
                          }}
                          className="journal-img"
                        />
                      ) : (
                        <div
                          style={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          <svg viewBox="0 0 140 120" style={{ width: 60, opacity: 0.2 }}>
                            <polygon points="5,6 32,6 65,100 40,107" fill="#fff" />
                            <polygon points="36,6 65,100 66,107 73,6" fill="#fff" />
                            <polygon points="76,6 135,6 103,110 66,107" fill="#fff" />
                          </svg>
                        </div>
                      )}
                      {blog.category_name && (
                        <span
                          style={{
                            position: "absolute",
                            top: "1rem",
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
                          fontSize: "1.2rem",
                          fontWeight: 400,
                          color: "var(--text-primary)",
                          lineHeight: 1.35,
                          marginBottom: "0.75rem",
                        }}
                      >
                        {blog.title}
                      </h3>
                      {blog.excerpt && (
                        <p
                          style={{
                            fontSize: "0.83rem",
                            color: "var(--text-light)",
                            fontWeight: 300,
                            lineHeight: 1.65,
                            marginBottom: "1.4rem",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
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
                          fontSize: "0.7rem",
                        }}
                      >
                        <span style={{ color: "var(--text-light)" }}>
                          {blog.published_at ? formatDate(blog.published_at) : ""}
                        </span>
                        <span
                          style={{
                            color: "var(--teal)",
                            fontWeight: 600,
                            letterSpacing: "0.1em",
                            textTransform: "uppercase",
                          }}
                        >
                          Read →
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      <style>{`
        .journal-img:hover { transform: scale(1.05); }
        @keyframes pulse {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </section>
  );
}
