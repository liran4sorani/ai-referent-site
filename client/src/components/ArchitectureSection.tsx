/* =============================================================
   ArchitectureSection — Verra
   Design: Trust Architecture | RTL Hebrew
   Unique approach — no tech stack revealed
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { Search, MessageSquare, Database, Zap, Shield, Layers } from "lucide-react";

const PILLARS = [
  {
    icon: <Database size={24} />,
    title: "אחסון חכם של מסמכי ביטוח",
    desc: "פיתחנו שיטה ייחודית לאחסון מסמכי פוליסה, תנאים ונספחים בצורה שמאפשרת אחזור מהיר ומדויק — גם כשמדובר במאות אלפי עמודים.",
  },
  {
    icon: <Search size={24} />,
    title: "חיפוש סמנטי בעברית",
    desc: "הטמענו טכניקות חיפוש מתקדמות שמבינות את הכוונה מאחורי השאלה — לא רק מילות מפתח. Verra מוצאת את המידע הנכון גם כשהשאלה מנוסחת בצורה חופשית.",
  },
  {
    icon: <MessageSquare size={24} />,
    title: "שיחה טבעית בעברית",
    desc: "הכלי מדבר עברית כשפת אם — כולל ניסוחים מקצועיים מעולם הביטוח, ראשי תיבות, ומונחים ייחודיים לשוק הישראלי.",
  },
  {
    icon: <Zap size={24} />,
    title: "תשובה תוך שניות",
    desc: "הארכיטקטורה שלנו מותאמת לזמן תגובה מינימלי — הסוכן מקבל תשובה מבוססת מקורות לפני שהלקוח סיים לנשום.",
  },
  {
    icon: <Shield size={24} />,
    title: "בידוד מלא בין סוכנויות",
    desc: "כל סוכנות עובדת בסביבה מבודדת לחלוטין. המידע שלך לא נגיש לאף גורם אחר — לא לסוכנות מתחרה ולא לנו.",
  },
  {
    icon: <Layers size={24} />,
    title: "מתרחב עם כל מבטח חדש",
    desc: "הוספת מבטח חדש למערכת היא עניין של הגדרה — לא פיתוח מחדש. בנינו את הכלי כך שיגדל איתך.",
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

export default function ArchitectureSection() {
  const { ref, inView } = useInView();

  return (
    <section id="architecture" className="section-light py-24">
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
            הטכנולוגיה שמאחורי Verra
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-navy mb-4"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            בנוי להתרחב — לא להיבנות מחדש
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            פיתחנו מספר טכניקות ייחודיות לאחסון, חיפוש ושאילתה בשפה טבעית של כמויות עצומות של נתוני ביטוח בעברית — כך שהתשובה תמיד מדויקת, מהירה ומבוססת מקורות.
          </p>
        </div>

        {/* Pillars grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
          {PILLARS.map((pillar, i) => (
            <div
              key={i}
              className={`bg-white rounded-2xl p-6 shadow-sm border border-slate-100 transition-all duration-700 hover:shadow-md hover:-translate-y-1 ${
                inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 80}ms` }}
            >
              <div
                className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                style={{ background: "oklch(0.24 0.08 265 / 0.08)", color: "oklch(0.24 0.08 265)" }}
              >
                {pillar.icon}
              </div>
              <h3
                className="font-black text-navy text-base mb-2"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                {pillar.title}
              </h3>
              <p
                className="text-slate-500 text-sm leading-relaxed"
                style={{ fontFamily: "Assistant, sans-serif" }}
              >
                {pillar.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom note */}
        <div
          className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl text-center"
          style={{
            background: "oklch(0.24 0.08 265 / 0.04)",
            border: "1px dashed oklch(0.24 0.08 265 / 0.2)",
          }}
        >
          <p
            className="text-slate-600 text-sm leading-relaxed"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            <strong className="text-navy">הגישה שלנו שונה:</strong> במקום לחפש מילות מפתח, Verra <strong className="text-navy">מבינה את השאלה</strong> — ומחזירה תשובה מדויקת עם ציטוט מהפוליסה. כל תשובה מגובה במקור, בזמן אמת.
          </p>
        </div>
      </div>
    </section>
  );
}
