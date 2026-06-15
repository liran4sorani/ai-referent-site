/* =============================================================
   HeroSection — AI Referent
   Design: Trust Architecture | RTL Hebrew | Navy gradient bg
   Full-height hero with chat demo preview
   ============================================================= */

import { ArrowLeft, ChevronDown } from "lucide-react";

export default function HeroSection() {
  const scrollToAbout = () => {
    document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
  };

  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="section-hero min-h-screen flex flex-col relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="absolute top-20 left-10 w-96 h-96 rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, oklch(0.75 0.15 75), transparent)" }}
        />
        <div
          className="absolute bottom-40 right-20 w-64 h-64 rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, oklch(0.6 0.1 220), transparent)" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Main content */}
      <div className="container flex-1 flex items-center pt-24 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center w-full">
          {/* Text side (right in RTL) */}
          <div className="order-2 lg:order-1 text-center lg:text-right">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6 text-sm font-medium animate-fade-in-up"
              style={{
                background: "rgba(245, 166, 35, 0.15)",
                border: "1px solid rgba(245, 166, 35, 0.4)",
                color: "oklch(0.85 0.12 75)",
                fontFamily: "Heebo, sans-serif",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse inline-block" />
              MVP — פיילוט סגור | הפניקס
            </div>

            <h1
              className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6 animate-fade-in-up animate-delay-100"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              הרפרנט שלך
              <br />
              <span className="text-gradient">זמין 24/7</span>
            </h1>

            <p
              className="text-lg md:text-xl text-white/75 leading-relaxed mb-8 max-w-lg mx-auto lg:mx-0 animate-fade-in-up animate-delay-200"
              style={{ fontFamily: "Assistant, sans-serif", fontWeight: 400 }}
            >
              AI Referent הוא עוזר AI חכם לסוכני ביטוח — עונה על שאלות כיסוי,
              מאתר פרטי פוליסה ומסייע בתביעות. <strong className="text-white">בעברית, בזמן אמת, ללא המתנה.</strong>
            </p>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-4 mb-8 animate-fade-in-up animate-delay-300">
              <div className="stat-card">
                <div className="text-2xl font-black text-gold" style={{ fontFamily: "Heebo, sans-serif" }}>3–4</div>
                <div className="text-xs text-white/60 mt-1" style={{ fontFamily: "Assistant, sans-serif" }}>מערכות במקום אחד</div>
              </div>
              <div className="stat-card">
                <div className="text-2xl font-black text-gold" style={{ fontFamily: "Heebo, sans-serif" }}>שניות</div>
                <div className="text-xs text-white/60 mt-1" style={{ fontFamily: "Assistant, sans-serif" }}>לתשובה מבוססת פוליסה</div>
              </div>
              <div className="stat-card">
                <div className="text-2xl font-black text-gold" style={{ fontFamily: "Heebo, sans-serif" }}>100%</div>
                <div className="text-xs text-white/60 mt-1" style={{ fontFamily: "Assistant, sans-serif" }}>עברית ו-RTL</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-fade-in-up animate-delay-400">
              <button onClick={scrollToContact} className="btn-primary text-base py-3 px-8">
                הצטרפו לפיילוט
                <ArrowLeft size={18} />
              </button>
              <button onClick={scrollToAbout} className="btn-outline-white text-base py-3 px-8">
                למדו עוד
              </button>
            </div>
          </div>

          {/* Hero image / Chat demo (left in RTL) */}
          <div className="order-1 lg:order-2 flex justify-center lg:justify-start animate-fade-in-up animate-delay-200">
            <div className="relative w-full max-w-lg">
              {/* Main hero image */}
              <div
                className="rounded-2xl overflow-hidden shadow-2xl"
                style={{ boxShadow: "0 32px 80px oklch(0.1 0.08 265 / 0.6)" }}
              >
                <img
                  src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/FHIRgYoQFZtdfnSm.png"
                  alt="AI Referent — ממשק שיחה לסוכני ביטוח"
                  className="w-full h-auto"
                />
              </div>

              {/* Floating chat demo card */}
              <div
                className="absolute -bottom-6 -right-4 bg-white rounded-2xl p-4 shadow-xl w-64"
                style={{ boxShadow: "0 16px 48px oklch(0.24 0.08 265 / 0.25)" }}
              >
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-full bg-navy flex items-center justify-center">
                    <img src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png" alt="AI" className="w-5 h-5 object-contain" />
                  </div>
                  <div>
                    <div className="text-xs font-bold text-navy" style={{ fontFamily: "Heebo, sans-serif" }}>AI Referent</div>
                    <div className="flex items-center gap-1">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                      <span className="text-xs text-slate-400">פעיל</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-slate-600 leading-relaxed" style={{ fontFamily: "Assistant, sans-serif" }}>
                  ✅ פיזיותרפיה מכוסה תחת נספח 6650 — עד 80% החזר, עם הפניה מרופא.
                </div>
              </div>

              {/* Floating badge */}
              <div
                className="absolute -top-4 -left-4 bg-gold text-navy text-xs font-bold px-3 py-2 rounded-xl shadow-lg"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                מבוסס על הפניקס
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="flex justify-center pb-8 animate-bounce">
        <button onClick={scrollToAbout} className="text-white/40 hover:text-white/70 transition-colors">
          <ChevronDown size={32} />
        </button>
      </div>

      {/* Wave divider */}
      <div className="relative z-10 -mb-1">
        <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full block">
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="oklch(0.98 0.003 265)" />
        </svg>
      </div>
    </section>
  );
}
