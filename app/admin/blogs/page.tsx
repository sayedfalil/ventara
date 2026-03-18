"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

type Blog = {
  id: number;
  title: string;
  slug: string;
  status: string;
  author: string;
  published_at: string | null;
  created_at: string;
  category_name: string | null;
};

type Category = { id: number; name: string };

const STATUS_COLORS: Record<string, string> = {
  published: "#0e7c5c",
  draft: "#8a6d00",
};
const STATUS_BG: Record<string, string> = {
  published: "rgba(14,124,92,0.1)",
  draft: "rgba(138,109,0,0.1)",
};

export default function BlogListPage() {
  const router = useRouter();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories").then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  useEffect(() => {
    loadBlogs();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, search, statusFilter, categoryFilter]);

  async function loadBlogs() {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page), limit: "10" });
    if (search) params.set("search", search);
    if (statusFilter) params.set("status", statusFilter);
    if (categoryFilter) params.set("category", categoryFilter);
    const res = await fetch(`/api/admin/blogs?${params}`);
    const data = await res.json();
    setBlogs(data.blogs || []);
    setTotal(data.pagination?.total || 0);
    setPages(data.pagination?.pages || 1);
    setLoading(false);
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/admin/blogs/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    setDeleting(false);
    loadBlogs();
  }

  const thStyle = {
    padding: "0.75rem 1rem",
    textAlign: "left" as const,
    fontSize: "0.62rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    color: "var(--text-light)",
    fontWeight: 500,
    borderBottom: "1px solid var(--border)",
    whiteSpace: "nowrap" as const,
  };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Blog Management</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>{total} post{total !== 1 ? "s" : ""} total</p>
        </div>
        <button onClick={() => router.push("/admin/blogs/new")} className="btn-primary" style={{ cursor: "pointer" }}>
          + New Post
        </button>
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "1rem", marginBottom: "1.5rem", flexWrap: "wrap", alignItems: "center" }}>
        <input
          type="text"
          placeholder="Search posts…"
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.88rem", background: "#fff", outline: "none", width: 220, fontFamily: "var(--font-sans)" }}
        />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.88rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          <option value="">All Statuses</option>
          <option value="published">Published</option>
          <option value="draft">Draft</option>
        </select>
        <select value={categoryFilter} onChange={e => { setCategoryFilter(e.target.value); setPage(1); }}
          style={{ padding: "9px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.88rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          <option value="">All Categories</option>
          {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
        </select>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "hidden" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div>
        ) : blogs.length === 0 ? (
          <div style={{ padding: "5rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "1rem" }}>No posts yet</p>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, marginBottom: "1.5rem" }}>Create your first blog post to get started.</p>
            <button onClick={() => router.push("/admin/blogs/new")} className="btn-primary" style={{ cursor: "pointer" }}>+ New Post</button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Category</th>
                <th style={thStyle}>Author</th>
                <th style={thStyle}>Published</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog, i) => (
                <tr key={blog.id} style={{ borderBottom: i < blogs.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={{ padding: "1rem", maxWidth: 320 }}>
                    <div style={{ fontSize: "0.92rem", fontWeight: 500, color: "var(--text-primary)", marginBottom: "0.2rem", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{blog.title}</div>
                    <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{blog.slug}</div>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span style={{
                      padding: "3px 10px",
                      background: STATUS_BG[blog.status] || "#f0f0f0",
                      color: STATUS_COLORS[blog.status] || "var(--text-secondary)",
                      fontSize: "0.65rem",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                      fontWeight: 600,
                      borderRadius: "2px",
                    }}>
                      {blog.status}
                    </span>
                  </td>
                  <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{blog.category_name || "—"}</td>
                  <td style={{ padding: "1rem", fontSize: "0.85rem", color: "var(--text-secondary)" }}>{blog.author}</td>
                  <td style={{ padding: "1rem", fontSize: "0.82rem", color: "var(--text-light)", whiteSpace: "nowrap" }}>
                    {blog.published_at ? new Date(blog.published_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) : "—"}
                  </td>
                  <td style={{ padding: "1rem", textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button onClick={() => router.push(`/admin/blogs/${blog.id}`)}
                        style={{ padding: "6px 16px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", color: "var(--text-secondary)" }}>
                        Edit
                      </button>
                      <button onClick={() => setDeleteId(blog.id)}
                        style={{ padding: "6px 16px", background: "transparent", border: "1px solid rgba(220,53,69,0.25)", borderRadius: "2px", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", cursor: "pointer", color: "rgba(192,57,43,0.7)" }}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "2rem" }}>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ width: 36, height: 36, background: p === page ? "var(--teal-deep)" : "#fff", color: p === page ? "#fff" : "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem" }}>
              {p}
            </button>
          ))}
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "#fff", borderRadius: "4px", padding: "3rem", maxWidth: 420, width: "100%", textAlign: "center", boxShadow: "0 30px 80px rgba(0,0,0,0.2)" }}>
            <div style={{ fontSize: "2rem", marginBottom: "1.5rem", color: "var(--text-light)" }}>✕</div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "1rem" }}>Delete Post?</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" }}>This action cannot be undone.</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "11px 24px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase" }}>Cancel</button>
              <button onClick={handleDelete} disabled={deleting} style={{ padding: "11px 24px", background: "#c0392b", border: "none", borderRadius: "2px", cursor: "pointer", color: "#fff", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", opacity: deleting ? 0.7 : 1 }}>
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
