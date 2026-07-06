const fs = require('fs');
const file = '/Users/davidbendavid/Documents/deVee Web/deVee Site/frontend/src/components/UtilitiesSection.tsx';
let code = fs.readFileSync(file, 'utf8');

const mobileCoverflowCode = `
// ─────────────────────────────────────────────
// Mobile Coverflow (Carousel)
// ─────────────────────────────────────────────
function MobileCoverflow() {
  const allTools = [
    ...premiumTools.map(t => ({ ...t, isPremium: true })),
    ...utilities.map(t => ({ ...t, isPremium: false }))
  ];
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedTool, setSelectedTool] = useState<any | null>(null);

  const touchStartX = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const diff = touchStartX.current - e.changedTouches[0].clientX;
    if (diff > 50) {
      setActiveIndex(prev => Math.min(prev + 1, allTools.length - 1));
    } else if (diff < -50) {
      setActiveIndex(prev => Math.max(prev - 1, 0));
    }
    touchStartX.current = null;
  };

  return (
    <div 
      className="relative w-full h-[400px] flex items-center justify-center overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{ perspective: '1000px' }}
    >
      <div className="absolute top-2 w-full text-center text-[9px] tracking-widest text-white/30 uppercase font-bold pointer-events-none">
        Swipe to explore tools
      </div>
      
      <div className="relative w-full h-[300px] flex items-center justify-center transform-style-3d">
        {allTools.map((tool, index) => {
          const isActive = index === activeIndex;
          const offset = index - activeIndex;
          const absOffset = Math.abs(offset);
          
          const translateX = offset * 110;
          const translateZ = absOffset * -100;
          const rotateY = offset * -25;
          const opacity = absOffset > 2 ? 0 : 1 - (absOffset * 0.3);
          const zIndex = 100 - absOffset;

          return (
            <div
              key={index}
              onClick={() => isActive ? setSelectedTool(tool) : setActiveIndex(index)}
              className="absolute transition-all duration-500 ease-out flex flex-col items-center justify-center cursor-pointer"
              style={{
                transform: \`translateX(\${translateX}px) translateZ(\${translateZ}px) rotateY(\${rotateY}deg)\`,
                opacity,
                zIndex,
              }}
            >
              <div className="relative">
                <div 
                  className="w-28 h-28 rounded-full overflow-hidden border transition-all duration-500"
                  style={{ 
                    borderColor: isActive ? tool.color : 'rgba(255, 255, 255, 0.1)',
                    boxShadow: isActive ? \`0 0 35px \${tool.color.replace('0.85', '0.5')}\` : '0 10px 30px rgba(0,0,0,0.5)',
                    transform: isActive ? 'scale(1.1)' : 'scale(1)'
                  }}
                >
                  <img src={tool.img} alt={tool.name} className="w-full h-full object-cover" />
                </div>
                {tool.isPremium && <PremiumCrown />}
              </div>
              
              <div className={\`mt-8 flex flex-col items-center transition-all duration-500 \${isActive ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-4 pointer-events-none'}\`}>
                <h3 className="font-black uppercase tracking-widest text-white text-xl drop-shadow-md text-center">
                  {tool.name}
                </h3>
                <p className="mt-2 text-[12px] text-white/60 text-center max-w-[240px] leading-relaxed">
                  {tool.desc}
                </p>
                <button 
                  onClick={(e) => { e.stopPropagation(); setSelectedTool(tool); }}
                  className="mt-5 px-6 py-2 rounded-full font-bold uppercase tracking-[0.2em] text-[10px] text-black bg-white hover:bg-gray-200 active:scale-[0.98] transition-all shadow-[0_0_15px_rgba(255,255,255,0.3)]"
                >
                  View Tool
                </button>
              </div>
            </div>
          );
        })}
      </div>
      
      {/* Pagination Dots */}
      <div className="absolute bottom-2 flex gap-1.5">
        {allTools.map((_, index) => (
          <div 
            key={index}
            onClick={() => setActiveIndex(index)}
            className={\`h-1.5 rounded-full transition-all duration-300 cursor-pointer \${index === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/20'}\`}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedTool && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-5 bg-black/70 backdrop-blur-md" style={{ pointerEvents: 'auto' }} onClick={() => setSelectedTool(null)}>
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-8 max-w-[320px] w-full shadow-2xl relative flex flex-col items-center text-center animate-in fade-in zoom-in duration-200" onClick={e => e.stopPropagation()}>
            <button onClick={() => setSelectedTool(null)} className="absolute top-5 right-5 text-white/40 hover:text-white transition-colors">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
            </button>
            <div className="w-24 h-24 rounded-full overflow-hidden border border-white/10 mb-6 shadow-lg" style={{ boxShadow: \`0 0 35px \${selectedTool.color.replace('0.85', '0.4')}\` }}>
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

`;

code = code.replace('export function UtilitiesSection', mobileCoverflowCode + 'export function UtilitiesSection');

code = code.replace(
  '<SolarSystem />',
  `<div className="hidden md:block w-full">
            <SolarSystem />
          </div>
          <div className="block md:hidden w-full mt-12 mb-4">
            <MobileCoverflow />
          </div>`
);

fs.writeFileSync(file, code);
