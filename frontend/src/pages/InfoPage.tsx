import { SiWhatsapp } from 'react-icons/si';
import { Phone } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const WHATSAPP_URL =
  'https://wa.me/972542021618?text=' +
  encodeURIComponent('היי, אשמח לשמוע פרטים על הקלטה ב-deVee Studio');

export function InfoPage() {
  return (
    <div
      className="min-h-screen bg-black text-white selection:bg-orange-500 selection:text-black"
      style={{ fontFamily: "'Heebo', system-ui, -apple-system, sans-serif" }}
    >
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        dir="rtl"
        className="container mx-auto max-w-4xl px-4 sm:px-6 pt-8 sm:pt-14 pb-20 sm:pb-28 text-right"
      >
        {/* Title & Intro */}
        <header className="space-y-4 mb-10 sm:mb-14">
          <p className="text-orange-500 text-xs sm:text-sm font-medium tracking-wider">
            אבן יהודה · השרון
          </p>
          <h1
            dir="ltr"
            className="text-right font-extrabold text-white tracking-tight leading-[1.08] text-[clamp(2.25rem,1.4rem+2.5vw,3.5rem)]"
          >
            deVee <span className="text-orange-500">Studio</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/80 leading-relaxed max-w-2xl">
            אולפן הקלטות והפקה מוזיקלית באבן יהודה. מקום שקט, נעים ומאובזר לעבודה ממוקדת 1 על 1 –
            גם לאמנים ויוצרים וגם להקלטות פרטיות ולאירועים.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-sm sm:text-base px-6 py-3 rounded-full transition-colors duration-200"
            >
              <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span>דברו איתי בוואטסאפ</span>
            </a>

            <a
              href="tel:+972542021618"
              className="inline-flex items-center justify-center gap-2 border border-white/15 hover:border-white/35 bg-white/[0.03] hover:bg-white/[0.07] text-white/90 text-sm sm:text-base px-5 py-3 rounded-full transition-colors duration-200"
            >
              <Phone className="w-4 h-4 text-orange-500" aria-hidden="true" />
              <span dir="ltr">054-202-1618</span>
            </a>
          </div>
        </header>

        {/* Studio Photos */}
        <section aria-label="תמונות מהאולפן" className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5 mb-12 sm:mb-16">
          <figure className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
            <img
              src="/studio-room.jpg"
              alt="חדר הבקרה וההקלטות ב-deVee Studio"
              width={1400}
              height={937}
              fetchPriority="high"
              loading="eager"
              className="w-full h-auto aspect-[1400/937] object-cover block"
            />
          </figure>
          <figure className="rounded-xl overflow-hidden border border-white/10 bg-zinc-950">
            <img
              src="/studio-lounge.jpg"
              alt="פינת הישיבה והאירוח ב-deVee Studio"
              width={1400}
              height={935}
              loading="eager"
              className="w-full h-auto aspect-[1400/935] object-cover block"
            />
          </figure>
        </section>

        {/* Signature Divider */}
        <div
          className="h-px bg-gradient-to-r from-transparent via-orange-500/35 to-transparent mb-12 sm:mb-16"
          aria-hidden="true"
        />

        {/* Services */}
        <section aria-labelledby="services-title" className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 mb-12 sm:mb-16">
          <article className="space-y-3">
            <h2 id="services-title" className="text-xl sm:text-2xl font-bold text-white">
              הפקה מוזיקלית, הקלטות ומיקס
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              ליווי מלא מאפס לבניית סינגל או פרויקט – עיבוד, הקלטת שירה וכלים, מיקס ומאסטרינג
              מוקפד ברמה בינלאומית, באקוסטיקה מדויקת וסאונד נקי ומאוזן.
            </p>
          </article>

          <article className="space-y-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white">
              הקלטת שיר לאירועים ומתנות
            </h2>
            <p className="text-base text-white/75 leading-relaxed">
              בר מצווה, בת מצווה, חתונה או שיר הפתעה במתנה – הקלטה בסבלנות ובאווירה נינוחה, עם
              הכוונה קולית, עריכה ותיקון זיופים עדין שגורם לכולם להרגיש בטוחים מול המיקרופון.
            </p>
          </article>
        </section>

        {/* Location Editorial Note */}
        <p className="text-base sm:text-lg text-white/80 leading-relaxed border-r-2 border-orange-500/60 pr-4 sm:pr-5 mb-14 sm:mb-16">
          האולפן ממוקם באבן יהודה, במרחק דקות נסיעה מנתניה, רעננה, כפר סבא והרצליה – עם חניה נוחה
          ומועדים בתיאום אישי.
        </p>

        {/* Bottom Direct Contact */}
        <section className="pt-8 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="text-xl sm:text-2xl font-bold text-white">רוצים לתאם הקלטה?</h2>
            <p className="text-sm sm:text-base text-white/65">
              אפשר לשלוח הודעה קצרה בוואטסאפ או להתקשר ישירות.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 shrink-0">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-sm sm:text-base px-6 py-3 rounded-full transition-colors duration-200"
            >
              <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span>וואטסאפ</span>
            </a>

            <a
              href="tel:+972542021618"
              dir="ltr"
              className="inline-flex items-center justify-center border border-white/15 hover:border-white/35 text-white/85 hover:text-white text-sm sm:text-base px-5 py-3 rounded-full transition-colors duration-200"
            >
              054-202-1618
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
