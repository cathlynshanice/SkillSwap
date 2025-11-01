import LandingNavbar from "@/components/LandingNavbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Globe, Bell, Lock, Key, LogOut, Pencil, MapPin, Check, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";

const ProfileSettings = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [isEditingLocation, setIsEditingLocation] = useState(false);
  const [location, setLocation] = useState("");
  const [completionPercentage, setCompletionPercentage] = useState(10);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const menuItems = [
    { id: "profile", label: "Edit Profile", icon: Pencil, section: "Profile" },
    { id: "language", label: "Language", icon: Globe, section: "Profile" },
    { id: "notifications", label: "Notifications", icon: Bell, section: "Profile" },
    { id: "payments", label: "Payments", icon: null, section: "Bank" },
    { id: "taxes", label: "Taxes", icon: null, section: "Bank" },
    { id: "transactions", label: "Transactions", icon: null, section: "Bank" },
    { id: "password", label: "Password", icon: Lock, section: "Secure" },
    { id: "access", label: "Access", icon: Key, section: "Secure" },
    { id: "sessions", label: "Sessions", icon: null, section: "Secure" },
  ];

  const checklistItems = [
    { label: "Setup account", percentage: 10, completed: true },
    { label: "Upload your photo", percentage: 5, completed: false },
    { label: "Personal Info", percentage: 10, completed: false },
    { label: "Location", percentage: 20, completed: false },
    { label: "Biography", percentage: 15, completed: false },
    { label: "Notifications", percentage: 10, completed: false },
    { label: "Bank details", percentage: 30, completed: false },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <LandingNavbar />
      
      <div className="pt-20 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex gap-6">
            {/* Left Sidebar */}
            <div className="w-64 flex-shrink-0">
              <Card className="p-4">
                <div className="flex items-center gap-3 mb-6">
                  <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-white font-semibold">
                    GU
                  </div>
                  <span className="font-semibold">Gridlines UI</span>
                </div>

                <nav className="space-y-1">
                  {/* Profile Section */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">Profile</p>
                    {menuItems.filter(item => item.section === "Profile").map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Bank Section */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">Bank</p>
                    {menuItems.filter(item => item.section === "Bank").map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Secure Section */}
                  <div className="mb-4">
                    <p className="text-xs font-semibold text-muted-foreground mb-2 px-3">Secure</p>
                    {menuItems.filter(item => item.section === "Secure").map((item) => (
                      <button
                        key={item.id}
                        onClick={() => setActiveSection(item.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors ${
                          activeSection === item.id
                            ? "bg-primary/10 text-primary font-medium"
                            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                        }`}
                      >
                        {item.icon && <item.icon className="h-4 w-4" />}
                        {item.label}
                      </button>
                    ))}
                  </div>

                  {/* Delete Account */}
                  <button className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-red-600 hover:bg-red-50 dark:hover:bg-red-950 transition-colors">
                    <LogOut className="h-4 w-4" />
                    Delete account
                  </button>
                </nav>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <Card className="p-8">
                <h1 className="text-2xl font-bold mb-8">Edit Profile</h1>

                {/* Profile Picture */}
                <div className="flex items-start gap-6 mb-8">
                  <div className="relative">
                    <div className="h-24 w-24 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center">
                      <Camera className="h-10 w-10 text-gray-500" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Upload new photo</h3>
                    <p className="text-sm text-muted-foreground">
                      At least 800×800 px recommended.<br />
                      JPG or PNG is allowed
                    </p>
                  </div>
                </div>

                {/* Personal Info */}
                <div className="mb-8">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Personal Info</h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <div className="grid grid-cols-3 gap-6">
                    <div>
                      <Label className="text-xs text-muted-foreground">Full Name</Label>
                      <p className="text-sm text-gray-400 italic mt-1">Not set</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <p className="text-sm text-gray-400 italic mt-1">Not set</p>
                    </div>
                    <div>
                      <Label className="text-xs text-muted-foreground">Phone</Label>
                      <p className="text-sm text-gray-400 italic mt-1">Not set</p>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="mb-8 pb-8 border-b">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Location</h2>
                    {!isEditingLocation && (
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        className="text-primary"
                        onClick={() => setIsEditingLocation(true)}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    )}
                  </div>
                  {isEditingLocation ? (
                    <div className="flex items-center gap-2">
                      <div className="relative flex-1">
                        <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input 
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          className="pl-10"
                          placeholder="Enter location"
                        />
                      </div>
                      <Button 
                        size="sm"
                        onClick={() => setIsEditingLocation(false)}
                      >
                        Save changes
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setIsEditingLocation(false);
                          setLocation("");
                        }}
                      >
                        Cancel
                      </Button>
                    </div>
                  ) : (
                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-400 italic">Not set</span>
                    </div>
                  )}
                </div>

                {/* Bio */}
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold">Bio</h2>
                    <Button variant="ghost" size="sm" className="text-primary">
                      <Pencil className="h-4 w-4 mr-1" />
                      Edit
                    </Button>
                  </div>
                  <p className="text-sm text-gray-400 italic leading-relaxed">
                    No bio added yet. Tell us about yourself, your skills, and what you're passionate about!
                  </p>
                </div>
              </Card>
            </div>

            {/* Right Sidebar - Completion */}
            <div className="w-80 flex-shrink-0">
              <Card className="p-6">
                <h3 className="font-semibold mb-6">Complete your profile</h3>
                
                {/* Circular Progress */}
                <div className="flex justify-center mb-6">
                  <div className="relative h-32 w-32">
                    <svg className="transform -rotate-90 h-32 w-32">
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        className="text-gray-200 dark:text-gray-700"
                      />
                      <circle
                        cx="64"
                        cy="64"
                        r="56"
                        stroke="currentColor"
                        strokeWidth="8"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 56}`}
                        strokeDashoffset={`${2 * Math.PI * 56 * (1 - completionPercentage / 100)}`}
                        className="text-green-500 transition-all duration-500"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-3xl font-bold">{completionPercentage}%</span>
                    </div>
                  </div>
                </div>

                {/* Checklist */}
                <div className="space-y-3">
                  {checklistItems.map((item, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {item.completed ? (
                          <Check className="h-4 w-4 text-green-500" />
                        ) : (
                          <X className="h-4 w-4 text-gray-300" />
                        )}
                        <span className={`text-sm ${item.completed ? "text-gray-900 dark:text-gray-100" : "text-gray-500"}`}>
                          {item.label}
                        </span>
                      </div>
                      <span className={`text-xs font-medium ${item.completed ? "text-gray-500" : "text-green-600"}`}>
                        {item.completed ? `${item.percentage}%` : `+${item.percentage}%`}
                      </span>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileSettings;
