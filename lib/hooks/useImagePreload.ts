"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export type LoadState = "idle" | "loading" | "ready" | "error";

interface PreloadOptions {
  /** Total number of frames to load */
  frameCount: number;
  /** Function to get frame URL by index (0-based) */
  getFrameUrl: (index: number) => string;
  /** Number of frames to preload initially before showing canvas */
  initialBatch?: number;
  /** Delay between batch loads in ms (prevents UI jank) */
  batchDelay?: number;
}

interface PreloadResult {
  images: HTMLImageElement[];
  loadState: LoadState;
  loadedCount: number;
  progress: number;
}

/**
 * Progressive image sequence preloader.
 *
 * Strategy:
 * 1. Load first `initialBatch` frames immediately (to show something fast)
 * 2. Load remaining frames in background batches
 * 3. Expose per-frame images array for direct canvas drawImage calls
 * 4. Memory-safe: all refs cleaned up on unmount
 */
export function useImagePreload({
  frameCount,
  getFrameUrl,
  initialBatch = 30,
  batchDelay = 16,
}: PreloadOptions): PreloadResult {
  const [loadState, setLoadState] = useState<LoadState>("idle");
  const [loadedCount, setLoadedCount] = useState(0);

  // Stable array reference — does NOT trigger re-render on fill
  const imagesRef = useRef<HTMLImageElement[]>(
    Array.from({ length: frameCount }, () => new Image())
  );

  const isMounted = useRef(true);
  const loadedCountRef = useRef(0);

  const updateLoaded = useCallback(() => {
    loadedCountRef.current += 1;
    if (!isMounted.current) return;

    // Batch state updates to reduce render frequency
    if (
      loadedCountRef.current % 10 === 0 ||
      loadedCountRef.current === frameCount
    ) {
      setLoadedCount(loadedCountRef.current);
    }

    if (loadedCountRef.current >= frameCount) {
      setLoadState("ready");
    }
  }, [frameCount]);

  useEffect(() => {
    isMounted.current = true;
    if (frameCount === 0) return;

    setLoadState("loading");

    const images = imagesRef.current;

    const loadFrame = (index: number): Promise<void> =>
      new Promise((resolve) => {
        const img = images[index];
        if (!img) {
          resolve();
          return;
        }
        img.onload = () => {
          updateLoaded();
          resolve();
        };
        img.onerror = () => {
          // Non-fatal: missing frame just renders blank
          updateLoaded();
          resolve();
        };
        img.src = getFrameUrl(index);
      });

    // Phase 1: Load initial batch synchronously to hydrate canvas fast
    const phase1 = Array.from(
      { length: Math.min(initialBatch, frameCount) },
      (_, i) => loadFrame(i)
    );

    Promise.all(phase1).then(() => {
      if (!isMounted.current) return;
      if (frameCount <= initialBatch) {
        setLoadState("ready");
        return;
      }
      setLoadState("ready"); // Show canvas after initial batch

      // Phase 2: Load remainder in background with delays between batches
      const BATCH_SIZE = 20;
      let batchIndex = initialBatch;

      const loadNextBatch = () => {
        if (!isMounted.current || batchIndex >= frameCount) return;

        const end = Math.min(batchIndex + BATCH_SIZE, frameCount);
        const batch = Array.from(
          { length: end - batchIndex },
          (_, i) => loadFrame(batchIndex + i)
        );

        Promise.all(batch).then(() => {
          batchIndex = end;
          if (batchIndex < frameCount) {
            setTimeout(loadNextBatch, batchDelay);
          }
        });
      };

      setTimeout(loadNextBatch, batchDelay);
    });

    return () => {
      isMounted.current = false;
      // Cancel in-flight loads
      images.forEach((img) => {
        img.onload = null;
        img.onerror = null;
        img.src = "";
      });
    };
  }, [frameCount, getFrameUrl, initialBatch, batchDelay, updateLoaded]);

  return {
    images: imagesRef.current,
    loadState,
    loadedCount,
    progress: frameCount > 0 ? loadedCount / frameCount : 0,
  };
}
