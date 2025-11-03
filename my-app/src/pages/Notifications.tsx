import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MoreVertical, X, Clock } from "lucide-react";
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

        {/* Split View Content */}
        <div className="flex-1 flex overflow-hidden bg-white">
        {/* Notifications List Panel (Left Side) */}
        <div className="w-[350px] bg-white flex flex-col flex-shrink-0 border-r border-gray-200">
          {/* List Header with Tabs */}
          <div className="px-4 pt-3 pb-0 flex-shrink-0 bg-white border-b border-gray-200">
            <div className="flex gap-1 mb-0">
              <button className="px-3 py-2 text-sm font-medium text-[#0f6cbd] border-b-2 border-[#0f6cbd]">
                Focused
              </button>
              <button className="px-3 py-2 text-sm font-medium text-gray-600 hover:text-gray-900">
                Other
              </button>
            </div>
          </div>

          {/* Notifications List */}
          <div className="flex-1 overflow-y-auto bg-white">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`px-4 py-3 border-b border-gray-200 cursor-pointer hover:bg-gray-50 transition-colors ${
                  notification.unread ? 'bg-blue-50/30' : 'bg-white'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Avatar */}
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-semibold text-sm">
                      {notification.author.substring(0, 2).toUpperCase()}
                    </div>
                  </div>

                  {/* Notification Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-1">
                      <h3 className={`text-sm ${
                        notification.unread ? 'font-semibold text-gray-900' : 'font-normal text-gray-700'
                      }`}>
                        {notification.author}
                      </h3>
                      <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                        {notification.time.split(' at ')[0].split(' ').slice(-2).join(' ')}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <Badge 
                        className={`${notification.typeColor} text-white text-xs px-2 py-0`}
                      >
                        {notification.type}
                      </Badge>
                    </div>
                    <h4 className={`text-sm mb-1 ${
                      notification.unread ? 'font-medium text-gray-900' : 'font-normal text-gray-700'
                    }`}>
                      {notification.title}
                    </h4>
                    <p className="text-xs text-gray-600 line-clamp-2">
                      {notification.description}
                    </p>
                  </div>

                  {/* Unread Indicator */}
                  {notification.unread && (
                    <div className="flex-shrink-0 mt-1">
                      <div className="h-2 w-2 rounded-full bg-[#0f6cbd]"></div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Notification Detail Panel (Right Side) */}
        <div className="flex-1 bg-white flex flex-col overflow-hidden">
          {/* Detail Header */}
          <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between flex-shrink-0 bg-white">
            <div className="flex items-center gap-3">
              <Badge className={`${notifications[0].typeColor} text-white text-xs`}>
                {notifications[0].type}
              </Badge>
              <h2 className="text-lg font-semibold text-gray-900">{notifications[0].title}</h2>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                <X className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Detail Content */}
          <div className="flex-1 overflow-y-auto p-6 bg-white">
            <div className="max-w-4xl mx-auto">
              {/* Sender Info */}
              <div className="mb-6">
                <div className="flex items-start gap-3 mb-4">
                  <div className="h-12 w-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                    {notifications[0].author.substring(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900 text-base mb-1">{notifications[0].author}</p>
                        <p className="text-sm text-gray-600">
                          <span className="text-gray-400">@</span> {notifications[0].author.toLowerCase().replace(' ', '.')}@skillswap.com
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="text-sm text-gray-600">{notifications[0].time}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Message Content */}
              <div className="space-y-4">
                <p className="text-gray-800 leading-relaxed">
                  Dear User,
                </p>
                <p className="text-gray-800 leading-relaxed">
                  {notifications[0].description}
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                </p>
                <p className="text-gray-800 leading-relaxed">
                  Thanks,<br />
                  <span className="text-[#0f6cbd] font-medium">{notifications[0].author}</span>
                </p>
              </div>

              {/* Action Buttons */}
              <div className="mt-8 flex gap-3">
                <Button className="bg-[#0f6cbd] hover:bg-[#0d5aa7] text-white">Reply</Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900">Mark as Read</Button>
                <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 hover:text-gray-900">Archive</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </div>
  );
};

export default Notifications;
