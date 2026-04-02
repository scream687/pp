"use client";

import { useRef, useState, memo } from "react";
import { motion, useInView } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/constants";

const STATUS_DOT: Record<Project["status"], string> = {
  "Available":    "#34C759",
  "Sold Out":     "#AEAEB2",
  "Coming Soon":  "#FF9F0A",
};

const TAG_STYLE: Record<string, { bg: string; color: string }> = {
  "Premium":       { bg: "rgba(184,134,11,0.08)", color: "#B8860B" },
  "New Launch":    { bg: "rgba(255,159,10,0.08)", color: "#C07800" },
  "High Demand":   { bg: "rgba(52,199,89,0.08)",  color: "#1E7A3C" },
  "RERA Approved": { bg: "rgba(0,113,227,0.07)",  color: "#0060C7" },
  "NRI Special":   { bg: "rgba(184,134,11,0.08)", color: "#B8860B" },
  "Pre-launch":    { bg: "rgba(255,55,95,0.07)",  color: "#C0003C" },
};

const ProjectCard = memo(function ProjectCard({
  project, index, inView,
}: { project: Project; index: number; inView: boolean }) {
  const [hovered, setHovered] = useState(false);
  const tag = project.tag ? TAG_STYLE[project.tag] ?? TAG_STYLE["Premium"] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-apple-elevated"
      style={{
        background: "var(--color-bg-primary)",
        cursor: "pointer",
      }}
      aria-label={`${project.name} — ${project.price}`}
    >
      {/* Color accent bar */}
      <div
        style={{
          height: "3px",
          background: hovered
            ? "linear-gradient(90deg, #B8860B, #D4A017)"
            : "transparent",
          transition: "background 0.3s ease",
        }}
        aria-hidden="true"
      />

      <div style={{ padding: "24px 28px 28px" }}>
        {/* Header */}
        <div className="flex items-start justify-between gap-3 mb-5">
          <div>
            <div style={{
              fontFamily: "var(--font-body)",
              fontSize: "0.75rem",
              fontWeight: 500,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--color-text-tertiary)",
              marginBottom: "4px",
            }}>
              {project.category}
            </div>
            <h3 style={{
              fontFamily: "var(--font-body)",
              fontWeight: 600,
              fontSize: "1.0625rem",
              color: "var(--color-text-primary)",
              letterSpacing: "-0.015em",
              lineHeight: 1.3,
            }}>
              {project.name}
            </h3>
          </div>
          {tag && (
            <span style={{
              flexShrink: 0,
              padding: "3px 10px",
              borderRadius: "999px",
              fontSize: "0.6875rem",
              fontWeight: 500,
              letterSpacing: "0.04em",
              background: tag.bg,
              color: tag.color,
              fontFamily: "var(--font-body)",
              marginTop: "2px",
            }}>
              {project.tag}
            </span>
          )}
        </div>

        {/* Location */}
        <div className="flex items-center gap-1.5 mb-5" style={{ color: "var(--color-text-tertiary)" }}>
          <svg width="11" height="11" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C5.24 0 3 2.24 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 7.5A2.5 2.5 0 1 1 8 2.5 2.5 2.5 0 0 1 8 7.5z"/>
          </svg>
          <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem" }}>
            {project.location}
          </span>
        </div>

        {/* Divider */}
        <div className="divider mb-5" />

        {/* Price + Area */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <div style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "3px", fontFamily: "var(--font-body)" }}>
              Price
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontWeight: 600, fontSize: "1rem", color: "var(--color-gold)", letterSpacing: "-0.01em" }}>
              {project.price}
            </div>
          </div>
          <div>
            <div style={{ fontSize: "0.6875rem", fontWeight: 500, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--color-text-muted)", marginBottom: "3px", fontFamily: "var(--font-body)" }}>
              Area
            </div>
            <div style={{ fontFamily: "var(--font-body)", fontSize: "0.9375rem", color: "var(--color-text-secondary)" }}>
              {project.area}
            </div>
          </div>
        </div>

        {/* Highlight */}
        <p style={{
          fontFamily: "var(--font-body)",
          fontSize: "0.875rem",
          lineHeight: 1.6,
          color: "var(--color-text-secondary)",
          marginBottom: "20px",
        }}>
          {project.highlight}
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-1.5">
            <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: STATUS_DOT[project.status] }} aria-hidden="true" />
            <span style={{ fontFamily: "var(--font-body)", fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>
              {project.status}
            </span>
          </div>
          <a href="#contact" className="btn-link" style={{ fontSize: "0.875rem" }}>
            Enquire
            <svg width="13" height="13" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4"/>
            </svg>
          </a>
        </div>
      </div>
    </motion.article>
  );
});

export default function Projects() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-8%" });

  return (
    <section
      id="projects"
      ref={ref}
      aria-label="Featured properties"
      style={{ background: "var(--color-bg-secondary)", padding: "96px 0 112px" }}
    >
      <div style={{ maxWidth: "var(--max-wide)", margin: "0 auto", padding: "0 24px" }}>

        {/* Header */}
        <div className="mb-14 max-w-2xl">
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="section-label"
          >
            Curated Properties
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.07, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontWeight: 700,
              fontSize: "clamp(2rem, 4vw, 3rem)",
              letterSpacing: "-0.025em",
              lineHeight: 1.08,
              color: "var(--color-text-primary)",
              marginBottom: "16px",
            }}
          >
            Sacred Addresses
            <br />
            <span className="text-gradient-gold">Worth Passing Down</span>
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "1.0625rem",
              lineHeight: 1.65,
              color: "var(--color-text-secondary)",
              maxWidth: "44ch",
            }}
          >
            Each listing is personally verified — title, legal status, and
            spiritual significance — before we present it to you.
          </motion.p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-5">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} index={i} inView={inView} />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.6 }}
          className="text-center mt-12"
        >
          <a href="#contact" className="btn-ghost">View All Properties</a>
        </motion.div>
      </div>
    </section>
  );
}
