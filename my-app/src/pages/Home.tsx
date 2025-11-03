import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Home = () => {
  const [showReminder, setShowReminder] = useState(true);
  const isProfileIncomplete = true; // Nanti bisa diganti dengan logic cek dari database

  return (
    <div className="min-h-screen bg-background">
      <HomeNavbar />
      
      {/* Reminder Alert - Red Box */}
      {showReminder && isProfileIncomplete && (
        <div className="pt-24 pb-6 flex justify-center px-4">
          <Alert className="bg-red-50 border-red-200 border-l-4 border-l-red-600 rounded-lg max-w-7xl w-full py-3">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-2.5">
                <AlertTriangle className="h-4 w-4 text-red-600 flex-shrink-0" />
                <AlertDescription className="text-red-800 text-sm font-medium m-0 leading-tight">
                  <span className="font-bold">Action required:</span> Complete your profile to access all SkillSwap features.{" "}
                  <a href="/profile" className="underline hover:text-red-900 font-semibold">
                    Get started
                  </a>
                  .
                </AlertDescription>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowReminder(false)}
                className="hover:bg-red-100 text-red-600 opacity-60 hover:opacity-100 h-6 w-6 p-0 flex-shrink-0 transition-opacity"
              >
                <X className="h-3.5 w-3.5" />
              </Button>
            </div>
          </Alert>
        </div>
      )}
      
      {/* Main Content Area */}
      <main className={showReminder && isProfileIncomplete ? "" : "pt-20"}>
        {/* Content will be added here */}
      </main>

      <Footer />
    </div>
  );
};

export default Home;
