import { useRef, useState, useCallback } from 'react';
import { HeroParticles } from './HeroParticles';

export function HeroSection() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const canvasRef  = useRef<HTMLCanvasElement | null>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });

  /* Capture the canvas ref once HeroParticles mounts */
  const heroRef = useRef<HTMLElement>(null);

  const notifyParticles = useCallback((hovering: boolean) => {
    /* find the canvas inside this section and call its exposed hook */
    const canvas = heroRef.current?.querySelector('canvas') as any;
    if (canvas?.__setHover) canvas.__setHover(hovering);
  }, []);

  /* ---- Mouse move → 3D tilt ---- */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    const el = imgWrapRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;   // 0…1
    const y = (e.clientY - rect.top)  / rect.height;   // 0…1
    const rotateY = (x - 0.5) * 22;   // ±11°
    const rotateX = (0.5 - y) * 16;   // ±8°
    setTilt({ rotateX, rotateY, scale: 1.08 });
  }, []);

  const handleMouseEnter = useCallback(() => {
    notifyParticles(true);
  }, [notifyParticles]);

  const handleMouseLeave = useCallback(() => {
    setTilt({ rotateX: 0, rotateY: 0, scale: 1 });
    notifyParticles(false);
  }, [notifyParticles]);

  return (
    <section
      ref={heroRef}
      className="relative flex flex-col items-center justify-center min-h-[88vh] md:min-h-[85vh] pt-10 sm:pt-14 pb-0 px-4 sm:px-6 overflow-hidden"
    >
      {/* 3D Dust Particles */}
      <HeroParticles />

      {/* Main content stack */}
      <div className="relative z-10 flex flex-col items-center text-center w-full mt-auto mb-auto md:mt-auto md:mb-auto">
        {/* Profile Image with 3D tilt on hover (desktop) */}
        <div
          ref={imgWrapRef}
          className="relative pointer-events-none md:pointer-events-auto md:cursor-default"
          style={{ perspective: '800px' }}
          onMouseMove={handleMouseMove}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className="relative max-w-[14rem] sm:max-w-[22rem] md:max-w-[25rem] lg:max-w-[29rem]"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
              transition: 'transform 0.18s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/deVee Vingette 2 sized.webp"
              alt="deVee"
              fetchPriority="high"
              loading="eager"
              className="w-full h-auto mix-blend-screen"
              style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 72%)' }}
            />
            {/* Orange glow on LEFT side */}
            <div
              className="absolute top-[-10%] bottom-[-10%] hidden md:block transition-opacity duration-500 ease-out"
              style={{
                left: '-40%',
                width: '50%',
                background: 'radial-gradient(ellipse at 70% 50%, rgba(234,88,12,0.12) 0%, rgba(234,88,12,0.05) 40%, transparent 70%)',
                opacity: tilt.scale > 1 ? 1 : 0,
                filter: 'blur(14px)',
              }}
            />
            {/* Orange glow on RIGHT side */}
            <div
              className="absolute top-[-10%] bottom-[-10%] hidden md:block transition-opacity duration-500 ease-out"
              style={{
                right: '-40%',
                width: '50%',
                background: 'radial-gradient(ellipse at 30% 50%, rgba(234,88,12,0.12) 0%, rgba(234,88,12,0.05) 40%, transparent 70%)',
                opacity: tilt.scale > 1 ? 1 : 0,
                filter: 'blur(14px)',
              }}
            />
            {/* Mobile: always-on subtle glow around logo (hidden on desktop) */}
            <div
              className="absolute inset-[-12%] rounded-full block md:hidden"
              style={{
                background: 'radial-gradient(circle, rgba(234,88,12,0.13) 0%, rgba(234,88,12,0.05) 40%, transparent 65%)',
                filter: 'blur(10px)',
                animation: 'mobileGlowPulse 4s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 sm:mt-7 md:mt-8 mb-8 sm:mb-10 md:mb-12 pb-0 flex flex-col items-center gap-2 animate-pulse opacity-70">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-orange-500 rounded-full" />
          </div>
          <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.3em] text-white/60 uppercase">Scroll</span>
        </div>
      </div>
    </section>
  );
}