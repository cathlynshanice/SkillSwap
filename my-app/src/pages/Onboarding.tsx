"use client";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";

export default function OnboardingPage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [nim, setNim] = useState("");
  const [skills, setSkills] = useState("");
  const [bio, setBio] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      nim,
      skills: skills.split(",").map((s) => s.trim()),
      bio,
    });

    if (error) setError(error.message);
    else navigate("/home");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Complete Your Profile</h1>
        <p className="text-gray-600 mb-6">
          Let’s personalize your SkillSwap experience.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="NIM"
            value={nim}
            onChange={(e) => setNim(e.target.value)}
            className="border rounded-lg p-2"
            required
          />
          <input
            type="text"
            placeholder="Your skills (comma separated)"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            className="border rounded-lg p-2"
          />
          <textarea
            placeholder="Short bio (tell others about yourself)"
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="border rounded-lg p-2 h-24 resize-none"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            className="bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition"
          >
            Save & Continue
          </button>
        </form>
      </div>
    </div>
  );
}
