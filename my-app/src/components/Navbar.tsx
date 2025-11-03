"use client";

import { Button } from "@/components/ui/button";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { useState, useEffect } from "react";

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const controlNavbar = () => {
      const currentScrollY = window.scrollY;
      
      // Clear any existing timeout
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
      
      if (currentScrollY < 10) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }
      
      // Set a new timeout to show navbar after 0.3 second of no scrolling
      const timeout = setTimeout(() => {
        setIsVisible(true);
      }, 300);
      
      setScrollTimeout(timeout);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', controlNavbar);
    
    return () => {
      window.removeEventListener('scroll', controlNavbar);
      if (scrollTimeout) {
        clearTimeout(scrollTimeout);
      }
    };
  }, [lastScrollY, scrollTimeout]);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7 lg:w-8 lg:h-8" />
            <div>
              <h1 className="text-lg lg:text-xl font-bold">SkillSwap</h1>
              <p className="text-[10px] lg:text-xs text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-4 lg:gap-6 xl:gap-8">
            <a href="#hero" className="text-sm lg:text-base font-semibold hover:text-primary transition-colors">
              Home
            </a>
            <a href="#different" className="text-sm lg:text-base hover:text-primary transition-colors">
              About
            </a>
            <a href="#features" className="text-sm lg:text-base hover:text-primary transition-colors">
              Features
            </a>
            <a href="#offers" className="text-sm lg:text-base hover:text-primary transition-colors">
              Offers
            </a>
            <a href="#footer" className="text-sm lg:text-base hover:text-primary transition-colors">
              Contact
            </a>
            <Button asChild variant="outline" className="rounded-lg text-sm lg:text-base px-3 lg:px-4 py-1.5 lg:py-2">
              <a href="/home">Home</a>
            </Button>
            <Button asChild className="rounded-lg text-sm lg:text-base px-3 lg:px-4 py-1.5 lg:py-2">
              <a href="/login">Login</a>
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
