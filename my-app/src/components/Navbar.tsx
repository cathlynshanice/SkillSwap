import { Button } from "@/components/ui/button";
import { Quote } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Quote className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-2xl font-bold">SkillSwap</h1>
              <p className="text-xs text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="font-semibold hover:text-primary transition-colors">
              Home
            </a>
            <a href="#about" className="hover:text-primary transition-colors">
              About
            </a>
            <a href="#features" className="hover:text-primary transition-colors">
              Features
            </a>
            <a href="#contacts" className="hover:text-primary transition-colors">
              Contacts
            </a>
            <a href="#login" className="hover:text-primary transition-colors">
              Login
            </a>
            <Button className="rounded-lg">Sign Up</Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
