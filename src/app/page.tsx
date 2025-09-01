import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import Services from "@/components/Services/Services";
import Calculator from "@/components/Calculator/Calculator";
import SuccessStories from "@/components/SuccessStories/SuccessStories";
import Differentials from "@/components/Differentials/Differentials";
import BlogSection from "@/components/Blog/BlogSection";
import FAQSection from "@/components/FAQ/FAQSection";
import FinalCTA from "@/components/CTA/FinalCTA";
import Footer from "@/components/Footer/Footer";
import StickyCTA from "@/components/CTA/StickyCTA";
import WhatsAppFAB from "@/components/CTA/WhatsAppFAB";
import SolarInstallFlow from "@/components/SolarInstallFlow/SolarInstallFlow";
import SavingsQuickEstimator from "@/components/Savings/SavingsQuickEstimator";
import AboutBlurb from "@/components/About/AboutBlurb";
import SavingsCarousel from "@/components/Savings/SavingsQuickEstimator2";
import SavingsDiscreteSlider from "@/components/Savings/SavingsDiscreteSlider";
import SavingsMiniWizard from "@/components/Savings/SavingsMiniWizard";

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
