"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import AdminShell from "./AdminShell";

const RichTextEditor = dynamic(() => import("./RichTextEditor"), { ssr: false });

type Category = { id: number; name: string; slug: string };
type Tag = { id: number; name: string; slug: string };

type FormState = {
  title: string; slug: string; excerpt: string; body: string;
  featured_image: string; category_id: string; author: string;
  status: "draft" | "published"; published_at: string;
  tag_ids: number[];
  // SEO
  meta_title: string; meta_description: string; focus_keyword: string;
  og_title: string; og_description: string; og_image: string;
  twitter_card: string; canonical_url: string; robots: string; schema_type: string;
};

const EMPTY: FormState = {
  title: "", slug: "", excerpt: "", body: "", featured_image: "",
  category_id: "", author: "Vantara Team", status: "draft", published_at: "",
  tag_ids: [],
  meta_title: "", meta_description: "", focus_keyword: "",
  og_title: "", og_description: "", og_image: "", twitter_card: "summary_large_image",
  canonical_url: "", robots: "index,follow", schema_type: "BlogPosting",
};

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

function Counter({ val, max }: { val: string; max: number }) {
  const n = val.length;
  return <span style={{ fontSize: "0.7rem", color: n > max ? "#c0392b" : "var(--text-light)" }}>{n}/{max}</span>;
}

const inp = {
  width: "100%", padding: "10px 14px", border: "1px solid var(--border)",
  borderRadius: "2px", fontSize: "0.9rem", fontFamily: "var(--font-sans)",
  color: "var(--text-primary)", background: "#fff", outline: "none", boxSizing: "border-box" as const,
};
const lbl = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  fontSize: "0.65rem", fontWeight: 500 as const, letterSpacing: "0.14em",
  textTransform: "uppercase" as const, color: "var(--text-secondary)", marginBottom: "0.4rem",
};

export default function BlogForm({ blogId }: { blogId?: number }) {
  const router = useRouter();
  const isEdit = !!blogId;

  const [form, setForm] = useState<FormState>(EMPTY);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [loading, setLoading] = useState(isEdit);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<"content" | "seo">("content");
  const [slugEdited, setSlugEdited] = useState(false);
  const [newCat, setNewCat] = useState("");
  const [addingCat, setAddingCat] = useState(false);
  const [newTag, setNewTag] = useState("");
  const [addingTag, setAddingTag] = useState(false);

  useEffect(() => {
    fetch("/api/admin/categories").then(r => r.json()).then(d => setCategories(Array.isArray(d) ? d : []));
    fetch("/api/admin/tags").then(r => r.json()).then(d => setTags(Array.isArray(d) ? d : []));
    if (isEdit) {
      fetch(`/api/admin/blogs/${blogId}`).then(r => r.json()).then(d => {
        if (d.id) {
          setForm({
            title: d.title || "", slug: d.slug || "", excerpt: d.excerpt || "",
            body: d.body || "", featured_image: d.featured_image || "",
            category_id: d.category_id ? String(d.category_id) : "",
            author: d.author || "Vantara Team",
            status: d.status || "draft",
            published_at: d.published_at ? d.published_at.slice(0, 10) : "",
            tag_ids: (d.tags || []).map((t: Tag) => t.id),
            meta_title: d.meta_title || "", meta_description: d.meta_description || "",
            focus_keyword: d.focus_keyword || "", og_title: d.og_title || "",
            og_description: d.og_description || "", og_image: d.og_image || "",
            twitter_card: d.twitter_card || "summary_large_image",
            canonical_url: d.canonical_url || "", robots: d.robots || "index,follow",
            schema_type: d.schema_type || "BlogPosting",
          });
          setSlugEdited(true);
        }
        setLoading(false);
      });
    }
  }, [blogId, isEdit]);

  const set = (key: keyof FormState, val: unknown) => setForm(f => ({ ...f, [key]: val }));

  const handleTitleChange = useCallback((v: string) => {
    setForm(f => ({ ...f, title: v, slug: slugEdited ? f.slug : slugify(v) }));
  }, [slugEdited]);

  async function addCategory() {
    if (!newCat.trim()) return;
    setAddingCat(true);
    const res = await fetch("/api/admin/categories", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newCat }) });
    const d = await res.json();
    if (d.id) { setCategories(c => [...c, d]); set("category_id", String(d.id)); setNewCat(""); }
    setAddingCat(false);
  }

  async function addTagItem() {
    if (!newTag.trim()) return;
    setAddingTag(true);
    const res = await fetch("/api/admin/tags", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name: newTag }) });
    const d = await res.json();
    if (d.id) { setTags(t => [...t, d]); set("tag_ids", [...form.tag_ids, d.id]); setNewTag(""); }
    setAddingTag(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required"); return; }
    setSaving(true); setError("");

    const payload = { ...form, category_id: form.category_id ? Number(form.category_id) : null };
    const url = isEdit ? `/api/admin/blogs/${blogId}` : "/api/admin/blogs";
    const method = isEdit ? "PUT" : "POST";

    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
    const data = await res.json();

    if (res.ok) {
      router.push("/admin/blogs");
    } else {
      setError(data.error || "Failed to save");
      setSaving(false);
    }
  }

  if (loading) {
    return <AdminShell><div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div></AdminShell>;
  }

  const tabStyle = (t: "content" | "seo") => ({
    padding: "10px 24px",
    border: "none",
    borderBottom: tab === t ? "2px solid var(--teal)" : "2px solid transparent",
    background: "transparent",
    cursor: "pointer",
    fontSize: "0.72rem",
    letterSpacing: "0.15em",
    textTransform: "uppercase" as const,
    fontWeight: tab === t ? 600 : 400,
    color: tab === t ? "var(--teal-dark)" : "var(--text-secondary)",
    transition: "all 0.2s",
  });

  return (
    <AdminShell>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
            {isEdit ? "Edit Post" : "New Post"}
          </h1>
        </div>
        <div style={{ display: "flex", gap: "0.75rem" }}>
          <button type="button" onClick={() => router.push("/admin/blogs")}
            style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)" }}>
            Cancel
          </button>
          <button type="button" onClick={() => { set("status", "draft"); handleSubmit({ preventDefault: () => {} } as React.FormEvent); }}
            disabled={saving}
            style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--teal)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", opacity: saving ? 0.7 : 1 }}>
            Save Draft
          </button>
          <button type="button" onClick={() => { set("status", "published"); setTimeout(() => handleSubmit({ preventDefault: () => {} } as React.FormEvent), 10); }}
            disabled={saving}
            className="btn-primary"
            style={{ cursor: "pointer", opacity: saving ? 0.7 : 1 }}>
            {saving ? "Saving…" : "Publish"}
          </button>
        </div>
      </div>

      {error && <div style={{ padding: "12px 16px", background: "rgba(220,53,69,0.08)", border: "1px solid rgba(220,53,69,0.2)", borderRadius: "2px", color: "#c0392b", fontSize: "0.88rem", marginBottom: "1.5rem" }}>{error}</div>}

      {/* Tabs */}
      <div style={{ borderBottom: "1px solid var(--border)", marginBottom: "2rem", display: "flex", gap: 0 }}>
        <button style={tabStyle("content")} onClick={() => setTab("content")}>Content</button>
        <button style={tabStyle("seo")} onClick={() => setTab("seo")}>SEO & Meta</button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* ── CONTENT TAB ─── */}
        <div style={{ display: tab === "content" ? "grid" : "none", gridTemplateColumns: "1fr 320px", gap: "2rem", alignItems: "start" }}>
          {/* Left column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Title */}
            <div>
              <label style={lbl}><span>Title *</span></label>
              <input value={form.title} onChange={e => handleTitleChange(e.target.value)} required
                placeholder="Your post title…"
                style={{ ...inp, fontSize: "1.1rem", fontFamily: "var(--font-serif)" }}
                onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
            </div>

            {/* Slug */}
            <div>
              <label style={lbl}><span>Slug</span><span style={{ color: "var(--text-light)", fontSize: "0.65rem" }}>URL-safe identifier</span></label>
              <input value={form.slug} onChange={e => { setSlugEdited(true); set("slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "")); }}
                placeholder="post-url-slug"
                style={{ ...inp, fontFamily: "monospace", fontSize: "0.85rem" }}
                onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
              <p style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: "0.3rem" }}>
                /blog/{form.slug || "post-slug"}
              </p>
            </div>

            {/* Excerpt */}
            <div>
              <label style={lbl}><span>Excerpt *</span><Counter val={form.excerpt} max={160} /></label>
              <textarea value={form.excerpt} onChange={e => set("excerpt", e.target.value)} rows={3}
                placeholder="A short description of this post (max 160 chars)…"
                style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
                onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
            </div>

            {/* Body */}
            <div>
              <label style={lbl}><span>Body Content</span></label>
              <RichTextEditor value={form.body} onChange={v => set("body", v)} placeholder="Write your post content here…" />
            </div>

            {/* Featured Image */}
            <div>
              <label style={lbl}><span>Featured Image URL</span></label>
              <input value={form.featured_image} onChange={e => set("featured_image", e.target.value)}
                placeholder="https://…"
                style={inp}
                onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
              {form.featured_image && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={form.featured_image} alt="preview" style={{ marginTop: "0.75rem", width: "100%", maxHeight: 220, objectFit: "cover", borderRadius: "2px", border: "1px solid var(--border)" }} />
              )}
            </div>
          </div>

          {/* Right sidebar */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", position: "sticky", top: 72 }}>
            {/* Status */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
              <label style={lbl}><span>Status</span></label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(["draft", "published"] as const).map(s => (
                  <button key={s} type="button" onClick={() => set("status", s)}
                    style={{ flex: 1, padding: "8px", border: "1px solid", borderColor: form.status === s ? "var(--teal)" : "var(--border)", background: form.status === s ? "rgba(26,138,155,0.08)" : "transparent", borderRadius: "2px", cursor: "pointer", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", fontWeight: form.status === s ? 600 : 400, color: form.status === s ? "var(--teal-dark)" : "var(--text-secondary)" }}>
                    {s}
                  </button>
                ))}
              </div>
              {form.status === "published" && (
                <div style={{ marginTop: "1rem" }}>
                  <label style={lbl}><span>Published Date</span></label>
                  <input type="date" value={form.published_at} onChange={e => set("published_at", e.target.value)}
                    style={{ ...inp, fontSize: "0.85rem" }} />
                </div>
              )}
            </div>

            {/* Author */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
              <label style={lbl}><span>Author</span></label>
              <input value={form.author} onChange={e => set("author", e.target.value)} style={inp}
                onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
            </div>

            {/* Category */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
              <label style={lbl}><span>Category</span></label>
              <select value={form.category_id} onChange={e => set("category_id", e.target.value)}
                style={{ ...inp, cursor: "pointer" }}>
                <option value="">Uncategorised</option>
                {categories.map(c => <option key={c.id} value={String(c.id)}>{c.name}</option>)}
              </select>
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.75rem" }}>
                <input value={newCat} onChange={e => setNewCat(e.target.value)} placeholder="New category…"
                  style={{ ...inp, flex: 1, fontSize: "0.82rem" }} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addCategory())} />
                <button type="button" onClick={addCategory} disabled={addingCat}
                  style={{ padding: "8px 12px", background: "var(--teal)", border: "none", borderRadius: "2px", color: "#fff", cursor: "pointer", fontSize: "0.75rem" }}>
                  +
                </button>
              </div>
            </div>

            {/* Tags */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem" }}>
              <label style={lbl}><span>Tags</span></label>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.75rem" }}>
                {tags.map(t => {
                  const sel = form.tag_ids.includes(t.id);
                  return (
                    <button key={t.id} type="button"
                      onClick={() => set("tag_ids", sel ? form.tag_ids.filter(id => id !== t.id) : [...form.tag_ids, t.id])}
                      style={{ padding: "4px 12px", background: sel ? "var(--teal)" : "transparent", border: "1px solid", borderColor: sel ? "var(--teal)" : "var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.7rem", color: sel ? "#fff" : "var(--text-secondary)", transition: "all 0.15s" }}>
                      {t.name}
                    </button>
                  );
                })}
              </div>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <input value={newTag} onChange={e => setNewTag(e.target.value)} placeholder="New tag…"
                  style={{ ...inp, flex: 1, fontSize: "0.82rem" }} onKeyDown={e => e.key === "Enter" && (e.preventDefault(), addTagItem())} />
                <button type="button" onClick={addTagItem} disabled={addingTag}
                  style={{ padding: "8px 12px", background: "var(--teal)", border: "none", borderRadius: "2px", color: "#fff", cursor: "pointer", fontSize: "0.75rem" }}>
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* ── SEO TAB ─── */}
        <div style={{ display: tab === "seo" ? "grid" : "none", gridTemplateColumns: "1fr 1fr", gap: "1.5rem" }}>
          <div>
            <label style={lbl}><span>Meta Title</span><Counter val={form.meta_title} max={60} /></label>
            <input value={form.meta_title} onChange={e => set("meta_title", e.target.value)} placeholder="SEO page title (max 60 chars)" style={inp}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div>
            <label style={lbl}><span>Focus Keyword</span></label>
            <input value={form.focus_keyword} onChange={e => set("focus_keyword", e.target.value)} placeholder="Main keyword to rank for" style={inp}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={lbl}><span>Meta Description</span><Counter val={form.meta_description} max={160} /></label>
            <textarea value={form.meta_description} onChange={e => set("meta_description", e.target.value)} rows={3}
              placeholder="Search engine description (max 160 chars)" style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div style={{ gridColumn: "span 2", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Open Graph (Social Sharing)</p>
          </div>
          <div>
            <label style={lbl}><span>OG Title</span><Counter val={form.og_title} max={60} /></label>
            <input value={form.og_title} onChange={e => set("og_title", e.target.value)} placeholder="Social share title" style={inp}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div>
            <label style={lbl}><span>OG Image URL</span></label>
            <input value={form.og_image} onChange={e => set("og_image", e.target.value)} placeholder="https://… (fallback to featured image)" style={inp}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div style={{ gridColumn: "span 2" }}>
            <label style={lbl}><span>OG Description</span><Counter val={form.og_description} max={160} /></label>
            <textarea value={form.og_description} onChange={e => set("og_description", e.target.value)} rows={2}
              placeholder="Social share description" style={{ ...inp, resize: "vertical", lineHeight: 1.6 }}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>
          <div style={{ gridColumn: "span 2", borderTop: "1px solid var(--border)", paddingTop: "1.5rem" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Advanced</p>
          </div>
          <div>
            <label style={lbl}><span>Twitter Card</span></label>
            <select value={form.twitter_card} onChange={e => set("twitter_card", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              <option value="summary">Summary</option>
              <option value="summary_large_image">Summary Large Image</option>
            </select>
          </div>
          <div>
            <label style={lbl}><span>Robots Meta</span></label>
            <select value={form.robots} onChange={e => set("robots", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              <option value="index,follow">Index, Follow</option>
              <option value="noindex,follow">No Index, Follow</option>
              <option value="index,nofollow">Index, No Follow</option>
              <option value="noindex,nofollow">No Index, No Follow</option>
            </select>
          </div>
          <div>
            <label style={lbl}><span>Schema Type</span></label>
            <select value={form.schema_type} onChange={e => set("schema_type", e.target.value)} style={{ ...inp, cursor: "pointer" }}>
              <option value="BlogPosting">BlogPosting</option>
              <option value="Article">Article</option>
            </select>
          </div>
          <div>
            <label style={lbl}><span>Canonical URL</span></label>
            <input value={form.canonical_url} onChange={e => set("canonical_url", e.target.value)} placeholder="https://… (leave empty for default)" style={inp}
              onFocus={e => (e.target.style.borderColor = "var(--teal)")} onBlur={e => (e.target.style.borderColor = "var(--border)")} />
          </div>

          {/* Preview */}
          {(form.meta_title || form.title) && (
            <div style={{ gridColumn: "span 2", background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "4px", padding: "1.5rem" }}>
              <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "1rem" }}>Google Preview</p>
              <div style={{ fontFamily: "arial, sans-serif" }}>
                <div style={{ fontSize: "0.78rem", color: "#202124" }}>vantaraglobal.com › blog › {form.slug}</div>
                <div style={{ fontSize: "1.1rem", color: "#1a0dab", marginTop: "2px" }}>{form.meta_title || form.title}</div>
                <div style={{ fontSize: "0.85rem", color: "#4d5156", lineHeight: 1.55, marginTop: "2px" }}>{form.meta_description || form.excerpt}</div>
              </div>
            </div>
          )}
        </div>
      </form>
    </AdminShell>
  );
}
