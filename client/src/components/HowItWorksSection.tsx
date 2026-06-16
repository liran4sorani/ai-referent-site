/* =============================================================
   HowItWorksSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   3-phase roadmap + step-by-step flow
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { Upload, MessageSquare, CheckCircle, ArrowDown } from "lucide-react";

const STEPS = [
  {
    num: "01",
    icon: <Upload size={24} />,
    title: "העלאת מסמכי הפוליסה",
    desc: "הסוכן מעלה את אוגדן הכיסויים, נספחים ודפי פוליסה. AI Referent מאנדקס אותם אוטומטית.",
    phase: "שלב 1 — MVP",
  },
  {
    num: "02",
    icon: <MessageSquare size={24} />,
    title: "שאלה בעברית בצ'אט",
    desc: "הסוכן שואל שאלה חופשית בעברית. AI Referent מזהה את הלקוח, הפוליסה והנספח הרלוונטי.",
    phase: "בזמן אמת",
  },
  {
    num: "03",
    icon: <CheckCircle size={24} />,
    title: "תשובה מבוססת מקורות",
    desc: "תשובה ברורה עם ציטוט מדויק לנספח ולסעיף. הסוכן יכול לאמת ולהעביר ללקוח בביטחון.",
    phase: "שניות",
  },
];

const PHASES = [
  {
    num: "P0",
    title: "תשתיות — אותנטיקציה, RBAC ותשתיות מולטי-טננט",
    desc: "מונורפו, CI/CD, FastAPI, Postgres+pgvector, מידלוור RBAC+ביקורת, רישומי Connector ו-Capability ריקים.",
    status: "בפיתוח",
    statusColor: "bg-amber-100 text-amber-700",
  },
  {
    num: "P1",
    title: "אינדקסייה + RAG עם ציטוטים",
    desc: "העלאת מסמכים → פירסור PDF עברי → חתיכה → הטמעה → pgvector. שליפת נספחים עם שמירת ספאני ציטוט מדויקים.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P2",
    title: "צ'אט + יכולת כיסוי ראשונה",
    desc: "ממשק צ'אט RTL; ייבוא רשימת לקוחות CSV; קונקטורי OTP להפניקס, כלל ומגדל; תשובות מבוססות עם ציטוטים.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P3",
    title: "לולאת משוב חובה",
    desc: "דירוג / תיקון / הערה על כל תשובה; שמירת עקבות מלאה (trace); בניית קורפוס אימון.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P4",
    title: "מוכנות תביעה חיה",
    desc: "סטאטוס תביעה, היסטוריית תביעות ותנאי החזר שלופים חי מפורטל המבטח בסשן OTP. דגרדה עדינה רק כששדה חסר בפורטל.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P5",
    title: "Backoffice והרשאות",
    desc: "פאנל ניהול: טננטים, משתמשים/תפקידים, קונפיגורציית מבטחים, הגדרות מודל, סקירת משוב וייצוא קורפוס.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P6",
    title: "דף נחיתה + פיילוט",
    desc: "דף שיווקי + הרשמה לפיילוט פעיל ב-Backoffice. פיילוט סגור: כ~5 סוכנים, נתונים אמיתיים עם הסכמת לקוחות.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
  },
  {
    num: "P7",
    title: "הקשחה ועמידה רגולטורית",
    desc: "הצפנה, RLS, מדיניות שמירה, בדיקת חדירה, אישור עמידה לפני נתונים חיים בקנה גדול.",
    status: "עתידי",
    statusColor: "bg-slate-100 text-slate-600",
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
            תהליך פשוט שמחליף שעות של חיפוש בשניות של שיחה.
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
              {/* Step number */}
              <div
                className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4 text-white font-black text-lg shadow-lg"
                style={{
                  background: i === 0 ? "oklch(0.24 0.08 265)" : i === 1 ? "oklch(0.35 0.08 265)" : "oklch(0.75 0.15 75)",
                  fontFamily: "Heebo, sans-serif",
                }}
              >
                {step.num}
              </div>

              {/* Phase tag */}
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
            מפת הדרכים — P0 עד Pilot
          </h3>
          <p
            className="text-slate-500"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            8 שלבים מסודרים — תשתיות ואבטחה קודמות לפיצ'רים, כל שלב בניתן לדמו
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
                  borderColor: i === 0 ? "oklch(0.75 0.15 75 / 0.5)" : "oklch(0.9 0.005 265)",
                  transitionDelay: `${i * 100}ms`,
                  borderWidth: i === 0 ? "2px" : "1px",
                }}
              >
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div
                      className="w-12 h-12 rounded-full flex items-center justify-center font-black text-white text-xs flex-shrink-0"
                      style={{
                        background: i === 0 ? "oklch(0.24 0.08 265)" : i < 3 ? "oklch(0.65 0.12 75)" : "oklch(0.7 0.01 265)",
                        fontFamily: "Heebo, sans-serif",
                      }}
                    >
                      {phase.num}
                    </div>
                    <div>
                      <h4
                        className="font-bold text-navy"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        {phase.title}
                      </h4>
                      <p
                        className="text-slate-500 text-sm"
                        style={{ fontFamily: "Assistant, sans-serif" }}
                      >
                        {phase.desc}
                      </p>
                    </div>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${phase.statusColor}`}
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    {phase.status}
                  </span>
                </div>
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
