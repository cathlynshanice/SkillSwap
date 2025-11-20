import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setIsLoading(false);

      const publicRoutes = ["/login", "/signup", "/landing", "/"];

      if (session) {
        // --- USER IS SIGNED IN ---
        // If user is on a public/auth page, redirect them to the home page.
        if (publicRoutes.includes(location.pathname)) {
          navigate("/home", { replace: true });
        }
      } else {
        // --- USER IS NOT SIGNED IN ---
        const isPublicRoute = ["/login", "/signup", "/landing"].includes(location.pathname);
        // If user is on a protected route (and not on a public one or root), redirect to login.
        if (!isPublicRoute && location.pathname !== "/") {
          navigate("/login", { replace: true });
        }
        // If user is at the root, explicitly send them to the landing page.
        if (location.pathname === "/") {
          navigate("/landing", { replace: true });
        }
      }
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      subscription?.unsubscribe();
    };
  }, [location.pathname, navigate]);

  // While the initial auth check is running, show a full-page loading screen.
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="space-y-4 w-1/2">
          <h1 className="text-2xl font-bold text-center">
            Securing your session...
          </h1>
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
