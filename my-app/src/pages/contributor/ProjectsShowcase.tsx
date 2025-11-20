import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Briefcase, Globe, Play, MoreVertical, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfileSidebar from "@/components/ProfileSidebar";
import { supabase } from "@/lib/SupabaseClient";

// Define ProfileData interface to use for state
interface ProfileData {
  id: string;
  verification_status: 'UNVERIFIED' | 'PENDING' | 'VERIFIED' | 'REJECTED';
}

const ProjectsShowcase = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState<ProfileData | null>(null);
  
  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const { data, error } = await supabase
          .from('profiles')
          .select('id, verification_status')
          .eq('id', user.id)
          .maybeSingle();
        
        if (error) {
          console.error("Error fetching profile status:", error);
        } else if (data) {
          setProfileData(data as ProfileData);
        }
      }
    };
    fetchProfile();
  }, []);

  const projects: any[] = [];

  return (
    <div className="h-screen bg-gray-50 dark:bg-gray-900 flex overflow-hidden">
      {/* Left Sidebar Navigation with prop */}
      <ProfileSidebar verificationStatus={profileData?.verification_status} />

      {/* Main Content Area */}
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
            <span className="text-gray-900 dark:text-gray-100 font-medium">Projects Showcase</span>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <MoreVertical className="h-4 w-4" />
            </Button>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 overflow-y-auto">
          <div className="p-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold">Projects Showcase</h3>
                <p className="text-sm text-gray-500">Display your portfolio to potential buyers</p>
              </div>
              <Button disabled>
                <Briefcase className="h-4 w-4 mr-2" />
                Add Project
              </Button>
            </div>

            {/* Empty Project Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="overflow-hidden">
                  <div className="aspect-video bg-gray-200 dark:bg-gray-700 animate-pulse"></div>
                  <div className="p-4 space-y-2">
                    <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded animate-pulse"></div>
                    <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded animate-pulse w-2/3"></div>
                  </div>
                </Card>
              ))}
            </div>

            {projects.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="h-12 w-12 mx-auto text-gray-300 dark:text-gray-600 mb-4" />
                <p className="text-sm text-gray-500">No projects showcased yet</p>
              </div>
            ) : (
              <>
                {/* Stats Overview */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center">
                        <Briefcase className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{projects.length}</p>
                        <p className="text-xs text-gray-500">Total Projects</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-green-600 dark:text-green-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{projects.filter(p => p.demo).length}</p>
                        <p className="text-xs text-gray-500">Live Demos</p>
                      </div>
                    </div>
                  </Card>
                  <Card className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center">
                        <Globe className="h-5 w-5 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <p className="text-2xl font-bold">{projects.filter(p => p.github).length}</p>
                        <p className="text-xs text-gray-500">GitHub Repos</p>
                      </div>
                    </div>
                  </Card>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-2 mb-6 flex-wrap">
                  <Button variant="default" size="sm">All Projects</Button>
                  <Button variant="outline" size="sm">Personal</Button>
                  <Button variant="outline" size="sm">College</Button>
                  <Button variant="outline" size="sm">SkillSwap</Button>
                </div>

                {/* Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {projects.map((project) => (
                    <Card key={project.id} className="overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="aspect-video w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
                        <img 
                          src={project.image} 
                          alt={project.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="p-5">
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex-1">
                            <h4 className="font-semibold text-lg mb-2">{project.title}</h4>
                            <Badge variant="outline" className="text-xs mb-2">
                              {project.type}
                            </Badge>
                          </div>
                          <span className="text-xs text-gray-500 ml-2">{project.date}</span>
                        </div>
                        
                        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                          {project.description}
                        </p>
                        
                        <div className="flex flex-wrap gap-1.5 mb-4">
                          {project.technologies.slice(0, 3).map((tech, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {project.technologies.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{project.technologies.length - 3}
                            </Badge>
                          )}
                        </div>
                        
                        <div className="flex gap-2">
                          {project.github && (
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                              <Globe className="h-3 w-3 mr-1" />
                              GitHub
                            </Button>
                          )}
                          {project.demo && (
                            <Button variant="outline" size="sm" className="flex-1 text-xs">
                              <Play className="h-3 w-3 mr-1" />
                              Demo
                            </Button>
                          )}
                          {!project.github && !project.demo && (
                            <Button variant="outline" size="sm" className="flex-1 text-xs" disabled>
                              No Links
                            </Button>
                          )}
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectsShowcase;
