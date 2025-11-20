"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Clock, DollarSign, Briefcase, X } from "lucide-react";
import Home from "@/components/Home";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/SupabaseClient";
import { useNavigate } from "react-router-dom";

// 1. INTERFACE JOB
interface Job {
  job_id: number;
  job_name: string;
  job_description: string;
  job_maker: string; // Teks identifier pembuat job
  job_partner?: string; // Tambahkan agar dikenali
}

// --- Komponen Modal Barter (TradeModal) ---
// (Dihilangkan untuk fokus pada BrowseJobs, asumsikan ada di file Anda)
interface TradeModalProps {
  job: Job | null;
  onClose: () => void;
}
const TradeModal: React.FC<TradeModalProps> = ({ job, onClose }) => {
  // ... (Implementasi TradeModal) ...
  // NOTE: Anda perlu memastikan komponen ini ada di file Anda atau diimpor.
  return null; // Simulasi
};

// --- Komponen Utama BrowseJobs ---
export default function BrowseJobs() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [error, setError] = useState<string | null>(null);
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);

  // 1. Fetch Data dari Supabase
  useEffect(() => {
    const fetchJobs = async (userEmail: string) => {
      setLoading(true);
      setError(null);

      // 🚨 QUERY DIPERBAIKI: HANYA FILTER job_partner = 'None'
      const { data, error: fetchError } = await supabase
        .from("jobs")
        .select("job_id, job_name, job_description, job_maker, job_partner")
        .eq("job_partner", "None");

      if (fetchError) {
        console.error("Error fetching jobs:", fetchError);
        setError("Failed to fetch jobs: " + fetchError.message);
        setLoading(false);
        return;
      }

      setJobs(data as Job[]);
      setLoading(false);
    };

    // Ambil user email terlebih dahulu
    const checkUserAndFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email;

      // Simpan email user untuk perbandingan di JSX
      setCurrentUserEmail(email || null);

      // Jika user tidak login, kita tetap fetch semua jobs yang statusnya 'None'
      // Namun, jika email ada, gunakan untuk fetch (walaupun filter sudah di database)
      fetchJobs(email || "NO_USER_LOGGED_IN");
    };

    checkUserAndFetch();
  }, []);

  // Filter Logic (menggunakan data dari state jobs)
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.job_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || job.job_maker === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Development", "Design", "Business", "Marketing"];

  // Handler untuk membuka modal barter
  const handleOpenTrade = (job: Job) => {
    if (job.job_maker === currentUserEmail) {
      alert("Anda tidak bisa mengajukan barter untuk pekerjaan Anda sendiri.");
      return;
    }
    if (!currentUserEmail) {
      alert("Anda harus login untuk mengajukan tawaran barter.");
      navigate("/login");
      return;
    }
    setSelectedJob(job);
    setIsModalOpen(true);
  };

  // Jika loading
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Fetching available jobs...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Home />

      {/* --- Trade Modal --- */}
      {isModalOpen && (
        <TradeModal job={selectedJob} onClose={() => setIsModalOpen(false)} />
      )}

      {/* --- Header / Search Section --- */}
      <div className="bg-white border-b pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Work <span className="text-blue-600">@ SkillSwap</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Browse projects available for trade or freelance.
          </p>
        </div>
      </div>

      {/* --- Job Listings Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {error && <p className="text-red-600 mb-4">Error: {error}</p>}

        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            {filteredJobs.length} Available Jobs
          </h2>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => {
            const isMyJob = job.job_maker === currentUserEmail;

            return (
              <div
                key={job.job_id}
                className={`bg-white rounded-xl border ${
                  isMyJob
                    ? "border-indigo-400 shadow-lg"
                    : "border-gray-200 shadow-sm"
                } hover:shadow-md transition-shadow duration-200 flex flex-col`}
              >
                <div className="p-6 flex-grow">
                  {/* 🚨 KONDISI 1: TAMPILKAN LABEL "THIS IS YOURS" */}
                  {isMyJob && (
                    <div className="mb-2 inline-block bg-indigo-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                      This is yours
                    </div>
                  )}

                  {/* Job Title */}
                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {job.job_name}
                  </h3>

                  {/* Price & Client */}
                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="w-4 h-4 mr-1" />
                      Posted by: {job.job_maker}
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.job_description}
                  </p>
                </div>

                {/* Footer Action */}
                <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-center items-center">
                  {/* 🚨 KONDISI 2: DISABLE TOMBOL JIKA ITU PEKERJAAN SENDIRI */}
                  <button
                    onClick={() => handleOpenTrade(job)}
                    disabled={isMyJob || !currentUserEmail}
                    className={`w-full text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                      isMyJob || !currentUserEmail
                        ? "bg-gray-400 cursor-not-allowed"
                        : "bg-green-600 hover:bg-green-700"
                    }`}
                  >
                    <Filter className="w-4 h-4 mr-2" />
                    {isMyJob
                      ? "Cannot Trade Your Own Job"
                      : "Offer Trade/Barter"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2 text-6xl">🔍</div>
            <h3 className="text-lg font-medium text-gray-900">
              No available jobs found
            </h3>
            <p className="text-gray-500">
              There are no open jobs currently available for trade.
            </p>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
