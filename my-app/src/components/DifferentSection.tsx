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
    <section id="about" className="min-h-screen flex items-center py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <h2 className="text-5xl font-bold mb-12">
              What Makes us
              <br />
              Different?
            </h2>
            
            <div className="space-y-6">
              {features.map((feature, idx) => (
                <Card 
                  key={idx} 
                  className="p-6 flex gap-4 hover:shadow-lg transition-shadow animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground">{feature.description}</p>
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
                className="relative w-full max-w-lg h-auto object-contain"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentSection;
