import { SiSpotify, SiApplemusic } from 'react-icons/si';

export function VideoSection() {
  const tracks = [
    {
      id: 'track1',
      videoUrl: 'http://www.youtube.com/watch?v=Hv6yD04iwe0',
      title: 'ניקיתי את הלב (Prod by. deVee)',
      spotify: 'https://open.spotify.com/track/0IccXF4g1FcsgLEq82SioC?si=dqop7sCTSqCbQLxjkwWNIQ',
      appleMusic: 'https://music.apple.com/il/album/%D7%A0%D7%99%D7%A7%D7%99%D7%AA%D7%99-%D7%90%D7%AA-%D7%94%D7%9C%D7%91/1794794200?i=1794794278'
    },
    {
      id: 'track2',
      videoUrl: 'http://www.youtube.com/watch?v=hRo2y0U-N_k',
      title: 'YALi | יהלי - בראשית (Prod. by deVee)',
      spotify: 'https://open.spotify.com/track/4AA6RpirW0hsRY8c4ioRi1?si=5mrAXNLrSXq88yd8BucN_Q',
      appleMusic: 'https://music.apple.com/il/album/%D7%91%D7%A8%D7%90%D7%A9%D7%99%D7%AA/1838307735?i=1838307740'
    },
    {
      id: 'track3',
      videoUrl: 'https://www.youtube.com/watch?v=ZPr1Y7-PAWM',
      title: 'Gondola - Ariella Eve ft. deVee',
      spotify: 'https://open.spotify.com/track/2Efb65EXekAuodCjyUP0rL?si=40f2915527e9442e',
      appleMusic: 'https://music.apple.com/us/song/gondola-feat-devee/1877252295'
    }
  ];

  // Convert YouTube URLs to embed format
  const getEmbedUrl = (url: string) => {
    const videoId = url.split('v=')[1]?.split('&')[0];
    return `https://www.youtube.com/embed/${videoId}`;
  };

  return (
    <section className="relative pt-4 sm:pt-6 pb-5 px-4 sm:px-6 bg-gradient-to-b from-black via-zinc-950 to-black z-20">
      <div className="container mx-auto max-w-6xl">
        {/* Latest Releases Header Image */}
        <div className="flex justify-center mb-5">
          <img 
            src="/Gemini_Generated_Image_evzpamevzpamevzp 2.png" 
            alt="Latest Releases"
            className="w-[90%] sm:w-[95%] md:max-w-[750px] h-auto object-contain"
          />
        </div>

        {/* Track Cards Container */}
        <div className="flex flex-col items-center gap-5">
          {tracks.map((track) => (
            <div 
              key={track.id} 
              className="w-full max-w-4xl border border-white/10 rounded-2xl p-4 sm:p-6 bg-black/30 backdrop-blur-sm hover:border-white/20 transition-all duration-300"
            >
              {/* Video Container */}
              <div className="group mb-4">
                <div className="relative aspect-video rounded-xl sm:rounded-2xl overflow-hidden bg-zinc-900 shadow-2xl border border-white/5 hover:border-orange-500/30 transition-all duration-500">
                  <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl sm:rounded-2xl blur-xl opacity-0 group-hover:opacity-20 transition duration-500" />
                  
                  <iframe
                    src={getEmbedUrl(track.videoUrl)}
                    title={track.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="relative w-full h-full"
                  />
                </div>
              </div>

              {/* Streaming Platform Buttons */}
              <div className="flex gap-6 sm:gap-8 justify-center">
                <a
                  href={track.spotify}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/icon transition-all duration-300 hover:scale-110"
                  aria-label="Listen on Spotify"
                >
                  <SiSpotify className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500 hover:text-orange-400 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                </a>

                <a
                  href={track.appleMusic}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/icon transition-all duration-300 hover:scale-110"
                  aria-label="Listen on Apple Music"
                >
                  <SiApplemusic className="w-8 h-8 sm:w-9 sm:h-9 text-orange-500 hover:text-orange-400 transition-colors duration-300 drop-shadow-[0_0_8px_rgba(249,115,22,0.5)] hover:drop-shadow-[0_0_12px_rgba(249,115,22,0.8)]" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}