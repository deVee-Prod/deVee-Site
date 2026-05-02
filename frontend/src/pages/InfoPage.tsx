import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function InfoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="max-w-2xl mx-auto space-y-16">

          {/* English */}
          <section className="space-y-6">
            <h1 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Welcome to deVee Boutique Label
            </h1>
            <div className="text-base sm:text-lg text-white/75 leading-relaxed space-y-4">
              <p>
                Based in Even Yehuda, Israel, I am a 28-year-old music producer, sound engineer, and the founder of deVee Boutique Label.
              </p>
              <p>
                Operating from a professional recording studio built to the highest industry standards, I specialize in top-tier music production, precise mixing, and heavy-hitting mastering.
              </p>
              <p>
                From developing artists and managing global distribution to crafting unique soundscapes, deVee Boutique Label is the ultimate home for creators who refuse to compromise on their sound. Let's elevate your music.
              </p>
            </div>
          </section>

          {/* Divider */}
          <div className="h-px bg-white/10" />

          {/* Hebrew */}
          <section dir="rtl" className="text-right space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              ברוכים הבאים ל-deVee Boutique Label
            </h2>
            <div className="text-base sm:text-lg text-white/75 leading-relaxed space-y-4">
              <p>
                אולפן הקלטות וחברת הפקות בוטיק הממוקמת באבן יהודה.
                אני מפיק מוזיקלי וטכנאי סאונד בן 28 שחי ונושם יצירה. האולפן שלי נבנה בקפידה כדי להעניק למוזיקה שלכם את הסביבה המקצועית והמדויקת ביותר, במטרה להוציא ממנה את הסאונד המקסימלי.
              </p>
              <p>
                בין אם אתם מחפשים הפקה מוזיקלית מאפס, מיקס ומאסטרינג מהודק, או ניהול והפצה דיגיטלית של השירים שלכם – deVee Boutique Label כאן כדי לתת ליצירה שלכם את היחס האישי והמקצועי ביותר.
              </p>
            </div>
          </section>

        </div>
      </main>
      <Footer />
    </div>
  );
}
