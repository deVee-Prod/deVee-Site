import { FormEvent, useEffect, useState } from 'react';
import { SiWhatsapp } from 'react-icons/si';
import { ArrowLeft, ChevronDown, Phone } from 'lucide-react';
import { Footer } from '../components/Footer';

const DEFAULT_WHATSAPP_MESSAGE =
  'היי, אשמח לשמוע פרטים על הקלטה ב-deVee Studio';

const makeWhatsappUrl = (message: string) =>
  `https://wa.me/972542021618?text=${encodeURIComponent(message.trim() || DEFAULT_WHATSAPP_MESSAGE)}`;

const QUICK_TOPICS = [
  {
    label: 'שיר לאירוע / מתנה',
    draft: 'היי, מתעניין/ת בהקלטת שיר לאירוע / מתנה ב-deVee Studio',
  },
  {
    label: 'הפקה מוזיקלית',
    draft: 'היי, אשמח לפרטים על הפקה מוזיקלית ועיבוד לשיר',
  },
  {
    label: 'הקלטה ומיקס',
    draft: 'היי, אשמח לפרטים על סשן הקלטה, מיקס ומאסטרינג',
  },
];

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

const FAQS = [
  {
    question: 'צריך ניסיון קודם באולפן כדי להקליט שיר?',
    answer:
      'בכלל לא. חלק גדול מהמגיעים אליי להקלטת שיר לאירוע או מתנה עומדים מול מיקרופון אולפני בפעם הראשונה. אנחנו מתקדמים בקצב נוח, שורה אחרי שורה אם צריך, ובסיום עורכים ומלטשים את הביצוע כך שישמע טבעי ומדויק.',
  },
  {
    question: 'איפה האולפן ממוקם והאם יש חניה?',
    answer:
      'האולפן נמצא באבן יהודה (דקות נסיעה מנתניה, רעננה, כפר סבא, הרצליה והיישובים מסביב), עם חניה נוחה ופרטית צמודה למקום.',
  },
  {
    question: 'כמה זמן מראש כדאי לתאם סשן?',
    answer:
      'כדאי לשלוח הודעה כמה ימים עד שבוע מראש כדי לתפוס שעה נוחה, ובמקרה של אירוע קרוב — כתבו לי בוואטסאפ ונבדוק זמינות מיידית.',
  },
  {
    question: 'איך קובעים ומתחילים?',
    answer:
      'פשוט כותבים לי בוואטסאפ או מתקשרים ומספרים בכמה מילים מה תרצו להקליט. אני אכוון אתכם לגבי ההכנה מראש, הזמן הנדרש והמחיר – בלי התחייבות.',
  },
];

export function InfoPage() {
  const [draftMessage, setDraftMessage] = useState('');

  useEffect(() => {
    document.title = 'deVee Studio - אולפן הקלטות באזור השרון';
  }, []);

  const handleConciergeSubmit = (e: FormEvent) => {
    e.preventDefault();
    window.open(makeWhatsappUrl(draftMessage), '_blank', 'noopener,noreferrer');
  };

  return (
    <div
      dir="rtl"
      className="relative min-h-screen bg-[#0a0807] text-white overflow-x-clip selection:bg-orange-500 selection:text-black"
      style={{ fontFamily: "'Heebo', system-ui, -apple-system, sans-serif" }}
    >
      {/* Top Overhead Orange Spotlight + Crisp Dark Architectural Grid (above the fold) */}
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          {/* Subtle square grid */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage:
                'linear-gradient(to right, rgba(255,255,255,0.6) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.6) 1px, transparent 1px)',
              backgroundSize: '56px 56px',
              maskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, black 55%, transparent 100%)',
            }}
          />
          {/* Rich centered overhead spotlight beam */}
          <div
            className="absolute -top-20 left-1/2 -translate-x-1/2 h-[38rem] w-[72rem] max-w-none"
            style={{
              background:
                'radial-gradient(ellipse 46% 62% at 50% 8%, rgba(234, 88, 12, 0.56) 0%, rgba(194, 65, 12, 0.24) 44%, rgba(10, 8, 7, 0) 76%)',
            }}
          />
          <div
            className="absolute -top-10 left-1/2 -translate-x-1/2 h-[22rem] w-[40rem] max-w-none blur-2xl opacity-75"
            style={{
              background:
                'radial-gradient(ellipse 55% 65% at 50% 10%, rgba(251, 146, 60, 0.42) 0%, transparent 72%)',
            }}
          />
        </div>

        {/* Dedicated Clean Top Bar */}
        <header className="relative z-10 container mx-auto max-w-6xl px-4 sm:px-6 pt-5 pb-3">
          <nav
            aria-label="ניווט בעמוד"
            className="flex items-center justify-between gap-4"
          >
            <a
              href="#main-content"
              className="inline-flex items-center gap-2.5 text-white hover:opacity-90 transition-opacity"
            >
              <img
                src="/favicon-48-v2.png"
                alt="deVee Studio"
                width={32}
                height={32}
                className="w-8 h-8 rounded-lg object-cover border border-white/15"
              />
              <span dir="ltr" className="text-base sm:text-lg font-extrabold tracking-tight">
                deVee <span className="text-orange-400">Studio</span>
              </span>
            </a>

            <div className="hidden md:flex items-center gap-7 text-sm text-white/80">
              <a href="#studio" className="hover:text-white transition-colors">
                האולפן
              </a>
              <a href="#services" className="hover:text-white transition-colors">
                שירותים
              </a>
              <a href="#vibe" className="hover:text-white transition-colors">
                אווירה
              </a>
              <a href="#faq" className="hover:text-white transition-colors">
                שאלות נפוצות
              </a>
            </div>

            <a
              href={makeWhatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-400/35 bg-orange-950/50 hover:bg-orange-900/60 px-4 py-2 text-xs sm:text-sm font-medium text-orange-100 backdrop-blur-md transition-colors duration-200"
            >
              <span>דברו איתי</span>
              <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            </a>
          </nav>
        </header>

        {/* Centered Spotlight Hero */}
        <section className="relative z-10 container mx-auto max-w-4xl px-4 sm:px-6 pt-12 pb-16 sm:pt-16 sm:pb-24 text-center space-y-7">
          <div className="inline-flex items-center rounded-full border border-white/15 bg-black/35 backdrop-blur-md px-4 py-1.5 text-xs sm:text-sm text-orange-100/90">
            אבן יהודה · נתניה והשרון
          </div>

          <h1 className="font-extrabold text-white tracking-tight leading-[1.1] text-[clamp(2.2rem,1.3rem+3vw,3.9rem)]">
            אולפן הקלטות והפקה
            <br />
            <span
              className="text-orange-500 font-black px-1"
              style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
            >
              בסטנדרט אחר
            </span>{' '}
            באזור השרון.
          </h1>

          <p className="text-base sm:text-lg text-white/80 leading-relaxed max-w-xl mx-auto">
            מרחב אקוסטי שקט ועבודה אישית 1 על 1 באבן יהודה – להפקות מוזיקליות, מיקס ומאסטרינג,
            וגם להקלטות שיר לאירועים ומתנות.
          </p>

          {/* Interactive Dark Glass Quick WhatsApp Concierge */}
          <form
            onSubmit={handleConciergeSubmit}
            className="max-w-xl mx-auto rounded-2xl border border-white/15 bg-black/55 backdrop-blur-xl shadow-[0_24px_75px_rgba(0,0,0,0.8)] p-3.5 sm:p-4 text-right space-y-3"
          >
            <div className="flex flex-wrap items-center justify-between gap-2 pb-1 border-b border-white/[0.08]">
              <span className="inline-flex items-center gap-2 text-xs font-medium text-orange-300">
                <SiWhatsapp className="w-3.5 h-3.5" aria-hidden="true" />
                <span>הודעה מהירה לאולפן</span>
              </span>
              <div className="flex flex-wrap items-center gap-1.5">
                {QUICK_TOPICS.map((topic) => (
                  <button
                    key={topic.label}
                    type="button"
                    onClick={() => setDraftMessage(topic.draft)}
                    className={`rounded-lg px-2.5 py-1 text-[11px] transition-colors ${
                      draftMessage === topic.draft
                        ? 'bg-orange-500/25 text-orange-200 border border-orange-500/40'
                        : 'bg-white/[0.05] text-white/65 hover:text-white border border-transparent'
                    }`}
                  >
                    {topic.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <label htmlFor="quick-whatsapp-input" className="sr-only">
                כתבו הודעה קצרה לוואטסאפ של האולפן
              </label>
              <input
                id="quick-whatsapp-input"
                type="text"
                value={draftMessage}
                onChange={(e) => setDraftMessage(e.target.value)}
                placeholder="היי, אשמח לשמוע פרטים על הקלטה באולפן..."
                className="flex-1 bg-transparent text-sm sm:text-base text-white placeholder:text-white/45 px-2 py-2 outline-none"
              />
              <button
                type="submit"
                aria-label="שלחו הודעה בוואטסאפ"
                className="shrink-0 inline-flex items-center justify-center w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-orange-500 hover:bg-orange-400 active:scale-95 text-black font-bold transition-all duration-150 shadow-[0_0_24px_rgba(249,115,22,0.4)]"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden="true" />
              </button>
            </div>
          </form>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-1">
            <a
              href={makeWhatsappUrl(draftMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border border-orange-500/35 bg-orange-950/35 hover:bg-orange-900/50 px-6 py-2.5 text-sm font-medium text-orange-100 transition-colors duration-200"
            >
              <SiWhatsapp className="w-4 h-4 text-orange-400" aria-hidden="true" />
              <span>פתיחת צ׳אט בוואטסאפ</span>
            </a>

            <a
              href="tel:+972542021618"
              className="inline-flex items-center gap-2 rounded-xl border border-white/12 bg-white/[0.03] hover:bg-white/[0.08] px-5 py-2.5 text-sm font-medium text-white/85 transition-colors duration-200"
            >
              <Phone className="w-3.5 h-3.5 text-orange-400" aria-hidden="true" />
              <span dir="ltr">054-202-1618</span>
            </a>
          </div>
        </section>
      </div>

      {/* Main Content Sections */}
      <main
        id="main-content"
        tabIndex={-1}
        className="container mx-auto max-w-5xl px-4 sm:px-6 pb-20 sm:pb-28 text-right space-y-16 sm:space-y-24"
      >
        {/* Top Real Studio Photo Showcase */}
        <section id="studio" aria-label="תמונת חדר האולפן" className="max-w-2xl mx-auto space-y-3">
          <div className="relative rounded-2xl overflow-hidden border border-white/12 bg-zinc-950 shadow-[0_24px_70px_rgba(0,0,0,0.85)]">
            <img
              src="/studio-room.jpg"
              alt="חדר הבקרה וההקלטות ב-deVee Studio באבן יהודה"
              width={1400}
              height={937}
              fetchPriority="high"
              loading="eager"
              className="w-full h-auto aspect-[1400/937] object-cover block"
            />
          </div>
          <div className="flex items-center justify-between text-xs sm:text-sm text-white/50 px-1">
            <span>חדר הבקרה וההקלטות · אבן יהודה</span>
            <span dir="ltr">deVee Studio</span>
          </div>
        </section>

        {/* Services */}
        <section id="services" aria-labelledby="services-heading" className="space-y-8">
          <div className="space-y-2">
            <h2
              id="services-heading"
              className="font-bold text-white text-[clamp(1.65rem,1.2rem+1.4vw,2.4rem)]"
            >
              מה עושים{' '}
              <span
                className="text-orange-500 font-black"
                style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
              >
                באולפן
              </span>
            </h2>
            <p className="text-sm sm:text-base text-white/65 max-w-xl">
              עבודה אישית, ממוקדת ונקייה מרעשי רקע – מהקלטת שיר במתנה ועד סינגל מוכן לשחרור.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {SERVICES.map(({ title, description, ctaLabel, whatsappText }) => (
              <article
                key={title}
                className="@container group rounded-2xl border border-white/10 bg-white/[0.025] hover:bg-white/[0.045] hover:border-orange-500/35 p-6 sm:p-7 flex flex-col justify-between gap-6 transition-all duration-200"
              >
                <div className="space-y-3">
                  <h3 className="text-xl font-bold text-white leading-snug">{title}</h3>
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

        {/* Bottom Studio Lounge Showcase */}
        <section
          id="vibe"
          aria-labelledby="atmosphere-heading"
          className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center"
        >
          <div className="lg:col-span-5">
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

          <div className="lg:col-span-7 space-y-4">
            <h2
              id="atmosphere-heading"
              className="font-bold text-white text-[clamp(1.55rem,1.15rem+1.3vw,2.2rem)]"
            >
              אווירה נינוחה,{' '}
              <span
                className="text-orange-500 font-black"
                style={{ fontFamily: "'Frank Ruhl Libre', serif" }}
              >
                בלי לחץ
              </span>
            </h2>
            <p className="text-base sm:text-lg text-white/80 leading-relaxed">
              בין אם זו הקלטה ראשונה לקראת אירוע משפחתי ובין אם זה יום עבודה על סינגל חדש –
              חשוב לי שתרגישו כאן בבית. עובדים בקצב שלכם, עם פינת ישיבה נוחה, קפה ואוזן קשבת
              לכל פרט.
            </p>
            <p className="text-sm sm:text-base text-white/75 leading-relaxed border-r-2 border-orange-500/60 pr-4">
              האולפן נמצא באבן יהודה, דקות נסיעה מנתניה, רעננה, כפר סבא והרצליה – עם חניה נוחה
              ותיאום אישי מראש.
            </p>
          </div>
        </section>

        {/* Accessible Native FAQ Accordion */}
        <section id="faq" aria-labelledby="faq-heading" className="info-faq max-w-3xl mx-auto space-y-6">
          <h2
            id="faq-heading"
            className="font-bold text-white text-center text-[clamp(1.5rem,1.15rem+1.2vw,2.1rem)]"
          >
            שאלות נפוצות
          </h2>

          <div className="space-y-3">
            {FAQS.map(({ question, answer }) => (
              <details
                key={question}
                className="rounded-2xl border border-white/10 bg-white/[0.02] open:border-orange-500/35 px-5 py-4 transition-colors"
              >
                <summary className="flex items-center gap-3 cursor-pointer text-base sm:text-lg font-semibold text-white select-none">
                  <ChevronDown
                    className="info-faq-chevron w-4 h-4 text-orange-400 shrink-0"
                    aria-hidden="true"
                  />
                  <span>{question}</span>
                </summary>
                <p className="pt-3 pr-7 text-sm sm:text-base text-white/75 leading-relaxed">
                  {answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* Bottom Spotlight Closing Card */}
        <section className="relative overflow-hidden rounded-3xl border border-orange-500/30 bg-black/70 p-7 sm:p-12 text-center space-y-6">
          <div
            className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 h-64 w-[36rem] opacity-65 blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse 60% 60% at 50% 25%, rgba(234, 88, 12, 0.35), transparent 72%)',
            }}
            aria-hidden="true"
          />

          <div className="relative z-10 space-y-2 max-w-xl mx-auto">
            <h2 className="font-extrabold text-white text-[clamp(1.6rem,1.2rem+1.4vw,2.35rem)]">
              רוצים לתאם הקלטה?
            </h2>
            <p className="text-sm sm:text-base text-white/75">
              שלחו הודעה קצרה בוואטסאפ או חייגו ונקבע שעה שנוחה לכם.
            </p>
          </div>

          <div className="relative z-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={makeWhatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2.5 bg-orange-500 hover:bg-orange-400 active:scale-[0.98] text-black font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl transition-colors duration-200 shadow-[0_0_28px_rgba(249,115,22,0.35)]"
            >
              <SiWhatsapp className="w-4 h-4 sm:w-5 sm:h-5" aria-hidden="true" />
              <span>דברו איתי בוואטסאפ</span>
            </a>

            <a
              href="tel:+972542021618"
              dir="ltr"
              className="inline-flex items-center justify-center border border-orange-500/30 bg-orange-950/30 hover:bg-orange-900/45 text-orange-100 text-sm sm:text-base px-6 py-3.5 rounded-xl transition-colors duration-200"
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
