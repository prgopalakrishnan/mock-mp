import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import StatisticCard from "@/components/statistic-card";
import ActiveLoansTable from "@/components/active-loans-table";
import OpportunityCard from "@/components/opportunity-card";
import OpportunityModal from "@/components/opportunity-modal";
import CommunityActivity from "@/components/community-activity";
import EducationalContent from "@/components/educational-content";
import { LoanOpportunity } from "@shared/schema";
import { Badge } from "@/components/ui/badge";
import { 
  DollarSign, 
  SquareStack, 
  Percent,
  Building2 
} from "lucide-react";

export default function LenderDashboard() {
  const { user } = useAuth();
  const [selectedOpportunity, setSelectedOpportunity] = useState<LoanOpportunity | null>(null);
  
  // Fetch user's loans
  const { data: loans, isLoading: loansLoading } = useQuery({
    queryKey: ["/api/users", user?.id, "loans"],
    enabled: !!user?.id,
  });
  
  // Fetch loan opportunities
  const { data: opportunities, isLoading: opportunitiesLoading } = useQuery({
    queryKey: ["/api/loan-opportunities"],
  });
  
  // Fetch community activities
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/community-activities"],
  });
  
  // Fetch educational resources
  const { data: resources, isLoading: resourcesLoading } = useQuery({
    queryKey: ["/api/educational-resources"],
  });

  // Calculate statistics from loans data
  const totalInvested = loans?.reduce((sum, loan) => sum + parseFloat(loan.amount.toString()), 0) || 0;
  const activeLoansCount = loans?.filter(loan => loan.status === "active").length || 0;
  
  // Calculate average return rate
  const avgReturnRate = loans?.length
    ? loans.reduce((sum, loan) => {
        const opportunity = opportunities?.find(o => o.id === loan.opportunityId);
        return opportunity ? sum + parseFloat(opportunity.interestRate.toString()) : sum;
      }, 0) / loans.length
    : 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="User Type Tabs">
              <button 
                className="border-b-2 border-primary text-primary whitespace-nowrap py-4 px-1 font-medium text-sm"
                aria-current="page"
              >
                Lender View
              </button>
              <button 
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 font-medium text-sm"
                onClick={() => window.location.href = "/business-dashboard"}
              >
                Business View
              </button>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">Welcome back, {user?.displayName}</h1>
            <p className="text-gray-600">Your lending portfolio is performing well. Here's your latest overview.</p>
          </div>
          
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            <StatisticCard
              title="Total Invested"
              value={`$${totalInvested.toFixed(2)}`}
              icon={<DollarSign />}
              trend="+8.5% since last month"
              trendPositive={true}
            />
            
            <StatisticCard
              title="Active Loans"
              value={activeLoansCount.toString()}
              icon={<SquareStack />}
              trend={`${loans?.length ? loans.length - activeLoansCount : 0} completed`}
              trendPositive={true}
            />
            
            <StatisticCard
              title="Avg. Return Rate"
              value={`${avgReturnRate.toFixed(1)}%`}
              icon={<Percent />}
              description="Based on all active loans"
            />
            
            <StatisticCard
              title="Community Impact"
              value="High"
              icon={<Building2 />}
              description={`Supporting ${activeLoansCount} local businesses`}
            />
          </div>
          
          {/* Active Loans List */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">Your Active Loans</h2>
              <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                View all <span className="ml-1">→</span>
              </a>
            </div>
            
            <ActiveLoansTable loans={loans} isLoading={loansLoading} />
          </div>
          
          {/* New Lending Opportunities */}
          <div className="mb-10">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-bold text-gray-900">New Lending Opportunities</h2>
              <a href="#" className="text-primary hover:text-primary/80 text-sm font-medium flex items-center">
                Browse all <span className="ml-1">→</span>
              </a>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {opportunitiesLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-white rounded-lg shadow border border-gray-200 h-96 animate-pulse" />
                ))
              ) : (
                opportunities?.slice(0, 3).map((opportunity) => (
                  <OpportunityCard 
                    key={opportunity.id}
                    opportunity={opportunity}
                    onViewDetails={() => setSelectedOpportunity(opportunity)}
                  />
                ))
              )}
            </div>
          </div>
          
          {/* Community Activity */}
          <CommunityActivity activities={activities} isLoading={activitiesLoading} />
          
          {/* Educational Content */}
          <EducationalContent resources={resources} isLoading={resourcesLoading} />
        </div>
      </main>
      
      {selectedOpportunity && (
        <OpportunityModal 
          opportunity={selectedOpportunity} 
          onClose={() => setSelectedOpportunity(null)}
        />
      )}
      
      <Footer />
    </div>
  );
}
