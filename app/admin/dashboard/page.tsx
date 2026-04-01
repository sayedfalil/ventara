"use client";

import { useState, useEffect } from "react";
import AdminShell from "@/components/admin/AdminShell";
import Link from "next/link";

type DashboardData = {
  leads: {
    total: number;
    unread: number;
    thisWeek: number;
    thisMonth: number;
    won: number;
    byStatus: { status: string; count: number }[];
  };
  proposals: {
    total: number;
    byStatus: { status: string; count: number }[];
  };
  content: { packages: number; publishedBlogs: number };
  recentLeads: {
    id: number;
    full_name: string;
    email: string;
    package_name: string;
    status: string;
    priority: string;
    created_at: string;
  }[];
  trend: { month: string; count: number }[];
};

const STATUS_COLORS: Record<string, { bg: string; color: string }> = {
  new:            { bg: "rgba(26,138,155,0.10)", color: "#0d5c6b" },
  contacted:      { bg: "rgba(230,126,34,0.10)", color: "#7d4e0a" },
  qualified:      { bg: "rgba(142,68,173,0.10)", color: "#6c3483" },
  proposal_sent:  { bg: "rgba(52,152,219,0.10)", color: "#1a5276" },
  won:            { bg: "rgba(39,174,96,0.10)",  color: "#145a2f" },
  lost:           { bg: "rgba(192,57,43,0.10)",  color: "#922b21" },
  converted:      { bg: "rgba(39,174,96,0.10)",  color: "#145a2f" },
  closed:         { bg: "rgba(120,120,120,0.10)","color": "#555" },
};
const PRIORITY_COLORS: Record<string, string> = {
  high: "#c0392b", medium: "#e67e22", low: "#27ae60",
};

function StatCard({ label, value, sub, accent }: { label: string; value: number | string; sub?: string; accent?: string }) {
  return (
    <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.5rem 2rem", borderLeft: accent ? `3px solid ${accent}` : undefined }}>
      <div style={{ fontFamily: "var(--font-serif)", fontSize: "2.4rem", color: accent || "var(--teal-dark)", lineHeight: 1, marginBottom: "0.4rem" }}>{value}</div>
      <div className="eyebrow" style={{ fontSize: "0.58rem", color: "var(--text-light)" }}>{label}</div>
      {sub && <div style={{ fontSize: "0.75rem", color: "var(--text-secondary)", marginTop: "0.4rem" }}>{sub}</div>}
    </div>
  );
}

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/admin/dashboard")
      .then(r => r.json())
      .then(d => { setData(d); setLoading(false); })
      .catch(() => setLoading(false));
  }, []);

  const conversionRate = data && data.leads.total > 0
    ? Math.round((data.leads.won / data.leads.total) * 100)
    : 0;

  const maxTrend = data ? Math.max(...data.trend.map(t => t.count), 1) : 1;

  const thStyle = {
    padding: "0.75rem 1rem", textAlign: "left" as const,
    fontSize: "0.6rem", letterSpacing: "0.15em", textTransform: "uppercase" as const,
    color: "var(--text-light)", fontWeight: 500, borderBottom: "1px solid var(--border)",
  };
  const tdStyle = { padding: "0.85rem 1rem", fontSize: "0.85rem", color: "var(--text-primary)", verticalAlign: "middle" as const };

  return (
    <AdminShell>
      {/* Header */}
      <div style={{ marginBottom: "2.5rem" }}>
        <h1 style={{ fontFamily: "var(--font-serif)", fontSize: "1.9rem", fontWeight: 400, color: "var(--text-primary)", marginBottom: "0.3rem" }}>
          Overview
        </h1>
        <p style={{ fontSize: "0.88rem", color: "var(--text-secondary)", fontWeight: 300 }}>
          Your pipeline at a glance — {new Date().toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
        </p>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "6rem", color: "var(--text-light)" }}>Loading dashboard…</div>
      ) : !data ? (
        <div style={{ textAlign: "center", padding: "6rem", color: "var(--text-light)" }}>Failed to load dashboard data.</div>
      ) : (
        <>
          {/* Top KPI row */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginBottom: "2rem" }}>
            <StatCard label="Total Leads" value={data.leads.total} sub={`${data.leads.thisMonth} this month`} accent="var(--teal)" />
            <StatCard label="Unread" value={data.leads.unread} sub="Need attention" accent="#e67e22" />
            <StatCard label="This Week" value={data.leads.thisWeek} sub="New enquiries" accent="var(--teal-dark)" />
            <StatCard label="Conversion Rate" value={`${conversionRate}%`} sub={`${data.leads.won} won`} accent="#27ae60" />
            <StatCard label="Proposals" value={data.proposals.total} sub={`${data.proposals.byStatus.find(s => s.status === "accepted")?.count ?? 0} accepted`} accent="#8e44ad" />
            <StatCard label="Live Packages" value={data.content.packages} sub={`${data.content.publishedBlogs} blogs live`} accent="var(--teal-deep)" />
          </div>

          {/* Pipeline + Trend row */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "2rem" }}>

            {/* Lead pipeline */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.75rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)" }}>Lead Pipeline</h3>
                <Link href="/admin/enquiries" style={{ fontSize: "0.7rem", color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>View All →</Link>
              </div>
              {["new", "contacted", "qualified", "proposal_sent", "won", "lost"].map(status => {
                const item = data.leads.byStatus.find(s => s.status === status);
                const count = item?.count ?? 0;
                const pct = data.leads.total > 0 ? (count / data.leads.total) * 100 : 0;
                const colors = STATUS_COLORS[status] || { bg: "#f0f0f0", color: "#555" };
                return (
                  <div key={status} style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.9rem" }}>
                    <div style={{ width: 90, fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "capitalize", color: colors.color, fontWeight: 500, flexShrink: 0 }}>
                      {status.replace("_", " ")}
                    </div>
                    <div style={{ flex: 1, height: 8, background: "var(--bg-secondary)", borderRadius: 4, overflow: "hidden" }}>
                      <div style={{ height: "100%", width: `${pct}%`, background: colors.color, borderRadius: 4, transition: "width 0.6s ease-out" }} />
                    </div>
                    <div style={{ width: 28, textAlign: "right", fontSize: "0.82rem", color: "var(--text-secondary)", fontWeight: 500, flexShrink: 0 }}>{count}</div>
                  </div>
                );
              })}
            </div>

            {/* 6-month trend */}
            <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px", padding: "1.75rem" }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)" }}>Lead Trend (6 months)</h3>
              </div>
              {data.trend.length === 0 ? (
                <div style={{ textAlign: "center", padding: "3rem", color: "var(--text-light)", fontSize: "0.88rem" }}>No data yet</div>
              ) : (
                <div style={{ display: "flex", alignItems: "flex-end", gap: "0.5rem", height: 140 }}>
                  {data.trend.map(t => {
                    const barH = Math.max(8, Math.round((t.count / maxTrend) * 120));
                    const [year, month] = t.month.split("-");
                    const label = new Date(Number(year), Number(month) - 1).toLocaleString("en-US", { month: "short" });
                    return (
                      <div key={t.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
                        <div style={{ fontSize: "0.72rem", color: "var(--text-secondary)", fontWeight: 500 }}>{t.count}</div>
                        <div style={{ width: "100%", height: barH, background: "var(--teal)", borderRadius: "2px 2px 0 0", opacity: 0.85 }} />
                        <div style={{ fontSize: "0.6rem", color: "var(--text-light)", letterSpacing: "0.05em" }}>{label}</div>
                      </div>
                    );
                  })}
                </div>
              )}

              {/* Proposal status */}
              <div style={{ marginTop: "2rem", paddingTop: "1.5rem", borderTop: "1px solid var(--border)" }}>
                <div className="eyebrow" style={{ fontSize: "0.55rem", color: "var(--text-light)", marginBottom: "0.75rem" }}>Proposals by Status</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.5rem" }}>
                  {["draft", "sent", "accepted", "rejected"].map(s => {
                    const cnt = data.proposals.byStatus.find(p => p.status === s)?.count ?? 0;
                    const pColors: Record<string, string> = { draft: "#888", sent: "#2980b9", accepted: "#27ae60", rejected: "#c0392b" };
                    return (
                      <div key={s} style={{ padding: "4px 12px", background: `${pColors[s]}18`, borderRadius: "2px", display: "flex", alignItems: "center", gap: 6 }}>
                        <span style={{ width: 6, height: 6, background: pColors[s], borderRadius: "50%", flexShrink: 0 }} />
                        <span style={{ fontSize: "0.72rem", color: pColors[s], fontWeight: 500, textTransform: "capitalize" }}>{s}</span>
                        <span style={{ fontSize: "0.72rem", color: "var(--text-light)" }}>{cnt}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Recent leads table */}
          <div style={{ background: "#fff", border: "1px solid var(--border)", borderRadius: "2px" }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid var(--border)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
              <h3 style={{ fontFamily: "var(--font-serif)", fontSize: "1.1rem", fontWeight: 400, color: "var(--text-primary)" }}>Recent Leads</h3>
              <Link href="/admin/enquiries" style={{ fontSize: "0.7rem", color: "var(--teal)", letterSpacing: "0.1em", textTransform: "uppercase" }}>View All →</Link>
            </div>
            {data.recentLeads.length === 0 ? (
              <div style={{ padding: "4rem", textAlign: "center", color: "var(--text-light)" }}>No leads yet.</div>
            ) : (
              <div style={{ overflowX: "auto" }}>
                <table style={{ width: "100%", borderCollapse: "collapse", minWidth: 640 }}>
                  <thead>
                    <tr style={{ background: "var(--bg-secondary)" }}>
                      <th style={thStyle}>Name</th>
                      <th style={thStyle}>Package</th>
                      <th style={thStyle}>Priority</th>
                      <th style={thStyle}>Status</th>
                      <th style={thStyle}>Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recentLeads.map((lead, i) => {
                      const sc = STATUS_COLORS[lead.status] || { bg: "#f0f0f0", color: "#555" };
                      const pc = PRIORITY_COLORS[lead.priority] || "#888";
                      return (
                        <tr key={lead.id} style={{ borderBottom: i < data.recentLeads.length - 1 ? "1px solid var(--border)" : "none" }}>
                          <td style={tdStyle}>
                            <div style={{ fontWeight: 500 }}>{lead.full_name}</div>
                            <div style={{ fontSize: "0.75rem", color: "var(--text-light)" }}>{lead.email}</div>
                          </td>
                          <td style={{ ...tdStyle, color: "var(--text-secondary)" }}>{lead.package_name || "—"}</td>
                          <td style={tdStyle}>
                            <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: "0.7rem", color: pc, fontWeight: 500, textTransform: "capitalize" }}>
                              <span style={{ width: 6, height: 6, background: pc, borderRadius: "50%" }} />
                              {lead.priority || "medium"}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{ padding: "3px 10px", background: sc.bg, color: sc.color, fontSize: "0.62rem", letterSpacing: "0.12em", textTransform: "capitalize", fontWeight: 600, borderRadius: "2px" }}>
                              {lead.status.replace("_", " ")}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, color: "var(--text-light)", fontSize: "0.78rem", whiteSpace: "nowrap" }}>
                            {new Date(lead.created_at).toLocaleDateString("en-GB", { day: "2-digit", month: "short" })}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Quick links */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(180px,1fr))", gap: "1rem", marginTop: "2rem" }}>
            {[
              { href: "/admin/enquiries", label: "Manage Leads", icon: "✉" },
              { href: "/admin/proposals", label: "Proposals", icon: "📄" },
              { href: "/admin", label: "Packages", icon: "⬡" },
              { href: "/admin/blogs", label: "Blog Posts", icon: "✎" },
              { href: "/admin/testimonials", label: "Testimonials", icon: "★" },
            ].map(item => (
              <Link key={item.href} href={item.href} style={{
                display: "flex", alignItems: "center", gap: "0.75rem",
                padding: "1rem 1.5rem", background: "#fff",
                border: "1px solid var(--border)", borderRadius: "2px",
                textDecoration: "none", color: "var(--text-primary)",
                fontSize: "0.82rem", fontWeight: 500, transition: "border-color 0.2s, color 0.2s",
              }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--teal)"; (e.currentTarget as HTMLElement).style.color = "var(--teal-dark)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = "var(--border)"; (e.currentTarget as HTMLElement).style.color = "var(--text-primary)"; }}
              >
                <span style={{ fontSize: "1.1rem" }}>{item.icon}</span>
                {item.label}
              </Link>
            ))}
          </div>
        </>
      )}
    </AdminShell>
  );
}
