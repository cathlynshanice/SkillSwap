import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {Package, CheckCircle, Clock, XCircle, Search, ArrowLeft, BadgeAlert } from "lucide-react";
import { useEffect, useState } from "react"; 
import { useNavigate, useSearchParams } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { supabase } from "@/lib/SupabaseClient";
import { Skeleton } from "@/components/ui/skeleton";

// --- Types ---
type DealStatus = 'NEGOTIATING' | 'AWAITING_PAYMENT' | 'IN_PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'DISPUTED' | 'CANCELED';

interface Deal {
    id: number;
    services: { title: string } | null;
    profiles: { name: string } | null;
    status: DealStatus;
    created_at: string;
    due_date?: string; // Assuming due_date might not always exist
}

interface ProfileData {
  id: string;
  verification_status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
}

// Map STATUS
const statusMap: Record<string, { label: string; color: string; icon: React.FC<any> }> = {
    IN_PROGRESS: { label: "Active", color: "bg-blue-500/10 text-blue-600", icon: Clock },
    DELIVERED: { label: "Delivered", color: "bg-yellow-500/10 text-yellow-600", icon: Package },
    COMPLETED: { label: "Completed", color: "bg-green-500/10 text-green-600", icon: CheckCircle },
    CANCELED: { label: "Canceled", color: "bg-gray-500/10 text-gray-600", icon: XCircle },
    DISPUTED: { label: "Disputed", color: "bg-red-500/10 text-red-600", icon: BadgeAlert },
    NEGOTIATING: { label: "Negotiating", color: "bg-purple-500/10 text-purple-600", icon: BadgeAlert },
    AWAITING_PAYMENT: { label: "Awaiting Payment", color: "bg-orange-500/10 text-orange-600", icon: Clock },
    ALL: { label: "All", color: "bg-gray-200/50 text-gray-600", icon: Package },
};

export default function MyJobs() {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [profileData, setProfileData] = useState<ProfileData | null>(null);
    const [jobs, setJobs] = useState<Deal[]>([]);
    const [loading, setLoading] = useState(true);

    const initialStatus = searchParams.get('status')?.toUpperCase() || "IN_PROGRESS";
    const [filterStatus, setFilterStatus] = useState(initialStatus);

    useEffect(() => {
        window.scrollTo(0, 0);

        const fetchInitialData = async () => {
          const { data: { user } } = await supabase.auth.getUser();
          if (user) {
            // Fetch profile for sidebar
            const { data: profile } = await supabase
              .from('profiles')
              .select('id, verification_status')
              .eq('id', user.id)
              .maybeSingle();
            setProfileData(profile as ProfileData);
            
            // Fetch jobs
            fetchJobs(user.id);
          } else {
            setLoading(false);
          }
        };

        fetchInitialData();
    }, []);

    const fetchJobs = async (userId: string) => {
        setLoading(true);
        let query = supabase
            .from('deals')
            .select(`
                id,
                created_at,
                status,
                services ( title ),
                profiles!deals_buyer_id_fkey ( name )
            `)
            .eq('seller_id', userId);

        if (filterStatus !== 'ALL') {
            query = query.eq('status', filterStatus);
        }

        const { data, error } = await query.order('created_at', { ascending: false });

        if (error) {
            console.error("Error fetching jobs:", error);
            setJobs([]);
        } else {
            setJobs(data as unknown as Deal[]);
        }
        setLoading(false);
    };

    useEffect(() => {
        const loadJobsForUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if(user) {
                fetchJobs(user.id);
            }
        };
        loadJobsForUser();
    }, [filterStatus]);


    const filteredJobs = jobs; // Data is already filtered by the query
    
    const StatusBadge = ({ status } : { status: DealStatus }) => {
        const map = statusMap[status] || statusMap.ALL;
        const Icon = map.icon;
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

    const JobCard = ({ job, navigate }: { job: Deal; navigate: any }) => (
        <Card 
          key={job.id} 
          className="p-4 flex items-center justify-between hover:shadow-md transition-shadow cursor-pointer"
          onClick={() => navigate(`/deal/${job.id}`)} // Navigate to a future deal detail page
        >
            <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-base line-clamp-1">{job.services?.title || 'N/A'}</h4>
                    <StatusBadge status={job.status} />
                </div>
                <p className="text-sm text-gray-500 mb-1">
                    Client: <span className="font-medium">{job.profiles?.name || 'N/A'}</span>
                </p>
                <p className="text-xs text-gray-400">
                    Job ID: {job.id} | Tgl. Job: {new Date(job.created_at).toLocaleDateString()}
                </p>
            </div>
            
            {job.due_date && (
              <div className="text-right ml-4 flex-shrink-0">
                  <p className={`text-sm font-medium ${job.status === 'IN_PROGRESS' ? 'text-red-500' : 'text-gray-500'}`}>
                      Due: {job.due_date}
                  </p>
              </div>
            )}
        </Card>
    );

    return(
        <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
        <ProfileSidebar verificationStatus={profileData?.verification_status} />
        
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
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

          <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-lg font-semibold">My Jobs</h3>
                  <p className="text-sm text-gray-500">Track incoming jobs and manage job status</p>
                </div>
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
                  <div className="px-4 mb-1 ml-auto">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      <input
                        type="number"
                        placeholder="Search by Job ID"
                        className="w-full pl-9 pr-3 py-2 text-sm border rounded-md"
                      />
                    </div>
                  </div>
              </div>

              <h4 className="text-base font-semibold mb-4 text-gray-700 dark:text-gray-300">
                  {statusMap[filterStatus]?.label || 'Jobs'} ({filteredJobs.length})
              </h4>

              <div className="space-y-4">
                {loading ? (
                  <>
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                    <Skeleton className="h-20 w-full" />
                  </>
                ) : filteredJobs.length === 0 ? (
                  <div className="text-center py-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
                    <Package className="h-10 w-10 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                    <p className="text-sm text-gray-500">
                      No jobs with status {statusMap[filterStatus]?.label.toUpperCase()} to display.
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