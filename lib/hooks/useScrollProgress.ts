"use client";

import { useState, useEffect, useRef, useCallback } from "react";

interface ScrollProgressOptions {
  /**
   * The element to track scroll progress within.
   * Defaults to the document if not provided.
   */
  containerRef?: React.RefObject<HTMLElement>;
  /**
   * Throttle interval in ms. Default: 0 (rAF-synced).
   */
  throttleMs?: number;
}

interface ScrollProgressResult {
  /** 0–1 normalized scroll progress */
  progress: number;
  /** Raw scroll Y in pixels */
  scrollY: number;
  /** Scroll direction: 'down' | 'up' | 'idle' */
  direction: "down" | "up" | "idle";
}

/**
 * High-performance scroll progress hook.
 * Uses requestAnimationFrame for 60fps synchronization.
 * Avoids unnecessary re-renders via ref-based tracking.
 */
export function useScrollProgress(
  options: ScrollProgressOptions = {}
): ScrollProgressResult {
  const { containerRef, throttleMs = 0 } = options;

  const [result, setResult] = useState<ScrollProgressResult>({
    progress: 0,
    scrollY: 0,
    direction: "idle",
  });

  const rafId = useRef<number | null>(null);
  const lastScrollY = useRef(0);
  const lastUpdate = useRef(0);
  const isMounted = useRef(true);

  const update = useCallback(() => {
    if (!isMounted.current) return;

    const now = performance.now();
    if (throttleMs > 0 && now - lastUpdate.current < throttleMs) {
      rafId.current = requestAnimationFrame(update);
      return;
    }
    lastUpdate.current = now;

    let scrollY = 0;
    let totalHeight = 0;

    if (containerRef?.current) {
      const el = containerRef.current;
      scrollY = el.scrollTop;
      totalHeight = el.scrollHeight - el.clientHeight;
    } else {
      scrollY = window.scrollY;
      totalHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
    }

    const progress = totalHeight > 0 ? Math.min(Math.max(scrollY / totalHeight, 0), 1) : 0;
    const direction =
      scrollY > lastScrollY.current
        ? "down"
        : scrollY < lastScrollY.current
        ? "up"
        : "idle";

    lastScrollY.current = scrollY;

    setResult({ progress, scrollY, direction });
  }, [containerRef, throttleMs]);

  const onScroll = useCallback(() => {
    if (rafId.current !== null) {
      cancelAnimationFrame(rafId.current);
    }
    rafId.current = requestAnimationFrame(update);
  }, [update]);

  useEffect(() => {
    isMounted.current = true;
    const target = containerRef?.current ?? window;
    target.addEventListener("scroll", onScroll, { passive: true });

    // Initial read
    onScroll();

    return () => {
      isMounted.current = false;
      target.removeEventListener("scroll", onScroll);
      if (rafId.current !== null) {
        cancelAnimationFrame(rafId.current);
      }
    };
  }, [containerRef, onScroll]);

  return result;
}

/**
 * Map a scroll progress value through a defined range to 0–1.
 * Values outside the range clamp to 0 or 1.
 *
 * Example: mapRange(0.3, 0.2, 0.5) => 0.333
 */
export function mapRange(
  value: number,
  inputMin: number,
  inputMax: number,
  outputMin = 0,
  outputMax = 1
): number {
  if (inputMax === inputMin) return outputMin;
  const t = Math.min(Math.max((value - inputMin) / (inputMax - inputMin), 0), 1);
  return outputMin + t * (outputMax - outputMin);
}

/**
 * Smoothly interpolate between two values.
 */
export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
