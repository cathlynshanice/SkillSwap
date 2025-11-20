"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { useNavigate } from "react-router-dom";
import HomeNavbar from "@/components/HomeNavbar";
import Footer from "@/components/Footer";

const CreateJobs = () => {
  const navigate = useNavigate();
  // State untuk menyimpan data user
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // State untuk form input job
  const [jobName, setJobName] = useState("");
  const [jobDesc, setJobDesc] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Fungsi untuk mendapatkan user yang sedang login
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user: currentUser },
        error: authError,
      } = await supabase.auth.getUser();

      if (authError) {
        setError("Error fetching user session: " + authError.message);
        navigate("/login");
        return;
      }

      if (!currentUser) {
        navigate("/login");
        return;
      }

      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, [navigate]);

  // Fungsi untuk handle submit pembuatan job
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!user) {
      setError("User not authenticated. Please log in.");
      return;
    }

    if (!jobName || !jobDesc) {
      setError("Job Name and Description are required.");
      return;
    }

    // Tentukan nilai job_maker (menggunakan email untuk kemudahan)
    const jobMakerIdentifier = user.email || user.id;

    const { error: insertError } = await supabase.from("jobs").insert([
      {
        // MAPPING KOLOM KE NAMA YANG BENAR DI DATABASE
        job_name: jobName,
        job_description: jobDesc,
        job_maker: jobMakerIdentifier, // Menggunakan email atau ID user
      },
    ]);

    if (insertError) {
      // Cek apakah error karena RLS (Row Level Security)
      if (insertError.code === "42501") {
        setError(
          "Permission Denied. Pastikan Row Level Security (RLS) pada tabel 'jobs' sudah diatur untuk mengizinkan insert data."
        );
      } else {
        setError("Error creating job: " + insertError.message);
      }
    } else {
      setSuccess(`Job "${jobName}" created successfully!`);
      // Reset form
      setJobName("");
      setJobDesc("");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading user session...</p>
      </div>
    );
  }

  // Tampilkan jika user sudah login
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between gap-20">
      <div>
        <HomeNavbar />
      </div>
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-3xl font-bold mb-4 text-gray-800">
          💼 Create New Job Post
        </h1>

        {/* Informasi Akun User */}
        <div className="mb-8 p-4 bg-blue-50 border-l-4 border-blue-400 text-blue-800 rounded-lg">
          <p className="font-semibold text-lg">
            Maker :
            <span className="ml-2 font-normal text-blue-600">{user.email}</span>
          </p>
          {/* <p className="text-sm">User ID: {user.id}</p> */}
        </div>

        {/* Notifikasi Error/Success */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4">
            {success}
          </div>
        )}

        {/* Form Create Jobs */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="jobName"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Title / Name You Need
            </label>
            <input
              id="jobName"
              type="text"
              value={jobName}
              onChange={(e) => setJobName(e.target.value)}
              placeholder="e.g., UI/UX Design for Mobile App"
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="jobDesc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Job Description
            </label>
            <textarea
              id="jobDesc"
              value={jobDesc}
              onChange={(e) => setJobDesc(e.target.value)}
              rows={5}
              placeholder="Describe the tasks, required skills, and expected deliverables."
              className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-3 focus:ring-blue-500 focus:border-blue-500 resize-none"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-150"
          >
            Post Job
          </button>
        </form>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default CreateJobs;
