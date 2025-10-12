import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Instagram, Facebook, Linkedin } from "lucide-react";
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
    { name: "Lisa Williams", location: "Tangerang, ERP", badge: "Strategy", price: "$452", badgeColor: "bg-amber-200" },
    { name: "Gary Roberts", location: "Service Area, KRIS", badge: "Add Reviewer", price: "$825", badgeColor: "bg-orange-200" },
    { name: "Davit Ozturk", location: "Security, AXIS", badge: "Manager", price: "621", badgeColor: "bg-purple-200" },
  ];

  return (
    <section id="features" className="min-h-screen flex items-center py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="mb-6 lg:mb-8 animate-fade-up">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-2">
            Features
            <div className="h-1 w-24 lg:w-32 bg-primary mt-2"></div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-start">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:mb-6">
              Find Job <span className="text-primary">Opportunities!</span>
            </h3>
            
            <Card className="p-3 lg:p-4 bg-gradient-card shadow-lg">
              <div className="flex gap-2 mb-3 lg:mb-4 overflow-x-auto">
                {categories.map((cat, idx) => (
                  <Badge 
                    key={idx} 
                    variant={idx === 0 ? "default" : "outline"}
                    className={`text-xs lg:text-sm ${idx === 0 ? "bg-accent hover:bg-accent/90" : ""}`}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <div className="grid sm:grid-cols-3 gap-3 lg:gap-4">
                {jobCards.map((job, idx) => (
                  <Card key={idx} className={`p-3 lg:p-4 ${job.color} border-none`}>
                    <h4 className="font-bold text-sm lg:text-base mb-2 lg:mb-3">{job.title}</h4>
                    <div className="flex gap-1.5 lg:gap-2 mb-3 lg:mb-4">
                      {job.tags.map((tag, i) => (
                        <Badge key={i} className="bg-primary text-white text-[10px] lg:text-xs px-1.5 lg:px-2">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-lg lg:text-xl xl:text-2xl font-bold mb-3 lg:mb-4">{job.salary}</p>
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
            
            <div className="flex justify-center mt-4 lg:mt-6">
              <img 
                src={featuresCharacter} 
                alt="Features character" 
                className="w-40 lg:w-48 xl:w-56 h-auto object-contain"
              />
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-4 lg:mb-6">
              <span className="text-primary">Barter</span> Skills
            </h3>
            
            <Card className="p-3 lg:p-4 bg-gradient-card shadow-lg">
              <div className="space-y-2 lg:space-y-3">
                {barterSkills.map((skill, idx) => (
                  <Card key={idx} className="p-3 lg:p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-2 lg:gap-3 mb-2 lg:mb-3">
                      <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-blue"></div>
                      <div className="flex-1">
                        <h4 className="font-bold text-sm lg:text-base">{skill.name}</h4>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">{skill.location}</p>
                      </div>
                    </div>
                    <Badge className={`${skill.badgeColor} text-foreground mb-2 lg:mb-3 text-xs`}>
                      {skill.badge}
                    </Badge>
                    <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                      <Instagram className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <Facebook className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                      <Linkedin className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-[10px] lg:text-xs text-muted-foreground">Advertising Price</p>
                        <p className="text-lg lg:text-xl font-bold">{skill.price}</p>
                      </div>
                      <div className="flex gap-1.5 lg:gap-2">
                        <Button variant="outline" size="icon" className="h-8 w-8 lg:h-9 lg:w-9">
                          <Heart className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                        </Button>
                        <Button className="text-xs lg:text-sm px-3 lg:px-4">Send message</Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
