import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import AuthPage from "@/pages/auth-page";
import HomePage from "@/pages/home-page";
import LenderDashboard from "@/pages/lender-dashboard";
import BusinessDashboard from "@/pages/business-dashboard";
import OpportunitiesPage from "@/pages/opportunities-page";
import ForBusinessesPage from "@/pages/for-businesses-page";
import ForLendersPage from "@/pages/for-lenders-page";
import LearnPage from "@/pages/learn-page";
import CommunityPage from "@/pages/community-page";
import { ProtectedRoute } from "./lib/protected-route";

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      <Route path="/" component={HomePage} />
      <Route path="/opportunities" component={OpportunitiesPage} />
      <Route path="/for-businesses" component={ForBusinessesPage} />
      <Route path="/for-lenders" component={ForLendersPage} />
      <Route path="/learn" component={LearnPage} />
      <Route path="/community" component={CommunityPage} />
      <ProtectedRoute path="/lender-dashboard" component={LenderDashboard} />
      <ProtectedRoute path="/business-dashboard" component={BusinessDashboard} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
