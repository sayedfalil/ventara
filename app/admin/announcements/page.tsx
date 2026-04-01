"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";

type Announcement = {
  id: number;
  title: string;
  image_url: string;
  link_url: string;
  start_date: string;
  end_date: string;
  is_active: number;
  created_at: string;
};

const EMPTY = { title: "", image_url: "", link_url: "", start_date: "", end_date: "", is_active: 1 };

const inp = {
  width: "100%", padding: "11px 14px", border: "1px solid var(--border)",
  borderRadius: "2px", fontSize: "0.9rem", fontFamily: "var(--font-sans)",
  color: "var(--text-primary)", background: "#fff", outline: "none",
  transition: "border-color 0.2s", boxSizing: "border-box" as const,
};
const lbl = {
  display: "block" as const, fontSize: "0.62rem", fontWeight: 500 as const,
  letterSpacing: "0.15em", textTransform: "uppercase" as const,
  color: "var(--text-secondary)", marginBottom: "0.4rem",
};

function isLive(a: Announcement) {
  const today = new Date().toISOString().slice(0, 10);
  return a.is_active === 1 && a.start_date <= today && a.end_date >= today;
}

export default function AnnouncementsPage() {
  const [items, setItems] = useState<Announcement[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState(EMPTY);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    const res = await fetch("/api/admin/announcements");
    const data = await res.json();
    setItems(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  useEffect(() => { load(); }, []);

  function openAdd() { setForm(EMPTY); setEditingId(null); setError(""); setShowModal(true); }

  function openEdit(a: Announcement) {
    setForm({ title: a.title, image_url: a.image_url, link_url: a.link_url, start_date: a.start_date, end_date: a.end_date, is_active: a.is_active });
    setEditingId(a.id); setError(""); setShowModal(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!form.title.trim()) { setError("Title is required."); return; }
    if (!form.start_date || !form.end_date) { setError("Start and end dates are required."); return; }
    if (form.start_date > form.end_date) { setError("Start date must be on or before end date."); return; }
    setSaving(true); setError("");
    const url = editingId ? `/api/admin/announcements/${editingId}` : "/api/admin/announcements";
    const method = editingId ? "PUT" : "POST";
    const res = await fetch(url, { method, headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (res.ok) { setShowModal(false); load(); } else { const d = await res.json(); setError(d.error || "Save failed"); }
    setSaving(false);
  }

  async function toggleActive(a: Announcement) {
    await fetch(`/api/admin/announcements/${a.id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ is_active: a.is_active === 1 ? 0 : 1 }),
    });
    load();
  }

  async function handleDelete() {
    if (!deleteId) return;
    await fetch(`/api/admin/announcements/${deleteId}`, { method: "DELETE" });
    setDeleteId(null); load();
  }

  const thStyle = { padding: "0.75rem 1rem", textAlign: "left" as const, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-light)", fontWeight: 500, borderBottom: "1px solid var(--border)" };
  const tdStyle = { padding: "0.9rem 1rem", fontSize: "0.88rem", color: "var(--text-primary)", verticalAlign: "middle" as const };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Announcements</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>
            Promo pop-ups shown to visitors · {items.filter(isLive).length} live right now
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary" style={{ cursor: "pointer" }}>+ New Announcement</button>
      </div>

      {/* Info banner */}
      <div style={{ padding: "1rem 1.5rem", background: "rgba(20,106,119,0.07)", border: "1px solid rgba(20,106,119,0.2)", borderRadius: "2px", marginBottom: "2rem", fontSize: "0.85rem", color: "var(--teal-dark)", lineHeight: 1.6 }}>
        <strong>How it works:</strong> When a visitor opens the website, a modal automatically appears if there is an <em>active</em> announcement whose date range includes today. The visitor can dismiss it, and it won&apos;t show again for 24 hours (stored in their browser). Only one announcement is shown at a time (the most recent active one).
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div>
        ) : items.length === 0 ? (
          <div style={{ padding: "5rem", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem", opacity: 0.3 }}>🔔</div>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>No announcements yet</p>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, marginBottom: "1.5rem" }}>Create a promo or seasonal offer to display as a pop-up on the website.</p>
            <button onClick={openAdd} className="btn-primary" style={{ cursor: "pointer" }}>+ New Announcement</button>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 700 }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={thStyle}>Preview</th>
                <th style={thStyle}>Title</th>
                <th style={thStyle}>Date Range</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Active</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {items.map((a, i) => {
                const live = isLive(a);
                return (
                  <tr key={a.id} style={{ borderBottom: i < items.length - 1 ? "1px solid var(--border)" : "none" }}>
                    <td style={{ ...tdStyle, width: 80 }}>
                      {a.image_url ? (
                        <div style={{ width: 64, height: 40, borderRadius: "2px", overflow: "hidden", background: "var(--bg-secondary)", flexShrink: 0, position: "relative" }}>
                          <Image src={a.image_url} alt={a.title} fill style={{ objectFit: "cover" }} unoptimized />
                        </div>
                      ) : (
                        <div style={{ width: 64, height: 40, borderRadius: "2px", background: "var(--bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1.2rem", opacity: 0.4 }}>🖼</div>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <div style={{ fontWeight: 500 }}>{a.title}</div>
                      {a.link_url && <div style={{ fontSize: "0.72rem", color: "var(--text-light)", marginTop: "0.15rem" }}>{a.link_url}</div>}
                    </td>
                    <td style={{ ...tdStyle, color: "var(--text-secondary)", fontSize: "0.82rem", whiteSpace: "nowrap" }}>
                      {a.start_date} → {a.end_date}
                    </td>
                    <td style={tdStyle}>
                      {live ? (
                        <span style={{ padding: "3px 10px", background: "rgba(39,174,96,0.1)", color: "#145a2f", fontSize: "0.62rem", letterSpacing: "0.12em", fontWeight: 600, borderRadius: "2px" }}>● LIVE</span>
                      ) : a.is_active === 0 ? (
                        <span style={{ padding: "3px 10px", background: "rgba(120,120,120,0.1)", color: "#666", fontSize: "0.62rem", letterSpacing: "0.12em", fontWeight: 600, borderRadius: "2px" }}>INACTIVE</span>
                      ) : (
                        <span style={{ padding: "3px 10px", background: "rgba(230,126,34,0.1)", color: "#7d4e0a", fontSize: "0.62rem", letterSpacing: "0.12em", fontWeight: 600, borderRadius: "2px" }}>SCHEDULED</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <div onClick={() => toggleActive(a)} style={{ width: 40, height: 22, borderRadius: 11, background: a.is_active ? "var(--teal)" : "var(--border)", position: "relative", cursor: "pointer", transition: "background 0.3s" }}>
                        <div style={{ position: "absolute", top: 2, left: a.is_active ? "calc(100% - 20px)" : 2, width: 18, height: 18, borderRadius: "50%", background: "#fff", transition: "left 0.3s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
                      </div>
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right" }}>
                      <div style={{ display: "flex", gap: "0.5rem", justifyContent: "flex-end" }}>
                        <button onClick={() => openEdit(a)} style={{ padding: "6px 14px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.7rem", cursor: "pointer", color: "var(--text-secondary)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Edit</button>
                        <button onClick={() => setDeleteId(a.id)} style={{ padding: "6px 14px", background: "transparent", border: "1px solid rgba(220,53,69,0.25)", borderRadius: "2px", fontSize: "0.7rem", cursor: "pointer", color: "rgba(192,57,43,0.7)", letterSpacing: "0.1em", textTransform: "uppercase" }}>Delete</button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Add/Edit Modal */}
      {showModal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 200, display: "flex", alignItems: "flex-start", justifyContent: "center", padding: "3rem 1rem", overflowY: "auto" }}
          onClick={e => { if (e.target === e.currentTarget) setShowModal(false); }}>
          <div style={{ background: "#fff", borderRadius: "4px", width: "100%", maxWidth: 580, boxShadow: "0 40px 100px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "2rem 2.5rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400 }}>{editingId ? "Edit Announcement" : "New Announcement"}</h2>
              <button onClick={() => setShowModal(false)} style={{ width: 32, height: 32, borderRadius: "50%", border: "1px solid var(--border)", background: "transparent", cursor: "pointer", fontSize: "1rem", color: "var(--text-light)" }}>×</button>
            </div>
            <form onSubmit={handleSubmit} style={{ padding: "2rem 2.5rem" }}>
              <div style={{ display: "grid", gap: "1.25rem", marginBottom: "1.25rem" }}>
                <div>
                  <label style={lbl}>Title *</label>
                  <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} required
                    placeholder="e.g. Early Bird Offer — 20% Off Kerala Packages!"
                    style={inp} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div>
                  <label style={lbl}>Banner Image URL</label>
                  <input value={form.image_url} onChange={e => setForm(f => ({ ...f, image_url: e.target.value }))}
                    placeholder="https://... (recommended: 1200×600px)"
                    style={inp} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  {form.image_url && (
                    <div style={{ marginTop: "0.5rem", borderRadius: "2px", overflow: "hidden", border: "1px solid var(--border)", maxHeight: 120 }}>
                      <img src={form.image_url} alt="Preview" style={{ width: "100%", objectFit: "cover", maxHeight: 120 }} onError={e => { (e.target as HTMLImageElement).style.display = "none"; }} />
                    </div>
                  )}
                </div>
                <div>
                  <label style={lbl}>Click-through URL (optional)</label>
                  <input value={form.link_url} onChange={e => setForm(f => ({ ...f, link_url: e.target.value }))}
                    placeholder="https://... — where to go when modal is clicked"
                    style={inp} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  <div>
                    <label style={lbl}>Start Date *</label>
                    <input type="date" value={form.start_date} onChange={e => setForm(f => ({ ...f, start_date: e.target.value }))} required
                      style={inp} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                  <div>
                    <label style={lbl}>End Date *</label>
                    <input type="date" value={form.end_date} onChange={e => setForm(f => ({ ...f, end_date: e.target.value }))} required
                      style={inp} onFocus={e => e.target.style.borderColor = "var(--teal)"} onBlur={e => e.target.style.borderColor = "var(--border)"} />
                  </div>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div onClick={() => setForm(f => ({ ...f, is_active: f.is_active ? 0 : 1 }))} style={{ width: 44, height: 24, borderRadius: 12, background: form.is_active ? "var(--teal)" : "var(--border)", position: "relative", cursor: "pointer", transition: "background 0.3s", flexShrink: 0 }}>
                    <div style={{ position: "absolute", top: 2, left: form.is_active ? "calc(100% - 22px)" : 2, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.3s" }} />
                  </div>
                  <span style={{ fontSize: "0.88rem", color: "var(--text-primary)" }}>Enabled (show on website within date range)</span>
                </div>
              </div>
              {error && <div style={{ padding: "10px 14px", background: "rgba(220,53,69,0.07)", border: "1px solid rgba(220,53,69,0.2)", borderRadius: "2px", color: "#c0392b", fontSize: "0.85rem", marginBottom: "1.25rem" }}>{error}</div>}
              <div style={{ display: "flex", gap: "0.75rem", justifyContent: "flex-end" }}>
                <button type="button" onClick={() => setShowModal(false)} style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.72rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--text-secondary)" }}>Cancel</button>
                <button type="submit" disabled={saving} className="btn-primary" style={{ cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}>{saving ? "Saving…" : editingId ? "Save Changes" : "Create"}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete confirm */}
      {deleteId !== null && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)", zIndex: 300, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
          <div style={{ background: "#fff", borderRadius: "4px", padding: "3rem", maxWidth: 400, width: "100%", textAlign: "center" }}>
            <div style={{ fontSize: "2.5rem", marginBottom: "1rem" }}>🔔</div>
            <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.3rem", fontWeight: 400, marginBottom: "0.75rem" }}>Delete Announcement?</h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.7, marginBottom: "2rem" }}>This will permanently remove the announcement and stop showing it to visitors.</p>
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
