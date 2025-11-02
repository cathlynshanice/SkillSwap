import { Badge } from "@/components/ui/badge";
import { User, Briefcase, MessageSquare, Bell, Handshake, Star, Video, CalendarDays, Search } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const isActive = (path: string) => location.pathname === path;

  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0">
      {/* Logo Section */}
      <div className="px-4 pt-4 pb-2">
        <div className="flex items-center gap-2">
          <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
          <div>
            <h1 className="text-lg font-bold">SkillSwap</h1>
            <p className="text-[10px] text-muted-foreground">Learn, Share, and Swap Skills.</p>
          </div>
        </div>
      </div>

      {/* Search Section */}
      <div className="px-4 pt-2 pb-4">
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
        <button 
          onClick={() => navigate('/profile')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
            isActive('/profile') 
              ? 'bg-gray-100 dark:bg-gray-700' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <User className="h-4 w-4" /> My Profile
        </button>
        <button 
          onClick={() => navigate('/projects')}
          className={`w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
            isActive('/projects') 
              ? 'bg-gray-100 dark:bg-gray-700' 
              : 'hover:bg-gray-100 dark:hover:bg-gray-700'
          }`}
        >
          <Briefcase className="h-4 w-4" /> Projects Showcase
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
  );
};

export default ProfileSidebar;
