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
import NotFound from "./pages/NotFound";
import LoginPage from "./pages/Login";
import Home from "./pages/Home";
import Landing from "./pages/Landing";
import OnboardingPage from "@/pages/Onboarding";
import BuyerProfile from "@/pages/BuyerProfile";
import SellerProfile from "@/pages/SellerProfile";
import ProjectsShowcase from "@/pages/ProjectsShowcase";
import Notifications from "@/pages/Notifications";
import ReviewRatings from "@/pages/ReviewRatings";
import Messages from "@/pages/Messages";
import SellerInsights from "@/pages/SellerInsights";
import AuthGate from "./components/AuthGate";
import BrowseContributors from "./pages/BrowseContributors";
import ViewContributor from "./pages/ViewContributor";

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
            <Route path="/browse-contributors" element={<BrowseContributors />} />
            <Route path="/view-contributor/:username" element={<ViewContributor />} />
            <Route path="/login" element={<LoginPage />} />
            {/* <Route path="/signup" element={<SignupPage />} /> */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthGate>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
