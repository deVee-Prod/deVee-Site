import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const utilities = [
  { name: "Reels Dubber", link: "https://reels-dubber.vercel.app/", img: "/reelsdubberlogo.png" },
  { name: "Reels Cutter", link: "https://reels-cutter.vercel.app/", img: "/reelscutterlogo.png" },
  { name: "Storm Form", link: "https://form-storm.vercel.app", img: "/stormformicon.png" },
  { name: "BPM Calculator", link: "https://de-vee-bpm-calculator.vercel.app/", img: "/bpmcalculatorlogo.png" },
  { name: "File Converter", link: "https://de-vee-tools.vercel.app", img: "/fileconverterlogo.png" },
  { name: "PDF Killer", link: "https://pdf-killer-ten.vercel.app/", img: "/pdfkillerlogo.png" },
  { name: "Flash Juice", link: "https://flash-juice-3aya.vercel.app/", img: "/flashjuicelogo.png" },
  { name: "Release Ready", link: "https://release-ready-seven.vercel.app", img: "/Release%20ready%20icon.png" },
];

export function UtilitiesSection() {
  return (
    <section className="py-24 bg-black" id="utilities">
      <div className="container mx-auto px-4">
        
        {/* כותרת ורמז גלילה */}
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

        {/* רשימת הכלים */}
        <div className="relative group">
          <div className="flex overflow-x-auto hide-scrollbar snap-x snap-mandatory md:grid md:grid-cols-8 gap-6 md:gap-12 pb-4 px-4 md:px-0 scroll-smooth">
            {utilities.map((tool, index) => (
              <a 
                key={index} 
                href={tool.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-shrink-0 snap-center group flex flex-col items-center w-[105px] md:w-auto"
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/50 shadow-2xl">
                  <img 
                    src={tool.img} 
                    alt={tool.name} 
                    className="w-full h-full object-cover" 
                  />
                </div>
                
                {/* טקסט נשאר בלבן/אפור ללא שינוי צבע ב-Hover */}
                <span className="mt-4 text-[7px] md:text-[8px] tracking-[0.2em] text-white/20 font-bold uppercase text-center whitespace-nowrap transition-opacity duration-300">
                  {tool.name}
                </span>
              </a>
            ))}
            <div className="flex-shrink-0 w-8 md:hidden"></div>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}} />
    </section>
  );
}