import { useRef, useState, useCallback, useEffect } from 'react';
import { HeroParticles } from './HeroParticles';

const HERO_GREETING = 'Welcome to my world :)';

export function HeroSection() {
  const imgWrapRef = useRef<HTMLDivElement>(null);
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, scale: 1 });
  const [typedText, setTypedText] = useState('');
  const [greetingState, setGreetingState] = useState<'idle' | 'typing' | 'done' | 'faded'>('idle');

  /* Capture the canvas ref once HeroParticles mounts */
  const heroRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    if (prefersReduced) {
      setTypedText(HERO_GREETING);
      setGreetingState('done');
      const fadeTimer = window.setTimeout(() => setGreetingState('faded'), 4500);
      return () => window.clearTimeout(fadeTimer);
    }

    let cancelled = false;
    let timerId: number | undefined;

    const startTyping = () => {
      if (cancelled) return;
      setGreetingState('typing');
      let i = 0;

      const step = () => {
        if (cancelled) return;
        i += 1;
        setTypedText(HERO_GREETING.slice(0, i));
        if (i >= HERO_GREETING.length) {
          setGreetingState('done');
          timerId = window.setTimeout(() => {
            if (!cancelled) setGreetingState('faded');
          }, 4500);
          return;
        }
        const ch = HERO_GREETING[i - 1];
        let delay = 52 + Math.random() * 34;
        if (HERO_GREETING.slice(i, i + 2) === ':)') delay = 280;
        else if (ch === ' ') delay = 85;
        timerId = window.setTimeout(step, delay);
      };

      timerId = window.setTimeout(step, 80);
    };

    timerId = window.setTimeout(startTyping, 420);
    return () => {
      cancelled = true;
      if (timerId !== undefined) window.clearTimeout(timerId);
    };
  }, []);

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
      className="relative flex flex-col items-center justify-center min-h-[calc(100svh-60px)] md:min-h-[85vh] pt-6 sm:pt-14 pb-0 px-4 sm:px-6 overflow-hidden"
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
          {/* Minimalist terminal greeting floating right above the portrait, fades out cleanly after 4.5s */}
          <p
            dir="ltr"
            aria-label={HERO_GREETING}
            className={`pointer-events-none absolute -top-7 sm:-top-8 left-1/2 -translate-x-1/2 whitespace-nowrap font-mono text-[10px] sm:text-[11px] tracking-[0.16em] text-white/65 inline-flex items-center transition-opacity duration-1000 ease-out ${
              greetingState === 'idle' || greetingState === 'faded' ? 'opacity-0' : 'opacity-100'
            }`}
          >
            <span className="text-orange-400/80 mr-1.5 select-none" aria-hidden="true">&gt;</span>
            <span>{typedText}</span>
            <span
              aria-hidden="true"
              className="hero-term-cursor inline-block w-[5px] h-[11px] bg-orange-500/90 rounded-[1px] ml-[3px] shadow-[0_0_8px_rgba(249,115,22,0.55)]"
            />
          </p>
          <div
            className="relative max-w-[14rem] sm:max-w-[22rem] md:max-w-[25rem] lg:max-w-[29rem]"
            style={{
              transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale(${tilt.scale})`,
              transition: 'transform 0.18s ease-out',
              transformStyle: 'preserve-3d',
            }}
          >
            <img
              src="/deVee-hero-v4.jpg"
              alt="deVee"
              width="725"
              height="697"
              fetchPriority="high"
              loading="eager"
              className="relative z-10 w-full h-auto mix-blend-screen"
              style={{ maskImage: 'radial-gradient(circle, black 45%, transparent 72%)', WebkitMaskImage: 'radial-gradient(circle, black 45%, transparent 72%)' }}
            />
            {/* Orange glow on LEFT side */}
            <div
              className="absolute -z-10 pointer-events-none top-[-10%] bottom-[-10%] hidden md:block transition-opacity duration-500 ease-out"
              style={{
                left: '-40%',
                width: '50%',
                background: 'radial-gradient(ellipse at 70% 50%, rgba(240,62,21,0.12) 0%, rgba(240,62,21,0.05) 40%, transparent 70%)',
                opacity: tilt.scale > 1 ? 1 : 0,
                filter: 'blur(14px)',
              }}
            />
            {/* Orange glow on RIGHT side */}
            <div
              className="absolute -z-10 pointer-events-none top-[-10%] bottom-[-10%] hidden md:block transition-opacity duration-500 ease-out"
              style={{
                right: '-40%',
                width: '50%',
                background: 'radial-gradient(ellipse at 30% 50%, rgba(240,62,21,0.12) 0%, rgba(240,62,21,0.05) 40%, transparent 70%)',
                opacity: tilt.scale > 1 ? 1 : 0,
                filter: 'blur(14px)',
              }}
            />
            {/* Mobile: always-on subtle outer halo glow around logo (transparent center so portrait colors stay true) */}
            <div
              className="absolute -z-10 pointer-events-none inset-[-12%] rounded-full block md:hidden"
              style={{
                background: 'radial-gradient(circle, transparent 0%, transparent 36%, rgba(240,62,21,0.14) 50%, rgba(240,62,21,0.05) 64%, transparent 78%)',
                filter: 'blur(10px)',
                animation: 'mobileGlowPulse 4s ease-in-out infinite',
              }}
            />
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="mt-6 sm:mt-7 md:mt-8 mb-8 sm:mb-10 md:mb-12 pb-0 flex flex-col items-center gap-2">
          <div className="w-5 h-8 sm:w-6 sm:h-10 border-2 border-white/30 rounded-full flex items-start justify-center p-1.5 sm:p-2 animate-bounce opacity-70">
            <div className="w-1 h-2 sm:w-1.5 sm:h-3 bg-orange-500 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}