import {
  User, Calendar, MapPin, Phone, Mail, Globe, GraduationCap,
  Pencil, MoreVertical, CalendarDays, Video, Settings,
  ShoppingBag, Edit, Rocket, Clock, XCircle
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
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

// --- Updated Data Type Interfaces to match new schema ---
type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
type DealStatus = 'NEGOTIATING' | 'AWAITING_PAYMENT' | 'IN_PROGRESS' | 'DELIVERED' | 'COMPLETED' | 'DISPUTED' | 'CANCELED';

interface ProfileData {
  id: string;
  name: string | null;
  student_id: string | null;
  email: string | null;
  phone: string | null;
  major: string | null;
  campus: string | null;
  bio: string | null;
  skills: string[] | null;
  verification_status: VerificationStatus;
}

interface Service {
  id: number;
  title: string;
}

interface Deal {
  id: number;
  final_amount: number;
  created_at: string;
  services: Service | null;
  status: DealStatus;
}

interface Session {
  id: number;
  session_datetime: string;
  meeting_link: string | null;
  deal_id: number;
}

interface UserSettings {
  email_notifications_enabled: boolean;
  profile_visibility: string;
}

/**
 * A dedicated card component to show seller verification status and CTA.
 */
const SellerStatusCard = ({ status, loading, isProfileComplete }: { status: VerificationStatus, loading: boolean, isProfileComplete: boolean }) => {
  const navigate = useNavigate();

  if (loading) {
    return <Skeleton className="h-36 w-full" />;
  }

  if (status === 'PENDING') {
    return (
      <Alert>
        <Clock className="h-4 w-4" />
        <AlertTitle>Your Application is Under Review</AlertTitle>
        <AlertDescription>
          Our team is reviewing your application. This usually takes 1-3 business days.
        </AlertDescription>
      </Alert>
    );
  }
  
  if (status === 'REJECTED') {
    return (
       <Alert variant="destructive">
        <XCircle className="h-4 w-4" />
        <AlertTitle>Application Rejected</AlertTitle>
        <AlertDescription>
          Your previous application could not be approved. Please check your data and try again.
          <Button variant="link" className="p-0 h-auto ml-1" onClick={() => navigate('/seller-verification')}>
            Re-apply
          </Button>
        </AlertDescription>
      </Alert>
    );
  }

  if (status === 'UNVERIFIED') {
    return (
      <Card className="bg-gradient-to-br from-primary to-purple-600 text-primary-foreground">
        <CardHeader>
          <CardTitle className="flex items-center gap-2"><Rocket /> Become a Contributor!</CardTitle>
          <CardDescription className="text-primary-foreground/80">
            Offer your skills to other students and start earning.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm">
            By becoming a contributor, you can post services and build your portfolio.
          </p>
        </CardContent>
        <CardFooter>
          {isProfileComplete ? (
            <Button 
              variant="secondary" 
              className="w-full"
              onClick={() => navigate('/seller-verification')}
            >
              Start Verification Process
            </Button>
          ) : (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="w-full cursor-not-allowed">
                  <Button 
                    variant="secondary" 
                    className="w-full"
                    disabled
                    style={{ pointerEvents: 'none' }}
                  >
                    Start Verification Process
                  </Button>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Complete your name, student ID, major, campus, and phone number to continue.</p>
              </TooltipContent>
            </Tooltip>
          )}
        </CardFooter>
      </Card>
    );
  }
  
  return null;
};


const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "sessions" | "settings">("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [deals, setDeals] = useState<Deal[]>([]);
  const [sessions, setSessions] = useState<Session[]>([]);
  const [settings, setSettings] = useState<UserSettings | null>(null);

  const [loading, setLoading] = useState({
    profile: true,
    deals: true,
    sessions: true,
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
      
      // Fetch all data in parallel
      await Promise.all([
        fetchProfileData(user.id),
        fetchDeals(user.id),
        fetchSettings(user.id)
      ]).then((results) => {
        const userDeals = results[1] as Deal[] | null;
        if (userDeals && userDeals.length > 0) {
          fetchSessions(userDeals.map(d => d.id));
        } else {
           setLoading(prev => ({ ...prev, sessions: false }));
        }
      });

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
    return null; // Return null to match Promise.all expectation
  };

  const fetchDeals = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from("deals")
        .select(`id, final_amount, created_at, status, services (id, title)`)
        .eq("buyer_id", userId)
        .order("created_at", { ascending: false })
        .limit(3);
      if (error) throw error;
      setDeals(data as Deal[]);
      return data; // Return data for chaining
    } catch (error) {
      console.error("Error fetching deals:", error);
    } finally {
      setLoading(prev => ({ ...prev, deals: false }));
    }
    return null;
  };

  const fetchSessions = async (dealIds: number[]) => {
    try {
      const { data, error } = await supabase
        .from("sessions")
        .select(`*`)
        .in("deal_id", dealIds)
        .order("session_datetime", { ascending: true });
      if (error) throw error;
      setSessions(data as Session[]);
    } catch (error) {
      console.error("Error fetching sessions:", error);
    } finally {
      setLoading(prev => ({ ...prev, sessions: false }));
    }
  };
  
  const fetchSettings = async (userId: string) => {
    try {
      const { data, error } = await supabase.from("user_settings").select("*").eq("user_id", userId);
      if (error) throw error;
      if (data && data.length > 0) {
        setSettings(data[0]);
      } else {
        setSettings(null);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    } finally {
      setLoading(prev => ({ ...prev, settings: false }));
    }
     return null;
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
        setSettings(settings);
        throw error;
      }
    } catch(error) {
       console.error(`Error updating setting ${key}:`, error);
    }
  };

  const isProfileComplete = !!(
    profileData &&
    profileData.name &&
    profileData.student_id &&
    profileData.campus &&
    profileData.major &&
    profileData.phone
  );

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
                  {loading.profile ? <Skeleton className="h-14 w-14 rounded-full" /> : (profileData?.name?.charAt(0) || 'S').toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{loading.profile ? <Skeleton className="h-5 w-32" /> : profileData?.name || 'New User'}</h2>
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
                    {[...Array(5)].map((_, i) => <Skeleton key={i} className="h-10 w-full" />)}
                  </div>
                ) : profileData ? (
                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Student ID</p>
                      <p className="font-medium">{profileData.student_id || 'Not set'}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-sm">{profileData.email || 'No email set'}</p>
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
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Campus</p>
                      <p className="font-medium">{profileData.campus || "Not set"}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Skills</p>
                      <div className="flex flex-wrap gap-2">
                        {profileData.skills?.length > 0 ? (
                          profileData.skills.map((skill, idx) => (
                            <Badge key={idx} variant="secondary">{skill}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400">No skills added</p>
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
                    <SellerStatusCard 
                      status={profileData?.verification_status || 'UNVERIFIED'} 
                      loading={loading.profile}
                      isProfileComplete={isProfileComplete}
                    />

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

                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Recent Deals</h3>
                        <Button variant="outline" size="sm">View All</Button>
                      </div>
                      {loading.deals ? (
                        <div className="space-y-3">
                          {[1, 2].map((i) => <Skeleton key={i} className="h-16 w-full" />)}
                        </div>
                      ) : deals.length > 0 ? (
                        <div className="space-y-3">
                          {deals.map((deal) => (
                            <div key={deal.id} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                              <div className="h-12 w-12 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                                <ShoppingBag className="h-6 w-6 text-gray-400"/>
                              </div>
                              <div className="flex-1">
                                <p className="font-semibold">{deal.services?.title || "Service not available"}</p>
                                <p className="text-sm text-gray-500">
                                  {new Date(deal.created_at).toLocaleDateString()} - ${deal.final_amount}
                                </p>
                              </div>
                              <Badge variant={deal.status === 'COMPLETED' ? 'default' : 'secondary'}>{deal.status}</Badge>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center py-8">
                          <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                          <p className="text-sm text-gray-500">No deals yet</p>
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
                                <p className="font-semibold">Session for Deal #{session.deal_id}</p>
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