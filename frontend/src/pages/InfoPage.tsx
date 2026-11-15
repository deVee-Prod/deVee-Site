import { SiWhatsapp } from 'react-icons/si';
import { MapPin, Mic2, Sparkles } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const WHATSAPP_URL =
  'https://wa.me/972542021618?text=' +
  encodeURIComponent('היי deVee Studio, הגעתי מהאתר ואשמח לשמוע פרטים על הקלטה באולפן');

export function InfoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />

      <main
        id="main-content"
        tabIndex={-1}
        dir="rtl"
        className="container mx-auto px-4 sm:px-6 pt-6 pb-16 sm:pt-10 sm:pb-24 text-right"
      >
        <div className="max-w-3xl mx-auto space-y-10 sm:space-y-12">
          {/* Studio Hero Image */}
          <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
            <img
              src="/devee-studio.webp"
              alt="deVee Studio - אולפן הקלטות והפקה מוזיקלית באזור השרון"
              width={1024}
              height={576}
              className="w-full h-auto aspect-video object-cover block"
            />
            <div
              className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/15 to-transparent pointer-events-none"
              aria-hidden="true"
            />
            <div className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 flex items-center gap-2 bg-black/70 backdrop-blur-md border border-orange-500/30 rounded-full px-3.5 py-1.5 text-xs sm:text-sm text-white/90">
              <MapPin className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
              <span>אבן יהודה · נתניה והשרון</span>
            </div>
          </div>

          {/* Intro */}
          <section className="space-y-5">
            <h1 className="text-3xl sm:text-5xl font-bold text-white leading-tight">
              ברוכים הבאים ל-<span dir="ltr" className="text-orange-500">deVee Studio</span>
            </h1>
            <div className="text-base sm:text-lg text-white/80 leading-relaxed space-y-4">
              <p>
                אולפן הקלטות והפקה מוזיקלית באבן יהודה, המציע סביבה מקצועית, אקוסטיקה מדויקת
                ויחס אישי מהרגע הראשון – גם לאמנים ויוצרים וגם להקלטות פרטיות ומרגשות.
              </p>
              <p>
                האולפן נגיש במיוחד לתושבי נתניה, אבן יהודה, רעננה, כפר סבא, הרצליה וכל אזור השרון,
                עם חניה נוחה ואווירה רגועה שמוציאה מכל אחד את הביצוע הטוב ביותר.
              </p>
            </div>
          </section>

          {/* Services */}
          <section aria-label="שירותי האולפן" className="grid sm:grid-cols-2 gap-4 sm:gap-5">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/15 text-orange-500">
                <Sparkles className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-white">הקלטת שיר לאירועים ומתנות</h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                הקלטת שיר לבר מצווה ובת מצווה, הקלטת שיר לחתונה, שיר הפתעה במתנה וברכות
                מוקלטות. ליווי סבלני וצמוד צעד אחר צעד, תיקון זיופים ועריכת סאונד ברמה אולפנית –
                מתאים גם למי שמעולם לא הקליט בעבר.
              </p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 space-y-3">
              <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-orange-500/15 text-orange-500">
                <Mic2 className="w-5 h-5" aria-hidden="true" />
              </div>
              <h2 className="text-xl font-bold text-white">הפקה, הקלטות, מיקס ומאסטרינג</h2>
              <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                הפקה מוזיקלית מלאה מאפס לאמנים ויוצרים, הקלטות שירה וכלים, עיבוד, מיקס ומאסטרינג
                מהודק בסטנדרט בינלאומי, וליווי לקראת הוצאת שירים והפצה דיגיטלית.
              </p>
            </div>
          </section>

          {/* Inviting WhatsApp CTA */}
          <section className="rounded-2xl border border-orange-500/30 bg-gradient-to-b from-orange-500/10 to-white/[0.02] p-6 sm:p-8 text-center space-y-5">
            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                רוצים לתאם הקלטה או לשאול שאלה?
              </h2>
              <p className="text-sm sm:text-base text-white/75 max-w-xl mx-auto leading-relaxed">
                שלחו לנו הודעה קצרה בוואטסאפ עם סוג ההקלטה או האירוע, ונשמח לתאם לכם שעה נוחה
                באולפן ולענות על הכל.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-1">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-base sm:text-lg px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_28px_rgba(249,115,22,0.35)]"
              >
                <SiWhatsapp className="w-5 h-5" aria-hidden="true" />
                <span>שלחו הודעה בוואטסאפ</span>
              </a>
            </div>

            <p className="text-xs sm:text-sm text-white/50">
              deVee Studio · אבן יהודה ·{' '}
              <a href="tel:+972542021618" dir="ltr" className="hover:text-white transition-colors">
                054-202-1618
              </a>
            </p>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}
