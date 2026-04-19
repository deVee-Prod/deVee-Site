import { Heart } from 'lucide-react';

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

        {/* SoundBetter Badge */}
        <div className="text-center mb-4">
          <a
            href="https://soundbetter.com/profiles/650261-devee_prod"
            target="_blank"
            rel="noopener noreferrer"
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
        </div>
      </div>
    </footer>
  );
}

