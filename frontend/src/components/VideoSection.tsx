import { useState, useRef, useCallback, useEffect, ElementType } from 'react';
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si';

interface VideoTrack {
  id: string;
  videoId: string;
  title: string;
  thumbnail?: string;
  spotify: string;
  appleMusic: string;
  youtubeMusic: string;
}

interface DiscographyRelease {
  id: string;
  title: string;
  artist: string;
  cover: string;
  previewUrl: string;
  spotify: string;
  appleMusic: string;
  youtubeMusic?: string;
}

const videoTracks: VideoTrack[] = [
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
    id: 'track_error404',
    videoId: 'SlR3joHgCXs',
    title: 'Error 404 (feat. deVee)',
    thumbnail: 'https://img.youtube.com/vi/SlR3joHgCXs/hqdefault.jpg',
    spotify: 'https://open.spotify.com/track/0fliGJrBSDwYfneUMQcH89?si=b5e1d39d5b044124',
    appleMusic: 'https://music.apple.com/il/album/error-404-feat-devee/6783765372?i=6783765373',
    youtubeMusic: 'https://music.youtube.com/watch?v=SlR3joHgCXs',
  },
  {
    id: 'track_coco_basa',
    videoId: 'kW8ZtkroSMc',
    title: 'COCO - באסה (Prod by. deVee)',
    spotify: 'https://open.spotify.com/track/2q6uX9nyN4LPWjRBgGSzNx',
    appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%90%D7%A1%D7%94/6798815627?i=6798816007',
    youtubeMusic: 'https://music.youtube.com/watch?v=kW8ZtkroSMc',
  },
];

const discographyReleases: DiscographyRelease[] = [
  {
    id: 'loves-on-fire',
    title: "Love's On Fire",
    artist: 'ZOHAR (feat. deVee)',
    cover: '/covers/loves-on-fire.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/bb/fb/2b/bbfb2b23-646c-1b73-49a1-346f86251377/mzaf_3247837530709058030.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/1IDLa5yyKJhEGsk99BohYR',
    appleMusic: 'https://music.apple.com/il/album/loves-on-fire-feat-devee/6829540861?i=6829540862',
    youtubeMusic: 'https://music.youtube.com/watch?v=yz2f2CO8Dg0',
  },
  {
    id: 'shadow',
    title: 'Shadow',
    artist: 'Ariella Eve (feat. deVee)',
    cover: '/covers/shadow.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/ef/84/04/ef8404e8-b0d3-0134-7f5f-06df7206c7fb/mzaf_12362409006454084223.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/2uJEAjl6JGDApaEWuyHKRN?si=fa3d0f8c262c44fb',
    appleMusic: 'https://music.apple.com/il/album/shadow-feat-devee/1894485767?i=1894485768',
    youtubeMusic: 'https://music.youtube.com/watch?v=eR4GRRwIJVc',
  },
  {
    id: 'gondola',
    title: 'Gondola',
    artist: 'Ariella Eve (feat. deVee)',
    cover: '/covers/gondola.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/7d/47/6d/7d476d5f-e0f0-dce0-53ba-bb1a33f581ca/mzaf_10502411134769986119.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/2Efb65EXekAuodCjyUP0rL?si=40f2915527e9442e',
    appleMusic: 'https://music.apple.com/us/song/gondola-feat-devee/1877252295',
  },
  {
    id: 'nikiti',
    title: 'ניקיתי את הלב',
    artist: 'Amit Ben David · Prod. deVee',
    cover: '/covers/nikiti.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/0b/31/8f/0b318fbe-3068-bf53-b38f-d12e3f1a5835/mzaf_4374488472588013977.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/0IccXF4g1FcsgLEq82SioC?si=dqop7sCTSqCbQLxjkwWNIQ',
    appleMusic: 'https://music.apple.com/il/album/%D7%A0%D7%99%D7%A7%D7%99%D7%AA%D7%99-%D7%90%D7%AA-%D7%94%D7%9C%D7%91/1794794200?i=1794794278',
    youtubeMusic: 'https://music.youtube.com/watch?v=Hv6yD04iwe0',
  },
  {
    id: 'bereshit',
    title: 'בראשית',
    artist: 'YALi · Prod. deVee',
    cover: '/covers/bereshit.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview221/v4/56/56/26/56562661-05f9-1bd0-a52c-50dcbaa4735c/mzaf_4709143036351103797.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/4AA6RpirW0hsRY8c4ioRi1?si=5mrAXNLrSXq88yd8BucN_Q',
    appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%A8%D7%90%D7%A9%D7%99%D7%AA/1838307735?i=1838307740',
    youtubeMusic: 'https://music.youtube.com/watch?v=hRo2y0U-N_k',
  },
  {
    id: 'cash',
    title: 'קאש',
    artist: 'COCO · Prod. deVee',
    cover: '/covers/cash.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/d7/ce/7b/d7ce7ba4-0bee-99d3-9720-1ab43570e710/mzaf_7289614154177162771.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/6ttuatidkb4BFvkYTOVHjc?si=6673b4f46fbf4902',
    appleMusic: 'https://music.apple.com/il/album/%D7%A7%D7%90%D7%A9/1895594252?i=6764002846',
    youtubeMusic: 'https://music.youtube.com/watch?v=RO1LiMKFBwA',
  },
  {
    id: 'error-404',
    title: 'Error 404',
    artist: 'ZOHAR (feat. deVee)',
    cover: '/covers/error-404.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/b7/a2/73/b7a27377-2a8b-9c78-f59f-b5ca29d6b2fe/mzaf_741526906900583953.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/0fliGJrBSDwYfneUMQcH89?si=b5e1d39d5b044124',
    appleMusic: 'https://music.apple.com/il/album/error-404-feat-devee/6783765372?i=6783765373',
    youtubeMusic: 'https://music.youtube.com/watch?v=SlR3joHgCXs',
  },
  {
    id: 'basa',
    title: 'באסה',
    artist: 'COCO · Prod. deVee',
    cover: '/covers/basa.jpg',
    previewUrl: 'https://audio-ssl.itunes.apple.com/itunes-assets/AudioPreview211/v4/20/b8/04/20b80484-3f82-f1b0-ba9f-73d5d6643546/mzaf_16298615576842539308.plus.aac.p.m4a',
    spotify: 'https://open.spotify.com/track/2q6uX9nyN4LPWjRBgGSzNx',
    appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%90%D7%A1%D7%94/6798815627?i=6798816007',
    youtubeMusic: 'https://music.youtube.com/watch?v=kW8ZtkroSMc',
  },
];

const PLATFORMS: { key: 'spotify' | 'appleMusic' | 'youtubeMusic'; Icon: ElementType; label: string }[] = [
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
  // Top 3D Video CoverFlow state
  const [active, setActive]     = useState(0);
  const [activePf, setActivePf] = useState(0);
  const [playing, setPlaying]   = useState<string | null>(null);
  const touchX   = useRef(0);
  const pfTouchX = useRef(0);

  // Bottom Square Cover-Art Discography Carousel state
  const discogTrackRef = useRef<HTMLDivElement>(null);
  const prevBtnRef     = useRef<HTMLButtonElement>(null);
  const nextBtnRef     = useRef<HTMLButtonElement>(null);
  const audioRef       = useRef<HTMLAudioElement | null>(null);
  const pendingTargetRef = useRef<number | null>(null);
  const settledIdxRef    = useRef<number>(0);

  const [discogIndex, setDiscogIndex]       = useState(0);
  const [canPrev, setCanPrev]               = useState(false);
  const [canNext, setCanNext]               = useState(true);
  const [statusAnnouncement, setStatusAnnouncement] = useState('');
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress]   = useState(0);

  const stopAudio = useCallback(() => {
    const audio = audioRef.current;
    if (audio) {
      audio.pause();
      audio.currentTime = 0;
    }
    setPlayingAudioId(null);
    setAudioProgress(0);
  }, []);

  const toggleAudioPreview = useCallback((release: DiscographyRelease) => {
    if (playingAudioId === release.id) {
      stopAudio();
      return;
    }
    // Pause any active YouTube iframe when starting an audio preview
    setPlaying(null);

    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'none';
    }
    const audio = audioRef.current;
    audio.pause();
    audio.src = release.previewUrl;
    audio.currentTime = 0;
    setAudioProgress(0);
    setPlayingAudioId(release.id);

    audio.play().catch(() => {
      setPlayingAudioId(null);
      setAudioProgress(0);
    });
  }, [playingAudioId, stopAudio]);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.preload = 'none';
    }
    const audio = audioRef.current;
    const onTimeUpdate = () => {
      if (audio.duration && Number.isFinite(audio.duration)) {
        setAudioProgress(Math.min(100, (audio.currentTime / audio.duration) * 100));
      }
    };
    const onEnded = () => {
      setPlayingAudioId(null);
      setAudioProgress(0);
    };
    audio.addEventListener('timeupdate', onTimeUpdate);
    audio.addEventListener('ended', onEnded);
    audio.addEventListener('error', onEnded);
    return () => {
      audio.pause();
      audio.removeEventListener('timeupdate', onTimeUpdate);
      audio.removeEventListener('ended', onEnded);
      audio.removeEventListener('error', onEnded);
    };
  }, []);

  const goTo = useCallback((index: number) => {
    setActive(((index % videoTracks.length) + videoTracks.length) % videoTracks.length);
    setPlaying(null);
  }, []);

  const goToPf = useCallback((index: number) => {
    setActivePf(((index % PLATFORMS.length) + PLATFORMS.length) % PLATFORMS.length);
  }, []);

  // Measure nearest slide index from track scroll position
  const getNearestSlideIndex = useCallback((track: HTMLDivElement): number => {
    const slides = Array.from(track.children) as HTMLElement[];
    if (!slides.length) return 0;
    const scrollLeft = track.scrollLeft;
    let bestIdx = 0;
    let bestDist = Infinity;
    for (let i = 0; i < slides.length; i++) {
      const dist = Math.abs(slides[i].offsetLeft - scrollLeft);
      if (dist < bestDist) {
        bestDist = dist;
        bestIdx = i;
      }
    }
    return bestIdx;
  }, []);

  const syncScrollButtons = useCallback((track: HTMLDivElement) => {
    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const nextCanPrev = track.scrollLeft > 4;
    const nextCanNext = track.scrollLeft < maxScroll - 4;

    setCanPrev(prev => {
      if (prev && !nextCanPrev && document.activeElement === prevBtnRef.current) {
        nextBtnRef.current?.focus();
      }
      return nextCanPrev;
    });
    setCanNext(prev => {
      if (prev && !nextCanNext && document.activeElement === nextBtnRef.current) {
        prevBtnRef.current?.focus();
      }
      return nextCanNext;
    });
  }, []);

  const scrollDiscogToIndex = useCallback((targetIndex: number) => {
    const track = discogTrackRef.current;
    if (!track) return;
    const clamped = Math.max(0, Math.min(discographyReleases.length - 1, targetIndex));
    const slide = track.children[clamped] as HTMLElement | undefined;
    if (!slide) return;

    const maxScroll = Math.max(0, track.scrollWidth - track.clientWidth);
    const targetLeft = Math.min(maxScroll, Math.max(0, slide.offsetLeft));
    const delta = targetLeft - track.scrollLeft;
    setDiscogIndex(clamped);
    if (Math.abs(delta) < 1) {
      pendingTargetRef.current = null;
      return;
    }

    pendingTargetRef.current = clamped;
    track.scrollBy({ left: delta });
  }, []);

  const stepDiscog = useCallback((direction: -1 | 1) => {
    const track = discogTrackRef.current;
    if (!track) return;
    const base = pendingTargetRef.current !== null ? pendingTargetRef.current : getNearestSlideIndex(track);
    scrollDiscogToIndex(base + direction);
  }, [getNearestSlideIndex, scrollDiscogToIndex]);

  // Wire scroll tracking (rAF-throttled), scrollend (with debounced fallback), and IntersectionObserver fade fallback
  useEffect(() => {
    const track = discogTrackRef.current;
    if (!track) return;

    syncScrollButtons(track);

    let rafId = 0;
    let debounceTimer: number | null = null;
    const hasScrollEnd = 'onscrollend' in window;

    const handleSettled = () => {
      const idx = getNearestSlideIndex(track);
      pendingTargetRef.current = null;
      setDiscogIndex(idx);
      syncScrollButtons(track);
      if (idx !== settledIdxRef.current) {
        settledIdxRef.current = idx;
        setStatusAnnouncement(`Release ${idx + 1} of ${discographyReleases.length}: ${discographyReleases[idx].title}`);
      }
    };

    const onScroll = () => {
      if (pendingTargetRef.current === null && !rafId) {
        rafId = requestAnimationFrame(() => {
          rafId = 0;
          const idx = getNearestSlideIndex(track);
          setDiscogIndex(prev => (prev === idx ? prev : idx));
          syncScrollButtons(track);
        });
      }
      if (!hasScrollEnd) {
        if (debounceTimer !== null) window.clearTimeout(debounceTimer);
        debounceTimer = window.setTimeout(handleSettled, 130);
      }
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    if (hasScrollEnd) {
      track.addEventListener('scrollend', handleSettled);
    }

    const onResize = () => syncScrollButtons(track);
    window.addEventListener('resize', onResize);

    // Fallback scrollability fade hints via IntersectionObserver where scroll-driven animations are unsupported
    let observer: IntersectionObserver | null = null;
    if (typeof CSS !== 'undefined' && !CSS.supports('animation-timeline', 'scroll()')) {
      const first = track.firstElementChild;
      const last = track.lastElementChild;
      if (first && last) {
        observer = new IntersectionObserver(
          (entries) => {
            for (const { target, intersectionRatio } of entries) {
              track.classList.toggle(target === first ? 'more-start' : 'more-end', intersectionRatio < 1);
            }
          },
          { root: track, threshold: 1, rootMargin: '1px' }
        );
        observer.observe(first);
        observer.observe(last);
      }
    }

    return () => {
      track.removeEventListener('scroll', onScroll);
      if (hasScrollEnd) track.removeEventListener('scrollend', handleSettled);
      window.removeEventListener('resize', onResize);
      if (rafId) cancelAnimationFrame(rafId);
      if (debounceTimer !== null) window.clearTimeout(debounceTimer);
      observer?.disconnect();
    };
  }, [getNearestSlideIndex, syncScrollButtons]);

  function posClass(i: number): string {
    const offset = normalizeOffset(i - active, videoTracks.length);
    if (offset === 0)  return 'vcf-active';
    if (offset === -1) return 'vcf-prev';
    if (offset === 1)  return 'vcf-next';
    return offset < 0  ? 'vcf-far-left' : 'vcf-far-right';
  }

  const current = videoTracks[active];

  return (
    <section id="releases" className="relative pt-4 sm:pt-6 pb-8 sm:pb-12 z-20 overflow-hidden">
      <div className="container mx-auto max-w-6xl px-0 sm:px-6">

        {/* Header image */}
        <div className="flex justify-center mb-[-25px] sm:mb-8 mt-2 px-4 sm:px-0 relative z-30">
          <img
            src="/Gemini_Generated_Image_evzpamevzpamevzp 2.webp"
            alt="Latest Releases"
            loading="lazy"
            className="w-[85%] max-w-[250px] md:max-w-[750px] h-auto object-contain mx-auto"
          />
        </div>

        {/* 3D Video CoverFlow (Official Music Videos) */}
        <div
          className="vcf-scene"
          onTouchStart={e => { touchX.current = e.touches[0].clientX; }}
          onTouchEnd={e => {
            const dx = touchX.current - e.changedTouches[0].clientX;
            if (Math.abs(dx) > 48) goTo(active + (dx > 0 ? 1 : -1));
          }}
        >
          <div className="vcf-track">
            {videoTracks.map((track, i) => (
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
                      onClick={() => {
                        stopAudio();
                        setPlaying(track.id);
                      }}
                    >
                      <img
                        className="vcf-card-thumb group-hover:opacity-90 transition-opacity"
                        loading="lazy"
                        src={track.thumbnail || `https://img.youtube.com/vi/${track.videoId}/maxresdefault.jpg`}
                        alt={track.title}
                      />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-[68px] h-[48px] bg-red-600 rounded-[14px] flex items-center justify-center shadow-[0_0_20px_rgba(220,38,38,0.5)] transition-transform duration-300 group-hover:scale-110">
                          <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-white">
                            <path d="M8 5v14l11-7z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  )
                ) : (
                  <img
                    className="vcf-card-thumb"
                    loading="lazy"
                    src={track.thumbnail || `https://img.youtube.com/vi/${track.videoId}/maxresdefault.jpg`}
                    alt={track.title}
                  />
                )}
              </div>
            ))}
          </div>

          <div className="vcf-fade-left"  aria-hidden="true" />
          <div className="vcf-fade-right" aria-hidden="true" />

          <button
            type="button"
            className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+2.25rem)] vcf-btn-prev z-20 p-2 text-white/40 hover:text-orange-400 hover:-translate-x-2 transition-all duration-300"
            aria-label="הקודם"
            onClick={() => goTo(active - 1)}
          >
            <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[60px] sm:w-[30px] sm:h-[80px] drop-shadow-[0_0_10px_currentColor]">
              <path d="M25 5 L5 40 L25 75" />
            </svg>
          </button>

          <button
            type="button"
            className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+2.25rem)] vcf-btn-next z-20 p-2 text-white/40 hover:text-orange-400 hover:translate-x-2 transition-all duration-300"
            aria-label="הבא"
            onClick={() => goTo(active + 1)}
          >
            <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[20px] h-[60px] sm:w-[30px] sm:h-[80px] drop-shadow-[0_0_10px_currentColor]">
              <path d="M5 5 L25 40 L5 75" />
            </svg>
          </button>

          <div className="vcf-dots">
            {videoTracks.map((_, i) => (
              <button
                type="button"
                key={i}
                className={`vcf-dot${i === active ? ' vcf-dot-active' : ''}`}
                aria-label={`סרטון ${i + 1}`}
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>

        {/* Active video track title + platform drum */}
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
              const pClass = offset === 0 ? 'pf-active' : offset === -1 ? 'pf-left' : 'pf-right';
              const isActive = offset === 0;
              return (
                <a
                  key={key}
                  href={current[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`pf-card ${pClass}`}
                  aria-label={label}
                  onClick={e => { if (!isActive) { e.preventDefault(); goToPf(i); } }}
                >
                  <Icon className="pf-icon" aria-hidden="true" />
                </a>
              );
            })}
          </div>
        </div>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* ALL RELEASES — Square Cover-Art Carousel with Built-In Previews */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="All Releases"
          className="mt-10 sm:mt-14 px-4 sm:px-0"
        >
          {/* Header row + Prev/Next buttons before track in DOM order */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <div className="flex items-center gap-3">
              <span className="h-[1px] w-6 bg-orange-500/60 hidden sm:inline-block" aria-hidden="true" />
              <h3 className="text-[11px] sm:text-xs font-semibold uppercase tracking-[0.28em] text-white/55">
                All Releases
              </h3>
            </div>

            <div className="flex items-center gap-2">
              <button
                ref={prevBtnRef}
                type="button"
                disabled={!canPrev}
                onClick={() => stepDiscog(-1)}
                aria-label="Previous release"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/75 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200 touch-manipulation cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                ref={nextBtnRef}
                type="button"
                disabled={!canNext}
                onClick={() => stepDiscog(1)}
                aria-label="Next release"
                className="w-9 h-9 rounded-full border border-white/15 bg-white/[0.04] flex items-center justify-center text-white/75 hover:text-white hover:border-orange-500/50 hover:bg-orange-500/10 disabled:opacity-25 disabled:pointer-events-none transition-all duration-200 touch-manipulation cursor-pointer"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>

          {/* Horizontally scrollable square cover-art track */}
          <div
            ref={discogTrackRef}
            className="discog-track"
            tabIndex={0}
            role="group"
            aria-label="Release covers"
          >
            {discographyReleases.map((release, idx) => {
              const isPlayingThis = playingAudioId === release.id;
              return (
                <article
                  key={release.id}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${idx + 1} of ${discographyReleases.length}`}
                  className="discog-slide group flex flex-col"
                >
                  {/* Square 1:1 Cover Art with Preview Play Button */}
                  <div
                    className={`relative aspect-square w-full rounded-[14px] overflow-hidden bg-[#0e0e10] border transition-all duration-300 ${
                      isPlayingThis
                        ? 'border-orange-500/60 shadow-[0_14px_34px_-10px_rgba(249,115,22,0.35)]'
                        : 'border-white/10 group-hover:border-white/25 shadow-[0_14px_30px_-14px_rgba(0,0,0,0.85)]'
                    }`}
                  >
                    <img
                      src={release.cover}
                      alt={`${release.title} — ${release.artist}`}
                      width="480"
                      height="480"
                      loading="lazy"
                      decoding="async"
                      className={`w-full h-full object-cover transition-transform duration-500 ${
                        isPlayingThis ? 'scale-[1.03]' : 'group-hover:scale-[1.04]'
                      }`}
                    />

                    {/* Subtle dark bottom gradient for crisp control legibility */}
                    <div
                      className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />

                    {/* Playing equalizer indicator (top-left) */}
                    {isPlayingThis && (
                      <div
                        className="absolute top-2.5 left-2.5 px-2 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-end gap-[2.5px] h-6"
                        aria-hidden="true"
                      >
                        <span className="discog-eq-bar w-[2.5px] h-3 rounded-full bg-orange-400" style={{ animationDelay: '0ms' }} />
                        <span className="discog-eq-bar w-[2.5px] h-3.5 rounded-full bg-orange-400" style={{ animationDelay: '180ms' }} />
                        <span className="discog-eq-bar w-[2.5px] h-2.5 rounded-full bg-orange-400" style={{ animationDelay: '340ms' }} />
                      </div>
                    )}

                    {/* Preview Play / Pause button */}
                    <button
                      type="button"
                      onClick={() => toggleAudioPreview(release)}
                      aria-label={isPlayingThis ? `Pause preview of ${release.title}` : `Play preview of ${release.title}`}
                      aria-pressed={isPlayingThis}
                      className={`absolute bottom-2.5 right-2.5 w-10 h-10 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer touch-manipulation ${
                        isPlayingThis
                          ? 'bg-orange-500 text-black border-orange-300/60 shadow-[0_0_20px_rgba(249,115,22,0.55)] scale-105'
                          : 'bg-black/65 text-white border-white/25 hover:bg-white hover:text-black hover:border-white hover:scale-105'
                      }`}
                    >
                      {isPlayingThis ? (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
                          <rect x="6" y="5" width="4" height="14" rx="1" />
                          <rect x="14" y="5" width="4" height="14" rx="1" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 translate-x-[1px]" aria-hidden="true">
                          <path d="M8 5.5v13l11-6.5z" />
                        </svg>
                      )}
                    </button>

                    {/* Ultra-thin preview progress line */}
                    {isPlayingThis && (
                      <div className="absolute inset-x-0 bottom-0 h-[3px] bg-white/15" aria-hidden="true">
                        <div
                          className="h-full bg-gradient-to-r from-orange-500 to-amber-300 transition-[width] duration-150 ease-linear"
                          style={{ width: `${audioProgress}%` }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Metadata + Clean Streaming Links */}
                  <div className="mt-2.5 px-0.5 flex flex-col">
                    <p className="text-[13px] sm:text-sm font-semibold text-white/90 truncate leading-snug">
                      {release.title}
                    </p>
                    <p className="text-[11px] sm:text-xs text-white/45 truncate mt-0.5">
                      {release.artist}
                    </p>
                    <div className="flex items-center gap-1 mt-2 -ml-1">
                      <a
                        href={release.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${release.title} on Spotify`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-[#1DB954] hover:bg-white/[0.06] transition-colors"
                      >
                        <SiSpotify className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      <a
                        href={release.appleMusic}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${release.title} on Apple Music`}
                        className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-[#FA243C] hover:bg-white/[0.06] transition-colors"
                      >
                        <SiApplemusic className="w-3.5 h-3.5" aria-hidden="true" />
                      </a>
                      {release.youtubeMusic && (
                        <a
                          href={release.youtubeMusic}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={`${release.title} on YouTube Music`}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-white/45 hover:text-[#FF0000] hover:bg-white/[0.06] transition-colors"
                        >
                          <SiYoutubemusic className="w-3.5 h-3.5" aria-hidden="true" />
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Polite live status region for screen readers */}
          <p className="sr-only" role="status" aria-live="polite">
            {statusAnnouncement}
          </p>

          {/* Direct slide markers */}
          <nav className="flex items-center justify-center gap-0.5 mt-2" aria-label="Choose a release">
            {discographyReleases.map((release, idx) => (
              <button
                key={release.id}
                type="button"
                className="discog-marker"
                aria-label={`Go to ${release.title}`}
                aria-current={idx === discogIndex ? 'true' : undefined}
                onClick={() => scrollDiscogToIndex(idx)}
              />
            ))}
          </nav>
        </div>

      </div>
    </section>
  );
}
