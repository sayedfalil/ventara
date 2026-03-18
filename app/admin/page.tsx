"use client";

import { useState, useEffect, FormEvent } from "react";
import Image from "next/image";
import AdminShell from "@/components/admin/AdminShell";

type Package = {
  id: number;
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  tag: string;
  highlights: string;
  is_featured: number;
  created_at: string;
};

type FormData = {
  title: string;
  description: string;
  duration: string;
  price: string;
  image_url: string;
  tag: string;
  highlights: string;
  is_featured: boolean;
};

const EMPTY_FORM: FormData = {
  title: "",
  description: "",
  duration: "",
  price: "",
  image_url: "",
  tag: "Kerala",
  highlights: "",
  is_featured: false,
};

const TAGS = ["Kerala", "Rajasthan", "Himalayas", "Goa", "Mumbai", "Delhi", "Tamil Nadu", "Other"];

const inputStyle = {
  width: "100%",
  padding: "12px 16px",
  border: "1px solid var(--border)",
  borderRadius: "2px",
  fontSize: "0.95rem",
  fontFamily: "var(--font-sans)",
  color: "var(--text-primary)",
  background: "#fff",
  outline: "none",
  transition: "border-color 0.3s",
};

const labelStyle = {
  display: "block" as const,
  fontSize: "0.65rem",
  fontWeight: 500 as const,
  letterSpacing: "0.15em",
  textTransform: "uppercase" as const,
  color: "var(--text-secondary)",
  marginBottom: "0.5rem",
};

export default function AdminDashboard() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [formError, setFormError] = useState("");

  useEffect(() => {
    loadPackages();
  }, []);

  async function loadPackages() {
    setLoading(true);
    const res = await fetch("/api/packages");
    const data = await res.json();
    setPackages(Array.isArray(data) ? data : []);
    setLoading(false);
  }

  function openAdd() {
    setForm(EMPTY_FORM);
    setEditingId(null);
    setFormError("");
    setShowModal(true);
  }

  function openEdit(pkg: Package) {
    let highlights: string[] = [];
    try { highlights = JSON.parse(pkg.highlights); } catch {}
    setForm({
      title: pkg.title,
      description: pkg.description,
      duration: pkg.duration,
      price: pkg.price,
      image_url: pkg.image_url,
      tag: pkg.tag,
      highlights: highlights.join(", "),
      is_featured: pkg.is_featured === 1,
    });
    setEditingId(pkg.id);
    setFormError("");
    setShowModal(true);
  }

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSaving(true);
    setFormError("");

    const highlightsArr = form.highlights
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      ...form,
      highlights: highlightsArr,
    };

    try {
      const url = editingId ? `/api/packages/${editingId}` : "/api/packages";
      const method = editingId ? "PUT" : "POST";
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        setShowModal(false);
        loadPackages();
      } else {
        const d = await res.json();
        setFormError(d.error || "Failed to save package");
      }
    } catch {
      setFormError("Network error. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete() {
    if (!deleteId) return;
    setDeleting(true);
    await fetch(`/api/packages/${deleteId}`, { method: "DELETE" });
    setDeleteId(null);
    setDeleting(false);
    loadPackages();
  }

  return (
    <AdminShell>
      <div style={{ padding: "3rem" }}>
        {/* Page header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: "3rem",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "2rem",
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: "0.4rem",
              }}
            >
              Package Management
            </h1>
            <p style={{ fontSize: "0.9rem", color: "var(--text-secondary)", fontWeight: 300 }}>
              {packages.length} package{packages.length !== 1 ? "s" : ""} · Add, edit or remove travel packages
            </p>
          </div>
          <button
            onClick={openAdd}
            className="btn-primary"
            style={{ cursor: "pointer" }}
          >
            + Add New Package
          </button>
        </div>

        {/* Stats bar */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          {[
            { label: "Total Packages", value: packages.length },
            { label: "Featured", value: packages.filter((p) => p.is_featured === 1).length },
            { label: "Destinations", value: new Set(packages.map((p) => p.tag)).size },
          ].map((stat) => (
            <div
              key={stat.label}
              style={{
                background: "#fff",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                padding: "1.5rem 2rem",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "2.2rem",
                  color: "var(--teal-dark)",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                }}
              >
                {stat.value}
              </div>
              <div className="eyebrow" style={{ fontSize: "0.58rem", color: "var(--text-light)" }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Package grid */}
        {loading ? (
          <div style={{ textAlign: "center", padding: "6rem", color: "var(--text-light)" }}>
            Loading packages…
          </div>
        ) : packages.length === 0 ? (
          <div
            style={{
              textAlign: "center",
              padding: "6rem",
              background: "#fff",
              border: "1px dashed var(--border)",
              borderRadius: "2px",
            }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1rem", opacity: 0.3 }}>✦</div>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "1rem" }}>
              No packages yet
            </p>
            <p style={{ color: "var(--text-secondary)", marginBottom: "2rem", fontWeight: 300 }}>
              Add your first luxury travel package to get started.
            </p>
            <button onClick={openAdd} className="btn-primary" style={{ cursor: "pointer" }}>
              + Add First Package
            </button>
          </div>
        ) : (
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(360px, 1fr))",
              gap: "1.5rem",
            }}
          >
            {packages.map((pkg) => {
              let highlights: string[] = [];
              try { highlights = JSON.parse(pkg.highlights); } catch {}
              return (
                <div
                  key={pkg.id}
                  style={{
                    background: "#fff",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    overflow: "hidden",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* Image */}
                  <div style={{ position: "relative", height: "200px", overflow: "hidden", background: "#f0f0f0" }}>
                    <Image
                      src={pkg.image_url}
                      alt={pkg.title}
                      fill
                      style={{ objectFit: "cover" }}
                      unoptimized
                    />
                    <div style={{ position: "absolute", top: "1rem", left: "1rem", display: "flex", gap: "0.5rem" }}>
                      <span
                        style={{
                          padding: "4px 12px",
                          background: "rgba(255,255,255,0.92)",
                          color: "var(--teal-deep)",
                          fontSize: "0.58rem",
                          letterSpacing: "0.2em",
                          textTransform: "uppercase",
                          fontWeight: 500,
                          borderRadius: "2px",
                        }}
                      >
                        {pkg.tag}
                      </span>
                      {pkg.is_featured === 1 && (
                        <span
                          style={{
                            padding: "4px 12px",
                            background: "var(--teal)",
                            color: "#fff",
                            fontSize: "0.58rem",
                            letterSpacing: "0.2em",
                            textTransform: "uppercase",
                            fontWeight: 500,
                            borderRadius: "2px",
                          }}
                        >
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ padding: "1.5rem 2rem", flexGrow: 1 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-serif)",
                        fontSize: "1.25rem",
                        fontWeight: 400,
                        color: "var(--text-primary)",
                        marginBottom: "0.8rem",
                        lineHeight: 1.3,
                      }}
                    >
                      {pkg.title}
                    </h3>
                    <div style={{ display: "flex", gap: "1.5rem", marginBottom: "0.8rem" }}>
                      <span style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>
                        ⏱ {pkg.duration}
                      </span>
                      <span style={{ fontSize: "0.82rem", color: "var(--teal-dark)", fontFamily: "var(--font-serif)" }}>
                        {pkg.price}
                      </span>
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        color: "var(--text-light)",
                        lineHeight: 1.6,
                        marginBottom: "1rem",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {pkg.description}
                    </p>
                    {highlights.length > 0 && (
                      <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                        {highlights.slice(0, 3).map((h, i) => (
                          <span
                            key={i}
                            style={{
                              padding: "3px 10px",
                              background: "rgba(28,95,107,0.07)",
                              color: "var(--teal-dark)",
                              fontSize: "0.65rem",
                              borderRadius: "2px",
                            }}
                          >
                            {h}
                          </span>
                        ))}
                        {highlights.length > 3 && (
                          <span style={{ fontSize: "0.65rem", color: "var(--text-light)", padding: "3px 6px" }}>
                            +{highlights.length - 3} more
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div
                    style={{
                      padding: "1rem 2rem",
                      borderTop: "1px solid var(--border)",
                      display: "flex",
                      justifyContent: "flex-end",
                      gap: "0.75rem",
                    }}
                  >
                    <button
                      onClick={() => openEdit(pkg)}
                      style={{
                        padding: "8px 20px",
                        background: "transparent",
                        border: "1px solid var(--border)",
                        borderRadius: "2px",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color: "var(--text-secondary)",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--teal)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--teal)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                        (e.currentTarget as HTMLButtonElement).style.color = "var(--text-secondary)";
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => setDeleteId(pkg.id)}
                      style={{
                        padding: "8px 20px",
                        background: "transparent",
                        border: "1px solid rgba(220,53,69,0.25)",
                        borderRadius: "2px",
                        fontSize: "0.7rem",
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        cursor: "pointer",
                        color: "rgba(192,57,43,0.7)",
                        transition: "all 0.3s",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "rgba(220,53,69,0.06)";
                        (e.currentTarget as HTMLButtonElement).style.color = "#c0392b";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                        (e.currentTarget as HTMLButtonElement).style.color = "rgba(192,57,43,0.7)";
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 200,
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "center",
            padding: "3rem 1rem",
            overflowY: "auto",
          }}
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowModal(false);
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "4px",
              width: "100%",
              maxWidth: "680px",
              boxShadow: "0 40px 100px rgba(0,0,0,0.25)",
            }}
          >
            {/* Modal header */}
            <div
              style={{
                padding: "2rem 2.5rem",
                borderBottom: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <h2
                style={{
                  fontFamily: "var(--font-serif)",
                  fontSize: "1.5rem",
                  fontWeight: 400,
                  color: "var(--text-primary)",
                }}
              >
                {editingId ? "Edit Package" : "Add New Package"}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                style={{
                  width: 36,
                  height: 36,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "50%",
                  cursor: "pointer",
                  fontSize: "1.1rem",
                  color: "var(--text-light)",
                }}
              >
                ×
              </button>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} style={{ padding: "2.5rem" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
                {/* Title */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Package Title *</label>
                  <input
                    type="text"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    required
                    placeholder="e.g. The Emerald Backwaters"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Tag */}
                <div>
                  <label style={labelStyle}>Destination *</label>
                  <select
                    value={form.tag}
                    onChange={(e) => setForm({ ...form, tag: e.target.value })}
                    required
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  >
                    {TAGS.map((t) => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>

                {/* Duration */}
                <div>
                  <label style={labelStyle}>Duration *</label>
                  <input
                    type="text"
                    value={form.duration}
                    onChange={(e) => setForm({ ...form, duration: e.target.value })}
                    required
                    placeholder="e.g. 7 Days / 6 Nights"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Price */}
                <div>
                  <label style={labelStyle}>Price *</label>
                  <input
                    type="text"
                    value={form.price}
                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                    required
                    placeholder="e.g. From $5,900 per person"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Image URL */}
                <div>
                  <label style={labelStyle}>Image URL *</label>
                  <input
                    type="url"
                    value={form.image_url}
                    onChange={(e) => setForm({ ...form, image_url: e.target.value })}
                    required
                    placeholder="https://..."
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Description */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Description *</label>
                  <textarea
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    required
                    rows={4}
                    placeholder="Describe this luxury journey in detail…"
                    style={{ ...inputStyle, resize: "vertical" as const, lineHeight: 1.6 }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                </div>

                {/* Highlights */}
                <div style={{ gridColumn: "span 2" }}>
                  <label style={labelStyle}>Highlights (comma-separated)</label>
                  <input
                    type="text"
                    value={form.highlights}
                    onChange={(e) => setForm({ ...form, highlights: e.target.value })}
                    placeholder="e.g. Private Houseboat, Ayurvedic Spa, Sunset Cruise"
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
                    onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
                  />
                  <p style={{ fontSize: "0.75rem", color: "var(--text-light)", marginTop: "0.4rem" }}>
                    Separate each highlight with a comma
                  </p>
                </div>

                {/* Featured */}
                <div style={{ gridColumn: "span 2", display: "flex", alignItems: "center", gap: "1rem" }}>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                      cursor: "pointer",
                    }}
                  >
                    <div
                      onClick={() => setForm({ ...form, is_featured: !form.is_featured })}
                      style={{
                        width: 48,
                        height: 26,
                        borderRadius: 13,
                        background: form.is_featured ? "var(--teal)" : "var(--border)",
                        position: "relative",
                        cursor: "pointer",
                        transition: "background 0.3s",
                        flexShrink: 0,
                      }}
                    >
                      <div
                        style={{
                          position: "absolute",
                          top: 3,
                          left: form.is_featured ? "calc(100% - 23px)" : 3,
                          width: 20,
                          height: 20,
                          borderRadius: "50%",
                          background: "#fff",
                          transition: "left 0.3s",
                          boxShadow: "0 1px 4px rgba(0,0,0,0.2)",
                        }}
                      />
                    </div>
                    <span style={{ fontSize: "0.85rem", color: "var(--text-primary)" }}>
                      Mark as Featured
                    </span>
                  </label>
                  <span style={{ fontSize: "0.78rem", color: "var(--text-light)" }}>
                    Featured packages appear first on the website
                  </span>
                </div>
              </div>

              {formError && (
                <div
                  style={{
                    padding: "12px 16px",
                    background: "rgba(220,53,69,0.07)",
                    border: "1px solid rgba(220,53,69,0.2)",
                    borderRadius: "2px",
                    color: "#c0392b",
                    fontSize: "0.88rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  {formError}
                </div>
              )}

              <div style={{ display: "flex", gap: "1rem", justifyContent: "flex-end" }}>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  style={{
                    padding: "12px 28px",
                    background: "transparent",
                    border: "1px solid var(--border)",
                    borderRadius: "2px",
                    cursor: "pointer",
                    fontSize: "0.75rem",
                    letterSpacing: "0.12em",
                    textTransform: "uppercase",
                    color: "var(--text-secondary)",
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="btn-primary"
                  style={{ cursor: saving ? "not-allowed" : "pointer", opacity: saving ? 0.7 : 1 }}
                >
                  {saving ? "Saving…" : editingId ? "Save Changes" : "Add Package"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation */}
      {deleteId !== null && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.5)",
            backdropFilter: "blur(4px)",
            zIndex: 300,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "4px",
              padding: "3rem",
              maxWidth: "440px",
              width: "100%",
              textAlign: "center",
              boxShadow: "0 30px 80px rgba(0,0,0,0.2)",
            }}
          >
            <div style={{ fontSize: "2.5rem", marginBottom: "1.5rem", color: "var(--text-light)" }}>
              ✕
            </div>
            <h3
              style={{
                fontFamily: "var(--font-serif)",
                fontSize: "1.4rem",
                fontWeight: 400,
                color: "var(--text-primary)",
                marginBottom: "1rem",
              }}
            >
              Delete Package?
            </h3>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300, lineHeight: 1.7, marginBottom: "2.5rem" }}>
              This action cannot be undone. The package will be permanently removed from the website.
            </p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <button
                onClick={() => setDeleteId(null)}
                style={{
                  padding: "12px 28px",
                  background: "transparent",
                  border: "1px solid var(--border)",
                  borderRadius: "2px",
                  cursor: "pointer",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "var(--text-secondary)",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                style={{
                  padding: "12px 28px",
                  background: "#c0392b",
                  border: "none",
                  borderRadius: "2px",
                  cursor: deleting ? "not-allowed" : "pointer",
                  fontSize: "0.75rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  color: "#fff",
                  opacity: deleting ? 0.7 : 1,
                }}
              >
                {deleting ? "Deleting…" : "Yes, Delete"}
              </button>
            </div>
          </div>
        </div>
      )}
      </div>
    </AdminShell>
  );
}
