import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Package, CheckCircle, Clock, XCircle, Search, ArrowLeft, BadgeAlert } from "lucide-react"; // Mengganti ikon
import { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

// Dummy data
const dummyJobs = [
    {
        id: 2025111901,
        gigTitle: "Buat Laporan Analisis Portofolio Finansial",
        clientName: "Budi Santoso",
        status: "ACTIVE",
        date: "15 Nov 2025",
        dueDate: "25 Nov 2025",
        price: "Rp 500.000",
        type: "Financial Analysis",
    },
    {
        id: 2025111902,
        gigTitle: "Desain 3 Halaman Website dengan Figma",
        clientName: "Tia Agustina",
        status: "REVISION",
        date: "14 Nov 2025",
        dueDate: "20 Nov 2025",
        price: "Rp 350.000",
        type: "UI/UX Design",
    },
    {
        id: 2025111903,
        gigTitle: "Setup Iklan Facebook Ads Campaign",
        clientName: "Rina Sari",
        status: "DELIVERED",
        date: "10 Nov 2025",
        dueDate: "13 Nov 2025",
        price: "Rp 400.000",
        type: "Digital Marketing",
    },
    {
        id: 2025111904,
        gigTitle: "Konsultasi Strategi Sales Asuransi",
        clientName: "Dewi Kirana",
        status: "COMPLETED",
        date: "01 Nov 2025",
        dueDate: "03 Nov 2025",
        price: "Rp 250.000",
        type: "Sales Consulting",
    },
    {
        id: 2025111905,
        gigTitle: "Migrasi Database ke PostgreSQL",
        clientName: "Andi Wijaya",
        status: "ACTIVE",
        date: "16 Nov 2025",
        dueDate: "30 Nov 2025",
        price: "Rp 750.000",
        type: "Technology",
    },
];

// Map STATUS
const statusMap = {
    ACTIVE: { label: "Active", color: "bg-blue-500/10 text-blue-600", icon: Clock },
    REVISION: { label: "Revision", color: "bg-red-500/10 text-red-600", icon: XCircle },
    DELIVERED: { label: "Delivered", color: "bg-yellow-500/10 text-yellow-600", icon: Package },
    COMPLETED: { label: "Completed", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
    CANCELLED: { label: "Canceled", color: "bg-gray-500/10 text-gray-600", icon: XCircle },
    ALL: { label: "All", color: "bg-gray-200/50 text-gray-600" },
};

export default function MyJobs() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const initialStatus = searchParams.get('status')?.toUpperCase() || "ACTIVE";
    const [filterStatus, setFilterStatus] = useState(initialStatus); // State utk filter
    
    // Panggil useMemo atau buat variabel kalau ingin memfilter data
    const filteredJobs = filterStatus === "ALL" ? dummyJobs : dummyJobs.filter(job => job.status === filterStatus);
    
    // Variabel stats
    const totalJobs = dummyJobs.length;
    const activeJobs = dummyJobs.filter(o => o.status === 'ACTIVE').length;
    const missingDetailsJobs = dummyJobs.filter(o => o.status === 'REVISION').length;
    const completedJobs = dummyJobs.filter(o => o.status === 'COMPLETED').length;
    
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    // badge samping jobs
    const StatusBadge = ({ status }) => {
        const map = statusMap[status] || statusMap.ALL;
        const Icon = map.icon || Clock;
        return (
            <Badge 
                className={`text-xs font-medium ${map.color} whitespace-nowrap`}
                variant="outline"
            >
                <Icon className="h-3 w-3 mr-1" />
                {map.label}
            </Badge>
        );
    };

    const JobCard = ({ job, navigate }) => (
        <Card 
          key={job.id} 
          className="p-4 flex items-center justify-between hover:shadow-md transition-shadow"
          onClick={() => navigate(`/job/${job.id}`)}
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-base line-clamp-1">{job.gigTitle}</h4>
                    <StatusBadge status={job.status} />
                </div>
                <p className="text-sm text-gray-500 mb-1">
                    <span className="font-medium">{job.clientName}</span> | {job.type}
                </p>
                <p className="text-xs text-gray-400">
                    Job ID: {job.id} | Tgl. Job: {job.date}
                </p>
            </div>
            
            <div className="text-right ml-4 flex-shrink-0">
                <p className={`text-sm font-medium ${job.status === 'ACTIVE' ? 'text-red-500' : 'text-gray-500'}`}>
                    Due: {job.dueDate}
                </p>
            </div>
        </Card>
    );


    return(
        <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        <ProfileSidebar />
        
        { /* Main Content Area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <button 
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">My Jobs</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
          </Button>
          </div>
        </header>

        {/* content */}
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">My Jobs</h3>
                <p className="text-sm text-gray-500">Track incoming jobs and manage job status</p>
              </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                    <Clock className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{activeJobs}</p>
                    <p className="text-xs text-gray-500">Active Jobs</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-red-100 dark:bg-red-900/30 flex items-center justify-center">
                    <BadgeAlert className="h-5 w-5 text-red-600 dark:text-red-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{missingDetailsJobs}</p>
                    <p className="text-xs text-gray-500">Revision</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                    <CheckCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{completedJobs}</p>
                    <p className="text-xs text-gray-500">Completed</p>
                  </div>
                </div>
              </Card>
              <Card className="p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
                    <Package className="h-5 w-5 text-gray-600 dark:text-gray-400" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{totalJobs}</p>
                    <p className="text-xs text-gray-500">Total Job</p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-2 mb-6 flex-wrap border-b border-gray-200 dark:border-gray-700">
                {Object.keys(statusMap).map(status => (
                    <button 
                        key={status}
                        onClick={() => setFilterStatus(status)}
                        className={`
                            px-3 py-2 text-sm font-medium transition-colors
                            ${filterStatus === status 
                                ? 'text-blue-600 dark:text-blue-400 border-b-2 border-blue-600 dark:border-blue-400' 
                                : 'text-gray-500 hover:text-gray-700 dark:hover:text-gray-300'
                            }
                        `}
                    >
                        {statusMap[status].label.toUpperCase()}
                    </button>
                ))}
                {/* Search job by id */}
              <div className="px-4 mb-1 ml-auto">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <input
                    type="number"
                    placeholder="Search by Job ID"
                    className="w-full pl-9 pr-3 py-2 text-sm bJob rounded-md"
                  />
                </div>
              </div>
            </div>

            {/* Jobs List / Grid */}
            <h4 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-300">
                {statusMap[filterStatus].label} Jobs ({filteredJobs.length})
            </h4>

            <div className="space-y-4">
              {filteredJobs.length === 0 ? (
                <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                  <Package className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                  <p className="text-sm text-gray-500">
                    Tidak ada job dengan status {statusMap[filterStatus].label.toUpperCase()} untuk ditampilkan.
                  </p>
                </div>
              ) : (
                filteredJobs.map((job) => (
                    <JobCard key={job.id} job={job} navigate={navigate} />
                ))
              )}
            </div>
            
        </div>
        </div>
        </div>
        </div>
    )
}