import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Camera, PenSquare, Lightbulb } from "lucide-react";
import featuresCharacter from "@/assets/features-character.png";

const FeaturesSection = () => {
  const categories = ["Academic", "Creative", "Technical", "Lifestyle"];
  
  const serviceCards = [
    {
      service: "Math Tutoring",
      studentName: "Alex Doe",
      major: "Mathematics, Year 3",
      rate: "Rp 375.000/jam",
      tags: ["STEM", "Tutoring"],
      icon: <BookOpen className="w-6 h-6 text-primary" />,
    },
    {
      service: "Photography Session",
      studentName: "Jane Smith",
      major: "Visual Communication Design, Year 2",
      rate: "Rp 750.000/sesi",
      tags: ["Creative", "Photography"],
      icon: <Camera className="w-6 h-6 text-primary" />,
    },
    {
      service: "Essay Proofreading",
      studentName: "John Lee",
      major: "English Literature, Year 4",
      rate: "Rp 225.000/1000 kata",
      tags: ["Academic", "Writing"],
      icon: <PenSquare className="w-6 h-6 text-primary" />,
    },
  ];

  return (
    <section id="features" className="relative min-h-screen flex items-center py-8 lg:py-12 bg-background overflow-hidden">
      <div className="container mx-auto px-12 relative z-10 pt-8">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Your Campus Marketplace for <span className="text-primary">Skills & Services</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Find academic help, creative services, or barter your skills with fellow students right from your university.
          </p>
        </div>

        <div className="flex justify-center">
          {/* Services Section */}
          <div className="w-full space-y-4 animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-primary" />
              Explore Student Services
            </h3>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <Badge 
                  key={idx} 
                  variant={idx === 0 ? "default" : "outline"}
                  className={`cursor-pointer transition-colors hover:bg-primary hover:text-primary-foreground ${idx === 0 ? "bg-primary text-primary-foreground" : ""}`}
                >
                  {cat}
                </Badge>
              ))}
            </div>

            <div className="space-y-4">
              {serviceCards.map((service, idx) => (
                <Card key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 border-border/60 max-w-2xl">
                  <div className="p-3 rounded-lg bg-muted">
                    {service.icon}
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-lg">{service.service}</h4>
                    <p className="text-muted-foreground text-sm mb-2">{service.studentName} - {service.major}</p>
                    <div className="flex flex-wrap gap-2">
                      {service.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                  </div>
                  <div className="text-left sm:text-right mt-4 sm:mt-0 flex-shrink-0">
                    <p className="font-bold text-base text-primary mb-2">{service.rate}</p>
                    <Button>Book Now <ArrowRight className="ml-2 w-4 h-4" /></Button>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;