import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, Calendar, MapPin, Phone, Mail, Globe, GraduationCap, 
  Pencil, MoreVertical, CalendarDays, Video, Settings,
  ShoppingBag, Heart, Edit, DollarSign, TrendingUp, Package
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { supabase } from "@/lib/SupabaseClient";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";

// --- Data Type Interfaces ---
interface ProfileData {
  id: string;
  name: string;
  student_id: string;
  secondary_email: string | null;
  phone: string | null;
  major: string | null;
  semester: string | null;
  campus: string | null;
  location: string | null;
  languages: string[];
  bio: string | null;
}

interface Service {
  id: number;
  title: string;
  description: string;
  price: number;
  category: string;
}

interface Session {
  id: number;
  session_datetime: string;
  meeting_link: string | null;
  services: { title: string }[] | null;
}

interface UserSettings {
  email_notifications_enabled: boolean;
  session_reminders_enabled: boolean;
  profile_visibility: string;
}

interface SellerStats {
    totalEarnings: number;
    totalSales: number;
}

const SellerProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "sessions" | "settings">("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [sessions, setSessions] = useState<Session[]>([]);
  const [myServices, setMyServices] = useState<Service[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);
  const [stats, setStats] = useState<SellerStats>({ totalEarnings: 0, totalSales: 0 });

  const [loading, setLoading] = useState({
    profile: true,
    sessions: true,
    myServices: true,
    settings: true,
    stats: true,
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioContent, setBioContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // setUserRole is now handled by the parent ProfilePage
    window.scrollTo(0, 0);

    const fetchAllData = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Object.keys(loading).forEach(key => setLoading(prev => ({...prev, [key]: false})));
        return;
      }
      
      setUserEmail(user.email || "No primary email");

      await Promise.all([
        fetchProfileData(user.id),
        fetchSellerSessions(user.id),
        fetchMyServices(user.id),
        fetchSettings(user.id),
        fetchSellerStats(user.id),
      ]);
    };

    fetchAllData();
  }, []);

  const fetchProfileData = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (error) throw error;
      setProfileData(data);
      setBioContent(data.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchSellerSessions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select(`id, session_datetime, meeting_link, services (title)`)
        .eq("seller_id", userId)
        .order("session_datetime", { ascending: true });
      if (error) throw error;
      setSessions(data as Session[]);
    } catch (error) {
      console.error("Error fetching seller sessions:", error);
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  };

  const fetchMyServices = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("services").select("*").eq("seller_id", userId);
      if (error) throw error;
      setMyServices(data as Service[]);
    } catch (error) {
      console.error("Error fetching services:", error);
    } finally {
      setLoading(prev => ({ ...prev, myServices: false }));
    }
  };

  const fetchSellerStats = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('purchases')
        .select('amount, services!inner(seller_id)')
        .eq('services.seller_id', userId)
        .eq('status', 'completed');
      
      if (error) throw error;

      const totalEarnings = data.reduce((sum, sale) => sum + sale.amount, 0);
      const totalSales = data.length;
      setStats({ totalEarnings, totalSales });

    } catch (error) {
      console.error("Error fetching seller stats:", error);
    } finally {
      setLoading(prev => ({ ...prev, stats: false }));
    }
  };

  const fetchSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId).single();
      if (error) throw error;
      setSettings(data);
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(prev => ({ ...prev, settings: false }));
    }
  };

  const handleSaveBio = async () => {
    if (!profileData) return;
    try {
      const { data, error } = await supabase.from('profiles').update({ bio: bioContent }).eq('id', profileData.id).select().single();
      if (error) throw error;
      setProfileData(data);
      setIsEditingBio(false);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar Navigation */}
      <ProfileSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <button onClick={() => navigate('/home')} className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors">Home</button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Seller Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm"><MoreVertical className="h-4 w-4" /></Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Contact Details */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0">
            <Card className="p-6 border-0 rounded-none shadow-none">
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-teal-400 to-cyan-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                  {loading.profile ? <Skeleton className="h-14 w-14 rounded-full" /> : profileData?.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{loading.profile ? <Skeleton className="h-5 w-32" /> : profileData?.name}</h2>
                  <Badge variant="outline" className="mt-1">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {loading.profile ? "..." : profileData?.campus || "N/A"}
                  </Badge>
                </div>
              </div>

              {/* Contact Details Section */}
              <div className="space-y-4 text-sm">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold mb-3 text-gray-500 uppercase text-xs">Contact Details</h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 -mt-3"><Pencil className="h-3.5 w-3.5 text-gray-500" /></Button>
                </div>
                {loading.profile ? (
                  <div className="space-y-4">{[...Array(6)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}</div>
                ) : profileData ? (
                  <div className="space-y-3">
                    <div className="flex items-start gap-2"><User className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Student ID</p><p className="font-medium">{profileData.student_id}</p></div></div>
                    <div className="flex items-start gap-2"><Mail className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Email</p><p className="font-medium text-sm">{userEmail}</p>{profileData.secondary_email && <p className="font-medium text-primary text-sm mt-1">{profileData.secondary_email}</p>}</div></div>
                    <div className="flex items-start gap-2"><Phone className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Phone</p><p className="font-medium">{profileData.phone || "Not set"}</p></div></div>
                    <div className="flex items-start gap-2"><GraduationCap className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Major</p><p className="font-medium">{profileData.major || "Not set"}</p></div></div>
                    <div className="flex items-start gap-2"><Calendar className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Semester</p><p className="font-medium">{profileData.semester || "Not set"}</p></div></div>
                    <div className="flex items-start gap-2"><MapPin className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Campus</p><p className="font-medium">{profileData.campus || "Not set"}</p></div></div>
                    <div className="flex items-start gap-2"><Globe className="h-4 w-4 text-gray-400 mt-0.5" /><div><p className="text-xs text-gray-500 mb-1">Languages</p><div className="flex flex-wrap gap-2">{profileData.languages?.length > 0 ? profileData.languages.map((lang, idx) => <Badge key={idx} variant="secondary">{lang}</Badge>) : <p className="text-sm text-gray-400">No languages added</p>}</div></div></div>
                  </div>
                ) : <p className="text-sm text-red-500">Could not load profile data.</p>}
              </div>
            </Card>
          </div>

          {/* Right Panel - Content Area */}
          <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
            <div className="p-6">
              {/* Header Tabs */}
              <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-6 overflow-x-auto">
                <button onClick={() => setActiveTab("profile")} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${activeTab === "profile" ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`}>
                  <User className="h-4 w-4" /> My Profile
                </button>
                <button onClick={() => setActiveTab("sessions")} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${activeTab === "sessions" ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`}>
                  <CalendarDays className="h-4 w-4" /> Sessions <Badge variant="secondary" className="ml-1">{sessions.length}</Badge>
                </button>
                <button onClick={() => setActiveTab("settings")} className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${activeTab === "settings" ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100"}`}>
                  <Settings className="h-4 w-4" /> Settings
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    {/* Seller Stats */}
                    <Card className="p-6">
                      <h3 className="text-lg font-semibold mb-4">Seller Dashboard</h3>
                      {loading.stats ? <Skeleton className="h-20 w-full" /> : (
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
                          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <DollarSign className="h-6 w-6 mx-auto text-green-500 mb-2" />
                            <p className="text-2xl font-bold">${stats.totalEarnings.toFixed(2)}</p>
                            <p className="text-xs text-gray-500 uppercase">Total Earnings</p>
                          </div>
                          <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50">
                            <ShoppingBag className="h-6 w-6 mx-auto text-blue-500 mb-2" />
                            <p className="text-2xl font-bold">{stats.totalSales}</p>
                            <p className="text-xs text-gray-500 uppercase">Total Sales</p>
                          </div>
                        </div>
                      )}
                    </Card>

                    {/* About Me Section */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">About Me</h3>
                        {!isEditingBio && <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(true)}><Edit className="h-4 w-4" /></Button>}
                      </div>
                      {loading.profile ? <Skeleton className="h-24 w-full" /> : isEditingBio ? (
                        <div className="space-y-3">
                          <Textarea value={bioContent} onChange={(e) => setBioContent(e.target.value)} placeholder="Tell others about yourself..." className="min-h-[100px]" />
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => { setIsEditingBio(false); setBioContent(profileData?.bio || ""); }}>Cancel</Button>
                            <Button onClick={handleSaveBio}>Save Changes</Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap min-h-[50px]">{profileData?.bio || <span className="text-gray-400">No bio added yet.</span>}</p>
                      )}
                    </Card>

                    {/* My Services */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">My Services</h3>
                        <Button variant="outline" size="sm">Add New Service</Button>
                      </div>
                      {loading.myServices ? <Skeleton className="h-24 w-full" /> : myServices.length > 0 ? (
                        <div className="space-y-3">
                          {myServices.map((service) => (
                            <div key={service.id} className="flex items-center gap-3 p-3 border rounded-lg">
                              <div className="h-12 w-12 bg-gray-100 rounded flex items-center justify-center"><Package className="h-6 w-6 text-gray-400"/></div>
                              <div className="flex-1"><p className="font-semibold">{service.title}</p><p className="text-sm text-gray-500">${service.price}</p></div>
                              <Button variant="ghost" size="icon"><MoreVertical className="h-4 w-4" /></Button>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8"><Package className="h-12 w-12 mx-auto text-gray-300 mb-3" /><p className="text-sm text-gray-500">You haven't listed any services yet.</p></div>
                      )}
                    </Card>
                  </div>
                )}

                {activeTab === "sessions" && (
                  <div className="space-y-6">
                    <div><h3 className="text-lg font-semibold mb-2">My Client Sessions</h3><p className="text-sm text-gray-500">Manage sessions booked by your clients.</p></div>
                    {loading.sessions ? <div className="space-y-3">{[1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}</div> : sessions.length > 0 ? (
                      <div className="space-y-3">
                        {sessions.map((session) => (
                          <Card key={session.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 flex-1">
                                <p className="font-semibold">
                                  {session.services && session.services.length > 0
                                    ? session.services.map((s) => s.title).join(", ")
                                    : "Service"}
                                </p>
                                <p className="text-sm text-gray-500">
                                  <Calendar className="h-3.5 w-3.5 inline-block mr-1.5 -mt-1" />
                                  {new Date(session.session_datetime).toLocaleString()}
                                </p>
                              </div>
                              <Button size="sm" asChild disabled={!session.meeting_link}>
                                <a href={session.meeting_link || ""} target="_blank" rel="noopener noreferrer">
                                  <Video className="h-4 w-4 mr-2" />Join Meeting
                                </a>
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12"><CalendarDays className="h-12 w-12 mx-auto text-gray-300 mb-4" /><p className="text-sm text-gray-500">No sessions booked by clients.</p></div>
                    )}
                  </div>
                )}

                {activeTab === "settings" && (
                  <div className="space-y-6">
                    {/* This section can be expanded with seller-specific settings from a new table if needed */}
                    <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                      <div className="flex gap-3"><Settings className="h-5 w-5 text-yellow-600" /><div><p className="text-sm font-medium text-yellow-800">Seller-specific settings coming soon.</p></div></div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfile;
