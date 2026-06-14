/* =============================================================
   Home — AI Referent Marketing Site
   Design: Trust Architecture | RTL Hebrew
   Sections: Hero → About → Features → UseCases → HowItWorks → Contact → Footer
   ============================================================= */

import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import FeaturesSection from "@/components/FeaturesSection";
import UseCasesSection from "@/components/UseCasesSection";
import HowItWorksSection from "@/components/HowItWorksSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen" dir="rtl">
      <Navbar />
      <HeroSection />
      <AboutSection />
      <FeaturesSection />
      <UseCasesSection />
      <HowItWorksSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
