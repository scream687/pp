"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { useScrollProgress, mapRange } from "@/lib/hooks/useScrollProgress";
import ScrollyCanvas from "@/components/ScrollyCanvas";
import Overlay from "@/components/Overlay";

/**
 * ScrollContainer
 *
 * The 500vh scroll-pinned section that drives the canvas sequence.
 * Architecture:
 *   - Outer div: 500vh tall (creates scroll distance)
 *   - Inner sticky div: 100vh, pinned at top
 *   - Canvas + Overlay live inside the sticky container
 *
 * Scroll progress is computed from this container's position
 * in the viewport, not window.scrollY, for precision.
 */
export default function ScrollContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const rafId = useRef<number | null>(null);
  const isMounted = useRef(true);

  const computeProgress = useCallback(() => {
    const el = containerRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const totalScrollDistance = el.offsetHeight - window.innerHeight;
    // How far the top of the container has scrolled above the viewport
    const scrolled = -rect.top;
    const p = Math.min(Math.max(scrolled / totalScrollDistance, 0), 1);

    setProgress(p);
  }, []);

  const onScroll = useCallback(() => {
    if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    rafId.current = requestAnimationFrame(() => {
      if (isMounted.current) computeProgress();
    });
  }, [computeProgress]);

  useEffect(() => {
    isMounted.current = true;
    window.addEventListener("scroll", onScroll, { passive: true });
    computeProgress(); // Initial read

    return () => {
      isMounted.current = false;
      window.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [onScroll, computeProgress]);

  return (
    <div
      ref={containerRef}
      className="relative"
      style={{ height: "500vh" }}
      aria-label="Vrindavan cinematic scroll experience"
    >
      {/* Sticky viewport container */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "#050810" }}
      >
        {/* Canvas (image sequence) */}
        <ScrollyCanvas progress={progress} />

        {/* Text overlays */}
        <Overlay progress={progress} />

        {/* Scroll indicator — fades out after first phase */}
        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none"
          style={{
            opacity: Math.max(0, 1 - mapRange(progress, 0, 0.06)),
            transition: "opacity 0.3s ease",
          }}
          aria-hidden="true"
        >
          <span
            className="font-body tracking-[0.14em] uppercase"
            style={{ fontSize: "0.6875rem", color: "var(--color-text-muted)" }}
          >
            Scroll to explore
          </span>
          <div
            className="w-px h-10"
            style={{
              background:
                "linear-gradient(to bottom, var(--color-gold), transparent)",
              animation: "float 2s ease-in-out infinite",
            }}
          />
        </div>

        {/* Progress line */}
        <div
          className="absolute bottom-0 left-0 h-px pointer-events-none"
          style={{
            width: `${progress * 100}%`,
            background: "linear-gradient(90deg, var(--color-saffron), var(--color-gold))",
            opacity: 0.6,
            transition: "width 0.05s linear",
            willChange: "width",
          }}
          aria-hidden="true"
          role="progressbar"
          aria-valuenow={Math.round(progress * 100)}
          aria-valuemin={0}
          aria-valuemax={100}
        />
      </div>
    </div>
  );
}
