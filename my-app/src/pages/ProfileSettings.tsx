import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CheckCircle2, Calendar, Phone, Mail, MapPin, Globe, MoreVertical, Ticket, User, UserPlus, PhoneCall, Video, Clock, BookOpen, GraduationCap, Star, Handshake, CalendarDays, Pencil } from "lucide-react";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

const ProfileSettings = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeTab, setActiveTab] = useState<"activity" | "skills" | "reviews" | "sessions">("activity");
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
                <div className="flex items-center gap-1 border-b border-gray-200 dark:border-gray-700 mb-6">
                  <button 
                    onClick={() => setActiveTab("activity")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                      activeTab === "activity" 
                        ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" 
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <CheckCircle2 className="h-4 w-4" />
                    Activity
                  </button>
                  <button 
                    onClick={() => setActiveTab("skills")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                      activeTab === "skills" 
                        ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" 
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <BookOpen className="h-4 w-4" />
                    Skills Offered
                  </button>
                  <button 
                    onClick={() => setActiveTab("reviews")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                      activeTab === "reviews" 
                        ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" 
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <Star className="h-4 w-4" />
                    Reviews <Badge variant="secondary" className="ml-1">0</Badge>
                  </button>
                  <button 
                    onClick={() => setActiveTab("sessions")}
                    className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-t-lg border-b-2 transition-all ${
                      activeTab === "sessions" 
                        ? "border-primary bg-gray-50 dark:bg-gray-700/50 text-primary" 
                        : "border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 hover:bg-gray-50 dark:hover:bg-gray-700/30"
                    }`}
                  >
                    <CalendarDays className="h-4 w-4" /> Sessions <Badge variant="secondary" className="ml-1">0</Badge>
                  </button>
                </div>

                {/* Tab Content */}
                <div className="space-y-6">
                  {activeTab === "activity" && (
                    <>
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
                    </>
                  )}

                  {activeTab === "skills" && (
                    <div className="text-center py-12">
                      <BookOpen className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Skills Added Yet</h3>
                      <p className="text-sm text-gray-500 mb-6">Start building your profile by adding skills you can offer or want to learn.</p>
                      <Button>
                        <BookOpen className="h-4 w-4 mr-2" />
                        Add Your First Skill
                      </Button>
                    </div>
                  )}

                  {activeTab === "reviews" && (
                    <div className="text-center py-12">
                      <Star className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Reviews Yet</h3>
                      <p className="text-sm text-gray-500 mb-6">Reviews from your skill exchange sessions will appear here.</p>
                      <Button variant="outline">
                        <Handshake className="h-4 w-4 mr-2" />
                        Start Your First Exchange
                      </Button>
                    </div>
                  )}

                  {activeTab === "sessions" && (
                    <div className="text-center py-12">
                      <CalendarDays className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                      <h3 className="text-lg font-semibold mb-2">No Sessions Scheduled</h3>
                      <p className="text-sm text-gray-500 mb-6">Your upcoming and past skill exchange sessions will be displayed here.</p>
                      <Button variant="outline">
                        <Video className="h-4 w-4 mr-2" />
                        Schedule a Session
                      </Button>
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

export default ProfileSettings;
