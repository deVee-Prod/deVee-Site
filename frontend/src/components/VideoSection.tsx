import { useState, useRef, useCallback, useEffect, ElementType } from 'react';
import { SiSpotify, SiApplemusic, SiYoutubemusic } from 'react-icons/si';

interface VideoTrack {
  id: string;
  videoId: string;
  title: string;
  thumbnail?: string;
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
  },
  {
    id: 'track2',
    videoId: 'hRo2y0U-N_k',
    title: 'YALi | יהלי - בראשית (Prod. by deVee)',
  },
  {
    id: 'track3',
    videoId: 'RO1LiMKFBwA',
    title: 'קאש (Prod. by deVee)',
  },
  {
    id: 'track_error404',
    videoId: 'SlR3joHgCXs',
    title: 'Error 404 (feat. deVee)',
    thumbnail: 'https://img.youtube.com/vi/SlR3joHgCXs/hqdefault.jpg',
  },
  {
    id: 'track_coco_basa',
    videoId: 'kW8ZtkroSMc',
    title: 'COCO - באסה (Prod by. deVee)',
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
  const [active, setActive]   = useState(0);
  const [playing, setPlaying] = useState<string | null>(null);
  const touchX = useRef(0);

  // Bottom 3D Album CoverFlow & Vinyl state
  const [albumIndex, setAlbumIndex]       = useState(0);
  const [activePf, setActivePf]           = useState(0);
  const [playingAudioId, setPlayingAudioId] = useState<string | null>(null);
  const [audioProgress, setAudioProgress] = useState(0);
  const [sleeveTilt, setSleeveTilt]       = useState({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
  const albumTouchX = useRef(0);
  const pfTouchX    = useRef(0);
  const audioRef    = useRef<HTMLAudioElement | null>(null);

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

  const goToAlbum = useCallback((index: number) => {
    const next = ((index % discographyReleases.length) + discographyReleases.length) % discographyReleases.length;
    setAlbumIndex(next);
    setSleeveTilt({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
    if (playingAudioId && discographyReleases[next].id !== playingAudioId) {
      stopAudio();
    }
  }, [playingAudioId, stopAudio]);

  const handleSleeveMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    setSleeveTilt({
      rx: (0.5 - y) * 14,
      ry: (x - 0.5) * 14,
      sx: x * 100,
      sy: y * 100,
      active: true,
    });
  }, []);

  const handleSleeveMouseLeave = useCallback(() => {
    setSleeveTilt({ rx: 0, ry: 0, sx: 50, sy: 50, active: false });
  }, []);

  function posClass(i: number): string {
    const offset = normalizeOffset(i - active, videoTracks.length);
    if (offset === 0)  return 'vcf-active';
    if (offset === -1) return 'vcf-prev';
    if (offset === 1)  return 'vcf-next';
    return offset < 0  ? 'vcf-far-left' : 'vcf-far-right';
  }

  function albumPosClass(i: number): string {
    const offset = normalizeOffset(i - albumIndex, discographyReleases.length);
    if (offset === 0)  return 'ac-active';
    if (offset === -1) return 'ac-prev-1';
    if (offset === 1)  return 'ac-next-1';
    if (offset === -2) return 'ac-prev-2';
    if (offset === 2)  return 'ac-next-2';
    if (offset === -3) return 'ac-prev-3';
    if (offset === 3)  return 'ac-next-3';
    return offset < 0  ? 'ac-hidden-left' : 'ac-hidden-right';
  }

  const currentVideo = videoTracks[active];
  const currentAlbum = discographyReleases[albumIndex];
  const albumPlatforms = PLATFORMS.filter(({ key }) => Boolean(currentAlbum[key]));
  const safeActivePf = activePf % albumPlatforms.length;

  const goToPf = useCallback((index: number, count: number) => {
    setActivePf(((index % count) + count) % count);
  }, []);

  return (
    <section id="releases" className="relative pt-4 sm:pt-6 pb-0 z-20 overflow-hidden">
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

        {/* Active video title only (clean & minimal) */}
        <p className="text-center text-sm font-semibold text-white/65 -mt-4 mb-1 sm:mb-2 transition-all duration-500">
          {currentVideo.title}
        </p>

        {/* ─────────────────────────────────────────────────────────────── */}
        {/* 3D VINYL & ALBUM COVERFLOW SHOWCASE (All 8 Releases)            */}
        {/* ─────────────────────────────────────────────────────────────── */}
        <div
          role="region"
          aria-roledescription="carousel"
          aria-label="Discography releases"
          className="relative mt-0 sm:mt-2"
        >
          {/* Subtle ambient stage glow behind active 3D vinyl cover */}
          <div
            className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[58%] w-[260px] h-[260px] sm:w-[380px] sm:h-[300px] rounded-full blur-[95px] transition-opacity duration-500"
            style={{
              background: playingAudioId
                ? 'radial-gradient(circle, rgba(249,115,22,0.22) 0%, rgba(234,88,12,0.06) 55%, transparent 75%)'
                : 'radial-gradient(circle, rgba(249,115,22,0.11) 0%, transparent 70%)',
            }}
            aria-hidden="true"
          />

          <div
            className="ac-scene"
            onTouchStart={e => { albumTouchX.current = e.touches[0].clientX; }}
            onTouchEnd={e => {
              const dx = albumTouchX.current - e.changedTouches[0].clientX;
              if (Math.abs(dx) > 42) goToAlbum(albumIndex + (dx > 0 ? 1 : -1));
            }}
          >
            <div className="ac-track">
              {discographyReleases.map((release, i) => {
                const isActive = i === albumIndex;
                const isPlayingThis = playingAudioId === release.id;
                return (
                  <div
                    key={release.id}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${discographyReleases.length}: ${release.title}`}
                    className={`ac-card ${albumPosClass(i)}${isPlayingThis ? ' ac-is-playing' : ''}`}
                    onClick={() => { if (!isActive) goToAlbum(i); }}
                  >
                    <div
                      className="ac-sleeve-wrap"
                      onMouseMove={isActive ? handleSleeveMouseMove : undefined}
                      onMouseLeave={isActive ? handleSleeveMouseLeave : undefined}
                      style={
                        isActive && sleeveTilt.active
                          ? { transform: `rotateX(${sleeveTilt.rx}deg) rotateY(${sleeveTilt.ry}deg)` }
                          : undefined
                      }
                    >
                      {/* Realistic 3D Grooved Vinyl Disc peeking behind the sleeve */}
                      <div className="ac-vinyl-slot" aria-hidden="true">
                        <div className="ac-vinyl">
                          <div className="ac-vinyl-label">
                            <img
                              src={release.cover}
                              alt=""
                              width="480"
                              height="480"
                              loading="lazy"
                              decoding="async"
                              className="w-full h-full object-cover"
                            />
                          </div>
                        </div>
                      </div>

                      {/* Square 1:1 Album Sleeve */}
                      <div
                        className={`ac-sleeve${isActive ? ' cursor-pointer' : ''}`}
                        onClick={isActive ? () => toggleAudioPreview(release) : undefined}
                      >
                        <img
                          src={release.cover}
                          alt={`${release.title} — ${release.artist}`}
                          width="480"
                          height="480"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover select-none"
                        />

                        {/* Interactive specular glass sheen on active sleeve hover */}
                        {isActive && (
                          <div
                            className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                            style={{
                              opacity: sleeveTilt.active ? 1 : 0,
                              background: `radial-gradient(220px circle at ${sleeveTilt.sx}% ${sleeveTilt.sy}%, rgba(255,255,255,0.18), transparent 65%)`,
                            }}
                            aria-hidden="true"
                          />
                        )}

                        {/* Subtle bottom vignette on active sleeve */}
                        {isActive && (
                          <div
                            className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/75 via-black/20 to-transparent pointer-events-none"
                            aria-hidden="true"
                          />
                        )}

                        {/* Live Equalizer badge while playing */}
                        {isPlayingThis && (
                          <div
                            className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/15 flex items-end gap-[2.5px] h-6"
                            aria-hidden="true"
                          >
                            <span className="discog-eq-bar w-[2.5px] h-3 rounded-full bg-orange-400" style={{ animationDelay: '0ms' }} />
                            <span className="discog-eq-bar w-[2.5px] h-3.5 rounded-full bg-orange-400" style={{ animationDelay: '180ms' }} />
                            <span className="discog-eq-bar w-[2.5px] h-2.5 rounded-full bg-orange-400" style={{ animationDelay: '340ms' }} />
                          </div>
                        )}

                        {/* Play / Pause preview button on active cover */}
                        {isActive && (
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              toggleAudioPreview(release);
                            }}
                            aria-label={isPlayingThis ? `Pause preview of ${release.title}` : `Play preview of ${release.title}`}
                            aria-pressed={isPlayingThis}
                            className={`absolute bottom-3 right-3 w-11 h-11 rounded-full flex items-center justify-center backdrop-blur-md border transition-all duration-200 cursor-pointer touch-manipulation ${
                              isPlayingThis
                                ? 'bg-orange-500 text-black border-orange-300/70 shadow-[0_0_24px_rgba(249,115,22,0.6)] scale-105'
                                : 'bg-black/65 text-white border-white/25 hover:bg-white hover:text-black hover:border-white hover:scale-110'
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
                        )}

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
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="ac-fade-left"  aria-hidden="true" />
            <div className="ac-fade-right" aria-hidden="true" />

            {/* Desktop tall sleek 3D stage arrows matching the site's visual language */}
            <button
              type="button"
              onClick={() => goToAlbum(albumIndex - 1)}
              aria-label="Previous release"
              className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+1.1rem)] ac-btn-prev z-20 p-2 text-white/40 hover:text-orange-400 hover:-translate-x-1.5 transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[64px] md:w-[28px] md:h-[74px] drop-shadow-[0_0_10px_currentColor]" aria-hidden="true">
                <path d="M25 5 L5 40 L25 75" />
              </svg>
            </button>

            <button
              type="button"
              onClick={() => goToAlbum(albumIndex + 1)}
              aria-label="Next release"
              className="hidden sm:block absolute top-1/2 -translate-y-[calc(50%+1.1rem)] ac-btn-next z-20 p-2 text-white/40 hover:text-orange-400 hover:translate-x-1.5 transition-all duration-300 cursor-pointer"
            >
              <svg viewBox="0 0 30 80" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="w-[22px] h-[64px] md:w-[28px] md:h-[74px] drop-shadow-[0_0_10px_currentColor]" aria-hidden="true">
                <path d="M5 5 L25 40 L5 75" />
              </svg>
            </button>
          </div>

          {/* Active Album Metadata + Signature 3D Platform Drum + Dots */}
          <div className="flex flex-col items-center text-center -mt-3 px-4 relative z-20">
            <h3 className="text-base sm:text-lg font-bold text-white tracking-wide">
              {currentAlbum.title}
            </h3>
            <p className="text-xs sm:text-[13px] text-white/45 mt-0.5 mb-3">
              {currentAlbum.artist}
            </p>

            {/* Signature 3D Platform Perspective Drum */}
            <div
              className="pf-scene w-full"
              onTouchStart={e => { pfTouchX.current = e.touches[0].clientX; }}
              onTouchEnd={e => {
                const dx = pfTouchX.current - e.changedTouches[0].clientX;
                if (Math.abs(dx) > 32) goToPf(safeActivePf + (dx > 0 ? 1 : -1), albumPlatforms.length);
              }}
            >
              {albumPlatforms.map(({ key, Icon, label }, i) => {
                const offset = normalizeOffset(i - safeActivePf, albumPlatforms.length);
                const pClass = offset === 0 ? 'pf-active' : offset < 0 ? 'pf-left' : 'pf-right';
                const isActive = offset === 0;
                return (
                  <a
                    key={key}
                    href={currentAlbum[key]}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`pf-card ${pClass}`}
                    aria-label={`${currentAlbum.title} on ${label}`}
                    onClick={e => { if (!isActive) { e.preventDefault(); goToPf(i, albumPlatforms.length); } }}
                  >
                    <Icon className="pf-icon" aria-hidden="true" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
