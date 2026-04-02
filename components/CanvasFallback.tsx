"use client";

import { useRef, useEffect, memo } from "react";

interface CanvasFallbackProps {
  progress: number;
}

/**
 * CanvasFallback
 *
 * A generative canvas experience that renders when real image frames
 * are not yet available. Creates a cinematic sacred atmosphere using
 * procedural techniques:
 *
 * - Deep navy sky with gold particle field (stars / fireflies)
 * - Temple silhouette drawn with lineart
 * - Yamuna river reflection
 * - Saffron/gold light rays that animate with scroll
 * - Atmospheric haze layers
 *
 * This is designed to look premium, not placeholder-like.
 * Replace by loading real frames in ScrollyCanvas.tsx.
 */
const CanvasFallback = memo(function CanvasFallback({ progress }: CanvasFallbackProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafId = useRef<number | null>(null);
  const progressRef = useRef(progress);
  const timeRef = useRef(0);
  const isMounted = useRef(true);

  useEffect(() => {
    progressRef.current = progress;
  }, [progress]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio ?? 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
    };

    resize();
    window.addEventListener("resize", resize, { passive: true });
    return () => window.removeEventListener("resize", resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d")!;

    // Seeded pseudo-random for stable star field
    const rand = (seed: number) => {
      const x = Math.sin(seed + 1) * 10000;
      return x - Math.floor(x);
    };

    const STAR_COUNT = 180;
    const stars = Array.from({ length: STAR_COUNT }, (_, i) => ({
      x: rand(i * 3.7) * canvas.width,
      y: rand(i * 2.3) * canvas.height * 0.6,
      r: rand(i * 5.1) * 1.8 + 0.4,
      twinkle: rand(i * 7.9),
      speed: rand(i * 4.1) * 0.5 + 0.2,
    }));

    const draw = (timestamp: number) => {
      if (!isMounted.current) return;

      const t = timestamp * 0.001;
      timeRef.current = t;

      const p = progressRef.current;
      const W = canvas.width;
      const H = canvas.height;

      ctx.clearRect(0, 0, W, H);

      // ── Background sky gradient ──────────────────────────
      // Transitions from deep night → pre-dawn saffron as scroll progresses
      const skyGrad = ctx.createLinearGradient(0, 0, 0, H);
      const dayBlend = Math.min(p * 2, 1); // 0 = night, 1 = golden hour

      const topColor = interpolateColor(
        [5, 8, 16],   // deep night
        [28, 16, 6],  // pre-dawn brown
        dayBlend
      );
      const midColor = interpolateColor(
        [10, 14, 26],
        [80, 35, 8],
        dayBlend * 0.6
      );
      const botColor = interpolateColor(
        [15, 22, 40],
        [180, 90, 20],
        dayBlend * 0.8
      );

      skyGrad.addColorStop(0, rgbStr(topColor));
      skyGrad.addColorStop(0.4, rgbStr(midColor));
      skyGrad.addColorStop(1, rgbStr(botColor));
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, W, H);

      // ── Stars (fade as day comes) ────────────────────────
      const starOpacity = Math.max(0, 1 - dayBlend * 2);
      if (starOpacity > 0.01) {
        stars.forEach((star, i) => {
          const twinkle = 0.6 + 0.4 * Math.sin(t * star.speed * 2 + star.twinkle * Math.PI * 2);
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(240, 220, 160, ${starOpacity * twinkle * 0.8})`;
          ctx.fill();
        });
      }

      // ── Sun / golden orb ───────────────────────────────────
      const sunRise = Math.max(0, (p - 0.15) / 0.5);
      if (sunRise > 0) {
        const sunX = W * 0.62;
        const sunY = H * (0.55 - sunRise * 0.25);
        const sunR = W * 0.06;

        // Outer glow
        const sunGlow = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR * 6);
        sunGlow.addColorStop(0, `rgba(255, 180, 50, ${sunRise * 0.15})`);
        sunGlow.addColorStop(0.3, `rgba(232, 130, 26, ${sunRise * 0.08})`);
        sunGlow.addColorStop(1, "rgba(0,0,0,0)");
        ctx.fillStyle = sunGlow;
        ctx.fillRect(0, 0, W, H);

        // Core
        const sunCore = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunR);
        sunCore.addColorStop(0, `rgba(255, 240, 180, ${sunRise * 0.95})`);
        sunCore.addColorStop(0.4, `rgba(255, 200, 80, ${sunRise * 0.7})`);
        sunCore.addColorStop(1, `rgba(232, 130, 26, 0)`);
        ctx.fillStyle = sunCore;
        ctx.fillRect(0, 0, W, H);
      }

      // ── Atmospheric haze layer ────────────────────────────
      const hazeGrad = ctx.createLinearGradient(0, H * 0.4, 0, H * 0.75);
      hazeGrad.addColorStop(0, "rgba(0,0,0,0)");
      hazeGrad.addColorStop(1, `rgba(${lerp3([10,14,26],[120,60,15],dayBlend*0.5)}, ${0.35 + dayBlend * 0.2})`);
      ctx.fillStyle = hazeGrad;
      ctx.fillRect(0, H * 0.4, W, H * 0.35);

      // ── Temple silhouette ─────────────────────────────────
      drawTemple(ctx, W, H, p, dayBlend);

      // ── Yamuna river ──────────────────────────────────────
      drawRiver(ctx, W, H, t, p, dayBlend);

      // ── Light rays (from sun) ─────────────────────────────
      if (sunRise > 0.1) {
        drawLightRays(ctx, W, H, W * 0.62, H * (0.55 - sunRise * 0.25), sunRise, t);
      }

      // ── Foreground vignette ────────────────────────────────
      const vignette = ctx.createRadialGradient(W/2, H/2, W*0.25, W/2, H/2, W*0.75);
      vignette.addColorStop(0, "rgba(0,0,0,0)");
      vignette.addColorStop(1, "rgba(0,0,0,0.55)");
      ctx.fillStyle = vignette;
      ctx.fillRect(0, 0, W, H);

      rafId.current = requestAnimationFrame(draw);
    };

    rafId.current = requestAnimationFrame(draw);
    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
    };
  }, []);

  useEffect(() => {
    isMounted.current = true;
    return () => { isMounted.current = false; };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 block"
      aria-hidden="true"
    />
  );
});

// ── Utility functions ──────────────────────────────────────────────────

function interpolateColor(a: number[], b: number[], t: number): number[] {
  return a.map((v, i) => Math.round(v + (b[i] - v) * Math.min(Math.max(t, 0), 1)));
}

function lerp3(a: number[], b: number[], t: number): string {
  const r = interpolateColor(a, b, t);
  return `${r[0]},${r[1]},${r[2]}`;
}

function rgbStr(c: number[]): string {
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

function drawTemple(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  progress: number,
  dayBlend: number
) {
  const baseY = H * 0.72;
  const scale = W / 1920;

  // Temple silhouette color
  const r = Math.round(8 + dayBlend * 15);
  const g = Math.round(6 + dayBlend * 8);
  const b = Math.round(12 + dayBlend * 5);
  const alpha = 0.85 + dayBlend * 0.1;

  ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`;
  ctx.beginPath();

  // Main shikhara (tower) — center
  const cx = W * 0.38;
  // Base
  ctx.moveTo(cx - 80 * scale, baseY);
  ctx.lineTo(cx - 80 * scale, baseY - 60 * scale);
  ctx.lineTo(cx - 60 * scale, baseY - 80 * scale);
  ctx.lineTo(cx - 40 * scale, baseY - 280 * scale);
  ctx.lineTo(cx - 20 * scale, baseY - 340 * scale);
  ctx.lineTo(cx, baseY - 380 * scale);
  ctx.lineTo(cx + 20 * scale, baseY - 340 * scale);
  ctx.lineTo(cx + 40 * scale, baseY - 280 * scale);
  ctx.lineTo(cx + 60 * scale, baseY - 80 * scale);
  ctx.lineTo(cx + 80 * scale, baseY - 60 * scale);
  ctx.lineTo(cx + 80 * scale, baseY);

  // Secondary tower (left)
  const lx = cx - 160 * scale;
  ctx.lineTo(lx + 50 * scale, baseY);
  ctx.lineTo(lx + 50 * scale, baseY - 40 * scale);
  ctx.lineTo(lx + 35 * scale, baseY - 55 * scale);
  ctx.lineTo(lx + 20 * scale, baseY - 200 * scale);
  ctx.lineTo(lx + 10 * scale, baseY - 230 * scale);
  ctx.lineTo(lx, baseY - 255 * scale);
  ctx.lineTo(lx - 10 * scale, baseY - 230 * scale);
  ctx.lineTo(lx - 20 * scale, baseY - 200 * scale);
  ctx.lineTo(lx - 35 * scale, baseY - 55 * scale);
  ctx.lineTo(lx - 50 * scale, baseY - 40 * scale);
  ctx.lineTo(lx - 50 * scale, baseY);

  // Ground level fill
  ctx.lineTo(0, baseY);
  ctx.lineTo(0, H);
  ctx.lineTo(W, H);
  ctx.lineTo(W, baseY);
  ctx.lineTo(cx + 200 * scale, baseY);

  // Right tower
  const rx = cx + 200 * scale;
  ctx.lineTo(rx + 50 * scale, baseY);
  ctx.lineTo(rx + 50 * scale, baseY - 40 * scale);
  ctx.lineTo(rx + 35 * scale, baseY - 55 * scale);
  ctx.lineTo(rx + 20 * scale, baseY - 180 * scale);
  ctx.lineTo(rx + 10 * scale, baseY - 210 * scale);
  ctx.lineTo(rx, baseY - 235 * scale);
  ctx.lineTo(rx - 10 * scale, baseY - 210 * scale);
  ctx.lineTo(rx - 20 * scale, baseY - 180 * scale);
  ctx.lineTo(rx - 35 * scale, baseY - 55 * scale);
  ctx.lineTo(rx - 50 * scale, baseY - 40 * scale);
  ctx.lineTo(rx - 50 * scale, baseY);

  ctx.closePath();
  ctx.fill();
}

function drawRiver(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  t: number,
  progress: number,
  dayBlend: number
) {
  const riverTop = H * 0.73;
  const riverH = H * 0.27;

  // River base color — deep teal to golden
  const riverGrad = ctx.createLinearGradient(0, riverTop, 0, H);
  riverGrad.addColorStop(
    0,
    `rgba(${Math.round(20 + dayBlend * 80)}, ${Math.round(30 + dayBlend * 60)}, ${Math.round(50 + dayBlend * 20)}, 0.9)`
  );
  riverGrad.addColorStop(1, `rgba(5, 8, 16, 1)`);
  ctx.fillStyle = riverGrad;
  ctx.fillRect(0, riverTop, W, riverH);

  // Ripple reflections
  const reflectionAlpha = 0.06 + dayBlend * 0.08;
  for (let i = 0; i < 8; i++) {
    const y = riverTop + (i / 8) * riverH * 0.6;
    const waveOffset = Math.sin(t * 0.7 + i * 1.3) * 12;
    const grad = ctx.createLinearGradient(0, y, W, y);
    grad.addColorStop(0, `rgba(255,200,80,0)`);
    grad.addColorStop(0.3 + waveOffset / W, `rgba(255,200,80,${reflectionAlpha})`);
    grad.addColorStop(0.7 + waveOffset / W, `rgba(232,130,26,${reflectionAlpha * 0.5})`);
    grad.addColorStop(1, `rgba(255,200,80,0)`);
    ctx.fillStyle = grad;
    ctx.fillRect(0, y, W, 2);
  }
}

function drawLightRays(
  ctx: CanvasRenderingContext2D,
  W: number,
  H: number,
  sx: number,
  sy: number,
  intensity: number,
  t: number
) {
  const RAY_COUNT = 8;
  ctx.save();
  ctx.globalCompositeOperation = "screen";

  for (let i = 0; i < RAY_COUNT; i++) {
    const angle = (i / RAY_COUNT) * Math.PI * 2 + t * 0.03;
    const spread = 0.15 + Math.sin(t * 0.5 + i) * 0.05;
    const length = Math.max(W, H) * 1.2;

    const x1 = sx + Math.cos(angle - spread) * length;
    const y1 = sy + Math.sin(angle - spread) * length;
    const x2 = sx + Math.cos(angle + spread) * length;
    const y2 = sy + Math.sin(angle + spread) * length;

    const rayGrad = ctx.createLinearGradient(sx, sy, (x1 + x2) / 2, (y1 + y2) / 2);
    rayGrad.addColorStop(0, `rgba(255, 200, 80, ${intensity * 0.12})`);
    rayGrad.addColorStop(1, "rgba(255, 200, 80, 0)");

    ctx.fillStyle = rayGrad;
    ctx.beginPath();
    ctx.moveTo(sx, sy);
    ctx.lineTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

export default CanvasFallback;
