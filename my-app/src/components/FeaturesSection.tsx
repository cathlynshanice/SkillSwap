import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, BookOpen, Camera, PenSquare, Lightbulb, ArrowRightLeft, Palette, Terminal } from "lucide-react";

// Sub-component for the barter showcase cards
const BarterCard = ({ deal }) => (
  <Card className="p-4 bg-card shadow-md w-full max-w-xs">
    <div className="flex items-center gap-3">
      <img src={deal.avatar} alt={deal.name} className="w-12 h-12 rounded-full border-2 border-primary object-cover" />
      <div className="flex-1">
        <h3 className="font-bold text-sm">{deal.name}</h3>
        <p className="text-xs text-muted-foreground">{deal.major}, {deal.year}</p>
      </div>
    </div>
    <div className="mt-3">
      <p className="text-[10px] text-muted-foreground mb-1">Offering:</p>
      <Badge variant="secondary" className="flex items-center w-fit text-xs">
        {deal.skillIcon}
        <span className="font-semibold ml-1.5">{deal.skill}</span>
      </Badge>
    </div>
  </Card>
);

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

  const barterDeals = [
    {
      name: "Budi Santoso",
      major: "VCD",
      year: 2022,
      skill: "Logo Design",
      skillIcon: <Palette className="w-3 h-3" />,
      avatar: "https://picsum.photos/seed/Budi/200",
    },
    {
      name: "Citra Lestari",
      major: "IT",
      year: 2021,
      skill: "Web Development",
      skillIcon: <Terminal className="w-3 h-3" />,
      avatar: "https://picsum.photos/seed/Citra/200",
    },
  ];

  return (
    <section id="features" className="relative min-h-screen flex items-center py-12 lg:py-16 bg-background overflow-hidden">
      <div className="container mx-auto px-12 relative z-10">
        <div className="text-center mb-12 animate-fade-up">
          <h2 className="text-2xl lg:text-3xl font-bold mb-2">
            Your Campus Marketplace for <span className="text-primary">Skills & Services</span>
          </h2>
          <p className="text-sm text-muted-foreground max-w-3xl mx-auto">
            Find academic help, creative services, or barter your skills with fellow students right from your university.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Services Section */}
          <div className="space-y-4 animate-fade-up" style={{ animationDelay: "0.1s" }}>
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
                <Card key={idx} className="p-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 transition-all hover:shadow-xl hover:-translate-y-1 border-border/60">
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

          {/* Barter Skills Section */}
          <div className="space-y-4 animate-fade-up flex flex-col h-full" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl font-bold flex items-center gap-3">
              <ArrowRightLeft className="w-6 h-6 text-primary" />
              <span>Skill for Skill</span> 
            </h3>
            <p className="text-sm text-muted-foreground">
              Don't have cash? Exchange your skills for other services you need.
            </p>
            
            <div className="relative flex justify-center items-center w-full h-full min-h-[300px] p-4 bg-gradient-to-br from-blue-50 to-blue-200 dark:from-blue-950/20 dark:to-indigo-950/20 rounded-2xl shadow-inner-lg border-2 flex-grow">
                {/* Card 1 */}
                <div className="transform -translate-x-6 lg:-translate-x-12 -translate-y-6 lg:-translate-y-8">
                  <BarterCard deal={barterDeals[0]} />
                </div>

                {/* Central Icon */}
                <div className="absolute inset-0 flex justify-center items-center">
                  <div className="p-2 bg-primary/10 rounded-full">
                      <div className="p-2 bg-primary/20 rounded-full">
                        <ArrowRightLeft className="w-5 h-5 lg:w-6 lg:h-6 text-primary" />
                      </div>
                  </div>
                </div>

                {/* Card 2 */}
                <div className="transform translate-x-6 lg:translate-x-12 translate-y-6 lg:translate-y-8">
                  <BarterCard deal={barterDeals[1]} />
                </div>
            </div>
            <p className="text-xs text-muted-foreground text-center px-4">
              Budi (VCD) needs a website, Citra (IT) needs a logo. They meet & exchange skills on SkillSwap.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
