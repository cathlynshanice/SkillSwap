import { CheckCircle } from "lucide-react";
import heroCharacter from "@/assets/edutrade-avatar-removebg-preview.png";

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
    <section id="home" className="min-h-screen flex items-center bg-background pt-16">
      <div className="container mx-auto px-4 lg:px-8 xl:px-12 py-8 lg:py-12">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 items-center">
          {/* Left Content - Title and Subtitle Only */}
          <div className="lg:col-span-1 animate-fade-up">
            <h1 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:mb-5 leading-tight text-gray-900">
              Connecting Students,
              <br />
              Skills, and Opportunities
            </h1>
            <p className="text-sm lg:text-base xl:text-lg text-gray-700 leading-relaxed">
              in a Trusted Marketplace for
              <br />
              Learning and Growth
            </p>
          </div>
          
          {/* Center Content - Character/Avatar */}
          <div className="lg:col-span-1 flex justify-center items-center animate-scale-in relative pt-12">
            <div className="absolute inset-x-4 inset-y-8 bg-blue-500 rounded-full blur-xl translate-y-12" style={{ backgroundColor: '#2970FF', filter: 'blur(60px)', opacity: 0.6 }}></div>
            <img 
              src={heroCharacter} 
              alt="Student character" 
              className="w-full max-w-[15rem] lg:max-w-xs xl:max-w-sm h-auto object-contain relative"
            />
          </div>
          
          {/* Right Content - Feature Points */}
          <div className="lg:col-span-1 space-y-4 lg:space-y-5 animate-fade-up pt-16" style={{ animationDelay: "0.2s" }}>
            {features.map((feature, index) => (
              <div key={index} className="flex gap-3 items-start">
                <div className="flex-shrink-0 mt-0.5">
                  <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-blue-600 fill-blue-100" />
                </div>
                <div>
                  <h3 className="font-semibold text-sm lg:text-base text-gray-900 mb-1">{feature.title}</h3>
                  <p className="text-gray-700 text-xs lg:text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Bottom Text */}
        <div className="mt-16 lg:mt-20 xl:mt-24 text-center animate-fade-up" style={{ animationDelay: "0.4s" }}>
          <p className="text-xs lg:text-sm text-gray-800 leading-relaxed">
            Find academic and non-academic services from fellow BINUS students.
          </p>
          <p className="text-xs lg:text-sm text-gray-700 mt-1">
            Verified <span className="font-bold text-gray-900">@binus.ac.id only</span>, <span className="font-bold text-gray-900">safe transactions</span>, and aligned with <span className="font-bold text-gray-900">BINUS integrity</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;