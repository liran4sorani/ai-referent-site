/* =============================================================
   UseCasesSection — AI Referent
   Design: Trust Architecture | RTL Hebrew
   Interactive use cases with chat demo simulation
   ============================================================= */

import { useState } from "react";
import { Bot, User } from "lucide-react";

const USE_CASES = [
  {
    id: "coverage",
    label: "בדיקת כיסוי",
    title: "האם הטיפול מכוסה?",
    desc: "הסוכן שואל על כיסוי טיפול ספציפי — AI Referent מאתר את הנספח הרלוונטי ועונה עם ציטוט מדויק.",
    chat: [
      { role: "user", text: "האם פיזיותרפיה מכוסה ללקוח ישראל ישראלי תחת פוליסת הפניקס?" },
      {
        role: "ai",
        text: "✅ כן — פיזיותרפיה מכוסה תחת נספח 6650 (שירותים אמבולטוריים).\n\n📋 תנאים: נדרשת הפניה מרופא מטפל לפני הטיפול.\n\n💰 גבולות: עד 80% החזר, מקסימום 2,500 ₪ לשנה.\n\n📎 מקור: אוגדן כיסויים, נספח 6650, סעיף 3.2",
      },
    ],
  },
  {
    id: "claim",
    label: "סטטוס תביעה",
    title: "מה סטטוס התביעה?",
    desc: "בדיקת מצב תביעה קיימת, מסמכים שהוגשו ותשלומים שבוצעו — הכל בשאלה אחת.",
    chat: [
      { role: "user", text: "מה הסטטוס של תביעה מספר 2024-8834 עבור ישראל ישראלי?" },
      {
        role: "ai",
        text: "📊 תביעה 2024-8834 — פיזיותרפיה:\n\n• סטטוס: ✅ אושרה ושולמה\n• סכום ששולם: 1,840 ₪\n• תאריך תשלום: 15.03.2024\n• מסמכים שהוגשו: הפניה רופא, קבלה מקורית\n\n📌 יתרת מסגרת שנתית: 660 ₪",
      },
    ],
  },
  {
    id: "docs",
    label: "מסמכים נדרשים",
    title: "אילו מסמכים נדרשים?",
    desc: "AI Referent מפרט את כל המסמכים הנדרשים לתביעה ספציפית — כדי שהלקוח יגיע מוכן.",
    chat: [
      { role: "user", text: "אילו מסמכים צריך ללקוח להגיש לתביעת השבת הוצאות ניתוח?" },
      {
        role: "ai",
        text: "📁 מסמכים נדרשים לתביעת ניתוח:\n\n1. 📄 סיכום ניתוח מבית החולים\n2. 🏥 חשבונית מקורית מבית החולים\n3. 💳 צילום צ'ק / קבלה על תשלום\n4. 📋 הפניה מרופא מטפל (אם נדרשה מראש)\n5. 🆔 צילום ת.ז. + ספח\n\n⚠️ ללא הפניה מראש — התביעה עלולה להידחות.",
      },
    ],
  },
  {
    id: "history",
    label: "היסטוריית תביעות",
    title: "מה ההיסטוריה אצל המבטח?",
    desc: "סקירת תביעות קודמות אצל אותו מבטח — להבנת מסגרות שנוצלו ויתרות זכאות.",
    chat: [
      { role: "user", text: "מה ההיסטוריה של ישראל ישראלי בהפניקס השנה?" },
      {
        role: "ai",
        text: "📊 תביעות 2024 — ישראל ישראלי (הפניקס):\n\n| טיפול | תאריך | סכום |\n|-------|--------|------|\n| פיזיותרפיה | 15.03 | 1,840 ₪ |\n| אורתופד | 02.05 | 620 ₪ |\n\n💡 סה\"כ נוצל: 2,460 ₪ מתוך 5,000 ₪\n✅ יתרה זמינה: 2,540 ₪",
      },
    ],
  },
];

function ChatBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === "user";
  return (
    <div className={`flex items-start gap-2 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
      <div
        className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
          isUser ? "bg-navy" : "bg-gold"
        }`}
      >
        {isUser ? (
          <User size={16} className="text-white" />
        ) : (
          <Bot size={16} className="text-navy" />
        )}
      </div>
      <div
        className={isUser ? "chat-bubble-user" : "chat-bubble-ai"}
        style={{ whiteSpace: "pre-line", fontFamily: "Assistant, sans-serif" }}
      >
        {text}
      </div>
    </div>
  );
}

export default function UseCasesSection() {
  const [activeId, setActiveId] = useState("coverage");
  const active = USE_CASES.find((u) => u.id === activeId)!;

  return (
    <section id="usecases" className="section-light py-24">
      <div className="container">
        {/* Section header */}
        <div className="text-center mb-12">
          <span
            className="inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4"
            style={{
              background: "oklch(0.24 0.08 265 / 0.08)",
              color: "oklch(0.24 0.08 265)",
              fontFamily: "Heebo, sans-serif",
            }}
          >
            מקרי שימוש
          </span>
          <h2
            className="text-3xl md:text-4xl font-black text-navy mb-4"
            style={{ fontFamily: "Heebo, sans-serif" }}
          >
            ראו את AI Referent בפעולה
          </h2>
          <p
            className="text-lg text-slate-500 max-w-2xl mx-auto"
            style={{ fontFamily: "Assistant, sans-serif" }}
          >
            שאלות אמיתיות שסוכנים שואלים — תשובות מבוססות פוליסה בשניות.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {USE_CASES.map((uc) => (
            <button
              key={uc.id}
              className={`usecase-tab ${activeId === uc.id ? "active" : ""}`}
              onClick={() => setActiveId(uc.id)}
            >
              {uc.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start max-w-5xl mx-auto">
          {/* Description */}
          <div className="lg:pt-4">
            <h3
              className="text-2xl font-black text-navy mb-4"
              style={{ fontFamily: "Heebo, sans-serif" }}
            >
              {active.title}
            </h3>
            <p
              className="text-slate-600 text-base leading-relaxed mb-6"
              style={{ fontFamily: "Assistant, sans-serif" }}
            >
              {active.desc}
            </p>

            {/* Key benefit */}
            <div
              className="p-5 rounded-xl"
              style={{
                background: "oklch(0.24 0.08 265 / 0.05)",
                border: "1px solid oklch(0.24 0.08 265 / 0.12)",
              }}
            >
              <p
                className="text-sm text-navy font-semibold"
                style={{ fontFamily: "Heebo, sans-serif" }}
              >
                💡 תשובה מבוססת מקורות — הסוכן יכול לאמת לפני שמייעץ ללקוח
              </p>
            </div>
          </div>

          {/* Chat demo */}
          <div
            className="rounded-2xl overflow-hidden shadow-xl"
            style={{ border: "1px solid oklch(0.9 0.005 265)" }}
          >
            {/* Chat header */}
            <div
              className="flex items-center gap-3 px-5 py-4"
              style={{ background: "oklch(0.24 0.08 265)" }}
            >
              <img
                src="https://files.manuscdn.com/user_upload_by_module/session_file/310519663681922588/fUsxeBSLjVwJIIYL.png"
                alt="AI Referent"
                className="w-8 h-8 object-contain"
              />
              <div>
                <div
                  className="text-white font-bold text-sm"
                  style={{ fontFamily: "Heebo, sans-serif" }}
                >
                  AI Referent
                </div>
                <div className="flex items-center gap-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-green-400" />
                  <span className="text-white/60 text-xs">מחובר לפורטל הפניקס</span>
                </div>
              </div>
            </div>

            {/* Chat messages */}
            <div className="bg-slate-50 p-5 space-y-4 min-h-64">
              {active.chat.map((msg, i) => (
                <ChatBubble key={`${activeId}-${i}`} role={msg.role} text={msg.text} />
              ))}
            </div>

            {/* Input bar */}
            <div
              className="px-4 py-3 bg-white border-t flex items-center gap-3"
              style={{ borderColor: "oklch(0.9 0.005 265)" }}
            >
              <input
                type="text"
                placeholder="שאל שאלה על הפוליסה..."
                className="flex-1 text-sm bg-slate-50 rounded-lg px-4 py-2 outline-none border"
                style={{
                  fontFamily: "Assistant, sans-serif",
                  borderColor: "oklch(0.9 0.005 265)",
                  direction: "rtl",
                }}
                readOnly
              />
              <button
                className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0"
                style={{ background: "oklch(0.24 0.08 265)" }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
