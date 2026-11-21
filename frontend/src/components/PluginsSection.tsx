import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download } from 'lucide-react';
import { supabase } from '../supabaseClient';
import { useNoTabStop } from '../utils/useNoTabStop';
import { EXCLUSIVE_PLUGINS, type ExclusivePlugin } from '../data/exclusivePlugins';
import { DownloadNoticeDialog, type PendingDownload } from './DownloadNoticeDialog';

const classicPlugins = [
  { id: 'phase', name: 'deVee Phase', img: '/plugins/phase.webp', desc: 'Select which channel to invert.' },
  { id: 'hole', name: 'deVee Hole', img: '/plugins/hole.webp', desc: 'Vocal Throw Generator.' },
  { id: 'blend', name: 'deVee Blend', img: '/plugins/blend.webp', desc: 'Spectral Sidechain Ducker.' },
  { id: 'haunt', name: 'deVee Haunt', img: '/plugins/haunt.webp', desc: 'Pre-verb Swell Generator.' },
];

export function PluginsSection() {
  const exclusiveDecorativeRef = useNoTabStop<HTMLDivElement>();
  const classicDecorativeRef = useNoTabStop<HTMLDivElement>();

  // Center 360° (index 1) between Slap01 (left) and Pitcher (right) by default
  const [exclusiveIndex, setExclusiveIndex] = useState(1);
  const [classicIndex, setClassicIndex] = useState(0);
  const [user, setUser] = useState<any>(null);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [pendingDownload, setPendingDownload] = useState<PendingDownload | null>(null);

  const exclusiveTouchStartX = useRef<number | null>(null);
  const classicTouchStartX = useRef<number | null>(null);

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

  const handleExclusiveNext = () =>
    setExclusiveIndex((prev) => (prev + 1) % EXCLUSIVE_PLUGINS.length);
  const handleExclusivePrev = () =>
    setExclusiveIndex((prev) => (prev - 1 + EXCLUSIVE_PLUGINS.length) % EXCLUSIVE_PLUGINS.length);

  const handleClassicNext = () =>
    setClassicIndex((prev) => (prev + 1) % classicPlugins.length);
  const handleClassicPrev = () =>
    setClassicIndex((prev) => (prev - 1 + classicPlugins.length) % classicPlugins.length);

  const getWrappedVariant = (index: number, active: number, total: number) => {
    const diff = index - active;
    let wrappedDiff = diff;
    if (Math.abs(diff) > total / 2) {
      if (diff > 0) wrappedDiff = diff - total;
      else wrappedDiff = diff + total;
    }

    if (wrappedDiff === 0) return 'center';
    if (wrappedDiff === 1) return 'right';
    if (wrappedDiff === -1) return 'left';
    return 'back';
  };

  const exclusiveVariants = {
    center: {
      x: '0%',
      scale: 1,
      z: 60,
      zIndex: 10,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      filter: 'brightness(100%)',
      boxShadow:
        '0 32px 70px -15px rgba(249, 115, 22, 0.42), inset 0 0 0 1px rgba(255,255,255,0.2)',
    },
    left: {
      x: '-56%',
      scale: 0.72,
      z: -120,
      zIndex: 5,
      opacity: 0.48,
      rotateY: 44,
      rotateX: 4,
      filter: 'brightness(36%)',
      boxShadow:
        '20px 24px 50px -12px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(255,255,255,0.1)',
    },
    right: {
      x: '56%',
      scale: 0.72,
      z: -120,
      zIndex: 5,
      opacity: 0.48,
      rotateY: -44,
      rotateX: 4,
      filter: 'brightness(36%)',
      boxShadow:
        '-20px 24px 50px -12px rgba(0, 0, 0, 0.85), inset 0 0 0 1px rgba(255,255,255,0.1)',
    },
    back: {
      x: '0%',
      scale: 0.4,
      z: -220,
      zIndex: 1,
      opacity: 0,
      rotateY: 0,
      rotateX: 0,
      filter: 'brightness(15%)',
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
    },
  };

  const classicVariants = {
    center: {
      x: '0%',
      scale: 1,
      z: 40,
      zIndex: 10,
      opacity: 1,
      rotateY: 0,
      rotateX: 0,
      filter: 'brightness(100%)',
      boxShadow:
        '0 22px 45px -12px rgba(249, 115, 22, 0.35), inset 0 0 0 1px rgba(255,255,255,0.18)',
    },
    left: {
      x: '-58%',
      scale: 0.74,
      z: -90,
      zIndex: 5,
      opacity: 0.42,
      rotateY: 50,
      rotateX: 4,
      filter: 'brightness(32%)',
      boxShadow:
        '16px 16px 32px -8px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
    },
    right: {
      x: '58%',
      scale: 0.74,
      z: -90,
      zIndex: 5,
      opacity: 0.42,
      rotateY: -50,
      rotateX: 4,
      filter: 'brightness(32%)',
      boxShadow:
        '-16px 16px 32px -8px rgba(0, 0, 0, 0.8), inset 0 0 0 1px rgba(255,255,255,0.08)',
    },
    back: {
      x: '0%',
      scale: 0.4,
      z: -180,
      zIndex: 1,
      opacity: 0,
      rotateY: 0,
      rotateX: 0,
      filter: 'brightness(10%)',
      boxShadow: '0 0px 0px rgba(0,0,0,0)',
    },
  };

  const signInWithGoogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
          queryParams: {
            access_type: 'offline',
            prompt: 'select_account',
          },
        },
      });
      if (error) throw error;
    } catch (error) {
      console.error('Authentication error:', error);
    }
  };

  const triggerSignedDownload = async (bucket: string, fileName: string, key: string) => {
    setDownloadingId(key);
    try {
      const { data, error } = await supabase.storage
        .from(bucket)
        .createSignedUrl(fileName, 60);

      if (error) throw error;

      if (data?.signedUrl) {
        const a = document.createElement('a');
        a.href = data.signedUrl;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
      }
    } catch (error) {
      console.error('Error downloading plugin:', error);
      alert(
        `There was an issue downloading "${fileName}". Please make sure the file is uploaded in the "${bucket}" bucket or contact support.`
      );
    } finally {
      setDownloadingId(null);
    }
  };

  const handleDownloadExclusive = async (plugin: ExclusivePlugin) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    setPendingDownload({
      name: plugin.name,
      fileName: plugin.storageFile,
      bucket: plugin.bucket,
      img: plugin.img,
      formats: plugin.formats,
    });
  };

  const handleDownloadClassic = async (plugin: typeof classicPlugins[0]) => {
    if (!user) {
      await signInWithGoogle();
      return;
    }
    const fileNameMap: Record<string, string> = {
      phase: 'deVee_Phase.zip',
      hole: 'deVee_Hole.zip',
      blend: 'deVee_Haunt.zip',
      haunt: 'deVee_Blend.zip',
    };
    const fileName = fileNameMap[plugin.id];
    if (!fileName) return;
    setPendingDownload({
      name: plugin.name,
      fileName,
      bucket: 'devee-plugins',
      img: plugin.img,
    });
  };

  const handleConfirmPendingDownload = async (item: PendingDownload) => {
    await triggerSignedDownload(item.bucket, item.fileName, item.fileName);
  };

  const activeExclusive = EXCLUSIVE_PLUGINS[exclusiveIndex];
  const activeClassic = classicPlugins[classicIndex];

  return (
    <section className="pt-0 pb-20 relative overflow-hidden" id="plugins">
      {/* Background glow - fixed safari blur rectangle bug */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] md:w-[640px] md:h-[640px] bg-orange-500/10 rounded-full blur-[90px] md:blur-[130px] pointer-events-none opacity-50 md:opacity-100" />

      <div className="container mx-auto px-4 relative z-10 flex flex-col items-center">
        {/* Section Title Image */}
        <div className="mb-0 flex justify-center mt-[-40px] md:mt-[-20px] relative z-20">
          <img
            src="/plugins/title.webp"
            alt="Plugins for Artists"
            loading="lazy"
            className="w-[85%] max-w-[280px] md:max-w-[650px] h-auto object-contain drop-shadow-[0_0_20px_rgba(234,179,8,0.3)] mx-auto"
          />
        </div>

        {/* Screen Reader Only List of All Plugins */}
        <div className="sr-only">
          <h2>deVee Exclusive Plugins</h2>
          <ul>
            {EXCLUSIVE_PLUGINS.map((plugin) => (
              <li key={plugin.id}>
                <a href={`/plugins/${plugin.slug}`}>
                  {plugin.brandName} — {plugin.tagline} ({plugin.formats})
                </a>
              </li>
            ))}
          </ul>
          <h3>deVee Classic Mini-Plugins</h3>
          <ul>
            {classicPlugins.map((plugin) => (
              <li key={plugin.id}>
                {plugin.name} — {plugin.desc}
              </li>
            ))}
          </ul>
        </div>

        {/* ─────────────────────────────────────────────────────────── */}
        {/* FLAGSHIP 3D EXCLUSIVE SUITE: Slap01 · 360° · Pitcher        */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-6xl mx-auto mt-[-10px] md:mt-[-8px] mb-16 flex flex-col items-center">
          {/* 3D Carousel Stage */}
          <div
            ref={exclusiveDecorativeRef}
            className="relative w-full h-[250px] sm:h-[360px] md:h-[460px] flex justify-center items-center perspective-[1400px] transform-gpu"
            aria-hidden="true"
            onTouchStart={(e) => {
              exclusiveTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (exclusiveTouchStartX.current === null) return;
              const diff = exclusiveTouchStartX.current - e.changedTouches[0].clientX;
              if (diff > 40) handleExclusiveNext();
              else if (diff < -40) handleExclusivePrev();
              exclusiveTouchStartX.current = null;
            }}
          >
            {EXCLUSIVE_PLUGINS.map((plugin, index) => {
              const variant = getWrappedVariant(
                index,
                exclusiveIndex,
                EXCLUSIVE_PLUGINS.length
              );
              const isActive = variant === 'center';
              return (
                <motion.div
                  key={plugin.id}
                  variants={exclusiveVariants}
                  initial={false}
                  animate={variant}
                  whileHover={
                    isActive
                      ? { scale: 1.025, rotateX: -1.5, rotateY: 1.5, transition: { duration: 0.3 } }
                      : { opacity: 0.72, transition: { duration: 0.25 } }
                  }
                  transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`absolute w-[84%] sm:w-[68%] md:w-[60%] max-w-[700px] aspect-[16/10] rounded-2xl overflow-hidden bg-[#0c0c0e] cursor-pointer ${
                    isActive
                      ? 'ring-1 ring-orange-500/55'
                      : 'border border-white/10'
                  }`}
                  style={{
                    WebkitBoxReflect:
                      'below 10px linear-gradient(transparent 68%, rgba(255,255,255,0.14))',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => !isActive && setExclusiveIndex(index)}
                >
                  {/* Side thickness illusion */}
                  {!isActive && variant === 'left' && (
                    <div
                      className="absolute right-0 inset-y-0 w-6 bg-gradient-to-r from-transparent to-black/90 z-20 pointer-events-none"
                      style={{ transform: 'rotateY(90deg)', transformOrigin: 'right' }}
                    />
                  )}
                  {!isActive && variant === 'right' && (
                    <div
                      className="absolute left-0 inset-y-0 w-6 bg-gradient-to-l from-transparent to-black/90 z-20 pointer-events-none"
                      style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left' }}
                    />
                  )}
                  {/* 3D Inner Highlight */}
                  <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-orange-500/5 pointer-events-none z-10" />
                  <img
                    src={plugin.img}
                    alt={plugin.brandName}
                    width={plugin.imgWidth}
                    height={plugin.imgHeight}
                    loading="lazy"
                    decoding="async"
                    className="w-full h-full object-contain bg-[#0c0c0e]"
                  />
                </motion.div>
              );
            })}

            {/* Navigation Arrows */}
            <button
              type="button"
              onClick={handleExclusivePrev}
              aria-label="Previous exclusive plugin"
              className="absolute left-0 sm:left-2 md:left-4 z-20 p-2 text-white/40 hover:text-orange-400 hover:-translate-x-1.5 transition-all duration-300"
            >
              <svg
                width="30"
                height="80"
                viewBox="0 0 30 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_10px_currentColor]"
              >
                <path d="M25 5 L5 40 L25 75" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleExclusiveNext}
              aria-label="Next exclusive plugin"
              className="absolute right-0 sm:right-2 md:right-4 z-20 p-2 text-white/40 hover:text-orange-400 hover:translate-x-1.5 transition-all duration-300"
            >
              <svg
                width="30"
                height="80"
                viewBox="0 0 30 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="drop-shadow-[0_0_10px_currentColor]"
              >
                <path d="M5 5 L25 40 L5 75" />
              </svg>
            </button>
          </div>

          {/* Selector Pills (Slap01 · 360° · Pitcher) */}
          <div className="flex items-center justify-center gap-2 mt-4 sm:mt-6 z-20">
            {EXCLUSIVE_PLUGINS.map((plugin, index) => {
              const isSelected = index === exclusiveIndex;
              return (
                <button
                  key={plugin.id}
                  type="button"
                  onClick={() => setExclusiveIndex(index)}
                  className={`px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] transition-all duration-300 ${
                    isSelected
                      ? 'bg-orange-500/20 text-orange-300 border border-orange-500/50 shadow-[0_0_20px_rgba(249,115,22,0.25)]'
                      : 'bg-white/[0.03] text-white/45 hover:text-white/80 border border-white/10'
                  }`}
                >
                  {plugin.name}
                </button>
              );
            })}
          </div>

          {/* Active Flagship Copy & Download CTA */}
          <div className="flex flex-col items-center text-center mt-6 px-4 z-20 min-h-[220px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeExclusive.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.22 }}
                className="flex flex-col items-center"
              >
                <h3 className="text-3xl md:text-4xl font-black text-white tracking-wide mb-3 drop-shadow-md">
                  {activeExclusive.name}{' '}
                  <span className="text-white/40 font-light text-xl sm:text-2xl md:text-3xl">
                    — {activeExclusive.tagline}
                  </span>
                </h3>
                <p className="text-white/60 text-sm md:text-base max-w-2xl leading-relaxed mb-7 font-light">
                  {activeExclusive.homeSummary}
                  <br />
                  <span className="inline-block mt-2">
                    {activeExclusive.homeSecondary}{' '}
                    <span className="text-orange-400 font-bold">
                      {activeExclusive.formats}
                    </span>
                  </span>
                </p>

                <button
                  type="button"
                  disabled={downloadingId === `exclusive-${activeExclusive.id}`}
                  onClick={() => handleDownloadExclusive(activeExclusive)}
                  className={`group relative flex items-center gap-2.5 md:gap-3 px-7 py-3.5 md:px-10 md:py-4 bg-gradient-to-r ${activeExclusive.accentFrom} ${activeExclusive.accentTo} hover:brightness-110 disabled:opacity-60 rounded-full shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:shadow-[0_0_42px_rgba(249,115,22,0.62)] transition-all duration-300`}
                >
                  <Download className="w-4 h-4 md:w-5 md:h-5 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
                  <span className="font-bold uppercase tracking-widest text-xs md:text-sm text-white drop-shadow-md">
                    {downloadingId === `exclusive-${activeExclusive.id}`
                      ? 'Preparing Download...'
                      : user
                        ? activeExclusive.downloadLabel
                        : 'Sign In To Download'}
                  </span>
                </button>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* Hairline Divider before Compact Classic Bundle */}
        <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-white/12 to-transparent mb-10 mx-auto" />

        {/* ─────────────────────────────────────────────────────────── */}
        {/* COMPACT CLASSIC BUNDLE: Phase · Hole · Blend · Haunt        */}
        {/* ─────────────────────────────────────────────────────────── */}
        <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
          <p className="text-white/35 text-[10px] uppercase tracking-[0.32em] font-bold mb-2">
            Essential Mini-Plugins
          </p>

          {/* Compact 3D Carousel */}
          <div
            ref={classicDecorativeRef}
            className="relative w-full h-[195px] sm:h-[250px] md:h-[290px] flex justify-center items-center perspective-[1000px] mb-1 transform-gpu"
            aria-hidden="true"
            onTouchStart={(e) => {
              classicTouchStartX.current = e.touches[0].clientX;
            }}
            onTouchEnd={(e) => {
              if (classicTouchStartX.current === null) return;
              const diff = classicTouchStartX.current - e.changedTouches[0].clientX;
              if (diff > 40) handleClassicNext();
              else if (diff < -40) handleClassicPrev();
              classicTouchStartX.current = null;
            }}
          >
            {classicPlugins.map((plugin, index) => {
              const variant = getWrappedVariant(
                index,
                classicIndex,
                classicPlugins.length
              );
              const isActive = variant === 'center';
              return (
                <motion.div
                  key={plugin.id}
                  variants={classicVariants}
                  initial={false}
                  animate={variant}
                  whileHover={
                    isActive
                      ? { scale: 1.04, rotateX: -2, rotateY: 2, transition: { duration: 0.3 } }
                      : {}
                  }
                  transition={{ duration: 0.55, ease: [0.2, 0.8, 0.2, 1] }}
                  className={`absolute w-[62%] sm:w-[44%] md:w-[40%] max-w-[350px] aspect-[4/3] rounded-xl overflow-hidden shadow-xl cursor-pointer ${
                    isActive ? 'ring-1 ring-orange-500/45' : 'border border-white/10'
                  }`}
                  style={{
                    WebkitBoxReflect:
                      'below 8px linear-gradient(transparent 66%, rgba(255,255,255,0.14))',
                    transformStyle: 'preserve-3d',
                  }}
                  onClick={() => !isActive && setClassicIndex(index)}
                >
                  {!isActive && variant === 'left' && (
                    <div
                      className="absolute right-0 inset-y-0 w-5 bg-gradient-to-r from-transparent to-black/90 z-20 pointer-events-none"
                      style={{ transform: 'rotateY(90deg)', transformOrigin: 'right' }}
                    />
                  )}
                  {!isActive && variant === 'right' && (
                    <div
                      className="absolute left-0 inset-y-0 w-5 bg-gradient-to-l from-transparent to-black/90 z-20 pointer-events-none"
                      style={{ transform: 'rotateY(-90deg)', transformOrigin: 'left' }}
                    />
                  )}
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

            {/* Compact Navigation Controls */}
            <button
              type="button"
              onClick={handleClassicPrev}
              aria-label="Previous classic plugin"
              className="absolute left-1 sm:left-6 md:left-10 z-20 p-2 text-white/35 hover:text-orange-400 hover:-translate-x-1 transition-all duration-300"
            >
              <svg
                width="22"
                height="56"
                viewBox="0 0 30 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M25 5 L5 40 L25 75" />
              </svg>
            </button>

            <button
              type="button"
              onClick={handleClassicNext}
              aria-label="Next classic plugin"
              className="absolute right-1 sm:right-6 md:right-10 z-20 p-2 text-white/35 hover:text-orange-400 hover:translate-x-1 transition-all duration-300"
            >
              <svg
                width="22"
                height="56"
                viewBox="0 0 30 80"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 5 L25 40 L5 75" />
              </svg>
            </button>
          </div>

          {/* Active Compact Plugin Info & Download */}
          <div className="flex flex-col items-center text-center mt-1 relative z-20">
            <h4 className="text-sm sm:text-base font-bold text-white tracking-wide">
              {activeClassic.name}
            </h4>
            <p className="text-white/45 text-xs mb-4 mt-0.5">
              {activeClassic.desc}
            </p>

            <button
              type="button"
              disabled={downloadingId !== null}
              onClick={() => handleDownloadClassic(activeClassic)}
              className="group relative flex items-center gap-2.5 px-6 py-3 bg-white/5 hover:bg-white/10 disabled:opacity-60 border border-white/15 rounded-full transition-all duration-300 overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <Download className="w-4 h-4 text-white group-hover:-translate-y-0.5 transition-transform duration-300" />
              <span className="font-bold tracking-wide text-xs">
                {user ? `Download ${activeClassic.name}` : 'Sign In To Download'}
              </span>
            </button>
          </div>
        </div>
      </div>

      <DownloadNoticeDialog
        pending={pendingDownload}
        isDownloading={downloadingId !== null}
        onConfirm={handleConfirmPendingDownload}
        onClose={() => setPendingDownload(null)}
      />
    </section>
  );
}
