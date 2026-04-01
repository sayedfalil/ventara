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
  budget: string;
  message: string;
  source_url: string;
  status: string;
  priority: string;
  follow_up_date: string;
  is_read: number;
  notes: string;
  utm_source: string;
  utm_medium: string;
  utm_campaign: string;
  created_at: string;
};

type Activity = {
  id: number;
  enquiry_id: number;
  action_type: string;
  description: string;
  created_at: string;
};

const STATUS_OPTIONS = ["new", "contacted", "qualified", "proposal_sent", "won", "lost"];
const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:           { bg: "rgba(26,138,155,0.10)",  color: "#0d5c6b" },
  contacted:     { bg: "rgba(230,126,34,0.10)",  color: "#7d4e0a" },
  qualified:     { bg: "rgba(142,68,173,0.10)",  color: "#6c3483" },
  proposal_sent: { bg: "rgba(52,152,219,0.10)",  color: "#1a5276" },
  won:           { bg: "rgba(39,174,96,0.10)",   color: "#145a2f" },
  lost:          { bg: "rgba(192,57,43,0.10)",   color: "#922b21" },
};
const PRIORITY_COLORS: Record<string, { color: string; label: string }> = {
  high:   { color: "#c0392b", label: "High" },
  medium: { color: "#e67e22", label: "Medium" },
  low:    { color: "#27ae60", label: "Low" },
};
const ACT_ICONS: Record<string, string> = {
  note: "📝", call: "📞", email: "✉", status_change: "🔄", follow_up: "📅", other: "•",
};

function downloadCSV(data: Enquiry[]) {
  const headers = ["ID","Name","Email","Phone","Package","Travelers","Budget","Travel Date","Status","Priority","Follow-up","UTM Source","UTM Medium","Message","Source","Submitted"];
  const rows = data.map(e => [
    e.id, `"${e.full_name}"`, `"${e.email}"`, `"${e.phone}"`, `"${e.package_name}"`,
    e.travelers, `"${e.budget}"`, `"${e.travel_date}"`,
    e.status, e.priority, `"${e.follow_up_date}"`,
    `"${e.utm_source}"`, `"${e.utm_medium}"`,
    `"${e.message.replace(/"/g, "'")}"`, `"${e.source_url}"`, `"${e.created_at}"`,
  ]);
  const csv = [headers.join(","), ...rows.map(r => r.join(","))].join("\n");
  const blob = new Blob([csv], { type: "text/csv" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a"); a.href = url; a.download = `leads-${Date.now()}.csv`; a.click();
  URL.revokeObjectURL(url);
}

export default function EnquiriesPage() {
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [pages, setPages] = useState(1);
  const [statusFilter, setStatusFilter] = useState("");
  const [priorityFilter, setPriorityFilter] = useState("");
  const [pkgFilter, setPkgFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [search, setSearch] = useState("");

  const [expanded, setExpanded] = useState<Enquiry | null>(null);
  const [editNotes, setEditNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [actText, setActText] = useState("");
  const [actType, setActType] = useState("note");
  const [savingAct, setSavingAct] = useState(false);
  const [editFollowUp, setEditFollowUp] = useState("");
  const [editPriority, setEditPriority] = useState("medium");

  const loadEnquiries = useCallback(async () => {
    setLoading(true);
    const p = new URLSearchParams({ page: String(page) });
    if (statusFilter) p.set("status", statusFilter);
    if (priorityFilter) p.set("priority", priorityFilter);
    if (pkgFilter) p.set("package", pkgFilter);
    if (dateFrom) p.set("from", dateFrom);
    if (dateTo) p.set("to", dateTo);
    if (search) p.set("search", search);
    const res = await fetch(`/api/admin/enquiries?${p}`);
    const data = await res.json();
    setEnquiries(data.enquiries || []);
    setTotal(data.pagination?.total || 0);
    setPages(data.pagination?.pages || 1);
    setLoading(false);
  }, [page, statusFilter, priorityFilter, pkgFilter, dateFrom, dateTo, search]);

  useEffect(() => { loadEnquiries(); }, [loadEnquiries]);

  async function updateEnquiry(id: number, fields: Partial<Enquiry>) {
    await fetch(`/api/admin/enquiries/${id}`, {
      method: "PUT", headers: { "Content-Type": "application/json" },
      body: JSON.stringify(fields),
    });
    loadEnquiries();
    if (expanded?.id === id) setExpanded(e => e ? { ...e, ...fields } as Enquiry : null);
  }

  async function loadActivities(id: number) {
    const res = await fetch(`/api/admin/enquiries/${id}/activity`);
    const data = await res.json();
    setActivities(Array.isArray(data) ? data : []);
  }

  async function addActivity() {
    if (!expanded || !actText.trim()) return;
    setSavingAct(true);
    await fetch(`/api/admin/enquiries/${expanded.id}/activity`, {
      method: "POST", headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ action_type: actType, description: actText }),
    });
    setActText("");
    await loadActivities(expanded.id);
    setSavingAct(false);
  }

  async function saveNotes() {
    if (!expanded) return;
    setSavingNotes(true);
    await updateEnquiry(expanded.id, { notes: editNotes });
    setSavingNotes(false);
  }

  async function saveFollowUp() {
    if (!expanded) return;
    await updateEnquiry(expanded.id, { follow_up_date: editFollowUp });
  }

  async function savePriority(val: string) {
    if (!expanded) return;
    setEditPriority(val);
    await updateEnquiry(expanded.id, { priority: val });
    if (expanded) {
      await fetch(`/api/admin/enquiries/${expanded.id}/activity`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action_type: "other", description: `Priority set to ${val}` }),
      });
      loadActivities(expanded.id);
    }
  }

  async function changeStatus(id: number, status: string) {
    const prev = enquiries.find(e => e.id === id)?.status || expanded?.status;
    await updateEnquiry(id, { status });
    if (expanded?.id === id) {
      await fetch(`/api/admin/enquiries/${id}/activity`, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action_type: "status_change", description: `Status changed from "${prev}" to "${status}"` }),
      });
      loadActivities(id);
    }
  }

  function openDetail(e: Enquiry) {
    setExpanded(e);
    setEditNotes(e.notes || "");
    setEditFollowUp(e.follow_up_date || "");
    setEditPriority(e.priority || "medium");
    setActText("");
    if (!e.is_read) updateEnquiry(e.id, { is_read: 1 });
    loadActivities(e.id);
  }

  const newCount = enquiries.filter(e => e.status === "new").length;

  const thStyle = { padding: "0.75rem 1rem", textAlign: "left" as const, fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const, color: "var(--text-light)", fontWeight: 500, borderBottom: "1px solid var(--border)", whiteSpace: "nowrap" as const };
  const tdStyle = { padding: "0.85rem 1rem", fontSize: "0.85rem", color: "var(--text-primary)", verticalAlign: "middle" as const };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "2rem", flexWrap: "wrap", gap: "1rem" }}>
        <div>
          <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>Leads & CRM</h1>
          <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>
            {total} lead{total !== 1 ? "s" : ""} total
            {newCount > 0 && <span style={{ marginLeft: 8, padding: "2px 10px", background: "rgba(26,138,155,0.12)", color: "var(--teal-dark)", borderRadius: "99px", fontSize: "0.72rem", fontWeight: 600 }}>{newCount} new</span>}
          </p>
        </div>
        <button onClick={() => downloadCSV(enquiries)} disabled={enquiries.length === 0}
          style={{ padding: "10px 22px", background: "transparent", border: "1px solid var(--teal)", borderRadius: "2px", cursor: enquiries.length === 0 ? "not-allowed" : "pointer", fontSize: "0.7rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--teal)", opacity: enquiries.length === 0 ? 0.5 : 1 }}>
          ↓ Export CSV
        </button>
      </div>

      {/* Pipeline stat pills */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(120px,1fr))", gap: "0.75rem", marginBottom: "1.75rem" }}>
        {STATUS_OPTIONS.map(s => {
          const cnt = enquiries.filter(e => e.status === s).length;
          const c = STATUS_COLORS[s] || { bg: "#f0f0f0", color: "#555" };
          return (
            <div key={s} onClick={() => { setStatusFilter(statusFilter === s ? "" : s); setPage(1); }}
              style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1rem 1.25rem", cursor: "pointer", borderLeft: `3px solid ${c.color}`, userSelect: "none" as const }}>
              <div style={{ fontFamily: "var(--font-serif)", fontSize: "1.6rem", color: c.color, lineHeight: 1, marginBottom: "0.3rem" }}>{cnt}</div>
              <div style={{ fontSize: "0.58rem", color: "var(--text-light)", textTransform: "capitalize", letterSpacing: "0.1em" }}>{s.replace("_", " ")}</div>
            </div>
          );
        })}
      </div>

      {/* Filters */}
      <div style={{ display: "flex", gap: "0.6rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
        <input type="text" placeholder="Search name / email…" value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", width: 200, fontFamily: "var(--font-sans)" }} />
        <select value={statusFilter} onChange={e => { setStatusFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          <option value="">All Statuses</option>
          {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s.replace("_", " ")}</option>)}
        </select>
        <select value={priorityFilter} onChange={e => { setPriorityFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)" }}>
          <option value="">All Priorities</option>
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        <input type="text" placeholder="Filter package…" value={pkgFilter}
          onChange={e => { setPkgFilter(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", width: 160, fontFamily: "var(--font-sans)" }} />
        <input type="date" value={dateFrom} onChange={e => { setDateFrom(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", fontFamily: "var(--font-sans)" }} />
        <input type="date" value={dateTo} onChange={e => { setDateTo(e.target.value); setPage(1); }}
          style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", background: "#fff", outline: "none", fontFamily: "var(--font-sans)" }} />
        {(statusFilter || priorityFilter || pkgFilter || dateFrom || dateTo || search) && (
          <button onClick={() => { setStatusFilter(""); setPriorityFilter(""); setPkgFilter(""); setDateFrom(""); setDateTo(""); setSearch(""); setPage(1); }}
            style={{ padding: "8px 14px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.78rem", background: "#fff", cursor: "pointer", color: "var(--text-secondary)", fontFamily: "var(--font-sans)" }}>
            Clear Filters ×
          </button>
        )}
      </div>

      {/* Table */}
      <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", overflow: "auto" }}>
        {loading ? (
          <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>Loading…</div>
        ) : enquiries.length === 0 ? (
          <div style={{ padding: "5rem", textAlign: "center" }}>
            <p className="eyebrow" style={{ color: "var(--text-light)", marginBottom: "0.75rem" }}>No leads found</p>
            <p style={{ color: "var(--text-secondary)", fontWeight: 300 }}>Enquiries from the website will appear here.</p>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 900 }}>
            <thead>
              <tr style={{ background: "var(--bg-secondary)" }}>
                <th style={thStyle}></th>
                <th style={thStyle}>Name</th>
                <th style={thStyle}>Contact</th>
                <th style={thStyle}>Package</th>
                <th style={thStyle}>Budget</th>
                <th style={thStyle}>Priority</th>
                <th style={thStyle}>Follow-up</th>
                <th style={thStyle}>Status</th>
                <th style={thStyle}>Date</th>
                <th style={{ ...thStyle, textAlign: "right" }}>Change Status</th>
              </tr>
            </thead>
            <tbody>
              {enquiries.map((enq, i) => {
                const sc = STATUS_COLORS[enq.status] || { bg: "#f0f0f0", color: "#555" };
                const pc = PRIORITY_COLORS[enq.priority || "medium"];
                const isOverdue = enq.follow_up_date && new Date(enq.follow_up_date) < new Date() && !["won","lost"].includes(enq.status);
                return (
                  <tr key={enq.id}
                    style={{ borderBottom: i < enquiries.length - 1 ? "1px solid var(--border)" : "none", background: !enq.is_read ? "rgba(26,138,155,0.02)" : "transparent", cursor: "pointer" }}
                    onClick={() => openDetail(enq)}>
                    <td style={{ ...tdStyle, width: 32, paddingRight: 4 }}>
                      {!enq.is_read && <span style={{ display: "inline-block", width: 8, height: 8, background: "var(--teal)", borderRadius: "50%" }} />}
                    </td>
                    <td style={{ ...tdStyle, fontWeight: !enq.is_read ? 600 : 400 }}>{enq.full_name}</td>
                    <td style={tdStyle}>
                      <div style={{ fontSize: "0.82rem", color: "var(--text-secondary)" }}>{enq.email}</div>
                      {enq.phone && <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{enq.phone}</div>}
                    </td>
                    <td style={{ ...tdStyle, maxWidth: 140, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{enq.package_name || "—"}</td>
                    <td style={{ ...tdStyle, color: "var(--text-secondary)", fontSize: "0.8rem" }}>{enq.budget || "—"}</td>
                    <td style={tdStyle}>
                      <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.68rem", color: pc.color, fontWeight: 600 }}>
                        <span style={{ width: 6, height: 6, background: pc.color, borderRadius: "50%" }} />{pc.label}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, fontSize: "0.78rem", color: isOverdue ? "#c0392b" : "var(--text-light)", fontWeight: isOverdue ? 600 : 400 }}>
                      {enq.follow_up_date ? new Date(enq.follow_up_date).toLocaleDateString("en-GB", { day: "2-digit", month: "short" }) : "—"}
                      {isOverdue && <span style={{ marginLeft: 4, fontSize: "0.65rem" }}>⚠</span>}
                    </td>
                    <td style={tdStyle}>
                      <span style={{ padding: "3px 10px", background: sc.bg, color: sc.color, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "capitalize", fontWeight: 600, borderRadius: "2px", whiteSpace: "nowrap" }}>
                        {enq.status.replace("_", " ")}
                      </span>
                    </td>
                    <td style={{ ...tdStyle, whiteSpace: "nowrap", color: "var(--text-light)", fontSize: "0.75rem" }}>
                      {new Date(enq.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}
                    </td>
                    <td style={{ ...tdStyle, textAlign: "right" }} onClick={e => e.stopPropagation()}>
                      <select value={enq.status} onChange={e => changeStatus(enq.id, e.target.value)}
                        style={{ padding: "5px 10px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.72rem", background: "#fff", cursor: "pointer", outline: "none", fontFamily: "var(--font-sans)" }}>
                        {STATUS_OPTIONS.map(s => <option key={s} value={s} style={{ textTransform: "capitalize" }}>{s.replace("_", " ")}</option>)}
                      </select>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        )}
      </div>

      {/* Pagination */}
      {pages > 1 && (
        <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1.5rem" }}>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            style={{ padding: "8px 16px", background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", cursor: page === 1 ? "not-allowed" : "pointer", fontSize: "0.82rem", opacity: page === 1 ? 0.4 : 1 }}>← Prev</button>
          {Array.from({ length: pages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              style={{ width: 36, height: 36, background: p === page ? "var(--teal-deep)" : "#fff", color: p === page ? "#fff" : "var(--text-secondary)", border: "1px solid var(--border)", borderRadius: "2px", cursor: "pointer", fontSize: "0.82rem" }}>
              {p}
            </button>
          ))}
          <button onClick={() => setPage(p => Math.min(pages, p + 1))} disabled={page === pages}
            style={{ padding: "8px 16px", background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", cursor: page === pages ? "not-allowed" : "pointer", fontSize: "0.82rem", opacity: page === pages ? 0.4 : 1 }}>Next →</button>
        </div>
      )}

      {/* Detail slide-over */}
      {expanded && (
        <div style={{ position: "fixed", inset: 0, zIndex: 200, display: "flex" }} onClick={() => setExpanded(null)}>
          <div style={{ flex: 1, background: "rgba(0,0,0,0.4)", backdropFilter: "blur(3px)" }} />
          <div style={{ width: "100%", maxWidth: 520, background: "#fff", overflowY: "auto", boxShadow: "-20px 0 60px rgba(0,0,0,0.15)" }}
            onClick={e => e.stopPropagation()}>

            {/* Panel header */}
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", justifyContent: "space-between", alignItems: "flex-start", position: "sticky", top: 0, background: "#fff", zIndex: 10 }}>
              <div>
                <h2 style={{ fontFamily: "var(--font-serif)", fontSize: "1.4rem", fontWeight: 400, marginBottom: "0.3rem" }}>{expanded.full_name}</h2>
                <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                  {(() => { const sc = STATUS_COLORS[expanded.status] || { bg: "#f0f0f0", color: "#555" }; return (
                    <span style={{ padding: "3px 10px", background: sc.bg, color: sc.color, fontSize: "0.6rem", letterSpacing: "0.12em", textTransform: "capitalize", fontWeight: 600, borderRadius: "2px" }}>
                      {expanded.status.replace("_", " ")}
                    </span>
                  );})()}
                  {(() => { const pc = PRIORITY_COLORS[expanded.priority || "medium"]; return (
                    <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: "0.68rem", color: pc.color, fontWeight: 600 }}>
                      <span style={{ width: 6, height: 6, background: pc.color, borderRadius: "50%" }} />{pc.label} Priority
                    </span>
                  );})()}
                </div>
              </div>
              <button onClick={() => setExpanded(null)} style={{ background: "transparent", border: "1px solid var(--border)", borderRadius: "50%", width: 32, height: 32, cursor: "pointer", color: "var(--text-light)", fontSize: "1rem", flexShrink: 0, marginLeft: "1rem" }}>×</button>
            </div>

            <div style={{ padding: "1.5rem 2rem" }}>
              {/* Lead details grid */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
                {[
                  ["Email", expanded.email],
                  ["Phone", expanded.phone || "—"],
                  ["Package", expanded.package_name || "—"],
                  ["Travelers", String(expanded.travelers)],
                  ["Travel Date", expanded.travel_date || "—"],
                  ["Budget", expanded.budget || "—"],
                  ["Submitted", new Date(expanded.created_at).toLocaleString("en-GB")],
                  ["Source URL", expanded.source_url ? expanded.source_url.replace(/^https?:\/\//, "").slice(0, 30) + "…" : "—"],
                ].map(([label, val]) => (
                  <div key={label}>
                    <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.25rem" }}>{label}</div>
                    <div style={{ fontSize: "0.85rem", color: "var(--text-primary)", wordBreak: "break-word" }}>{val}</div>
                  </div>
                ))}
              </div>

              {/* UTM tracking */}
              {(expanded.utm_source || expanded.utm_medium || expanded.utm_campaign) && (
                <div style={{ background: "var(--bg-secondary)", border: "1px solid var(--border)", borderRadius: "2px", padding: "0.75rem 1rem", marginBottom: "1.5rem" }}>
                  <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>UTM Tracking</div>
                  <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
                    {[["Source", expanded.utm_source], ["Medium", expanded.utm_medium], ["Campaign", expanded.utm_campaign]].filter(([, v]) => v).map(([k, v]) => (
                      <div key={k}>
                        <span style={{ fontSize: "0.65rem", color: "var(--text-light)", textTransform: "uppercase", letterSpacing: "0.1em" }}>{k}: </span>
                        <span style={{ fontSize: "0.78rem", color: "var(--teal-dark)", fontWeight: 500 }}>{v}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Message */}
              {expanded.message && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.4rem" }}>Message</div>
                  <div style={{ fontSize: "0.88rem", color: "var(--text-primary)", lineHeight: 1.7, background: "var(--bg-secondary)", padding: "0.9rem 1rem", borderRadius: "2px", border: "1px solid var(--border)" }}>
                    {expanded.message}
                  </div>
                </div>
              )}

              {/* Status changer */}
              <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.75rem" }}>Update Status</div>
                <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                  {STATUS_OPTIONS.map(s => {
                    const sc = STATUS_COLORS[s] || { bg: "#f0f0f0", color: "#555" };
                    const isActive = expanded.status === s;
                    return (
                      <button key={s} onClick={() => changeStatus(expanded.id, s)}
                        style={{ padding: "6px 13px", border: "1px solid", borderColor: isActive ? sc.color : "var(--border)", background: isActive ? sc.bg : "transparent", borderRadius: "2px", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.1em", textTransform: "capitalize", color: isActive ? sc.color : "var(--text-secondary)", fontWeight: isActive ? 600 : 400 }}>
                        {s.replace("_", " ")}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Priority + Follow-up */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <div>
                  <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>Priority</div>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    {["high","medium","low"].map(p => {
                      const pc = PRIORITY_COLORS[p];
                      const isActive = editPriority === p;
                      return (
                        <button key={p} onClick={() => savePriority(p)}
                          style={{ padding: "5px 11px", border: "1px solid", borderColor: isActive ? pc.color : "var(--border)", background: isActive ? `${pc.color}18` : "transparent", borderRadius: "2px", cursor: "pointer", fontSize: "0.65rem", letterSpacing: "0.08em", textTransform: "capitalize", color: isActive ? pc.color : "var(--text-secondary)", fontWeight: isActive ? 600 : 400 }}>
                          {p}
                        </button>
                      );
                    })}
                  </div>
                </div>
                <div>
                  <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>Follow-up Date</div>
                  <div style={{ display: "flex", gap: "0.4rem" }}>
                    <input type="date" value={editFollowUp} onChange={e => setEditFollowUp(e.target.value)}
                      style={{ flex: 1, padding: "5px 10px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.82rem", fontFamily: "var(--font-sans)", outline: "none" }} />
                    <button onClick={saveFollowUp}
                      style={{ padding: "5px 10px", background: "var(--teal-deep)", border: "none", borderRadius: "2px", cursor: "pointer", color: "#fff", fontSize: "0.7rem" }}>✓</button>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div style={{ marginBottom: "1.5rem", paddingBottom: "1.5rem", borderBottom: "1px solid var(--border)" }}>
                <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.5rem" }}>Internal Notes</div>
                <textarea value={editNotes} onChange={e => setEditNotes(e.target.value)} rows={3}
                  placeholder="Add internal notes…"
                  style={{ width: "100%", padding: "9px 12px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.85rem", fontFamily: "var(--font-sans)", lineHeight: 1.6, resize: "vertical", outline: "none", boxSizing: "border-box" }} />
                <button onClick={saveNotes} disabled={savingNotes} className="btn-primary"
                  style={{ marginTop: "0.5rem", cursor: savingNotes ? "not-allowed" : "pointer", fontSize: "0.65rem", padding: "8px 18px", opacity: savingNotes ? 0.7 : 1 }}>
                  {savingNotes ? "Saving…" : "Save Notes"}
                </button>
              </div>

              {/* Activity log */}
              <div>
                <div className="eyebrow" style={{ fontSize: "0.52rem", color: "var(--text-light)", marginBottom: "0.75rem" }}>Activity Log</div>

                {/* Add activity */}
                <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1rem" }}>
                  <select value={actType} onChange={e => setActType(e.target.value)}
                    style={{ padding: "7px 10px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.78rem", background: "#fff", outline: "none", cursor: "pointer", fontFamily: "var(--font-sans)", flexShrink: 0 }}>
                    <option value="note">📝 Note</option>
                    <option value="call">📞 Call</option>
                    <option value="email">✉ Email</option>
                    <option value="follow_up">📅 Follow-up</option>
                    <option value="other">• Other</option>
                  </select>
                  <input value={actText} onChange={e => setActText(e.target.value)} placeholder="Log an activity…"
                    onKeyDown={e => { if (e.key === "Enter" && actText.trim()) addActivity(); }}
                    style={{ flex: 1, padding: "7px 12px", border: "1px solid var(--border)", borderRadius: "2px", fontSize: "0.82rem", fontFamily: "var(--font-sans)", outline: "none" }} />
                  <button onClick={addActivity} disabled={savingAct || !actText.trim()}
                    style={{ padding: "7px 14px", background: "var(--teal-deep)", border: "none", borderRadius: "2px", cursor: savingAct || !actText.trim() ? "not-allowed" : "pointer", color: "#fff", fontSize: "0.75rem", opacity: savingAct || !actText.trim() ? 0.5 : 1, flexShrink: 0 }}>
                    Add
                  </button>
                </div>

                {/* Log entries */}
                <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem", maxHeight: 280, overflowY: "auto" }}>
                  {activities.length === 0 ? (
                    <div style={{ fontSize: "0.82rem", color: "var(--text-light)", fontStyle: "italic", padding: "0.75rem 0" }}>No activity logged yet.</div>
                  ) : activities.map(a => (
                    <div key={a.id} style={{ display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ fontSize: "0.9rem", marginTop: 1, flexShrink: 0 }}>{ACT_ICONS[a.action_type] || "•"}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "0.82rem", color: "var(--text-primary)", lineHeight: 1.5 }}>{a.description}</div>
                        <div style={{ fontSize: "0.68rem", color: "var(--text-light)", marginTop: "0.15rem" }}>
                          {new Date(a.created_at).toLocaleString("en-GB", { day: "2-digit", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </AdminShell>
  );
}
