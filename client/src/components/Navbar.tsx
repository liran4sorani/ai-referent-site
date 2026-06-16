/* =============================================================
   Navbar — AI Referent
   Design: Trust Architecture | RTL Hebrew | Navy + Gold
   Sticky nav with scroll-triggered backdrop blur
   ============================================================= */

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { label: "מה זה AI Referent?", href: "#about" },
  { label: "יכולות", href: "#features" },
  { label: "מקרי שימוש", href: "#usecases" },
  { label: "איך זה עובד", href: "#how-it-works" },
  { label: "ארכיטקטורה", href: "#architecture" },
  { label: "צור קשר", href: "#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header
      className={`fixed top-0 right-0 left-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="container">
        <div className="flex flex-row-reverse items-center justify-between h-16 md:h-20">
          {/* Logo — right side in RTL */}
          <a
            href="#"
            className="flex flex-row-reverse items-center gap-3 group flex-shrink-0"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            <img
              src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png"
              alt="AI Referent Logo"
              className="h-10 w-10 object-contain flex-shrink-0"
              style={{ minWidth: "2.5rem" }}
            />
            <div className="flex flex-col leading-tight text-right">
              <span
                className={`font-bold text-lg leading-none transition-colors ${
                  scrolled ? "text-navy" : "text-white"
                }`}
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                AI Referent
              </span>
              <span
                className={`text-xs font-light transition-colors ${
                  scrolled ? "text-slate-500" : "text-white/70"
                }`}
                style={{ fontFamily: "Assistant, sans-serif" }}
              >
                רפרנט וירטואלי לסוכני ביטוח
              </span>
            </div>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  scrolled
                    ? "text-slate-600 hover:text-navy hover:bg-slate-100"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* CTA Button — left side in RTL */}
          <div className="hidden md:block flex-shrink-0">
            <button
              onClick={() => handleNavClick("#contact")}
              className="btn-primary text-sm py-2 px-5"
            >
              הצטרפו לפיילוט
            </button>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className={`md:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "text-navy" : "text-white"
            }`}
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="תפריט"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white/98 backdrop-blur-xl border-t border-slate-100 shadow-lg">
          <div className="container py-4 flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-right px-4 py-3 rounded-lg text-slate-700 hover:bg-slate-50 hover:text-navy font-medium transition-colors"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                {link.label}
              </button>
            ))}
            <div className="pt-2 border-t border-slate-100 mt-2">
              <button
                onClick={() => handleNavClick("#contact")}
                className="btn-primary w-full justify-center"
              >
                הצטרפו לפיילוט
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
