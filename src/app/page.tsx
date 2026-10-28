import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Differentials from "@/components/Differentials/Differentials";
import FAQSection from "@/components/FAQ/FAQSection";
import FinalCTA from "@/components/CTA/FinalCTA";
import Footer from "@/components/Footer/Footer";
import StickyCTA from "@/components/CTA/StickyCTA";
import SolarInstallFlow from "@/components/SolarInstallFlow/SolarInstallFlow";
import SavingsQuickEstimator from "@/components/Savings/SavingsQuickEstimator";
import AboutBlurb from "@/components/About/AboutBlurb";

// Nota: había 7 imports más que no se renderizaban (Calculator, SuccessStories,
// BlogSection, WhatsAppFAB, SavingsQuickEstimator2, SavingsDiscreteSlider,
// SavingsMiniWizard). Al ser componentes cliente entraban igual al bundle.
// Los componentes siguen en el repo; solo se quitó el import muerto.

export default function Page() {
  return (
    <main>
      <Navbar />
      <Hero />
      <section id="somos"><AboutBlurb align="center" /></section>
      <section id="servicios"><Services /></section>
      <section><Differentials /></section>
      <section><SolarInstallFlow /></section>
      <section id="calculadora"><SavingsQuickEstimator /></section>
      <section id="faq"><FAQSection /></section>
      <section id="cotizar"><FinalCTA /></section>
      <section><Footer /></section>
      <section><StickyCTA /></section>
    </main>
  );
}
