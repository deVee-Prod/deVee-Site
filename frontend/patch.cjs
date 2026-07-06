const fs = require('fs');
const file = '/Users/davidbendavid/Documents/deVee Web/deVee Site/frontend/src/components/UtilitiesSection.tsx';
let code = fs.readFileSync(file, 'utf8');

const mobileCode = `
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
                    boxShadow: isActive ? \`0 0 35px \${tool.color.replace('0.85', '0.6')}\` : '0 10px 20px rgba(0,0,0,0.5)'
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
                    boxShadow: isActive ? \`0 0 25px \${tool.color.replace('0.85', '0.4')}\` : '0 10px 20px rgba(0,0,0,0.5)'
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

code = code.replace('export function UtilitiesSection', mobileCode + '\nexport function UtilitiesSection');

code = code.replace(
  '<SolarSystem />',
  `<div className="hidden md:block w-full">
            <SolarSystem />
          </div>
          <div className="block md:hidden w-full mt-4">
            <MobileTools3D />
          </div>`
);

fs.writeFileSync(file, code);
