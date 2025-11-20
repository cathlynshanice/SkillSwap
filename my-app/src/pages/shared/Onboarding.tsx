"use client";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/lib/SupabaseClient";

export default function OnboardingPage() {
  const navigate = useNavigate();
  
  // State for form fields
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [email, setEmail] = useState(""); // This will be pre-filled and read-only
  const [secondaryEmail, setSecondaryEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [major, setMajor] = useState("");
  const [semester, setSemester] = useState("");
  const [campus, setCampus] = useState("");
  const [location, setLocation] = useState("");
  const [languages, setLanguages] = useState("");
  const [bio, setBio] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch the user's primary email when the component mounts
  useEffect(() => {
    const fetchUserEmail = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        setEmail(user.email || "");
      } else {
        setError("User not authenticated. Please log in again.");
      }
    };
    fetchUserEmail();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
      setError("User not authenticated");
      setLoading(false);
      return;
    }

    // The 'email' field is removed from this object because it does not exist in the 'profiles' table.
    const { error } = await supabase.from("profiles").upsert({
      id: user.id,
      name,
      student_id: studentId,
      secondary_email: secondaryEmail || null,
      phone,
      major,
      semester,
      campus,
      location,
      languages: languages.split(",").map((lang) => lang.trim()).filter(Boolean),
      bio,
      updated_at: new Date().toISOString(),
    });

    setLoading(false);

    if (error) {
      setError(error.message);
    }
    else {
      navigate("/home");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-8">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h1 className="text-2xl font-bold mb-2 text-gray-800">Complete Your Profile</h1>
        <p className="text-gray-600 mb-6">
          Let's personalize your SkillSwap experience.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          {/* Basic Information Section */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg text-gray-700">Basic Information</h3>
            
            <input
              type="text"
              placeholder="Full Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <input
              type="text"
              placeholder="Student ID / NIM *"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            {/* Primary Email is now read-only as it's the login identifier */}
            <div>
              <label className="text-sm font-medium text-gray-600">Primary Email (from login)</label>
              <input
                type="email"
                placeholder="Primary Email *"
                value={email}
                readOnly
                className="border rounded-lg p-2.5 w-full bg-gray-100 cursor-not-allowed mt-1"
              />
            </div>
            
            <input
              type="email"
              placeholder="Secondary Email (optional)"
              value={secondaryEmail}
              onChange={(e) => setSecondaryEmail(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            
            <input
              type="tel"
              placeholder="Phone Number *"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Academic Information Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg text-gray-700">Academic Information</h3>
            
            <input
              type="text"
              placeholder="Major / Program *"
              value={major}
              onChange={(e) => setMajor(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <input
              type="text"
              placeholder="Current Semester (e.g., Semester 3) *"
              value={semester}
              onChange={(e) => setSemester(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <input
              type="text"
              placeholder="Campus / Location *"
              value={campus}
              onChange={(e) => setCampus(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          {/* Location & Language Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg text-gray-700">Location & Language</h3>
            
            <input
              type="text"
              placeholder="City / Location *"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
            
            <input
              type="text"
              placeholder="Languages Spoken (comma separated, e.g., English, Indonesian)"
              value={languages}
              onChange={(e) => setLanguages(e.target.value)}
              className="border rounded-lg p-2.5 w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* About Section */}
          <div className="space-y-4 pt-4 border-t">
            <h3 className="font-semibold text-lg text-gray-700">About You</h3>
            
            <textarea
              placeholder="Short bio (tell others about yourself)"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="border rounded-lg p-2.5 w-full h-24 resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              <p className="text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium disabled:opacity-50 disabled:cursor-not-allowed mt-2"
          >
            {loading ? "Saving..." : "Save & Continue"}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            * Required fields
          </p>
        </form>
      </div>
    </div>
  );
}
