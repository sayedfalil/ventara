"use client";

import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const navItems = [
  { href: "/admin", label: "Packages", icon: "⬡", exact: true },
  { href: "/admin/blogs", label: "Blog", icon: "✎", exact: false },
  { href: "/admin/enquiries", label: "Enquiries", icon: "✉", exact: false },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [username, setUsername] = useState("Admin");
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    fetch("/api/auth/me").then(r => r.json()).then(d => {
      if (d.username) setUsername(d.username);
    }).catch(() => {});
  }, []);

  async function logout() {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
  }

  const sidebarW = collapsed ? 64 : 240;

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f5f7", fontFamily: "var(--font-sans)" }}>
      {/* ── Sidebar ─────────────────────────────────────── */}
      <aside
        style={{
          width: sidebarW,
          background: "var(--teal-deep)",
          position: "fixed",
          top: 0, bottom: 0, left: 0,
          display: "flex",
          flexDirection: "column",
          zIndex: 40,
          transition: "width 0.3s",
          overflowX: "hidden",
        }}
      >
        {/* Logo */}
        <div style={{ padding: collapsed ? "1.5rem 1rem" : "1.5rem", borderBottom: "1px solid rgba(255,255,255,0.08)", display: "flex", alignItems: "center", justifyContent: "center", minHeight: 72, background: "#fff" }}>
          <Image src="/logo.png" alt="Vantara" width={collapsed ? 50 : 200} height={collapsed ? 25 : 55} unoptimized style={{ flexShrink: 0, objectFit: "contain" }} className="flying-logo" />
        </div>

        {/* Nav links */}
        <nav style={{ flex: 1, padding: "1rem 0" }}>
          {navItems.map((item) => {
            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                title={collapsed ? item.label : undefined}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  padding: collapsed ? "0.9rem 1.1rem" : "0.9rem 1.5rem",
                  color: isActive ? "#fff" : "rgba(255,255,255,0.5)",
                  background: isActive ? "rgba(255,255,255,0.1)" : "transparent",
                  borderLeft: isActive ? "3px solid var(--teal-accent)" : "3px solid transparent",
                  fontSize: "0.78rem",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  fontWeight: isActive ? 500 : 400,
                  transition: "all 0.2s",
                  textDecoration: "none",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                }}
              >
                <span style={{ fontSize: "1rem", flexShrink: 0 }}>{item.icon}</span>
                {!collapsed && item.label}
              </Link>
            );
          })}
        </nav>

        {/* Collapse toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          style={{
            background: "transparent",
            border: "none",
            color: "rgba(255,255,255,0.4)",
            padding: "0.75rem 1.2rem",
            cursor: "pointer",
            textAlign: collapsed ? "center" : "right",
            fontSize: "0.75rem",
            borderTop: "1px solid rgba(255,255,255,0.08)",
          }}
          title={collapsed ? "Expand" : "Collapse"}
        >
          {collapsed ? "→" : "←"}
        </button>

        {/* User + Logout */}
        <div style={{ padding: collapsed ? "1rem 0.75rem" : "1.25rem 1.5rem", borderTop: "1px solid rgba(255,255,255,0.08)" }}>
          {!collapsed && (
            <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "0.7rem", marginBottom: "0.75rem" }}>
              Signed in as <strong style={{ color: "#fff" }}>{username}</strong>
            </div>
          )}
          <button
            onClick={logout}
            title="Logout"
            style={{
              width: "100%",
              padding: "8px",
              background: "rgba(255,255,255,0.07)",
              border: "1px solid rgba(255,255,255,0.12)",
              borderRadius: "2px",
              color: "rgba(255,255,255,0.6)",
              fontSize: "0.65rem",
              letterSpacing: "0.15em",
              textTransform: "uppercase",
              cursor: "pointer",
            }}
          >
            {collapsed ? "→" : "Logout"}
          </button>
        </div>
      </aside>

      {/* ── Main area ────────────────────────────────────── */}
      <div style={{ marginLeft: sidebarW, flex: 1, minHeight: "100vh", transition: "margin-left 0.3s", display: "flex", flexDirection: "column" }}>
        {/* Top bar */}
        <header style={{
          height: 56,
          background: "#fff",
          borderBottom: "1px solid var(--border)",
          padding: "0 2.5rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          position: "sticky",
          top: 0,
          zIndex: 30,
          boxShadow: "0 1px 6px rgba(0,0,0,0.04)",
        }}>
          <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
            {navItems.map(item => {
              const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
              return isActive ? (
                <span key={item.href} style={{ fontSize: "0.75rem", fontWeight: 500, color: "var(--teal-dark)", letterSpacing: "0.1em", textTransform: "uppercase" }}>
                  {item.label}
                </span>
              ) : null;
            })}
          </div>
          <a href="/" target="_blank" style={{
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "var(--text-secondary)",
            textDecoration: "none",
            transition: "color 0.2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--teal-dark)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--text-secondary)")}
          >
            View Site ↗
          </a>
        </header>

        {/* Page content */}
        <main style={{ flex: 1, padding: "2.5rem", maxWidth: 1400, width: "100%" }}>
          {children}
        </main>
      </div>
    </div>
  );
}
