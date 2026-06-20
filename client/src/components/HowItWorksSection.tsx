/* =============================================================
   HowItWorksSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   3-step flow + 3-phase strategic roadmap
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { MessageSquare, CheckCircle, ArrowDown, Zap, Users, Bot } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: <Zap size={24} />,
    title: "שאלה חופשית בעברית",
    desc: "הסוכן שואל שאלה בשפה טבעית — Verra מזהה את הלקוח, מתחברת לפורטל המבטח בזמן אמת ושולפת את הנתונים הרלוונטיים.",
    phase: "ללא העלאת מסמכים",
  },
  {
    num: "02",
    icon: <MessageSquare size={24} />,
    title: "AI מנתח ומסכם",
    desc: "הסוכן מקבל תשובה ברורה עם ציטוט מדויק לנספח ולסעיף — ישירות מהפורטל, בעברית, בשניות.",
    phase: "בזמן אמת",
  },
  {
    num: "03",
    icon: <CheckCircle size={24} />,
    title: "תשובה מבוססת מקורות",
    desc: "הסוכן מאמת ומעביר ללקוח בביטחון. כל תשובה מגובה בציטוט — אפס ניחושים, אפס טעויות.",
    phase: "שניות",
  },
];

const PHASES = [
  {
    num: "שלב 1",
    icon: <Zap size={20} />,
    title: "הרפרנט הוירטואלי — MVP",
    desc: "AI שעונה על שאלות כיסוי, תביעות ופוליסה ישירות מפורטלי הפניקס, כלל ומגדל — ללא העלאת מסמכים. הסוכן שואל בעברית, מקבל תשובה מבוססת מקורות תוך שניות. כולל backoffice, RBAC ולולאת משוב לשיפור מתמיד.",
    status: "בפיתוח",
    statusColor: "bg-amber-100 text-amber-700",
    borderHighlight: true,
    items: [
      "חיבור חי לפורטלי הפניקס · כלל · מגדל",
      "צ'אט RTL עם ציטוטים מדויקים",
      "ייבוא לקוחות CSV + מיפוי פוליסות",
      "Backoffice + RBAC + לולאת משוב",
      "פיילוט סגור עם ~5 סוכנים",
    ],
  },
  {
    num: "שלב 2",
    icon: <Users size={20} />,
    title: "הרפרנט המלא — מסמכים ופורטלים נוספים",
    desc: "הרחבת היכולת לטיפול ישיר במסמכי פוליסה (PDF), הוספת מבטחים נוספים, וניהול שיחות מורכבות עם לקוחות — הסוכן מקבל סיכום בלבד בנקודות החלטה קריטיות.",
    status: "מתוכנן",
    statusColor: "bg-blue-100 text-blue-700",
    borderHighlight: false,
    items: [
      "קריאת מסמכי PDF ישירות ללא העלאה ידנית",
      "חיבור למבטחים נוספים",
      "ניהול שיחות לקוח ישירות על ידי ה-AI",
      "התראות חכמות לסוכן בנקודות החלטה בלבד",
    ],
  },
  {
    num: "שלב 3",
    icon: <Bot size={20} />,
    title: "הסוכן האוטונומי — פינוי עומס מלא",
    desc: "ה-AI מנהל את כל השגרה היומיומית — שאלות כיסוי, עדכוני תביעות, חידושים — ומדווח לסוכן רק על הזדמנויות מכירה חדשות ואירועים קריטיים. הסוכן מתפנה לגיוס לקוחות חדשים.",
    status: "חזון",
    statusColor: "bg-purple-100 text-purple-700",
    borderHighlight: false,
    items: [
      "ניהול אוטונומי של שגרת שירות לקוחות",
      "התראה לסוכן רק על: מכירה פוטנציאלית, בעיה קריטית, חידוש",
      "מדדי ביצוע ותובנות עסקיות בזמן אמת",
      "פינוי מלא לסוכן — פוקוס על הכנסה חדשה",
    ],
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

export default function HowItWorksSection() {
  const { ref: stepsRef, inView: stepsInView } = useInView();
  const { ref: phasesRef, inView: phasesInView } = useInView();

  return (
    <section id="how-it-works" className="section-muted py-24">
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
            איך זה עובד
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-navy mb-4"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            שלושה צעדים לתשובה
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            ללא העלאת מסמכים, ללא כניסה לפורטל — Verra מתחברת ישירות ועונה בשניות.
          </p>
        </div>

        {/* Steps */}
        <div ref={stepsRef} className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20 relative">
          {/* Connector line (desktop) */}
          <div
            className="hidden md:block absolute top-12 right-[16.67%] left-[16.67%] h-0.5 z-0"
            style={{ background: "linear-gradient(to left, oklch(0.75 0.15 75), oklch(0.24 0.08 265))" }}
          />

          {STEPS.map((step, i) => (
            <div
              key={i}
              className={`relative z-10 bg-white rounded-2xl p-6 text-center shadow-md transition-all duration-700 ${
                stepsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${i * 120}ms` }}
            >
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-lg shadow-lg"
                style={{
                  background: i === 0 ? "oklch(0.24 0.08 265)" : i === 1 ? "oklch(0.35 0.08 265)" : "oklch(0.75 0.15 75)",
                  fontFamily: "Heebo, sans-serif",
                }}
              >
                {step.num}
              </div>
              <span
                className="inline-block text-xs px-2 py-0.5 rounded-full mb-3 font-medium"
                style={{
                  background: "oklch(0.75 0.15 75 / 0.12)",
                  color: "oklch(0.55 0.15 75)",
                  fontFamily: "Heebo, sans-serif",
                }}
              >
                {step.phase}
              </span>
              <h3
                className="text-lg font-bold text-navy mb-2"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                {step.title}
              </h3>
              <p
                className="text-slate-500 text-sm leading-relaxed"
                style={{ fontFamily: "Assistant, sans-serif" }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Roadmap */}
        <div className="text-center mb-10">
          <h3
            className="text-2xl font-black text-navy mb-2"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            מפת הדרכים — 3 שלבים אסטרטגיים
          </h3>
          <p
            className="text-slate-500"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            מ-MVP שמחליף את הרפרנט האנושי — עד לסוכן אוטונומי שמפנה את הסוכן לגיוס לקוחות חדשים
          </p>
        </div>

        <div ref={phasesRef} className="max-w-3xl mx-auto space-y-4">
          {PHASES.map((phase, i) => (
            <div key={i}>
              <div
                className={`bg-white rounded-2xl p-6 shadow-sm border transition-all duration-700 ${
                  phasesInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                }`}
                style={{
                  borderColor: phase.borderHighlight ? "oklch(0.75 0.15 75 / 0.5)" : "oklch(0.9 0.005 265)",
                  transitionDelay: `${i * 120}ms`,
                  borderWidth: phase.borderHighlight ? "2px" : "1px",
                }}
              >
                <div className="flex items-start justify-between flex-wrap gap-4 mb-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center text-white flex-shrink-0"
                      style={{
                        background: i === 0
                          ? "oklch(0.24 0.08 265)"
                          : i === 1
                          ? "oklch(0.45 0.12 265)"
                          : "oklch(0.55 0.18 290)",
                      }}
                    >
                      {phase.icon}
                    </div>
                    <div>
                      <div
                        className="text-xs font-semibold mb-0.5"
                        style={{ color: "oklch(0.75 0.15 75)", fontFamily: "Heebo, sans-serif" }}
                      >
                        {phase.num}
                      </div>
                      <h4
                        className="font-bold text-navy text-lg"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        {phase.title}
                      </h4>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${phase.statusColor}`}
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    {phase.status}
                  </span>
                </div>

                <p
                  className="text-slate-500 text-sm leading-relaxed mb-4"
                  style={{ fontFamily: "Assistant, sans-serif" }}
                >
                  {phase.desc}
                </p>

                <ul className="space-y-1.5">
                  {phase.items.map((item, j) => (
                    <li key={j} className="flex items-center gap-2 text-sm text-slate-600" style={{ fontFamily: "Assistant, sans-serif" }}>
                      <span
                        className="w-1.5 h-1.5 rounded-full flex-shrink-0"
                        style={{ background: i === 0 ? "oklch(0.75 0.15 75)" : i === 1 ? "oklch(0.45 0.12 265)" : "oklch(0.55 0.18 290)" }}
                      />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              {i < PHASES.length - 1 && (
                <div className="flex justify-center my-2 text-slate-300">
                  <ArrowDown size={20} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
