import { Badge } from "@/components/ui/badge";
import { User, BriefcaseBusiness, Briefcase, MessageSquare, Bell, Handshake, Star, Search, TrendingUp, ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { isSeller } from "@/lib/userContext";
import { useState, useEffect } from "react";

/* Small local helper component for section titles */
const SectionTitle = ({ title }: { title: string }) => (
  <p className="px-3 text-xs font-semibold text-gray-500 uppercase mb-2">{title}</p>
);

const commonItems = [
  { key: "messages", icon: <MessageSquare className="h-4 w-4" />, label: "Messages", path: "/messages", badge: 0 },
  { key: "notifications", icon: <Bell className="h-4 w-4" />, label: "Notifications", path: "/notifications", badge: 0 },
];

const contributorItems = [
  { key: "profile", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile" },
  { key: "projects", icon: <Briefcase className="h-4 w-4" />, label: "Projects Showcase", path: "/projects" },
  { key: "insights", icon: <TrendingUp className="h-4 w-4" />, label: "Seller Insights", path: "/seller-insights" },
  { key: "myjobs", icon: <BriefcaseBusiness className="h-4 w-4" />, label: "Manage Jobs", path: "/myjobs" },
];

const seekerItems = [
  { key: "profile_buyer", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile" },
  { key: "browse", icon: <Search className="h-4 w-4" />, label: "Browse Contributors", path: "/browse-contributors" },
];

const activeDealsItems = [
  { key: "active_deals", icon: <Handshake className="h-4 w-4" />, label: "Active Deals", path: "/active-deals", badge: 0 },
];

// Toggle this line to show both contributor & seeker sections for any user (uncomment to enable both)
// const showBothRoles = true;
const showBothRoles = false; // <-- set to true to always show both, false for normal behavior

const ProfileSidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [userIsSeller, setUserIsSeller] = useState(isSeller());
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setUserIsSeller(isSeller());
  }, [location.pathname]);

  useEffect(() => {
    const onRoleChange = () => setUserIsSeller(isSeller());
    window.addEventListener("mockUserRoleChanged", onRoleChange);
    return () => window.removeEventListener("mockUserRoleChanged", onRoleChange);
  }, []);

  const isActive = (path: string) => location.pathname === path;

  const handleExpand = () => setCollapsed(false);
  const handleCollapse = () => setCollapsed(true);

  const handleNavigate = (path: string) => {
    navigate(path);
    setCollapsed(true);
  };

  const renderItem = (item: any) => (
    <button
      key={item.key}
      onClick={() => handleNavigate(item.path)}
      className={
        collapsed
          ? `flex items-center justify-center w-10 h-10 rounded-md ${
              isActive(item.path) ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
          : `w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md ${
              isActive(item.path) ? "bg-gray-100 dark:bg-gray-700" : "hover:bg-gray-100 dark:hover:bg-gray-700"
            }`
      }
      title={collapsed ? item.label : undefined}
    >
      {item.icon}
      {!collapsed && <span>{item.label}</span>}
      {item.badge !== undefined && !collapsed && <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>}
    </button>
  );

  return (
    <aside
      className={`transition-all duration-200 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0
        ${collapsed ? "w-16" : "w-64"} relative`}
      style={{ minWidth: collapsed ? 64 : 256 }}
      onMouseEnter={() => !collapsed && null}
      onMouseLeave={() => !collapsed && null}
    >
      {/* Logo + collapse/expand chevron */}
      <div className={`px-4 pt-4 pb-2 flex items-center gap-2 relative ${collapsed ? "justify-center" : ""}`}>
        <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-7 h-7" />
        {!collapsed && (
          <>
            <div className="ml-2">
              <h1 className="text-lg font-bold">SkillSwap</h1>
              <p className="text-[10px] text-muted-foreground">Learn, Share, and Swap Skills.</p>
            </div>
            <button
              className="ml-auto mr-2 p-2 rounded-full shadow-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all"
              onClick={handleCollapse}
              aria-label="Collapse sidebar"
              title="Collapse"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          </>
        )}
        {collapsed && (
          <button
            className="absolute left-full top-8 -translate-x-1/2 p-2 rounded-full shadow-md bg-white dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all z-30"
            onClick={handleExpand}
            aria-label="Expand sidebar"
            title="Expand"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        )}
      </div>

      {/* Search (only when expanded) */}
      {!collapsed && (
        <div className="px-4 pt-2 pb-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input type="text" placeholder="Search" className="w-full pl-9 pr-3 py-2 text-sm border rounded-md" />
          </div>
        </div>
      )}

      <nav className={`flex-1 ${collapsed ? "py-2 flex flex-col items-center gap-2" : "px-2 py-2 space-y-1"}`}>
        {(showBothRoles || (userIsSeller && !showBothRoles)) && (
          <>
            {!collapsed && <SectionTitle title="Contributor Dashboard" />}
            {contributorItems.map(renderItem)}
          </>
        )}
        {(showBothRoles || (!userIsSeller && !showBothRoles)) && (
          <>
            {!collapsed && <SectionTitle title="Seeker Tools" />}
            {seekerItems.map(renderItem)}
          </>
        )}

        <div className={collapsed ? "pt-2" : "pt-4"}>
          {!collapsed && <SectionTitle title="Communication" />}
          {commonItems.map(renderItem)}
        </div>

        <div className={collapsed ? "pt-2" : "pt-4"}>
          {!collapsed && <SectionTitle title="Active Deals" />}
          {activeDealsItems.map(renderItem)}
        </div>
      </nav>
    </aside>
  );
};

export default ProfileSidebar;