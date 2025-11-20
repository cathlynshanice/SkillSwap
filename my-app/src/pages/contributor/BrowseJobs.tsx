"use client";
import { useState, useEffect } from "react";
import { Search, Filter, Clock, DollarSign, Briefcase, X } from "lucide-react";
import Home from "@/components/Home"; // Pastikan path ini benar sesuai struktur project Anda
import Footer from "@/components/Footer"; // Pastikan path ini benar
import { supabase } from "@/lib/SupabaseClient";
import { useNavigate } from "react-router-dom";

// 1. INTERFACE JOB
interface Job {
  job_id: number;
  job_name: string;
  job_description: string;
  job_maker: string;
  job_partner?: string;
}

// --- 2. KOMPONEN MODAL BARTER (TradeModal) - IMPLEMENTASI PENUH ---
interface TradeModalProps {
  job: Job | null;
  onClose: () => void;
}

const TradeModal: React.FC<TradeModalProps> = ({ job, onClose }) => {
  const [tradeOffer, setTradeOffer] = useState("");
  const [tradeDesc, setTradeDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  // add this new state
  const [authLoading, setAuthLoading] = useState(true);

  // Ambil data user saat modal terbuka
  useEffect(() => {
    const fetchUser = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      setCurrentUser(user);
      if (!user) {
        setError("Please log in to submit a trade request.");
      }
      // i also added this line
      setAuthLoading(false);
    };
    fetchUser();
  }, []);

  // Fungsi Submit Barter ke Database
  const handleTradeSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!job || !currentUser) {
      setError("Authentication error. Please refresh and try again.");
      return;
    }

    setLoading(true);
    setError(null);

    const requesterIdentifier = currentUser.email || currentUser.id;

    const { error: insertError } = await supabase
      .from("job_trade_request")
      .insert({
        job_id: job.job_id,
        job_maker: job.job_maker,
        job_requester: requesterIdentifier,
        job_requester_description: `TAWARAN: ${tradeOffer}. DESKRIPSI: ${tradeDesc}`,
      });

    setLoading(false);

    if (insertError) {
      console.error("Trade request failed:", insertError);
      setError(`Failed to send request: ${insertError.message}.`);
    } else {
      alert(`Tawaran barter untuk "${job.job_name}" berhasil dikirim!`);
      onClose();
    }
  };

  if (!job) return null;

  // Tampilkan spinner atau null saat sedang mengecek status login
  if (authLoading) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white p-4 rounded-lg shadow-lg">
          <p>Checking authentication...</p>
        </div>
      </div>
    );
  }

  // Jika user belum login
  if (!currentUser) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 text-center">
          <h2 className="text-xl font-bold text-red-600 mb-3">
            Login Required
          </h2>
          <p className="text-gray-700">
            Anda harus login untuk mengajukan tawaran barter.
          </p>
          <button
            onClick={onClose}
            className="mt-4 bg-gray-200 py-2 px-4 rounded hover:bg-gray-300"
          >
            Tutup
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg p-6 relative">
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b pb-3 mb-4">
          <h2 className="text-xl font-bold text-gray-800 pr-8">
            🤝 Barter for: <span className="text-blue-600">{job.job_name}</span>
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 absolute top-6 right-6"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 p-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleTradeSubmit} className="space-y-4">
          <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
            Mengajukan tawaran sebagai:{" "}
            <span className="font-semibold">{currentUser.email}</span>
          </p>

          <div>
            <label
              htmlFor="tradeOffer"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Pekerjaan/Jasa yang Ditawarkan
            </label>
            <input
              id="tradeOffer"
              type="text"
              value={tradeOffer}
              onChange={(e) => setTradeOffer(e.target.value)}
              placeholder="Contoh: Desain CV, Bantuan Coding Python"
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label
              htmlFor="tradeDesc"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Deskripsi Detail
            </label>
            <textarea
              id="tradeDesc"
              value={tradeDesc}
              onChange={(e) => setTradeDesc(e.target.value)}
              rows={3}
              placeholder="Jelaskan detail apa yang Anda tawarkan."
              className="mt-1 block w-full border border-gray-300 rounded-lg shadow-sm p-3 resize-none focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-green-600 text-white py-2.5 rounded-lg font-semibold hover:bg-green-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Sending Request..." : "Kirim Tawaran Barter"}
          </button>
        </form>
      </div>
    </div>
  );
};

// --- 3. KOMPONEN UTAMA BrowseJobs ---
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

  // Fetch Data
  useEffect(() => {
    const fetchJobs = async (userEmail: string) => {
      setLoading(true);
      setError(null);

      // Ambil jobs yang belum punya partner ('None')
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

    const checkUserAndFetch = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      const email = user?.email;

      setCurrentUserEmail(email || null);
      fetchJobs(email || "NO_USER_LOGGED_IN");
    };

    checkUserAndFetch();
  }, []);

  // Filter Logic
  const filteredJobs = jobs.filter((job) => {
    const matchesSearch =
      job.job_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.job_description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "All" || job.job_maker === selectedCategory;

    return matchesSearch && matchesCategory;
  });

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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700 animate-pulse">
          Fetching available jobs...
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Home />

      {/* TAMPILKAN MODAL JIKA OPEN */}
      {isModalOpen && (
        <TradeModal job={selectedJob} onClose={() => setIsModalOpen(false)} />
      )}

      {/* Header */}
      <div className="bg-white border-b pt-24 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Find Work <span className="text-blue-600">@ SkillSwap</span>
          </h1>
          <p className="text-gray-600 max-w-2xl">
            Browse projects available for trade or freelance.
          </p>

          {/* Search Bar */}
          <div className="mt-6 relative max-w-xl">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Search jobs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Job Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex-grow w-full">
        {error && (
          <p className="text-red-600 mb-4 bg-red-50 p-3 rounded">{error}</p>
        )}

        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-700">
            {filteredJobs.length} Available Jobs
          </h2>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => {
            const isMyJob = job.job_maker === currentUserEmail;

            return (
              <div
                key={job.job_id}
                className={`bg-white rounded-xl border ${
                  isMyJob
                    ? "border-indigo-400 shadow-lg ring-1 ring-indigo-100"
                    : "border-gray-200 shadow-sm"
                } hover:shadow-md transition-all duration-200 flex flex-col h-full`}
              >
                <div className="p-6 flex-grow">
                  {/* Label "This is yours" */}
                  {isMyJob && (
                    <div className="mb-3 inline-flex items-center bg-indigo-100 text-indigo-700 text-xs font-bold px-3 py-1 rounded-full">
                      <span className="w-2 h-2 bg-indigo-500 rounded-full mr-2"></span>
                      This is yours
                    </div>
                  )}

                  <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                    {job.job_name}
                  </h3>

                  <div className="flex flex-col gap-1 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Briefcase className="w-4 h-4 mr-1" />
                      Posted by:{" "}
                      <span className="ml-1 text-gray-700 font-medium truncate max-w-[150px]">
                        {job.job_maker}
                      </span>
                    </div>
                  </div>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                    {job.job_description}
                  </p>
                </div>

                <div className="p-4 border-t bg-gray-50 rounded-b-xl">
                  <button
                    onClick={() => handleOpenTrade(job)}
                    disabled={isMyJob || !currentUserEmail}
                    className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors flex items-center justify-center ${
                      isMyJob || !currentUserEmail
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-green-600 text-white hover:bg-green-700 shadow-sm"
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

        {filteredJobs.length === 0 && (
          <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300 mt-4">
            <div className="text-gray-300 mb-3">
              <Briefcase className="w-16 h-16 mx-auto" />
            </div>
            <h3 className="text-lg font-medium text-gray-900">
              No available jobs found
            </h3>
            <p className="text-gray-500 max-w-sm mx-auto mt-1">
              There are no open jobs matching your search criteria available for
              trade right now.
            </p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
