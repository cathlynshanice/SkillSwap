import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Heart, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight, Search, ArrowRight } from "lucide-react";
import ctaCharacter from "@/assets/cta-character.png";

const OffersSection = () => {
  const categories = ["Non-Academic", "UI/UX Design", "Web Development", "Financial", "Business", "Data Science"];
  
  const students = [
    { name: "Student 1", location: "Tangerang, Indonesia", badge: "Art Director", badgeColor: "bg-green-200", price: "$20" },
    { name: "Student 2", location: "Jakarta, Indonesia", badge: "Illustrator", badgeColor: "bg-amber-200", price: "$15" },
    { name: "Student 3", location: "Bekasi, Indonesia", badge: "UI/UX Designer", badgeColor: "bg-blue-200", price: "$8" },
    { name: "Student 4", location: "Bali, Indonesia", badge: "Motion Designer", badgeColor: "bg-amber-200", price: "$12" },
  ];

  return (
    <section id="offers" className="min-h-screen flex items-center py-20 bg-background">
      <div className="container mx-auto px-6">
        <div className="animate-fade-up mb-12">
          <h2 className="text-5xl font-bold mb-8">
            Our <span className="text-primary">Latest Offers!</span>
          </h2>
          
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronLeft className="w-4 h-4" />
            </Button>
            
            <div className="flex flex-wrap gap-2">
              {categories.map((cat, idx) => (
                <Badge 
                  key={idx} 
                  variant={idx === 0 ? "default" : "outline"}
                  className="px-4 py-2 cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {cat}
                </Badge>
              ))}
            </div>
            
            <Button variant="outline" size="icon" className="rounded-full">
              <ChevronRight className="w-4 h-4" />
            </Button>
            
            <div className="ml-auto relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input 
                placeholder="Search other services..." 
                className="pl-10 w-64"
              />
              <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8">
                <Search className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {students.map((student, idx) => (
            <Card 
              key={idx} 
              className="p-6 hover:shadow-xl transition-all animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-3 mb-4">
                <div className="w-14 h-14 rounded-full bg-gradient-blue"></div>
                <div className="flex-1">
                  <h4 className="font-bold">{student.name}</h4>
                  <p className="text-xs text-muted-foreground">{student.location}</p>
                </div>
              </div>
              
              <Badge className={`${student.badgeColor} text-foreground mb-4`}>
                {student.badge}
              </Badge>
              
              <div className="flex items-center gap-3 mb-4">
                <Instagram className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                <Facebook className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
                <Linkedin className="w-4 h-4 cursor-pointer hover:text-primary transition-colors" />
              </div>
              
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-1">Advertising Price</p>
                <p className="text-3xl font-bold">{student.price}</p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" size="icon" className="rounded-full">
                  <Heart className="w-4 h-4" />
                </Button>
                <Button className="flex-1 rounded-full">Send message</Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-blue text-primary-foreground p-12 relative overflow-hidden animate-scale-in">
          <div className="grid lg:grid-cols-2 gap-8 items-center relative z-10">
            <div>
              <h3 className="text-4xl font-bold mb-4">
                Realize Your Projects,
                <br />
                Sharpen Your Talents!
              </h3>
              <div className="flex gap-4">
                <Button variant="secondary" size="lg" className="gap-2">
                  Find a Skill <ArrowRight className="w-4 h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-2 bg-white text-primary hover:bg-white/90">
                  Offer a Skill <ArrowRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <img 
                src={ctaCharacter} 
                alt="CTA character" 
                className="w-80 h-auto object-contain"
              />
            </div>
          </div>
          
          <div className="absolute inset-0 bg-primary/10 rounded-full blur-3xl"></div>
        </Card>
      </div>
    </section>
  );
};

export default OffersSection;
