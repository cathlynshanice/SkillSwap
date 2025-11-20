import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoreVertical, User, Search, MessageCircle, Handshake } from "lucide-react";
import ProfileSidebar from "@/components/ProfileSidebar";
import { Input } from "@/components/ui/input";

// Type for contributor
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
  portfolio: any[];
  userReviews: any[];
};

const BrowseContributors = () => {
  const [contributors, setContributors] = useState<Contributor[]>([]);
  const [search, setSearch] = useState("");
  const [barterOnly, setBarterOnly] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
    fetch("/src/assets/mockContributors.json")
      .then((res) => res.json())
      .then((data) => setContributors(data));
  }, []);

  const filteredContributors = contributors.filter(
    (c) =>
      (c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.skill.toLowerCase().includes(search.toLowerCase()) ||
        c.campus.toLowerCase().includes(search.toLowerCase()) ||
        c.major.toLowerCase().includes(search.toLowerCase()) ||
        c.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase())))
      && (!barterOnly || c.barter)
  );

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
            <span className="text-gray-900 dark:text-gray-100 font-medium">Browse Contributors</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
              <div>
                <h3 className="text-lg font-semibold">Browse Contributors</h3>
                <p className="text-sm text-gray-500">Find BINUS students offering services for paid or barter projects</p>
              </div>
              <div className="flex items-center gap-2">
                <Input
                  placeholder="Search name, skill, campus, major..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="w-48"
                />
                <label className="flex items-center gap-1 text-sm">
                  <input
                    type="checkbox"
                    checked={barterOnly}
                    onChange={() => setBarterOnly((b) => !b)}
                  />
                  Barter only
                </label>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {filteredContributors.map((contributor) => (
                <Card
                  key={contributor.id}
                  className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer flex flex-col justify-between h-[300px] min-h-[300px]"
                >
                  <div className="flex items-center gap-4 p-4">
                    <User className="h-10 w-10 text-primary" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{contributor.name}</h4>
                      <div className="text-xs text-gray-500 mb-1">{contributor.skill}</div>
                      <Badge variant="outline" className="text-xs mr-1">{contributor.campus}</Badge>
                      <Badge variant="secondary" className="text-xs">{contributor.major}</Badge>
                    </div>
                  </div>
                  <div className="px-4 pb-4 flex-1 flex flex-col">
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-2 line-clamp-2">
                      {contributor.description}
                    </p>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {contributor.tags.map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">{tag}</Badge>
                      ))}
                    </div>
                    <div className="flex items-end justify-between mt-auto">
                      {/* Price and Barter (standardized, always same height) */}
                      <div className="flex flex-col items-start min-w-[110px]">
                        {contributor.barter ? (
                          <Badge variant="default" className="text-xs flex items-center gap-1 mb-1">
                            <Handshake className="h-3 w-3" /> Barter
                          </Badge>
                        ) : (
                          <div className="mb-1" style={{ height: "24px" }}></div>
                        )}
                        <span className="font-bold text-primary">Rp{contributor.price.toLocaleString()}</span>
                      </div>
                      {/* Buttons */}
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => navigate("/messages")}
                        >
                          <MessageCircle className="h-4 w-4 mr-1" /> Chat
                        </Button>
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => navigate(`/view-contributor/${contributor.username}`)}
                        >
                          View
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
              {filteredContributors.length === 0 && (
                <div className="col-span-full text-center py-12 text-gray-400">
                  <Search className="h-10 w-10 mx-auto mb-2" />
                  No contributors found.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BrowseContributors;