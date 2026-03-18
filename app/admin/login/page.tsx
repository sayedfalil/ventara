"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (res.ok) {
        router.push("/admin");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Invalid credentials");
      }
    } catch {
      setError("Connection error. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #0d3d47 0%, #1c5f6b 50%, #1a8a9b 100%)",
        padding: "2rem",
      }}
    >
      {/* Watermark V */}
      <div
        style={{
          position: "fixed",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.04,
          pointerEvents: "none",
        }}
      >
        <svg viewBox="0 0 400 400" style={{ width: "90vw", maxWidth: 800 }}>
          <polygon points="20,20 115,20 200,300 120,318" fill="white" />
          <polygon points="125,20 380,20 318,318 200,300" fill="white" />
        </svg>
      </div>

      <div
        style={{
          background: "#fff",
          borderRadius: "4px",
          padding: "4rem",
          width: "100%",
          maxWidth: "460px",
          boxShadow: "0 40px 120px rgba(0,0,0,0.3)",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Logo */}
        <div style={{ textAlign: "center", marginBottom: "3rem" }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "1rem" }}>
            <Image
              src="/vantara-logo.svg"
              alt="Vantara Global"
              width={120}
              height={140}
              unoptimized
            />
          </div>
          <p
            className="eyebrow"
            style={{ color: "var(--text-light)", marginTop: "0.5rem" }}
          >
            Administrator Access
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Username */}
          <div style={{ marginBottom: "1.5rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: "0.6rem",
              }}
            >
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              autoComplete="username"
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.3s",
                background: "var(--bg-secondary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {/* Password */}
          <div style={{ marginBottom: "2rem" }}>
            <label
              style={{
                display: "block",
                fontSize: "0.7rem",
                fontWeight: 500,
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--text-secondary)",
                marginBottom: "0.6rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                width: "100%",
                padding: "14px 18px",
                border: "1px solid var(--border)",
                borderRadius: "2px",
                fontSize: "1rem",
                fontFamily: "var(--font-sans)",
                color: "var(--text-primary)",
                outline: "none",
                transition: "border-color 0.3s",
                background: "var(--bg-secondary)",
              }}
              onFocus={(e) => (e.target.style.borderColor = "var(--teal)")}
              onBlur={(e) => (e.target.style.borderColor = "var(--border)")}
            />
          </div>

          {error && (
            <div
              style={{
                padding: "12px 18px",
                background: "rgba(220,53,69,0.08)",
                border: "1px solid rgba(220,53,69,0.2)",
                borderRadius: "2px",
                color: "#c0392b",
                fontSize: "0.9rem",
                marginBottom: "1.5rem",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="btn-primary"
            style={{
              width: "100%",
              opacity: loading ? 0.7 : 1,
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "2rem" }}>
          <a
            href="/"
            style={{
              fontSize: "0.75rem",
              color: "var(--text-light)",
              letterSpacing: "0.1em",
              transition: "color 0.3s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--teal-dark)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-light)")}
          >
            ← Back to Website
          </a>
        </div>
      </div>
    </div>
  );
}
