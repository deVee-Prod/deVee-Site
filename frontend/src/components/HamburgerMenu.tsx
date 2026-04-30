import { useEffect, useState } from 'react';
import { X, Menu } from 'lucide-react';
import { navigateTo } from '../router';
import { supabase } from '../supabaseClient'; 

interface HamburgerMenuProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export function HamburgerMenu({ isOpen, onClose, onToggle }: HamburgerMenuProps) {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    checkUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

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

  const handleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        }
      });
      if (error) throw error;
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  // פונקציית התנתקות חדשה
  const handleLogout = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      onClose(); // סגירת התפריט לאחר התנתקות
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <>
      <button
        onClick={onToggle}
        className="relative z-50 p-2 text-white hover:text-primary transition-colors duration-300"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="w-7 h-7" /> : <Menu className="w-7 h-7" />}
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      <div
        className={`fixed top-0 right-0 h-full w-80 bg-black border-l border-primary/20 z-40 transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <nav className="flex flex-col items-center justify-start h-full space-y-8 pt-24">
          
          <div className="flex flex-col items-center mb-4">
            {user ? (
              <div className="flex flex-col items-center space-y-4">
                <img 
                  src={user.user_metadata.avatar_url} 
                  alt="Profile" 
                  className="w-16 h-16 rounded-full border border-white/20 shadow-lg"
                />
                {/* כפתור Logout נוסף כאן */}
                <button
                  onClick={handleLogout}
                  className="text-[10px] text-white/40 hover:text-red-500 transition-colors duration-300 uppercase tracking-tighter"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={handleLogin}
                className="px-6 py-2 border border-white/20 text-white/70 hover:text-white hover:border-white transition-all duration-300 text-xs font-bold uppercase tracking-widest"
              >
                Sign up with Google
              </button>
            )}
          </div>

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