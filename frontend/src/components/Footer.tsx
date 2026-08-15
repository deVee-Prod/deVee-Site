import { Heart } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export function Footer() {
  return (
    <footer className="relative py-5 px-6 border-t border-white/5">
      <div className="container mx-auto max-w-6xl">
        {/* Footer Text */}
        <div className="text-center mb-4">
          <p className="text-white text-base font-montserrat">
            Let's Do Music.
          </p>
        </div>

        {/* Instagram */}
        <div className="text-center mb-4">
          <a
            href="https://www.instagram.com/devee_prod?igsh=aGNzODI5eXp6YjFq&utm_source=qr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram profile"
            className="inline-flex items-center justify-center text-white/50 hover:text-white transition-colors duration-300"
          >
            <SiInstagram className="w-5 h-5" />
          </a>
        </div>

        {/* SoundBetter Badge */}
        <div className="text-center mb-4">
          <a
            href="https://soundbetter.com/profiles/650261-devee_prod"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="SoundBetter profile"
          >
            <img
              src="https://d2p6ecj15pyavq.cloudfront.net/assets/SoundBetterBadge-c84cb3e75c4267f5bee41f7f617a81d9.svg"
              alt="SoundBetter"
              style={{ maxWidth: '130px' }}
              className="inline-block"
            />
          </a>
        </div>

        {/* Copyright */}
        <div className="text-center text-white/50 text-sm">
          <p className="flex items-center justify-center gap-2">
            © 2025. Built with{' '}
            <Heart className="w-4 h-4 text-orange-500 fill-orange-500" />{' '}
            using{' '}
            <a
              href="https://caffeine.ai"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/70 hover:text-orange-500 transition-colors duration-300 underline underline-offset-4"
            >
              caffeine.ai
            </a>
          </p>
          {/* הלינק עבור גוגל - שקוף כמעט ולא משנה את העיצוב */}
          <div className="mt-2 flex items-center justify-center gap-4">
            <a 
              href="/privacy.html" 
              className="text-white/10 hover:text-white/30 text-[10px] uppercase tracking-[0.2em]"
            >
              Privacy Policy
            </a>
            <a 
              href="/nagishut.html" 
              className="text-white/10 hover:text-white/30 text-[10px] uppercase tracking-[0.2em]"
            >
              Accessibility
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}