"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { TESTIMONIALS } from "@/lib/constants";

export default function Testimonials() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });
  const [activeIndex, setActiveIndex] = useState(0);
  const active = TESTIMONIALS[activeIndex];

  return (
    <section
      id="testimonials"
      ref={ref}
      aria-label="Client testimonials"
      style={{ background: "var(--color-bg-primary)", padding: "96px 0 112px" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            Stories of Trust
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "clamp(1.875rem, 3.5vw, 2.75rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.1,
              color: "var(--color-text-primary)",
            }}
          >
            Families Who Found{" "}
            <span className="text-gradient-gold">Their Sacred Home</span>
          </motion.h2>
        </div>

        {/* Testimonial card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            style={{
              background: "var(--color-bg-secondary)",
              borderRadius: "var(--radius-2xl)",
              padding: "48px 40px 40px",
              position: "relative",
              marginBottom: "24px",
            }}
          >
            {/* Large quote */}
            <div
              style={{
                position: "absolute",
                top: "20px",
                left: "32px",
                fontFamily: "var(--font-display)",
                fontSize: "5rem",
                lineHeight: 0.8,
                color: "var(--color-text-primary)",
                opacity: 0.07,
                userSelect: "none",
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              >
                <blockquote
                  style={{
                    fontFamily: "var(--font-body)",
                    fontSize: "clamp(1.0625rem, 1.8vw, 1.375rem)",
                    lineHeight: 1.6,
                    color: "var(--color-text-primary)",
                    letterSpacing: "-0.01em",
                    fontWeight: 300,
                    marginBottom: "28px",
                    maxWidth: "64ch",
                  }}
                >
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                <div className="flex items-center gap-3">
                  <div
                    style={{
                      width: "40px",
                      height: "40px",
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #B8860B, #D4A017)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontFamily: "var(--font-body)",
                      fontWeight: 600,
                      fontSize: "1rem",
                      flexShrink: 0,
                    }}
                    aria-hidden="true"
                  >
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontFamily: "var(--font-body)", fontWeight: 500, fontSize: "0.9375rem", color: "var(--color-text-primary)" }}>
                      {active.name}
                    </div>
                    <div style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                      {active.location} &middot; {active.propertyBought}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Tab navigation */}
          <div className="flex items-center justify-center gap-2" role="tablist" aria-label="Testimonials">
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`Testimonial from ${t.name}`}
                onClick={() => setActiveIndex(i)}
                style={{
                  height: "4px",
                  width: i === activeIndex ? "28px" : "4px",
                  borderRadius: "9999px",
                  background: i === activeIndex ? "var(--color-text-primary)" : "var(--color-border)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                  transition: "all 0.3s cubic-bezier(0.16,1,0.3,1)",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mt-14"
        >
          {["RERA Registered", "16+ Years Experience", "Clear Title Guarantee", "NRI Friendly"].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "var(--color-bg-secondary)",
                border: "1px solid var(--color-border-subtle)",
              }}
            >
              <svg width="11" height="11" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M13 4L6.5 11 3 7.5" stroke="var(--color-gold)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
