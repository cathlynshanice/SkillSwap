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
    <section id="offers" className="min-h-screen flex items-center py-12 lg:py-16 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8">
        <div className="animate-fade-up mb-6 lg:mb-8">
          <h2 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6">
            Our <span className="text-primary">Latest Offers!</span>
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-4 lg:mb-6">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 lg:h-10 lg:w-10">
              <ChevronLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Button>
            
            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {categories.map((cat, idx) => (
                <Badge 
                  key={idx} 
                  variant={idx === 0 ? "default" : "outline"}
                  className="px-2.5 lg:px-4 py-1 lg:py-2 text-xs lg:text-sm cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
                >
                  {cat}
                </Badge>
              ))}
            </div>
            
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 lg:h-10 lg:w-10">
              <ChevronRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Button>
            
            <div className="ml-auto relative">
              <Search className="absolute left-2.5 lg:left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 lg:w-4 lg:h-4 text-muted-foreground" />
              <Input 
                placeholder="Search other services..." 
                className="pl-8 lg:pl-10 w-48 lg:w-64 text-xs lg:text-sm h-9 lg:h-10"
              />
              <Button size="icon" className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7 lg:h-8 lg:w-8">
                <Search className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
              </Button>
            </div>
          </div>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-6 lg:mb-8">
          {students.map((student, idx) => (
            <Card 
              key={idx} 
              className="p-3 lg:p-4 hover:shadow-xl transition-all animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-2 lg:gap-3 mb-2 lg:mb-3">
                <div className="w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-gradient-blue"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm lg:text-base">{student.name}</h4>
                  <p className="text-[10px] lg:text-xs text-muted-foreground">{student.location}</p>
                </div>
              </div>
              
              <Badge className={`${student.badgeColor} text-foreground mb-2 lg:mb-3 text-xs`}>
                {student.badge}
              </Badge>
              
              <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                <Instagram className="w-3.5 h-3.5 lg:w-4 lg:h-4 cursor-pointer hover:text-primary transition-colors" />
                <Facebook className="w-3.5 h-3.5 lg:w-4 lg:h-4 cursor-pointer hover:text-primary transition-colors" />
                <Linkedin className="w-3.5 h-3.5 lg:w-4 lg:h-4 cursor-pointer hover:text-primary transition-colors" />
              </div>
              
              <div className="mb-2 lg:mb-3">
                <p className="text-[10px] lg:text-xs text-muted-foreground mb-0.5">Advertising Price</p>
                <p className="text-2xl lg:text-3xl font-bold">{student.price}</p>
              </div>
              
              <div className="flex gap-1.5 lg:gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 lg:h-9 lg:w-9">
                  <Heart className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button className="flex-1 rounded-full text-xs lg:text-sm">Send message</Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-blue text-primary-foreground p-4 lg:p-6 xl:p-8 relative overflow-hidden animate-scale-in">
          <div className="grid lg:grid-cols-2 gap-4 lg:gap-6 items-center relative z-10">
            <div>
              <h3 className="text-2xl lg:text-3xl xl:text-4xl font-bold mb-2 lg:mb-3">
                Realize Your Projects,
                <br />
                Sharpen Your Talents!
              </h3>
              <div className="flex gap-2 lg:gap-3">
                <Button variant="secondary" size="lg" className="gap-1.5 lg:gap-2 text-xs lg:text-sm px-3 lg:px-4">
                  Find a Skill <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-1.5 lg:gap-2 bg-white text-primary hover:bg-white/90 text-xs lg:text-sm px-3 lg:px-4">
                  Offer a Skill <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </div>
            
            <div className="flex justify-end">
              <img 
                src={ctaCharacter} 
                alt="CTA character" 
                className="w-48 lg:w-60 xl:w-72 h-auto object-contain"
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
