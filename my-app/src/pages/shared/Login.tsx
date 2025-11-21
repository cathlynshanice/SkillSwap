"use client";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";
import microsoftimg from "@/assets/microsoft.png";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function LoginPage() {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const handleMicrosoftLogin = async () => {
    setError("");
    await supabase.auth.signInWithOAuth({
      provider: "azure",
      options: {
        scopes: "email",
        redirectTo: window.location.origin,
        prompt: "select_account",
      } as any,
    });
  };

  return (
    <div className="flex min-h-screen bg-white">
      <div className="relative flex flex-col justify-center px-10 w-full max-w-md mx-auto">
        <div className="relative mb-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/landing")}
            className="absolute top-1/2 -translate-y-1/2 -left-14 hover:bg-gray-200"
          >
            <ArrowLeft className="h-6 w-6 text-gray-800" />
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">
            Welcome back 👋
          </h1>
        </div>
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
