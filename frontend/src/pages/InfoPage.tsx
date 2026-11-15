import type { ElementType } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import {
  ArrowLeft,
  Car,
  CheckCircle2,
  Headphones,
  MapPin,
  Mic2,
  Phone,
  Sliders,
  Sparkles,
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

const makeWhatsappUrl = (message: string) =>
  `https://wa.me/972542021618?text=${encodeURIComponent(message)}`;

const MAIN_WHATSAPP_URL = makeWhatsappUrl(
  'היי deVee Studio, הגעתי מהאתר ואשמח לשמוע פרטים על הקלטה באולפן'
);

interface ServiceCardItem {
  title: string;
  description: string;
  ctaLabel: string;
  whatsappText: string;
  Icon: ElementType;
}

const SERVICES: ServiceCardItem[] = [
  {
    title: 'שיר לאירועים, בר/בת מצווה ומתנה',
    description:
      'חוויה מרגשת וכיפית גם למי שמחזיק מיקרופון בפעם הראשונה. ליווי סבלני מילה במילה, כיוון עדין שנשמע טבעי לגמרי, וסאונד שיפתיע את כולם באירוע.',
    ctaLabel: 'לתיאום שיר לאירוע',
    whatsappText: 'היי deVee Studio, אשמח לפרטים על הקלטת שיר לאירוע / מתנה',
    Icon: Sparkles,
  },
  {
    title: 'הפקה מוזיקלית ועיבוד לאמנים',
    description:
      'בניית הפקה מקורית מאפס שמותאמת בדיוק לקול ולסגנון שלכם – פופ, היפ-הופ, מזרחי, אלקטרוני או אינדי – מהסקיצה הראשונה ועד סאונד של רדיו.',
    ctaLabel: 'לדבר על הפקה חדשה',
    whatsappText: 'היי deVee Studio, אני מחפש/ת הפקה מוזיקלית ועיבוד לשיר',
    Icon: Mic2,
  },
  {
    title: 'הקלטות שירה, מיקס ומאסטרינג',
    description:
      'הקלטות ווקאל וכלים בחדר אקוסטי מדויק, עריכה נקייה, מיקס חם ומאסטרינג עוצמתי שעובד מעולה בספוטיפיי, יוטיוב, ברכב ועל הבמה.',
    ctaLabel: 'לפרטים על הקלטה ומיקס',
    whatsappText: 'היי deVee Studio, אשמח לשמוע פרטים על הקלטות / מיקס ומאסטרינג',
    Icon: Sliders,
  },
];

const STEPS = [
  {
    step: '01',
    title: 'שיחה קצרה בוואטסאפ',
    text: 'כותבים מה מתכננים – שיר לאירוע, קאבר או סינגל – ומתאימים לכם את האופציה והשעה שהכי נוחות לכם, בלי התחייבות.',
  },
  {
    step: '02',
    title: 'מגיעים לאולפן בראש שקט',
    text: 'חניה פרטית נוחה באבן יהודה, קפה ואווירה אינטימית ורגועה. עובדים בקצב שלכם כדי שתרגישו בנוח להוציא את ההכי טוב.',
  },
  {
    step: '03',
    title: 'יוצאים עם תוצר מלוטש',
    text: 'עריכה מוקפדת, מיקס ומאסטרינג באיכות אולפנית – ומקבלים שיר מוכן להשמעה, לשיתוף ולהתרגשות של כולם.',
  },
];

export function InfoPage() {
  return (
    <div
      className="relative min-h-screen bg-black text-white overflow-x-clip"
      style={{ fontFamily: "'Heebo', system-ui, -apple-system, sans-serif" }}
    >
      {/* Ambient studio lighting backdrop */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden" aria-hidden="true">
        <div
          className="absolute -top-32 left-[-10%] h-[34rem] w-[42rem] rounded-full opacity-70 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(249,115,22,0.16) 0%, rgba(234,88,12,0.05) 45%, transparent 72%)',
          }}
        />
        <div
          className="absolute top-12 right-[-8%] h-[28rem] w-[34rem] rounded-full opacity-55 blur-3xl"
          style={{
            background:
              'radial-gradient(circle, rgba(59,130,246,0.13) 0%, rgba(37,99,235,0.04) 48%, transparent 75%)',
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              'linear-gradient(to right, rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.5) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
            maskImage: 'radial-gradient(ellipse 80% 55% at 50% 18%, black 35%, transparent 100%)',
            WebkitMaskImage:
              'radial-gradient(ellipse 80% 55% at 50% 18%, black 35%, transparent 100%)',
          }}
        />
      </div>

      <div className="relative z-10">
        <Header />

        <main
          id="main-content"
          tabIndex={-1}
          dir="rtl"
          className="container mx-auto px-4 sm:px-6 pt-6 pb-20 sm:pt-12 sm:pb-28 text-right"
        >
          <div className="max-w-6xl mx-auto space-y-16 sm:space-y-24">
            {/* Hero Split Section */}
            <section className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Studio Photo — first visually on mobile so the room hooks immediately */}
              <div className="lg:col-span-6 lg:order-2">
                <div className="relative">
                  <div
                    className="pointer-events-none absolute -inset-4 rounded-3xl opacity-80 blur-2xl"
                    style={{
                      background:
                        'radial-gradient(circle at 30% 25%, rgba(59,130,246,0.28), transparent 55%), radial-gradient(circle at 75% 75%, rgba(249,115,22,0.24), transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative rounded-2xl overflow-hidden border border-white/15 bg-zinc-950 shadow-[0_28px_80px_rgba(0,0,0,0.9)]">
                    <img
                      src="/devee-studio.webp"
                      alt="deVee Studio - חדר הבקרה וההקלטות באבן יהודה"
                      width={1024}
                      height={576}
                      fetchPriority="high"
                      loading="eager"
                      className="w-full h-auto aspect-video object-cover block"
                    />
                    <div
                      className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent pointer-events-none"
                      aria-hidden="true"
                    />
                    <div className="absolute bottom-3.5 inset-x-3.5 sm:bottom-5 sm:inset-x-5 flex items-center justify-between gap-3">
                      <div className="inline-flex items-center gap-2 rounded-full bg-black/75 backdrop-blur-md border border-orange-500/35 px-3.5 py-1.5 text-xs sm:text-sm text-white/95">
                        <MapPin className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                        <span>אבן יהודה · השרון</span>
                      </div>
                      <span
                        dir="ltr"
                        className="hidden sm:inline-flex items-center rounded-full bg-black/65 backdrop-blur-md border border-white/15 px-3 py-1 text-xs font-medium text-white/75"
                      >
                        deVee Studio
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Inviting Copy & Immediate Actions */}
              <div className="lg:col-span-6 lg:order-1 space-y-6">
                <div className="inline-flex items-center gap-2 rounded-full border border-orange-500/30 bg-orange-500/10 px-3.5 py-1.5 text-xs sm:text-sm font-medium text-orange-300">
                  <span className="h-2 w-2 rounded-full bg-orange-500 animate-pulse" aria-hidden="true" />
                  <span>אולפן הקלטות והפקה מוזיקלית באזור השרון</span>
                </div>

                <h1 className="font-extrabold text-white leading-[1.12] tracking-tight text-[clamp(2rem,1.25rem+2.4vw,3.35rem)]">
                  להיכנס לאולפן,{' '}
                  <span className="bg-gradient-to-l from-orange-400 via-orange-500 to-amber-300 bg-clip-text text-transparent">
                    להרגיש בנוח,
                  </span>
                  <br />
                  ולצאת עם סאונד ברמה אחרת
                </h1>

                <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl">
                  ב־<span dir="ltr" className="font-bold text-white">deVee Studio</span> באבן יהודה מחכה
                  לכם חלל אקוסטי שקט ומוקפד, ציוד מהשורה הראשונה וליווי אישי סבלני בגובה העיניים –
                  גם להקלטת שיר מרגש לאירוע או במתנה, וגם לאמנים ויוצרים שבונים סינגל.
                </p>

                <div className="flex flex-wrap items-center gap-3 pt-1">
                  <a
                    href={MAIN_WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-extrabold text-base sm:text-lg px-7 py-3.5 rounded-full transition-all duration-200 shadow-[0_0_32px_rgba(249,115,22,0.4)]"
                  >
                    <SiWhatsapp className="w-5 h-5" aria-hidden="true" />
                    <span>שלחו הודעה בוואטסאפ</span>
                  </a>

                  <a
                    href="tel:+972542021618"
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/[0.04] hover:bg-white/[0.09] hover:border-white/30 text-white font-medium text-base px-6 py-3.5 transition-all duration-200"
                  >
                    <Phone className="w-4 h-4 text-orange-400" aria-hidden="true" />
                    <span dir="ltr">054-202-1618</span>
                  </a>
                </div>

                <ul className="flex flex-wrap items-center gap-x-5 gap-y-2 pt-2 text-xs sm:text-sm text-white/65">
                  <li className="inline-flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                    <span>עבודה רגועה 1 על 1</span>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Car className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                    <span>חניה פרטית צמודה</span>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <Headphones className="w-4 h-4 text-orange-500 shrink-0" aria-hidden="true" />
                    <span>מתאים גם בלי ניסיון קודם</span>
                  </li>
                </ul>
              </div>
            </section>

            {/* Services Section */}
            <section aria-labelledby="services-heading" className="space-y-8">
              <div className="space-y-2 max-w-2xl">
                <h2
                  id="services-heading"
                  className="font-bold text-white text-[clamp(1.6rem,1.2rem+1.4vw,2.4rem)]"
                >
                  מה אפשר להקליט וליצור כאן?
                </h2>
                <p className="text-sm sm:text-base text-white/65">
                  כל סשן מותאם אישית אליכם – בלי לחץ, בלי סרט נע, ועם דגש על תוצאה שאתם גאים להשמיע.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                {SERVICES.map(({ title, description, ctaLabel, whatsappText, Icon }) => (
                  <article
                    key={title}
                    className="@container group rounded-2xl border border-white/10 bg-zinc-950/80 hover:bg-zinc-900/80 hover:border-orange-500/40 p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.45)]"
                  >
                    <div className="space-y-4">
                      <div className="inline-flex items-center justify-center w-11 h-11 rounded-xl bg-orange-500/15 border border-orange-500/20 text-orange-400 group-hover:scale-105 transition-transform duration-300">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>
                      <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
                      <p className="text-sm sm:text-base text-white/75 leading-relaxed">
                        {description}
                      </p>
                    </div>

                    <footer className="pt-2 border-t border-white/[0.07]">
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

            {/* How a session feels (3 calming steps) */}
            <section
              aria-labelledby="process-heading"
              className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-10 space-y-8"
            >
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                <div className="space-y-2">
                  <span className="text-xs font-semibold uppercase tracking-widest text-orange-400">
                    פשוט, נעים ומדויק
                  </span>
                  <h2
                    id="process-heading"
                    className="font-bold text-white text-[clamp(1.5rem,1.15rem+1.2vw,2.2rem)]"
                  >
                    איך נראה סשן אצלנו?
                  </h2>
                </div>
                <p className="text-sm text-white/60 max-w-md">
                  דקות נסיעה מנתניה, רעננה, כפר סבא, הרצליה, קדימה־צורן ותל מונד.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {STEPS.map(({ step, title, text }) => (
                  <div
                    key={step}
                    className="relative rounded-2xl border border-white/[0.08] bg-black/50 p-6 space-y-3"
                  >
                    <span
                      dir="ltr"
                      className="inline-block text-sm font-extrabold tracking-wider text-orange-500 bg-orange-500/10 border border-orange-500/20 rounded-lg px-2.5 py-1"
                    >
                      {step}
                    </span>
                    <h3 className="text-lg font-bold text-white">{title}</h3>
                    <p className="text-sm text-white/75 leading-relaxed">{text}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Closing Invitation Banner */}
            <section className="relative overflow-hidden rounded-3xl border border-orange-500/35 bg-gradient-to-br from-orange-500/[0.14] via-zinc-950 to-black p-7 sm:p-12 text-center space-y-6 shadow-[0_24px_80px_rgba(0,0,0,0.75)]">
              <div className="space-y-3 max-w-2xl mx-auto">
                <h2 className="font-extrabold text-white text-[clamp(1.65rem,1.2rem+1.5vw,2.5rem)] leading-tight">
                  רוצים לתאם שעה או לשאול שאלה קצרה?
                </h2>
                <p className="text-sm sm:text-base text-white/80 leading-relaxed">
                  אין שאלה מוקדמת מדי – תשלחו הודעה קצרה בוואטסאפ או תרימו טלפון, ונעזור לכם
                  להפוך את הרעיון לשיר שנשמע מעולה.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-1">
                <a
                  href={MAIN_WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-3 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-extrabold text-base sm:text-lg px-8 py-4 rounded-full transition-all duration-200 shadow-[0_0_32px_rgba(249,115,22,0.45)]"
                >
                  <SiWhatsapp className="w-5 h-5" aria-hidden="true" />
                  <span>דברו איתי בוואטסאפ</span>
                </a>

                <a
                  href="tel:+972542021618"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-full border border-white/15 bg-black/50 hover:bg-white/[0.08] hover:border-white/30 text-white font-semibold text-base px-7 py-4 transition-all duration-200"
                >
                  <Phone className="w-4 h-4 text-orange-400" aria-hidden="true" />
                  <span dir="ltr">054-202-1618</span>
                </a>
              </div>

              <p className="text-xs sm:text-sm text-white/55 pt-1">
                deVee Studio · אבן יהודה והשרון · מיקום מדויק והוראות חניה נשלחים בתיאום הסשן
              </p>
            </section>
          </div>
        </main>

        <Footer />
      </div>
    </div>
  );
}
