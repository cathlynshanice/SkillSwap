import { Badge } from "@/components/ui/badge";
import { User, Briefcase, MessageSquare, Bell, Handshake, Star, Video, CalendarDays, Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { isSeller } from "@/lib/userContext";
import { useState, useEffect } from "react";

/* Small local helper component for section titles */
const SectionTitle = ({ title }: { title: string }) => (
  <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">{title}</p>
);

/* Shared items (common to both roles) */
const commonItems = [
  { key: "messages", icon: <MessageSquare className="h-4 w-4" />, label: "Messages", path: "/messages", badge: 0 },
  { key: "notifications", icon: <Bell className="h-4 w-4" />, label: "Notifications", path: "/notifications", badge: 0 },
];

/* Items intended for contributors (seller) */
const contributorItems = [
  { key: "profile", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile" },
  { key: "projects", icon: <Briefcase className="h-4 w-4" />, label: "Projects Showcase", path: "/projects" },
  { key: "insights", icon: <TrendingUp className="h-4 w-4" />, label: "Seller Insights", path: "/seller-insights" },
];

/* Items intended for seekers (buyer) */
const seekerItems = [
  { key: "browse", icon: <Search className="h-4 w-4" />, label: "Browse Contributors", path: "/browse-contributors" },
  { key: "profile_buyer", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile" },
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

  // Listen for explicit role changes (setUserRole)
  useEffect(() => {
    const onRoleChange = () => setUserIsSeller(isSeller());
    window.addEventListener("mockUserRoleChanged", onRoleChange);
    return () => window.removeEventListener("mockUserRoleChanged", onRoleChange);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  // Show full sidebar if hovered or not collapsed
  const showFull = !collapsed || hovered;

  const renderItem = (item: any) => (
    <button
      key={item.key}
      onClick={() => navigate(item.path)}
      className={
        showFull
          ? `w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              isActive(item.path) ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          : `flex items-center justify-center w-10 h-10 rounded-md ${
              isActive(item.path) ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
      }
      title={!showFull ? item.label : undefined}
    >
      {item.icon}
      {showFull && <span>{item.label}</span>}
      {item.badge !== undefined && showFull && <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>}
    </button>
  );

  return (
    <aside
      className={`transition-all duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0
        ${showFull ? "w-64" : "w-16"} relative`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ minWidth: showFull ? 256 : 64 }}
    >
      {/* Logo + collapse chevron centered near logo */}
      <div className={`px-4 pt-4 pb-2 flex items-center gap-2 relative ${showFull ? "" : "justify-center"}`}>
        <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
        {showFull && (
          <>
            <div className="ml-2">
              <h1 className="text-lg font-bold">SkillSwap</h1>
              <p className="text-[10px] text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
            <button
              className="ml-auto mr-2 p-2 rounded-full shadow-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              onClick={() => setCollapsed(true)}
              aria-label="Collapse sidebar"
              title="Collapse"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        )}
      </div>

      {/* collapsed-state chevron sits outside */}
      {!showFull && (
        <button
          className="absolute left-full top-8 -translate-x-1/2 p-2 rounded-full shadow-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all z-30"
          onClick={() => setCollapsed(false)}
          aria-label="Expand sidebar"
          title="Expand"
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      )}

      {/* Search (only when expanded) */}
      {showFull && (
        <div className="px-4 pt-2 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-2 text-sm border rounded-md" />
          </div>
        </div>
      )}

      <nav className={`flex-1 ${showFull ? "px-2 py-2 space-y-1" : "py-2 flex flex-col items-center gap-2"}`}>
        {/* Role-specific sections */}
        {userIsSeller ? (
          <>
            <SectionTitle title="Contributor Dashboard" />
            {contributorItems.map(renderItem)}
          </>
        ) : (
          <>
            <SectionTitle title="Seeker Tools" />
            {seekerItems.map(renderItem)}
          </>
        )}

        {/* Common Section (always) */}
        <div className={showFull ? "pt-4" : "pt-2"}>
          {showFull && <SectionTitle title="Communication" />}
          {commonItems.map(renderItem)}
        </div>

        {/* Active sessions (visible to both) */}
        <div className={showFull ? "pt-4" : "pt-2"}>
          {showFull && <SectionTitle title="Active Sessions" />}
          {activeSessionsItems.map(renderItem)}
        </div>

        {/* Saved Connections */}
        <div className={showFull ? "pt-4" : "pt-2"}>
          {showFull && <SectionTitle title="Saved Connections" />}
          {showFull ? (
            <div className="px-3 py-6 text-center">
              <p className="text-xs text-gray-400">No connections yet</p>
            </div>
          ) : (
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