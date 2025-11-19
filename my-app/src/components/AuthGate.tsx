import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkSessionAndProfile = async () => {
      // 1. Check for an active session
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();

      // If no session, redirect to login page (unless already on a public page)
      if (!session) {
        if (location.pathname !== '/login' && location.pathname !== '/signup') {
          navigate("/login");
        }
        setIsLoading(false);
        return;
      }

      // 2. If session exists, check if a profile has been created
      const { data: profile, error: profileError } = await supabase
        .from("profiles")
        .select("student_id") // We only need to check for the existence of one required field
        .eq("id", session.user.id)
        .single();

      // If there's an error (other than 'PGRST116' which means no rows found), log it
      if (profileError && profileError.code !== 'PGRST116') {
        console.error("Error fetching profile:", profileError);
        // Potentially handle this error, e.g., by showing an error page
      }
      
      // 3. Redirect to onboarding if profile is incomplete or doesn't exist
      // and the user is not already on the onboarding page.
      if (!profile || !profile.student_id) {
        if (location.pathname !== "/onboarding") {
          navigate("/onboarding");
        }
        setIsLoading(false);
      } else {
        // 4. If profile is complete, but user is on a public/auth page, redirect to home
        if (location.pathname === "/login" || location.pathname === "/signup" || location.pathname === "/onboarding") {
          navigate("/home");
        }
        // Otherwise, the profile is complete and they are on a protected page, so just show the content
        setIsLoading(false);
      }
    };

    checkSessionAndProfile();
  }, [location.pathname, navigate]);

  // While checking, show a full-page loading screen
  if (isLoading) {
    return (
      <div className="h-screen w-screen flex items-center justify-center">
        <div className="space-y-4 w-1/2">
            <h1 className="text-2xl font-bold text-center">Loading Your Experience...</h1>
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
