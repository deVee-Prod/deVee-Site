import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { supabase } from '../supabaseClient';

const plugins = [
  { id: 'phase', name: 'deVee Phase', img: '/plugins/phase.png', desc: 'Select which channel to invert.' },
  { id: 'hole', name: 'deVee Hole', img: '/plugins/hole.png', desc: 'Vocal Throw Generator.' },
  { id: 'blend', name: 'deVee Blend', img: '/plugins/blend.jpg', desc: 'Spectral Sidechain Ducker.' },
  { id: 'haunt', name: 'deVee Haunt', img: '/plugins/haunt.png', desc: 'Pre-verb Swell Generator.' }
];

export function PluginsSection() {
  const [activeIndex, setActiveIndex] = useState(0);
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

  const handleNext = () => setActiveIndex((prev) => (prev + 1) % plugins.length);
  const handlePrev = () => setActiveIndex((prev) => (prev - 1 + plugins.length) % plugins.length);

  const getVariant = (index: number) => {
    const diff = index - activeIndex;
    let wrappedDiff = diff;
    if (Math.abs(diff) > plugins.length / 2) {
      if (diff > 0) wrappedDiff = diff - plugins.length;
      else wrappedDiff = diff + plugins.length;
    }
    
    if (wrappedDiff === 0) return 'center';
    if (wrappedDiff === 1) return 'right';
    if (wrappedDiff === -1) return 'left';
    return 'back';
  };

  const variants = {
    center: { x: '0%', scale: 1, zIndex: 10, opacity: 1, rotateY: 0, filter: 'brightness(100%)' },
    left: { x: '-60%', scale: 0.75, zIndex: 5, opacity: 0.6, rotateY: 20, filter: 'brightness(40%)' },
    right: { x: '60%', scale: 0.75, zIndex: 5, opacity: 0.6, rotateY: -20, filter: 'brightness(40%)' },
    back: { x: '0%', scale: 0.5, zIndex: 1, opacity: 0, rotateY: 0, filter: 'brightness(20%)' }
  };

  const handleDownload = async (plugin: typeof plugins[0]) => {
    if (!user) {
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
    } else {
      // Future logic: Trigger signed URL download from Supabase bucket
      alert(`Download started for ${plugin.name} (Mac & Windows versions available soon)`);
    }
  };

  const activePlugin = plugins[activeIndex];

  return (
    <section className="py-20 relative overflow-hidden" id="plugins">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-500/10 rounded-full blur-[120px] pointer-events-none" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Section Title Image */}
        <div className="mb-12 flex justify-center">
          <img 
            src="/plugins/title.png" 
            alt="Plugins for Artists" 
            className="w-full max-w-[400px] md:max-w-[600px] object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.3)]" 
          />
        </div>

        {/* 3D Carousel */}
        <div className="relative w-full max-w-5xl h-[300px] sm:h-[400px] md:h-[500px] flex justify-center items-center perspective-[1200px] mb-8">
          {plugins.map((plugin, index) => {
            const variant = getVariant(index);
            const isActive = variant === 'center';
            return (
              <motion.div
                key={plugin.id}
                variants={variants}
                initial={false}
                animate={variant}
                transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
                className="absolute w-[80%] sm:w-[60%] md:w-[50%] max-w-[600px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl border border-white/10 cursor-pointer"
                onClick={() => !isActive && setActiveIndex(index)}
              >
                <img 
                  src={plugin.img} 
                  alt={plugin.name} 
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            );
          })}

          {/* Navigation Controls inside Carousel */}
          <button 
            onClick={handlePrev}
            className="absolute left-2 sm:left-10 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-r from-orange-600/80 to-orange-400/80 hover:from-orange-500 hover:to-orange-300 border border-orange-300/50 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] hover:-translate-x-1 transition-all backdrop-blur-md"
          >
            <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-2 sm:right-10 z-20 p-3 sm:p-4 rounded-full bg-gradient-to-l from-orange-600/80 to-orange-400/80 hover:from-orange-500 hover:to-orange-300 border border-orange-300/50 text-white shadow-[0_0_20px_rgba(249,115,22,0.5)] hover:shadow-[0_0_30px_rgba(249,115,22,0.8)] hover:translate-x-1 transition-all backdrop-blur-md"
          >
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 drop-shadow-lg" />
          </button>
        </div>

        {/* Active Plugin Info & Download */}
        <div className="flex flex-col items-center text-center mt-2">
          <button
            onClick={() => handleDownload(activePlugin)}
            className="group relative flex items-center gap-3 px-8 py-4 bg-white/5 hover:bg-white/10 border border-white/20 rounded-full transition-all duration-300 overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <Download className="w-5 h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
            <span className="font-bold uppercase tracking-wider text-sm">
              {user ? 'Download Now' : 'Sign In To Download'}
            </span>
          </button>
        </div>

      </div>
    </section>
  );
}
