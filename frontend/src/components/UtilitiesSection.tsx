import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNoTabStop } from '../utils/useNoTabStop';

const GOLD = "rgba(234, 179, 8, 0.85)";

const premiumTools = [
  { name: "Reels Dubber", link: "https://reels-dubber.devee-music.com/", img: "/reelsdubberlogo.webp", color: GOLD, desc: "Automatically generate subtitles for your Reels & Shorts." },
  { name: "Reels Cutter", link: "https://reels-cutter.devee-music.com/", img: "/reelscutterlogo.webp", color: GOLD, desc: "The ultimate editor for Reels & Shorts: cut and create subtitles." },
  { name: "Reels Motion", link: "https://reels-motion.devee-music.com/", img: "/reels-motion-icon.webp", color: GOLD, desc: "Add dynamic zoom in and out effects to your Reels & Shorts." },
];

const utilities = [
  { name: "File Converter", link: "https://file-converter.devee-music.com", img: "/fileconverterlogo.webp", color: "rgba(239, 68, 68, 0.85)", desc: "Convert files easily: PNG to PDF, WAV to MP3, and much more." },
  { name: "BPM Calculator", link: "https://bpm-calculator.devee-music.com", img: "/bpmcalculatorlogo.webp", color: "rgba(236, 72, 153, 0.85)", desc: "Calculate the exact BPM for any song you input." },
  { name: "Flash Juice", link: "https://flash-juice.devee-music.com", img: "/flashjuicelogo.webp", color: "rgba(249, 115, 22, 0.85)", desc: "Create a fast-paced (sped up) version of any chosen song." },
  { name: "Release Ready", link: "https://release-ready.devee-music.com", img: "/Release%20ready%20icon.webp", color: "rgba(234, 179, 8, 0.85)", desc: "Crop your artwork exactly to 3000x3000 to fit distribution platforms perfectly." },
  { name: "PDF Killer", link: "https://pdf-killer.devee-music.com", img: "/pdfkillerlogo.webp", color: "rgba(34, 197, 94, 0.85)", desc: "A fast editing tool for filling out PDF forms." },
  { name: "Instant Font", link: "https://instant-font.devee-music.com", img: "/instant-font-logo.webp", color: "rgba(59, 130, 246, 0.85)", desc: "Instantly generate unique, aesthetic fonts for Instagram, TikTok, and more." },
];

// Dispersed color order specifically for the desktop orbit circle
const desktopUtilities = [
  utilities[0], // File Converter (Red)
  utilities[5], // Instant Font (Blue)
  utilities[2], // Flash Juice (Orange)
  utilities[4], // PDF Killer (Green)
  utilities[1], // BPM Calculator (Pink)
  utilities[3], // Release Ready (Yellow)
];



// ─────────────────────────────────────────────
// Premium Crown Icon
// ─────────────────────────────────────────────
const PremiumCrown = () => (
  <div 
    className="absolute -top-3 -right-2 z-20 pointer-events-none drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
    style={{ animation: 'floatCrown 4s ease-in-out infinite' }}
  >
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-[18px] h-[18px] md:w-[20px] md:h-[20px]">
      <defs>
        <linearGradient id="crownGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fde047" /> {/* yellow-300 */}
          <stop offset="40%" stopColor="#f59e0b" /> {/* amber-500 */}
          <stop offset="100%" stopColor="#ea580c" /> {/* orange-600 */}
        </linearGradient>
      </defs>
      <path 
        d="M2.5 19h19v2h-19v-2zm16.84-14.89l-3.23 8.3-4.11-6.17-4.11 6.17-3.23-8.3c-.22-.57.34-1.07.88-.85l4.8 2.05 1.66-6.66c.14-.58.98-.58 1.12 0l1.66 6.66 4.8-2.05c.54-.22 1.1.28.88.85z" 
        fill="url(#crownGrad)" 
      />
    </svg>
  </div>
);

// ─────────────────────────────────────────────
// Mobile tool icon (unchanged from original)
// ─────────────────────────────────────────────
function ToolIcon({ tool, compact = false, isPremium = false }: { tool: typeof utilities[0], compact?: boolean, isPremium?: boolean }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 group flex flex-col items-center md:w-auto snap-center`}
      style={compact ? { width: 'calc((100vw - 32px) / 3)' } : { width: '105px' }}
    >
      <div className="relative">
        <div
          className={`${compact ? 'w-12 h-12' : 'w-16 h-16'} rounded-full overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl`}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 0 25px ${tool.color}`;
            e.currentTarget.style.borderColor = tool.color;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = 'none';
            e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.1)';
          }}
        >
          <img src={tool.img} alt={tool.name} loading="lazy" className="w-full h-full object-cover" />
        </div>
        
        {isPremium && <PremiumCrown />}
      </div>
      <span className={`mt-3 ${compact ? 'text-[6px] tracking-[0.12em]' : 'text-[7px] tracking-[0.2em]'} text-white/40 font-bold uppercase text-center whitespace-nowrap transition-colors duration-300 group-hover:text-white`}>
        {tool.name}
      </span>
    </a>
  );
}

// ─────────────────────────────────────────────
// Desktop Solar System (True 3D Perspective)
// ─────────────────────────────────────────────
function SolarSystem() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<typeof premiumTools[0] | null>(null);
  const [stageWidth, setStageWidth] = useState(1360);
  const stageRef = useRef<HTMLDivElement>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const updateWidth = () => {
      const vw = typeof window !== 'undefined' ? window.innerWidth : 1360;
      const measured = stageRef.current?.getBoundingClientRect().width || vw;
      // Wide cinematic feel while safely staying inside the viewport & scrollbar
      setStageWidth(Math.min(1440, Math.max(740, Math.min(vw - 24, measured))));
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const W = stageWidth;
  const H = 560;
  const CX = W / 2;
  const CY = 265;
  const OUTER_RX = Math.min(620, Math.max(320, W * 0.44));
  const OUTER_RY = 192;
  const INNER_RX = OUTER_RX * 0.62;
  const INNER_RY = 112;
  const SPEED = 0.015;

  // Mirror-symmetric starting phases (left/right balanced from frame 1)
  const [outerAngles, setOuterAngles] = useState(() =>
    premiumTools.map((_, i) => (30 + (i * 360) / premiumTools.length) % 360)
  );
  const [innerAngles, setInnerAngles] = useState(() =>
    desktopUtilities.map((_, i) => (i * 360) / desktopUtilities.length)
  );

  useEffect(() => {
    const prefersReduced =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let paused = false;
    const onVisibility = () => {
      paused = document.hidden;
      if (!paused) lastTimeRef.current = 0;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min(40, time - lastTimeRef.current);
      lastTimeRef.current = time;

      if (!paused && !hoveredTool && !selectedTool) {
        const step = SPEED * delta;
        setOuterAngles(prev => prev.map(a => (a + step) % 360));
        setInnerAngles(prev => prev.map(a => (a - step * 0.68 + 360) % 360));
      }
      animRef.current = requestAnimationFrame(tick);
    };

    animRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animRef.current);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, [hoveredTool, selectedTool, SPEED]);

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
  const innerItems = desktopUtilities.map((tool, i) => {
    const pos = toXY(innerAngles[i], INNER_RX, INNER_RY);
    return { tool, pos, angle: innerAngles[i], orbit: 'inner' as const, i };
  });
  const allItems = [...outerItems, ...innerItems].sort((a, b) => a.pos.y - b.pos.y);

  // Stronger 3D perspective size curve: noticeably larger in front (bottom), smaller behind sun (top)
  const iconSize = (orbit: 'outer' | 'inner', depth: number) => {
    if (orbit === 'outer') {
      return 44 + depth * 32; // 44px back -> 76px front
    }
    return 36 + depth * 26; // 36px back -> 62px front
  };

  return (
    <div ref={stageRef} className="relative select-none w-full" style={{ height: H }}>
      <div
        style={{
          position: 'absolute',
          width: W,
          height: H,
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        {/* Layer 1: Continuous 3D Orbit Rings (dimmer in back, brighter in front, never detached at edges) */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: 1 }}
        >
          <defs>
            <linearGradient id="orbitDepthOuter" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.11)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.24)" />
              <stop offset="100%" stopColor="rgba(245,158,11,0.46)" />
            </linearGradient>
            <linearGradient id="orbitDepthInner" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.08)" />
              <stop offset="50%" stopColor="rgba(234,179,8,0.17)" />
              <stop offset="100%" stopColor="rgba(249,115,22,0.34)" />
            </linearGradient>
          </defs>
          <ellipse cx={CX} cy={CY} rx={OUTER_RX} ry={OUTER_RY} fill="none" stroke="url(#orbitDepthOuter)" strokeWidth="1.15" />
          <ellipse cx={CX} cy={CY} rx={OUTER_RX + 3} ry={OUTER_RY + 1.5} fill="none" stroke="rgba(234,179,8,0.06)" strokeWidth="0.6" />
          <ellipse cx={CX} cy={CY} rx={INNER_RX} ry={INNER_RY} fill="none" stroke="url(#orbitDepthInner)" strokeWidth="1" />
        </svg>

        {/* Layer 2: Central Sun at zIndex = CY so back planets pass BEHIND it and front planets pass IN FRONT of it */}
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          style={{ position: 'absolute', inset: 0, pointerEvents: 'none', zIndex: Math.round(CY) }}
        >
          <defs>
            <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="sunGradientOrange">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="30%" stopColor="#f97316" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
            </radialGradient>
          </defs>
          <circle cx={CX} cy={CY} r={54} fill="rgba(234,179,8,0.055)" />
          <circle cx={CX} cy={CY} r={28} fill="rgba(249,115,22,0.13)" />
          <g filter="url(#starGlow)">
            <circle cx={CX} cy={CY} r={36} fill="rgba(249, 115, 22, 0.16)">
              <animate attributeName="r" values="32;39;32" dur="3.2s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.32;0.62;0.32" dur="3.2s" repeatCount="indefinite" />
            </circle>
            <circle cx={CX} cy={CY} r={13} fill="url(#sunGradientOrange)" />
          </g>
        </svg>

        {/* Layer 3: Orbiting Planets with Real 3D Depth (size, opacity, subtle depth-of-field blur, Z-occlusion) */}
        {allItems.map(({ tool, pos, orbit, angle, i }) => {
          const itemKey = `${orbit}-${i}`;
          const isHovered = hoveredTool === itemKey;
          const isPremium = orbit === 'outer';
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const depth = (sinVal + 1) / 2; // 0 = far back, 1 = close front
          const size = iconSize(orbit, depth);

          // Subtle depth-of-field on the far-back arc, crisp on front arc & hover
          const backBlur = isHovered ? 0 : depth < 0.35 ? ((0.35 - depth) / 0.35) * 1.15 : 0;
          const depthOpacity = isHovered ? 1 : 0.5 + depth * 0.5;
          const depthBrightness = isHovered ? 1.06 : 0.78 + depth * 0.24;

          return (
            <div
              key={itemKey}
              onClick={() => setSelectedTool(tool)}
              onMouseEnter={() => setHoveredTool(itemKey)}
              onMouseLeave={() => setHoveredTool(null)}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
                zIndex: isHovered ? 900 : Math.round(pos.y),
                opacity: depthOpacity,
                transition: 'opacity 0.22s ease',
                willChange: 'transform',
                cursor: 'pointer',
              }}
              className="group flex flex-col items-center"
            >
              <div
                className="relative transition-transform duration-200 ease-out"
                style={{
                  transform: isHovered ? 'scale(1.14)' : 'scale(1)',
                  filter: `blur(${backBlur.toFixed(2)}px) brightness(${depthBrightness.toFixed(2)})`,
                  transition: 'transform 0.22s ease-out, filter 0.22s ease-out',
                }}
              >
                <div
                  style={{
                    width: size,
                    height: size,
                    borderRadius: '50%',
                    overflow: 'hidden',
                    border: `1.5px solid ${
                      isHovered
                        ? tool.color
                        : isPremium
                          ? `rgba(245,158,11,${(0.2 + depth * 0.3).toFixed(2)})`
                          : `rgba(255,255,255,${(0.1 + depth * 0.16).toFixed(2)})`
                    }`,
                    boxShadow: isHovered
                      ? `0 0 24px ${tool.color}, 0 0 48px ${tool.color.replace('0.85', '0.35')}`
                      : isPremium
                        ? `0 ${Math.round(4 + depth * 8)}px ${Math.round(14 + depth * 14)}px rgba(234,179,8,${(0.12 + depth * 0.16).toFixed(2)})`
                        : `0 ${Math.round(4 + depth * 8)}px ${Math.round(12 + depth * 12)}px rgba(0,0,0,${(0.35 + depth * 0.3).toFixed(2)})`,
                    transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                    flexShrink: 0,
                  }}
                >
                  <img
                    src={tool.img}
                    alt={tool.name}
                    loading="lazy"
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                </div>
                {isPremium && <PremiumCrown />}

                {/* Discreet Hover-Only Name Pill (invisible when idle) */}
                {isHovered && (
                  <div
                    className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2.5 px-3 py-1 rounded-full bg-black/85 backdrop-blur-md border border-white/15 text-white text-[10px] font-bold uppercase tracking-[0.18em] whitespace-nowrap shadow-xl"
                  >
                    {tool.name}
                  </div>
                )}
              </div>
            </div>
          );
        })}

        {/* Symmetrically Spaced Caption Below Outer Orbit */}
        <div
          style={{
            position: 'absolute',
            top: CY + OUTER_RY + 52,
            left: '50%',
            transform: 'translateX(-50%)',
            fontSize: 9,
            letterSpacing: '0.35em',
            color: 'rgba(255,255,255,0.5)',
            fontWeight: 700,
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            pointerEvents: 'none',
          }}
        >
          Free Tools
        </div>
      </div>

      {/* Modal moved outside the transform div so fixed positioning works relative to the viewport */}
      {selectedTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-md" style={{ pointerEvents: 'auto' }} onClick={() => setSelectedTool(null)}>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-[320px] md:max-w-[380px] w-full shadow-2xl relative flex flex-col items-center text-center animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTool(null)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden border border-white/10 mb-6 shadow-lg" style={{ boxShadow: `0 0 35px ${selectedTool.color.replace('0.85', '0.4')}` }}>
              <img src={selectedTool.img} alt={selectedTool.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl md:text-3xl font-black text-white tracking-widest uppercase mb-3 drop-shadow-md">{selectedTool.name}</h3>
            <p className="text-white/50 text-sm md:text-base font-medium mb-8 leading-relaxed px-2">
              {selectedTool.desc}
            </p>
            <a href={selectedTool.link} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedTool(null)} className="block w-full py-4 rounded-2xl font-bold uppercase tracking-[0.25em] text-[12px] md:text-[13px] text-black bg-white hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get in!
            </a>
          </div>
        </div>
      )}
    </div>
  );
}


// ─────────────────────────────────────────────
// Mobile 3D Tools (Split into Premium and Free)
// ─────────────────────────────────────────────
function MobileTools3D() {
  const [activePremium, setActivePremium] = useState(1);
  const [activeFree, setActiveFree] = useState(0);

  const getPremiumVariant = (index: number) => {
    if (index === activePremium) return 'center';
    if (index < activePremium) return 'left';
    return 'right';
  };

  const getFreeVariant = (index: number) => {
    const diff = index - activeFree;
    let wrappedDiff = diff;
    if (Math.abs(diff) > utilities.length / 2) {
      if (diff > 0) wrappedDiff = diff - utilities.length;
      else wrappedDiff = diff + utilities.length;
    }
    
    if (wrappedDiff === 0) return 'center';
    if (wrappedDiff === 1) return 'right';
    if (wrappedDiff === -1) return 'left';
    return 'back';
  };

  const premiumVariants = {
    center: { x: '0%', scale: 1.15, zIndex: 10, opacity: 1, rotateY: 0, filter: 'brightness(100%)' },
    left: { x: '-60%', scale: 0.75, zIndex: 5, opacity: 0.6, rotateY: 50, filter: 'brightness(40%)' },
    right: { x: '60%', scale: 0.75, zIndex: 5, opacity: 0.6, rotateY: -50, filter: 'brightness(40%)' }
  };

  const freeVariants = {
    center: { x: '0%', scale: 1.1, zIndex: 10, opacity: 1, rotateY: 0, filter: 'brightness(100%)' },
    left: { x: '-55%', scale: 0.7, zIndex: 5, opacity: 0.5, rotateY: 45, filter: 'brightness(40%)' },
    right: { x: '55%', scale: 0.7, zIndex: 5, opacity: 0.5, rotateY: -45, filter: 'brightness(40%)' },
    back: { x: '0%', scale: 0.4, zIndex: 1, opacity: 0, rotateY: 0, filter: 'brightness(10%)' }
  };

  const handleFreeNext = () => setActiveFree((prev) => (prev + 1) % utilities.length);
  const handleFreePrev = () => setActiveFree((prev) => (prev - 1 + utilities.length) % utilities.length);

  const touchStartX = useRef<number | null>(null);
  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.touches[0].clientX; };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) handleFreeNext();
    else if (diff < -50) handleFreePrev();
    touchStartX.current = null;
  };

  const touchStartXPrem = useRef<number | null>(null);
  const handleTouchStartPrem = (e: React.TouchEvent) => { touchStartXPrem.current = e.touches[0].clientX; };
  const handleTouchEndPrem = (e: React.TouchEvent) => {
    if (touchStartXPrem.current === null) return;
    const diff = touchStartXPrem.current - e.changedTouches[0].clientX;
    if (diff > 50 && activePremium < premiumTools.length - 1) setActivePremium(p => p + 1);
    else if (diff < -50 && activePremium > 0) setActivePremium(p => p - 1);
    touchStartXPrem.current = null;
  };

  const handlePremiumNext = () => { if (activePremium < premiumTools.length - 1) setActivePremium(p => p + 1); };
  const handlePremiumPrev = () => { if (activePremium > 0) setActivePremium(p => p - 1); };

  return (
    <div className="flex flex-col w-full mt-2 mb-8 gap-14 overflow-hidden">
      
      {/* PREMIUM SECTION */}
      <div className="flex flex-col items-center">
        <h3 className="text-[#fde047] text-[12px] tracking-[0.2em] font-black uppercase mb-10 drop-shadow-[0_0_10px_rgba(234,179,8,0.5)]">
          Premium Tools
        </h3>
        
        <div 
          className="relative w-full max-w-[400px] h-[140px] flex justify-center items-center perspective-[1000px] transform-gpu"
          onTouchStart={handleTouchStartPrem}
          onTouchEnd={handleTouchEndPrem}
        >
          {premiumTools.map((tool, index) => {
            const variant = getPremiumVariant(index);
            const isActive = variant === 'center';
            return (
              <motion.div
                key={tool.name}
                variants={premiumVariants}
                initial={false}
                animate={variant}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => isActive ? window.open(tool.link, '_blank') : setActivePremium(index)}
                className="absolute w-[105px] h-[105px] rounded-full cursor-pointer flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  className="w-full h-full rounded-full overflow-hidden border transition-colors duration-300 relative"
                  style={{ 
                    borderColor: isActive ? tool.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? `0 0 35px ${tool.color.replace('0.85', '0.6')}` : '0 10px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <img src={tool.img} alt={tool.name} className="w-full h-full object-cover" />
                </div>
                {isActive && <PremiumCrown />}
              </motion.div>
            );
          })}
          
          {/* Navigation Arrows */}
          <motion.button 
            onClick={handlePremiumPrev}
            animate={{ x: [-3, 0, -3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`absolute left-10 sm:left-12 z-20 p-2 text-white/50 hover:text-white transition-opacity ${activePremium === 0 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button 
            onClick={handlePremiumNext}
            animate={{ x: [3, 0, 3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className={`absolute right-10 sm:right-12 z-20 p-2 text-white/50 hover:text-white transition-opacity ${activePremium === premiumTools.length - 1 ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>
        <div className="mt-6 h-[40px] flex flex-col items-center justify-start text-center px-4">
          <h4 className="text-white text-lg font-black tracking-widest uppercase drop-shadow-md">
            {premiumTools[activePremium].name}
          </h4>
          <p className="text-white/50 text-[11px] leading-tight mt-1 max-w-[260px]">
            {premiumTools[activePremium].desc}
          </p>
        </div>
      </div>


      {/* FREE SECTION */}
      <div className="flex flex-col items-center mt-2">
        <h3 className="text-white/40 text-[10px] tracking-[0.2em] font-bold uppercase mb-10">
          Free Utilities
        </h3>
        
        <div 
          className="relative w-full max-w-[400px] h-[120px] flex justify-center items-center perspective-[1000px] transform-gpu"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {utilities.map((tool, index) => {
            const variant = getFreeVariant(index);
            const isActive = variant === 'center';
            return (
              <motion.div
                key={tool.name}
                variants={freeVariants}
                initial={false}
                animate={variant}
                transition={{ duration: 0.5, ease: [0.2, 0.8, 0.2, 1] }}
                onClick={() => isActive ? window.open(tool.link, '_blank') : setActiveFree(index)}
                className="absolute w-[90px] h-[90px] rounded-full cursor-pointer flex items-center justify-center"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div 
                  className="w-full h-full rounded-full overflow-hidden border transition-colors duration-300 relative"
                  style={{ 
                    borderColor: isActive ? tool.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? `0 0 25px ${tool.color.replace('0.85', '0.4')}` : '0 10px 20px rgba(0,0,0,0.5)'
                  }}
                >
                  <img src={tool.img} alt={tool.name} className="w-full h-full object-cover" />
                </div>
              </motion.div>
            );
          })}
          
          {/* Navigation Arrows */}
          <motion.button 
            onClick={handleFreePrev}
            animate={{ x: [-3, 0, -3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute left-12 sm:left-14 z-20 p-2 text-white/50 hover:text-white"
          >
            <ChevronLeft size={28} />
          </motion.button>
          <motion.button 
            onClick={handleFreeNext}
            animate={{ x: [3, 0, 3] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="absolute right-12 sm:right-14 z-20 p-2 text-white/50 hover:text-white"
          >
            <ChevronRight size={28} />
          </motion.button>
        </div>
        <div className="mt-4 h-[40px] flex flex-col items-center justify-start text-center px-4">
          <h4 className="text-white text-base font-bold tracking-widest uppercase drop-shadow-md">
            {utilities[activeFree].name}
          </h4>
          <p className="text-white/50 text-[10px] leading-tight mt-1 max-w-[260px]">
            {utilities[activeFree].desc}
          </p>
        </div>
      </div>
    </div>
  );
}

export function UtilitiesSection() {
  const decorativeRef = useNoTabStop<HTMLDivElement>();
  return (
    <section className="pt-0 pb-12 sm:py-12" id="utilities">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="flex flex-col items-center relative z-10 mb-0 sm:mb-0">
          <img src="/tools for artists.webp" alt="Tools for Artists" className="w-[85%] max-w-[250px] md:max-w-[600px] h-auto object-contain mx-auto" />
        </div>

        {/* Screen Reader Only List of Tools */}
        <div className="sr-only">
          <h2>deVee Tools for Artists</h2>
          <ul>
            {premiumTools.map(tool => (
              <li key={tool.name}>
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  {tool.name} (Premium) - {tool.desc}
                </a>
              </li>
            ))}
            {utilities.map(tool => (
              <li key={tool.name}>
                <a href={tool.link} target="_blank" rel="noopener noreferrer">
                  {tool.name} - {tool.desc}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Unified Solar System for Desktop and Mobile (Hidden from screen readers) */}
        <div ref={decorativeRef} className="flex flex-col items-center justify-center overflow-hidden sm:overflow-visible -mx-4 sm:mx-0 -mt-10 md:-mt-8" aria-hidden="true">
          <div className="hidden md:block w-full">
            <SolarSystem />
          </div>
          <div className="block md:hidden w-full mt-4">
            <MobileTools3D />
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
        @keyframes floatCrown {
          0%, 100% { transform: translateY(0) rotate(15deg); }
          50% { transform: translateY(-2px) rotate(15deg); }
        }
      `}} />
    </section>
  );
}