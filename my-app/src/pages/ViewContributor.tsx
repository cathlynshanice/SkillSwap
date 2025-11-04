import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Handshake, CreditCard, User, ArrowLeft, MessageCircle } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { Button } from "@/components/ui/button";

type PortfolioItem = { type: "image" | "link"; src?: string; alt?: string; url?: string; label?: string };
type UserReview = { user: string; rating: number; text: string };
type Contributor = {
  id: number;
  name: string;
  username: string;
  avatar: string;
  skill: string;
  campus: string;
  major: string;
  description: string;
  tags: string[];
  barter: boolean;
  price: number;
  rating: number;
  reviews: number;
  paymentMethods: string[];
  deals: string[];
  portfolio: PortfolioItem[];
  userReviews: UserReview[];
};

const ViewContributor = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [contributor, setContributor] = useState<Contributor | null>(null);

  useEffect(() => {
    fetch("/src/assets/mockContributors.json")
      .then((res) => res.json())
      .then((data: Contributor[]) => {
        const found = data.find((c) => c.username === username);
        setContributor(found || null);
      });
  }, [username]);

  if (!contributor) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-gray-500">Contributor not found.</p>
      </div>
    );
  }

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Breadcrumb & Back Button */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <nav className="flex items-center gap-2 text-sm">
              <span className="text-gray-600">Home</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-600">Browse Contributors</span>
              <span className="text-gray-400">/</span>
              <span className="text-gray-900 dark:text-gray-100 font-semibold">Contributor Profile</span>
            </nav>
          </div>
        </header>
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto px-4 py-8 md:px-8">
          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6 mb-6">
            <User className="h-16 w-16 text-primary" />
            <div className="flex-1 w-full">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between w-full">
                <div>
                  <h2 className="text-3xl font-bold">{contributor.name}</h2>
                  <div className="text-lg text-gray-600">{contributor.skill}</div>
                  <div className="flex gap-2 mt-2">
                    <Badge variant="outline" className="text-xs">{contributor.campus}</Badge>
                    <Badge variant="secondary" className="text-xs">{contributor.major}</Badge>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:ml-4 flex-shrink-0">
                  <Button variant="default" size="lg" className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5" /> Chat Contributor
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Rating & Reviews */}
          <div className="flex flex-col gap-2 mb-4">
            <div className="flex items-center gap-2">
              <Star className="h-5 w-5 text-yellow-400" />
              <span className="font-semibold">Rating:</span>
              <span>{contributor.rating}</span>
              <span className="text-xs text-gray-500">({contributor.reviews} reviews)</span>
            </div>
            {contributor.userReviews?.map((review, idx) => (
              <div key={idx} className="flex items-start gap-2">
                <Star className="h-4 w-4 text-yellow-400 mt-0.5" />
                <div>
                  <span className="font-semibold">{review.user}</span>
                  <span className="ml-2 text-xs text-gray-500">({review.rating})</span>
                  <div className="text-sm text-gray-700">{review.text}</div>
                </div>
              </div>
            ))}
          </div>

          {/* About */}
          <div className="mb-4">
            <div className="font-semibold mb-1">About</div>
            <div className="text-base text-gray-700 dark:text-gray-300">{contributor.description}</div>
            <div className="flex flex-wrap gap-2 mt-2">
              {contributor.tags.map((tag, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
              ))}
            </div>
          </div>

          {/* Portfolio Section */}
          <div className="mb-4">
            <div className="font-semibold mb-2">Portfolio</div>
            {/* Links on top */}
            <div className="flex gap-4 flex-wrap mb-2">
              {contributor.portfolio?.filter(item => item.type === "link").map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-base font-medium">
                  <span role="img" aria-label="link">🔗</span>
                  <span>{item.url?.replace(/^https?:\/\//, "")}</span>
                </div>
              ))}
            </div>
            {/* Images below links */}
            <div className="flex gap-4 flex-wrap">
              {contributor.portfolio?.filter(item => item.type === "image").map((item, idx) => (
                <img
                  key={idx}
                  src={item.src}
                  alt={item.alt}
                  className="h-24 w-36 object-cover rounded shadow bg-white"
                />
              ))}
            </div>
          </div>

          {/* Deal Section */}
          <div className="mb-4">
            <div className="font-semibold mb-1">Deal</div>
            <div className="flex items-center gap-3">
              <span className="font-bold text-primary text-xl">Rp{contributor.price.toLocaleString()}</span>
              {contributor.barter && (
                <Badge variant="default" className="flex items-center gap-1 text-xs px-2 py-1">
                  <Handshake className="h-4 w-4" /> Barter Available
                </Badge>
              )}
            </div>
          </div>

          {/* Payment Methods */}
          <div className="mb-6">
            <div className="font-semibold mb-1">Payment Method</div>
            <div className="flex gap-3 flex-wrap">
              {contributor.paymentMethods.map((method, idx) => (
                <Button
                  key={idx}
                  variant="secondary"
                  size="lg"
                  className="flex items-center gap-2 font-semibold shadow border-2 border-blue-400 bg-blue-50 text-blue-700"
                >
                  <CreditCard className="h-5 w-5 text-blue-500" />
                  {method}
                </Button>
              ))}
            </div>
          </div>

          {/* Barter Button */}
          {contributor.barter && (
            <div className="mb-6">
              <Button variant="default" size="lg" className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
                <Handshake className="h-5 w-5" /> Propose Barter
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ViewContributor;