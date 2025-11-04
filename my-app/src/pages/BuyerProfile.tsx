import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, Calendar, MapPin, Phone, Mail, Globe, Clock, GraduationCap, 
  Pencil, MoreVertical, CheckCircle2, CalendarDays, Video, Settings,
  ShoppingBag, Heart, Star
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { setUserRole } from "@/lib/userContext";
import { supabase } from "@/lib/SupabaseClient";

// Set role IMMEDIATELY before component renders
setUserRole("buyer");

interface ProfileData {
  name: string;
  student_id: string;
  email: string;
  secondary_email: string | null;
  phone: string;
  major: string;
  semester: string;
  campus: string;
  location: string;
  languages: string[];
  bio: string | null;
}

const BuyerProfile = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "sessions" | "settings">("profile");
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
    fetchProfileData();
  }, []);

  const fetchProfileData = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        console.error("No authenticated user");
        setLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching profile:", error);
      } else {
        setProfileData(data);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = {
    name: profileData?.name || "Not set",
    studentId: profileData?.student_id || "Not set",
    phone: profileData?.phone || "Not set",
    email: profileData?.email || "Not set",
    secondaryEmail: profileData?.secondary_email || "",
    location: profileData?.location || "Not set",
    languages: profileData?.languages || [],
    major: profileData?.major || "Not set",
    semester: profileData?.semester || "Not set",
    campus: profileData?.campus || "Not set",
    bio: profileData?.bio || "",
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
                  {loading ? "?" : contactInfo.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h2 className="font-bold text-lg">{loading ? "Loading..." : contactInfo.name}</h2>
                  <Badge variant="outline" className="mt-1">
                    <GraduationCap className="h-3 w-3 mr-1" />
                    {loading ? "..." : contactInfo.campus}
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

                <div className="space-y-3">
                  <div className="flex items-start gap-2">
                    <User className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Student ID</p>
                      <p className="font-medium">{contactInfo.studentId}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <GraduationCap className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Major</p>
                      <p className="font-medium">{contactInfo.major}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Calendar className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Current Semester</p>
                      <Badge variant="secondary">{contactInfo.semester}</Badge>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Campus</p>
                      <p className="font-medium">{contactInfo.campus}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2">
                    <Phone className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Phone number</p>
                      <p className="font-medium">{contactInfo.phone}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      +
                    </Button>
                  </div>

                  <div className="flex items-start gap-2">
                    <Mail className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Email</p>
                      <p className="font-medium text-sm">{contactInfo.email}</p>
                      {contactInfo.secondaryEmail && (
                        <p className="font-medium text-primary text-sm mt-1">{contactInfo.secondaryEmail}</p>
                      )}
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      +
                    </Button>
                  </div>

                  <div className="flex items-start gap-2">
                    <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Location</p>
                      <p className="font-medium">{contactInfo.location}</p>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      +
                    </Button>
                  </div>

                  <div className="flex items-start gap-2">
                    <Globe className="h-4 w-4 text-gray-400 mt-0.5" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-500 mb-1">Language Spoken</p>
                      <div className="flex gap-2">
                        {contactInfo.languages.length > 0 ? (
                          contactInfo.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary">{lang}</Badge>
                          ))
                        ) : (
                          <p className="text-sm text-gray-400">No languages added</p>
                        )}
                      </div>
                    </div>
                    <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                      +
                    </Button>
                  </div>
                </div>

                <Button variant="ghost" className="w-full text-sm text-gray-600 mt-4">
                  + Add Description
                </Button>
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
                  Sessions <Badge variant="secondary" className="ml-1">0</Badge>
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
                    {/* About Me Section */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">About Me</h3>
                        <Button variant="ghost" size="sm" disabled>
                          <Pencil className="h-4 w-4" />
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {loading ? (
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                        ) : contactInfo.bio ? (
                          <p className="text-sm text-gray-700 dark:text-gray-300 whitespace-pre-wrap">
                            {contactInfo.bio}
                          </p>
                        ) : (
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center">
                            <p className="text-xs text-gray-400">No bio added yet</p>
                          </div>
                        )}
                        {!contactInfo.bio && !loading && (
                          <p className="text-xs text-gray-400">Tell others about yourself</p>
                        )}
                      </div>
                    </Card>

                    {/* Purchase History */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Recent Purchases</h3>
                        <Button variant="outline" size="sm">
                          View All
                        </Button>
                      </div>
                      <div className="space-y-3">
                        {[1, 2, 3].map((i) => (
                          <div key={i} className="flex items-center gap-3 p-3 border border-gray-200 dark:border-gray-700 rounded-lg">
                            <div className="h-12 w-12 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            <div className="flex-1 space-y-2">
                              <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                              <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="text-center py-8">
                        <ShoppingBag className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                        <p className="text-sm text-gray-500">No purchases yet</p>
                      </div>
                    </Card>

                    {/* Wishlist */}
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold">Wishlist</h3>
                        <Badge variant="secondary">0 items</Badge>
                      </div>
                      <div className="text-center py-8">
                        <Heart className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-3" />
                        <p className="text-sm text-gray-500">No items in wishlist</p>
                      </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button disabled className="flex-1">Save Changes</Button>
                      <Button variant="outline" disabled>Cancel</Button>
                    </div>
                  </div>
                )}

                {/* 2. SESSIONS TAB */}
                {activeTab === "sessions" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">My Sessions</h3>
                      <p className="text-sm text-gray-500">View and manage your booked sessions</p>
                    </div>

                    {/* Session Cards */}
                    <div className="space-y-3">
                      {[1, 2].map((i) => (
                        <Card key={i} className="p-4">
                          <div className="flex items-center justify-between">
                            <div className="space-y-2 flex-1">
                              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                              <div className="h-3 w-32 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                            </div>
                            <Button disabled size="sm">
                              <Video className="h-4 w-4 mr-2" />
                              Join Meeting
                            </Button>
                          </div>
                        </Card>
                      ))}
                    </div>

                    <div className="text-center py-12">
                      <CalendarDays className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <p className="text-sm text-gray-500">No scheduled sessions</p>
                      <Button variant="outline" className="mt-4" disabled>
                        Browse Services
                      </Button>
                    </div>
                  </div>
                )}

                {/* 3. SETTINGS TAB */}
                {activeTab === "settings" && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Account Settings</h3>
                      <p className="text-sm text-gray-500">Manage your account preferences</p>
                    </div>

                    {/* Notification Preferences */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Notification Preferences</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Email Notifications</p>
                            <p className="text-sm text-gray-500">Receive updates via email</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-not-allowed">
                            <input type="checkbox" disabled className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Session Reminders</p>
                            <p className="text-sm text-gray-500">Get reminded before sessions</p>
                          </div>
                          <label className="relative inline-flex items-center cursor-not-allowed">
                            <input type="checkbox" disabled className="sr-only peer" />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                          </label>
                        </div>
                      </div>
                    </Card>

                    {/* Privacy Settings */}
                    <Card className="p-6">
                      <h4 className="font-semibold mb-4">Privacy</h4>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-medium">Profile Visibility</p>
                            <p className="text-sm text-gray-500">Who can see your profile</p>
                          </div>
                          <Badge variant="outline">Public</Badge>
                        </div>
                      </div>
                    </Card>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <Button disabled className="flex-1">Save Settings</Button>
                      <Button variant="outline" disabled>Cancel</Button>
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

export default BuyerProfile;
