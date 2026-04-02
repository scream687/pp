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
      className="relative py-20 md:py-28 lg:py-36 overflow-hidden"
      style={{ background: "var(--color-bg-secondary)" }}
      aria-label="Client testimonials"
    >
      {/* Background ornament */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          backgroundImage:
            "radial-gradient(circle at 70% 30%, rgba(201,168,76,0.04) 0%, transparent 60%)",
        }}
      />

      <div
        className="px-6 md:px-12 lg:px-16 relative"
        style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}
      >
        {/* Section header */}
        <div className="text-center mb-16 md:mb-20">
          <motion.span
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.7 }}
            className="font-body text-caption tracking-[0.14em] uppercase block mb-4"
            style={{ color: "var(--color-saffron)" }}
          >
            Stories of Trust
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display"
            style={{
              fontSize: "clamp(1.875rem, 3.5vw, 3rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-lotus)",
            }}
          >
            Families Who Found{" "}
            <span className="text-gradient-gold">Their Sacred Home</span>
          </motion.h2>
        </div>

        {/* Testimonial display */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
          transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="relative"
        >
          {/* Quote card */}
          <div
            className="relative rounded-2xl p-8 md:p-12 lg:p-16 mb-10"
            style={{
              background: "var(--color-bg-surface)",
              border: "1px solid var(--color-border)",
            }}
          >
            {/* Large quote mark */}
            <div
              className="absolute top-6 left-8 font-display leading-none select-none"
              style={{
                fontSize: "6rem",
                color: "var(--color-gold)",
                opacity: 0.08,
                lineHeight: 0.8,
              }}
              aria-hidden="true"
            >
              &ldquo;
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Quote text */}
                <blockquote
                  className="font-display italic mb-8 relative z-10"
                  style={{
                    fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
                    lineHeight: 1.55,
                    color: "var(--color-lotus)",
                    letterSpacing: "-0.01em",
                    maxWidth: "60ch",
                  }}
                >
                  &ldquo;{active.quote}&rdquo;
                </blockquote>

                {/* Attribution */}
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div
                    className="w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0"
                    style={{
                      background: "rgba(201,168,76,0.15)",
                      border: "1px solid rgba(201,168,76,0.25)",
                      color: "var(--color-gold)",
                      fontFamily: "var(--font-display)",
                      fontSize: "1rem",
                      fontWeight: 600,
                    }}
                    aria-hidden="true"
                  >
                    {active.name.charAt(0)}
                  </div>
                  <div>
                    <div
                      className="font-body font-medium"
                      style={{
                        fontSize: "0.9375rem",
                        color: "var(--color-lotus)",
                      }}
                    >
                      {active.name}
                    </div>
                    <div
                      className="font-body"
                      style={{
                        fontSize: "0.8125rem",
                        color: "var(--color-text-muted)",
                      }}
                    >
                      {active.location} · {active.propertyBought}
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div
            className="flex items-center justify-center gap-3"
            role="tablist"
            aria-label="Testimonial navigation"
          >
            {TESTIMONIALS.map((t, i) => (
              <button
                key={t.id}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={`View testimonial from ${t.name}`}
                onClick={() => setActiveIndex(i)}
                className="transition-all duration-300"
                style={{
                  width: i === activeIndex ? "2rem" : "0.5rem",
                  height: "0.375rem",
                  borderRadius: "9999px",
                  background:
                    i === activeIndex
                      ? "var(--color-gold)"
                      : "rgba(201,168,76,0.2)",
                  border: "none",
                  cursor: "pointer",
                  padding: 0,
                }}
              />
            ))}
          </div>

          {/* Auto-advance for accessibility — users can also click */}
        </motion.div>

        {/* Trust badges */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-6 mt-14"
        >
          {[
            "RERA Registered",
            "16+ Years Experience",
            "Clear Title Guarantee",
            "NRI Friendly",
          ].map((badge) => (
            <div
              key={badge}
              className="flex items-center gap-2 px-4 py-2 rounded-full"
              style={{
                background: "rgba(201,168,76,0.05)",
                border: "1px solid var(--color-border)",
              }}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 16 16"
                fill="none"
                aria-hidden="true"
              >
                <path
                  d="M13 4L6.5 11 3 7.5"
                  stroke="var(--color-gold)"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span
                className="font-body"
                style={{
                  fontSize: "0.8125rem",
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.01em",
                }}
              >
                {badge}
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
