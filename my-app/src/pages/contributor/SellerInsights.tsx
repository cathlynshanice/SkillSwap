import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, BarChart3, DollarSign, ShoppingBag, Star, MoreVertical } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { supabase } from "@/lib/SupabaseClient";

// Define ProfileData interface to use for state
interface ProfileData {
  id: string;
  verification_status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
}

const SellerInsights = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, verification_status')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching profile status:", error);
        } else if (data) {
          setProfileData(data as ProfileData);
        }
      }
    };
    fetchProfile();
  }, []);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar Navigation */}
      <ProfileSidebar verificationStatus={profileData?.verification_status} />

      {/* Main Content Area */}
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
            <span className="text-gray-900 dark:text-gray-100 font-medium">Seller Insights</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-2">Seller Analytics</h3>
                <p className="text-sm text-gray-500">Track your performance and earnings</p>
              </div>

              {/* KPI Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Revenue</span>
                    <DollarSign className="h-4 w-4 text-green-400" />
                  </div>
                  <div className="h-8 w-20 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <p className="text-xs text-gray-400">Total earnings</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Orders</span>
                    <ShoppingBag className="h-4 w-4 text-blue-400" />
                  </div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <p className="text-xs text-gray-400">Completed orders</p>
                </Card>
                <Card className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm text-gray-500">Ratings</span>
                    <Star className="h-4 w-4 text-yellow-400" />
                  </div>
                  <div className="h-8 w-16 bg-gray-200 dark:bg-gray-700 rounded animate-pulse mb-2"></div>
                  <p className="text-xs text-gray-400">Average rating</p>
                </Card>
              </div>

              {/* Charts */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Revenue Breakdown</h4>
                  <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <div className="text-center">
                      <div className="h-32 w-32 rounded-full bg-gray-200 dark:bg-gray-600 mx-auto mb-3"></div>
                      <p className="text-sm text-gray-400">Pie chart placeholder</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-6">
                  <h4 className="font-semibold mb-4">Orders Over Time</h4>
                  <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                    <div className="text-center">
                      <TrendingUp className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                      <p className="text-sm text-gray-400">Line chart placeholder</p>
                    </div>
                  </div>
                </Card>
              </div>

              <Card className="p-6">
                <h4 className="font-semibold mb-4">Performance Metrics</h4>
                <div className="h-64 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                  <div className="text-center">
                    <BarChart3 className="h-12 w-12 mx-auto text-gray-400 mb-2" />
                    <p className="text-sm text-gray-400">Analytics will appear here once data is available</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerInsights;
