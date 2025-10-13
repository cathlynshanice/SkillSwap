import { Card } from "@/components/ui/card";
import { Network, Wallet, GraduationCap } from "lucide-react";

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
    <section id="about" className="min-h-screen flex items-center py-8 lg:py-12 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
        <div>
          <div className="animate-fade-up max-w-lg">
            <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-4 lg:mb-6">
              What Makes us
              <br />
              Different?
            </h2>
            
            <div className="space-y-4 lg:space-y-5">
              {features.map((feature, idx) => (
                <div 
                  key={idx} 
                  className="relative flex items-center animate-fade-up"
                  style={{ animationDelay: `${idx * 0.1}s` }}
                >
                  <div className="absolute left-0 z-10 w-10 h-10 lg:w-12 lg:h-12 xl:w-14 xl:h-14 rounded-full bg-primary flex items-center justify-center flex-shrink-0 shadow-lg">
                    <feature.icon className="w-4 h-4 lg:w-5 lg:h-5 xl:w-6 xl:h-6 text-primary-foreground" />
                  </div>
                  <Card className="w-full pl-8 lg:pl-10 xl:pl-12 pr-2 lg:pr-3 py-4 lg:py-5 hover:shadow-lg transition-shadow border-2 rounded-2xl ml-5 lg:ml-6 xl:ml-7">
                    <h3 className="font-bold text-xs lg:text-sm mb-0.5">{feature.title}</h3>
                    <p className="text-muted-foreground text-[10px] lg:text-xs leading-relaxed">{feature.description}</p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DifferentSection;
