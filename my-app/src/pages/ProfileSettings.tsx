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
      section: "Today",
      items: [
        {
          icon: "book",
          iconColor: "bg-blue-500",
          title: "Skill Exchange Request created for Python Programming Basics",
          time: "11:12 AM, Nov 2, 2025",
        },
        {
          icon: "star",
          iconColor: "bg-yellow-500",
          title: "Received 5-star rating from Jessica Tan for Web Development Session",
          time: "9:45 AM, Nov 2, 2025",
        },
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Alex Wijaya - UI/UX Design Major",
          time: "8:30 AM, Nov 2, 2025",
        },
        {
          icon: "video",
          iconColor: "bg-red-500",
          title: "Scheduled virtual session with Rachel Lee for Database Management",
          time: "7:15 AM, Nov 2, 2025",
        },
      ],
    },
    {
      section: "This week",
      items: [
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Michael Chen - Data Science Major",
          time: "3:24 PM, Oct 31, 2025",
        },
        {
          icon: "book",
          iconColor: "bg-purple-500",
          title: "Completed skill exchange: Mobile App Development with Sarah Lim",
          time: "10:30 AM, Oct 30, 2025",
        },
        {
          icon: "star",
          iconColor: "bg-yellow-500",
          title: "Received 4-star rating from Kevin Tan for Machine Learning Tutorial",
          time: "4:20 PM, Oct 29, 2025",
        },
        {
          icon: "book",
          iconColor: "bg-blue-500",
          title: "Started new skill exchange: Advanced JavaScript with Thomas Anderson",
          time: "11:00 AM, Oct 29, 2025",
        },
        {
          icon: "video",
          iconColor: "bg-red-500",
          title: "Completed virtual session with Emily Zhang on React Hooks",
          time: "2:45 PM, Oct 28, 2025",
        },
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Amanda Santos - Graphic Design Major",
          time: "9:00 AM, Oct 28, 2025",
        },
      ],
    },
    {
      section: "This month",
      items: [
        {
          icon: "video",
          iconColor: "bg-red-500",
          title: "Virtual session with David Wong for Java Programming",
          time: "2:15 PM, Oct 28, 2025",
        },
        {
          icon: "star",
          iconColor: "bg-yellow-500",
          title: "Received 5-star rating from Brian Johnson for Python Fundamentals",
          time: "5:30 PM, Oct 25, 2025",
        },
        {
          icon: "book",
          iconColor: "bg-purple-500",
          title: "Completed skill exchange: Cloud Computing Basics with Lisa Chen",
          time: "1:20 PM, Oct 24, 2025",
        },
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Ryan Martinez - Software Engineering Major",
          time: "10:15 AM, Oct 23, 2025",
        },
        {
          icon: "video",
          iconColor: "bg-red-500",
          title: "Virtual session with Sophie Brown on Git and GitHub",
          time: "3:00 PM, Oct 22, 2025",
        },
        {
          icon: "book",
          iconColor: "bg-blue-500",
          title: "Started skill exchange: Digital Marketing with Patricia Lee",
          time: "11:45 AM, Oct 20, 2025",
        },
        {
          icon: "star",
          iconColor: "bg-yellow-500",
          title: "Received 5-star rating from Daniel Kim for HTML/CSS Workshop",
          time: "4:10 PM, Oct 18, 2025",
        },
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Michelle Wong - Business Analytics Major",
          time: "9:30 AM, Oct 17, 2025",
        },
      ],
    },
    {
      section: "Earlier",
      items: [
        {
          icon: "graduation",
          iconColor: "bg-indigo-500",
          title: "Joined SkillSwap - Binus University Student Network",
          time: "9:00 AM, Oct 15, 2025",
        },
        {
          icon: "book",
          iconColor: "bg-purple-500",
          title: "Completed profile setup and added first skill: Web Development",
          time: "10:30 AM, Oct 15, 2025",
        },
        {
          icon: "userplus",
          iconColor: "bg-green-500",
          title: "Connected with Jason Lee - First connection on SkillSwap",
          time: "2:00 PM, Oct 15, 2025",
        },
        {
          icon: "video",
          iconColor: "bg-red-500",
          title: "Attended orientation session: How to use SkillSwap effectively",
          time: "3:30 PM, Oct 15, 2025",
        },
      ],
    },
  ];

  const contactInfo = {
    source: "Student Registration",
    studentId: "2502012345",
    phone: "+62 812-3456-7890",
    email: "jennifer.wijaya@binus.ac.id",
    secondaryEmail: "jenny.wijaya@gmail.com",
    location: "Jakarta, Indonesia",
    timezone: "UTC+07:00 (WIB)",
    languages: ["Indonesian", "English"],
    major: "Computer Science",
    semester: "Semester 5",
    campus: "Binus Alam Sutera",
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
        <div className="px-4 pt-6 pb-4 border-b border-gray-200 dark:border-gray-700">
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
            <Badge variant="destructive" className="ml-auto">3</Badge>
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
              <Badge variant="secondary" className="ml-auto">2</Badge>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">
              <CalendarDays className="h-4 w-4" /> Scheduled
              <Badge variant="secondary" className="ml-auto">4</Badge>
            </button>
          </div>

          <div className="pt-4">
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Saved Connections</p>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
              <User className="h-3 w-3" />
              <span className="flex-1 truncate text-xs">Michael Chen</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
              <User className="h-3 w-3" />
              <span className="flex-1 truncate text-xs">Sarah Lim</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-left">
              <User className="h-3 w-3" />
              <span className="flex-1 truncate text-xs">David Wong</span>
            </button>
            <button className="w-full flex items-center gap-3 px-3 py-2 text-sm text-primary hover:bg-gray-100 dark:hover:bg-gray-700">
              <Users className="h-3 w-3" /> View all
            </button>
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
                  <div className="h-14 w-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">
                    JW
                  </div>
                  <div>
                    <h2 className="font-bold text-lg">Jennifer Wijaya</h2>
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
                        <p className="font-medium text-primary text-sm">{contactInfo.email}</p>
                        <p className="font-medium text-primary text-sm mt-1">{contactInfo.secondaryEmail}</p>
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
                          {contactInfo.languages.map((lang, idx) => (
                            <Badge key={idx} variant="secondary">{lang}</Badge>
                          ))}
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
                    Reviews <Badge variant="secondary" className="ml-1">12</Badge>
                  </button>
                  <button className="flex items-center gap-2 pb-2 text-gray-500 hover:text-gray-900">
                    <CalendarDays className="h-4 w-4" /> Sessions <Badge variant="secondary" className="ml-1">6</Badge>
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
