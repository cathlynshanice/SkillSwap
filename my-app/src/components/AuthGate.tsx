import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";

export default function AuthGate({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  useEffect(() => {
    const checkProfile = async () => {
      // 1️⃣ Get current user
      const { data: { user } } = await supabase.auth.getUser();
      // if (!user) {
      //   navigate("/");
      //   return;
      // }

      // 2️⃣ Check if profile exists in Supabase
      const { data: profile } = await supabase
        .from("profiles")
        .select("name, nim")
        .eq("id", user.id)
        .single();

      // 3️⃣ Redirect based on profile completeness
      if (!profile || !profile.name || !profile.nim) {
        navigate("/Onboarding");
      } else {
        navigate("/Home");
      }
    };

    checkProfile();
  }, []);

  return <>{children}</>;
}
