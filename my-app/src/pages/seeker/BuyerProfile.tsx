import {
  User, Calendar, MapPin, Phone, Mail, Globe, GraduationCap,
  Pencil, MoreVertical, CalendarDays, Video, Settings,
  ShoppingBag, Heart, Edit, Rocket, Clock, XCircle
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { supabase } from "@/lib/SupabaseClient";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Skeleton } from "@/components/ui/skeleton";
import { Switch } from "@/components/ui/switch";
import { RealtimeChannel } from "@supabase/supabase-js";

type VerificationStatus = 'unverified' | 'pending' | 'verified' | 'rejected';

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
  verification_status: VerificationStatus;
}

// ... (rest of the interfaces remain the same)
interface Service {
  id: number;
  title: string;
  description: string;
}

interface Purchase {
  id: number;
  amount: number;
  purchase_datetime: string;
  services: Service | null;
}

interface Session {
  id: number;
  session_datetime: string;
  meeting_link: string | null;
  services: Service | null;
}

interface WishlistItem {
  services: Service | null;
}

interface UserSettings {
  email_notifications_enabled: boolean;
  session_reminders_enabled: boolean;
  profile_visibility: string;
}

/**
 * A dedicated card component to show seller verification status and CTA.
 */
const SellerStatusCard = ({ status, loading }: { status: VerificationStatus, loading: boolean }) => {
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton className="h-36 w-full" />;
  }

  // If status is pending, show an informational alert.
  if (status === 'pending') {
    return (
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertTitle>Pengajuan Anda Sedang Ditinjau</AlertTitle>
        <AlertDescription>
          Tim kami sedang mereview aplikasi Anda untuk menjadi kontributor. Anda akan menerima notifikasi setelah proses selesai (biasanya 1-3 hari kerja).
        </AlertDescription>
      </Alert>
    );
  }
  
  // If status is rejected, show an alert with a CTA to re-apply.
  if (status === 'rejected') {
    return (
       <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Pengajuan Ditolak</AlertTitle>
        <AlertDescription>
          Sayangnya, pengajuan Anda sebelumnya belum dapat kami setujui. Silakan periksa kembali data Anda dan coba lagi.
          <Button variant="link" className="p-0 h-auto ml-1" onClick={() => navigate('/seller-verification')}>
            Ajukan Ulang
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  // If status is unverified, show the main CTA card.
  if (status === 'unverified') {
    return (
      <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Rocket /> Jadilah Kontributor!</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Tawarkan keahlian Anda kepada mahasiswa lain dan mulailah mendapatkan penghasilan.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            Dengan menjadi kontributor, Anda dapat memposting layanan, membangun portofolio, dan menjangkau ribuan calon klien di lingkungan BINUS University.
          </p>
        </CardContent>
        <CardFooter>
          <Button 
            variant="secondary" 
            className="w-full"
            onClick={() => navigate('/seller-verification')}
          >
            Mulai Proses Verifikasi
          </Button>
        </CardFooter>
      </Card>
    );
  }
  
  // Don't render anything if status is verified or other cases
  return null;
};


const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "sessions" | "settings">("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [userEmail, setUserEmail] = useState<string>("");
  const [purchases, setPurchases] = useState<Purchase[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const [loading, setLoading] = useState({
    profile: true,
    purchases: true,
    sessions: true,
    wishlist: true,
    settings: true,
  });

  const [isEditingBio, setIsEditingBio] = useState(false);
  const [bioContent, setBioContent] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    let channel: RealtimeChannel;

    const fetchAndSubscribe = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        Object.keys(loading).forEach(key => setLoading(prev => ({...prev, [key]: false})));
        return;
      }
      
      setUserEmail(user.email || "No primary email");

      // Fetch all data in parallel
      await Promise.all([
        fetchProfileData(user.id),
        fetchPurchases(user.id),
        fetchSessions(user.id),
        fetchWishlist(user.id),
        fetchSettings(user.id)
      ]);

      // Set up real-time subscription for profile changes
      channel = supabase
        .channel(`public:profiles:id=eq.${user.id}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'profiles',
            filter: `id=eq.${user.id}`,
          },
          (payload) => {
            console.log('Profile updated in real-time!', payload.new);
            setProfileData(payload.new as ProfileData);
          }
        )
        .subscribe();
    };

    fetchAndSubscribe();

    // Cleanup function to unsubscribe
    return () => {
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, []);

  const fetchProfileData = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("profiles").select("*").eq("id", userId).single();
      if (error) throw error;
      setProfileData(data as ProfileData);
      setBioContent(data.bio || "");
    } catch (error) {
      console.error("Error fetching profile:", error);
    } finally {
      setLoading(prev => ({ ...prev, profile: false }));
    }
  };

  const fetchPurchases = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("purchases")
        .select(`id, amount, purchase_datetime, services (id, title)`)
        .eq("buyer_id", userId)
        .order("purchase_datetime", { ascending: false })
        .limit(3);
      if (error) throw error;
      setPurchases(data as unknown as Purchase[]);
    } catch (error) {
      console.error("Error fetching purchases:", error);
    } finally {
      setLoading(prev => ({ ...prev, purchases: false }));
    }
  };

  const fetchSessions = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select(`id, session_datetime, meeting_link, services (id, title)`)
        .eq("buyer_id", userId)
        .order("session_datetime", { ascending: true });
      if (error) throw error;
      setSessions(data as unknown as Session[]);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  };

  const fetchWishlist = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("wishlist_items")
        .select(`services (id, title, description)`)
        .eq("user_id", userId);
      if (error) throw error;
      setWishlist(data as unknown as WishlistItem[]);
    } catch (error) {
      console.error("Error fetching wishlist:", error);
    } finally {
      setLoading(prev => ({ ...prev, wishlist: false }));
    }
  };
  
  const fetchSettings = async (userId: string) => {
    try {
      // Remove .single() to prevent error on zero rows.
      const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId);
      if (error) throw error;
      
      // If settings exist, use them. Otherwise, settings remain null.
      if (data && data.length > 0) {
        setSettings(data[0]);
      } else {
        // Handle case where no settings row exists for the user yet.
        // For now, we'll leave settings as null and let the UI handle it.
        setSettings(null);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(prev => ({ ...prev, settings: false }));
    }
  };

  const handleSaveBio = async () => {
    if (!profileData) return;
    try {
      const { data, error } = await supabase
        .from('profiles')
        .update({ bio: bioContent })
        .eq('id', profileData.id)
        .select()
        .single();
      
      if (error) throw error;

      setProfileData(data as ProfileData);
      setIsEditingBio(false);
    } catch (error) {
      console.error("Error updating bio:", error);
    }
  };
  
  const handleSettingsChange = async (key: keyof UserSettings, value: any) => {
    if (!settings || !profileData) return;
  
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
  
    try {
      const { error } = await supabase
        .from('user_settings')
        .update({ [key]: value })
        .eq('user_id', profileData.id);
  
      if (error) {
        // Revert on failure
        setSettings(settings);
        throw error;
      }
    } catch(error) {
       console.error(`Error updating setting ${key}:`, error);
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
            <button
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Profile</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Left Panel - Contact Details */}
          <div className="w-80 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 overflow-y-auto flex-shrink-0">
            <Card className="p-6 border-0 rounded-none shadow-none">
              {/* Profile Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
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
                  <h3 className="font-semibold mb-3 text-gray-500 uppercase text-xs">
                    Contact Details
                  </h3>
                  <Button variant="ghost" size="sm" className="h-6 w-6 p-0 -mt-3 hover:bg-gray-100 dark:hover:bg-gray-700">
                    <Pencil className="h-3.5 w-3.5 text-gray-500 hover:text-gray-900" />
                  </Button>
                </div>
                {loading.profile ? (
                  <div className="space-y-4">
                    {[...Array(6)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                ) : profileData ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Student ID</p>
                      <p className="font-medium">{profileData.student_id}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-sm">{userEmail}</p>
                      {profileData.secondary_email && (
                        <p className="font-medium text-primary text-sm mt-1">{profileData.secondary_email}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Phone</p>
                      <p className="font-medium">{profileData.phone || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Major</p>
                      <p className="font-medium">{profileData.major || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Semester</p>
                      <p className="font-medium">{profileData.semester || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Campus</p>
                      <p className="font-medium">{profileData.campus || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Languages</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.languages?.length > 0 ? (
                          profileData.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary">{lang}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400">No languages added</p>
                        )}
                      </div>
                    </div>
                  </div>
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
                <button
                  onClick={() => setActiveTab("profile")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "profile"
                      ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <User className="h-4 w-4" />
                  My Profile
                </button>
                <button
                  onClick={() => setActiveTab("sessions")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "sessions"
                      ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <CalendarDays className="h-4 w-4" />
                  Sessions <Badge variant="secondary" className="ml-1">{sessions.length}</Badge>
                </button>
                <button
                  onClick={() => setActiveTab("settings")}
                  className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all whitespace-nowrap ${
                    activeTab === "settings"
                      ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary"
                      : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                  }`}
                >
                  <Settings className="h-4 w-4" />
                  Settings
                </button>
              </div>

              {/* Tab Content */}
              <div className="space-y-6">
                {/* 1. MY PROFILE TAB */}
                {activeTab === "profile" && (
                  <div className="space-y-6">
                    {/* Seller Status CTA Card */}
                    <SellerStatusCard 
                      status={profileData?.verification_status || 'unverified'} 
                      loading={loading.profile} 
                    />

                    {/* About Me Section */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">About Me</h3>
                        {!isEditingBio && (
                          <Button variant="ghost" size="sm" onClick={() => setIsEditingBio(true)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                      {loading.profile ? (
                        <Skeleton className="h-24 w-full" />
                      ) : isEditingBio ? (
                        <div className="space-y-3">
                          <Textarea
                            value={bioContent}
                            onChange={(e) => setBioContent(e.target.value)}
                            placeholder="Tell others about yourself..."
                            className="min-h-[100px]"
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" onClick={() => { setIsEditingBio(false); setBioContent(profileData?.bio || ""); }}>Cancel</Button>
                            <Button onClick={handleSaveBio}>Save Changes</Button>
                          </div>
                        </div>
                      ) : (
                        <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap min-h-[50px]">
                          {profileData?.bio || <span className="text-gray-400">No bio added yet. Click the edit button to add one.</span>}
                        </p>
                      )}
                    </Card>

                    {/* Purchase History */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Recent Purchases</h3>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                      {loading.purchases ? (
                        <div className="space-y-3">
                          {[1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
                        </div>
                      ) : purchases.length > 0 ? (
                        <div className="space-y-3">
                          {purchases.map((purchase) => (
                            <div key={purchase.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-gray-400"/>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">{purchase.services?.title || "Service not available"}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(purchase.purchase_datetime).toLocaleDateString()} - ${purchase.amount}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                          <p className="text-sm text-gray-500">No purchases yet</p>
                        </div>
                      )}
                    </Card>

                    {/* Wishlist */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Wishlist</h3>
                        <Badge variant="secondary">{wishlist.length} item{wishlist.length !== 1 && 's'}</Badge>
                      </div>
                       {loading.wishlist ? (
                        <Skeleton className="h-24 w-full" />
                      ) : wishlist.length > 0 ? (
                         <div className="space-y-3">
                          {wishlist.map((item, index) => (
                            <div key={index} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                               <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                <Heart className="h-6 w-6 text-gray-400"/>
                              </div>
                              <p className="font-semibold">{item.services?.title || "Service not available"}</p>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <Heart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                          <p className="text-sm text-gray-500">No items in wishlist</p>
                        </div>
                      )}
                    </Card>
                  </div>
                )}

                {/* 2. SESSIONS TAB */}
                {activeTab === "sessions" && (
                   <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">My Sessions</h3>
                      <p className="text-sm text-gray-500">View and manage your booked sessions</p>
                    </div>
                    {loading.sessions ? (
                      <div className="space-y-3">
                        {[1, 2].map((i) => <Skeleton key={i} className="h-20 w-full" />)}
                      </div>
                    ) : sessions.length > 0 ? (
                      <div className="space-y-3">
                        {sessions.map((session) => (
                          <Card key={session.id} className="p-4">
                            <div className="flex items-center justify-between">
                              <div className="space-y-1 flex-1">
                                <p className="font-semibold">{session.services?.title || "Service"}</p>
                                <p className="text-sm text-gray-500">
                                   <Calendar className="h-3.5 w-3.5 inline-block mr-1.5 -mt-1"/>
                                   {new Date(session.session_datetime).toLocaleString()}
                                </p>
                              </div>
                              <Button size="sm" asChild disabled={!session.meeting_link}>
                                <a href={session.meeting_link || ""} target="_blank" rel="noopener noreferrer">
                                  <Video className="h-4 w-4 mr-2" />
                                  Join Meeting
                                </a>
                              </Button>
                            </div>
                          </Card>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12">
                        <CalendarDays className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-sm text-gray-500">No scheduled sessions</p>
                        <Button variant="outline" className="mt-4" onClick={() => navigate('/services')}>
                          Browse Services
                        </Button>
                      </div>
                    )}
                  </div>
                )}

                {/* 3. SETTINGS TAB */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    {loading.settings ? <Skeleton className="h-64 w-full" /> : settings ? (
                    <>
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                        <p className="text-sm text-gray-500">Manage your account preferences</p>
                      </div>
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Notification Preferences</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Email Notifications</p>
                              <p className="text-sm text-gray-500">Receive updates via email</p>
                            </div>
                            <Switch
                              checked={settings.email_notifications_enabled}
                              onCheckedChange={(val) => handleSettingsChange('email_notifications_enabled', val)}
                            />
                          </div>
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Session Reminders</p>
                              <p className="text-sm text-gray-500">Get reminded before sessions</p>
                            </div>
                            <Switch
                               checked={settings.session_reminders_enabled}
                               onCheckedChange={(val) => handleSettingsChange('session_reminders_enabled', val)}
                             />
                          </div>
                        </div>
                      </Card>
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Privacy</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Profile Visibility</p>
                              <p className="text-sm text-gray-500">Who can see your profile</p>
                            </div>
                            {/* This would be a select/dropdown in a real scenario */}
                            <Badge variant="outline">{settings.profile_visibility}</Badge>
                          </div>
                        </div>
                      </Card>
                    </>
                    ) : (
                      <div className="text-center py-12">
                        <Settings className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                        <p className="text-sm text-gray-500">Could not load settings.</p>
                      </div>
                    )}
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

export default BuyerProfile;