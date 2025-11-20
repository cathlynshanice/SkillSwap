import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const performLogout = async () => {
      // Menjalankan fungsi signOut dari Supabase
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Error logging out:", error.message);
        // Jika gagal logout, mungkin arahkan ke halaman error atau home
        navigate("/");
      } else {
        // Jika logout berhasil, arahkan ke halaman login
        // 'replace: true' digunakan agar user tidak bisa kembali ke halaman logout
        // dengan menekan tombol "back" di browser.
        navigate("/login", { replace: true });
      }
    };

    performLogout();
  }, [navigate]);

  // Selama proses logout, tampilkan pesan loading
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="text-center">
        <h1 className="text-2xl font-bold">Logging you out...</h1>
        <p className="text-muted-foreground">Please wait a moment.</p>
      </div>
    </div>
  );
};

export default Logout;
