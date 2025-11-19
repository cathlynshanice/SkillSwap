// import { Toaster } from "@/components/ui/toaster";
// import { Toaster as Sonner } from "@/components/ui/sonner";
// import { TooltipProvider } from "@/components/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/Index";
// import NotFound from "./pages/NotFound";
// import LoginPage from "./pages/Login";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           <Route path="/login" element={<LoginPage />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;

import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/shared/NotFound";
import LoginPage from "./pages/shared/Login";
import Home from "./pages/shared/Home";
import Landing from "./pages/shared/Landing";
import OnboardingPage from "@/pages/shared/Onboarding";
import BuyerProfile from "@/pages/seeker/BuyerProfile";
import SellerProfile from "@/pages/contributor/SellerProfile";
import ProjectsShowcase from "@/pages/contributor/ProjectsShowcase";
import Notifications from "@/pages/shared/Notifications";
import ReviewRatings from "@/pages/shared/ReviewRatings";
import Messages from "@/pages/shared/Messages";
import SellerInsights from "@/pages/contributor/SellerInsights";
import AuthGate from "./components/AuthGate";
import BrowseContributors from "./pages/seeker/BrowseContributors";
import ViewContributor from "./pages/seeker/ViewContributor";
import BrowseJobs from "./pages/contributor/BrowseJobs";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <BrowserRouter>
        {/* 👇 Wrap protected pages inside AuthGate */}
        <AuthGate>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/home" element={<Home />} />
            <Route path="/landing" element={<Landing />} />
            <Route path="/onboarding" element={<OnboardingPage />} />
            <Route path="/buyer-profile" element={<BuyerProfile />} />
            <Route path="/seller-profile" element={<SellerProfile />} />
            <Route path="/projects" element={<ProjectsShowcase />} />
            <Route path="/notifications" element={<Notifications />} />
            <Route path="/reviews" element={<ReviewRatings />} />
            <Route path="/messages" element={<Messages />} />
            <Route path="/seller-insights" element={<SellerInsights />} />
            <Route
              path="/browse-contributors"
              element={<BrowseContributors />}
            />
            <Route
              path="/view-contributor/:username"
              element={<ViewContributor />}
            />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/browse-jobs" element={<BrowseJobs />} />
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
