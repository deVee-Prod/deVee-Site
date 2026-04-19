import { SiWhatsapp } from 'react-icons/si';

export function DirectLineBanner() {
  return (
    <div className="w-full py-12 px-4 sm:px-6">
      <div className="container mx-auto max-w-2xl">
        {/* Centered WhatsApp Contact Block */}
        <div className="flex justify-center">
          <a
            href="https://wa.me/972542021618"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex flex-col items-center gap-4 transition-transform duration-300 ease-in-out hover:scale-105 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-4 focus-visible:ring-offset-black rounded-full"
          >
            {/* Large Orange Circle with Black WhatsApp Icon */}
            <div className="w-24 h-24 sm:w-30 sm:h-30 rounded-full bg-orange-500 flex items-center justify-center transition-all duration-300 ease-in-out group-hover:bg-orange-600">
              <SiWhatsapp className="w-10 h-10 sm:w-12 sm:h-12 text-black" />
            </div>
            {/* Text Label */}
            <span className="text-orange-500 font-bold text-base sm:text-lg tracking-[2px] uppercase">
              WHATSAPP
            </span>
          </a>
        </div>
      </div>
    </div>
  );
}
