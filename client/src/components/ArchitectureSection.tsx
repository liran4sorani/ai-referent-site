/* =============================================================
   ArchitectureSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   Tech stack, architecture overview and key decisions
   ============================================================= */

import { useEffect, useRef, useState } from "react";
import { Server, Database, Cpu, Shield, GitBranch, Layers } from "lucide-react";

const STACK = [
  {
    icon: <Cpu size={22} />,
    layer: "Frontend",
    tech: "React + TypeScript",
    detail: "RTL-first, Vite, ממשק צ'אט + Backoffice + דף נחיתה",
  },
  {
    icon: <Server size={22} />,
    layer: "Backend",
    tech: "FastAPI (Python 3.12)",
    detail: "API Gateway, RBAC middleware, audit, tenant scoping",
  },
  {
    icon: <Cpu size={22} />,
    layer: "LLM",
    tech: "Claude (Anthropic)",
    detail: "Sonnet על הנתיב החם, Opus לתשובות מורכבות — הגדרה ב-Backoffice",
  },
  {
    icon: <Database size={22} />,
    layer: "Vector / RAG",
    tech: "pgvector + Postgres",
    detail: "מאגר אחד, RLS לבידוד טנאנטים, ממשק VectorStore להחלפה עתידית",
  },
  {
    icon: <GitBranch size={22} />,
    layer: "Connectors",
    tech: "הפניקס · כלל · מגדל",
    detail: "כל מבטח הוא קונקטור עצמאי מאחורי ממשק משותף — OTP בשלב A",
  },
  {
    icon: <Shield size={22} />,
    layer: "Infra",
    tech: "GCP + Docker + Terraform",
    detail: "קונטיינרים, IaC, KMS, CI/CD עם סריקת סודות",
  },
];

const DECISIONS = [
  { id: "D-1", title: "Multi-tenant + RBAC מ-P0", desc: "בנוי מהיום הראשון — לא מוסיפים אחר כך" },
  { id: "D-2", title: "pgvector ב-Postgres", desc: "מאגר אחד, RLS קל, ממשק VectorStore להחלפה" },
  { id: "D-3", title: "Claude כ-LLM", desc: "עברית חזקה, tool-use לשכבת Capability, שליטה בלייטנסי" },
  { id: "D-4", title: "OTP agent-in-the-loop", desc: "נתונים חיים ואמינים; אנושי בלולאת האימות" },
  { id: "D-5", title: "GCP כ-Cloud", desc: "מיישר עם PRD §13, IaC שומר גמישות" },
  { id: "D-6", title: "סטאטוס תביעה ב-v1", desc: "שלוף חי מהפורטל; דגרדה רק כששדה חסר" },
  { id: "D-7", title: "CSV onboarding ללקוחות", desc: "ייבוא חד-פעמי — ללא CRM, ללא תלויות חיצוניות" },
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
  const { ref: stackRef, inView: stackInView } = useInView();
  const { ref: decisionsRef, inView: decisionsInView } = useInView();

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
            ארכיטקטורה וטכנולוגיה
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
            שלוש תפרי הרחבה מובנים: Connector (מבטחים), Capability (תהליכים), Backoffice (הרשאות). הוספת מבטח חדש היא הגדרה — לא ריאקיטקטורה.
          </p>
        </div>

        {/* Stack table */}
        <div ref={stackRef} className="max-w-4xl mx-auto mb-16">
          <h3
            className="text-xl font-bold text-navy mb-6 text-center"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            מחסנית הטכנולוגיה
          </h3>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-slate-100">
            {STACK.map((item, i) => (
              <div
                key={i}
                className={`flex items-center gap-4 px-6 py-4 transition-all duration-700 ${
                  stackInView ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"
                } ${i % 2 === 0 ? "bg-white" : "bg-slate-50/60"}`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: "oklch(0.24 0.08 265 / 0.08)", color: "oklch(0.24 0.08 265)" }}
                >
                  {item.icon}
                </div>
                <div className="w-28 flex-shrink-0">
                  <span
                    className="text-xs font-semibold text-slate-400 uppercase tracking-wide"
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    {item.layer}
                  </span>
                </div>
                <div className="flex-1">
                  <span
                    className="font-bold text-navy text-sm"
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    {item.tech}
                  </span>
                  <span
                    className="text-slate-500 text-sm mr-2"
                    style={{ fontFamily: "Assistant, sans-serif" }}
                  >
                    — {item.detail}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Key decisions */}
        <div>
          <h3
            className="text-xl font-bold text-navy mb-6 text-center"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            החלטות מפתח — נעולות (יוני 2026)
          </h3>
          <div ref={decisionsRef} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            {DECISIONS.map((d, i) => (
              <div
                key={i}
                className={`bg-white rounded-xl p-5 shadow-sm border border-slate-100 transition-all duration-700 ${
                  decisionsInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${i * 60}ms` }}
              >
                <div className="flex items-center gap-2 mb-2">
                  <span
                    className="text-xs font-mono px-2 py-0.5 rounded-full"
                    style={{
                      background: "oklch(0.75 0.15 75 / 0.12)",
                      color: "oklch(0.55 0.15 75)",
                    }}
                  >
                    {d.id}
                  </span>
                  <span
                    className="font-bold text-navy text-sm"
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    {d.title}
                  </span>
                </div>
                <p
                  className="text-slate-500 text-sm leading-relaxed"
                  style={{ fontFamily: "Assistant, sans-serif" }}
                >
                  {d.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Architecture diagram note */}
        <div
          className="mt-12 max-w-3xl mx-auto p-6 rounded-2xl text-center"
          style={{
            background: "oklch(0.24 0.08 265 / 0.04)",
            border: "1px dashed oklch(0.24 0.08 265 / 0.2)",
          }}
        >
          <Layers size={28} className="mx-auto mb-3" style={{ color: "oklch(0.24 0.08 265 / 0.5)" }} />
          <p
            className="text-slate-600 text-sm leading-relaxed"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            <strong className="text-navy">שכבת Capability:</strong> כל תהליך (כיסוי, תביעה, חידוש) הוא מודול עצמאי שנרשם ב-Capability Registry.{" "}
            <strong className="text-navy">שכבת Connector:</strong> כל מבטח נרשם ב-Connector Registry מאחורי ממשק משותף — data path (OTP / API) הוא פרט פנימי.{" "}
            הוספת מבטח #4 = מימוש הממשק + רישום + הפעלה ב-Backoffice.
          </p>
        </div>
      </div>
    </section>
  );
}
