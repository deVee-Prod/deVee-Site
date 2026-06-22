import { useState, useRef, useCallback, ElementType } from 'react';
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si';

const tracks = [
  {
    id: 'track1',
    videoId: 'Hv6yD04iwe0',
    title: 'ניקיתי את הלב (Prod by. deVee)',
    spotify: 'https://open.spotify.com/track/0IccXF4g1FcsgLEq82SioC?si=dqop7sCTSqCbQLxjkwWNIQ',
    appleMusic: 'https://music.apple.com/il/album/%D7%A0%D7%99%D7%A7%D7%99%D7%AA%D7%99-%D7%90%D7%AA-%D7%94%D7%9C%D7%91/1794794200?i=1794794278',
    youtubeMusic: 'https://music.youtube.com/watch?v=Hv6yD04iwe0',
  },
  {
    id: 'track2',
    videoId: 'hRo2y0U-N_k',
    title: 'YALi | יהלי - בראשית (Prod. by deVee)',
    spotify: 'https://open.spotify.com/track/4AA6RpirW0hsRY8c4ioRi1?si=5mrAXNLrSXq88yd8BucN_Q',
    appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%A8%D7%90%D7%A9%D7%99%D7%AA/1838307735?i=1838307740',
    youtubeMusic: 'https://music.youtube.com/watch?v=hRo2y0U-N_k',
  },
  {
    id: 'track3',
    videoId: 'RO1LiMKFBwA',
    title: 'קאש (Prod. by deVee)',
    spotify: 'https://open.spotify.com/track/6ttuatidkb4BFvkYTOVHjc?si=6673b4f46fbf4902',
    appleMusic: 'https://music.apple.com/il/album/%D7%A7%D7%90%D7%A9/1895594252?i=6764002846',
    youtubeMusic: 'https://music.youtube.com/watch?v=RO1LiMKFBwA',
  },
  {
    id: 'track4',
    videoId: 'eR4GRRwIJVc',
    title: 'Shadow (feat. deVee)',
    spotify: 'https://open.spotify.com/track/2uJEAjl6JGDApaEWuyHKRN?si=fa3d0f8c262c44fb',
    appleMusic: 'https://music.apple.com/il/album/shadow-feat-devee/1894485767?i=1894485768',
    youtubeMusic: 'https://music.youtube.com/watch?v=eR4GRRwIJVc',
  },
  {
    id: 'track5',
    videoId: 'ZPr1Y7-PAWM',
    title: 'Gondola - Ariella Eve ft. deVee',
    spotify: 'https://open.spotify.com/track/2Efb65EXekAuodCjyUP0rL?si=40f2915527e9442e',
    appleMusic: 'https://music.apple.com/us/song/gondola-feat-devee/1877252295',
    youtubeMusic: 'https://music.youtube.com/watch?v=ZPr1Y7-PAWM',
  },
];

const PLATFORMS: { key: keyof typeof tracks[0]; Icon: ElementType; label: string }[] = [
  { key: 'spotify',      Icon: SiSpotify,      label: 'Spotify' },
  { key: 'appleMusic',   Icon: SiApplemusic,   label: 'Apple Music' },
  { key: 'youtubeMusic', Icon: SiYoutubemusic, label: 'YouTube Music' },
];

function normalizeOffset(raw: number, total: number): number {
  let o = raw % total;
  if (o > Math.floor(total / 2)) o -= total;
  if (o < -Math.ceil(total / 2)) o += total;
  return o;
}

export function VideoSection() {
  const [active, setActive]               = useState(0);
  const [activePf, setActivePf]           = useState(0);
  const [playing, setPlaying]             = useState<string | null>(null);
  const touchX   = useRef(0);
  const pfTouchX = useRef(0);

  const goTo = useCallback((index: number) => {
    setActive(((index % tracks.length) + tracks.length) % tracks.length);
    setPlaying(null);
  }, []);

  const goToPf = useCallback((index: number) => {
    setActivePf(((index % PLATFORMS.length) + PLATFORMS.length) % PLATFORMS.length);
  }, []);

  function posClass(i: number): string {
    const offset = normalizeOffset(i - active, tracks.length);
    if (offset === 0)  return 'vcf-active';
    if (offset === -1) return 'vcf-prev';
    if (offset === 1)  return 'vcf-next';
    return offset < 0  ? 'vcf-far-left' : 'vcf-far-right';
  }

  const current = tracks[active];

  return (
    <section className="relative pt-4 sm:pt-6 pb-8 z-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-0 sm:px-6">

        {/* Header image */}
        <div className="flex justify-center mb-[-25px] sm:mb-8 mt-2 px-4 sm:px-0 relative z-30">
          <img
            src="/Gemini_Generated_Image_evzpamevzpamevzp 2.png"
            alt="Latest Releases"
            className="w-[85%] max-w-[250px] md:max-w-[750px] h-auto object-contain mx-auto"
          />
        </div>

        {/* 3D CoverFlow */}
        <div
          className="vcf-scene"
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(dx) > 48) goTo(active + (dx > 0 ? 1 : -1));
          }}
        >
          <div className="vcf-track">
            {tracks.map((track, i) => (
              <div
                key={track.id}
                className={`vcf-card ${posClass(i)}`}
                onClick={() => { if (i !== active) goTo(i); }}
              >
                {i === active ? (
                  playing === track.id ? (
                    <iframe
                      className="vcf-card-iframe"
                      src={`https://www.youtube.com/embed/${track.videoId}?autoplay=1`}
                      title={track.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : (
                    <div 
                      className="relative w-full h-full cursor-pointer group"
                      onClick={() => setPlaying(track.id)}
                    >
                      <img
                        className="vcf-card-thumb group-hover:opacity-90 transition-opacity"
                        src={`https://img.youtube.com/vi/${track.videoId}/maxresdefault.jpg`}
                        alt={track.title}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[68px] h-[48px] bg-red-600 rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-transform duration-300 group-hover:scale-110">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white ml-1">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    className="vcf-card-thumb"
                    src={`https://img.youtube.com/vi/${track.videoId}/maxresdefault.jpg`}
                    alt={track.title}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="vcf-fade-left"  aria-hidden="true" />
          <div className="vcf-fade-right" aria-hidden="true" />

          <button 
            className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+2.25rem)] vcf-btn-prev z-20 p-2 text-white/40 hover:text-orange-400 hover:-translate-x-2 transition-all duration-300"
            aria-label="הקודם" 
            onClick={() => goTo(active - 1)}
          >
            <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[60px] sm:w-[30px] sm:h-[80px] drop-shadow-[0_0_10px_currentColor]">
              <path d="M25 5 L5 40 L25 75" />
            </svg>
          </button>
          
          <button 
            className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+2.25rem)] vcf-btn-next z-20 p-2 text-white/40 hover:text-orange-400 hover:translate-x-2 transition-all duration-300"
            aria-label="הבא" 
            onClick={() => goTo(active + 1)}
          >
            <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[60px] sm:w-[30px] sm:h-[80px] drop-shadow-[0_0_10px_currentColor]">
              <path d="M5 5 L25 40 L5 75" />
            </svg>
          </button>

          <div className="vcf-dots">
            {tracks.map((_, i) => (
              <button
                key={i}
                className={`vcf-dot${i === active ? ' vcf-dot-active' : ''}`}
                aria-label={`סרטון ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* Active track title + platform drum */}
        <div className="text-center mt-2 pb-4">
          <p className="text-sm font-semibold text-white/70 mb-5 transition-all duration-500">
            {current.title}
          </p>
          <div
            className="pf-scene"
            onTouchStart={e => { pfTouchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = pfTouchX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 32) goToPf(activePf + (dx > 0 ? 1 : -1));
            }}
          >
            {PLATFORMS.map(({ key, Icon, label }, i) => {
              const offset = normalizeOffset(i - activePf, PLATFORMS.length);
              const posClass = offset === 0 ? 'pf-active' : offset === -1 ? 'pf-left' : 'pf-right';
              const isActive = offset === 0;
              return (
                <a
                  key={key}
                  href={current[key] as string}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pf-card ${posClass}`}
                  aria-label={label}
                  onClick={e => { if (!isActive) { e.preventDefault(); goToPf(i); } }}
                >
                  <Icon className="pf-icon" />
                </a>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
