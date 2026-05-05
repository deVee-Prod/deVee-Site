import { SiApplemusic } from 'react-icons/si';

export function VideoSection() {
  const tracks = [
    {
      id: 'track1',
      videoUrl: 'http://www.youtube.com/watch?v=Hv6yD04iwe0',
      title: 'ניקיתי את הלב (Prod by. deVee)',
    },
    {
      id: 'track2',
      videoUrl: 'http://www.youtube.com/watch?v=hRo2y0U-N_k',
      title: 'YALi | יהלי - בראשית (Prod. by deVee)',
    },
    {
      id: 'track3',
      videoUrl: 'https://www.youtube.com/watch?v=ZPr1Y7-PAWM',
      title: 'Gondola - Ariella Eve ft. deVee',
    },
    {
      id: 'track4',
      videoUrl: 'https://www.youtube.com/watch?v=RO1LiMKFBwA',
      title: 'קאש (Prod. by deVee)',
    }
  ];

  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="relative pt-4 sm:pt-6 pb-8 px-3 sm:px-6 bg-gradient-to-b from-black via-zinc-950 to-black z-20">
      <div className="container mx-auto max-w-6xl">

        {/* Latest Releases Header Image */}
        <div className="flex justify-center mb-5">
          <img
            src="/Gemini_Generated_Image_evzpamevzpamevzp 2.png"
            alt="Latest Releases"
            className="w-[90%] sm:w-[95%] md:max-w-[750px] h-auto object-contain ml-[10px] sm:ml-[15px]"
          />
        </div>

        {/* Video Grid - 2 columns always */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          {tracks.map((track) => (
            <div key={track.id} className="w-full">
              <div className="relative aspect-video rounded-lg overflow-hidden bg-zinc-900">
                <iframe
                  src={getEmbedUrl(track.videoUrl)}
                  title={track.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Playlist Players */}
        <div className="mt-6 flex flex-col sm:flex-row gap-4 items-center justify-center">
          {/* Spotify Embed */}
          <iframe
            src="https://open.spotify.com/embed/playlist/6GfqHUQdZN4TrTbsaPpqxU?utm_source=generator&theme=0"
            width="100%"
            height="80"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-xl max-w-sm"
          />

          {/* Apple Music Button */}
          <a
            href="https://music.apple.com/il/playlist/prod-by-devee/pl.u-BNA6YjJT1gApr1W"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-3 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-white/20 transition-all duration-300"
          >
            <SiApplemusic className="w-5 h-5 text-orange-500" />
            <span className="text-white/80 text-sm font-medium">Apple Music Playlist</span>
          </a>
        </div>

      </div>
    </section>
  );
}
