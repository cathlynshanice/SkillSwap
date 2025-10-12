"use client";

import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
    };
  }, [lastScrollY]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-6 h-6 lg:w-7 lg:h-7 text-primary" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold">SkillSwap</h1>
              <p className="text-[10px] lg:text-xs text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            <a href="#home" className="text-sm lg:text-base font-semibold hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="text-sm lg:text-base hover:text-primary transition-colors">
              About
            </a>
            <a href="#features" className="text-sm lg:text-base hover:text-primary transition-colors">
              Features
            </a>
            <a href="#contacts" className="text-sm lg:text-base hover:text-primary transition-colors">
              Contacts
            </a>
            <a href="#login" className="text-sm lg:text-base hover:text-primary transition-colors">
              Login
            </a>
            <Button className="rounded-lg text-sm lg:text-base px-3 lg:px-4 py-1.5 lg:py-2">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
