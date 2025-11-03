import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Star, Heart, ThumbsUp, Flag, MessageSquare, Upload, X, 
  TrendingUp, Filter, Download, Search, Edit, 
  CheckCircle, Clock, DollarSign, BarChart3, Eye, ChevronDown, ChevronUp
} from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";

// ============================================================================
// DUMMY DATA - Service Marketplace (Fiverr/Upwork Style)
// ============================================================================

const serviceProvider = {
  id: "sp_001",
  name: "Sarah Mitchell",
  service: "Full-Stack Web Development",
  category: "Programming & Tech",
  level: "Level 2 Seller",
  memberSince: "2023"
};

const reviewsData = [
  { 
    id: "r1", 
    user: "Michael Chen", 
    stars: 5, 
    title: "Outstanding developer - exceeded expectations!", 
    body: "Sarah delivered a fully functional web application ahead of schedule. Her communication was excellent throughout the project, and she provided detailed documentation. The code quality is top-notch and she was very responsive to feedback. Highly recommend for any web development project!", 
    media: ["screenshot1.jpg"], 
    verified: true, 
    date: "2025-08-12",
    helpful: 24,
    notHelpful: 0,
    replies: [],
    projectType: "Custom Web Application",
    orderValue: "$850"
  },
  { 
    id: "r2", 
    user: "Jennifer Lopez", 
    stars: 5, 
    title: "Professional and skilled!", 
    body: "Sarah helped me build my e-commerce website from scratch. She understood my requirements perfectly and delivered exactly what I needed. Great attention to detail and very patient with my revisions. Will definitely work with her again!", 
    media: [], 
    verified: true, 
    date: "2025-09-03",
    helpful: 18,
    notHelpful: 1,
    replies: [],
    projectType: "E-commerce Website",
    orderValue: "$1,200"
  },
  { 
    id: "r3", 
    user: "David Park", 
    stars: 4, 
    title: "Good work, minor delays", 
    body: "The final product was great, but there were some delays in delivery due to technical challenges. Sarah communicated well about the issues and made sure everything worked perfectly in the end. Overall satisfied with the service.", 
    media: ["demo_video.mp4"], 
    verified: true, 
    date: "2025-09-29",
    helpful: 12,
    notHelpful: 3,
    replies: [],
    projectType: "API Integration",
    orderValue: "$450"
  },
  { 
    id: "r4", 
    user: "Emily Rodriguez", 
    stars: 5, 
    title: "Best freelancer I've worked with!", 
    body: "Sarah is a true professional! She not only completed my React application but also provided suggestions to improve performance and user experience. Her expertise saved me hours of work. Very responsive and easy to communicate with. 10/10 would hire again!", 
    media: [], 
    verified: true, 
    date: "2025-10-05",
    helpful: 31,
    notHelpful: 0,
    replies: [],
    projectType: "React App Development",
    orderValue: "$950"
  },
  { 
    id: "r5", 
    user: "Robert Kim", 
    stars: 5, 
    title: "Exceptional quality and service", 
    body: "Working with Sarah was a fantastic experience. She's highly skilled in both frontend and backend development. The website she built is fast, responsive, and looks amazing. She went above and beyond by providing training materials. Couldn't be happier!", 
    media: ["final_project.jpg"], 
    verified: true, 
    date: "2025-10-12",
    helpful: 27,
    notHelpful: 0,
    replies: [],
    projectType: "Full Website Build",
    orderValue: "$1,500"
  }
];

const performanceMetrics = {
  averageStars: 4.8,
  performanceIndex: 96,
  trend30d: +8.2,
  distribution: {5: 18, 4: 3, 3: 1, 2: 0, 1: 0},
  facets: { 
    "Quality of Work": 4.9, 
    Communication: 4.8, 
    "Delivery Time": 4.6, 
    "Value for Money": 4.9 
  },
  ratingOverTime: [
    { date: "2025-06-01", rating: 4.7 },
    { date: "2025-07-01", rating: 4.6 },
    { date: "2025-08-01", rating: 4.8 },
    { date: "2025-09-01", rating: 4.7 },
    { date: "2025-10-01", rating: 4.8 }
  ],
  advanced: { 
    totalProjects: 22,
    completionRate: 100,
    onTimeDelivery: 95,
    responseTimeHrs: 2.1,
    repeatClientRate: 68,
    avgProjectValue: 875
  }
};

// ============================================================================
// UTILITY COMPONENTS
// ============================================================================

const StarRating = ({ rating, size = "sm", showNumber = false }: { rating: number; size?: string; showNumber?: boolean }) => {
  const sizeClass = size === "lg" ? "h-6 w-6" : size === "md" ? "h-5 w-5" : "h-4 w-4";
  
  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: 5 }, (_, index) => (
        <Star
          key={index}
          className={`${sizeClass} ${
            index < rating
              ? "fill-yellow-400 text-yellow-400"
              : "fill-gray-300 text-gray-300"
          }`}
        />
      ))}
      {showNumber && <span className="ml-1 text-sm font-medium">{rating.toFixed(1)}</span>}
    </div>
  );
};

const ProgressBar = ({ value, max, color = "bg-yellow-400" }: { value: number; max: number; color?: string }) => {
  const percentage = (value / max) * 100;
  return (
    <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
      <div 
        className={`h-full ${color} transition-all duration-300`}
        style={{ width: `${percentage}%` }}
      />
    </div>
  );
};

// ============================================================================
// MAIN COMPONENT
// ============================================================================

const ReviewRatings = () => {
  const navigate = useNavigate();
  
  // State Management
  const [reviews, setReviews] = useState(reviewsData);
  const [viewMode, setViewMode] = useState<"buyer" | "seller">("buyer");
  const [sortBy, setSortBy] = useState<"recent" | "highest" | "lowest">("recent");
  const [filterStars, setFilterStars] = useState<number | null>(null);
  const [filterVerified, setFilterVerified] = useState(false);
  const [filterMedia, setFilterMedia] = useState(false);
  const [showWriteReview, setShowWriteReview] = useState(false);
  const [showReportModal, setShowReportModal] = useState<string | null>(null);
  const [expandedReviews, setExpandedReviews] = useState<Set<string>>(new Set());
  const [helpfulVotes, setHelpfulVotes] = useState<Record<string, { helpful: number; notHelpful: number }>>({});
  
  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.key === "/" && !showWriteReview) {
        e.preventDefault();
        document.getElementById("search-input")?.focus();
      }
      if (e.key === "r" && !showWriteReview) {
        e.preventDefault();
        setShowWriteReview(true);
      }
    };
    
    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [showWriteReview]);
  
  // Filter and Sort Reviews
  const filteredAndSortedReviews = useCallback(() => {
    let filtered = [...reviews];
    
    if (filterStars) {
      filtered = filtered.filter(r => r.stars === filterStars);
    }
    if (filterVerified) {
      filtered = filtered.filter(r => r.verified);
    }
    if (filterMedia) {
      filtered = filtered.filter(r => r.media.length > 0);
    }
    
    filtered.sort((a, b) => {
      if (sortBy === "recent") {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      } else if (sortBy === "highest") {
        return b.stars - a.stars;
      } else {
        return a.stars - b.stars;
      }
    });
    
    return filtered;
  }, [reviews, sortBy, filterStars, filterVerified, filterMedia]);
  
  const displayedReviews = filteredAndSortedReviews();
  
  // Handle helpful vote
  const handleHelpfulVote = (reviewId: string, type: "helpful" | "notHelpful") => {
    setHelpfulVotes(prev => {
      const current = prev[reviewId] || { helpful: 0, notHelpful: 0 };
      return {
        ...prev,
        [reviewId]: {
          ...current,
          [type]: current[type] + 1
        }
      };
    });
  };
  
  // Toggle review expansion
  const toggleExpand = (reviewId: string) => {
    setExpandedReviews(prev => {
      const next = new Set(prev);
      if (next.has(reviewId)) {
        next.delete(reviewId);
      } else {
        next.add(reviewId);
      }
      return next;
    });
  };
  
  // Export to CSV
  const exportToCSV = () => {
    const csvContent = [
      ["Review ID", "User", "Stars", "Title", "Body", "Verified", "Date", "Project Type", "Order Value", "Helpful", "Not Helpful"],
      ...reviews.map(r => [
        r.id,
        r.user,
        r.stars,
        r.title,
        r.body,
        r.verified ? "Yes" : "No",
        r.date,
        (r as any).projectType || "",
        (r as any).orderValue || "",
        helpfulVotes[r.id]?.helpful || r.helpful,
        helpfulVotes[r.id]?.notHelpful || r.notHelpful
      ])
    ].map(row => row.join(",")).join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `reviews_${serviceProvider.id}_${new Date().toISOString()}.csv`;
    a.click();
  };
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const totalReviews = Object.values(performanceMetrics.distribution).reduce((a, b) => a + b, 0);

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar Navigation */}
      <ProfileSidebar />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Header */}
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-white dark:bg-gray-800">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <button 
              onClick={() => navigate('/home')}
              className="hover:text-blue-600 dark:hover:text-blue-400"
            >
              Home
            </button>
            <span>/</span>
            <span className="text-gray-900 dark:text-white font-medium">Reviews & Ratings</span>
          </div>
        </div>

        {/* Main Content - Scrollable */}
        <div className="flex-1 overflow-y-auto bg-white dark:bg-gray-800">
          {/* Content will be added here later */}
        </div>
      </div>
      
      {/* Write Review Modal */}
      {showWriteReview && (
        <WriteReviewModal onClose={() => setShowWriteReview(false)} />
      )}
      
      {/* Report Modal */}
      {showReportModal && (
        <ReportModal reviewId={showReportModal} onClose={() => setShowReportModal(null)} />
      )}
    </div>
  );
};

// ============================================================================
// MODAL COMPONENTS
// ============================================================================

const WriteReviewModal = ({ onClose }: { onClose: () => void }) => {
  const [step, setStep] = useState(1);
  const [rating, setRating] = useState(0);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [verifiedPurchase, setVerifiedPurchase] = useState(true);
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Write a Review</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          {/* Progress Indicator */}
          <div className="flex gap-2 mb-6">
            {[1, 2, 3, 4].map(s => (
              <div key={s} className={`flex-1 h-1 rounded ${step >= s ? "bg-blue-600" : "bg-gray-200"}`} />
            ))}
          </div>
          
          {/* Step 1: Rating & Title */}
          {step === 1 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(s => (
                    <button
                      key={s}
                      onClick={() => setRating(s)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star className={`h-10 w-10 ${s <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`} />
                    </button>
                  ))}
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Review Title (max 80 chars)</label>
                <Input
                  value={title}
                  onChange={(e) => setTitle(e.target.value.slice(0, 80))}
                  placeholder="Sum up your experience..."
                  maxLength={80}
                />
                <p className="text-xs text-gray-500 mt-1">{title.length}/80</p>
              </div>
              
              <Button onClick={() => setStep(2)} disabled={rating === 0 || title.length < 5} className="w-full">
                Next Step
              </Button>
            </div>
          )}
          
          {/* Step 2: Detailed Review */}
          {step === 2 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Your Review</label>
                <Textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="What did you like? What could be improved?"
                  rows={6}
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {body.length} characters (minimum {rating <= 2 ? "80" : "20"})
                </p>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(1)}>Back</Button>
                <Button 
                  onClick={() => setStep(3)} 
                  disabled={body.length < (rating <= 2 ? 80 : 20)}
                  className="flex-1"
                >
                  Next Step
                </Button>
              </div>
            </div>
          )}
          
          {/* Step 3: Media Upload */}
          {step === 3 && (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Add Photos or Videos (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-sm text-gray-600">Drag & drop or click to upload</p>
                  <p className="text-xs text-gray-500 mt-1">Max 5 files, 10MB each</p>
                </div>
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(2)}>Back</Button>
                <Button onClick={() => setStep(4)} className="flex-1">Next Step</Button>
              </div>
            </div>
          )}
          
          {/* Step 4: Confirm & Submit */}
          {step === 4 && (
            <div className="space-y-4">
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <StarRating rating={rating} size="md" />
                <h3 className="font-semibold mt-2">{title}</h3>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{body}</p>
              </div>
              
              <label className="flex items-center gap-2 text-sm cursor-pointer">
                <input
                  type="checkbox"
                  checked={verifiedPurchase}
                  onChange={(e) => setVerifiedPurchase(e.target.checked)}
                  className="rounded"
                />
                <CheckCircle className="h-4 w-4 text-green-600" />
                This is a verified purchase
              </label>
              
              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep(3)}>Back</Button>
                <Button onClick={onClose} className="flex-1 bg-green-600 hover:bg-green-700">
                  Submit Review
                </Button>
              </div>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

const ReportModal = ({ reviewId, onClose }: { reviewId: string; onClose: () => void }) => {
  const [reason, setReason] = useState("");
  
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-md">
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">Report Review</h3>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="reason" value="spam" onChange={(e) => setReason(e.target.value)} />
              Spam or misleading
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="reason" value="abuse" onChange={(e) => setReason(e.target.value)} />
              Abusive or offensive
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="radio" name="reason" value="fake" onChange={(e) => setReason(e.target.value)} />
              Fake review
            </label>
          </div>
          
          <div className="mt-6 flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">Cancel</Button>
            <Button onClick={onClose} disabled={!reason} className="flex-1 bg-red-600 hover:bg-red-700">
              Submit Report
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReviewRatings;
