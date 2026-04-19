import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

export function InfoPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Header />
      <main className="container mx-auto px-4 sm:px-6 py-16 sm:py-24 md:py-32">
        <div className="max-w-4xl mx-auto">
          {/* Hebrew Section */}
          <section dir="rtl" className="text-right space-y-6">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              אולפן הקלטות והפקה מוזיקלית – deVee
            </h1>
            <div className="text-lg sm:text-xl text-white/90 leading-relaxed space-y-4">
              <p>
                <strong>ברוכים הבאים ל-deVee.</strong> יצרנו עבורכם <strong>אולפן הקלטות</strong> יוצא דופן, המהווה בית חם ליצירה וחדשנות מוזיקלית. המקום נבנה מתוך חזון לשלב אקוסטיקה מדויקת שתוכננה בקפידה יחד עם ציוד קצה מהשורה הראשונה בעולם, וכל זאת כדי להעניק לכם סאונד עשיר של הפקות בינלאומיות כבר מהרגע הראשון.
              </p>
              <p>
                בתעשיית המוזיקה המודרנית, תהליך של <strong>הקלטת שיר</strong> הוא הרבה מעבר ללכידת צליל; זוהי מלאכת מחשבת שדורשת דיוק טכני, הבנה מוזיקלית עמוקה וסביבת עבודה שמעוררת השראה אמיתית. בין אם המטרה שעומדת לנגד עיניכם היא <strong>הקלטת שיר</strong> מקורי שכתבתם למגירה, ביצוע סשן שירה מדויק ומרגש, או הפקה מוזיקלית מלאה הכוללת עיבוד ומיקס – ב-deVee אנחנו לא מתפשרים על איכות התוצאה.
              </p>
              <p>
                העבודה בתוך <strong>אולפן הקלטות</strong> מקצועי מאפשרת לכם להתנתק מרעשי הרקע ולהתרכז בדבר החשוב ביותר: המוזיקה שלכם. אנו מאמינים שכל אומן שמגיע אלינו לצורך <strong>הקלטת שיר</strong> ראוי ליחס אישי ולתנאים האופטימליים ביותר. לכן, אנחנו מזמינים אתכם ליצור בסביבה יוקרתית שתוכננה עבור אומנים ויוצרים שמחפשים את הטוב ביותר, עם ליווי מקצועי צמוד שיהפוך כל רגע בתוך <strong>אולפן הקלטות</strong> לחוויה מעצימה וכל הפקה ליצירת אמנות ברמה הגבוהה ביותר.
              </p>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}
