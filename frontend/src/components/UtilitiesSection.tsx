import React from 'react';

const utilities = [
  { name: "Reels Dubber", link: "https://reels-dubber.vercel.app/", img: "/reelsdubberlogo.png" },
  { name: "Reels Cutter", link: "https://reels-cutter.vercel.app/", img: "/reelscutterlogo.png" },
  { name: "Storm Form", link: "https://form-storm.vercel.app", img: "/stormformicon.png" },
  { name: "BPM Calc", link: "https://de-vee-bpm-calculator.vercel.app/", img: "/bpmcalculatorlogo.png" },
  { name: "File Converter", link: "https://de-vee-tools.vercel.app", img: "/fileconverterlogo.png" },
  { name: "PDF Killer", link: "https://pdf-killer-ten.vercel.app/", img: "/pdfkillerlogo.png" },
  { name: "Flash Juice", link: "https://flash-juice-3aya.vercel.app/", img: "/flashjuicelogo.png" },
  { name: "Release Ready", link: "https://release-ready-seven.vercel.app", img: "/Release%20ready%20icon.png" },
];

export function UtilitiesSection() {
  return (
    <section className="py-24 bg-black" id="utilities">
      <div className="container mx-auto px-4">
        
        {/* כותרת התמונה - שיניתי ל-PNG וטיפלתי ברווחים */}
        <div className="flex justify-center mb-20">
          <img 
            src="/tools%20for%20artists.png" 
            alt="Tools for Artists" 
            className="max-w-[300px] md:max-w-[400px] h-auto object-contain"
          />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-10 md:gap-12">
          {utilities.map((tool, index) => (
            <a 
              key={index} 
              href={tool.link} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="group flex flex-col items-center"
            >
              {/* לוגו עגול PNG */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border border-white/5 transition-all duration-500 group-hover:scale-110 group-hover:border-orange-500/50">
                <img 
                  src={tool.img} 
                  alt={tool.name} 
                  className="w-full h-full object-cover" 
                />
              </div>
              
              <span className="mt-4 text-[7px] md:text-[8px] tracking-[0.2em] text-white/20 group-hover:text-orange-500 transition-colors font-bold uppercase text-center">
                {tool.name}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}