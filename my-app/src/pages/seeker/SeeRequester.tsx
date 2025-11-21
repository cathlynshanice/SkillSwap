"use client";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/SupabaseClient";
import { useNavigate } from "react-router-dom";
import { Mail, Briefcase, UserCheck, X } from "lucide-react";
import Home from "@/components/Home";
import Footer from "@/components/Footer";

interface Job {
  job_id: number;
  job_name: string;
  job_maker: string;
  job_partner?: string;
}
interface Request {
  job_trade_request_id: number; // Gunakan number karena Anda pakai SERIAL
  job_requester: string; // Email/Identifier Requester
  job_requester_description: string;
}

// --- 1. Komponen Modal untuk Menampilkan Requester ---
interface RequesterModalProps {
  job: Job;
  requesterList: Request[];
  onClose: () => void;
  loading: boolean;
  onTradeAccepted: (acceptedRequesterEmail: string) => void; // Callback saat trade diterima
}

const RequesterModal: React.FC<RequesterModalProps> = ({
  job,
  requesterList,
  onClose,
  loading,
  onTradeAccepted,
}) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [updateError, setUpdateError] = useState<string | null>(null);

  // 🚨 FUNGSI UNTUK MENERIMA BARTER 🚨
  const handleAcceptTrade = async (request: Request) => {
    if (isUpdating) return;
    setIsUpdating(true);
    setUpdateError(null);

    // Konfirmasi sebelum melanjutkan
    if (
      !window.confirm(
        `Yakin menerima tawaran dari ${request.job_requester} untuk job "${job.job_name}"?`
      )
    ) {
      setIsUpdating(false);
      return;
    }

    try {
      // 1. UPDATE TABEL 'jobs': Set job_partner = job_requester
      const { error: jobUpdateError } = await supabase
        .from("jobs")
        .update({ job_partner: request.job_requester })
        .eq("job_id", job.job_id);

      if (jobUpdateError) {
        throw new Error(
          "Gagal mengupdate job partner: " + jobUpdateError.message
        );
      }

      // 2. [OPSIONAL] UPDATE TABEL 'job_trade_request' (misalnya, set status = 'accepted')
      // Jika tabel job_trade_request memiliki kolom status, Anda bisa mengaktifkan ini:
      /*
      await supabase
        .from("job_trade_request")
        .update({ status: 'accepted' })
        .eq("job_trade_request_id", request.job_trade_request_id);
      */

      alert(
        `Selamat! Anda telah menerima tawaran dari ${request.job_requester}. Job Partner diatur.`
      );

      // Panggil callback untuk me-refresh data di komponen utama
      onTradeAccepted(request.job_requester);

      onClose(); // Tutup modal setelah sukses
    } catch (e: any) {
      console.error("Accept Trade Error:", e);
      setUpdateError(
        e.message ||
          "Terjadi kesalahan yang tidak diketahui saat menerima trade."
      );
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-70 p-4">
      {/* ❌ HomeNavbar DIHAPUS DARI SINI (Karena sudah ada di komponen utama) */}
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header Modal */}
        <div className="flex justify-between items-center border-b p-5 sticky top-0 bg-white">
          <h2 className="text-xl font-bold text-gray-800">
            Requests for: "{job.job_name}"
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {updateError && (
          <div className="p-4 bg-red-100 text-red-700 text-sm">
            {updateError}
          </div>
        )}

        {/* List Requester */}
        <div className="p-5 space-y-4">
          {loading || isUpdating ? (
            <p className="text-center text-gray-500">
              {isUpdating ? "Accepting Trade..." : "Loading requesters..."}
            </p>
          ) : requesterList.length === 0 ? (
            <p className="text-center text-gray-500">
              Belum ada permintaan barter untuk pekerjaan ini.
            </p>
          ) : (
            requesterList.map((req) => (
              <div
                key={req.job_trade_request_id}
                className="border p-4 rounded-lg bg-gray-50 flex justify-between items-start"
              >
                <div>
                  <div className="flex items-center font-semibold text-blue-600 mb-1">
                    <Mail className="w-4 h-4 mr-2" />
                    {req.job_requester}
                  </div>
                  <p className="text-sm text-gray-800">
                    <span className="font-medium">Tawaran:</span>{" "}
                    {req.job_requester_description}
                  </p>
                </div>
                {/* TOMBOL ACCEPT TRADE DIPERBARUI */}
                <button
                  onClick={() => handleAcceptTrade(req)}
                  disabled={isUpdating}
                  className="bg-blue-600 text-white text-xs font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 ml-4 flex-shrink-0 disabled:opacity-50 transition"
                >
                  {isUpdating ? "Processing..." : "Accept Trade"}
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

// --- 2. Komponen Utama SeeRequester ---
const SeeRequester = () => {
  const navigate = useNavigate();
  const [currentUserEmail, setCurrentUserEmail] = useState<string | null>(null);
  const [myJobs, setMyJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // State untuk Modal Requester
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalJob, setModalJob] = useState<Job | null>(null);
  const [requesterList, setRequesterList] = useState<Request[]>([]);
  const [loadingRequests, setLoadingRequests] = useState(false);

  // Fungsi untuk fetch data, diisolasi agar bisa dipanggil lagi setelah update
  const fetchMyJobs = async (email: string) => {
    setLoading(true);
    setError(null);

    const { data: jobsData, error: jobsError } = await supabase
      .from("jobs")
      .select("job_id, job_name, job_maker, job_partner") // Tambah job_partner di select
      .eq("job_maker", email);

    if (jobsError) {
      setError("Error fetching your jobs: " + jobsError.message);
    } else {
      setMyJobs(jobsData as Job[]);
    }
    setLoading(false);
  };

  // Dapatkan User dan Ambil Semua Jobs (milik user)
  useEffect(() => {
    const fetchData = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user || !user.email) {
        navigate("/login");
        return;
      }

      const email = user.email;
      setCurrentUserEmail(email);
      fetchMyJobs(email);
    };

    fetchData();
  }, [navigate]);

  // Callback setelah trade diterima (dipanggil dari modal)
  const handleTradeAccepted = (acceptedRequesterEmail: string) => {
    alert(`Trade accepted! Refreshing job list.`);
    // Panggil lagi fungsi fetch jobs untuk mendapatkan data job_partner yang baru
    if (currentUserEmail) {
      fetchMyJobs(currentUserEmail);
    }
    // Kita tidak perlu menutup modal di sini karena sudah ditutup di modal
  };

  // 2. Ambil Requester saat tombol diklik
  const handleSeeRequester = async (job: Job) => {
    setModalJob(job);
    setIsModalOpen(true);
    setLoadingRequests(true);
    setRequesterList([]);

    const { data: requestsData, error: requestsError } = await supabase
      .from("job_trade_request")
      .select("job_trade_request_id, job_requester, job_requester_description")
      .eq("job_id", job.job_id)
      .eq("job_maker", currentUserEmail);

    setLoadingRequests(false);

    if (requestsError) {
      setError("Error fetching requesters: " + requestsError.message);
    } else {
      setRequesterList(requestsData as Request[]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-50">
        <p className="text-xl text-gray-700">Loading posted jobs...</p>
      </div>
    );
  }

  if (error) {
    return <div className="p-8 text-red-600">Error: {error}</div>;
  }

  if (myJobs.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-8">
        <Briefcase className="w-16 h-16 text-gray-400 mb-4" />
        <p className="text-xl text-gray-700">
          You haven't posted any jobs yet.
        </p>
        <button
          onClick={() => navigate("/create-jobs")}
          className="mt-4 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700"
        >
          Post Your First Job
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-between py-20">
      <div>
        <Home />
      </div>
      <div className="p-8 pt-16 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">
          👀 Review Job Requests
        </h1>
        <p className="text-gray-600 mb-6">
          Logged in as:{" "}
          <span className="font-semibold text-blue-600">
            {currentUserEmail}
          </span>
        </p>

        {/* Grid Job Cards */}
        <div className="space-y-6">
          {myJobs.map((job) => (
            <div
              key={job.job_id}
              className="bg-white p-6 rounded-xl shadow-md border-l-4 border-indigo-500 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {job.job_name}
                </h3>
                <p className="text-sm text-gray-500">Job ID: {job.job_id}</p>
                {/* Tampilkan Job Partner jika ada */}
                {job.job_partner && job.job_partner !== "None" && (
                  <p className="text-sm font-medium text-green-600 mt-2 flex items-center">
                    <UserCheck className="w-4 h-4 mr-1" /> Partner:{" "}
                    {job.job_partner}
                  </p>
                )}
              </div>

              <button
                onClick={() => handleSeeRequester(job)}
                className="bg-indigo-600 text-white py-2 px-4 rounded-lg font-medium hover:bg-indigo-700 flex items-center disabled:opacity-50"
                disabled={job.job_partner && job.job_partner !== "None"} // Disable jika partner sudah ada
              >
                <UserCheck className="w-4 h-4 mr-2" />
                {job.job_partner && job.job_partner !== "None"
                  ? "Trade Accepted"
                  : "See Requester"}
              </button>
            </div>
          ))}
        </div>
      </div>
      {/* Modal Requester */}
      {isModalOpen && modalJob && (
        <RequesterModal
          job={modalJob}
          requesterList={requesterList}
          onClose={() => setIsModalOpen(false)}
          loading={loadingRequests}
          onTradeAccepted={handleTradeAccepted} // Pass the callback function
        />
      )}
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default SeeRequester;
