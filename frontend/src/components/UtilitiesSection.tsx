import React, { useRef, useEffect, useState, useId } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play, ArrowUpRight } from 'lucide-react';
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
    className="crown-float absolute -top-3 -right-2 z-20 pointer-events-none drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]"
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
// Desktop Solar System (Upgraded 2.0)
// ─────────────────────────────────────────────
type ToolItem = typeof utilities[0];

function SolarSystem() {
  const [hoveredKey, setHoveredKey] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState<'all' | 'outer' | 'inner'>('all');
  const [selectedTool, setSelectedTool] = useState<(ToolItem & { isPremium: boolean }) | null>(null);
  const [isPaused, setIsPaused] = useState(() =>
    typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches
  );
  const [stageWidth, setStageWidth] = useState(1120);

  const stageRef = useRef<HTMLDivElement>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const animRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const dialogTitleId = useId();

  useEffect(() => {
    const el = stageRef.current;
    if (!el) return;
    const updateWidth = () => {
      const measured = el.getBoundingClientRect().width;
      if (measured > 0) setStageWidth(Math.min(1180, measured));
    };
    updateWidth();
    const ro = new ResizeObserver(updateWidth);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (selectedTool) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [selectedTool]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const handleClose = () => {
      dialog.returnValue = '';
      setSelectedTool(null);
    };
    dialog.addEventListener('close', handleClose);

    // Light-dismiss fallback for browsers without native dialog closedby="any" (e.g. Safari)
    let pressedOutside = false;
    const isOutside = (e: PointerEvent) => {
      const r = dialog.getBoundingClientRect();
      return e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom;
    };
    const onPointerDown = (e: PointerEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype)) {
        pressedOutside = isOutside(e);
      }
    };
    const onPointerUp = (e: PointerEvent) => {
      if (!('closedBy' in HTMLDialogElement.prototype) && pressedOutside && isOutside(e)) {
        dialog.close();
      }
      pressedOutside = false;
    };

    dialog.addEventListener('pointerdown', onPointerDown);
    dialog.addEventListener('pointerup', onPointerUp);
    return () => {
      dialog.removeEventListener('close', handleClose);
      dialog.removeEventListener('pointerdown', onPointerDown);
      dialog.removeEventListener('pointerup', onPointerUp);
    };
  }, []);

  const W = stageWidth;
  const H = 500;
  const CX = W / 2;
  const CY = H / 2 - 8;
  const OUTER_RX = Math.min(485, Math.max(300, W * 0.42));
  const OUTER_RY = 182;
  const INNER_RX = OUTER_RX * 0.62;
  const INNER_RY = 108;
  const SPEED = 0.014;

  const [outerAngles, setOuterAngles] = useState(() =>
    premiumTools.map((_, i) => 25 + (i * 360) / premiumTools.length)
  );
  const [innerAngles, setInnerAngles] = useState(() =>
    desktopUtilities.map((_, i) => 15 + (i * 360) / desktopUtilities.length)
  );

  useEffect(() => {
    let tabHidden = false;
    const onVisibility = () => {
      tabHidden = document.hidden;
      if (!tabHidden) lastTimeRef.current = 0;
    };
    document.addEventListener('visibilitychange', onVisibility);

    const tick = (time: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = time;
      const delta = Math.min(40, time - lastTimeRef.current);
      lastTimeRef.current = time;

      if (!tabHidden && !isPaused && !hoveredKey && !selectedTool) {
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
  }, [hoveredKey, selectedTool, isPaused, SPEED]);

  const toXY = (angleDeg: number, rx: number, ry: number) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: CX + rx * Math.cos(rad),
      y: CY + ry * Math.sin(rad),
    };
  };

  const outerItems = premiumTools.map((tool, i) => ({
    key: `outer-${i}`,
    tool,
    pos: toXY(outerAngles[i], OUTER_RX, OUTER_RY),
    angle: outerAngles[i],
    orbit: 'outer' as const,
    isPremium: true,
  }));

  const innerItems = desktopUtilities.map((tool, i) => ({
    key: `inner-${i}`,
    tool,
    pos: toXY(innerAngles[i], INNER_RX, INNER_RY),
    angle: innerAngles[i],
    orbit: 'inner' as const,
    isPremium: false,
  }));

  const allItems = [...outerItems, ...innerItems].sort((a, b) => a.pos.y - b.pos.y);
  const hoveredItem = hoveredKey ? allItems.find((item) => item.key === hoveredKey) ?? null : null;

  const iconSize = (orbit: 'outer' | 'inner', angle: number) => {
    const sinVal = Math.sin((angle * Math.PI) / 180);
    const base = orbit === 'outer' ? 66 : 56;
    return base + sinVal * 6;
  };

  const outerRingOpacity = activeFilter === 'inner' ? 0.16 : hoveredItem?.orbit === 'outer' ? 0.85 : 0.45;
  const innerRingOpacity = activeFilter === 'outer' ? 0.14 : hoveredItem?.orbit === 'inner' ? 0.8 : 0.35;

  return (
    <div ref={stageRef} className="relative select-none w-full max-w-[1180px] mx-auto">
      {/* Soft dark radial backdrop to separate planets cleanly from background grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -inset-x-10 -inset-y-6 rounded-full"
        style={{
          background:
            'radial-gradient(ellipse 68% 64% at 50% 46%, rgba(8, 6, 5, 0.86) 0%, rgba(8, 6, 5, 0.56) 58%, rgba(8, 6, 5, 0) 100%)',
        }}
      />

      {/* Orbital Stage */}
      <div className="relative mx-auto" style={{ width: W, height: H }}>
        <svg
          width={W}
          height={H}
          viewBox={`0 0 ${W} ${H}`}
          className="absolute inset-0 pointer-events-none"
        >
          <defs>
            <linearGradient id="orbitGradOuter" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(234,179,8,0.08)" />
              <stop offset="28%" stopColor="rgba(245,158,11,0.55)" />
              <stop offset="50%" stopColor="rgba(253,224,71,0.65)" />
              <stop offset="72%" stopColor="rgba(245,158,11,0.55)" />
              <stop offset="100%" stopColor="rgba(234,179,8,0.08)" />
            </linearGradient>
            <linearGradient id="orbitGradInner" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.05)" />
              <stop offset="35%" stopColor="rgba(249,115,22,0.42)" />
              <stop offset="65%" stopColor="rgba(249,115,22,0.42)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0.05)" />
            </linearGradient>
            <filter id="starGlow" x="-100%" y="-100%" width="300%" height="300%">
              <feGaussianBlur stdDeviation="14" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <radialGradient id="sunGradientOrange">
              <stop offset="0%" stopColor="#fff7ed" />
              <stop offset="32%" stopColor="#fb923c" />
              <stop offset="68%" stopColor="rgba(249, 115, 22, 0.35)" />
              <stop offset="100%" stopColor="rgba(249, 115, 22, 0)" />
            </radialGradient>
          </defs>

          {/* Outer Orbit (Reels Suite) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={OUTER_RX}
            ry={OUTER_RY}
            fill="none"
            stroke="url(#orbitGradOuter)"
            strokeWidth={hoveredItem?.orbit === 'outer' ? 1.5 : 1}
            style={{ opacity: outerRingOpacity, transition: 'opacity 0.3s ease' }}
          />
          <ellipse
            cx={CX}
            cy={CY}
            rx={OUTER_RX + 4}
            ry={OUTER_RY + 2}
            fill="none"
            stroke="rgba(234,179,8,0.1)"
            strokeWidth="0.6"
            strokeDasharray="3 8"
            style={{ opacity: outerRingOpacity, transition: 'opacity 0.3s ease' }}
          />

          {/* Inner Orbit (Free Utilities) */}
          <ellipse
            cx={CX}
            cy={CY}
            rx={INNER_RX}
            ry={INNER_RY}
            fill="none"
            stroke="url(#orbitGradInner)"
            strokeWidth={hoveredItem?.orbit === 'inner' ? 1.5 : 1}
            style={{ opacity: innerRingOpacity, transition: 'opacity 0.3s ease' }}
          />

          {/* Central Sun */}
          <circle
            cx={CX}
            cy={CY}
            r={62}
            fill={hoveredItem ? hoveredItem.tool.color.replace('0.85', '0.09') : 'rgba(249,115,22,0.07)'}
            style={{ transition: 'fill 0.35s ease' }}
          />
          <circle
            cx={CX}
            cy={CY}
            r={32}
            fill={hoveredItem ? hoveredItem.tool.color.replace('0.85', '0.18') : 'rgba(249,115,22,0.15)'}
            style={{ transition: 'fill 0.35s ease' }}
          />
          <g filter="url(#starGlow)">
            <circle cx={CX} cy={CY} r={34} fill="rgba(249, 115, 22, 0.16)">
              {!isPaused && (
                <>
                  <animate attributeName="r" values="30;38;30" dur="3.4s" repeatCount="indefinite" />
                  <animate attributeName="opacity" values="0.3;0.65;0.3" dur="3.4s" repeatCount="indefinite" />
                </>
              )}
            </circle>
            <circle cx={CX} cy={CY} r={14} fill="url(#sunGradientOrange)" />
          </g>
        </svg>

        {/* Orbiting Tool Nodes (GPU compositor translate3d positioning) */}
        {allItems.map(({ key, tool, pos, orbit, angle, isPremium }) => {
          const size = iconSize(orbit, angle);
          const isHovered = hoveredKey === key;
          const isDimmedByFilter = activeFilter !== 'all' && activeFilter !== orbit;
          const isDimmedByHover = Boolean(hoveredKey) && !isHovered;
          const sinVal = Math.sin((angle * Math.PI) / 180);
          const depthOpacity = 0.68 + 0.32 * ((sinVal + 1) / 2);
          const finalOpacity = isHovered
            ? 1
            : isDimmedByFilter
              ? 0.22
              : isDimmedByHover
                ? 0.42
                : depthOpacity;

          return (
            <button
              key={key}
              type="button"
              onClick={() => setSelectedTool({ ...tool, isPremium })}
              onMouseEnter={() => setHoveredKey(key)}
              onMouseLeave={() => setHoveredKey(null)}
              onFocus={() => setHoveredKey(key)}
              onBlur={() => setHoveredKey(null)}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                transform: `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`,
                zIndex: isHovered ? 900 : Math.round(pos.y),
                opacity: finalOpacity,
                transition: 'opacity 0.25s ease',
                willChange: 'transform',
              }}
              className="group flex flex-col items-center cursor-pointer bg-transparent border-0 p-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 rounded-2xl"
            >
              <div
                className="flex flex-col items-center transition-transform duration-200 ease-out"
                style={{ transform: isHovered ? 'scale(1.14)' : 'scale(1)' }}
              >
                <div className="relative">
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
                            ? 'rgba(245, 158, 11, 0.45)'
                            : 'rgba(255, 255, 255, 0.18)'
                      }`,
                      boxShadow: isHovered
                        ? `0 0 26px ${tool.color}, 0 0 54px ${tool.color.replace('0.85', '0.35')}`
                        : isPremium
                          ? '0 0 18px rgba(234, 179, 8, 0.24)'
                          : '0 8px 22px rgba(0, 0, 0, 0.55)',
                      transition: 'box-shadow 0.25s ease, border-color 0.25s ease',
                      flexShrink: 0,
                    }}
                  >
                    <img
                      src={tool.img}
                      alt={tool.name}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {isPremium && <PremiumCrown />}
                </div>

                {/* Clean Pill Label Under Every Planet */}
                <span
                  className={`mt-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-[0.14em] whitespace-nowrap backdrop-blur-sm transition-colors duration-200 ${
                    isHovered
                      ? 'bg-black/85 text-white border border-white/25 shadow-lg'
                      : 'bg-black/55 text-white/70 border border-white/10'
                  }`}
                >
                  {tool.name}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live Preview & Controls Glass Bar (Fixed Height — Zero Layout Shift) */}
      <div className="relative z-20 mt-2 flex justify-center px-4">
        <div
          className="w-full max-w-[740px] min-h-[70px] rounded-2xl bg-[#0d0b0a]/85 backdrop-blur-md border border-white/10 px-5 py-3 flex items-center justify-between gap-4 shadow-[0_12px_40px_rgba(0,0,0,0.55)] transition-colors duration-300"
          style={{
            borderColor: hoveredItem
              ? hoveredItem.tool.color.replace('0.85', '0.45')
              : 'rgba(255, 255, 255, 0.1)',
          }}
        >
          {hoveredItem ? (
            <div className="flex items-center justify-between w-full gap-4">
              <div className="flex items-center gap-3.5 min-w-0">
                <div
                  className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0 border border-white/15"
                  style={{ boxShadow: `0 0 18px ${hoveredItem.tool.color.replace('0.85', '0.45')}` }}
                >
                  <img
                    src={hoveredItem.tool.img}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="min-w-0 text-left">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-black tracking-[0.12em] uppercase text-white truncate">
                      {hoveredItem.tool.name}
                    </span>
                    <span
                      className={`px-2 py-0.5 rounded-full text-[9px] font-extrabold uppercase tracking-[0.16em] ${
                        hoveredItem.isPremium
                          ? 'bg-amber-500/20 text-amber-300 border border-amber-400/35'
                          : 'bg-white/10 text-white/75 border border-white/15'
                      }`}
                    >
                      {hoveredItem.isPremium ? 'Reels Pro' : 'Free Tool'}
                    </span>
                  </div>
                  <p className="text-xs text-white/65 truncate mt-0.5">
                    {hoveredItem.tool.desc}
                  </p>
                </div>
              </div>
              <span className="flex-shrink-0 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-orange-400">
                Open
                <ArrowUpRight className="w-3.5 h-3.5" />
              </span>
            </div>
          ) : (
            <div className="flex items-center justify-between w-full gap-4">
              {/* Orbit Filter Pills */}
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => setActiveFilter('all')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    activeFilter === 'all'
                      ? 'bg-white text-black'
                      : 'text-white/55 hover:text-white bg-white/5'
                  }`}
                >
                  All (9)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter(activeFilter === 'outer' ? 'all' : 'outer')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    activeFilter === 'outer'
                      ? 'bg-amber-400/25 text-amber-200 border border-amber-400/45'
                      : 'text-amber-300/75 hover:text-amber-200 bg-amber-500/10 border border-amber-500/20'
                  }`}
                >
                  Reels Suite (3)
                </button>
                <button
                  type="button"
                  onClick={() => setActiveFilter(activeFilter === 'inner' ? 'all' : 'inner')}
                  className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-[0.16em] transition-colors ${
                    activeFilter === 'inner'
                      ? 'bg-orange-500/25 text-orange-200 border border-orange-400/45'
                      : 'text-white/60 hover:text-white bg-white/5 border border-white/10'
                  }`}
                >
                  Free Utilities (6)
                </button>
              </div>

              {/* Subtle Hint + WCAG Pause/Play Control */}
              <div className="flex items-center gap-3">
                <span className="hidden lg:inline text-[11px] text-white/40 tracking-wide">
                  Hover to preview · Click to launch
                </span>
                <button
                  type="button"
                  onClick={() => setIsPaused((p) => !p)}
                  aria-label={isPaused ? 'Play orbit animation' : 'Pause orbit animation'}
                  title={isPaused ? 'Play orbit' : 'Pause orbit'}
                  className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 hover:bg-white/15 border border-white/10 text-white/70 hover:text-white transition-colors"
                >
                  {isPaused ? <Play className="w-3.5 h-3.5 ml-0.5" /> : <Pause className="w-3.5 h-3.5" />}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Native Top-Layer Modal Dialog */}
      <dialog
        ref={dialogRef}
        {...({ closedby: 'any' } as any)}
        aria-labelledby={dialogTitleId}
        className="solar-tool-dialog bg-transparent p-0 m-auto max-w-[380px] w-[calc(100%-2.5rem)] overflow-visible"
      >
        {selectedTool && (
          <div className="bg-[#0a0a0a] border border-white/12 rounded-3xl p-8 w-full shadow-2xl relative flex flex-col items-center text-center">
            <form method="dialog">
              <button
                type="submit"
                aria-label="Close tool details"
                className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors p-1"
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </form>
            <div className="relative mb-6">
              <div
                className="w-28 h-28 rounded-full overflow-hidden border border-white/15 shadow-lg"
                style={{ boxShadow: `0 0 38px ${selectedTool.color.replace('0.85', '0.45')}` }}
              >
                <img src={selectedTool.img} alt={selectedTool.name} className="w-full h-full object-cover" />
              </div>
              {selectedTool.isPremium && <PremiumCrown />}
            </div>
            <span
              className={`mb-2.5 px-2.5 py-0.5 rounded-full text-[10px] font-extrabold uppercase tracking-[0.18em] ${
                selectedTool.isPremium
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-400/35'
                  : 'bg-white/10 text-white/70 border border-white/15'
              }`}
            >
              {selectedTool.isPremium ? 'Reels Suite' : 'Free Utility'}
            </span>
            <h3
              id={dialogTitleId}
              className="text-3xl font-black text-white tracking-widest uppercase mb-3 drop-shadow-md"
            >
              {selectedTool.name}
            </h3>
            <p className="text-white/55 text-base font-medium mb-8 leading-relaxed px-2">
              {selectedTool.desc}
            </p>
            <a
              href={selectedTool.link}
              target="_blank"
              rel="noopener noreferrer"
              autoFocus
              onClick={() => dialogRef.current?.close()}
              className="inline-flex items-center justify-center gap-2 w-full py-4 rounded-2xl font-bold uppercase tracking-[0.22em] text-[13px] text-black bg-white hover:bg-gray-200 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-[0_0_24px_rgba(255,255,255,0.2)]"
            >
              Get in!
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        )}
      </dialog>
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

        {/* Screen Reader Only List of Tools (Mobile fallback; desktop solar system uses native controls) */}
        <div className="sr-only md:hidden">
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

        {/* Desktop Interactive Solar System + Mobile 3D Carousel */}
        <div className="flex flex-col items-center justify-center overflow-hidden sm:overflow-visible -mx-4 sm:mx-0 -mt-10 sm:-mt-10">
          <div className="hidden md:block w-full">
            <SolarSystem />
          </div>
          <div ref={decorativeRef} className="block md:hidden w-full mt-4" aria-hidden="true">
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
        .crown-float {
          transform: rotate(15deg);
        }
        @media (prefers-reduced-motion: no-preference) {
          .crown-float {
            animation: floatCrown 4s ease-in-out infinite;
          }
        }
        dialog.solar-tool-dialog:modal {
          overscroll-behavior: contain;
        }
        dialog.solar-tool-dialog::backdrop {
          background: rgba(0, 0, 0, 0.72);
          backdrop-filter: blur(10px);
          overflow: hidden;
          overscroll-behavior: contain;
        }
      `}} />
    </section>
  );
}