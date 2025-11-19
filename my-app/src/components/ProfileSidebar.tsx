import { Badge } from "@/components/ui/badge";
import { User, Briefcase, MessageSquare, Bell, Handshake, Star, Video, CalendarDays, Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { isSeller } from "@/lib/userContext";
import { useState, useEffect } from "react";

const sidebarItems = [
  { key: "profile", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile", sellerPath: "/seller-profile" },
  { key: "projects", icon: <Briefcase className="h-4 w-4" />, label: "Projects Showcase", path: "/projects", sellerOnly: true },
  { key: "browse", icon: <Search className="h-4 w-4" />, label: "Browse Contributors", path: "/browse-contributors", sellerOnly: true },
  { key: "reviews", icon: <Star className="h-4 w-4" />, label: "Reviews & Ratings", path: "/reviews", sellerOnly: true },
  { key: "messages", icon: <MessageSquare className="h-4 w-4" />, label: "Messages", path: "/messages", badge: 0 },
  { key: "notifications", icon: <Bell className="h-4 w-4" />, label: "Notifications", path: "/notifications", badge: 0 },
];

const sellerDashboardItems = [
  { key: "insights", icon: <TrendingUp className="h-4 w-4" />, label: "Seller Insights", path: "/seller-insights" },
];

const activeSessionsItems = [
  { key: "video", icon: <Video className="h-4 w-4" />, label: "Video Sessions", path: "#", badge: 0 },
  { key: "scheduled", icon: <CalendarDays className="h-4 w-4" />, label: "Scheduled", path: "#", badge: 0 },
];

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userIsSeller, setUserIsSeller] = useState(isSeller());
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    setUserIsSeller(isSeller());
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  // Show full sidebar if hovered or not collapsed
  const showFull = !collapsed || hovered;

  return (
    <aside
      className={`transition-all duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0
        ${showFull ? "w-64" : "w-16"} relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minWidth: showFull ? 256 : 64 }}
    >
      {/* Collapse/Expand Button */}
      <button
        className={`absolute top-2 right-2 z-20 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700`}
        onClick={() => setCollapsed(c => !c)}
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>

      {/* Logo Section */}
      <div className={`px-4 pt-4 pb-2 flex items-center gap-2 ${showFull ? "" : "justify-center"}`}>
        <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
        {showFull && (
          <div>
            <h1 className="text-lg font-bold">SkillSwap</h1>
            <p className="text-[10px] text-muted-foreground">Learn, Share, and Swap Skills.</p>
          </div>
        )}
      </div>

      {/* Search Section */}
      {showFull && (
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
      )}

      <nav className={`flex-1 ${showFull ? "px-2 py-2 space-y-1" : "py-2 flex flex-col items-center gap-2"}`}>
        {/* Main Items */}
        {sidebarItems.map(item => {
          if (item.sellerOnly && !userIsSeller) return null;
          const path = item.key === "profile" && userIsSeller ? item.sellerPath! : item.path;
          return (
            <button
              key={item.key}
              onClick={() => navigate(path)}
              className={
                showFull
                  ? `w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
                      isActive(path)
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
                  : `flex items-center justify-center w-10 h-10 rounded-md ${
                      isActive(path)
                        ? "bg-gray-100 dark:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    }`
              }
              title={!showFull ? item.label : undefined}
            >
              {item.icon}
              {showFull && <span>{item.label}</span>}
              {item.badge !== undefined && showFull && (
                <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>
              )}
            </button>
          );
        })}

        {/* Seller Dashboard */}
        {userIsSeller && (
          <div className={showFull ? "pt-4" : "pt-2"}>
            {showFull && (
              <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Seller Dashboard</p>
            )}
            {sellerDashboardItems.map(item => (
              <button
                key={item.key}
                onClick={() => navigate(item.path)}
                className={
                  showFull
                    ? `w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
                        isActive(item.path)
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                    : `flex items-center justify-center w-10 h-10 rounded-md ${
                        isActive(item.path)
                          ? "bg-gray-100 dark:bg-gray-700"
                          : "hover:bg-gray-100 dark:hover:bg-gray-700"
                      }`
                }
                title={!showFull ? item.label : undefined}
              >
                {item.icon}
                {showFull && <span>{item.label}</span>}
              </button>
            ))}
          </div>
        )}

        {/* Active Sessions */}
        <div className={showFull ? "pt-4" : "pt-2"}>
          {showFull && (
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Active Sessions</p>
          )}
          {activeSessionsItems.map(item => (
            <button
              key={item.key}
              className={
                showFull
                  ? "w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
                  : "flex items-center justify-center w-10 h-10 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              }
              title={!showFull ? item.label : undefined}
            >
              {item.icon}
              {showFull && <span>{item.label}</span>}
              {item.badge !== undefined && showFull && (
                <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>
              )}
            </button>
          ))}
        </div>

        {/* Saved Connections */}
        <div className={showFull ? "pt-4" : "pt-2"}>
          {showFull && (
            <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">Saved Connections</p>
          )}
          {showFull ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-gray-400">No connections yet</p>
            </div>
          ) : (
            // FIX: Wrap the icon in a div/span to apply the title attribute
            <div className="flex items-center justify-center w-10 h-10 mx-auto" title="Saved Connections"> 
              <Handshake className="h-5 w-5 text-gray-400" />
            </div>
          )}
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;