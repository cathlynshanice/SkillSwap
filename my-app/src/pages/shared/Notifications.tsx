import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Bell } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

const Notifications = () => {
  const navigate = useNavigate();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const notifications = [
    {
      id: 1,
      type: "New Registration",
      typeColor: "bg-green-500",
      title: "New Registration: Finibus Bonorum et Malorum",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Allen Dep",
      time: "24 Nov 2018 at 9:56 AM",
      unread: true,
    },
    {
      id: 2,
      type: "Message",
      typeColor: "bg-orange-500",
      title: "Darren Smith sent new message",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Darren",
      time: "24 Nov 2018 at 9:56 AM",
      unread: true,
    },
    {
      id: 3,
      type: "Comment",
      typeColor: "bg-purple-600",
      title: "Arin Gansilvam Commented on post",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Arin Gansilvam",
      time: "24 Nov 2018 at 9:56 AM",
      unread: false,
    },
    {
      id: 4,
      type: "Connect",
      typeColor: "bg-cyan-500",
      title: "Juliet Ben Connect Allen Depk",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Juliet Ben",
      time: "24 Nov 2018 at 9:56 AM",
      unread: false,
    },
    {
      id: 5,
      type: "Connect",
      typeColor: "bg-cyan-500",
      title: "Juliet Ben Connect Allen Depk",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Juliet Ben",
      time: "24 Nov 2018 at 9:56 AM",
      unread: false,
    },
    {
      id: 6,
      type: "Message",
      typeColor: "bg-orange-500",
      title: "Darren Smith sent new message",
      description: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium",
      author: "Juliet Ben",
      time: "24 Nov 2018 at 9:56 AM",
      unread: false,
    },
  ];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar Navigation */}
      <ProfileSidebar />

      {/* Main Content Area - Full Screen Split View */}
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
            <span className="text-gray-900 dark:text-gray-100 font-medium">Notifications</span>
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
            <h3 className="text-lg font-semibold mb-6">Notifications</h3>
            
            {/* Notification Cards */}
            <div className="space-y-3 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-3 w-full bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                      <div className="h-3 w-24 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            <div className="text-center py-12">
              <Bell className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
              <p className="text-sm text-gray-500">You haven't received any notifications yet</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
