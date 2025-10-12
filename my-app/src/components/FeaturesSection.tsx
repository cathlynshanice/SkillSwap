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
    <section id="features" className="min-h-screen flex items-center py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="mb-12 animate-fade-up">
          <h2 className="text-5xl font-bold mb-2">
            Features
            <div className="h-1 w-32 bg-primary mt-2"></div>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <div className="animate-fade-up" style={{ animationDelay: "0.1s" }}>
            <h3 className="text-4xl font-bold mb-8">
              Find Job <span className="text-primary">Opportunities!</span>
            </h3>
            
            <Card className="p-6 bg-gradient-card shadow-lg">
              <div className="flex gap-2 mb-6 overflow-x-auto">
                {categories.map((cat, idx) => (
                  <Badge 
                    key={idx} 
                    variant={idx === 0 ? "default" : "outline"}
                    className={idx === 0 ? "bg-accent hover:bg-accent/90" : ""}
                  >
                    {cat}
                  </Badge>
                ))}
              </div>
              
              <div className="grid sm:grid-cols-3 gap-4">
                {jobCards.map((job, idx) => (
                  <Card key={idx} className={`p-4 ${job.color} border-none`}>
                    <h4 className="font-bold text-lg mb-3">{job.title}</h4>
                    <div className="flex gap-2 mb-4">
                      {job.tags.map((tag, i) => (
                        <Badge key={i} className="bg-primary text-white text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <p className="text-2xl font-bold mb-4">{job.salary}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-full bg-white"></div>
                        <div className="text-xs">
                          <p className="font-semibold">{job.poster}</p>
                          <p className="text-muted-foreground">{job.phone}</p>
                        </div>
                      </div>
                      <Badge variant="outline" className="bg-accent text-white border-none">
                        {job.badges}
                      </Badge>
                    </div>
                  </Card>
                ))}
              </div>
            </Card>
            
            <div className="flex justify-center mt-8">
              <img 
                src={featuresCharacter} 
                alt="Features character" 
                className="w-64 h-auto object-contain"
              />
            </div>
          </div>

          <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
            <h3 className="text-4xl font-bold mb-8">
              <span className="text-primary">Barter</span> Skills
            </h3>
            
            <Card className="p-6 bg-gradient-card shadow-lg">
              <div className="space-y-4">
                {barterSkills.map((skill, idx) => (
                  <Card key={idx} className="p-4 hover:shadow-md transition-shadow">
                    <div className="flex items-start gap-3 mb-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-blue"></div>
                      <div className="flex-1">
                        <h4 className="font-bold">{skill.name}</h4>
                        <p className="text-xs text-muted-foreground">{skill.location}</p>
                      </div>
                    </div>
                    <Badge className={`${skill.badgeColor} text-foreground mb-3`}>
                      {skill.badge}
                    </Badge>
                    <div className="flex items-center gap-3 mb-3">
                      <Instagram className="w-4 h-4" />
                      <Facebook className="w-4 h-4" />
                      <Linkedin className="w-4 h-4" />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-xs text-muted-foreground">Advertising Price</p>
                        <p className="text-xl font-bold">{skill.price}</p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="icon">
                          <Heart className="w-4 h-4" />
                        </Button>
                        <Button>Send message</Button>
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
