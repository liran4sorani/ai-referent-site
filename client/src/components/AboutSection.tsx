/* =============================================================
   AboutSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   Problem statement + product vision
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

const PAIN_POINTS = [
  "מעבר בין 3–4 מערכות ועשרות טאבים לשאלה אחת",
  "כניסה מסורבלת לפורטל המבטח — VPN + SMS OTP בכל פעם",
  "קריאת אוגדני כיסוי ארוכים כדי לענות על שאלה פשוטה",
  "לקוח ממתין בטלפון בזמן שהסוכן מחפש מידע",
];

const SOLUTIONS = [
  "תשובה אחת, ממשק אחד — ללא מעבר בין מערכות",
  "גישה חיה לפורטל המבטח בסשן מאומת אחד בלבד",
  "AI שקורא אוגדן כיסויים ונספחים ומסכם את הרלוונטי",
  "תשובה מבוססת מקורות עם ציטוטים תוך שניות — בזמן שהלקוח בקו",
];

function useInView(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setInView(true); }, { threshold });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return { ref, inView };
}

export default function AboutSection() {
  const { ref, inView } = useInView();

  return (
    <section id="about" className="section-light py-24">
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
            הבעיה שפתרנו
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-navy mb-4"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            שאלה אחת של לקוח — 4 מערכות, 20 דקות
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            כשלקוח שואל "האם הפיזיותרפיה שלי מכוסה?", הסוכן צריך לעבור בין מערכות מרובות, להתחבר
            לפורטלי הפניקס, כלל ומגדל ולקרוא אוגדנים ארוכים — לפני שיכול לענות. Verra מחסלת את כל זה.
          </p>
        </div>

        {/* Before / After comparison */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {/* Before */}
          <div
            className={`rounded-2xl p-8 border-2 border-red-100 bg-red-50/50 transition-all duration-700 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
                <AlertTriangle size={20} className="text-red-500" />
              </div>
              <h3
                className="text-xl font-bold text-red-700"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                לפני Verra
              </h3>
            </div>
            <ul className="space-y-4">
              {PAIN_POINTS.map((point, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-600"
                  style={{
                    fontFamily: "Assistant, sans-serif",
                    transitionDelay: `${i * 80}ms`,
                  }}
                >
                  <span className="mt-1 w-5 h-5 rounded-full bg-red-200 flex items-center justify-center flex-shrink-0 text-red-600 text-xs font-bold">
                    ✕
                  </span>
                  {point}
                </li>
              ))}
            </ul>
          </div>

          {/* After */}
          <div
            className={`rounded-2xl p-8 border-2 bg-white transition-all duration-700 delay-200 ${
              inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
            style={{ borderColor: "oklch(0.75 0.15 75 / 0.4)" }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div
                className="w-10 h-10 rounded-full flex items-center justify-center"
                style={{ background: "oklch(0.75 0.15 75 / 0.15)" }}
              >
                <CheckCircle2 size={20} style={{ color: "oklch(0.65 0.15 75)" }} />
              </div>
              <h3
                className="text-xl font-bold text-navy"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                עם Verra
              </h3>
            </div>
            <ul className="space-y-4">
              {SOLUTIONS.map((sol, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-slate-700"
                  style={{ fontFamily: "Assistant, sans-serif" }}
                >
                  <span
                    className="mt-1 w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs font-bold"
                    style={{ background: "oklch(0.75 0.15 75 / 0.2)", color: "oklch(0.55 0.15 75)" }}
                  >
                    ✓
                  </span>
                  {sol}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Vision quote */}
        <div
          className="mt-16 max-w-3xl mx-auto text-center p-8 rounded-2xl"
          style={{ background: "oklch(0.24 0.08 265 / 0.04)", border: "1px solid oklch(0.24 0.08 265 / 0.1)" }}
        >
          <blockquote
            className="text-xl md:text-2xl font-semibold text-navy leading-relaxed"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            "עוזר AI חכם לסוכני ביטוח — עונה על שאלות כיסוי ותביעות מפורטלי הפניקס, כלל ומגדל — בעברית, בזמן אמת, עם ציטוטים מדויקים לנספח ולסעיף."
          </blockquote>
          <p className="mt-4 text-slate-500 text-sm" style={{ fontFamily: "Assistant, sans-serif" }}>
            — חזון Verra
          </p>
        </div>
      </div>
    </section>
  );
}
