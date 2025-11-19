import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Star, Handshake, CreditCard, User, MessageCircle, ChevronLeft, ChevronRight } from "lucide-react";
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

const IMAGE_WIDTH = 260;
const IMAGE_HEIGHT = 160;
const MAX_IMAGES = 5;
const MAX_LINKS = 5;

const ViewContributor = () => {
  const { username } = useParams();
  const navigate = useNavigate();
  const [contributor, setContributor] = useState<Contributor | null>(null);
  const [carouselIndex, setCarouselIndex] = useState(0);

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

  // Portfolio images for carousel (max 5)
  const portfolioImages = contributor.portfolio
    .filter(item => item.type === "image")
    .slice(0, MAX_IMAGES);

  // Carousel navigation
  const handlePrev = () => setCarouselIndex(i => (i === 0 ? portfolioImages.length - 1 : i - 1));
  const handleNext = () => setCarouselIndex(i => (i === portfolioImages.length - 1 ? 0 : i + 1));

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      <ProfileSidebar />
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Breadcrumb (sync with BrowseContributors) */}
        <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-3 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-2 text-sm">
            <button
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              onClick={() => navigate("/")}
            >
              Home
            </button>
            <span className="text-gray-400">/</span>
            <button
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100 transition-colors"
              onClick={() => navigate("/browse-contributors")}
            >
              Browse Contributors
            </button>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 dark:text-gray-100 font-semibold">Contributor Profile</span>
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
            <div className="flex gap-4 flex-wrap mb-4">
              {contributor.portfolio
                ?.filter(item => item.type === "link")
                .slice(0, MAX_LINKS)
                .map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-base font-medium">
                    <span role="img" aria-label="link">🔗</span>
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline"
                    >
                      {item.url?.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                ))}
            </div>
            {/* Carousel for images */}
            {portfolioImages.length > 0 && (
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePrev}
                  disabled={portfolioImages.length <= 1}
                  aria-label="Previous"
                >
                  <ChevronLeft className="h-6 w-6" />
                </Button>
                <div className="flex flex-wrap gap-4 justify-start items-center">
                  {portfolioImages.map((img, idx) => (
                    <div
                      key={idx}
                      style={{
                        width: IMAGE_WIDTH,
                        height: IMAGE_HEIGHT,
                        borderRadius: "0.5rem",
                        boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
                        background: "#fff",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        position: "relative",
                        cursor: "pointer",
                        transition: "transform 0.3s cubic-bezier(.4,0,.2,1)",
                        transform: carouselIndex === idx ? "scale(1.08)" : "scale(1)",
                        zIndex: carouselIndex === idx ? 2 : 1,
                      }}
                      onClick={() => setCarouselIndex(idx)}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                          borderRadius: "0.5rem",
                          transition: "box-shadow 0.3s cubic-bezier(.4,0,.2,1)",
                          boxShadow: carouselIndex === idx ? "0 4px 16px rgba(0,0,0,0.18)" : undefined,
                        }}
                      />
                    </div>
                  ))}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleNext}
                  disabled={portfolioImages.length <= 1}
                  aria-label="Next"
                >
                  <ChevronRight className="h-6 w-6" />
                </Button>
                <span className="text-xs text-gray-500 ml-2">
                  {carouselIndex + 1} / {portfolioImages.length}
                </span>
              </div>
            )}
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