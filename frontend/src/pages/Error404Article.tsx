import { useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DriftingGridBackground } from '../components/DriftingGridBackground';

export function Error404Article() {
  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = 'ZOHAR: Turns Pain Into Purpose With "Error 404"';
  }, []);

  return (
    <div className="min-h-screen text-white selection:bg-orange-500 selection:text-white">
      <DriftingGridBackground />
      <div className="relative z-10">
        <Header />

        <main>
          <div className="container mx-auto max-w-5xl px-4 sm:px-6 pt-10 sm:pt-16 pb-16 sm:pb-24">

            {/* ── Top: Title ── */}
            <div className="mb-12 sm:mb-16 text-center flex flex-col items-center">
              <p className="text-orange-500 font-medium text-sm sm:text-base tracking-[0.25em] uppercase mb-4 sm:mb-6">
                Exclusive Feature
              </p>
              <h1
                className="text-4xl sm:text-6xl md:text-7xl font-extrabold leading-[1.1] tracking-tight max-w-4xl"
                style={{ fontFamily: "'Montserrat', sans-serif" }}
              >
                ZOHAR Turns Pain Into Purpose With{' '}
                <span className="text-orange-500 whitespace-nowrap">"Error 404"</span>
              </h1>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-12 sm:mb-16" />

            {/* ── YouTube Embed ── */}
            <div className="mb-14 sm:mb-16">
              <div
                className="relative w-[92%] sm:w-full rounded-xl overflow-hidden border border-white/[0.08] max-w-3xl mx-auto"
                style={{
                  aspectRatio: '16/9',
                  boxShadow:
                    '0 30px 80px rgba(0,0,0,0.5), 0 0 60px rgba(234,88,12,0.08)',
                }}
              >
                <iframe
                  src="https://www.youtube.com/embed/SlR3joHgCXs?rel=0&vq=hd1080"
                  title="ZOHAR — Error 404"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="absolute inset-0 w-full h-full"
                  style={{ border: 'none' }}
                />
              </div>
            </div>

            {/* ── Lead paragraph ── */}
            <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-12 sm:mb-16 border-l-2 border-orange-500/60 pl-5 sm:pl-6">
              ZOHAR is a 25-year-old singer-songwriter finding her way into the
              music industry while also navigating life as a wife and a new mother.
              At the heart of her work is a simple but deeply personal mission: to
              help people release what they are carrying through music, feel less
              alone, and find the light at the end of the tunnel through the
              stories she chooses to tell.
            </p>

            {/* Section: Purpose */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Her message is about choosing life and refusing to give up on your
                dreams.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                It may sound like a cliché, but for ZOHAR, those words hold a very
                real meaning.
              </p>

              {/* Pull Quote */}
              <blockquote className="relative my-10 sm:my-14 py-6 sm:py-8 px-6 sm:px-8 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <span className="absolute -top-4 left-6 text-5xl sm:text-6xl text-orange-500/40 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-lg sm:text-xl text-white/90 italic leading-relaxed">
                  I spent years so scared that people would leave me that I stayed
                  in places that were bad for me.
                </p>
                <footer className="mt-4 text-sm text-orange-500/80 tracking-wide uppercase">
                  — ZOHAR
                </footer>
              </blockquote>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                "For a long time, I wondered why I went through the things I went
                through. I carried a lot of pain from relationships that made me
                lose myself, and for years I didn't know what to do with any of
                it."
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-14 sm:mb-20" />

            {/* Section: A Song Written Before She Understood It */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                A Song Written Before She Understood It
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                ZOHAR first wrote the song now known as "Error 404" at the age of
                19, during the COVID-19 pandemic.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                At the time, the song was called "Self Respect."
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                She was also in an emotionally abusive relationship.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                The relationship was manipulative, unfaithful and emotionally
                destructive. It isolated her from her friends and family, deepened
                the eating disorders she had struggled with since the age of 14,
                including bulimia, and intensified her anxiety, depression and
                suicidal thoughts, eventually pushing her further and further away
                from herself.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                It was only after she accepted help and left the relationship that
                she was able to look back at the lyrics with a new understanding.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                She realized that her subconscious had written down everything she
                was feeling before she was ready to admit it to herself.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                The song had captured the fear, confusion and emotional isolation
                of being with someone who knew how to manipulate her reality and
                make her question her own instincts.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed font-medium text-white/90">
                What began as a song called "Self Respect" later became something
                much bigger.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-14 sm:mb-20" />

            {/* Section: The Meaning Behind "Error 404" */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                The Meaning Behind "Error 404"
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                An Error 404 appears when someone tries to access a webpage that no
                longer exists or cannot be found.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                For ZOHAR, that became the perfect metaphor for a toxic
                relationship.
              </p>

              {/* Pull Quote */}
              <blockquote className="relative my-10 sm:my-14 py-6 sm:py-8 px-6 sm:px-8 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <span className="absolute -top-4 left-6 text-5xl sm:text-6xl text-orange-500/40 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-lg sm:text-xl text-white/90 italic leading-relaxed">
                  An Error 404 happens when you're searching for something that
                  isn't there anymore. And that's exactly what those relationships
                  felt like. I kept looking for love, safety and the person I
                  thought existed, but no matter how hard I searched, I couldn't
                  find them.
                </p>
                <footer className="mt-4 text-sm text-orange-500/80 tracking-wide uppercase">
                  — ZOHAR
                </footer>
              </blockquote>

              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                People often remain in harmful relationships because they are still
                searching for the person they first met, the love they were
                promised or the sense of safety they once believed was possible.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Eventually, that search can cause them to disconnect from their own
                feelings and lose sight of who they are.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Everything begins to feel like one large emotional error.
              </p>

              {/* Pull Quote */}
              <blockquote className="relative my-10 sm:my-14 py-6 sm:py-8 px-6 sm:px-8 rounded-xl bg-white/[0.03] border border-white/[0.06] backdrop-blur-sm">
                <span className="absolute -top-4 left-6 text-5xl sm:text-6xl text-orange-500/40 font-serif leading-none select-none">
                  "
                </span>
                <p className="text-lg sm:text-xl text-white/90 italic leading-relaxed">
                  Writing this song was part of my healing. And today, if my story
                  helps someone feel understood, or reminds them that they can
                  heal, that they are not alone and that life is worth fighting
                  for, then I've done my job.
                </p>
                <footer className="mt-4 text-sm text-orange-500/80 tracking-wide uppercase">
                  — ZOHAR
                </footer>
              </blockquote>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-14 sm:mb-20" />

            {/* Section: Giving the Song a New Life */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Giving the Song a New Life
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                ZOHAR and producer deVee began working together in April 2026.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                From their first sessions, the room quickly filled with ideas.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Together, they decided to bring "Self Respect" back to life and
                transform it into "Error 404."
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                One of the most unexpected ideas was the decision to incorporate
                Beethoven's "Moonlight Sonata, Third Movement" into the song.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                At first, it was almost a joke.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                They experimented with the idea simply to see what would happen,
                only to discover that the pieces were in the same key. What began
                as a playful experiment quickly became something much more serious.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                The more they explored it, the more natural the connection felt,
                until they completely fell in love with the concept.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                The classical influence added another emotional layer to the song,
                creating a connection between old and new, vulnerability and power,
                pain and transformation.
              </p>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-14 sm:mb-20" />

            {/* Section: Taking the Time to Create */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <h2 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">
                Taking the Time to Create
              </h2>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                The process of creating "Error 404" proves that meaningful art
                still exists.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                It simply has to be searched for, lived in and given the time it
                deserves.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Rather than rushing the process, they allowed the song to develop
                naturally. Every decision became part of a larger creative
                discovery.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                Through the creation of the song, they learned more about
                themselves as artists and opened the door to ideas they had never
                considered before.
              </p>
            </div>

            {/* ── ZOHAR Photo — smaller, inline ── */}
            <div className="mb-14 sm:mb-20 flex justify-center">
              <div className="w-full max-w-2xl">
                <div
                  className="rounded-xl overflow-hidden border border-white/[0.08]"
                  style={{
                    boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 40px rgba(234,88,12,0.06)',
                  }}
                >
                  <img
                    src="/zohar-error404.jpg"
                    alt="ZOHAR Error 404"
                    className="w-full h-auto object-cover"
                  />
                </div>
                <p className="mt-2 text-[9px] text-white/30 tracking-wider text-left pl-1" style={{ fontFamily: 'Helvetica, Arial, sans-serif' }}>
                  Zohar Artist Photo ©
                </p>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-gradient-to-r from-transparent via-orange-500/30 to-transparent mb-14 sm:mb-20" />

            {/* Section: Closing */}
            <div className="space-y-6 mb-14 sm:mb-20">
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                "Error 404" is more than a song about a painful relationship.
              </p>
              <p className="text-base sm:text-lg text-white/90 leading-relaxed font-medium">
                It is a song about surviving it.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                It is about realizing that pain does not always have to remain
                private. Sometimes, sharing it can help another person recognize
                their own reality, feel understood and find the courage to choose a
                different life.
              </p>
              <p className="text-base sm:text-lg text-white/75 leading-relaxed">
                For ZOHAR, that is the purpose behind the music.
              </p>

              {/* Closing lines — emphasized */}
              <div className="pt-6 sm:pt-8 space-y-3">
                <p className="text-lg sm:text-xl text-white/90 font-medium">
                  To turn pain into connection.
                </p>
                <p className="text-lg sm:text-xl text-white/90 font-medium">
                  To turn survival into art.
                </p>
                <p className="text-lg sm:text-xl text-orange-500 font-bold">
                  And to remind people that even after losing themselves, they can
                  still find their way back.
                </p>
              </div>
            </div>

            {/* ── Credits ── */}
            <div className="pt-8 sm:pt-10 border-t border-white/[0.06]">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div className="space-y-1">
                  <p className="text-sm text-white/40 uppercase tracking-[0.15em]">
                    Artist
                  </p>
                  <p className="text-base text-white/80 font-medium">
                    ZOHAR (Zohar Raziel)
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/40 uppercase tracking-[0.15em]">
                    Produced by
                  </p>
                  <p className="text-base text-white/80 font-medium">David "deVee" Ben David</p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-white/40 uppercase tracking-[0.15em]">
                    Label
                  </p>
                  <p className="text-base text-white/80 font-medium">
                    deVee Boutique Label
                  </p>
                </div>
              </div>
            </div>

          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
