import { LoanOpportunity } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";

interface OpportunityCardProps {
  opportunity: LoanOpportunity;
  onViewDetails: () => void;
}

const OpportunityCard = ({ opportunity, onViewDetails }: OpportunityCardProps) => {
  // Calculate funding progress percentage
  const totalAmount = parseFloat(opportunity.amount.toString());
  const progressAmount = parseFloat(opportunity.progressAmount.toString());
  const progressPercentage = (progressAmount / totalAmount) * 100;

  // Get image and industry label based on business type
  const getIndustryDetails = () => {
    let imageUrl;
    let industryLabel;
    
    // In a real app, this would be data from the business record
    if (opportunity.title.toLowerCase().includes('bakery') || 
        opportunity.description.toLowerCase().includes('bakery') ||
        opportunity.description.toLowerCase().includes('bread')) {
      imageUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
      industryLabel = "Food & Beverage";
    } else if (opportunity.title.toLowerCase().includes('fitness') || 
              opportunity.description.toLowerCase().includes('fitness') ||
              opportunity.description.toLowerCase().includes('wellness')) {
      imageUrl = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
      industryLabel = "Health & Fitness";
    } else if (opportunity.title.toLowerCase().includes('tech') || 
              opportunity.description.toLowerCase().includes('tech') ||
              opportunity.description.toLowerCase().includes('it')) {
      imageUrl = "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
      industryLabel = "Technology";
    } else {
      imageUrl = "https://images.unsplash.com/photo-1578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&q=80";
      industryLabel = "Retail";
    }
    
    return { imageUrl, industryLabel };
  };
  
  const { imageUrl, industryLabel } = getIndustryDetails();
  
  // Calculate days left until deadline (or use placeholder)
  const daysLeft = opportunity.deadline 
    ? Math.max(0, Math.ceil((new Date(opportunity.deadline).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
    : 5; // Fallback value

  return (
    <div className="bg-white rounded-lg shadow border border-gray-200 overflow-hidden hover:shadow-md transition">
      <div className="h-40 bg-gray-200 relative">
        <img 
          src={imageUrl} 
          alt={opportunity.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 right-4 bg-white text-primary font-medium text-xs px-2 py-1 rounded">
          {industryLabel}
        </div>
      </div>
      <div className="p-6">
        <h3 className="font-bold text-lg mb-2">{opportunity.title}</h3>
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {opportunity.description}
        </p>
        
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-gray-600">Funding Progress</span>
            <span className="font-medium">{progressPercentage.toFixed(0)}% funded</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full" 
              style={{ width: `${Math.min(progressPercentage, 100)}%` }}
            ></div>
          </div>
        </div>
        
        <div className="grid grid-cols-2 gap-4 mb-6">
          <div>
            <p className="text-xs text-gray-500">Loan Amount</p>
            <p className="font-semibold">${totalAmount.toFixed(0)}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Term</p>
            <p className="font-semibold">{opportunity.term} months</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Interest Rate</p>
            <p className="font-semibold">{opportunity.interestRate}%</p>
          </div>
          <div>
            <p className="text-xs text-gray-500">Time Left</p>
            <p className="font-semibold">{daysLeft} days</p>
          </div>
        </div>
        
        <Button 
          className="w-full"
          onClick={onViewDetails}
        >
          View Opportunity
        </Button>
      </div>
    </div>
  );
};

export default OpportunityCard;
