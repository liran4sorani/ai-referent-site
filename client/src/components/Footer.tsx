/* =============================================================
   Footer — AI Referent
   Design: Trust Architecture | RTL Hebrew
   ============================================================= */

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer
      className="py-10 border-t"
      style={{
        background: "oklch(0.15 0.06 265)",
        borderColor: "rgba(255,255,255,0.08)",
      }}
    >
      <div className="container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo + tagline */}
          <div className="flex items-center gap-3">
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png"
              alt="AI Referent"
              className="h-8 w-8 object-contain"
            />
            <div>
              <div
                className="text-white font-bold text-sm"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                AI Referent
              </div>
              <div
                className="text-white/40 text-xs"
                style={{ fontFamily: "Assistant, sans-serif" }}
              >
                רפרנט וירטואלי לסוכני ביטוח
              </div>
            </div>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-6 flex-wrap justify-center">
            {[
              { label: "מה זה AI Referent?", href: "#about" },
              { label: "יכולות", href: "#features" },
              { label: "מקרי שימוש", href: "#usecases" },
              { label: "צור קשר", href: "#contact" },
            ].map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-white/50 hover:text-white text-sm transition-colors"
                style={{ fontFamily: "Assistant, sans-serif" }}
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Copyright */}
          <p
            className="text-white/30 text-xs"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            © {year} AI Referent. כל הזכויות שמורות.
          </p>
        </div>

        {/* Disclaimer */}
        <div
          className="mt-6 pt-6 text-center"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <p
            className="text-white/25 text-xs max-w-2xl mx-auto leading-relaxed"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            AI Referent הוא כלי עזר לסוכני ביטוח בלבד. התשובות מבוססות על מסמכי הפוליסה שהועלו ואינן מהוות ייעוץ משפטי או ביטוחי.
            הסוכן אחראי לאמת את המידע לפני מתן ייעוץ ללקוח.
          </p>
        </div>
      </div>
    </footer>
  );
}
