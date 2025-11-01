import DifferentSection from "@/components/DifferentSection";
import FeaturesSection from "@/components/FeaturesSection";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import Navbar from "@/components/Navbar";
import OffersSection from "@/components/OffersSection";

const Landing = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <DifferentSection />
      <FeaturesSection />
      <OffersSection />
      <Footer />
    </div>
  );
};

export default Landing;
