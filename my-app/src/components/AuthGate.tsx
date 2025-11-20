import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSession = async () => {
      // 1. Check for an active session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If no session, redirect to login page (unless on a public page)
      if (!session) {
        if (location.pathname !== "/login" && location.pathname !== "/signup" && location.pathname !== "/landing") {
          navigate("/login");
        }
        setIsLoading(false);
        return;
      }
      
      // 2. If a session exists, user should be redirected from auth pages to home.
      // The Home page will handle the "complete profile" reminder.
      if (
        location.pathname === "/login" ||
        location.pathname === "/signup"
      ) {
        navigate("/home");
      }

      setIsLoading(false);
    };

    checkSession();
  }, [location.pathname, navigate]);

  // While checking, show a full-page loading screen
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="space-y-4 w-1/2">
          <h1 className="text-2xl font-bold text-center">
            Loading Your Experience...
          </h1>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  // Once loading is complete, render the requested page content
  return <>{children}</>;
}
