"use client";

import { useRef, useEffect, useCallback, memo } from "react";
import { SEQUENCE_FRAME_COUNT, getFrameUrl } from "@/lib/constants";
import { useImagePreload } from "@/lib/hooks/useImagePreload";
import CanvasFallback from "@/components/CanvasFallback";

interface ScrollyCanvasProps {
  /** Normalized scroll progress 0–1 within the scroll container */
  progress: number;
}

/**
 * ScrollyCanvas
 *
 * Renders a frame-by-frame image sequence driven by scroll position.
 * Uses requestAnimationFrame for frame scheduling, never re-renders
 * the React component on scroll — all drawing is imperative.
 *
 * Performance guarantees:
 * - No React re-render on scroll
 * - Object-fit: cover scaling maintained manually
 * - Canvas cleared + drawn once per rAF
 * - Memory cleanup on unmount
 */
const ScrollyCanvas = memo(function ScrollyCanvas({
  progress,
}: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressRef = useRef(progress);
  const rafId = useRef<number | null>(null);
  const lastFrameIndex = useRef(-1);
  const isMounted = useRef(true);

  const { images, loadState } = useImagePreload({
    frameCount: SEQUENCE_FRAME_COUNT,
    getFrameUrl,
    initialBatch: 40,
  });

  // Keep progress ref in sync without triggering re-render
  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  /**
   * Cover-fit scaling: replicates CSS `object-fit: cover` behavior.
   * Returns draw parameters for drawImage.
   */
  const getCoverParams = useCallback(
    (
      imgW: number,
      imgH: number,
      canvasW: number,
      canvasH: number
    ): { sx: number; sy: number; sw: number; sh: number } => {
      const canvasAspect = canvasW / canvasH;
      const imgAspect = imgW / imgH;

      let sw: number, sh: number, sx: number, sy: number;

      if (imgAspect > canvasAspect) {
        // Image is wider — crop sides
        sh = imgH;
        sw = imgH * canvasAspect;
        sx = (imgW - sw) / 2;
        sy = 0;
      } else {
        // Image is taller — crop top/bottom
        sw = imgW;
        sh = imgW / canvasAspect;
        sx = 0;
        sy = (imgH - sh) / 2;
      }

      return { sx, sy, sw, sh };
    },
    []
  );

  /**
   * Draw the current frame to canvas.
   * Called once per rAF tick when progress changes.
   */
  const drawFrame = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !isMounted.current) return;

    const ctx = canvas.getContext("2d", { alpha: false });
    if (!ctx) return;

    const p = progressRef.current;
    const frameIndex = Math.min(
      Math.floor(p * (SEQUENCE_FRAME_COUNT - 1)),
      SEQUENCE_FRAME_COUNT - 1
    );

    // Skip redraw if same frame
    if (frameIndex === lastFrameIndex.current) return;
    lastFrameIndex.current = frameIndex;

    const img = images[frameIndex];
    if (!img || !img.complete || img.naturalWidth === 0) {
      // Frame not loaded yet: find nearest loaded frame
      let fallbackIndex = frameIndex;
      for (let i = 1; i < 10; i++) {
        const prev = frameIndex - i;
        if (prev >= 0 && images[prev]?.complete && images[prev].naturalWidth > 0) {
          fallbackIndex = prev;
          break;
        }
      }
      if (fallbackIndex === frameIndex) return;
      const fallbackImg = images[fallbackIndex];
      if (!fallbackImg?.complete || fallbackImg.naturalWidth === 0) return;

      const { sx, sy, sw, sh } = getCoverParams(
        fallbackImg.naturalWidth,
        fallbackImg.naturalHeight,
        canvas.width,
        canvas.height
      );
      ctx.drawImage(fallbackImg, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
      return;
    }

    const { sx, sy, sw, sh } = getCoverParams(
      img.naturalWidth,
      img.naturalHeight,
      canvas.width,
      canvas.height
    );
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
  }, [images, getCoverParams]);

  /**
   * rAF loop — continuously checks if frame needs updating.
   * Lightweight: only does GPU work when frameIndex changes.
   */
  useEffect(() => {
    const loop = () => {
      if (!isMounted.current) return;
      drawFrame();
      rafId.current = requestAnimationFrame(loop);
    };
    rafId.current = requestAnimationFrame(loop);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, [drawFrame]);

  /**
   * Resize handler: updates canvas dimensions to match viewport.
   * Uses devicePixelRatio for sharp rendering on HiDPI screens.
   */
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      const ctx = canvas.getContext("2d", { alpha: false });
      if (ctx) ctx.scale(dpr, dpr);
      lastFrameIndex.current = -1; // Force redraw after resize
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  return (
    <>
      {/* Canvas — full screen, sticky, behind overlay content */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 block"
        style={{ background: "#050810" }}
        aria-hidden="true"
      />

      {/* Generative cinematic fallback — shown while loading or when no frames exist */}
      {loadState !== "ready" && (
        <CanvasFallback progress={progress} />
      )}

      {/* Cinematic vignette overlay — always present */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, transparent 30%, rgba(5,8,16,0.55) 100%)",
        }}
        aria-hidden="true"
      />

      {/* Bottom gradient — smooth transition to content sections */}
      <div
        className="absolute bottom-0 left-0 right-0 h-48 pointer-events-none"
        style={{
          background: "linear-gradient(to bottom, transparent, rgba(5,8,16,0.9))",
        }}
        aria-hidden="true"
      />
    </>
  );
});

export default ScrollyCanvas;
