"use client";

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import microsoftimg from "@/assets/microsoft.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // ... (useEffect dan handleLogout sama seperti sebelumnya) ...
  useEffect(() => {
    const checkUserAndRedirect = async () => {
      const {
        data: { user: currentUser },
      } = await supabase.auth.getUser();

      if (currentUser) {
        setUser(currentUser);
        setLoading(false);
      } else {
        setLoading(false);
      }
    };

    checkUserAndRedirect();
  }, []);

  // 🪟 Microsoft OAuth login (DIPERBAIKI)
  // 🪟 Microsoft OAuth login
  const handleMicrosoftLogin = async () => {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
        redirectTo: window.location.origin,
        // Fix: Cast the options object to 'any' to bypass TypeScript checking
        prompt: "select_account",
      } as any, // ⬅️ Add 'as any' here
    });
  };

  // 🚪 Fungsi Logout (Sama seperti sebelumnya)
  const handleLogout = async () => {
    setError("");
    const { error } = await supabase.auth.signOut();

    if (error) {
      setError(error.message);
    } else {
      setUser(null);
      // PENTING: Jika halaman saat ini adalah /login, ini akan me-refresh
      navigate("/login");
    }
  };

  // ... (Conditional Rendering sama seperti sebelumnya) ...

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center text-lg bg-white">
        Checking session...
      </div>
    );
  }

  if (user) {
    return (
      <div className="flex min-h-screen bg-white">
        <div className="flex flex-col justify-center px-10 w-full max-w-md mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back 👋
          </h1>
          <h1 className="text-xl font-bold text-green-600 mb-6">
            You are currently logged in as {user.email}
          </h1>

          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-semibold transition"
          >
            Logout from SkillSwap
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center px-10 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Welcome back 👋
        </h1>
        <h1 className="text-2xl font-bold mb-4">Sign In to Continue</h1>

        <p className="text-gray-600 mb-6">
          Login with your BINUS Microsoft account.
        </p>

        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        {/* Microsoft Login dengan opsi 'select_account' */}
        <button
          onClick={handleMicrosoftLogin}
          className="w-full flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg font-semibold mb-4 transition"
        >
          <img src={microsoftimg} alt="Microsoft" className="w-5 h-5" />
          Continue with Microsoft
        </button>
      </div>
    </div>
  );
}
