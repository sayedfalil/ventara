"use client";

import { useState, useEffect, useCallback } from "react";
import AdminShell from "@/components/admin/AdminShell";

type Enquiry = {
  id: number;
  full_name: string;
  email: string;
  phone: string;
  package_name: string;
  travelers: number;
  travel_date: string;
  message: string;
  source_url: string;
  status: string;
  is_read: number;
  notes: string;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "converted", "closed"];
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:       { bg: "rgba(26,138,155,0.1)",  color: "#0d5c6b" },
  contacted: { bg: "rgba(230,126,34,0.1)",  color: "#7d4e0a" },
  converted: { bg: "rgba(39,174,96,0.1)",   color: "#145a2f" },
  closed:    { bg: "rgba(120,120,120,0.1)", color: "#555" },
};

function downloadCSV(data: Enquiry[]) {
  const headers = ["ID","Name","Email","Phone","Package","Travelers","Travel Date","Message","Status","Source","Submitted"];
  const rows = data.map(e => [
    e.id, `"${e.full_name}"`, `"${e.email}"`, `"${e.phone}"`, `"${e.package_name}"`,
    e.travelers, `"${e.travel_date}"`, `"${e.message.replace(/"/g,"'")}"`,
    e.status, `"${e.source_url}"`, `"${e.created_at}"`
  ]);
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url; a.download = `enquiries-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [pkgFilter, setPkgFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [expanded, setExpanded] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams({ page: String(page) });
    if (statusFilter) p.set("status", statusFilter);
    if (pkgFilter) p.set("package", pkgFilter);
    if (dateFrom) p.set("from", dateFrom);
    if (dateTo) p.set("to", dateTo);
    const res = await fetch(`/api/admin/enquiries?${p}`);
    const data = await res.json();
    setEnquiries(data.enquiries || []);
    setTotal(data.pagination?.total || 0);
    setPages(data.pagination?.pages || 1);
    setLoading(false);
  }, [page, statusFilter, pkgFilter, dateFrom, dateTo]);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  async function updateEnquiry(id: number, fields: Partial<Enquiry>) {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    loadEnquiries();
    if (expanded?.id === id) setExpanded(e => e ? { ...e, ...fields } as Enquiry : null);
  }

  async function saveNotes() {
    if (!expanded) return;
    setSavingNotes(true);
    await updateEnquiry(expanded.id, { notes: editNotes });
    setSavingNotes(false);
  }

  function openDetail(e: Enquiry) {
    setExpanded(e);
    setEditNotes(e.notes);
    if (!e.is_read) updateEnquiry(e.id, { is_read: 1 });
  }

  const thStyle = { padding: "0.75rem 1rem", textAlign: "left" as const, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-light)", fontWeight: 500, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" as const };
  const tdStyle = { padding: "0.85rem 1rem", fontSize: "0.85rem", color: "var(--text-primary)", verticalAlign: "middle" as const };

  const newCount = enquiries.filter(e => e.status === "new").length;

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2.5rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Enquiry Inbox</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>
            {total} enquir{total !== 1 ? "ies" : "y"} total{newCount > 0 && <span style={{ marginLeft: 8, padding: "2px 10px", background: "rgba(26,138,155,0.12)", color: "var(--teal-dark)", borderRadius: "99px", fontSize: "0.72rem", fontWeight: 600 }}>{newCount} new</span>}
          </p>
        </div>
        <button onClick={() => downloadCSV(enquiries)} disabled={enquiries.length === 0}
          style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--teal)", borderRadius: "2px", cursor: enquiries.length === 0 ? "not-allowed" : "pointer", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", opacity: enquiries.length === 0 ? 0.5 : 1 }}>
          Export CSV
        </button>
      </div>

      {/* Stats */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(140px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
        {STATUS_OPTIONS.map(s => {
          const cnt = enquiries.filter(e => e.status === s).length;
          return (
            <div key={s} onClick={() => setStatusFilter(statusFilter === s ? "" : s)}
              style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.25rem", cursor: "pointer", borderLeft: `3px solid ${STATUS_COLORS[s]?.color || "#ccc"}`, transition: "box-shadow 0.2s" }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.8rem", color: STATUS_COLORS[s]?.color || "var(--text-primary)", lineHeight: 1, marginBottom: "0.4rem" }}>{cnt}</div>
              <div className="eyebrow" style={{ fontSize: "0.58rem", color: "var(--text-light)", textTransform: "capitalize" }}>{s}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
        </select>
        <input type="text" placeholder="Filter by package…" value={pkgFilter} onChange={e => { setPkgFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", width: 180, fontFamily: "var(--font-sans)" }} />
        <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", fontFamily: "var(--font-sans)" }} />
        <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", fontFamily: "var(--font-sans)" }} />
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div>
        ) : enquiries.length === 0 ? (
          <div style={{ padding: "5rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>No enquiries yet</p>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300 }}>Enquiries submitted from the website will appear here.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 860 }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={thStyle}></th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Email</th>
                <th style={thStyle}>Phone</th>
                <th style={thStyle}>Package</th>
                <th style={thStyle}>Date</th>
                <th style={thStyle}>Status</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq, i) => (
                <tr key={enq.id} style={{ borderBottom: i < enquiries.length - 1 ? "1px solid var(--border)" : "none", background: !enq.is_read ? "rgba(26,138,155,0.02)" : "transparent", cursor: "pointer" }}
                  onClick={() => openDetail(enq)}>
                  <td style={{ ...tdStyle, width: 32, paddingRight: 4 }}>
                    {!enq.is_read && <span style={{ display: "inline-block", width: 8, height: 8, background: "var(--teal)", borderRadius: "50%" }} />}
                  </td>
                  <td style={{ ...tdStyle, fontWeight: !enq.is_read ? 600 : 400 }}>{enq.full_name}</td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{enq.email}</td>
                  <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{enq.phone || "—"}</td>
                  <td style={{ ...tdStyle, maxWidth: 160, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{enq.package_name || "—"}</td>
                  <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "var(--text-light)", fontSize: "0.78rem" }}>
                    {new Date(enq.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                  </td>
                  <td style={tdStyle}>
                    <span style={{ padding: "3px 10px", background: STATUS_COLORS[enq.status]?.bg || "#f0f0f0", color: STATUS_COLORS[enq.status]?.color || "#555", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, borderRadius: "2px" }}>
                      {enq.status}
                    </span>
                  </td>
                  <td style={{ ...tdStyle, textAlign: "right" }} onClick={e => e.stopPropagation()}>
                    <select value={enq.status}
                      onChange={e => updateEnquiry(enq.id, { status: e.target.value })}
                      style={{ padding: "5px 10px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.72rem", background: "#fff", cursor: "pointer", outline: "none", fontFamily: "var(--font-sans)" }}>
                      {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s.charAt(0).toUpperCase() + s.slice(1)}</option>)}
                    </select>
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

      {/* Detail panel */}
      {expanded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }} onClick={() => setExpanded(null)}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)" }} />
          <div style={{ width: "100%", maxWidth: 500, background: "#fff", overflowY: "auto", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)", padding: "2.5rem" }}
            onClick={e => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "2rem" }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.5rem", fontWeight: 400, marginBottom: "0.3rem" }}>{expanded.full_name}</h2>
                <span style={{ padding: "3px 10px", background: STATUS_COLORS[expanded.status]?.bg || "#f0f0f0", color: STATUS_COLORS[expanded.status]?.color || "#555", fontSize: "0.62rem", letterSpacing: "0.15em", textTransform: "uppercase", fontWeight: 600, borderRadius: "2px" }}>
                  {expanded.status}
                </span>
              </div>
              <button onClick={() => setExpanded(null)} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "var(--text-light)", fontSize: "1rem" }}>×</button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem", marginBottom: "2rem" }}>
              {[
                ["Email", expanded.email],
                ["Phone", expanded.phone || "—"],
                ["Package", expanded.package_name || "—"],
                ["Travelers", String(expanded.travelers)],
                ["Travel Date", expanded.travel_date || "—"],
                ["Source", expanded.source_url || "—"],
                ["Submitted", new Date(expanded.created_at).toLocaleString("en-GB")],
              ].map(([label, val]) => (
                <div key={label}>
                  <div className="eyebrow" style={{ fontSize: "0.55rem", color: "var(--text-light)", marginBottom: "0.3rem" }}>{label}</div>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", wordBreak: "break-all" }}>{val}</div>
                </div>
              ))}
            </div>

            {expanded.message && (
              <div style={{ marginBottom: "2rem" }}>
                <div className="eyebrow" style={{ fontSize: "0.55rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>Message</div>
                <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: 1.7, background: "var(--bg-secondary)", padding: "1rem", borderRadius: "2px", border: "1px solid var(--border)" }}>
                  {expanded.message}
                </div>
              </div>
            )}

            {/* Status changer */}
            <div style={{ marginBottom: "2rem" }}>
              <div className="eyebrow" style={{ fontSize: "0.55rem", color: "var(--text-light)", marginBottom: "0.75rem" }}>Update Status</div>
              <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
                {STATUS_OPTIONS.map(s => (
                  <button key={s} onClick={() => updateEnquiry(expanded.id, { status: s })}
                    style={{ padding: "7px 16px", border: "1px solid", borderColor: expanded.status === s ? STATUS_COLORS[s]?.color || "var(--teal)" : "var(--border)", background: expanded.status === s ? STATUS_COLORS[s]?.bg || "transparent" : "transparent", borderRadius: "2px", cursor: "pointer", fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", color: expanded.status === s ? STATUS_COLORS[s]?.color || "var(--teal-dark)" : "var(--text-secondary)", fontWeight: expanded.status === s ? 600 : 400 }}>
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Internal notes */}
            <div>
              <div className="eyebrow" style={{ fontSize: "0.55rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>Internal Notes</div>
              <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={4}
                placeholder="Add internal notes about this enquiry…"
                style={{ width: "100%", padding: "10px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.88rem", fontFamily: "var(--font-sans)", lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
              <button onClick={saveNotes} disabled={savingNotes}
                className="btn-primary"
                style={{ marginTop: "0.75rem", cursor: "pointer", fontSize: "0.7rem", padding: "10px 22px", opacity: savingNotes ? 0.7 : 1 }}>
                {savingNotes ? "Saving…" : "Save Notes"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
