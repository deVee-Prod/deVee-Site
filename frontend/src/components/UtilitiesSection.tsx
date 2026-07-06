import React, { useRef, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const GOLD = "rgba(234, 179, 8, 0.85)";

const premiumTools = [
  { name: "Reels Dubber", link: "https://reels-dubber.devee-music.com/", img: "/reelsdubberlogo.webp", color: GOLD, desc: "Automatically generate subtitles for your video." },
  { name: "Reels Cutter", link: "https://reels-cutter.devee-music.com/", img: "/reelscutterlogo.webp", color: GOLD, desc: "The ultimate video editor: cut and create subtitles." },
  { name: "Reels Motion", link: "https://reels-motion.devee-music.com/", img: "/reels-motion-icon.webp", color: GOLD, desc: "Add dynamic zoom in and zoom out effects to your video." },
];

const utilities = [
  { name: "Storm Form", link: "https://storm-form.devee-music.com", img: "/stormformicon.webp", color: "rgba(59, 130, 246, 0.85)", desc: "Easily generate info files to send new songs to record labels." },
  { name: "BPM Calculator", link: "https://bpm-calculator.devee-music.com", img: "/bpmcalculatorlogo.webp", color: "rgba(236, 72, 153, 0.85)", desc: "Calculate the exact BPM for any song you input." },
  { name: "File Converter", link: "https://file-converter.devee-music.com", img: "/fileconverterlogo.webp", color: "rgba(239, 68, 68, 0.85)", desc: "Convert files easily: PNG to PDF, WAV to MP3, and much more." },
  { name: "PDF Killer", link: "https://pdf-killer.devee-music.com", img: "/pdfkillerlogo.webp", color: "rgba(34, 197, 94, 0.85)", desc: "A fast editing tool for filling out PDF forms." },
  { name: "Flash Juice", link: "https://flash-juice.devee-music.com", img: "/flashjuicelogo.webp", color: "rgba(249, 115, 22, 0.85)", desc: "Create a fast-paced (sped up) version of any chosen song." },
  { name: "Release Ready", link: "https://release-ready.devee-music.com", img: "/Release%20ready%20icon.webp", color: "rgba(234, 179, 8, 0.85)", desc: "Crop your artwork exactly to 3000x3000 to fit distribution platforms perfectly." },
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
// Desktop Solar System (Unchanged)
// ─────────────────────────────────────────────
function SolarSystem() {
  const [hoveredTool, setHoveredTool] = useState<string | null>(null);
  const [selectedTool, setSelectedTool] = useState<typeof premiumTools[0] | null>(null);
  const [isMobile, setIsMobile] = useState(false);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const OUTER_RX = isMobile ? 110 : 720;
  const OUTER_RY = isMobile ? 220 : 200;
  const INNER_RX = isMobile ? 55 : 450;
  const INNER_RY = isMobile ? 120 : 120;
  const SPEED = isMobile ? 0.025 : 0.018;
  const W = isMobile ? 390 : 1600;
  const H = isMobile ? 550 : 650;
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

      if (!paused && !hoveredTool && !selectedTool) {
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
  const innerItems = utilities.map((tool, i) => {
    const pos = toXY(innerAngles[i], INNER_RX, INNER_RY);
    return { tool, pos, angle: innerAngles[i], orbit: 'inner' as const, i };
  });
  const allItems = [...outerItems, ...innerItems].sort((a, b) => a.pos.y - b.pos.y);

  const iconSize = (orbit: 'outer' | 'inner', angle: number) => {
    const sinVal = Math.sin((angle * Math.PI) / 180);
    const base = orbit === 'outer' ? (isMobile ? 55 : 58) : (isMobile ? 45 : 50);
    const amplitude = isMobile ? 8 : 7;
    return base + sinVal * amplitude;
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
          <ellipse cx={CX} cy={CY} rx={OUTER_RX + (isMobile ? 1 : 2)} ry={OUTER_RY + 1} fill="none" stroke="rgba(234,179,8,0.07)" strokeWidth="0.5" />
          <ellipse cx={CX} cy={CY} rx={INNER_RX} ry={INNER_RY} fill="none" stroke="url(#orbitGradInner)" strokeWidth="1" />
          <circle cx={CX} cy={CY} r={isMobile ? 24 : 48} fill="rgba(234,179,8,0.06)" />
          <circle cx={CX} cy={CY} r={isMobile ? 12 : 24} fill="rgba(234,179,8,0.13)" />
          <g filter="url(#starGlow)">
            <circle cx={CX} cy={CY} r={isMobile ? 22 : 35} fill="rgba(249, 115, 22, 0.15)">
              <animate attributeName="r" values={isMobile ? "18;24;18" : "32;38;32"} dur="3s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx={CX} cy={CY} r={isMobile ? 10 : 12} fill="url(#sunGradientOrange)" />
          </g>
        </svg>

        {allItems.map(({ tool, pos, orbit, angle, i }) => {
          const size = iconSize(orbit, angle);
          const isHovered = hoveredTool === `${orbit}-${i}`;
          const isPremium = orbit === 'outer';
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const opacity = 0.55 + 0.45 * ((sinVal + 1) / 2);
          return (
            <div key={`${orbit}-${i}`} 
              onClick={() => setSelectedTool(tool)}
              onMouseEnter={() => setHoveredTool(`${orbit}-${i}`)} onMouseLeave={() => setHoveredTool(null)}
              style={{ position: 'absolute', left: pos.x, top: pos.y, transform: 'translate(-50%, -50%)', zIndex: Math.round(pos.y), opacity, transition: 'opacity 0.2s', cursor: 'pointer' }}
              className="group flex flex-col items-center">
              <div className="relative">
                <div style={{ width: size, height: size, borderRadius: '50%', overflow: 'hidden', border: `1.5px solid ${isHovered ? tool.color : 'rgba(255,255,255,0.12)'}`, boxShadow: isHovered ? `0 0 20px ${tool.color}, 0 0 40px ${tool.color.replace('0.85', '0.3')}` : isPremium ? '0 0 10px rgba(234,179,8,0.2)' : 'none', transition: 'box-shadow 0.3s, border-color 0.3s, width 0.2s, height 0.2s', flexShrink: 0 }}>
                  <img src={tool.img} alt={tool.name} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
                {isPremium && <PremiumCrown />}
              </div>
            </div>
          );
        })}

        <div style={{ position: 'absolute', top: CY + OUTER_RY + (isMobile ? 45 : 80), left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? 7 : 9, letterSpacing: '0.35em', color: 'rgba(255,255,255,0.5)', fontWeight: 700, textTransform: 'uppercase', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
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
  const [activeFree, setActiveFree] = useState(2);
  const [selectedTool, setSelectedTool] = useState<any | null>(null);

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
    if (diff > 50 && activePremium < 2) setActivePremium(p => p + 1);
    else if (diff < -50 && activePremium > 0) setActivePremium(p => p - 1);
    touchStartXPrem.current = null;
  };

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
                onClick={() => isActive ? setSelectedTool(tool) : setActivePremium(index)}
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
        </div>
        <div className="mt-6 h-[40px] flex flex-col items-center justify-start text-center px-4">
          <h4 className="text-white text-lg font-black tracking-widest uppercase drop-shadow-md">
            {premiumTools[activePremium].name}
          </h4>
          <p className="text-white/50 text-[11px] leading-tight mt-1 max-w-[260px]">
            {premiumTools[activePremium].desc}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-[0.2em] animate-pulse pointer-events-none">
          <ChevronLeft size={10} /> Swipe <ChevronRight size={10} />
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
                onClick={() => isActive ? setSelectedTool(tool) : setActiveFree(index)}
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
        </div>
        <div className="mt-4 h-[40px] flex flex-col items-center justify-start text-center px-4">
          <h4 className="text-white text-base font-bold tracking-widest uppercase drop-shadow-md">
            {utilities[activeFree].name}
          </h4>
          <p className="text-white/50 text-[10px] leading-tight mt-1 max-w-[260px]">
            {utilities[activeFree].desc}
          </p>
        </div>
        <div className="mt-4 flex items-center gap-2 text-white/30 text-[9px] uppercase tracking-[0.2em] animate-pulse pointer-events-none">
          <ChevronLeft size={10} /> Swipe <ChevronRight size={10} />
        </div>
      </div>

      {/* Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-md" style={{ pointerEvents: 'auto' }} onClick={() => setSelectedTool(null)}>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-[320px] w-full shadow-2xl relative flex flex-col items-center text-center animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTool(null)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 mb-6 shadow-lg" style={{ boxShadow: `0 0 35px ${selectedTool.color.replace('0.85', '0.4')}` }}>
              <img src={selectedTool.img} alt={selectedTool.name} className="w-full h-full object-cover" />
            </div>
            <h3 className="text-2xl font-black text-white tracking-widest uppercase mb-3 drop-shadow-md">{selectedTool.name}</h3>
            <p className="text-white/50 text-sm font-medium mb-8 leading-relaxed px-2">
              {selectedTool.desc}
            </p>
            <a href={selectedTool.link} target="_blank" rel="noopener noreferrer" onClick={() => setSelectedTool(null)} className="block w-full py-4 rounded-2xl font-bold uppercase tracking-[0.25em] text-[12px] text-black bg-white hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_20px_rgba(255,255,255,0.2)]">
              Get in!
            </a>
          </div>
        </div>
      )}

    </div>
  );
}

export function UtilitiesSection() {
  return (
    <section className="pt-0 pb-12 sm:py-12" id="utilities">
      <div className="container mx-auto px-4">
        
        {/* Title */}
        <div className="flex flex-col items-center relative z-10 mb-0 sm:mb-0">
          <img src="/tools for artists.webp" alt="Tools for Artists" className="w-[85%] max-w-[250px] md:max-w-[600px] h-auto object-contain mx-auto" />
        </div>

        {/* Unified Solar System for Desktop and Mobile */}
        <div className="flex flex-col items-center justify-center overflow-hidden sm:overflow-visible -mx-4 sm:mx-0 -mt-10 sm:-mt-16">
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