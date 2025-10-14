import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import ChatPopup from "./ChatPopup";
import { Heart, Instagram, Facebook, Linkedin, ChevronLeft, ChevronRight, Search, ArrowRight } from "lucide-react";
import React, { useState } from "react";

const OffersSection = () => {
  const [activeStudent, setActiveStudent] = useState<any>(null);
  const currentUser = { name: "You" }; 
  const categories = ["Non-Academic", "UI/UX Design", "Web Development", "Financial", "Business", "Data Science"];
  

  const students = [
    { name: "Student 1", location: "Tangerang, Indonesia", badge: "Art Director", badgeColor: "bg-green-200", price: "Rp 300.000" },
    { name: "Student 2", location: "Jakarta, Indonesia", badge: "Illustrator", badgeColor: "bg-amber-200", price: "Rp 225.000" },
    { name: "Student 3", location: "Bekasi, Indonesia", badge: "UI/UX Designer", badgeColor: "bg-blue-200", price: "Rp 120.000" },
    { name: "Student 4", location: "Bali, Indonesia", badge: "Motion Designer", badgeColor: "bg-amber-200", price: "Rp 180.000" },
  ];

  return (
    <section id="offers" className="min-h-screen flex items-center py-20 lg:py-24 bg-background">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 max-w-6xl">
        <div className="animate-fade-up mb-4 lg:mb-6">
          <h2 className="text-xl lg:text-2xl xl:text-3xl font-bold mb-3 lg:mb-4">
            Our <span className="text-primary">Latest Offers!</span>
          </h2>
          
          <div className="flex flex-wrap items-center gap-2 lg:gap-3 mb-3 lg:mb-4">
            <Button variant="outline" size="icon" className="rounded-full h-8 w-8 lg:h-10 lg:w-10">
              <ChevronLeft className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
            </Button>
            
            <div className="flex flex-wrap gap-1.5 lg:gap-2">
              {categories.map((cat, idx) => (
                <Badge 
                  key={idx} 
                  variant={idx === 0 ? "default" : "outline"}
                  className="px-2 lg:px-3 py-0.5 lg:py-1 text-[10px] lg:text-xs cursor-pointer hover:bg-primary hover:text-primary-foreground transition-colors"
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-4 mb-4 lg:mb-6">
          {students.map((student, idx) => (
            <Card 
              key={idx} 
              className="p-2 lg:p-3 hover:shadow-xl transition-all animate-fade-up"
              style={{ animationDelay: `${idx * 0.1}s` }}
            >
              <div className="flex items-start gap-2 lg:gap-3 mb-2 lg:mb-3">
                <div className="w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-gradient-blue"></div>
                <div className="flex-1">
                  <h4 className="font-bold text-sm lg:text-base">{student.name}</h4>
                  <p className="text-[10px] lg:text-xs text-muted-foreground">{student.location}</p>
                </div>
              </div>
              
              <Badge className={`${student.badgeColor} text-foreground mb-2 lg:mb-3 text-xs`}>
                {student.badge}
              </Badge>
              
              <div className="flex items-center gap-2 lg:gap-3 mb-2 lg:mb-3">
                <Instagram className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
                <Facebook className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
                <Linkedin className="w-3 h-3 lg:w-3.5 lg:h-3.5 cursor-pointer hover:text-primary transition-colors" />
              </div>
              
              <div className="mb-2 lg:mb-3">
                <p className="text-[10px] lg:text-xs text-muted-foreground mb-0.5">Advertising Price</p>
                <p className="text-lg lg:text-xl font-bold">{student.price}</p>
              </div>
              
              <div className="flex gap-1.5 lg:gap-2">
                <Button variant="outline" size="icon" className="rounded-full h-8 w-8 lg:h-9 lg:w-9">
                  <Heart className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button className="flex-1 rounded-full text-xs lg:text-sm"
                onClick={() => setActiveStudent(student)}
                >
                  Send message
                </Button>
              </div>
            </Card>
          ))}
        </div>

        <Card className="bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300 text-white px-3 lg:px-4 xl:px-5 py-6 lg:py-8 xl:py-10 relative overflow-hidden animate-scale-in border-none">
          <div className="relative z-10 pl-4 lg:pl-6 xl:pl-8">
            <div>
              <h3 className="text-base lg:text-lg xl:text-xl font-bold mb-4 lg:mb-5">
                Realize Your Projects,
                <br />
                Sharpen Your Talents!
              </h3>
              <div className="flex gap-2 lg:gap-3">
                <Button variant="secondary" size="lg" className="gap-1.5 lg:gap-2 text-xs lg:text-sm px-3 lg:px-4 bg-white text-blue-600 hover:bg-white/90">
                  Find a Skill <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
                <Button variant="outline" size="lg" className="gap-1.5 lg:gap-2 bg-white text-blue-600 hover:bg-white/90 border-white text-xs lg:text-sm px-3 lg:px-4">
                  Offer a Skill <ArrowRight className="w-3.5 h-3.5 lg:w-4 lg:h-4" />
                </Button>
              </div>
            </div>
          </div>
          
          <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-blue-400/30 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-blue-300/20 rounded-full blur-3xl"></div>
        </Card>
      </div>
      {activeStudent && (
        <ChatPopup 
        student={activeStudent}
        onClose={() => setActiveStudent(null)}
        currentUser={currentUser}
        />
      )}
    </section>
  );
};

export default OffersSection;
