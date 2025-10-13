import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Instagram, Facebook, Linkedin, ArrowLeftRight, ArrowRight } from "lucide-react";
import featuresCharacter from "@/assets/features-character.png";

const FeaturesSection = () => {
  const categories = ["Design", "Development", "Marketing", "Videographer"];
  
  const jobCards = [
    {
      title: "Product Designer",
      tags: ["Full Time", "Product"],
      salary: "34K$ - 45K$",
      poster: "Rifaldi",
      phone: "0180-3000",
      badges: "2k Jobs",
      color: "bg-accent",
    },
    {
      title: "Senior Designer",
      tags: ["Full Time", "Head of Design"],
      salary: "25K$ - 45K$",
      poster: "Rizgiani",
      phone: "140-200",
      badges: "7k Jobs",
      color: "bg-secondary",
    },
    {
      title: "Creative Director",
      tags: ["Full Time", "Design"],
      salary: "25K$ - 45K$",
      poster: "Github",
      phone: "6300-8000",
      badges: "9k Jobs",
      color: "bg-secondary",
    },
  ];

  const barterSkills = [
    { 
      name: "Lisa Williams", 
      location: "Tangerang, ERP", 
      badge: "Strategy", 
      price: "$452", 
      badgeColor: "bg-amber-200",
      offering: "Marketing Strategy",
      seeking: "UI/UX Design"
    },
  ];

  return (
    <section id="features" className="min-h-screen flex items-center py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="mb-4 lg:mb-6 animate-fade-up">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-2">
            Features
            <div className="h-1 w-24 lg:w-32 bg-primary mt-2"></div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-start">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4">
              Find Job <span className="text-primary">Opportunities!</span>
            </h3>
            
            <Card className="p-2 lg:p-3 bg-gradient-card shadow-lg">
              <div className="flex gap-2 mb-3 lg:mb-4 overflow-x-auto">
                {categories.map((cat, idx) => (
                  <Badge 
                    key={idx} 
                    variant={idx === 0 ? "default" : "outline"}
                    className={`text-[10px] lg:text-xs ${idx === 0 ? "bg-accent hover:bg-accent/90" : ""}`}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <div className="grid sm:grid-cols-3 gap-3 lg:gap-4">
                {jobCards.map((job, idx) => (
                  <Card key={idx} className={`p-2 lg:p-3 ${job.color} border-none`}>
                    <h4 className="font-bold text-sm lg:text-base mb-2 lg:mb-3">{job.title}</h4>
                    <div className="flex gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                      {job.tags.map((tag, i) => (
                        <Badge key={i} className="bg-primary text-white text-[10px] lg:text-xs px-1.5 lg:px-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-base lg:text-lg xl:text-xl font-bold mb-3 lg:mb-4">{job.salary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-1.5 lg:gap-2">
                        <div className="w-7 h-7 lg:w-8 lg:h-8 rounded-full bg-white"></div>
                        <div className="text-[10px] lg:text-xs">
                          <p className="font-semibold">{job.poster}</p>
                          <p className="text-muted-foreground">{job.phone}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-accent text-white border-none text-[10px] lg:text-xs">
                        {job.badges}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
            
            <div className="flex justify-center mt-12 lg:mt-16">
              <img 
                src={featuresCharacter} 
                alt="Features character" 
                className="w-48 lg:w-56 xl:w-64 h-auto object-contain"
              />
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-lg lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4">
              <span className="text-primary">Barter</span> Skills
            </h3>
            
            <Card className="p-2 lg:p-3 bg-gradient-card shadow-lg">
              {barterSkills.map((skill, idx) => (
                <Card key={idx} className="p-2 lg:p-3 hover:shadow-md transition-shadow">
                  {/* Top Section: Profile and Info */}
                  <div className="flex items-start gap-2 lg:gap-3 mb-2">
                    <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-blue flex-shrink-0"></div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs lg:text-sm mb-0.5">{skill.name}</h4>
                      <p className="text-[9px] lg:text-[10px] text-muted-foreground mb-1">{skill.location}</p>
                      <Badge className={`${skill.badgeColor} text-foreground text-[9px] lg:text-[10px] px-1.5`}>
                        {skill.badge}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Instagram className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
                      <Facebook className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
                      <Linkedin className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
                    </div>
                  </div>
                  
                  {/* Barter Exchange Section */}
                  <div className="flex items-center gap-1.5 lg:gap-2 mb-2 p-1.5 lg:p-2 bg-muted/30 rounded-lg">
                    <div className="flex-1 text-center">
                      <p className="text-[9px] lg:text-[10px] text-muted-foreground mb-0.5">Offering</p>
                      <p className="text-[10px] lg:text-xs font-semibold text-primary">{skill.offering}</p>
                    </div>
                    <ArrowLeftRight className="w-4 h-4 lg:w-5 lg:h-5 text-primary flex-shrink-0" />
                    <div className="flex-1 text-center">
                      <p className="text-[9px] lg:text-[10px] text-muted-foreground mb-0.5">Seeking</p>
                      <p className="text-[10px] lg:text-xs font-semibold text-primary">{skill.seeking}</p>
                    </div>
                  </div>
                  
                  {/* Bottom Section: Price and Actions */}
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-[9px] lg:text-[10px] text-muted-foreground mb-0.5">Advertising Price</p>
                      <p className="text-base lg:text-lg font-bold">{skill.price}</p>
                    </div>
                    <div className="flex gap-1 lg:gap-1.5">
                      <Button variant="outline" size="icon" className="h-7 w-7 lg:h-8 lg:w-8 rounded-full">
                        <Heart className="w-3 h-3 lg:w-3.5 lg:h-3.5" />
                      </Button>
                      <Button className="text-[10px] lg:text-xs px-2 lg:px-3 rounded-full">Send message</Button>
                    </div>
                  </div>
                </Card>
              ))}
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;