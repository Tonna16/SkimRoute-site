import HeroSection from "../components/home/HeroSection";
import FeaturesOverview from "../components/home/FeaturesOverview";
import HowItWorks from "../components/home/HowItWorks";
import CTASection from "../components/home/CTASection";
import heroImg from "@/images/professionalSRSS-2.png";
import howImg from "@/images/professionalSRSS-1.png";

export default function Home() {
  return (
    <div>
      <HeroSection heroImage={howImg} />
      <FeaturesOverview />
      <HowItWorks image={heroImg} />
      <CTASection />
    </div>
  );
}
