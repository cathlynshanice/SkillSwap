import { Card } from "@/components/ui/card";
import { Network, Wallet, GraduationCap } from "lucide-react";
import differentCharacter from "@/assets/different-character.png";

const DifferentSection = () => {
  const features = [
    {
      icon: Network,
      title: "Isolated and Trusted Ecosystem",
      description: "Our platform is focused on Binusians who have been verified using their student ID number, ensuring a safer and more relevant experience for everyone involved.",
    },
    {
      icon: Wallet,
      title: "Flexible Transaction Schemes",
      description: "Not only do we offer standard payments via QRIS/e-wallet, but we also offer a unique Skill Barter feature. This feature is especially helpful for students who may be short on cash but need assistance.",
    },
    {
      icon: GraduationCap,
      title: "Academic Integrity",
      description: "Our platform also promotes a strong academic integrity policy, ensuring all services align with BINUS's ethical standards. Say no to academic jockeys!",
    },
  ];

  return (
    <section id="about" className="min-h-screen flex items-center py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          <div className="animate-fade-up">
            <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-6 lg:mb-8">
              What Makes us
              <br />
              Different?
            </h2>
            
            <div className="space-y-3 lg:space-y-4">
              {features.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="p-3 lg:p-4 flex gap-2 lg:gap-3 hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 xl:w-7 xl:h-7 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm lg:text-base xl:text-lg mb-0.5 lg:mb-1">{feature.title}</h3>
                    <p className="text-muted-foreground text-xs lg:text-sm">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="flex justify-center lg:justify-end animate-scale-in">
            <div className="relative">
              <div className="absolute inset-0 bg-secondary/40 rounded-full blur-3xl"></div>
              <img 
                src={differentCharacter} 
                alt="What makes us different" 
                className="relative w-full max-w-xs lg:max-w-sm xl:max-w-md h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentSection;
