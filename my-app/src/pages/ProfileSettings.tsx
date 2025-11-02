import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { ArrowLeft, CheckCircle2, Calendar, Briefcase, Phone, Mail, MapPin, Globe, Play, Pause, MoreVertical, Ticket, User, UserPlus, PhoneCall, Video, Clock, BookOpen, GraduationCap, Star, Home, Search, MessageSquare, Bell, Handshake, CalendarDays, Settings, HelpCircle, Users, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";

const ProfileSettings = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
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
    timezone: "UTC+07:00 (WIB)",
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
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
        {/* Logo Section */}
        <div className="px-4 pt-4 pb-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center gap-2">
            <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
            <div>
              <h1 className="text-lg font-bold">SkillSwap</h1>
              <p className="text-[10px] text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="px-4 pt-4 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search"
              className="w-full pl-9 pr-3 py-2 text-sm border rounded-md"
            />
          </div>
        </div>

        <nav className="flex-1 px-2 py-2 space-y-1">
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md bg-gray-100 dark:bg-gray-700">
            <User className="h-4 w-4" /> My Profile
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <BookOpen className="h-4 w-4" /> My Skills
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <MessageSquare className="h-4 w-4" /> Messages
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Bell className="h-4 w-4" /> Notifications
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Handshake className="h-4 w-4" /> Exchange Requests
          </button>
          <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
            <Star className="h-4 w-4" /> Reviews & Ratings
          </button>

          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Active Sessions</p>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <Video className="h-4 w-4" /> Video Sessions
              <Badge variant="secondary" className="ml-auto">0</Badge>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <CalendarDays className="h-4 w-4" /> Scheduled
              <Badge variant="secondary" className="ml-auto">0</Badge>
            </button>
          </div>

          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Saved Connections</p>
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-gray-400">No connections yet</p>
            </div>
          </div>
        </nav>
      </aside>

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
                      <Clock className="h-4 w-4 text-gray-400 mt-0.5" />
                      <div className="flex-1">
                        <p className="text-xs text-gray-500 mb-1">Timezone</p>
                        <p className="font-medium">{contactInfo.timezone}</p>
                      </div>
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

            {/* Right Panel - Activity Timeline */}
            <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
              <div className="p-6">
                {/* Header Tabs */}
                <div className="flex items-center gap-6 border-b pb-4 mb-6">
                  <button className="flex items-center gap-2 pb-2 border-b-2 border-primary text-primary font-medium">
                    <CheckCircle2 className="h-4 w-4" />
                    Activity
                  </button>
                  <button className="flex items-center gap-2 pb-2 text-gray-500 hover:text-gray-900">
                    <BookOpen className="h-4 w-4" />
                    Skills Offered
                  </button>
                  <button className="flex items-center gap-2 pb-2 text-gray-500 hover:text-gray-900">
                    <Star className="h-4 w-4" />
                    Reviews <Badge variant="secondary" className="ml-1">0</Badge>
                  </button>
                  <button className="flex items-center gap-2 pb-2 text-gray-500 hover:text-gray-900">
                    <CalendarDays className="h-4 w-4" /> Sessions <Badge variant="secondary" className="ml-1">0</Badge>
                  </button>
                </div>

                {/* Activity Timeline */}
                <div className="space-y-6">
                  {activities.map((section, sectionIdx) => (
                    <div key={sectionIdx}>
                      <h3 className="font-semibold mb-4 text-lg">{section.section}</h3>
                      <div className="space-y-4">
                        {section.items.map((activity, activityIdx) => (
                          <div key={activityIdx} className="flex gap-3">
                            <div className={`flex-shrink-0 h-8 w-8 rounded-full ${activity.iconColor} flex items-center justify-center mt-1`}>
                              {getIcon(activity.icon)}
                            </div>
                            <div className="flex-1">
                              <p className="text-sm">
                                <span className="font-medium">{activity.title.split(' ')[0]}</span>
                                {' '}{activity.title.substring(activity.title.indexOf(' ') + 1)}
                              </p>
                              <p className="text-xs text-gray-500 mt-1">• {activity.time}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
