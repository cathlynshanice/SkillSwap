import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, Bell } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

const Notifications = () => {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/src/assets/mock-assets/mockNotifications.json")
      .then((res) => res.json())
      .then((data) => setNotifications(data));
  }, []);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
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
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-6">Notifications</h3>
            {notifications.length > 0 ? (
              <div className="space-y-3 mb-6">
                {notifications.map((notif) => (
                  <Card key={notif.id} className="p-4 flex items-start gap-3">
                    <div className={`h-8 w-8 rounded-full flex items-center justify-center ${notif.typeColor}`}>
                      <Bell className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge variant="secondary">{notif.type}</Badge>
                        {notif.unread && (
                          <Badge variant="default" className="text-xs">New</Badge>
                        )}
                      </div>
                      <div className="font-semibold">{notif.title}</div>
                      <div className="text-sm text-gray-500">{notif.description}</div>
                      <div className="text-xs text-gray-400 mt-2">
                        {notif.author} • {notif.time}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Bell className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-sm text-gray-500">You haven't received any notifications yet</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;