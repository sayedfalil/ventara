"use client";

import { motion } from "framer-motion";
import { useState, useEffect, FormEvent } from "react";

type Package = { id: number; title: string };

const COUNTRY_CODES = ["+1", "+44", "+91", "+61", "+971", "+65", "+81", "+49", "+33", "+86"];

export default function EnquirySection() {
  const [packages, setPackages] = useState<Package[]>([]);
  const [form, setForm] = useState({
    full_name: "", email: "", phone_code: "+91", phone: "",
    package_name: "", travelers: "2", travel_date: "", message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("/api/packages").then(r => r.json()).then(d => setPackages(Array.isArray(d) ? d : [])).catch(() => {});
  }, []);

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }));

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true); setError("");

    const payload = {
      full_name: form.full_name,
      email: form.email,
      phone: `${form.phone_code} ${form.phone}`,
      package_name: form.package_name,
      travelers: Number(form.travelers),
      travel_date: form.travel_date,
      message: form.message,
      source_url: typeof window !== "undefined" ? window.location.href : "",
    };

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ full_name: "", email: "", phone_code: "+91", phone: "", package_name: "", travelers: "2", travel_date: "", message: "" });
      } else {
        const d = await res.json();
        setError(d.error || "Something went wrong.");
      }
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const inpStyle = {
    width: "100%",
    padding: "14px 18px",
    background: "rgba(255,255,255,0.07)",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "2px",
    color: "#fff",
    fontSize: "0.95rem",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "border-color 0.3s",
    boxSizing: "border-box" as const,
  };
  const lblStyle = {
    display: "block",
    fontSize: "0.62rem",
    fontWeight: 500 as const,
    letterSpacing: "0.2em",
    textTransform: "uppercase" as const,
    color: "rgba(255,255,255,0.55)",
    marginBottom: "0.5rem",
  };

  return (
    <section id="enquire" style={{ background: "var(--teal-deep)", padding: "10rem 0", position: "relative", overflow: "hidden" }}>
      {/* Background V watermark */}
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "flex-end", opacity: 0.04, pointerEvents: "none", overflow: "hidden" }}>
        <svg viewBox="0 0 400 400" style={{ width: "60vw", maxWidth: 700 }}>
          <polygon points="20,20 115,20 200,300 120,318" fill="white" />
          <polygon points="125,20 380,20 318,318 200,300" fill="white" />
        </svg>
      </div>

      <div className="container-narrow" style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          style={{ textAlign: "center", marginBottom: "5rem" }}
        >
          <p className="eyebrow" style={{ color: "rgba(255,255,255,0.6)", marginBottom: "1.5rem" }}>Begin Your Journey</p>
          <h2 className="heading-serif" style={{ fontSize: "clamp(2.5rem, 5vw, 4.5rem)", color: "#fff", lineHeight: 1.1, marginBottom: "1.5rem" }}>
            Request a Private <br />
            <span style={{ fontStyle: "italic", color: "var(--teal-accent)" }}>Consultation.</span>
          </h2>
          <p style={{ fontSize: "1rem", color: "rgba(255,255,255,0.6)", fontWeight: 300, lineHeight: 1.8, maxWidth: 540, margin: "0 auto" }}>
            Share your vision and our concierge team will craft a bespoke luxury itinerary tailored exclusively for you.
          </p>
        </motion.div>

        {success ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            style={{ textAlign: "center", padding: "5rem 2rem", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.12)", borderRadius: "4px" }}
          >
            <div style={{ fontSize: "3rem", marginBottom: "1.5rem" }}>✦</div>
            <h3 className="heading-serif" style={{ fontSize: "2rem", color: "#fff", marginBottom: "1rem" }}>Enquiry Received</h3>
            <p style={{ color: "rgba(255,255,255,0.65)", fontWeight: 300, lineHeight: 1.8, maxWidth: 420, margin: "0 auto 2rem" }}>
              Thank you for reaching out. Our concierge team will contact you within 24 hours to discuss your bespoke journey.
            </p>
            <button onClick={() => setSuccess(false)} className="btn-outline" style={{ borderColor: "rgba(255,255,255,0.35)", color: "#fff" }}>
              Submit Another
            </button>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            onSubmit={handleSubmit}
            style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "4px", padding: "3rem" }}
          >
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
              {/* Full name */}
              <div>
                <label style={lblStyle}>Full Name *</label>
                <input value={form.full_name} onChange={e => set("full_name", e.target.value)} required
                  placeholder="Your full name" style={inpStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(78,205,196,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")} />
              </div>

              {/* Email */}
              <div>
                <label style={lblStyle}>Email Address *</label>
                <input type="email" value={form.email} onChange={e => set("email", e.target.value)} required
                  placeholder="your@email.com" style={inpStyle}
                  onFocus={e => (e.target.style.borderColor = "rgba(78,205,196,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")} />
              </div>

              {/* Phone */}
              <div>
                <label style={lblStyle}>Phone Number</label>
                <div style={{ display: "flex", gap: "0.5rem" }}>
                  <select value={form.phone_code} onChange={e => set("phone_code", e.target.value)}
                    style={{ ...inpStyle, width: 90, padding: "14px 8px", flexShrink: 0, cursor: "pointer" }}>
                    {COUNTRY_CODES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="tel" value={form.phone} onChange={e => set("phone", e.target.value)}
                    placeholder="98765 43210" style={inpStyle}
                    onFocus={e => (e.target.style.borderColor = "rgba(78,205,196,0.6)")}
                    onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")} />
                </div>
              </div>

              {/* Package */}
              <div>
                <label style={lblStyle}>Package Interested In</label>
                <select value={form.package_name} onChange={e => set("package_name", e.target.value)}
                  style={{ ...inpStyle, cursor: "pointer" }}>
                  <option value="">Select a package (optional)</option>
                  {packages.map(p => <option key={p.id} value={p.title}>{p.title}</option>)}
                  <option value="Custom Journey">Custom / Bespoke Journey</option>
                </select>
              </div>

              {/* Travelers */}
              <div>
                <label style={lblStyle}>Number of Travelers</label>
                <select value={form.travelers} onChange={e => set("travelers", e.target.value)}
                  style={{ ...inpStyle, cursor: "pointer" }}>
                  {["1", "2", "3", "4", "5", "6", "7-10", "10+"].map(n => <option key={n} value={n}>{n} {Number(n) === 1 ? "person" : "people"}</option>)}
                </select>
              </div>

              {/* Travel date */}
              <div>
                <label style={lblStyle}>Preferred Travel Date</label>
                <input type="date" value={form.travel_date} onChange={e => set("travel_date", e.target.value)}
                  style={{ ...inpStyle, colorScheme: "dark" }}
                  onFocus={e => (e.target.style.borderColor = "rgba(78,205,196,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")} />
              </div>

              {/* Message */}
              <div style={{ gridColumn: "1 / -1" }}>
                <label style={lblStyle}>Message / Special Requirements</label>
                <textarea value={form.message} onChange={e => set("message", e.target.value)} rows={5}
                  placeholder="Tell us about your vision — destinations, preferences, celebrations, or any special requirements…"
                  style={{ ...inpStyle, resize: "vertical", lineHeight: 1.7 }}
                  onFocus={e => (e.target.style.borderColor = "rgba(78,205,196,0.6)")}
                  onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")} />
              </div>
            </div>

            {error && (
              <div style={{ marginTop: "1.5rem", padding: "12px 16px", background: "rgba(220,53,69,0.15)", border: "1px solid rgba(220,53,69,0.3)", borderRadius: "2px", color: "#f5a0a0", fontSize: "0.88rem" }}>
                {error}
              </div>
            )}

            <div style={{ display: "flex", justifyContent: "center", marginTop: "2.5rem" }}>
              <button type="submit" disabled={submitting}
                className="btn-primary"
                style={{ padding: "16px 48px", background: "rgba(255,255,255,0.12)", backdropFilter: "blur(10px)", border: "1px solid rgba(255,255,255,0.3)", color: "#fff", cursor: submitting ? "not-allowed" : "pointer", opacity: submitting ? 0.7 : 1, fontSize: "0.78rem", letterSpacing: "0.2em" }}>
                {submitting ? "Sending…" : "Send Enquiry"}
              </button>
            </div>

            <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.78rem", color: "rgba(255,255,255,0.35)", letterSpacing: "0.05em" }}>
              We respond within 24 hours · Complete privacy guaranteed
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
