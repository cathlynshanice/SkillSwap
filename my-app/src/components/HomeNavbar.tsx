"use client";

import { Button } from "@/components/ui/button";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { useState, useEffect } from "react";
import { Search, HelpCircle, Bell, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useNavigate } from "react-router-dom";
import { setUserRole } from "@/lib/userContext";

const HomeNavbar = () => {
  const navigate = useNavigate();
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
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-2.5">
        <div className="flex items-center justify-between gap-8">
          {/* Left Section - Logo and Main Navigation */}
          <div className="flex items-center gap-4">
            {/* Logo */}
            <a href="/landing" className="flex items-center gap-2 flex-shrink-0">
              <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
              <span className="text-lg font-bold hidden sm:block">SkillSwap</span>
            </a>
            
            {/* Main Navigation Links */}
            <div className="hidden md:flex items-center gap-6">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary transition-all duration-200 hover:[text-shadow:_0_0_0.5px_currentColor,_0_0_0.5px_currentColor]">
                    Find Work
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>Browse Jobs</DropdownMenuItem>
                  <DropdownMenuItem>Saved Jobs</DropdownMenuItem>
                  <DropdownMenuItem>Proposals</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary transition-all duration-200 hover:[text-shadow:_0_0_0.5px_currentColor,_0_0_0.5px_currentColor]">
                    Deliver Work
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-48">
                  <DropdownMenuItem>My Jobs</DropdownMenuItem>
                  <DropdownMenuItem>All Contracts</DropdownMenuItem>
                  <DropdownMenuItem>Work Diary</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              <Button variant="ghost" className="text-sm font-medium hover:bg-transparent hover:text-primary transition-all duration-200 hover:[text-shadow:_0_0_0.5px_currentColor,_0_0_0.5px_currentColor]" asChild>
                <a href="/messages">Messages</a>
              </Button>
            </div>
          </div>

          {/* Right Section - Actions */}
          <div className="flex items-center gap-2">
            {/* Help Button */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent hover:text-primary transition-transform duration-200 hover:scale-110" title="Help">
              <HelpCircle className="h-5 w-5" />
            </Button>

            {/* Notifications */}
            <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent hover:text-primary transition-transform duration-200 hover:scale-110" title="Notifications">
              <Bell className="h-5 w-5" />
            </Button>

            {/* Profile Sidebar */}
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full hover:bg-transparent hover:text-primary transition-transform duration-200 hover:scale-110 p-0">
                  <div className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-80 sm:w-96">
                <SheetHeader>
                  <SheetTitle>My Account</SheetTitle>
                  <SheetDescription>
                    Complete your profile to get started
                  </SheetDescription>
                </SheetHeader>
                
                {/* Profile Info - Empty State */}
                <div className="mt-6 flex items-center gap-4 pb-6 border-b">
                  <div className="h-16 w-16 rounded-full bg-gray-300 dark:bg-gray-600"></div>
                  <div>
                    <h3 className="font-semibold text-lg text-muted-foreground">No name set</h3>
                    <p className="text-sm text-muted-foreground">Add your profile info</p>
                  </div>
                </div>

                {/* Menu Items */}
                <div className="mt-6 space-y-1">
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left hover:bg-accent"
                    onClick={() => {
                      setUserRole("buyer");
                      navigate("/profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Buyer Profile
                  </Button>
                  <Button 
                    variant="ghost" 
                    className="w-full justify-start text-left hover:bg-accent"
                    onClick={() => {
                      setUserRole("seller");
                      navigate("/seller-profile");
                    }}
                  >
                    <User className="mr-2 h-4 w-4" />
                    Seller Profile
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-accent" asChild>
                    <a href="/settings">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      Settings
                    </a>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start text-left hover:bg-accent" asChild>
                    <a href="/stats">
                      <Bell className="mr-2 h-4 w-4" />
                      My Stats
                    </a>
                  </Button>
                </div>

                {/* Logout Button */}
                <div className="absolute bottom-6 left-6 right-6">
                  <Button variant="destructive" className="w-full" asChild>
                    <a href="/logout">Logout</a>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default HomeNavbar;
