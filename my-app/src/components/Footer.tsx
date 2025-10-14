
import { Quote, Instagram, Linkedin, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer id="footer" className="bg-background border-t">
      <div className="container mx-auto px-4 lg:px-6 xl:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand Info */}
          <div>
            <div className="flex items-center gap-2">
              <Quote className="w-6 h-6 text-primary" />
              <h1 className="text-lg font-bold">SkillSwap</h1>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              A marketplace for Binusians, by Binusians.
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="font-semibold mb-4">Navigate</h3>
            <ul className="space-y-2">
              <li><a href="#hero" className="text-sm hover:text-primary transition-colors">Home</a></li>
              <li><a href="#different" className="text-sm hover:text-primary transition-colors">About</a></li>
              <li><a href="#features" className="text-sm hover:text-primary transition-colors">Features</a></li>
              <li><a href="#offers" className="text-sm hover:text-primary transition-colors">Offers</a></li>
              <li><a href="#footer" className="text-sm hover:text-primary transition-colors">Contact</a></li>
            </ul>
          </div>

          {/* Socials and Contact */}
          <div>
            <h3 className="font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Instagram /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Twitter /></a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors"><Linkedin /></a>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 flex flex-col md:flex-row justify-between items-center text-center md:text-left">
          <p className="text-xs text-muted-foreground">
            &copy; {new Date().getFullYear()} SkillSwap. All Rights Reserved.
          </p>
          <p className="text-xs text-muted-foreground mt-2 md:mt-0">
            An independent project by students, not officially affiliated with Binus University.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
