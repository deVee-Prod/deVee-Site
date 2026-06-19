import { useEffect, useRef, useCallback } from 'react';

/* ─── Tunables ─── */
const PARTICLE_COUNT_DESKTOP = 80;
const PARTICLE_COUNT_MOBILE  = 40;   // lighter on mobile
const DEPTH_LAYERS   = 3;
const BASE_SPEED     = 0.15;

/* Warm accent palette */
const COLORS = [
  [255, 160, 60],   // warm orange
  [255, 200, 120],  // soft amber
  [255, 230, 180],  // pale gold
  [255, 255, 240],  // near-white
  [234, 88, 12],    // brand orange
];

interface Particle {
  x: number;
  y: number;
  z: number;
  radius: number;
  baseRadius: number;
  color: number[];
  alpha: number;
  baseAlpha: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  drift: number;
  phase: number;
  pulseSpeed: number;
}

function createParticle(w: number, h: number): Particle {
  const z     = Math.random();
  const layer = Math.floor(z * DEPTH_LAYERS) / DEPTH_LAYERS;

  const fromLeft = Math.random() < 0.5;
  const x = fromLeft
    ? -10 + Math.random() * w * 0.18
    : w * 0.82 + Math.random() * w * 0.18 + 10;

  const y = Math.random() * h;

  const baseRadius = 0.6 + layer * 2.2 + Math.random() * 1.2;
  const baseAlpha  = 0.08 + layer * 0.22 + Math.random() * 0.12;
  const speed      = BASE_SPEED * (0.4 + layer * 1.2);

  const vx = fromLeft ? speed : -speed;
  const vy = (Math.random() - 0.5) * speed * 0.3;

  return {
    x, y, z,
    radius: baseRadius,
    baseRadius,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    alpha: baseAlpha,
    baseAlpha,
    vx,
    vy,
    baseVx: vx,
    baseVy: vy,
    drift: 8 + Math.random() * 18,
    phase: Math.random() * Math.PI * 2,
    pulseSpeed: 0.003 + Math.random() * 0.008,
  };
}

export function HeroParticles() {
  const canvasRef   = useRef<HTMLCanvasElement>(null);
  const particles   = useRef<Particle[]>([]);
  const raf         = useRef<number>(0);
  const time        = useRef(0);
  const hoverBoost  = useRef(0);   // 0 → 1 smoothly
  const dims        = useRef({ w: 0, h: 0 }); // cached dimensions — scroll-safe
  const isHovering  = useRef(false);

  /* ---- called from HeroSection on logo hover ---- */
  const setHover = useCallback((hovering: boolean) => {
    isHovering.current = hovering;
  }, []);

  /* expose setHover on the canvas element via a data attribute ref */
  useEffect(() => {
    const el = canvasRef.current;
    if (el) (el as any).__setHover = setHover;
  }, [setHover]);

  const initParticles = useCallback((w: number, h: number) => {
    const isMobile = w < 768;
    const count = isMobile ? PARTICLE_COUNT_MOBILE : PARTICLE_COUNT_DESKTOP;
    particles.current = Array.from({ length: count }, () =>
      createParticle(w, h),
    );
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      dims.current = { w: rect.width, h: rect.height };
      canvas.width  = rect.width  * dpr;
      canvas.height = rect.height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles(rect.width, rect.height);
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      const { w, h } = dims.current; // cached — not affected by scroll
      ctx.clearRect(0, 0, w, h);
      time.current += 1;

      /* smooth ease toward target hover state */
      const target = isHovering.current ? 1 : 0;
      hoverBoost.current += (target - hoverBoost.current) * 0.045;

      /* On hover: reverse direction (outward) + speed boost */
      const boostAmt  = hoverBoost.current;
      const speedMul  = 1 + boostAmt * 3.5;              // up to 4.5× speed
      const dirMul    = 1 - boostAmt * 2;                 // 1 → −1 (reverses)
      const alphaMul  = 1 + boostAmt * 0.6;              // brighter glow
      const radiusMul = 1 + boostAmt * 0.35;             // slightly larger

      for (const p of particles.current) {
        /* move — dirMul flips direction on hover so particles fly outward */
        p.x += p.baseVx * speedMul * dirMul;
        p.y += p.baseVy * speedMul + Math.sin(time.current * 0.012 + p.phase) * 0.12;

        const yOff = Math.sin(time.current * 0.006 + p.phase) * p.drift;

        const pulse = 0.85 + 0.15 * Math.sin(time.current * p.pulseSpeed + p.phase);
        const alpha = p.baseAlpha * pulse * alphaMul;
        const r     = p.baseRadius * (0.9 + 0.1 * pulse) * radiusMul;

        const [cr, cg, cb] = p.color;
        const grd = ctx.createRadialGradient(p.x, p.y + yOff, 0, p.x, p.y + yOff, r * 3);
        grd.addColorStop(0,   `rgba(${cr},${cg},${cb},${alpha})`);
        grd.addColorStop(0.4, `rgba(${cr},${cg},${cb},${alpha * 0.4})`);
        grd.addColorStop(1,   `rgba(${cr},${cg},${cb},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y + yOff, r * 3, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(p.x, p.y + yOff, r * 0.45, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${cr},${cg},${cb},${Math.min(alpha * 1.8, 0.7)})`;
        ctx.fill();

        if (p.x < -20 || p.x > w + 20 || p.y < -20 || p.y > h + 20) {
          Object.assign(p, createParticle(w, h));
        }
      }
      raf.current = requestAnimationFrame(draw);
    };
    raf.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('resize', resize);
    };
  }, [initParticles]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
      aria-hidden="true"
    />
  );
}
