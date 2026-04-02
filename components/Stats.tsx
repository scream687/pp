"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { STATS } from "@/lib/constants";

const containerVariants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function Stats() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      ref={ref}
      id="about"
      className="relative py-20 md:py-28"
      style={{ background: "var(--color-bg-secondary)" }}
      aria-label="Our track record"
    >
      {/* Top divider */}
      <div className="divider-gold mb-16 md:mb-20" />

      <div
        className="px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "var(--max-content)", margin: "0 auto" }}
      >
        {/* Section label */}
        <div className="text-center mb-12">
          <span
            className="font-body text-caption tracking-[0.14em] uppercase"
            style={{ color: "var(--color-gold)" }}
          >
            Trusted Since 2008
          </span>
        </div>

        {/* Stats grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12"
        >
          {STATS.map((stat, i) => (
            <motion.div
              key={stat.label}
              variants={itemVariants}
              className="flex flex-col items-center text-center"
            >
              {/* Value */}
              <div
                className="font-display font-bold mb-2"
                style={{
                  fontSize: "clamp(2rem, 4vw, 3.5rem)",
                  lineHeight: 1,
                  letterSpacing: "-0.02em",
                  background:
                    i % 2 === 0
                      ? "linear-gradient(135deg, #F9C46A, #C9A84C)"
                      : "linear-gradient(135deg, #E8821A, #F4A520)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                {stat.value}
              </div>

              {/* Label */}
              <div
                className="font-body"
                style={{
                  fontSize: "0.875rem",
                  lineHeight: 1.5,
                  color: "var(--color-text-secondary)",
                  letterSpacing: "0.01em",
                  maxWidth: "16ch",
                }}
              >
                {stat.label}
              </div>

              {/* Accent dot */}
              <div
                className="w-1 h-1 rounded-full mt-3"
                style={{ background: "var(--color-gold)", opacity: 0.5 }}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Mission statement */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 1, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-20 text-center"
        >
          <blockquote
            className="font-display italic"
            style={{
              fontSize: "clamp(1.25rem, 2.5vw, 1.875rem)",
              lineHeight: 1.4,
              color: "var(--color-lotus)",
              maxWidth: "50ch",
              margin: "0 auto",
              letterSpacing: "-0.01em",
            }}
          >
            &ldquo;Every family that chooses Vrindavan chooses something
            greater than property — they choose a place on{" "}
            <span className="text-gradient-gold not-italic">sacred earth.</span>&rdquo;
          </blockquote>
          <div
            className="font-body mt-4"
            style={{ fontSize: "0.875rem", color: "var(--color-text-muted)" }}
          >
            — Founder, Nidhivan Property Linkers
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="divider-gold mt-16 md:mt-20" />
    </section>
  );
}
