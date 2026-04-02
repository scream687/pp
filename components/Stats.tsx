"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const item = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } },
};

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="about"
      ref={ref}
      aria-label="Our track record"
      style={{ background: "var(--color-bg-secondary)", padding: "96px 0" }}
    >
      <div style={{ maxWidth: "var(--max-content)", margin: "0 auto", padding: "0 24px" }}>

        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="section-label">Trusted Since 2008</span>
        </motion.div>

        {/* Stats grid */}
        <motion.div
          variants={container}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-1"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={item}
              className="flex flex-col items-center text-center px-6 py-8"
              style={{
                background: "var(--color-bg-primary)",
                borderRadius: i === 0 ? "18px 0 0 18px" : i === STATS.length - 1 ? "0 18px 18px 0" : "0",
                borderRight: i < STATS.length - 1 ? "1px solid var(--color-border-subtle)" : "none",
              }}
            >
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "clamp(2.25rem, 4vw, 3.25rem)",
                  fontWeight: 600,
                  letterSpacing: "-0.03em",
                  lineHeight: 1,
                  marginBottom: "0.5rem",
                  color: i % 2 === 0 ? "#1D1D1F" : "var(--color-gold)",
                }}
              >
                {stat.value}
              </div>
              <div
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "0.875rem",
                  color: "var(--color-text-secondary)",
                  lineHeight: 1.5,
                  maxWidth: "14ch",
                }}
              >
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mt-20"
        >
          <blockquote
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)",
              lineHeight: 1.45,
              color: "var(--color-text-primary)",
              maxWidth: "44ch",
              margin: "0 auto",
              letterSpacing: "-0.015em",
              fontStyle: "italic",
            }}
          >
            &ldquo;Every family that chooses Vrindavan chooses something greater
            than property — they choose a place on{" "}
            <span className="text-gradient-gold not-italic font-semibold">sacred earth.</span>&rdquo;
          </blockquote>
          <div
            className="mt-4"
            style={{ fontSize: "0.875rem", color: "var(--color-text-tertiary)", fontFamily: "var(--font-body)" }}
          >
            — Founder, Nidhivan Property Linkers
          </div>
        </motion.div>
      </div>
    </section>
  );
}
