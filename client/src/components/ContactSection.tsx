/* =============================================================
   ContactSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   Pilot signup form + contact info
   ============================================================= */

import { useState } from "react";
import { Send, CheckCircle2, Mail, Phone, MessageCircle } from "lucide-react";
import { trpc } from "@/lib/trpc";

type FormState = "idle" | "submitting" | "success" | "error";

export default function ContactSection() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [form, setForm] = useState({
    name: "",
    company: "",
    phone: "",
    email: "",
    role: "",
    message: "",
  });

  const submitContact = trpc.contact.submit.useMutation({
    onSuccess: () => setFormState("success"),
    onError: (err) => {
      setErrorMsg(err.message || "שגיאה בשליחה. נסה שוב.");
      setFormState("error");
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormState("submitting");
    setErrorMsg("");
    submitContact.mutate({
      name: form.name,
      email: form.email,
      role: form.role || undefined,
      message: form.message || undefined,
    });
  };

  return (
    <section id="contact" className="py-24" style={{ background: "oklch(0.24 0.08 265)" }}>
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left: Info */}
          <div>
            <span
              className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-6"
              style={{
                background: "rgba(245, 166, 35, 0.2)",
                color: "oklch(0.85 0.12 75)",
                fontFamily: "Heebo, sans-serif",
                border: "1px solid rgba(245, 166, 35, 0.3)",
              }}
            >
              הצטרפו לפיילוט
            </span>

            <h2
              className="text-3xl md:text-4xl font-black text-white mb-6 leading-tight"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              היו מהראשונים לנסות
              <br />
              <span className="text-gradient">Verra</span>
            </h2>

            <p
              className="text-white/70 text-lg leading-relaxed mb-8"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              אנחנו מגייסים קבוצה סגורה של סוכני ביטוח לפיילוט הראשון.
              הנסיינים יקבלו גישה מוקדמת, ישפיעו על כיוון המוצר ויהיו שותפים בעיצוב הכלי שישנה את אופן עבודתם.
            </p>

            {/* Benefits */}
            <div className="space-y-4 mb-10">
              {[
                "גישה מוקדמת לפני השקה רשמית",
                "השפעה ישירה על פיתוח המוצר",
                "תמיכה אישית מצוות Verra",
                "ללא עלות בשלב הפיילוט",
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3">
                  <CheckCircle2 size={18} style={{ color: "oklch(0.75 0.15 75)", flexShrink: 0 }} />
                  <span
                    className="text-white/80"
                    style={{ fontFamily: "Assistant, sans-serif" }}
                  >
                    {benefit}
                  </span>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="space-y-3">
              <a
                href="mailto:info@askverra.com"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Mail size={16} />
                </div>
                <span style={{ fontFamily: "Assistant, sans-serif" }}>info@askverra.com</span>
              </a>
              <a
                href="tel:+972-50-0000000"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <Phone size={16} />
                </div>
                <span style={{ fontFamily: "Assistant, sans-serif" }}>050-000-0000</span>
              </a>
              <a
                href="https://wa.me/972500000000"
                className="flex items-center gap-3 text-white/60 hover:text-white transition-colors group"
              >
                <div
                  className="w-9 h-9 rounded-lg flex items-center justify-center group-hover:bg-white/20 transition-colors"
                  style={{ background: "rgba(255,255,255,0.1)" }}
                >
                  <MessageCircle size={16} />
                </div>
                <span style={{ fontFamily: "Assistant, sans-serif" }}>WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div
            className="bg-white rounded-2xl p-8 shadow-2xl"
            style={{ boxShadow: "0 32px 80px oklch(0.1 0.08 265 / 0.5)" }}
          >
            {formState === "success" ? (
              <div className="text-center py-8">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "oklch(0.75 0.15 75 / 0.15)" }}
                >
                  <CheckCircle2 size={32} style={{ color: "oklch(0.65 0.15 75)" }} />
                </div>
                <h3
                  className="text-2xl font-black text-navy mb-3"
                  style={{ fontFamily: "Heebo, sans-serif" }}
                >
                  קיבלנו! תודה רבה
                </h3>
                <p
                  className="text-slate-500"
                  style={{ fontFamily: "Assistant, sans-serif" }}
                >
                  ניצור איתך קשר בהקדם לתיאום הצטרפות לפיילוט.
                </p>
              </div>
            ) : (
              <>
                <h3
                  className="text-xl font-black text-navy mb-6"
                  style={{ fontFamily: "Heebo, sans-serif" }}
                >
                  הרשמה לפיילוט
                </h3>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
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
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          borderColor: "oklch(0.9 0.005 265)",
                          direction: "rtl",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        שם סוכנות / חברה
                      </label>
                      <input
                        type="text"
                        name="company"
                        value={form.company}
                        onChange={handleChange}
                        placeholder="סוכנות ביטוח בע״מ"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          borderColor: "oklch(0.9 0.005 265)",
                          direction: "rtl",
                        }}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
                        style={{ fontFamily: "Heebo, sans-serif" }}
                      >
                        טלפון *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="050-000-0000"
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          borderColor: "oklch(0.9 0.005 265)",
                          direction: "ltr",
                          textAlign: "right",
                        }}
                      />
                    </div>
                    <div>
                      <label
                        className="block text-sm font-semibold text-slate-700 mb-1.5"
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
                        className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10"
                        style={{
                          fontFamily: "Assistant, sans-serif",
                          borderColor: "oklch(0.9 0.005 265)",
                          direction: "ltr",
                          textAlign: "right",
                        }}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                      style={{ fontFamily: "Heebo, sans-serif" }}
                    >
                      תפקיד
                    </label>
                    <select
                      name="role"
                      value={form.role}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 bg-white"
                      style={{
                        fontFamily: "Assistant, sans-serif",
                        borderColor: "oklch(0.9 0.005 265)",
                        direction: "rtl",
                      }}
                    >
                      <option value="">בחר תפקיד...</option>
                      <option value="agent">סוכן ביטוח עצמאי</option>
                      <option value="agency_owner">בעלים / מנהל סוכנות</option>
                      <option value="employee">עובד סוכנות</option>
                      <option value="consultant">יועץ ביטוח</option>
                      <option value="other">אחר</option>
                    </select>
                  </div>

                  <div>
                    <label
                      className="block text-sm font-semibold text-slate-700 mb-1.5"
                      style={{ fontFamily: "Heebo, sans-serif" }}
                    >
                      ספר לנו על עצמך (אופציונלי)
                    </label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      placeholder="כמה לקוחות יש לך? עם אילו מבטחים אתה עובד? מה הכי מאתגר בעבודה היומיומית?"
                      className="w-full px-4 py-2.5 rounded-xl border text-sm outline-none transition-all focus:border-navy focus:ring-2 focus:ring-navy/10 resize-none"
                      style={{
                        fontFamily: "Assistant, sans-serif",
                        borderColor: "oklch(0.9 0.005 265)",
                        direction: "rtl",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={formState === "submitting"}
                    className="btn-primary w-full justify-center py-3"
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
                        שלח בקשת הצטרפות
                        <Send size={16} />
                      </>
                    )}
                  </button>

                  {formState === "error" && (
                    <p
                      className="text-sm text-red-600 text-center font-medium"
                      style={{ fontFamily: "Assistant, sans-serif" }}
                    >
                      {errorMsg || "שגיאה בשליחה. נסה שוב."}
                    </p>
                  )}

                  <p
                    className="text-xs text-slate-400 text-center"
                    style={{ fontFamily: "Assistant, sans-serif" }}
                  >
                    הפרטים שלך מוגנים ולא יועברו לצד שלישי
                  </p>
                </form>
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
