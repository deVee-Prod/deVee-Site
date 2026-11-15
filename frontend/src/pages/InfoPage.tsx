import { useEffect } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowLeft, Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const makeWhatsappUrl = (message: string) =>
  `https://wa.me/972542021618?text=${encodeURIComponent(message)}`;

const MAIN_WHATSAPP_URL = makeWhatsappUrl(
  'היי, אשמח לשמוע פרטים על הקלטה ב-deVee Studio'
);

const SERVICES = [
  {
    title: 'שיר לאירועים ומתנות',
    description:
      'בר מצווה, בת מצווה, חתונה או שיר הפתעה במתנה – הקלטה בסבלנות ובאווירה נינוחה, עם הכוונה קולית, עריכה ותיקון זיופים עדין שנשמע טבעי לגמרי.',
    ctaLabel: 'לתיאום שיר לאירוע',
    whatsappText: 'היי, אשמח לפרטים על הקלטת שיר לאירוע / מתנה',
  },
  {
    title: 'הפקה מוזיקלית ועיבוד',
    description:
      'בניית הפקה מקורית מאפס שמותאמת בדיוק לקול ולכיוון שלך – מהסקיצה הראשונה ועד עיבוד שלם ומדויק שמרגיש נכון מהתו הראשון.',
    ctaLabel: 'לדבר על הפקה',
    whatsappText: 'היי, אשמח לשמוע פרטים על הפקה מוזיקלית',
  },
  {
    title: 'הקלטות, מיקס ומאסטרינג',
    description:
      'הקלטת שירה וכלים באקוסטיקה מוקפדת, מיקס עמוק ומאסטרינג בסטנדרט בינלאומי לספוטיפיי, יוטיוב והופעות.',
    ctaLabel: 'לפרטים על הקלטה ומיקס',
    whatsappText: 'היי, אשמח לפרטים על הקלטה / מיקס ומאסטרינג',
  },
];

export function InfoPage() {
  useEffect(() => {
    document.title = 'deVee Studio - אולפן הקלטות באזור השרון';
  }, []);
  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-clip selection:bg-orange-500 selection:text-black"
      style={{ fontFamily: "'Heebo', system-ui, -apple-system, sans-serif" }}
    >
      {/* Subtle studio ambient glow */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-36 left-[-8%] h-[32rem] w-[40rem] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.13) 0%, rgba(234,88,12,0.04) 48%, transparent 72%)',
          }}
        />
        <div
          className="absolute top-10 right-[-10%] h-[26rem] w-[32rem] rounded-full opacity-45 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.10) 0%, rgba(37,99,235,0.03) 50%, transparent 75%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          dir="rtl"
          className="container mx-auto max-w-6xl px-4 sm:px-6 pt-8 sm:pt-14 pb-20 sm:pb-28 text-right space-y-14 sm:space-y-20"
        >
          {/* Hero: Top Studio Photo + Clean Intro */}
          <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            <div className="lg:col-span-6 lg:order-2">
              <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
                <img
                  src="/studio-room.jpg"
                  alt="חדר הבקרה וההקלטות ב-deVee Studio"
                  width={1400}
                  height={937}
                  fetchPriority="high"
                  loading="eager"
                  className="w-full h-auto aspect-[1400/937] object-cover block"
                />
              </div>
            </div>

            <div className="lg:col-span-6 lg:order-1 space-y-5">
              <p className="text-orange-500 text-xs sm:text-sm font-medium tracking-wider">
                אבן יהודה · השרון
              </p>

              <h1
                dir="ltr"
                className="text-right font-extrabold text-white tracking-tight leading-[1.08] text-[clamp(2.25rem,1.4rem+2.5vw,3.5rem)]"
              >
                deVee <span className="text-orange-500">Studio</span>
              </h1>

              <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-xl">
                אולפן הקלטות והפקה מוזיקלית באבן יהודה. מרחב שקט ומאובזר לעבודה אישית 1 על 1 –
                להפקות מלאות, הקלטות, מיקס ומאסטרינג, וגם להקלטת שיר מרגש לאירועים ומתנות.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <a
                  href={MAIN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors duration-200 shadow-[0_0_24px_rgba(249,115,22,0.3)]"
                >
                  <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                  <span>דברו איתי בוואטסאפ</span>
                </a>

                <a
                  href="tel:+972542021618"
                  className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.07] text-white/90 text-sm sm:text-base px-5 py-3.5 rounded-full transition-colors duration-200"
                >
                  <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
                  <span dir="ltr">054-202-1618</span>
                </a>
              </div>
            </div>
          </section>

          {/* Divider */}
          <div
            className="h-px bg-gradient-to-r from-transparent via-orange-500/35 to-transparent"
            aria-hidden="true"
          />

          {/* Services */}
          <section aria-labelledby="services-heading" className="space-y-8">
            <h2
              id="services-heading"
              className="font-bold text-white text-[clamp(1.6rem,1.2rem+1.3vw,2.25rem)]"
            >
              מה עושים באולפן
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {SERVICES.map(({ title, description, ctaLabel, whatsappText }) => (
                <article
                  key={title}
                  className="@container group rounded-2xl border border-white/10 bg-zinc-950/70 hover:bg-zinc-900/70 hover:border-orange-500/35 p-6 sm:p-7 flex flex-col justify-between gap-6 transition-colors duration-200"
                >
                  <div className="space-y-3">
                    <h3 className="text-xl font-bold text-white">{title}</h3>
                    <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                      {description}
                    </p>
                  </div>

                  <footer className="pt-3 border-t border-white/[0.07]">
                    <a
                      href={makeWhatsappUrl(whatsappText)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-orange-400 hover:text-orange-300 transition-colors"
                    >
                      <span>{ctaLabel}</span>
                      <ArrowLeft
                        className="w-4 h-4 transition-transform duration-200 group-hover:-translate-x-1"
                        aria-hidden="true"
                      />
                    </a>
                  </footer>
                </article>
              ))}
            </div>
          </section>

          {/* Second Studio Photo + Atmosphere Section */}
          <section
            aria-labelledby="atmosphere-heading"
            className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center"
          >
            <div className="lg:col-span-6">
              <div className="rounded-2xl overflow-hidden border border-white/10 bg-zinc-950">
                <img
                  src="/studio-lounge.jpg"
                  alt="פינת הישיבה והאירוח ב-deVee Studio"
                  width={1400}
                  height={935}
                  loading="lazy"
                  className="w-full h-auto aspect-[1400/935] object-cover block"
                />
              </div>
            </div>

            <div className="lg:col-span-6 space-y-5">
              <h2
                id="atmosphere-heading"
                className="font-bold text-white text-[clamp(1.5rem,1.15rem+1.2vw,2.1rem)]"
              >
                אווירה נינוחה, בלי לחץ
              </h2>
              <p className="text-base sm:text-lg text-white/80 leading-relaxed">
                בין אם זו הקלטה ראשונה לקראת אירוע משפחתי ובין אם זה יום עבודה על סינגל חדש –
                חשוב לי שתרגישו כאן בנוח. עובדים בקצב שלכם, עם קפה, פינת ישיבה נוחה ואוזן קשבת
                לכל רעיון.
              </p>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed border-r-2 border-orange-500/60 pr-4">
                האולפן נמצא באבן יהודה, דקות נסיעה מנתניה, רעננה, כפר סבא והרצליה – עם חניה נוחה
                ותיאום מראש.
              </p>
            </div>
          </section>

          {/* Bottom Direct Contact */}
          <section className="rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 to-white/[0.02] p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-1.5">
              <h2 className="text-xl sm:text-2xl font-bold text-white">רוצים לתאם הקלטה?</h2>
              <p className="text-sm sm:text-base text-white/75">
                שלחו הודעה קצרה בוואטסאפ או חייגו ונקבע שעה שנוחה לכם.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 shrink-0">
              <a
                href={MAIN_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-sm sm:text-base px-6 py-3.5 rounded-full transition-colors duration-200 shadow-[0_0_24px_rgba(249,115,22,0.3)]"
              >
                <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
                <span>שלחו הודעה בוואטסאפ</span>
              </a>

              <a
                href="tel:+972542021618"
                dir="ltr"
                className="inline-flex items-center justify-center border border-white/15 hover:border-white/35 bg-black/40 text-white/90 hover:text-white text-sm sm:text-base px-5 py-3.5 rounded-full transition-colors duration-200"
              >
                054-202-1618
              </a>
            </div>
          </section>
        </main>

        <Footer />
      </div>
    </div>
  );
}
