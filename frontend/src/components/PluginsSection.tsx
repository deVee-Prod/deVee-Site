import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Download } from 'lucide-react';
import { supabase } from '../supabaseClient';

const plugins = [
  { id: 'phase', name: 'deVee Phase', img: '/plugins/phase.webp', desc: 'Select which channel to invert.' },
  { id: 'hole', name: 'deVee Hole', img: '/plugins/hole.webp', desc: 'Vocal Throw Generator.' },
  { id: 'blend', name: 'deVee Blend', img: '/plugins/blend.webp', desc: 'Spectral Sidechain Ducker.' },
  { id: 'haunt', name: 'deVee Haunt', img: '/plugins/haunt.webp', desc: 'Pre-verb Swell Generator.' }
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
    center: { x: '0%', scale: 1, z: 50, zIndex: 10, opacity: 1, rotateY: 0, rotateX: 0, filter: 'brightness(100%)', boxShadow: '0 30px 60px -15px rgba(249, 115, 22, 0.5), inset 0 0 0 1px rgba(255,255,255,0.2)' },
    left: { x: '-60%', scale: 0.75, z: -100, zIndex: 5, opacity: 0.5, rotateY: 55, rotateX: 5, filter: 'brightness(30%)', boxShadow: '20px 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255,255,255,0.1)' },
    right: { x: '60%', scale: 0.75, z: -100, zIndex: 5, opacity: 0.5, rotateY: -55, rotateX: 5, filter: 'brightness(30%)', boxShadow: '-20px 20px 40px -10px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255,255,255,0.1)' },
    back: { x: '0%', scale: 0.4, z: -200, zIndex: 1, opacity: 0, rotateY: 0, rotateX: 0, filter: 'brightness(10%)', boxShadow: '0 0px 0px rgba(0,0,0,0)' }
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
      try {
        const fileNameMap: Record<string, string> = {
          'phase': 'deVee_Phase.zip',
          'hole': 'deVee_Hole.zip',
          'blend': 'deVee_Haunt.zip',
          'haunt': 'deVee_Blend.zip'
        };
        
        const fileName = fileNameMap[plugin.id];
        if (!fileName) return;

        // Request a secure signed URL valid for 60 seconds
        const { data, error } = await supabase.storage
          .from('devee-plugins')
          .createSignedUrl(fileName, 60);
          
        if (error) throw error;
        
        if (data?.signedUrl) {
          // Trigger the download
          const a = document.createElement('a');
          a.href = data.signedUrl;
          a.download = fileName;
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } catch (error) {
        console.error('Error downloading plugin:', error);
        alert('There was an issue downloading the plugin. Please make sure your email is verified or contact support.');
      }
    }
  };

  const handleDownloadExclusive = async () => {
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
      try {
        // Request a secure signed URL valid for 60 seconds
        const { data, error } = await supabase.storage
          .from('devee-plugins')
          .createSignedUrl('360 v1.0.zip', 60);
          
        if (error) throw error;
        
        if (data?.signedUrl) {
          const a = document.createElement('a');
          a.href = data.signedUrl;
          a.download = '360 v1.0.zip';
          document.body.appendChild(a);
          a.click();
          document.body.removeChild(a);
        }
      } catch (error) {
        console.error('Error downloading plugin:', error);
        alert('There was an issue downloading the plugin. Make sure the file "360 v1.0.zip" is uploaded in the "plugins" bucket.');
      }
    }
  };

  const activePlugin = plugins[activeIndex];

  return (
    <section className="pt-0 pb-24 relative overflow-hidden" id="plugins">
      {/* Background glow - fixed safari blur rectangle bug */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[600px] md:h-[600px] bg-red-500/10 rounded-full blur-[80px] md:blur-[120px] pointer-events-none opacity-50 md:opacity-100" />
      
      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        
        {/* Section Title Image */}
        <div className="mb-0 sm:mb-2 flex justify-center mt-[-40px] md:mt-[-20px] relative z-20">
          <img 
            src="/plugins/title.png" 
            alt="Plugins for Artists" 
            loading="lazy"
            className="w-[90%] max-w-[320px] md:max-w-[650px] h-auto object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] mx-auto" 
          />
        </div>

        {/* deVee Exclusive Plugin: 360 */}
        <div className="relative w-full max-w-4xl mx-auto mt-0 md:mt-[-20px] mb-24 flex flex-col items-center">

          {/* Plugin Image */}
          <div className="w-full relative px-4 sm:px-12 group">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-red-500/10 to-orange-500/10 blur-3xl opacity-50 group-hover:opacity-80 transition-opacity duration-700" />
            <img 
              src="/plugins/360_plugin.png" 
              alt="deVee 360 Plugin"
              className="w-full h-auto object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.8)] relative z-10 transition-transform duration-700 hover:scale-[1.02]"
            />
          </div>

          {/* Text and Actions */}
          <div className="flex flex-col items-center text-center mt-8 px-4 z-20">
            <h3 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-2 drop-shadow-md">
              360° <span className="text-white/40 font-light text-2xl md:text-3xl">— Phase, per note.</span>
            </h3>
            <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed mb-8 font-light">
              A fixed delay in milliseconds is a different phase angle at every note — so it's wrong the moment your bassline moves. <strong className="text-white">360</strong> works in degrees and re-picks the alignment on every kick hit, for whatever note the bass is playing.<br/><br/>
              With 360 Analyzer, a zero-latency meter for the kick+bass bus. <span className="text-orange-400 font-bold">VST3 · AU</span>
            </p>

            <button
              onClick={handleDownloadExclusive}
              className="group relative flex items-center gap-2 md:gap-3 px-6 py-3 md:px-10 md:py-5 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-500 hover:to-red-500 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_40px_rgba(249,115,22,0.6)] transition-all duration-300"
            >
              <Download className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:-translate-y-1 transition-transform duration-300" />
              <span className="font-bold uppercase tracking-widest text-xs md:text-sm text-white drop-shadow-md">
                {user ? 'Download 360' : 'Sign In To Download'}
              </span>
            </button>
          </div>
        </div>

        {/* Divider / Spacer before the carousel */}
        <div className="w-full max-w-lg h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-12 hidden md:block mx-auto" />

        {/* Screen Reader Only List of Plugins */}
        <div className="sr-only">
          <h2>deVee Plugins for Artists</h2>
          <ul>
            {plugins.map(plugin => (
              <li key={plugin.id}>
                {plugin.name} - {plugin.description} (Price: {plugin.price})
              </li>
            ))}
          </ul>
        </div>

        {/* 3D Carousel (Hidden from screen readers) */}
        <div className="relative w-full max-w-5xl h-[280px] sm:h-[400px] md:h-[480px] flex justify-center items-center perspective-[1200px] mb-0 transform-gpu mt-[-20px] md:mt-0" aria-hidden="true">
          {plugins.map((plugin, index) => {
            const variant = getVariant(index);
            const isActive = variant === 'center';
            return (
              <motion.div
                key={plugin.id}
                variants={variants}
                initial={false}
                animate={variant}
                whileHover={isActive ? { scale: 1.05, rotateX: -2, rotateY: 2, transition: { duration: 0.3 } } : {}}
                transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                className={`absolute w-[75%] sm:w-[55%] md:w-[45%] max-w-[550px] aspect-[4/3] rounded-2xl overflow-hidden shadow-2xl cursor-pointer ${isActive ? 'ring-1 ring-orange-500/50' : 'border border-white/10'}`}
                style={{ 
                  WebkitBoxReflect: 'below 10px linear-gradient(transparent 60%, rgba(255,255,255,0.2))',
                  transformStyle: 'preserve-3d'
                }}
                onClick={() => !isActive && setActiveIndex(index)}
              >
                {/* Side thickness illusion for 3D */}
                {!isActive && variant === 'left' && <div className="absolute right-0 inset-y-0 w-6 bg-gradient-to-r from-transparent to-black/90 z-20 pointer-events-none" style={{ transform: 'rotateY(90deg)', transformOrigin: 'right' }} />}
                {!isActive && variant === 'right' && <div className="absolute left-0 inset-y-0 w-6 bg-gradient-to-l from-transparent to-black/90 z-20 pointer-events-none" style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left' }} />}
                {/* 3D Inner Highlight */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-10" />
                <img 
                  src={plugin.img} 
                  alt={plugin.name} 
                  loading="lazy"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            );
          })}

          {/* Navigation Controls inside Carousel */}
          <button 
            onClick={handlePrev}
            className="absolute left-0 sm:left-4 md:left-8 z-20 p-2 text-white/40 hover:text-orange-400 hover:-translate-x-2 transition-all duration-300"
          >
            <svg width="30" height="80" viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_currentColor]">
              <path d="M25 5 L5 40 L25 75" />
            </svg>
          </button>
          
          <button 
            onClick={handleNext}
            className="absolute right-0 sm:right-4 md:right-8 z-20 p-2 text-white/40 hover:text-orange-400 hover:translate-x-2 transition-all duration-300"
          >
            <svg width="30" height="80" viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-[0_0_10px_currentColor]">
              <path d="M5 5 L25 40 L5 75" />
            </svg>
          </button>
        </div>

        {/* Active Plugin Info & Download */}
        <div className="flex flex-col items-center text-center mt-[-10px] md:mt-0 relative z-20">
          <p className="text-white/40 text-[10px] sm:text-xs max-w-md text-balance leading-relaxed mb-4 px-4">
            Note: As a newly released plugin, your browser may display a standard security warning. It is 100% safe to download.
          </p>

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
