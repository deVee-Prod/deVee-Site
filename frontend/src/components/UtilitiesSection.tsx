import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GOLD = "rgba(234, 179, 8, 0.85)";

const premiumTools = [
  { name: "Reels Dubber", link: "https://reels-dubber.devee-music.com/", img: "/reelsdubberlogo.png", color: GOLD },
  { name: "Reels Cutter", link: "https://reels-cutter.devee-music.com/", img: "/reelscutterlogo.png", color: GOLD },
  { name: "Reels Motion", link: "https://reels-motion.devee-music.com/", img: "/reels-motion-icon.png", color: GOLD },
];

const utilities = [
  { name: "Storm Form", link: "https://storm-form.devee-music.com", img: "/stormformicon.png", color: "rgba(59, 130, 246, 0.85)" },
  { name: "BPM Calculator", link: "https://bpm-calculator.devee-music.com", img: "/bpmcalculatorlogo.png", color: "rgba(236, 72, 153, 0.85)" },
  { name: "File Converter", link: "https://file-converter.devee-music.com", img: "/fileconverterlogo.png", color: "rgba(239, 68, 68, 0.85)" },
  { name: "PDF Killer", link: "https://pdf-killer.devee-music.com", img: "/pdfkillerlogo.png", color: "rgba(34, 197, 94, 0.85)" },
  { name: "Flash Juice", link: "https://flash-juice.devee-music.com", img: "/flashjuicelogo.png", color: "rgba(249, 115, 22, 0.85)" },
  { name: "Release Ready", link: "https://release-ready.devee-music.com", img: "/Release%20ready%20icon.png", color: "rgba(234, 179, 8, 0.85)" },
];

// ─────────────────────────────────────────────
// Mobile tool icon (unchanged from original)
// ─────────────────────────────────────────────
function ToolIcon({ tool, compact = false }: { tool: typeof utilities[0], compact?: boolean }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 group flex flex-col items-center ${compact ? 'w-[82px] md:w-auto snap-start' : 'w-[105px] md:w-auto snap-center'}`}
    >
      <div
        className={`${compact ? 'w-14 h-14' : 'w-16 h-16'} rounded-full overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl`}
        onMouseEnter={(e) => {
          e.currentTarget.style.boxShadow = `0 0 25px ${tool.color}`;
          e.currentTarget.style.borderColor = tool.color;
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.boxShadow = 'none';
          e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
        }}
      >
        <img src={tool.img} alt={tool.name} className="w-full h-full object-cover" />
      </div>
      <span className={`mt-3 ${compact ? 'text-[6px] tracking-[0.12em]' : 'text-[7px] tracking-[0.2em]'} text-white/40 font-bold uppercase text-center whitespace-nowrap transition-colors duration-300 group-hover:text-white`}>
        {tool.name}
      </span>
    </a>
  );
}

// ─────────────────────────────────────────────
// Desktop Solar System (Unchanged)
// ─────────────────────────────────────────────
function SolarSystem() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  const OUTER_RX = 720;
  const OUTER_RY = 200;
  const INNER_RX = 450;
  const INNER_RY = 120;
  const SPEED = 0.018;
  const W = 1600;
  const H = 650;
  const CX = W / 2;
  const CY = H / 2;

  const [outerAngles, setOuterAngles] = useState(() =>
    premiumTools.map((_, i) => (i * 360) / premiumTools.length)
  );
  const [innerAngles, setInnerAngles] = useState(() =>
    utilities.map((_, i) => (i * 360) / utilities.length)
  );

  useEffect(() => {
    let paused = false;
    const onVisibility = () => { paused = document.hidden; };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = time - lastTimeRef.current;
      lastTimeRef.current = time;

      if (!paused && !hoveredTool) {
        const step = SPEED * delta;
        setOuterAngles(prev => prev.map(a => (a + step) % 360));
        setInnerAngles(prev => prev.map(a => (a - step * 0.7) % 360));
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hoveredTool]);

  const toXY = (angleDeg: number, rx: number, ry: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: CX + rx * Math.cos(rad),
      y: CY + ry * Math.sin(rad),
    };
  };

  const outerItems = premiumTools.map((tool, i) => {
    const pos = toXY(outerAngles[i], OUTER_RX, OUTER_RY);
    return { tool, pos, angle: outerAngles[i], orbit: 'outer' as const, i };
  });
  const innerItems = utilities.map((tool, i) => {
    const pos = toXY(innerAngles[i], INNER_RX, INNER_RY);
    return { tool, pos, angle: innerAngles[i], orbit: 'inner' as const, i };
  });
  const allItems = [...outerItems, ...innerItems].sort((a, b) => a.pos.y - b.pos.y);

  const iconSize = (orbit: 'outer' | 'inner', angle: number) => {
    const sinVal = Math.sin((angle * Math.PI) / 180);
    const base = orbit === 'outer' ? 58 : 50;
    return base + sinVal * 7;
  };

  return (
    <div className="relative select-none w-full" style={{ height: H, marginTop: '-30px' }}>
      <div style={{ position: 'absolute', width: W, height: H, left: '50%', transform: 'translateX(-50%)' }}>
        <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <defs>
            <linearGradient id="orbitGradOuter" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0)" />
              <stop offset="40%" stopColor="rgba(234,179,8,0.35)" />
              <stop offset="60%" stopColor="rgba(234,179,8,0.35)" />
              <stop offset="100%" stopColor="rgba(234,179,8,0)" />
            </linearGradient>
            <linearGradient id="orbitGradInner" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0)" />
              <stop offset="40%" stopColor="rgba(234,179,8,0.2)" />
              <stop offset="60%" stopColor="rgba(234,179,8,0.2)" />
              <stop offset="100%" stopColor="rgba(234,179,8,0)" />
            </linearGradient>
            <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="12" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="sunGradientOrange">
              <stop offset="0%" stopColor="#fff" />
              <stop offset="30%" stopColor="#f97316" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
            </radialGradient>
          </defs>
          <ellipse cx={CX} cy={CY} rx={OUTER_RX} ry={OUTER_RY} fill="none" stroke="url(#orbitGradOuter)" strokeWidth="1" />
          <ellipse cx={CX} cy={CY} rx={OUTER_RX + 2} ry={OUTER_RY + 1} fill="none" stroke="rgba(234,179,8,0.07)" strokeWidth="0.5" />
          <ellipse cx={CX} cy={CY} rx={INNER_RX} ry={INNER_RY} fill="none" stroke="url(#orbitGradInner)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r="48" fill="rgba(234,179,8,0.06)" />
          <circle cx={CX} cy={CY} r="24" fill="rgba(234,179,8,0.13)" />
          <g filter="url(#starGlow)">
            <circle cx={CX} cy={CY} r="35" fill="rgba(249, 115, 22, 0.15)">
              <animate attributeName="r" values="32;38;32" dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={CX} cy={CY} r="12" fill="url(#sunGradientOrange)" />
          </g>
        </svg>

        {allItems.map(({ tool, pos, orbit, angle, i }) => {
          const size = iconSize(orbit, angle);
          const isHovered = hoveredTool === `${orbit}-${i}`;
          const isPremium = orbit === 'outer';
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const opacity = 0.55 + 0.45 * ((sinVal + 1) / 2);
          return (
            <a key={`${orbit}-${i}`} href={tool.link} target="_blank" rel="noopener noreferrer"
              onMouseEnter={() => setHoveredTool(`${orbit}-${i}`)} onMouseLeave={() => setHoveredTool(null)}
              style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', zIndex: Math.round(pos.y), opacity, transition: 'opacity 0.2s' }}
              className="group flex flex-col items-center">
              <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `1.5px solid ${isHovered ? tool.color : 'rgba(255,255,255,0.12)'}`, boxShadow: isHovered ? `0 0 20px ${tool.color}, 0 0 40px ${tool.color.replace('0.85', '0.3')}` : isPremium ? '0 0 10px rgba(234,179,8,0.2)' : 'none', transition: 'box-shadow 0.3s, border-color 0.3s, width 0.2s, height 0.2s', flexShrink: 0 }}>
                <img src={tool.img} alt={tool.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <span style={{ marginTop: 6, fontSize: '7px', letterSpacing: '0.2em', color: 'rgba(255,255,255,0.9)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap', textShadow: `0 0 8px ${tool.color}`, opacity: isHovered ? 1 : 0, transition: 'opacity 0.25s', pointerEvents: 'none' }}>
                {tool.name}
              </span>
            </a>
          );
        })}

        <div style={{ position: 'absolute', top: CY - OUTER_RY - 55, left: '50%', transform: 'translateX(-50%)', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(234,179,8,0.7)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          ★ Premium Tools ★
        </div>
        <div style={{ position: 'absolute', top: CY + OUTER_RY + 45, left: '50%', transform: 'translateX(-50%)', fontSize: 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
          Free Tools
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Mobile Arc Scroll Helper
// ─────────────────────────────────────────────
function ArcScroll({ tools, compact, scrollRef, invert = false }: { tools: any[], compact?: boolean, scrollRef: React.RefObject<HTMLDivElement>, invert?: boolean }) {
  const itemsRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const updateArc = () => {
      if (!scrollRef || !scrollRef.current) return;
      const container = scrollRef.current;
      const containerCenter = container.scrollLeft + container.clientWidth / 2;

      itemsRef.current.forEach((item) => {
        if (!item) return;
        const itemCenter = item.offsetLeft + item.offsetWidth / 2;
        const dist = Math.abs(containerCenter - itemCenter);
        const maxDist = container.clientWidth / 1.5; 
        const ratio = Math.min(dist / maxDist, 1);

        const intensity = invert ? 45 : -45;
        const translateY = Math.pow(ratio, 2) * intensity; 
        const scale = 1 - (ratio * 0.25);

        item.style.transform = `translateY(${translateY}px) scale(${scale})`;
      });
    };

    const container = scrollRef.current;
    if (container) {
      container.addEventListener('scroll', updateArc);
      setTimeout(updateArc, 100);
      window.addEventListener('resize', updateArc);
      return () => {
        container.removeEventListener('scroll', updateArc);
        window.removeEventListener('resize', updateArc);
      };
    }
  }, [scrollRef, invert]);

  return (
    <div className="relative">
      <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-black to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-black to-transparent pointer-events-none z-10" />
      <div 
        ref={scrollRef} 
        className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory pb-12 pt-12 gap-4 relative z-0 scroll-smooth"
        style={{ paddingLeft: 'calc(50vw - 40px)', paddingRight: 'calc(50vw - 40px)' }}
      >
        {tools.map((tool, index) => (
          <div key={index} ref={el => { itemsRef.current[index] = el; }} className="snap-center flex-shrink-0 origin-center">
            <ToolIcon tool={tool} compact={compact} />
          </div>
        ))}
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────
// Main section
// ─────────────────────────────────────────────
export function UtilitiesSection() {
  const premiumScrollRef = useRef<HTMLDivElement>(null);
  const freeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const centerCarousels = () => {
      if (premiumScrollRef.current) {
        const el = premiumScrollRef.current;
        const mid = el.children[1] as HTMLElement; 
        if (mid) el.scrollLeft = mid.offsetLeft + (mid.offsetWidth / 2) - (el.clientWidth / 2);
      }
      if (freeScrollRef.current) {
        const el = freeScrollRef.current;
        const mid = el.children[2] as HTMLElement; 
        if (mid) el.scrollLeft = mid.offsetLeft + (mid.offsetWidth / 2) - (el.clientWidth / 2);
      }
    };

    centerCarousels();
    setTimeout(centerCarousels, 150);
    setTimeout(centerCarousels, 400);

    setTimeout(() => {
      if (freeScrollRef.current) {
        const el = freeScrollRef.current;
        const mid = el.children[2] as HTMLElement;
        const center = mid ? mid.offsetLeft + (mid.offsetWidth / 2) - (el.clientWidth / 2) : 0;
        el.scrollBy({ left: 30, behavior: 'smooth' });
        setTimeout(() => el.scrollTo({ left: center, behavior: 'smooth' }), 450);
      }
    }, 1000);
  }, []);

  return (
    <section className="py-12 bg-black overflow-x-hidden" id="utilities">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="flex flex-col items-center relative z-10">
          <img src="/tools%20for%20artists.png" alt="Tools for Artists" className="max-w-[250px] md:max-w-[400px] h-auto object-contain" />
        </div>

        {/* Desktop */}
        <div className="hidden md:flex flex-col items-center justify-center">
          <SolarSystem />
        </div>

        {/* Mobile */}
        <div className="md:hidden relative min-h-[520px] flex flex-col justify-center gap-4 -mt-4">
          
          <div className="absolute left-1/2 top-[47%] transform -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0">
            <svg width="800" height="400" viewBox="0 0 800 400">
              <defs>
                <filter id="mobileStarGlow" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur stdDeviation="15" result="blur" />
                  <feComposite in="SourceGraphic" in2="blur" operator="over" />
                </filter>
                <radialGradient id="mobileSunGradient">
                  <stop offset="0%" stopColor="#fff" />
                  <stop offset="30%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
                </radialGradient>
                
                {/* תיקון הגרדיאנטים:
                  ה-Opacity הופחת משמעותית (המקסימום הוא רק 0.12 לזהב ו-0.08 לכסף)
                  והם דוהים לאפס מוחלט ב-20% וב-80% כדי שלא ייחתכו בקצוות המסך!
                */}
                <linearGradient id="mobOrbitOuter" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(234,179,8,0)" />
                  <stop offset="20%" stopColor="rgba(234,179,8,0)" />
                  <stop offset="40%" stopColor="rgba(234,179,8,0.08)" />
                  <stop offset="50%" stopColor="rgba(234,179,8,0.12)" />
                  <stop offset="60%" stopColor="rgba(234,179,8,0.08)" />
                  <stop offset="80%" stopColor="rgba(234,179,8,0)" />
                  <stop offset="100%" stopColor="rgba(234,179,8,0)" />
                </linearGradient>

                <linearGradient id="mobOrbitInner" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="15%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="35%" stopColor="rgba(255,255,255,0.04)" />
                  <stop offset="50%" stopColor="rgba(255,255,255,0.08)" />
                  <stop offset="65%" stopColor="rgba(255,255,255,0.04)" />
                  <stop offset="85%" stopColor="rgba(255,255,255,0)" />
                  <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                </linearGradient>
              </defs>

              {/* הוסרו הקווים הקשיחים (solid), נשארנו רק עם המעברים החלקים והעדינים */}
              <ellipse cx="400" cy="200" rx="260" ry="110" fill="none" stroke="url(#mobOrbitOuter)" strokeWidth="1" />
              <ellipse cx="400" cy="200" rx="190" ry="60" fill="none" stroke="url(#mobOrbitInner)" strokeWidth="1" />

              <g filter="url(#mobileStarGlow)">
                <circle cx="400" cy="200" r="50" fill="rgba(249, 115, 22, 0.12)">
                  <animate attributeName="r" values="45;55;45" dur="3s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.5;0.3" dur="3s" repeatCount="indefinite" />
                </circle>
                <circle cx="400" cy="200" r="15" fill="url(#mobileSunGradient)" />
              </g>
            </svg>
          </div>

          {/* Premium Tools */}
          <div className="relative z-10 mb-4">
            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/40" />
              <span className="text-[9px] tracking-[0.35em] font-bold uppercase text-yellow-400/80">★ Premium ★</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/40" />
            </div>
            <ArcScroll tools={premiumTools} scrollRef={premiumScrollRef} invert={false} />
          </div>

          {/* Free Tools */}
          <div className="relative z-10 mt-12">
            <ArcScroll tools={utilities} compact={true} scrollRef={freeScrollRef} invert={true} />
            
            <div className="flex items-center justify-center gap-3 mt-1 mb-3">
              <ChevronLeft className="w-3 h-3 text-white/20 scroll-hint-left" />
              <span className="text-[8px] tracking-[0.35em] text-white/20 uppercase font-bold">Scroll</span>
              <ChevronRight className="w-3 h-3 text-white/20 scroll-hint-right" />
            </div>

            <div className="flex items-center justify-center gap-4 mb-2">
              <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/50" />
              <span className="text-[9px] tracking-[0.35em] font-bold uppercase text-white">Free Tools</span>
              <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/50" />
            </div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes nudge-left {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50% { transform: translateX(-4px); opacity: 0.5; }
        }
        @keyframes nudge-right {
          0%, 100% { transform: translateX(0); opacity: 0.2; }
          50% { transform: translateX(4px); opacity: 0.5; }
        }
        .scroll-hint-left { animation: nudge-left 1.8s ease-in-out infinite; }
        .scroll-hint-right { animation: nudge-right 1.8s ease-in-out infinite; animation-delay: 0.9s; }
      `}} />
    </section>
  );
}