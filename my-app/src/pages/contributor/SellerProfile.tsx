import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Phone, Mail, MapPin, Globe, MoreVertical, Ticket, User, UserPlus, PhoneCall, Video, Clock, BookOpen, GraduationCap, Star, Handshake, CalendarDays, Pencil, TrendingUp, BarChart3, DollarSign, ShoppingBag, Package, MessageSquare, Eye, AlertCircle, Settings, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

const SellerProfile = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"profile" | "sessions" | "settings">("profile");
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    // Optional: dev-only quick override via URL param ?as=seller
    if (import.meta.env.DEV && new URLSearchParams(window.location.search).get("as") === "seller") {
      import("@/lib/userContext").then((mod) => mod.setUserRole("seller"));
    }
  }, []);

  const activities = [
    {
      section: "Recent Activity",
      items: [
        {
          icon: "graduation",
          iconColor: "bg-indigo-500",
          title: "Joined SkillSwap - Binus University Student Network",
          time: "Just now",
        },
      ],
    },
  ];

  const contactInfo = {
    source: "Student Registration",
    studentId: "Not set",
    phone: "Not set",
    email: "Not set",
    secondaryEmail: "",
    location: "Not set",
    languages: [] as string[],
    major: "Not set",
    semester: "Not set",
    campus: "Not set",
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case "ticket":
        return <Ticket className="h-4 w-4 text-white" />;
      case "user":
        return <User className="h-4 w-4 text-white" />;
      case "userplus":
        return <UserPlus className="h-4 w-4 text-white" />;
      case "phone":
        return <PhoneCall className="h-4 w-4 text-white" />;
      case "video":
        return <Video className="h-4 w-4 text-white" />;
      case "book":
        return <BookOpen className="h-4 w-4 text-white" />;
      case "star":
        return <Star className="h-4 w-4 text-white" />;
      case "graduation":
        return <GraduationCap className="h-4 w-4 text-white" />;
      default:
        return <User className="h-4 w-4 text-white" />;
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
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-gray-300 to-gray-400 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                    ?
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">New User</h2>
                    <Badge variant="outline" className="mt-1">
                      <GraduationCap className="h-3 w-3 mr-1" />
                      Binus University
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
                            <p className="text-sm text-gray-400">Not set</p>
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
                      {/* Seller Badge */}
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">Seller Status</h3>
                          <Badge className="bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
                            <CheckCircle2 className="h-3 w-3 mr-1" />
                            Verified Seller
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-500">Your seller profile is active and verified.</p>
                      </Card>

                      {/* Bio Section */}
                      <Card className="p-6">
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-lg font-semibold">About Me</h3>
                          <Button variant="ghost" size="sm" disabled>
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </div>
                        <div className="space-y-3">
                          <div className="h-20 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                          <p className="text-xs text-gray-400">Bio description will appear here</p>
                        </div>
                      </Card>

                      {/* Skills & Categories */}
                      <Card className="p-6">
                        <h3 className="text-lg font-semibold mb-4">Skills & Categories</h3>
                        <div className="grid grid-cols-2 gap-4">
                          {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="h-12 bg-gray-100 dark:bg-gray-700 rounded animate-pulse"></div>
                          ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-3">Your skills and categories will be listed here</p>
                      </Card>

                      {/* Action Buttons */}
                      <div className="flex gap-3">
                        <Button disabled className="flex-1">Save Changes</Button>
                        <Button variant="outline" disabled>Cancel</Button>
                      </div>
                    </div>
                  )}

                  {/* 2. SCHEDULED & VIDEO SESSIONS TAB */}
                  {activeTab === "sessions" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Scheduled Sessions</h3>
                        <p className="text-sm text-gray-500">Manage your upcoming and past sessions</p>
                      </div>

                      {/* Calendar Grid Placeholder */}
                      <Card className="p-6">
                        <div className="grid grid-cols-7 gap-2 mb-4">
                          {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                              {day}
                            </div>
                          ))}
                          {Array.from({ length: 35 }).map((_, i) => (
                            <div key={i} className="aspect-square border border-gray-200 dark:border-gray-700 rounded hover:bg-gray-50 dark:hover:bg-gray-700/30"></div>
                          ))}
                        </div>
                      </Card>

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
                      </div>
                    </div>
                  )}

                  {/* 3. SELLER SETTINGS TAB */}
                  {activeTab === "settings" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold mb-2">Seller Settings</h3>
                        <p className="text-sm text-gray-500">Manage your seller account preferences</p>
                      </div>

                      {/* Availability Settings */}
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Availability</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Available for Orders</p>
                              <p className="text-sm text-gray-500">Accept new orders from buyers</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-not-allowed">
                              <input type="checkbox" disabled className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Pause All Listings</p>
                              <p className="text-sm text-gray-500">Temporarily hide your services</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-not-allowed">
                              <input type="checkbox" disabled className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </Card>

                      {/* Notification Settings */}
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Notification Preferences</h4>
                        <div className="space-y-4">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Order Notifications</p>
                              <p className="text-sm text-gray-500">Get notified about new orders</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-not-allowed">
                              <input type="checkbox" disabled className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>

                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-medium">Review Notifications</p>
                              <p className="text-sm text-gray-500">Get notified about new reviews</p>
                            </div>
                            <label className="relative inline-flex items-center cursor-not-allowed">
                              <input type="checkbox" disabled className="sr-only peer" />
                              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                            </label>
                          </div>
                        </div>
                      </Card>

                      {/* Pricing Settings */}
                      <Card className="p-6">
                        <h4 className="font-semibold mb-4">Pricing & Fees</h4>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Service Fee</span>
                            <span className="font-medium">--</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Payment Method</span>
                            <span className="font-medium">Not configured</span>
                          </div>
                        </div>
                      </Card>

                      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
                        <div className="flex gap-3">
                          <AlertCircle className="h-5 w-5 text-yellow-600 dark:text-yellow-400 flex-shrink-0" />
                          <div>
                            <p className="text-sm font-medium text-yellow-800 dark:text-yellow-200">Settings unavailable in static mode</p>
                            <p className="text-xs text-yellow-700 dark:text-yellow-300 mt-1">These settings will become functional when connected to backend services.</p>
                          </div>
                        </div>
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