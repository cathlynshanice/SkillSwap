"use client";
import { useState } from "react";
import { Search, Filter, Clock, DollarSign, Briefcase } from "lucide-react";
import { JOBS_DATA } from "../../data/dummyJobs"; // Import the data we made above
import HomeNavbar from "@/components/HomeNavbar";

export default function BrowseJobs() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  // Filter Logic
  const filteredJobs = JOBS_DATA.filter((job) => {
    const matchesSearch =
      job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      job.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory =
      selectedCategory === "All" || job.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const categories = ["All", "Development", "Design", "Business", "Marketing"];

  return (
    <div className="min-h-screen bg-gray-50">
      <HomeNavbar />
      {/* --- Header / Search Section --- */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Find Work <span className="text-blue-600">@ SkillSwap</span>
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl">
            Browse projects from other students, join teams, or freelance for
            campus startups.
          </p>

          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Search for jobs (e.g. 'Logo', 'React', 'Survey')"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Category Filter Dropdown (Mobile) / Buttons (Desktop) */}
            <div className="flex gap-2 overflow-x-auto pb-2 md:pb-0 no-scrollbar">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? "bg-blue-600 text-white"
                      : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* --- Job Listings Grid --- */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Results Count */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-700">
            {filteredJobs.length} Jobs Found
          </h2>
          <button className="flex items-center text-sm text-gray-500 hover:text-blue-600">
            <Filter className="w-4 h-4 mr-1" /> Filter Results
          </button>
        </div>

        {/* Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredJobs.map((job) => (
            <div
              key={job.id}
              className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 flex flex-col"
            >
              <div className="p-6 flex-grow">
                {/* Header: Category & Time */}
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      job.category === "Development"
                        ? "bg-blue-100 text-blue-800"
                        : job.category === "Design"
                        ? "bg-purple-100 text-purple-800"
                        : job.category === "Business"
                        ? "bg-green-100 text-green-800"
                        : "bg-orange-100 text-orange-800"
                    }`}
                  >
                    {job.category}
                  </span>
                  <span className="text-xs text-gray-400 flex items-center">
                    <Clock className="w-3 h-3 mr-1" /> {job.postedTime}
                  </span>
                </div>

                {/* Job Title */}
                <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                  {job.title}
                </h3>

                {/* Price & Client */}
                <div className="flex flex-col gap-1 mb-4">
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="w-4 h-4 mr-1" />
                    {job.price}
                  </div>
                  <div className="flex items-center text-sm text-gray-500">
                    <Briefcase className="w-4 h-4 mr-1" />
                    {job.client}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {job.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {job.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-md"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Footer Action */}
              <div className="p-4 border-t bg-gray-50 rounded-b-xl flex justify-between items-center">
                <span className="text-xs text-gray-500 font-medium">
                  Deadline: {job.deadline}
                </span>
                <button className="bg-white text-blue-600 border border-blue-600 px-4 py-1.5 rounded-lg text-sm font-medium hover:bg-blue-50 transition-colors">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredJobs.length === 0 && (
          <div className="text-center py-20">
            <div className="text-gray-400 mb-2 text-6xl">🔍</div>
            <h3 className="text-lg font-medium text-gray-900">No jobs found</h3>
            <p className="text-gray-500">
              Try adjusting your search or filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
