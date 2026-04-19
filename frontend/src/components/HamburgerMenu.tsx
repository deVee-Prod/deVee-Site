import { useEffect } from 'react';
import { X, Menu } from 'lucide-react';
import { navigateTo } from '../router';

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function HamburgerMenu({ isOpen, onClose, onToggle }: HamburgerMenuProps) {
  // Handle Escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleNavigation = (path: string) => {
    navigateTo(path);
    onClose();
  };

  return (
    <>
      {/* Hamburger Icon Button */}
      <button
        onClick={onToggle}
        className="relative z-50 p-2 text-white hover:text-primary transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? (
          <X className="w-7 h-7" />
        ) : (
          <Menu className="w-7 h-7" />
        )}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Menu Panel */}
      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-primary/20 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full space-y-8">
          <button
            onClick={() => handleNavigation('/')}
            className="text-2xl font-bold text-white hover:text-primary transition-colors duration-300 tracking-wider"
          >
            Home
          </button>
          <button
            onClick={() => handleNavigation('/info')}
            className="text-2xl font-bold text-white hover:text-primary transition-colors duration-300 tracking-wider"
          >
            Info
          </button>
        </nav>
      </div>
    </>
  );
}
