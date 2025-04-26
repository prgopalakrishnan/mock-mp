import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { LoanOpportunity } from "@shared/schema";
import { useAuth } from "@/hooks/use-auth";
import { X, Store, HandPlatter, ShirtIcon, User, FileText, FileBarChart, File } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface OpportunityModalProps {
  opportunity: LoanOpportunity;
  onClose: () => void;
}

const OpportunityModal = ({ opportunity, onClose }: OpportunityModalProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [investmentAmount, setInvestmentAmount] = useState<string>("");
  
  // Calculate funding progress
  const totalAmount = parseFloat(opportunity.amount.toString());
  const progressAmount = parseFloat(opportunity.progressAmount.toString());
  const progressPercentage = (progressAmount / totalAmount) * 100;
  const remainingAmount = totalAmount - progressAmount;
  
  // Get business details
  const { data: business } = useQuery({
    queryKey: ["/api/businesses", opportunity.businessId],
  });
  
  // Get industry details based on opportunity
  const getIndustryDetails = () => {
    let imageUrl;
    let industry;
    let icon;
    
    // In a real app, this would be data from the business record
    if (opportunity.title.toLowerCase().includes('bakery') || 
        opportunity.description.toLowerCase().includes('bakery') ||
        opportunity.description.toLowerCase().includes('bread')) {
      imageUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      industry = "Food & Beverage";
      icon = <HandPlatter className="h-5 w-5 text-gray-500" />;
    } else if (opportunity.title.toLowerCase().includes('fitness') || 
              opportunity.description.toLowerCase().includes('fitness') ||
              opportunity.description.toLowerCase().includes('wellness')) {
      imageUrl = "https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      industry = "Health & Fitness";
      icon = <ShirtIcon className="h-5 w-5 text-gray-500" />;
    } else if (opportunity.title.toLowerCase().includes('tech') || 
              opportunity.description.toLowerCase().includes('tech') ||
              opportunity.description.toLowerCase().includes('it')) {
      imageUrl = "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      industry = "Technology";
      icon = <Store className="h-5 w-5 text-gray-500" />;
    } else {
      imageUrl = "https://images.unsplash.com/photo-1581578731548-c64695cc6952?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80";
      industry = "Retail";
      icon = <Store className="h-5 w-5 text-gray-500" />;
    }
    
    return { imageUrl, industry, icon };
  };
  
  const { imageUrl, industry, icon } = getIndustryDetails();
  
  // Calculate dates and risk level
  const foundedYear = business?.yearFounded || 2018;
  const employeeCount = business?.employeeCount || 7;
  const deadline = opportunity.deadline 
    ? new Date(opportunity.deadline).toLocaleDateString()
    : "5 days left";
  
  // Investment mutation
  const investMutation = useMutation({
    mutationFn: async (amount: number) => {
      const res = await apiRequest("POST", "/api/loans", {
        opportunityId: opportunity.id,
        amount: amount,
        status: "active"
      });
      return res.json();
    },
    onSuccess: () => {
      toast({
        title: "Investment successful!",
        description: `You've successfully invested $${parseFloat(investmentAmount).toFixed(2)} in ${opportunity.title}.`,
      });
      setInvestmentAmount("");
      queryClient.invalidateQueries({ queryKey: ["/api/loan-opportunities"] });
      queryClient.invalidateQueries({ queryKey: ["/api/users", user?.id, "loans"] });
      onClose();
    },
    onError: (error) => {
      toast({
        title: "Investment failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });
  
  // Handle investment submission
  const handleInvest = () => {
    const amount = parseFloat(investmentAmount);
    
    // Validation
    if (isNaN(amount) || amount <= 0) {
      toast({
        title: "Invalid amount",
        description: "Please enter a valid investment amount.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount < 50) {
      toast({
        title: "Amount too small",
        description: "Minimum investment amount is $50.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount > 5000) {
      toast({
        title: "Amount too large",
        description: "Maximum investment amount is $5,000.",
        variant: "destructive",
      });
      return;
    }
    
    if (amount > remainingAmount) {
      toast({
        title: "Amount exceeds remaining",
        description: `Maximum available amount is $${remainingAmount.toFixed(2)}.`,
        variant: "destructive",
      });
      return;
    }
    
    // Submit investment
    investMutation.mutate(amount);
  };
  
  // Calculate expected returns based on investment amount
  const calculateReturns = (principal: number) => {
    const rate = parseFloat(opportunity.interestRate.toString()) / 100 / 12; // Monthly interest rate
    const term = opportunity.term; // Number of months
    
    const monthlyPayment = principal * (rate * Math.pow(1 + rate, term)) / (Math.pow(1 + rate, term) - 1);
    const totalPayment = monthlyPayment * term;
    const totalInterest = totalPayment - principal;
    
    return {
      monthlyPayment: monthlyPayment.toFixed(2),
      totalInterest: totalInterest.toFixed(2),
      totalReturn: totalPayment.toFixed(2)
    };
  };
  
  const returns = calculateReturns(parseFloat(investmentAmount) || 1000);

  return (
    <div 
      className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-xl max-w-4xl mx-auto overflow-hidden w-full max-h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <h2 className="text-2xl font-bold font-heading text-gray-900">{opportunity.title}</h2>
          <button 
            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-500 transition"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </button>
        </div>
        
        {/* Modal Content */}
        <div className="overflow-y-auto flex-grow p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div>
              <div className="mb-6">
                <img 
                  src={imageUrl} 
                  alt={opportunity.title} 
                  className="w-full h-64 object-cover rounded-lg"
                />
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">About the Business</h3>
                <p className="text-gray-600 mb-4">
                  {opportunity.description}
                </p>
                <p className="text-gray-600">
                  {opportunity.purpose}
                </p>
              </div>
              
              <div className="mb-6">
                <h3 className="text-lg font-bold mb-2">Business Details</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Founded</p>
                    <p className="font-medium">{foundedYear}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Employees</p>
                    <p className="font-medium">{employeeCount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Location</p>
                    <p className="font-medium">{business?.location || "Portland, OR"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="font-medium">{industry}</p>
                  </div>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-bold mb-2">Owner</h3>
                <div className="flex items-center">
                  <div className="h-12 w-12 rounded-full bg-gray-200 flex items-center justify-center">
                    <User className="h-6 w-6 text-gray-600" />
                  </div>
                  <div className="ml-4">
                    <p className="font-medium">{business?.ownerName || "Business Owner"}</p>
                    <p className="text-sm text-gray-500">{business?.ownerRole || "Owner"}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Right Column */}
            <div>
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h3 className="text-lg font-bold mb-4">Loan Details</h3>
                
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Funding Progress</span>
                    <span className="font-medium">${progressAmount.toFixed(2)} of ${totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mb-1">
                    <div 
                      className="bg-primary h-2 rounded-full" 
                      style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                    ></div>
                  </div>
                  <div className="flex justify-between text-xs">
                    <span className="text-gray-500">{progressPercentage.toFixed(0)}% funded</span>
                    <span className="text-gray-500">
                      {typeof deadline === 'string' ? deadline : `${deadline} days left`}
                    </span>
                  </div>
                </div>
                
                <div className="grid grid-cols-2 gap-y-4 mb-6">
                  <div>
                    <p className="text-sm text-gray-500">Loan Amount</p>
                    <p className="font-semibold text-lg">${totalAmount.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Term</p>
                    <p className="font-semibold text-lg">{opportunity.term} months</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Interest Rate</p>
                    <p className="font-semibold text-lg">{opportunity.interestRate}%</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Repayment</p>
                    <p className="font-semibold text-lg">Monthly</p>
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">{Math.floor(progressPercentage / 3)} lenders have contributed</h4>
                  <div className="flex -space-x-2 overflow-hidden">
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-primary flex items-center justify-center text-white text-xs">JB</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-green-500 flex items-center justify-center text-white text-xs">KT</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-yellow-500 flex items-center justify-center text-white text-xs">RW</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-400 flex items-center justify-center text-white text-xs">AL</div>
                    <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-primary-600 flex items-center justify-center text-white text-xs">MS</div>
                    {progressPercentage >= 15 && (
                      <div className="inline-block h-8 w-8 rounded-full ring-2 ring-white bg-gray-700 flex items-center justify-center text-white text-xs">+{Math.floor(progressPercentage / 5)}</div>
                    )}
                  </div>
                </div>
                
                <div className="mb-6">
                  <h4 className="font-medium mb-2">Purpose of Loan</h4>
                  <p className="text-sm text-gray-600">
                    {opportunity.purpose}
                  </p>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Risk Assessment</h4>
                  <div className="flex items-center mb-1">
                    <div className="w-1/4 text-sm text-gray-500">Risk Level:</div>
                    <div className="w-3/4">
                      <span className={cn(
                        "px-2 py-1 text-xs font-medium rounded",
                        opportunity.riskLevel === "low" ? "bg-green-100 text-green-800" :
                        opportunity.riskLevel === "medium" ? "bg-yellow-100 text-yellow-800" :
                        "bg-red-100 text-red-800"
                      )}>
                        {opportunity.riskLevel.charAt(0).toUpperCase() + opportunity.riskLevel.slice(1)}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <div className="w-1/4 text-sm text-gray-500">Credit Score:</div>
                    <div className="w-3/4 text-sm font-medium">
                      {opportunity.riskLevel === "low" ? "Excellent (720+)" :
                       opportunity.riskLevel === "medium" ? "Good (680+)" :
                       "Fair (640+)"}
                    </div>
                  </div>
                </div>
              </div>
              
              {user && user.userType === "lender" && (
                <div className="mb-6">
                  <h3 className="text-lg font-bold mb-4">Invest in This Business</h3>
                  <div className="bg-white rounded-lg border border-gray-200 p-4">
                    <div className="mb-4">
                      <Label htmlFor="invest-amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Investment Amount
                      </Label>
                      <div className="mt-1 relative rounded-md shadow-sm">
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm">$</span>
                        </div>
                        <Input 
                          type="text" 
                          id="invest-amount" 
                          className="pl-7 pr-12" 
                          placeholder="0.00" 
                          value={investmentAmount}
                          onChange={(e) => setInvestmentAmount(e.target.value)}
                        />
                        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
                          <span className="text-gray-500 sm:text-sm" id="price-currency">USD</span>
                        </div>
                      </div>
                      <p className="mt-2 text-xs text-gray-500" id="investment-limits">
                        Min: $50 | Max: $5,000
                      </p>
                    </div>
                    
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-sm font-medium">Expected Returns</h4>
                        <span className="text-xs text-gray-500">
                          (Based on ${investmentAmount ? parseFloat(investmentAmount).toFixed(2) : "1,000"} investment)
                        </span>
                      </div>
                      <div className="bg-gray-50 rounded p-3">
                        <div className="flex justify-between text-sm mb-1">
                          <span>Monthly Payment:</span>
                          <span className="font-medium">${returns.monthlyPayment}</span>
                        </div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Total Interest:</span>
                          <span className="font-medium">${returns.totalInterest}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span>Total Return:</span>
                          <span className="font-medium">${returns.totalReturn}</span>
                        </div>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full"
                      onClick={handleInvest}
                      disabled={investMutation.isPending}
                    >
                      {investMutation.isPending ? "Processing..." : "Invest Now"}
                    </Button>
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-bold mb-2">Documents</h3>
                <ul className="space-y-2">
                  <li>
                    <a href="#" className="flex items-center text-primary hover:text-primary/80 text-sm">
                      <FileText className="h-4 w-4 mr-2" />
                      Business Plan
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-primary hover:text-primary/80 text-sm">
                      <FileBarChart className="h-4 w-4 mr-2" />
                      Financial Statements (2021-2023)
                    </a>
                  </li>
                  <li>
                    <a href="#" className="flex items-center text-primary hover:text-primary/80 text-sm">
                      <File className="h-4 w-4 mr-2" />
                      Loan Agreement Terms
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpportunityModal;
