"use client";

import { useRef, useState, memo } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { PROJECTS, type Project } from "@/lib/constants";

const STATUS_COLORS: Record<Project["status"], string> = {
  Available: "rgba(139, 155, 122, 0.9)",
  "Sold Out": "rgba(201, 168, 76, 0.5)",
  "Coming Soon": "rgba(232, 130, 26, 0.9)",
};

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  Premium: { bg: "rgba(201,168,76,0.12)", text: "var(--color-gold-light)" },
  "New Launch": { bg: "rgba(232,130,26,0.12)", text: "var(--color-saffron-light)" },
  "High Demand": { bg: "rgba(201,168,76,0.12)", text: "var(--color-gold-light)" },
  "RERA Approved": { bg: "rgba(139,155,122,0.12)", text: "#A8B89A" },
  "NRI Special": { bg: "rgba(244,165,32,0.12)", text: "#F4A520" },
  "Pre-launch": { bg: "rgba(232,130,26,0.08)", text: "var(--color-saffron)" },
};

interface ProjectCardProps {
  project: Project;
  index: number;
  inView: boolean;
}

const ProjectCard = memo(function ProjectCard({
  project,
  index,
  inView,
}: ProjectCardProps) {
  const [hovered, setHovered] = useState(false);
  const tagStyle = project.tag ? TAG_COLORS[project.tag] ?? TAG_COLORS["Premium"] : null;

  return (
    <motion.article
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 32 }}
      transition={{
        duration: 0.8,
        delay: index * 0.1,
        ease: [0.16, 1, 0.3, 1],
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="card-premium relative overflow-hidden cursor-pointer"
      role="article"
      aria-label={`${project.name} — ${project.price}`}
    >
      {/* Accent top border on hover */}
      <div
        className="absolute top-0 left-0 right-0 h-px transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(90deg, transparent, var(--color-gold), transparent)",
          opacity: hovered ? 1 : 0,
        }}
        aria-hidden="true"
      />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div>
            <div
              className="font-body text-caption tracking-[0.1em] uppercase mb-1.5"
              style={{ color: "var(--color-text-muted)" }}
            >
              {project.category}
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
                lineHeight: 1.25,
                color: "var(--color-lotus)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.name}
            </h3>
          </div>

          {/* Tag */}
          {project.tag && tagStyle && (
            <div
              className="flex-shrink-0 px-2.5 py-1 rounded-full text-caption tracking-wider"
              style={{
                background: tagStyle.bg,
                color: tagStyle.text,
                fontSize: "0.6875rem",
                fontWeight: 500,
                letterSpacing: "0.08em",
                border: `1px solid ${tagStyle.bg.replace("0.12", "0.25").replace("0.08", "0.2")}`,
              }}
            >
              {project.tag}
            </div>
          )}
        </div>

        {/* Location */}
        <div
          className="flex items-center gap-1.5 mb-5"
          style={{ color: "var(--color-text-muted)" }}
        >
          <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
            <path d="M8 0C5.24 0 3 2.24 3 5c0 3.75 5 11 5 11s5-7.25 5-11c0-2.76-2.24-5-5-5zm0 7.5A2.5 2.5 0 1 1 8 2.5 2.5 2.5 0 0 1 8 7.5z" />
          </svg>
          <span className="font-body" style={{ fontSize: "0.8125rem" }}>
            {project.location}
          </span>
        </div>

        {/* Divider */}
        <div
          className="h-px mb-5"
          style={{ background: "var(--color-divider)" }}
        />

        {/* Price + Area */}
        <div className="grid grid-cols-2 gap-4 mb-5">
          <div>
            <div
              className="font-body text-caption tracking-wider uppercase mb-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Price
            </div>
            <div
              className="font-display"
              style={{
                fontSize: "1.0625rem",
                color: "var(--color-gold-light)",
                letterSpacing: "-0.01em",
              }}
            >
              {project.price}
            </div>
          </div>
          <div>
            <div
              className="font-body text-caption tracking-wider uppercase mb-1"
              style={{ color: "var(--color-text-muted)" }}
            >
              Area
            </div>
            <div
              className="font-body"
              style={{
                fontSize: "0.9375rem",
                color: "var(--color-text-secondary)",
              }}
            >
              {project.area}
            </div>
          </div>
        </div>

        {/* Highlight */}
        <p
          className="font-body mb-6"
          style={{
            fontSize: "0.875rem",
            lineHeight: 1.6,
            color: "var(--color-text-muted)",
            fontStyle: "italic",
          }}
        >
          &ldquo;{project.highlight}&rdquo;
        </p>

        {/* Footer */}
        <div className="flex items-center justify-between">
          {/* Status */}
          <div className="flex items-center gap-2">
            <div
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: STATUS_COLORS[project.status] }}
              aria-hidden="true"
            />
            <span
              className="font-body"
              style={{
                fontSize: "0.8125rem",
                color: STATUS_COLORS[project.status],
              }}
            >
              {project.status}
            </span>
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="flex items-center gap-1.5 font-body"
            style={{
              fontSize: "0.875rem",
              color: hovered ? "var(--color-gold-light)" : "var(--color-text-muted)",
              transition: "color 0.2s ease",
              letterSpacing: "0.01em",
            }}
            animate={{ x: hovered ? 3 : 0 }}
            transition={{ duration: 0.2 }}
          >
            Enquire
            <svg
              width="14"
              height="14"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
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
      className="relative py-20 md:py-28 lg:py-36"
      style={{ background: "var(--color-bg-primary)" }}
      aria-label="Featured properties"
    >
      <div
        className="px-6 md:px-12 lg:px-16"
        style={{ maxWidth: "var(--max-wide)", margin: "0 auto" }}
      >
        {/* Section header */}
        <div className="mb-16 md:mb-20 max-w-2xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="font-body text-caption tracking-[0.14em] uppercase block mb-4"
              style={{ color: "var(--color-saffron)" }}
            >
              Curated Properties
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.8, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            className="font-display mb-5"
            style={{
              fontSize: "clamp(2rem, 4vw, 3.25rem)",
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
              color: "var(--color-lotus)",
            }}
          >
            Sacred Addresses
            <br />
            <span className="text-gradient-sacred">Worth Passing Down</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
            transition={{ duration: 0.8, delay: 0.16, ease: [0.16, 1, 0.3, 1] }}
            className="font-body"
            style={{
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

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={i}
              inView={inView}
            />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 text-center"
        >
          <a href="#contact" className="btn-ghost">
            View All Properties
          </a>
        </motion.div>
      </div>
    </section>
  );
}
