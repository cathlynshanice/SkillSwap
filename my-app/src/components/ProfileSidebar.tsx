import { Badge } from "@/components/ui/badge";
import { User, BriefcaseBusiness, Briefcase, MessageSquare, Bell, Handshake, Star, Search, TrendingUp, ChevronLeft, ChevronRight, CheckSquare } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import SkillSwapLogo from "@/assets/SkillSwapLogo.svg";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

// Local component for section titles
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
  { key: "profile", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/seller-profile" },
  { key: "projects", icon: <Briefcase className="h-4 w-4" />, label: "Projects Showcase", path: "/projects" },
  { key: "insights", icon: <TrendingUp className="h-4 w-4" />, label: "Seller Insights", path: "/seller-insights" },
  { key: "myjobs", icon: <BriefcaseBusiness className="h-4 w-4" />, label: "Manage Jobs", path: "/myjobs" },
];

/* Items intended for seekers (buyer) */
const seekerItems = [
  { key: "profile_buyer", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/buyer-profile" },
  { key: "browse", icon: <Search className="h-4 w-4" />, label: "Browse Contributors", path: "/browse-contributors" },
  { key: "profile_buyer", icon: <User className="h-4 w-4" />, label: "My Profile", path: "/profile" },
];

// Active deals replaces video session and scheduled
const activeDealsItems = [
  { key: "active_deals", icon: <Handshake className="h-4 w-4" />, label: "Active Deals", path: "/active-deals", badge: 0 },
  { key: "completed_deals", icon: <CheckSquare className="h-4 w-4" />, label: "Completed Deals", path: "/completed-deals" },
];


const ProfileSidebar = () => {
type VerificationStatus = 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';

// The sidebar now accepts verificationStatus as a prop to determine which tools to show.
const ProfileSidebar = ({ verificationStatus }: { verificationStatus: VerificationStatus | undefined }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [collapsed, setCollapsed] = useState(false);
  const [hovered, setHovered] = useState(false);

  const showFull = !collapsed || hovered;

  const isVerifiedContributor = verificationStatus === 'VERIFIED';

  const isActive = (path: string) => location.pathname === path;

  const handleNavigate = (path: string) => {
    navigate(path);
    // You might want to remove collapsing on navigate for better UX on desktop
    // setCollapsed(true);
  };

  const renderItem = (item: any) => (
    <button
      key={item.key}
      onClick={() => navigate(item.path)}
      className={
        `w-full flex items-center gap-3 px-3 py-2 text-sm rounded-md transition-colors ${
          isActive(item.path) 
            ? "bg-gray-100 dark:bg-gray-700 font-semibold text-primary" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`
      }
      title={item.label}
    >
      {item.icon}
      {showFull && <span>{item.label}</span>}
      {item.badge !== undefined && showFull && <Badge variant="secondary" className="ml-auto">{item.badge}</Badge>}
    </button>
  );
  
  const collapsedRenderItem = (item: any) => (
    <button
      key={item.key}
      onClick={() => handleNavigate(item.path)}
      className={
        `flex items-center justify-center w-10 h-10 rounded-md transition-colors ${
          isActive(item.path) 
            ? "bg-gray-100 dark:bg-gray-700 text-primary" 
            : "hover:bg-gray-100 dark:hover:bg-gray-700"
        }`
      }
      title={item.label}
    >
      {item.icon}
    </button>
  );

  return (
    <aside
      className={`transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col flex-shrink-0
        ${collapsed ? "w-20" : "w-64"} relative`}
    >
      {/* Logo + collapse/expand chevron */}
      <div className={`px-4 pt-4 pb-2 flex items-center gap-2 ${collapsed ? "justify-center" : ""}`}>
        <img src={SkillSwapLogo} alt="SkillSwap Logo" className="w-8 h-8 flex-shrink-0" />
        {!collapsed && (
          <div className="ml-1 overflow-hidden">
            <h1 className="text-lg font-bold truncate">SkillSwap</h1>
          </div>
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
            <input type="text" placeholder="Search..." className="w-full pl-9 pr-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-primary" />
          </div>
        </div>
      )}

      <nav className={`flex-1 ${collapsed ? "py-2 flex flex-col items-center gap-2" : "px-4 py-2 space-y-2"}`}>
        {verificationStatus === undefined ? (
          // Show skeleton while verification status is loading
          <div className="space-y-2">
            <Skeleton className="h-8 w-full" />
            <Skeleton className="h-8 w-full" />
          </div>
        ) : isVerifiedContributor ? (
          <>
            {!collapsed && <SectionTitle title="Contributor Tools" />}
            {contributorItems.map(collapsed ? collapsedRenderItem : renderItem)}
          </>
        ) : (
          <>
            {!collapsed && <SectionTitle title="Seeker Tools" />}
            {seekerItems.map(collapsed ? collapsedRenderItem : renderItem)}
          </>
        )}

        <div className={collapsed ? "pt-2" : "pt-4 border-t mt-2"}>
          {!collapsed && <SectionTitle title="Activity" />}
          {commonItems.map(collapsed ? collapsedRenderItem : renderItem)}
          {activeDealsItems.map(collapsed ? collapsedRenderItem : renderItem)}
        </div>
      </nav>

      {/* Collapse/Expand button */}
      <div className="p-4 border-t">
        <Button variant="ghost" onClick={() => setCollapsed(!collapsed)} className="w-full justify-start gap-3">
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
          {!collapsed && "Collapse"}
        </Button>
      </div>
    </aside>
  );
};

export default ProfileSidebar;