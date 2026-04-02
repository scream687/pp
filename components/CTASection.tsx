"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { BRAND } from "@/lib/constants";

interface FormState {
  name: string;
  phone: string;
  city: string;
  interest: string;
  message: string;
}

const INTEREST_OPTIONS = [
  "Residential Villa",
  "Luxury Apartment",
  "Residential Plot",
  "NRI Investment",
  "Spiritual Farmhouse",
  "Custom Requirement",
];

export default function CTASection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  const [form, setForm] = useState<FormState>({
    name: "",
    phone: "",
    city: "",
    interest: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    // Simulated submission — replace with actual API call
    await new Promise((r) => setTimeout(r, 1200));
    setSubmitted(true);
    setSubmitting(false);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "0.8125rem 1rem",
    background: "rgba(15, 22, 40, 0.8)",
    border: "1px solid var(--color-border)",
    borderRadius: "var(--radius-md)",
    color: "var(--color-lotus)",
    fontFamily: "var(--font-body)",
    fontSize: "0.9375rem",
    outline: "none",
    transition: "border-color 0.2s ease",
  };

  const labelStyle: React.CSSProperties = {
    display: "block",
    fontSize: "0.8125rem",
    color: "var(--color-text-muted)",
    fontFamily: "var(--font-body)",
    letterSpacing: "0.06em",
    textTransform: "uppercase",
    marginBottom: "0.5rem",
  };

  return (
    <section
      id="contact"
      ref={ref}
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: "var(--color-bg-primary)" }}
      aria-label="Contact and schedule a visit"
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(ellipse 60% 40% at 50% 100%, rgba(201,168,76,0.06) 0%, transparent 70%)",
        }}
      />

      <div
        className="px-6 md:px-12 lg:px-16 relative"
        style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-start">
          {/* Left — Value prop */}
          <div>
            <motion.span
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : { opacity: 0 }}
              transition={{ duration: 0.7 }}
              className="font-body text-caption tracking-[0.14em] uppercase block mb-5"
              style={{ color: "var(--color-saffron)" }}
            >
              Begin Your Search
            </motion.span>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="font-display mb-6"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.5rem)",
                lineHeight: 1.08,
                letterSpacing: "-0.02em",
                color: "var(--color-lotus)",
              }}
            >
              Your Sacred Home
              <br />
              <span className="text-gradient-sacred">Is Already Waiting</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="font-body mb-10"
              style={{
                fontSize: "1.0625rem",
                lineHeight: 1.65,
                color: "var(--color-text-secondary)",
                maxWidth: "40ch",
              }}
            >
              Schedule a free consultation with our Vrindavan specialists.
              No obligation. Pure guidance. We will take care of every detail
              from search to registration.
            </motion.p>

            {/* Direct contact methods */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
              transition={{ duration: 0.8, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-4"
            >
              {/* WhatsApp */}
              <a
                href={`https://wa.me/${BRAND.whatsapp}?text=Jai%20Shri%20Krishna!%20I%27d%20like%20to%20enquire%20about%20properties%20in%20Vrindavan.`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300 group"
                style={{
                  background: "rgba(37, 211, 102, 0.06)",
                  border: "1px solid rgba(37, 211, 102, 0.15)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ background: "rgba(37, 211, 102, 0.15)" }}
                  aria-hidden="true"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="#25D366" aria-hidden="true">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                  </svg>
                </div>
                <div>
                  <div
                    className="font-body font-medium"
                    style={{ fontSize: "0.9375rem", color: "#25D366" }}
                  >
                    WhatsApp Us
                  </div>
                  <div
                    className="font-body"
                    style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}
                  >
                    {BRAND.phone} · Instant response
                  </div>
                </div>
                <svg
                  className="ml-auto"
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="rgba(37,211,102,0.5)"
                  strokeWidth="1.5"
                  aria-hidden="true"
                >
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>

              {/* Phone */}
              <a
                href={`tel:${BRAND.phone}`}
                className="flex items-center gap-4 p-4 rounded-xl transition-all duration-300"
                style={{
                  background: "rgba(201,168,76,0.05)",
                  border: "1px solid var(--color-border)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0"
                  style={{ background: "rgba(201,168,76,0.1)" }}
                  aria-hidden="true"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.95 9.8 19.79 19.79 0 01.88 1.18 2 2 0 012.88 0h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L7.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 14.92z" />
                  </svg>
                </div>
                <div>
                  <div
                    className="font-body font-medium"
                    style={{ fontSize: "0.9375rem", color: "var(--color-gold-light)" }}
                  >
                    Call Us Directly
                  </div>
                  <div
                    className="font-body"
                    style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)" }}
                  >
                    {BRAND.phone} · 9am–7pm IST
                  </div>
                </div>
              </a>

              {/* Address */}
              <div
                className="flex items-start gap-4 p-4 rounded-xl"
                style={{
                  background: "rgba(201,168,76,0.03)",
                  border: "1px solid var(--color-divider)",
                }}
              >
                <div
                  className="w-10 h-10 flex items-center justify-center rounded-lg flex-shrink-0 mt-0.5"
                  style={{ background: "rgba(201,168,76,0.08)" }}
                  aria-hidden="true"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <div>
                  <div
                    className="font-body font-medium mb-0.5"
                    style={{ fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}
                  >
                    Visit Our Office
                  </div>
                  <div
                    className="font-body"
                    style={{ fontSize: "0.8125rem", color: "var(--color-text-muted)", lineHeight: 1.5 }}
                  >
                    {BRAND.address}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Form */}
          <motion.div
            initial={{ opacity: 0, y: 32 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              className="rounded-2xl p-8 md:p-10"
              style={{
                background: "var(--color-bg-surface)",
                border: "1px solid var(--color-border)",
              }}
            >
              {submitted ? (
                <div className="text-center py-12">
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ background: "rgba(201,168,76,0.12)", border: "1px solid var(--color-border-bright)" }}
                  >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                      <polyline points="22,4 12,14.01 9,11.01" />
                    </svg>
                  </div>
                  <h3
                    className="font-display mb-3"
                    style={{
                      fontSize: "1.5rem",
                      color: "var(--color-lotus)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Jai Shri Krishna!
                  </h3>
                  <p
                    className="font-body"
                    style={{
                      fontSize: "1rem",
                      color: "var(--color-text-secondary)",
                      lineHeight: 1.6,
                      maxWidth: "28ch",
                      margin: "0 auto",
                    }}
                  >
                    Our specialist will call you within 24 hours. Your sacred home awaits.
                  </p>
                </div>
              ) : (
                <>
                  <h3
                    className="font-display mb-2"
                    style={{
                      fontSize: "1.375rem",
                      color: "var(--color-lotus)",
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Schedule a Free Consultation
                  </h3>
                  <p
                    className="font-body mb-8"
                    style={{
                      fontSize: "0.875rem",
                      color: "var(--color-text-muted)",
                    }}
                  >
                    No commitment. We listen first.
                  </p>

                  <form onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="name" style={labelStyle}>
                          Full Name *
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Your name"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="phone" style={labelStyle}>
                          Phone / WhatsApp *
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          value={form.phone}
                          onChange={handleChange}
                          placeholder="+91 XXXXX XXXXX"
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                          }
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-5">
                      <div>
                        <label htmlFor="city" style={labelStyle}>
                          Your City
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          autoComplete="address-level2"
                          value={form.city}
                          onChange={handleChange}
                          placeholder="Mumbai, Delhi, Chicago..."
                          style={inputStyle}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                          }
                        />
                      </div>
                      <div>
                        <label htmlFor="interest" style={labelStyle}>
                          I&apos;m Interested In
                        </label>
                        <select
                          id="interest"
                          name="interest"
                          value={form.interest}
                          onChange={handleChange}
                          style={{ ...inputStyle, cursor: "pointer" }}
                          onFocus={(e) =>
                            (e.target.style.borderColor = "var(--color-gold)")
                          }
                          onBlur={(e) =>
                            (e.target.style.borderColor = "var(--color-border)")
                          }
                        >
                          <option value="" style={{ background: "#0F1628" }}>
                            Select type
                          </option>
                          {INTEREST_OPTIONS.map((opt) => (
                            <option
                              key={opt}
                              value={opt}
                              style={{ background: "#0F1628" }}
                            >
                              {opt}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="mb-7">
                      <label htmlFor="message" style={labelStyle}>
                        Message (Optional)
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={3}
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Tell us about your vision, budget, or specific requirements..."
                        style={{
                          ...inputStyle,
                          resize: "vertical",
                          minHeight: "90px",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--color-gold)")
                        }
                        onBlur={(e) =>
                          (e.target.style.borderColor = "var(--color-border)")
                        }
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={submitting}
                      className="btn-primary w-full justify-center"
                      style={{ opacity: submitting ? 0.7 : 1 }}
                    >
                      <span>
                        {submitting ? "Sending..." : "Request Consultation"}
                      </span>
                      {!submitting && (
                        <svg
                          width="16"
                          height="16"
                          viewBox="0 0 16 16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.75"
                          aria-hidden="true"
                        >
                          <path
                            d="M3 8h10M9 4l4 4-4 4"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}
                    </button>

                    <p
                      className="font-body text-center mt-4"
                      style={{ fontSize: "0.75rem", color: "var(--color-text-muted)" }}
                    >
                      By submitting, you agree to be contacted by our team.
                      We respect your privacy.
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
