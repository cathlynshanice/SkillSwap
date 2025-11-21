import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MoreVertical, Handshake, User, CalendarDays, MessageSquare, CheckCircle, Clock, Tag } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { useLocation, useNavigate } from "react-router-dom";
import { isSeller } from "@/lib/userContext";
import { Button } from "@/components/ui/button";

// Define the transaction types
type Deal = {
  id: number;
  title: string;
  counterpart: string;
  status: "completed" | "cancelled" | "disputed";
  price: number;
  date: string;
  type: "barter" | "paid";
  messages: number;
};

// --- MOCK DATA ---
const mockCompletedDealsSeeker: Deal[] = [
  { id: 5, title: "Database Normalization Help", counterpart: "Ethan Jones (Contributor)", status: "completed", price: 300000, date: "2025-10-25", type: "paid", messages: 12 },
  { id: 6, title: "Essay Proofreading Swap", counterpart: "Fiona White (Contributor)", status: "completed", price: 0, date: "2025-10-30", type: "barter", messages: 5 },
  { id: 7, title: "Intro to Python Session", counterpart: "Garry Black (Contributor)", status: "cancelled", price: 100000, date: "2025-11-01", type: "paid", messages: 8 },
];

const mockCompletedDealsContributor: Deal[] = [
  { id: 8, title: "Logo Design Commission", counterpart: "Hannah Lee (Seeker)", status: "completed", price: 500000, date: "2025-11-05", type: "paid", messages: 9 },
  { id: 9, title: "Advanced Math Tutoring", counterpart: "Ivan Koo (Seeker)", status: "completed", price: 0, date: "2025-11-10", type: "barter", messages: 4 },
  { id: 10, title: "Website Migration Task", counterpart: "Jessie Wu (Seeker)", status: "disputed", price: 450000, date: "2025-11-15", type: "paid", messages: 15 },
];
// -----------------

// Helper function to determine badge style based on status
const getStatusBadge = (status: Deal['status']) => {
    switch (status) {
        case 'completed':
            return {
                label: 'COMPLETED',
                icon: <CheckCircle className="h-3 w-3 mr-1" />,
                className: 'bg-green-500 text-white font-semibold uppercase px-2 py-1 h-8 rounded-full'
            };
        case 'cancelled':
            return {
                label: 'CANCELLED',
                icon: <Clock className="h-3 w-3 mr-1" />,
                className: 'bg-red-500 text-white font-semibold uppercase px-2 py-1 h-8 rounded-full'
            };
        case 'disputed':
            return {
                label: 'DISPUTED',
                icon: <MessageSquare className="h-3 w-3 mr-1" />,
                // Using amber color for dispute/warning
                className: 'bg-amber-500 text-white font-semibold uppercase px-2 py-1 h-8 rounded-full'
            };
        default:
            const statusString = status as string;
            return {
                label: statusString.toUpperCase(),
                icon: <Clock className="h-3 w-3 mr-1" />,
                className: 'bg-gray-400 text-white font-semibold uppercase px-2 py-1 h-8 rounded-full'
            };
    }
};


const CompletedDeals = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [userIsSeller, setUserIsSeller] = useState(isSeller()); 
  const [deals, setDeals] = useState<Deal[]>([]);

  useEffect(() => {
    setUserIsSeller(isSeller());
  }, [location.pathname]);

  useEffect(() => {
    setDeals(userIsSeller ? mockCompletedDealsContributor : mockCompletedDealsSeeker);
  }, [userIsSeller]);

  // Placeholder for disabled navigation
  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    console.log("Action button clicked, navigation disabled for now.");
  };

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden font-sans">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <button
              onClick={() => navigate('/home')}
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors font-medium"
            >
              Home
            </button>
            <span className="text-gray-400 font-medium">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-medium">Completed Deals</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-8 w-8 p-0">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto px-4 py-8 md:px-8">
            <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-gray-100">
                Completed & Past Deals History
            </h2>

          {deals.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
                <CheckCircle className="h-10 w-10 mx-auto mb-3 text-gray-300" />
                <p className="font-medium text-sm">You have no completed or past deals yet.</p>
            </div>
          ) : (
            <div className="grid gap-4">
              {deals.map((deal) => {
                const statusBadge = getStatusBadge(deal.status);
                const counterpartRole = userIsSeller ? 'Seeker' : 'Contributor';
                
                return (
                  <Card key={deal.id} className="p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-4 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow rounded-xl">
                    <div className="flex items-center gap-4 flex-1">
                      <Handshake className="h-7 w-7 text-blue-600 dark:text-blue-400 flex-shrink-0" />
                      <div>
                        <div className="font-semibold text-base text-gray-900 dark:text-gray-100">{deal.title}</div>
                        <div className="text-xs text-gray-500 flex items-center gap-4 mt-1">
                          <span className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            {deal.counterpart} ({counterpartRole})
                          </span>
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            Completed on {deal.date}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Status, Price, Messages, and Actions Column (Right Side) */}
                    <div className="flex flex-col gap-2 md:gap-1 items-start md:items-end flex-shrink-0">
                      
                      {/* Row 1: Status and Price */}
                      <div className="flex items-center gap-3">
                        {deal.type === "paid" ? (
                          <Badge 
                            variant="secondary" 
                            className="flex items-center gap-1 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 text-xs font-medium px-2 py-0.5"
                          >
                            <Tag className="h-3 w-3" /> Rp{deal.price.toLocaleString()}
                          </Badge>
                        ) : (
                          <Badge 
                            variant="default" 
                            className="flex items-center gap-1 bg-yellow-100 dark:bg-yellow-900/50 text-yellow-800 dark:text-yellow-400 text-xs font-medium px-2 py-0.5"
                          >
                            <Handshake className="h-3 w-3" /> Barter Deal
                          </Badge>
                        )}
                        
                        {/* Status Badge - Standardized Size */}
                        <Badge 
                            variant="outline" 
                            className={`flex items-center justify-center text-xs ${statusBadge.className}`}
                        >
                            {statusBadge.icon}
                            <span className="font-bold">{statusBadge.label}</span>
                        </Badge>
                      </div>

                      {/* Row 2: Messages and Action Button */}
                      <div className="flex items-center justify-end gap-3 w-full mt-1">
                        
                        {/* Message Count */}
                        <div className="flex items-center gap-1 text-xs text-gray-500 font-medium">
                          <MessageSquare className="h-4 w-4" />
                          <span>{deal.messages} messages exchanged</span>
                        </div>
                        
                        {/* Action Button - Standardized Size */}
                        {deal.status === 'completed' && (
                            <Button 
                                size="sm" 
                                className="text-sm bg-blue-600 hover:bg-blue-700 text-white font-semibold h-8 px-4 py-1.5 rounded-full transition-colors"
                                onClick={handleActionClick} // Disabled navigation
                            >
                                View Summary
                            </Button>
                        )}
                        {deal.status === 'disputed' && (
                            <Button 
                                size="sm" 
                                className="text-sm bg-red-500 hover:bg-red-600 text-white font-semibold h-8 px-4 py-1.5 rounded-full transition-colors"
                                onClick={handleActionClick} // Disabled navigation
                            >
                                Review Dispute
                            </Button>
                        )}
                         {deal.status === 'cancelled' && (
                            <Button 
                                size="sm" 
                                variant="outline"
                                className="text-sm bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium h-8 px-4 py-1.5 rounded-full transition-colors"
                                onClick={handleActionClick} // Disabled navigation
                            >
                                View Details
                            </Button>
                        )}
                      </div>
                    </div>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompletedDeals;