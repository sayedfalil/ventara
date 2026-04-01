"use client";

import { useState, useEffect, FormEvent } from "react";
import AdminShell from "@/components/admin/AdminShell";

type Testimonial = {
  id: number;
  client_name: string;
  client_role: string;
  client_company: string;
  body: string;
  rating: number;
  image_url: string;
  package_name: string;
  is_active: number;
  display_order: number;
  created_at: string;
};

const EMPTY: Omit<Testimonial, "id" | "created_at"> = {
  client_name: "", client_role: "", client_company: "",
  body: "", rating: 5, image_url: "", package_name: "",
  is_active: 1, display_order: 0,
};

const inputStyle = {
  width: "100%", padding: "11px 14px", border: "1px solid var(--border)",
  borderRadius: "2px", fontSize: "0.9rem", fontFamily: "var(--font-sans)",
  color: "var(--text-primary)", background: "#fff", outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box" as const,
};
const labelStyle = {
  display: "block" as const, fontSize: "0.62rem", fontWeight: 500 as const,
  letterSpacing: "0.15em", textTransform: "uppercase" as const,
  color: "var(--text-secondary)", marginBottom: "0.4rem",
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<Omit<Testimonial, "id" | "created_at">>(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/testimonials");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY); setEditingId(null); setError(""); setShowModal(true); }

  function openEdit(t: Testimonial) {
    setForm({ client_name: t.client_name, client_role: t.client_role, client_company: t.client_company,
      body: t.body, rating: t.rating, image_url: t.image_url, package_name: t.package_name,
      is_active: t.is_active, display_order: t.display_order });
    setEditingId(t.id); setError(""); setShowModal(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.client_name.trim() || !form.body.trim()) { setError("Name and testimonial text are required."); return; }
    setSaving(true); setError("");
    const url = editingId ? `/api/admin/testimonials/${editingId}` : "/api/admin/testimonials";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setShowModal(false); load(); } else { const d = await res.json(); setError(d.error || "Save failed"); }
    setSaving(false);
  }

  async function handleToggleActive(t: Testimonial) {
    await fetch(`/api/admin/testimonials/${t.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: t.is_active === 1 ? 0 : 1 }),
    });
    load();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/testimonials/${deleteId}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  const thStyle = { padding: "0.75rem 1rem", textAlign: "left" as const, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-light)", fontWeight: 500, borderBottom: "1px solid var(--border)" };
  const tdStyle = { padding: "0.9rem 1rem", fontSize: "0.88rem", color: "var(--text-primary)", verticalAlign: "top" as const };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Testimonials</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>{items.length} testimonial{items.length !== 1 ? "s" : ""} · {items.filter(i => i.is_active).length} active</p>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ cursor: "pointer" }}>+ Add Testimonial</button>
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: "5rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>No testimonials yet</p>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, marginBottom: "1.5rem" }}>Add your first client testimonial to display on the website.</p>
            <button onClick={openAdd} className="btn-primary" style={{ cursor: "pointer" }}>+ Add Testimonial</button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={thStyle}>Client</th>
                <th style={thStyle}>Testimonial</th>
                <th style={thStyle}>Rating</th>
                <th style={thStyle}>Package</th>
                <th style={thStyle}>Order</th>
                <th style={thStyle}>Active</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((t, i) => (
                <tr key={t.id} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
                  <td style={tdStyle}>
                    <div style={{ fontWeight: 500 }}>{t.client_name}</div>
                    {(t.client_role || t.client_company) && (
                      <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>
                        {[t.client_role, t.client_company].filter(Boolean).join(", ")}
                      </div>
                    )}
                  </td>
                  <td style={{ ...tdStyle, maxWidth: 320 }}>
                    <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)", lineHeight: 1.5, display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                      &ldquo;{t.body}&rdquo;
                    </div>
                  </td>
                  <td style={tdStyle}>
                    <span style={{ color: "#f0ad00", letterSpacing: 1 }}>{"★".repeat(t.rating)}{"☆".repeat(5 - t.rating)}</span>
                  </td>
                  <td style={{ ...tdStyle, color: "var(--text-light)", fontSize: "0.78rem" }}>{t.package_name || "—"}</td>
                  <td style={{ ...tdStyle, color: "var(--text-light)", fontSize: "0.82rem" }}>{t.display_order}</td>
                  <td style={tdStyle}>
                    <div
                      onClick={() => handleToggleActive(t)}
                      style={{ width: 40, height: 22, borderRadius: 11, background: t.is_active ? "var(--teal)" : "var(--border)", position: "relative", cursor: "pointer", transition: "background 0.3s" }}
                    >
                      <div style={{ position: "absolute", top: 2, left: t.is_active ? "calc(100% - 20px)" : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                    </div>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }}>
                    <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                      <button onClick={() => openEdit(t)} style={{ padding: "6px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.7rem", cursor: "pointer", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Edit</button>
                      <button onClick={() => setDeleteId(t.id)} style={{ padding: "6px 14px", background: "transparent", border: "1px solid rgba(220,53,69,0.25)", borderRadius: "2px", fontSize: "0.7rem", cursor: "pointer", color: "rgba(192,57,43,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "3rem 1rem", overflowY: "auto" }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: "#fff", borderRadius: "4px", width: "100%", maxWidth: 600, boxShadow: "0 40px 100px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "2rem 2.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400 }}>{editingId ? "Edit Testimonial" : "Add Testimonial"}</h2>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: "1rem", color: "var(--text-light)" }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "2rem 2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Client Name *</label>
                  <input value={form.client_name} onChange={e => setForm(f => ({ ...f, client_name: e.target.value }))} required placeholder="e.g. Sarah & James" style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={labelStyle}>Role / Title</label>
                  <input value={form.client_role} onChange={e => setForm(f => ({ ...f, client_role: e.target.value }))} placeholder="e.g. Honeymooners" style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={labelStyle}>Company / Location</label>
                  <input value={form.client_company} onChange={e => setForm(f => ({ ...f, client_company: e.target.value }))} placeholder="e.g. London, UK" style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Testimonial *</label>
                  <textarea value={form.body} onChange={e => setForm(f => ({ ...f, body: e.target.value }))} required rows={4} placeholder="What did the client say about their experience?" style={{ ...inputStyle, resize: "vertical", lineHeight: 1.6 }} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={labelStyle}>Package Name</label>
                  <input value={form.package_name} onChange={e => setForm(f => ({ ...f, package_name: e.target.value }))} placeholder="e.g. Kerala Backwaters" style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={labelStyle}>Rating (1–5)</label>
                  <select value={form.rating} onChange={e => setForm(f => ({ ...f, rating: Number(e.target.value) }))} style={{ ...inputStyle, cursor: "pointer" }}>
                    {[5, 4, 3, 2, 1].map(n => <option key={n} value={n}>{"★".repeat(n)} ({n}/5)</option>)}
                  </select>
                </div>
                <div>
                  <label style={labelStyle}>Photo URL</label>
                  <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))} placeholder="https://..." style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={labelStyle}>Display Order</label>
                  <input type="number" value={form.display_order} onChange={e => setForm(f => ({ ...f, display_order: Number(e.target.value) }))} min={0} style={inputStyle} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div style={{ gridColumn: "span 2", display: "flex", alignItems: "center", gap: 12 }}>
                  <div onClick={() => setForm(f => ({ ...f, is_active: f.is_active ? 0 : 1 }))} style={{ width: 44, height: 24, borderRadius: 12, background: form.is_active ? "var(--teal)" : "var(--border)", position: "relative", cursor: "pointer", transition: "background 0.3s", flexShrink: 0 }}>
                    <div style={{ position: "absolute", top: 2, left: form.is_active ? "calc(100% - 22px)" : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>Visible on website</span>
                </div>
              </div>
              {error && <div style={{ padding: "10px 14px", background: "rgba(220,53,69,0.07)", border: "1px solid rgba(220,53,69,0.2)", borderRadius: "2px", color: "#c0392b", fontSize: "0.85rem", marginBottom: "1.25rem" }}>{error}</div>}
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary" style={{ cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : editingId ? "Save Changes" : "Add Testimonial"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "#fff", borderRadius: "4px", padding: "3rem", maxWidth: 400, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", color: "var(--text-light)" }}>★</div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.75rem" }}>Delete Testimonial?</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem" }}>This testimonial will be permanently removed from the website.</p>
            <div style={{ display: "flex", gap: "0.75rem", justifyContent: "center" }}>
              <button onClick={() => setDeleteId(null)} style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Cancel</button>
              <button onClick={handleDelete} style={{ padding: "10px 22px", background: "#c0392b", border: "none", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "#fff" }}>Delete</button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
