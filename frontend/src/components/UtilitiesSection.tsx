import React, { useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const GOLD = "rgba(234, 179, 8, 0.85)";

const premiumTools = [
  { name: "Reels Dubber", link: "https://reels-dubber.devee-music.com/", img: "/reelsdubberlogo.png", color: GOLD },
  { name: "Reels Cutter", link: "https://reels-cutter.devee-music.com/", img: "/reelscutterlogo.png", color: GOLD },
  { name: "Reels Motion", link: "https://reels-motion.devee-music.com/", img: "/reels-motion-icon.png", color: GOLD },
];

const utilities = [
  { name: "Storm Form", link: "https://storm-form.devee-music.com", img: "/stormformicon.png", color: "rgba(59, 130, 246, 0.6)" },
  { name: "BPM Calculator", link: "https://bpm-calculator.devee-music.com", img: "/bpmcalculatorlogo.png", color: "rgba(236, 72, 153, 0.6)" },
  { name: "File Converter", link: "https://file-converter.devee-music.com", img: "/fileconverterlogo.png", color: "rgba(239, 68, 68, 0.6)" },
  { name: "PDF Killer", link: "https://pdf-killer.devee-music.com", img: "/pdfkillerlogo.png", color: "rgba(34, 197, 94, 0.6)" },
  { name: "Flash Juice", link: "https://flash-juice.devee-music.com", img: "/flashjuicelogo.png", color: "rgba(249, 115, 22, 0.6)" },
  { name: "Release Ready", link: "https://release-ready.devee-music.com", img: "/Release%20ready%20icon.png", color: "rgba(234, 179, 8, 0.6)" },
];

function ToolIcon({ tool, compact = false }: { tool: typeof utilities[0], compact?: boolean }) {
  return (
    <a
      href={tool.link}
      target="_blank"
      rel="noopener noreferrer"
      className={`flex-shrink-0 group flex flex-col items-center ${compact ? 'w-[82px] md:w-auto snap-start' : 'w-[105px] md:w-auto snap-center'}`}
    >
      <div
        className={`${compact ? 'w-14 h-14 md:w-20 md:h-20' : 'w-16 h-16 md:w-20 md:h-20'} rounded-full overflow-hidden border border-white/10 transition-all duration-500 shadow-2xl`}
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
      <span className={`mt-3 ${compact ? 'text-[6px] md:text-[8px] tracking-[0.12em] md:tracking-[0.2em]' : 'text-[7px] md:text-[8px] tracking-[0.2em]'} text-white/40 font-bold uppercase text-center whitespace-nowrap transition-colors duration-300 group-hover:text-white`}>
        {tool.name}
      </span>
    </a>
  );
}

export function UtilitiesSection() {
  const premiumScrollRef = useRef<HTMLDivElement>(null);
  const freeScrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Premium: center on middle item (index 1 of 3) — children: [spacer, item0, item1, item2, spacer]
    if (premiumScrollRef.current) {
      const el = premiumScrollRef.current;
      const mid = el.children[2] as HTMLElement;
      if (mid) el.scrollLeft = mid.offsetLeft + mid.offsetWidth / 2 - el.clientWidth / 2;
    }
    // Free: center so items peek on both sides, then nudge to hint scrollability
    if (freeScrollRef.current) {
      const el = freeScrollRef.current;
      const center = (el.scrollWidth - el.clientWidth) / 2;
      el.scrollLeft = center;
      setTimeout(() => {
        el.scrollBy({ left: 28, behavior: 'smooth' });
        setTimeout(() => el.scrollTo({ left: center, behavior: 'smooth' }), 450);
      }, 700);
    }
  }, []);

  return (
    <section className="py-24 bg-black overflow-x-hidden md:overflow-x-visible" id="utilities">
      <div className="container mx-auto px-4">

        {/* Title */}
        <div className="flex flex-col items-center mb-12">
          <img
            src="/tools%20for%20artists.png"
            alt="Tools for Artists"
            className="max-w-[250px] md:max-w-[400px] h-auto object-contain"
          />
          <div className="flex items-center gap-3 mt-6 md:hidden">
            <ChevronLeft className="w-4 h-4 text-orange-500/50 animate-pulse" />
            <span className="text-[9px] tracking-[0.3em] text-white/40 uppercase font-bold">Scroll</span>
            <ChevronRight className="w-4 h-4 text-orange-500/50 animate-pulse" />
          </div>
        </div>

        {/* Premium Tools */}
        <div className="mb-16">
          {/* Premium label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-yellow-500/40" />
            <span className="text-[9px] tracking-[0.35em] font-bold uppercase text-yellow-400/80">
              ★ Premium Tools ★
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-yellow-500/40" />
          </div>

          {/* Mobile: simple horizontal scroll */}
          <div ref={premiumScrollRef} className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory md:hidden pb-4 px-4 gap-3">
            <div className="flex-shrink-0 w-4" />
            {premiumTools.map((tool, index) => (
              <ToolIcon key={index} tool={tool} />
            ))}
            <div className="flex-shrink-0 w-4" />
          </div>

          {/* Desktop: decorative golden box — overflow:visible so glows aren't clipped */}
          <div className="hidden md:flex justify-center" style={{ overflow: 'visible' }}>
            <div style={{ position: 'relative', overflow: 'visible', padding: '2.5rem 4rem' }}>
              <div style={{
                position: 'absolute',
                inset: 0,
                borderRadius: '1rem',
                border: '1px solid rgba(234, 179, 8, 0.25)',
                background: 'linear-gradient(to bottom, rgba(234,179,8,0.05), transparent)',
                boxShadow: '0 0 40px rgba(234, 179, 8, 0.06)',
                pointerEvents: 'none',
              }} />
              <div
                className="flex hide-scrollbar gap-16"
                style={{ position: 'relative', overflowX: 'auto', overflowY: 'visible', padding: '30px', margin: '-30px' }}
              >
                {premiumTools.map((tool, index) => (
                  <ToolIcon key={index} tool={tool} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Regular Tools */}
        <div className="relative">
          {/* Free Tools label */}
          <div className="flex items-center justify-center gap-4 mb-8">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/50" />
            <span className="text-[9px] tracking-[0.35em] font-bold uppercase text-white" style={{ textShadow: '0 0 16px rgba(255,255,255,0.6)' }}>
              Free Tools
            </span>
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/50" />
          </div>

          {/* Mobile: 4 tools visible + swipe for more. Desktop: centered row */}
          <div className="relative">
            <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-black to-transparent pointer-events-none z-10 md:hidden" />
            <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-black to-transparent pointer-events-none z-10 md:hidden" />
            <div ref={freeScrollRef} className="flex overflow-x-auto hide-scrollbar md:justify-center gap-[10px] md:gap-16 pb-10 pt-10 px-4 md:px-0 scroll-smooth">
              {utilities.map((tool, index) => (
                <ToolIcon key={index} tool={tool} compact={true} />
              ))}
            </div>
          </div>
        </div>

      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}} />
    </section>
  );
}
