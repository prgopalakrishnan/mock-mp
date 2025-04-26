import { Loan, LoanOpportunity } from "@shared/schema";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import { Store, HandPlatter, ShirtIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface ActiveLoansTableProps {
  loans?: Loan[];
  isLoading: boolean;
}

const ActiveLoansTable = ({ loans, isLoading }: ActiveLoansTableProps) => {
  // Fetch loan opportunities to get details
  const { data: opportunities } = useQuery({
    queryKey: ["/api/loan-opportunities"],
  });

  // Helper function to get opportunity details
  const getOpportunityDetails = (opportunityId: number) => {
    return opportunities?.find(opp => opp.id === opportunityId);
  };

  // Helper function to get business name from opportunity
  const getBusinessDetails = (opportunityId: number) => {
    const opportunity = getOpportunityDetails(opportunityId);
    
    if (!opportunity) return { name: 'Loading...', industry: 'Loading...' };
    
    // Mock business info based on opportunity data
    // In a real app, you would fetch the actual business data
    let icon;
    let industryLabel;
    
    if (opportunity.title.toLowerCase().includes('bakery') || opportunity.title.toLowerCase().includes('cafe')) {
      icon = <HandPlatter className="h-5 w-5 text-gray-500" />;
      industryLabel = "Food & Beverage";
    } else if (opportunity.title.toLowerCase().includes('tech') || opportunity.title.toLowerCase().includes('solution')) {
      icon = <Store className="h-5 w-5 text-gray-500" />;
      industryLabel = "Technology";
    } else if (opportunity.title.toLowerCase().includes('apparel') || opportunity.title.toLowerCase().includes('clothing')) {
      icon = <ShirtIcon className="h-5 w-5 text-gray-500" />;
      industryLabel = "Retail";
    } else {
      icon = <Store className="h-5 w-5 text-gray-500" />;
      industryLabel = "Retail";
    }
    
    return { 
      name: opportunity.title,
      industry: industryLabel,
      icon
    };
  };

  const getStatusBadgeClass = (status: string) => {
    switch(status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'late':
        return 'bg-yellow-100 text-yellow-800';
      case 'repaid':
        return 'bg-blue-100 text-blue-800';
      case 'defaulted':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Business
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Term
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Interest
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              Array(3).fill(0).map((_, i) => (
                <tr key={i}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="ml-4">
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-3 w-16 mt-1" />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-16" />
                    <Skeleton className="h-3 w-12 mt-1" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-4 w-12" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <Skeleton className="h-5 w-16 rounded-full" />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right">
                    <Skeleton className="h-4 w-12 ml-auto" />
                  </td>
                </tr>
              ))
            ) : loans && loans.length > 0 ? (
              loans.map((loan) => {
                const opportunity = getOpportunityDetails(loan.opportunityId);
                const business = getBusinessDetails(loan.opportunityId);
                return (
                  <tr key={loan.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                            {business.icon}
                          </div>
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{business.name}</div>
                          <div className="text-sm text-gray-500">{business.industry}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">${parseFloat(loan.amount.toString()).toFixed(2)}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{opportunity?.term} months</div>
                      <div className="text-xs text-gray-500">
                        {/* In a real app you would calculate remaining months based on creation date */}
                        {Math.floor(Math.random() * opportunity?.term!)} remaining
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{opportunity?.interestRate}%</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={cn(
                        "px-2 inline-flex text-xs leading-5 font-semibold rounded-full",
                        getStatusBadgeClass(loan.status)
                      )}>
                        {loan.status.charAt(0).toUpperCase() + loan.status.slice(1)}
                        {loan.status === 'late' && " (5 days)"}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <a href="#" className="text-primary hover:text-primary/80">Details</a>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                  No active loans yet. Browse opportunities to start lending!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActiveLoansTable;
