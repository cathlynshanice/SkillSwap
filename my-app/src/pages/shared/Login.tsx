"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import microsoftimg from "@/assets/microsoft.png";

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  // 🔐 Email-password login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setError(error.message);
    } else {
      navigate("/");
    }
  };

  // 🪟 Microsoft OAuth login
  const handleMicrosoftLogin = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
        redirectTo: window.location.origin, // after login, go back to app
      },
    });

    if (error) {
      setError(error.message);
    } else {
      // Redirect handled automatically by Supabase
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="flex flex-col justify-center px-10 w-full max-w-md mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Welcome back 👋</h1>
        <p className="text-gray-600 mb-6">Login with your BINUS Microsoft account.</p>

        {/* Microsoft Login */}
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
