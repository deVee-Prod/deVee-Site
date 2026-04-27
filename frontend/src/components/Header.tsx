import { useState } from 'react';
import { HamburgerMenu } from './HamburgerMenu';
import { SiWhatsapp } from 'react-icons/si';

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-black relative z-30">
      {/* sm: ומטה (מובייל) — container mx-auto כמו קודם */}
      {/* md: ומעלה (דסקטופ) — w-full כדי להתפרס לקצוות */}
      <div className="container mx-auto md:max-w-none px-4 sm:px-6 pt-4 sm:pt-6 pb-1 sm:pb-2 flex justify-between items-center">
        {/* Logo - Left Side (Made slightly smaller on mobile for balance) */}
        <img 
          src="/deVee Sign Transperent-1.png" 
          alt="deVee Logo"
          className="h-10 sm:h-12 w-auto object-contain"
        />

        {/* Right Side Actions - WhatsApp and Menu pinned together */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* WhatsApp Icon Button - Small & Clean */}
          <a
            href="https://wa.me/972542021618"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center bg-[#25D366] text-white w-9 h-9 sm:w-10 sm:h-10 rounded-full transition-all duration-300 hover:scale-110 active:scale-95 shadow-[0_0_15px_rgba(37,211,102,0.3)]"
            aria-label="Contact on WhatsApp"
          >
            {/* Reduced icon size: w-4 h-4 on mobile, w-5 h-5 on larger screens */}
            <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" />
          </a>

          {/* Hamburger Menu */}
          <HamburgerMenu
            isOpen={isMenuOpen}
            onClose={() => setIsMenuOpen(false)}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
          />
        </div>
      </div>
    </header>
  );
}
