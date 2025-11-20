import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoreVertical, Handshake, User, CalendarDays, DollarSign, MessageSquare } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { isSeller } from "@/lib/userContext";
import { Button } from "@/components/ui/button";

type Deal = {
  id: number;
  title: string;
  counterpart: string;
  status: "ongoing" | "completed" | "cancelled";
  price: number;
  date: string;
  type: "barter" | "paid";
  messages: number;
};

const mockDealsSeeker: Deal[] = [
  {
    id: 1,
    title: "UI/UX Design Session",
    counterpart: "Alice Smith",
    status: "ongoing",
    price: 150000,
    date: "2025-11-18",
    type: "paid",
    messages: 2,
  },
  {
    id: 2,
    title: "Figma Tutorial",
    counterpart: "Bob Lee",
    status: "ongoing",
    price: 0,
    date: "2025-11-19",
    type: "barter",
    messages: 1,
  },
];

const mockDealsContributor: Deal[] = [
  {
    id: 3,
    title: "Mobile App Review",
    counterpart: "Clarissa Tan",
    status: "ongoing",
    price: 200000,
    date: "2025-11-20",
    type: "paid",
    messages: 3,
  },
  {
    id: 4,
    title: "Logo Design Barter",
    counterpart: "David Lim",
    status: "ongoing",
    price: 0,
    date: "2025-11-21",
    type: "barter",
    messages: 0,
  },
];

const ActiveDeals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userIsSeller, setUserIsSeller] = useState(isSeller());
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    setUserIsSeller(isSeller());
  }, [location.pathname]);

  useEffect(() => {
    const onRoleChange = () => setUserIsSeller(isSeller());
    window.addEventListener("mockUserRoleChanged", onRoleChange);
    return () => window.removeEventListener("mockUserRoleChanged", onRoleChange);
  }, []);

  useEffect(() => {
    setDeals(userIsSeller ? mockDealsContributor : mockDealsSeeker);
  }, [userIsSeller]);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <ProfileSidebar />
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
            <span className="text-gray-900 dark:text-gray-100 font-medium">Active Deals</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto px-4 py-8 md:px-8">
          {deals.length === 0 ? (
            <div className="text-center text-gray-500 py-12">No active deals found.</div>
          ) : (
            <div className="grid gap-6">
              {deals.map((deal) => (
                <Card key={deal.id} className="p-5 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <Handshake className="h-7 w-7 text-primary" />
                    <div>
                      <div className="font-semibold text-lg">{deal.title}</div>
                      <div className="text-sm text-gray-500 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {deal.counterpart}
                        <CalendarDays className="h-4 w-4 ml-3" />
                        {deal.date}
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col md:items-end gap-2 md:gap-1">
                    <div className="flex items-center gap-2">
                      {deal.type === "paid" ? (
                        <Badge variant="secondary" className="flex items-center gap-1">
                          <DollarSign className="h-4 w-4" /> Rp{deal.price.toLocaleString()}
                        </Badge>
                      ) : (
                        <Badge variant="default" className="flex items-center gap-1">
                          <Handshake className="h-4 w-4" /> Barter
                        </Badge>
                      )}
                      <Badge variant="outline" className="ml-2 text-xs">
                        {deal.status.charAt(0).toUpperCase() + deal.status.slice(1)}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <MessageSquare className="h-4 w-4 text-gray-400" />
                      <span className="text-xs text-gray-500">{deal.messages} messages</span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ActiveDeals;