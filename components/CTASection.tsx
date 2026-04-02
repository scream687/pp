"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/lib/constants";

interface FormState {
  name: string; phone: string; city: string; interest: string; message: string;
}

const INTEREST_OPTIONS = [
  "Residential Villa", "Luxury Apartment", "Residential Plot",
  "NRI Investment", "Spiritual Farmhouse", "Custom Requirement",
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [form, setForm] = useState<FormState>({ name: "", phone: "", city: "", interest: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    setSubmitted(true);
    setSubmitting(false);
  };

  return (
    <section
      id="contact"
      ref={ref}
      aria-label="Schedule a consultation"
      style={{ background: "var(--color-bg-secondary)", padding: "96px 0 112px" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto", padding: "0 24px" }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Left — value prop */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6 }}
              className="section-label"
            >
              Begin Your Search
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 22 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontWeight: 700,
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                letterSpacing: "-0.025em",
                lineHeight: 1.06,
                color: "var(--color-text-primary)",
                marginBottom: "20px",
              }}
            >
              Your Sacred Home
              <br />
              <span className="text-gradient-gold">Is Already Waiting</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--color-text-secondary)",
                maxWidth: "40ch",
                marginBottom: "36px",
              }}
            >
              Schedule a free consultation with our Vrindavan specialists.
              No obligation. Pure guidance. We handle every detail from
              search to registration.
            </motion.p>

            {/* Contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.24, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-3"
            >
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Jai%20Shri%20Krishna!%20I%27d%20like%20to%20enquire%20about%20properties%20in%20Vrindavan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-apple-md transition-all duration-200"
                style={{
                  background: "rgba(37,211,102,0.05)",
                  border: "1px solid rgba(37,211,102,0.15)",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.09)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = "rgba(37,211,102,0.05)")}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "rgba(37,211,102,0.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-hidden="true">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9375rem", color: "#1A8A3A" }}>WhatsApp Us</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{BRAND.phone} · Instant response</div>
                </div>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-4 p-4 rounded-apple-md transition-all duration-200"
                style={{ background: "var(--color-bg-primary)", border: "1px solid var(--color-border-subtle)", textDecoration: "none" }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-md)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.boxShadow = "none")}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--color-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }} aria-hidden="true">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.8 19.79 19.79 0 01.88 1.18 2 2 0 012.88 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9375rem", color: "var(--color-text-primary)" }}>Call Directly</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>{BRAND.phone} · 9am–7pm IST</div>
                </div>
              </a>

              {/* Address */}
              <div
                className="flex items-start gap-4 p-4 rounded-apple-md"
                style={{ background: "var(--color-bg-primary)", border: "1px solid var(--color-border-subtle)" }}
              >
                <div style={{ width: "36px", height: "36px", borderRadius: "8px", background: "var(--color-bg-secondary)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: "1px" }} aria-hidden="true">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="var(--color-text-secondary)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"/><circle cx="12" cy="10" r="3"/>
                  </svg>
                </div>
                <div>
                  <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9375rem", color: "var(--color-text-primary)", marginBottom: "2px" }}>Visit Our Office</div>
                  <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)", lineHeight: 1.5 }}>{BRAND.address}</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              style={{
                background: "var(--color-bg-primary)",
                borderRadius: "var(--radius-xl)",
                padding: "36px",
                boxShadow: "var(--shadow-lg)",
              }}
            >
              {submitted ? (
                <div className="text-center py-10">
                  <div style={{ width: "56px", height: "56px", borderRadius: "50%", background: "rgba(52,199,89,0.1)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#34C759" strokeWidth="2.25" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14"/><polyline points="22,4 12,14.01 9,11.01"/>
                    </svg>
                  </div>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 700, fontSize: "1.375rem", color: "var(--color-text-primary)", letterSpacing: "-0.015em", marginBottom: "8px" }}>
                    Jai Shri Krishna!
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text-secondary)", lineHeight: 1.6, maxWidth: "26ch", margin: "0 auto" }}>
                    Our specialist will call you within 24 hours. Your sacred home awaits.
                  </p>
                </div>
              ) : (
                <>
                  <h3 style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1.25rem", color: "var(--color-text-primary)", letterSpacing: "-0.015em", marginBottom: "4px" }}>
                    Free Consultation
                  </h3>
                  <p style={{ fontFamily: "var(--font-body)", fontSize: "0.875rem", color: "var(--color-text-secondary)", marginBottom: "24px" }}>
                    No commitment. We listen first.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3">
                      {[
                        { id: "name", label: "Full Name *", type: "text", placeholder: "Your name", autoComplete: "name" },
                        { id: "phone", label: "Phone / WhatsApp *", type: "tel", placeholder: "+91 XXXXX XXXXX", autoComplete: "tel" },
                        { id: "city", label: "Your City", type: "text", placeholder: "Mumbai, Delhi, Chicago...", autoComplete: "address-level2" },
                      ].map(({ id, label, type, placeholder, autoComplete }) => (
                        <div key={id} className={id === "name" ? "" : ""}>
                          <label htmlFor={id} style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                            {label}
                          </label>
                          <input
                            id={id}
                            name={id}
                            type={type}
                            required={label.includes("*")}
                            autoComplete={autoComplete}
                            value={form[id as keyof FormState]}
                            onChange={handleChange}
                            placeholder={placeholder}
                            className="input-apple"
                          />
                        </div>
                      ))}
                      <div>
                        <label htmlFor="interest" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                          Interested In
                        </label>
                        <select id="interest" name="interest" value={form.interest} onChange={handleChange} className="input-apple" style={{ cursor: "pointer" }}>
                          <option value="">Select type</option>
                          {INTEREST_OPTIONS.map((opt) => <option key={opt} value={opt}>{opt}</option>)}
                        </select>
                      </div>
                    </div>

                    <div className="mb-5">
                      <label htmlFor="message" style={{ display: "block", fontFamily: "var(--font-body)", fontSize: "0.75rem", fontWeight: 500, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--color-text-secondary)", marginBottom: "6px" }}>
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Your vision, budget, or specific requirements..."
                        className="input-apple"
                        style={{ resize: "vertical", minHeight: "80px" }}
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center"
                      style={{ opacity: submitting ? 0.7 : 1, borderRadius: "var(--radius-md)", padding: "0.875rem" }}
                    >
                      {submitting ? "Sending..." : "Request Free Consultation"}
                      {!submitting && (
                        <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M3 8h10M9 4l4 4-4 4"/>
                        </svg>
                      )}
                    </button>

                    <p style={{ fontFamily: "var(--font-body)", fontSize: "0.75rem", color: "var(--color-text-muted)", textAlign: "center", marginTop: "12px" }}>
                      By submitting you agree to be contacted. We respect your privacy.
                    </p>
                  </form>
                </>
              )}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
