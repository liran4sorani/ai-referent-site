/* =============================================================
   ContactSection — Verra
   Design: Scarcity + exclusivity | RTL Hebrew
   First 10 pilots get special benefits
   ============================================================= */

import { useState } from "react";
import { ArrowLeft, CheckCircle2, Mail, Zap, Gift, Users, Star } from "lucide-react";
import { trpc } from "@/lib/trpc";

type FormState = "idle" | "submitting" | "success" | "error";

const PILOT_SPOTS_TOTAL = 10;
const PILOT_SPOTS_LEFT = 7; // update manually as spots fill

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({ name: "", email: "", role: "" });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setFormState("success"),
    onError: (err) => {
      setErrorMsg(err.message || "שגיאה בשליחה. נסה שוב.");
      setFormState("error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");
    submitContact.mutate({ name: form.name, email: form.email, role: form.role || undefined });
  };

  const spotsPercent = Math.round(((PILOT_SPOTS_TOTAL - PILOT_SPOTS_LEFT) / PILOT_SPOTS_TOTAL) * 100);

  return (
    <section id="contact" className="py-24 relative overflow-hidden" style={{ background: "oklch(0.14 0.06 265)" }}>
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] opacity-20 rounded-full"
          style={{ background: "radial-gradient(ellipse, oklch(0.75 0.15 75), transparent 70%)" }}
        />
      </div>

      <div className="container relative z-10">
        {/* Section header */}
        <div className="text-center mb-14">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold mb-5"
            style={{
              background: "rgba(245,166,35,0.15)",
              border: "1px solid rgba(245,166,35,0.4)",
              color: "oklch(0.85 0.15 75)",
              fontFamily: "Heebo, sans-serif",
            }}
          >
            <Zap size={14} fill="currentColor" />
            גישה מוקדמת — מקומות מוגבלים
          </div>
          <h2
            className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            10 הסוכנים הראשונים
            <br />
            <span className="text-gradient">מקבלים יתרון בלעדי</span>
          </h2>
          <p
            className="text-white/65 text-lg max-w-xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            הצטרפו לקבוצת הפיילוט הסגורה של Verra — ותעצבו את הכלי שישנה את אופן עבודתכם.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start max-w-5xl mx-auto">

          {/* Left: Benefits + scarcity */}
          <div className="space-y-6">

            {/* Spots counter */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-white font-bold text-sm" style={{ fontFamily: "Heebo, sans-serif" }}>
                  מקומות שנותרו בפיילוט
                </span>
                <span
                  className="text-2xl font-black"
                  style={{ color: "oklch(0.85 0.15 75)", fontFamily: "Heebo, sans-serif" }}
                >
                  {PILOT_SPOTS_LEFT} / {PILOT_SPOTS_TOTAL}
                </span>
              </div>
              {/* Progress bar */}
              <div className="w-full h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.1)" }}>
                <div
                  className="h-2.5 rounded-full transition-all"
                  style={{
                    width: `${spotsPercent}%`,
                    background: "linear-gradient(90deg, oklch(0.75 0.15 75), oklch(0.65 0.2 50))",
                  }}
                />
              </div>
              <p className="text-white/50 text-xs mt-2" style={{ fontFamily: "Assistant, sans-serif" }}>
                {PILOT_SPOTS_TOTAL - PILOT_SPOTS_LEFT} מתוך {PILOT_SPOTS_TOTAL} מקומות נלקחו
              </p>
            </div>

            {/* Exclusive benefits for first 10 */}
            <div
              className="rounded-2xl p-6"
              style={{ background: "rgba(245,166,35,0.08)", border: "1px solid rgba(245,166,35,0.25)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Gift size={18} style={{ color: "oklch(0.85 0.15 75)" }} />
                <span
                  className="font-black text-base"
                  style={{ color: "oklch(0.85 0.15 75)", fontFamily: "Heebo, sans-serif" }}
                >
                  מה מקבלים 10 הראשונים?
                </span>
              </div>
              <div className="space-y-3">
                {[
                  { icon: Star, text: "גישה חינמית לכל תקופת הפיילוט" },
                  { icon: Users, text: "השפעה ישירה על פיתוח המוצר" },
                  { icon: Zap, text: "הטמעה אישית ותמיכה 1-על-1 מהצוות" },
                  { icon: Gift, text: "מחיר מייסדים מיוחד בהשקה הרשמית" },
                ].map(({ icon: Icon, text }, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div
                      className="w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0"
                      style={{ background: "rgba(245,166,35,0.2)" }}
                    >
                      <Icon size={13} style={{ color: "oklch(0.85 0.15 75)" }} />
                    </div>
                    <span className="text-white/80 text-sm" style={{ fontFamily: "Assistant, sans-serif" }}>
                      {text}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* App live badge */}
            <a
              href="https://app.askverra.ai/app/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 group rounded-2xl p-4 transition-all hover:scale-[1.02]"
              style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)", textDecoration: "none" }}
            >
              <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div className="flex-1">
                <p className="text-green-300 font-bold text-sm" style={{ fontFamily: "Heebo, sans-serif" }}>
                  האפליקציה כבר חיה ועובדת
                </p>
                <p className="text-white/50 text-xs" style={{ fontFamily: "Assistant, sans-serif" }}>
                  לחצו לצפייה ב-app.askverra.ai
                </p>
              </div>
              <ArrowLeft size={16} className="text-green-400 group-hover:-translate-x-1 transition-transform" />
            </a>

            {/* Contact */}
            <a
              href="mailto:info@askverra.ai"
              className="flex items-center gap-3 text-white/50 hover:text-white/80 transition-colors"
            >
              <Mail size={15} />
              <span className="text-sm" style={{ fontFamily: "Assistant, sans-serif" }}>info@askverra.ai</span>
            </a>
          </div>

          {/* Right: Form */}
          <div>
            <div
              className="rounded-2xl p-8"
              style={{
                background: "rgba(255,255,255,0.04)",
                border: "1px solid rgba(255,255,255,0.12)",
                backdropFilter: "blur(12px)",
              }}
            >
              {formState === "success" ? (
                /* ── Success state ── */
                <div className="text-center py-6">
                  <div
                    className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-5"
                    style={{ background: "rgba(245,166,35,0.15)", border: "2px solid rgba(245,166,35,0.4)" }}
                  >
                    <CheckCircle2 size={36} style={{ color: "oklch(0.85 0.15 75)" }} />
                  </div>
                  <h3
                    className="text-2xl font-black text-white mb-3"
                    style={{ fontFamily: "Heebo, sans-serif" }}
                  >
                    🎉 ברוכים הבאים לפיילוט!
                  </h3>
                  <p
                    className="text-white/70 mb-6 leading-relaxed"
                    style={{ fontFamily: "Assistant, sans-serif" }}
                  >
                    קיבלנו את הבקשה שלך. ניצור איתך קשר תוך <strong className="text-white">24 שעות</strong> עם קישור גישה אישי לאפליקציה.
                  </p>
                  <a
                    href="https://app.askverra.ai/app/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all hover:scale-105"
                    style={{
                      background: "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.65 0.2 50))",
                      color: "oklch(0.15 0.05 265)",
                      fontFamily: "Heebo, sans-serif",
                      textDecoration: "none",
                    }}
                  >
                    <Zap size={15} fill="currentColor" />
                    בינתיים — צפו באפליקציה
                    <ArrowLeft size={15} />
                  </a>
                  <p className="text-white/30 text-xs mt-4" style={{ fontFamily: "Assistant, sans-serif" }}>
                    לא קיבלתם אימייל? בדקו ספאם או כתבו ל-info@askverra.ai
                  </p>
                </div>
              ) : (
                /* ── Form state ── */
                <>
                  <div className="mb-6">
                    <h3
                      className="text-xl font-black text-white mb-1"
                      style={{ fontFamily: "Heebo, sans-serif" }}
                    >
                      הגישו בקשה לגישה
                    </h3>
                    <p className="text-white/50 text-sm" style={{ fontFamily: "Assistant, sans-serif" }}>
                      פחות מ-60 שניות. נחזור אליכם תוך יום עסקים.
                    </p>
                  </div>

                  <form onSubmit={handleSubmit} className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-white/70 mb-1.5"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        שם מלא *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="ישראל ישראלי"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          direction: "rtl",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "white",
                        }}
                        onFocus={e => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-white/70 mb-1.5"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        אימייל *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="israel@example.com"
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          direction: "ltr",
                          textAlign: "right",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: "white",
                        }}
                        onFocus={e => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                      />
                    </div>

                    {/* Role */}
                    <div>
                      <label
                        className="block text-sm font-semibold text-white/70 mb-1.5"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        תפקיד
                      </label>
                      <select
                        name="role"
                        value={form.role}
                        onChange={handleChange}
                        className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          direction: "rtl",
                          background: "rgba(255,255,255,0.07)",
                          border: "1px solid rgba(255,255,255,0.15)",
                          color: form.role ? "white" : "rgba(255,255,255,0.4)",
                        }}
                        onFocus={e => (e.target.style.borderColor = "oklch(0.75 0.15 75)")}
                        onBlur={e => (e.target.style.borderColor = "rgba(255,255,255,0.15)")}
                      >
                        <option value="" style={{ background: "#1a2744" }}>בחר תפקיד...</option>
                        <option value="agent" style={{ background: "#1a2744" }}>סוכן ביטוח עצמאי</option>
                        <option value="agency_owner" style={{ background: "#1a2744" }}>בעלים / מנהל סוכנות</option>
                        <option value="employee" style={{ background: "#1a2744" }}>עובד סוכנות</option>
                        <option value="consultant" style={{ background: "#1a2744" }}>יועץ ביטוח</option>
                        <option value="other" style={{ background: "#1a2744" }}>אחר</option>
                      </select>
                    </div>

                    {/* Error */}
                    {formState === "error" && (
                      <p className="text-red-400 text-sm text-center" style={{ fontFamily: "Assistant, sans-serif" }}>
                        {errorMsg || "שגיאה בשליחה. נסה שוב."}
                      </p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={formState === "submitting"}
                      className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-black text-base transition-all hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60"
                      style={{
                        background: "linear-gradient(135deg, oklch(0.75 0.15 75), oklch(0.65 0.2 50))",
                        color: "oklch(0.15 0.05 265)",
                        fontFamily: "Heebo, sans-serif",
                      }}
                    >
                      {formState === "submitting" ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          שולח...
                        </>
                      ) : (
                        <>
                          אני רוצה להצטרף לפיילוט
                          <ArrowLeft size={17} />
                        </>
                      )}
                    </button>

                    <p className="text-white/30 text-xs text-center" style={{ fontFamily: "Assistant, sans-serif" }}>
                      הפרטים שלך מוגנים ולא יועברו לצד שלישי
                    </p>
                  </form>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
