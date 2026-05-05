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
    // rel=0 → no related videos, modestbranding=1 → smaller YouTube logo
    return `https://www.youtube.com/embed/${videoId}?rel=0&modestbranding=1`;
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

        {/* Spotify Playlist - open/expanded view */}
        <div className="mt-6 flex justify-center">
          <iframe
            src="https://open.spotify.com/embed/playlist/6GfqHUQdZN4TrTbsaPpqxU?utm_source=generator&theme=0"
            width="100%"
            height="352"
            frameBorder="0"
            allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
            loading="lazy"
            className="rounded-2xl max-w-2xl"
          />
        </div>

      </div>
    </section>
  );
}
