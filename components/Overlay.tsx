"use client";

import { useRef, memo } from "react";
import { motion, useTransform, useMotionValue, useSpring } from "framer-motion";
import { OVERLAY_SECTIONS, SCROLL_PHASES } from "@/lib/constants";
import { mapRange } from "@/lib/hooks/useScrollProgress";

interface OverlayProps {
  /** Normalized scroll progress 0–1 */
  progress: number;
}

interface SectionProps {
  id: string;
  headline: string;
  subtext: string;
  alignment: "left" | "center" | "right";
  badge: string;
  opacity: number;
  translateY: number;
}

/**
 * Individual overlay section — rendered as pure CSS transform/opacity.
 * No Framer Motion spring here to keep it in sync with scroll.
 */
const OverlaySection = memo(function OverlaySection({
  headline,
  subtext,
  alignment,
  badge,
  opacity,
  translateY,
}: SectionProps) {
  const alignClass =
    alignment === "center"
      ? "items-center text-center"
      : alignment === "left"
      ? "items-start text-left"
      : "items-end text-right";

  const maxW =
    alignment === "center" ? "max-w-3xl" : "max-w-xl";

  const positionClass =
    alignment === "center"
      ? "left-1/2 -translate-x-1/2"
      : alignment === "left"
      ? "left-8 md:left-16 lg:left-24"
      : "right-8 md:right-16 lg:right-24";

  const lines = headline.split("\n");

  return (
    <div
      className={`absolute bottom-0 pb-[12vh] ${positionClass} flex flex-col ${alignClass} gap-4 ${maxW} px-4`}
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        willChange: "opacity, transform",
      }}
    >
      {/* Badge */}
      <div
        className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full"
        style={{
          background: "rgba(201,168,76,0.08)",
          border: "1px solid rgba(201,168,76,0.25)",
        }}
      >
        <span
          className="w-1 h-1 rounded-full"
          style={{ background: "var(--color-saffron-light)" }}
        />
        <span
          className="font-body text-caption tracking-[0.14em] uppercase"
          style={{ color: "var(--color-gold-light)" }}
        >
          {badge}
        </span>
      </div>

      {/* Headline */}
      <h2
        className="font-display"
        style={{
          fontSize: "clamp(2.25rem, 5.5vw, 5rem)",
          lineHeight: 1.07,
          letterSpacing: "-0.02em",
          color: "var(--color-lotus)",
        }}
      >
        {lines.map((line, i) => (
          <span key={i} className="block">
            {i === lines.length - 1 ? (
              <span className="text-gradient-sacred">{line}</span>
            ) : (
              line
            )}
          </span>
        ))}
      </h2>

      {/* Subtext */}
      <p
        className="font-body"
        style={{
          fontSize: "clamp(1rem, 1.4vw, 1.25rem)",
          lineHeight: 1.65,
          color: "var(--color-text-secondary)",
          maxWidth: "42ch",
        }}
      >
        {subtext}
      </p>

      {/* Decorative line */}
      <div
        className="h-px w-16"
        style={{
          background:
            "linear-gradient(90deg, var(--color-gold), transparent)",
          alignSelf: alignment === "right" ? "flex-end" : alignment === "center" ? "center" : "flex-start",
        }}
      />
    </div>
  );
});

/**
 * Overlay — manages all scroll-phase sections.
 *
 * Drives opacity and parallax directly from scroll progress
 * without Framer Motion spring (eliminates lag vs. canvas).
 * Parallax: each section moves at 0.3x scroll speed for depth.
 */
const Overlay = memo(function Overlay({ progress }: OverlayProps) {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none select-none">
      {OVERLAY_SECTIONS.map((section) => {
        const phase = SCROLL_PHASES[section.phase as keyof typeof SCROLL_PHASES];

        // Compute opacity: fade in → stay → fade out
        let opacity = 0;
        if (progress >= phase.enter && progress <= phase.peak) {
          opacity = mapRange(progress, phase.enter, phase.peak);
        } else if (progress > phase.peak && progress <= phase.exit) {
          opacity = mapRange(progress, phase.exit, phase.peak);
        }

        // Parallax: slides 40px total, entering from bottom
        const parallaxIn = mapRange(progress, phase.enter, phase.peak);
        const parallaxOut = progress > phase.peak
          ? mapRange(progress, phase.peak, phase.exit)
          : 0;
        const translateY = (1 - parallaxIn) * 30 - parallaxOut * 20;

        if (opacity < 0.005) return null;

        return (
          <OverlaySection
            key={section.id}
            id={section.id}
            headline={section.headline}
            subtext={section.subtext}
            alignment={section.alignment}
            badge={section.badge}
            opacity={Math.max(0, Math.min(1, opacity))}
            translateY={translateY}
          />
        );
      })}
    </div>
  );
});

export default Overlay;
