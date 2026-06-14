/* =============================================================
   FeaturesSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   6 feature cards with icons and descriptions
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { MessageSquare, FileSearch, ShieldCheck, ThumbsUp, Lock, Zap } from "lucide-react";

const FEATURES = [
  {
    icon: <MessageSquare size={28} />,
    title: "שיחה בעברית — RTL מושלם",
    desc: "ממשק צ'אט בעברית מלאה, כתיבה מימין לשמאל, מותאם לשימוש בזמן שיחה עם לקוח.",
    img: "/manus-storage/feature_chat_5e7e922d.png",
    tag: "FR-1",
  },
  {
    icon: <FileSearch size={28} />,
    title: "תשובות מבוססות פוליסה",
    desc: "כל תשובה מגובה במקורות — נספח ספציפי, סעיף, שדה בפורטל. הסוכן יכול לאמת לפני שמייעץ.",
    img: "/manus-storage/feature_docs_f68ecc9d.png",
    tag: "FR-3, FR-4",
  },
  {
    icon: <ShieldCheck size={28} />,
    title: "מוכנות לתביעה",
    desc: "מה מכוסה, אילו מסמכים נדרשים, האם נדרשת הפניה מראש, ומה סטטוס התביעה הנוכחית.",
    img: "/manus-storage/feature_shield_e9bfc3be.png",
    tag: "FR-5",
  },
  {
    icon: <ThumbsUp size={28} />,
    title: "לולאת משוב ושיפור",
    desc: "כל תשובה ניתנת לדירוג, תיקון והערה. המשוב מזין את מנגנון השיפור המתמיד של ה-AI.",
    img: null,
    tag: "FR-7–FR-10",
  },
  {
    icon: <Lock size={28} />,
    title: "אבטחה ופרטיות",
    desc: "הצפנה בתעבורה ובאחסון, בקרת גישה, רישום ביקורת. מותאם לרגולציית ביטוח ישראלית.",
    img: null,
    tag: "NFR",
  },
  {
    icon: <Zap size={28} />,
    title: "מהיר — בזמן שהלקוח בקו",
    desc: "זמן תגובה של שניות לתשובה מבוססת מסמכים. מתוכנן לשימוש בזמן אמת בשיחה.",
    img: null,
    tag: "NFR",
  },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function FeaturesSection() {
  const { ref, inView } = useInView();

  return (
    <section id="features" className="section-muted py-24">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-16">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "oklch(0.24 0.08 265 / 0.08)",
              color: "oklch(0.24 0.08 265)",
              fontFamily: "Heebo, sans-serif",
            }}
          >
            יכולות המוצר
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-navy mb-4"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            כל מה שסוכן ביטוח צריך — במקום אחד
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            AI Referent MVP מתחיל עם יכולות הליבה ומתרחב בהדרגה. כל יכולת נבנית על בסיס משוב אמיתי מסוכנים.
          </p>
        </div>

        {/* Feature cards grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, i) => (
            <div
              key={i}
              className={`card-feature card-gold-border p-6 transition-all duration-700 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              {/* Icon */}
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "oklch(0.24 0.08 265 / 0.08)", color: "oklch(0.24 0.08 265)" }}
              >
                {feature.img ? (
                  <img src={feature.img} alt={feature.title} className="w-8 h-8 object-contain" />
                ) : (
                  feature.icon
                )}
              </div>

              {/* Tag */}
              <span
                className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-mono"
                style={{
                  background: "oklch(0.75 0.15 75 / 0.12)",
                  color: "oklch(0.55 0.15 75)",
                }}
              >
                {feature.tag}
              </span>

              <h3
                className="text-lg font-bold text-navy mb-2"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                {feature.title}
              </h3>
              <p
                className="text-slate-500 text-sm leading-relaxed"
                style={{ fontFamily: "Assistant, sans-serif" }}
              >
                {feature.desc}
              </p>
            </div>
          ))}
        </div>

        {/* MVP scope note */}
        <div
          className="mt-12 p-6 rounded-2xl text-center"
          style={{
            background: "oklch(0.24 0.08 265 / 0.04)",
            border: "1px dashed oklch(0.24 0.08 265 / 0.2)",
          }}
        >
          <p
            className="text-slate-600 text-sm"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            <strong className="text-navy">MVP — הפניקס בלבד.</strong>{" "}
            הארכיטקטורה תומכת בהוספת מבטחים נוספים (כלל, מגדל, הראל, מנורה) כ-connectors עצמאיים — ללא שינוי מחדש.
          </p>
        </div>
      </div>
    </section>
  );
}
