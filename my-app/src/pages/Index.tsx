import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesSection from "@/components/FeaturesSection";
import DifferentSection from "@/components/DifferentSection";
import OffersSection from "@/components/OffersSection";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <DifferentSection />
      <OffersSection />
    </div>
  );
};

export default Index;
