import { CheckCircle2 } from "lucide-react";
import heroCharacter from "@/assets/hero-character.png";

const HeroSection = () => {
  const features = [
    {
      title: "Verified BINUS Community",
      description: "Exclusive access for students and staff with @binus.ac.id/SSO verification.",
    },
    {
      title: "Ethical & Integrity-First",
      description: "Tutoring, mentoring, proofreading, and creative services — no ghostwriting, no cheating.",
    },
    {
      title: "Portfolio & Earning Opportunities",
      description: "Showcase your skills, build a portfolio, get reviews, and earn income.",
    },
    {
      title: "Safe Transactions",
      description: "Escrow-based payments via QRIS/e-wallet or skill barter options.",
    },
  ];

  return (
    <section id="home" className="min-h-screen flex items-center bg-gradient-hero pt-20">
      <div className="container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-3 gap-12 items-center">
          <div className="lg:col-span-1 animate-fade-up">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Connecting Students,
              <br />
              Skills, and Opportunities
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              in a Trusted Marketplace for
              <br />
              Learning and Growth
            </p>
          </div>
          
          <div className="lg:col-span-1 flex justify-center animate-scale-in">
            <img 
              src={heroCharacter} 
              alt="Student character" 
              className="w-full max-w-md h-auto object-contain"
            />
          </div>
          
          <div className="lg:col-span-1 space-y-6 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-4">
                <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-lg mb-1">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="mt-16 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-lg">
            Find academic and non-academic services from fellow BINUS students.
            <br />
            Verified <span className="font-bold">@binus.ac.id only</span>, <span className="font-bold">safe transactions</span>, and aligned with <span className="font-bold">BINUS integrity</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
