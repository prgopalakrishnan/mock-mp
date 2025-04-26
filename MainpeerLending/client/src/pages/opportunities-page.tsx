import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import OpportunityCard from "@/components/opportunity-card";
import OpportunityModal from "@/components/opportunity-modal";
import { LoanOpportunity } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Input } from "@/components/ui/input";
import { Search, Filter, X } from "lucide-react";

export default function OpportunitiesPage() {
  const [selectedOpportunity, setSelectedOpportunity] = useState<LoanOpportunity | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [industry, setIndustry] = useState("all");
  const [termRange, setTermRange] = useState<number[]>([1, 36]);
  const [amountRange, setAmountRange] = useState<number[]>([500, 50000]);
  const [interestRange, setInterestRange] = useState<number[]>([3, 15]);
  const [showFilters, setShowFilters] = useState(false);
  
  // Fetch loan opportunities
  const { data: opportunities, isLoading } = useQuery({
    queryKey: ["/api/loan-opportunities"],
  });
  
  // Filter opportunities based on filters
  const filteredOpportunities = opportunities ? opportunities.filter((opp: LoanOpportunity) => {
    // Search query filter
    if (searchQuery && !opp.title.toLowerCase().includes(searchQuery.toLowerCase()) && 
        !opp.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    // Industry filter (mocked - in a real app this would use actual business industry data)
    if (industry !== "all") {
      const hasIndustry = (industry === "food" && (opp.title.toLowerCase().includes("bakery") || 
                                                 opp.title.toLowerCase().includes("cafe") ||
                                                 opp.description.toLowerCase().includes("food"))) ||
                        (industry === "retail" && (opp.title.toLowerCase().includes("shop") || 
                                                  opp.title.toLowerCase().includes("store") ||
                                                  opp.description.toLowerCase().includes("retail"))) ||
                        (industry === "health" && (opp.title.toLowerCase().includes("fitness") || 
                                                  opp.title.toLowerCase().includes("wellness") ||
                                                  opp.description.toLowerCase().includes("health"))) ||
                        (industry === "tech" && (opp.title.toLowerCase().includes("tech") || 
                                               opp.description.toLowerCase().includes("software") ||
                                               opp.description.toLowerCase().includes("digital")));
      if (!hasIndustry) return false;
    }
    
    // Term, amount, and interest rate filters
    const term = opp.term as number;
    const amount = parseFloat(opp.amount.toString());
    const interest = parseFloat(opp.interestRate.toString());
    
    return term >= termRange[0] && term <= termRange[1] &&
           amount >= amountRange[0] && amount <= amountRange[1] &&
           interest >= interestRange[0] && interest <= interestRange[1];
  }) : [];
  
  const resetFilters = () => {
    setSearchQuery("");
    setIndustry("all");
    setTermRange([1, 36]);
    setAmountRange([500, 50000]);
    setInterestRange([3, 15]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">Browse Funding Opportunities</h1>
              <p className="text-lg opacity-90 mb-6">
                Discover local businesses seeking growth capital and invest directly in their success.
              </p>
              
              <div className="relative">
                <div className="flex">
                  <div className="relative flex-grow">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                    <Input 
                      type="text"
                      placeholder="Search for businesses or industries..." 
                      className="pl-10 pr-4 py-3 w-full rounded-l-lg text-gray-900"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <Button 
                    variant="secondary" 
                    className="rounded-l-none" 
                    onClick={() => setShowFilters(!showFilters)}
                  >
                    <Filter className="mr-2 h-4 w-4" />
                    Filters
                  </Button>
                </div>
                
                {showFilters && (
                  <div className="mt-4 bg-white p-4 rounded-lg shadow-lg">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-semibold">Filter Results</h3>
                      <Button variant="ghost" size="sm" className="h-8 px-2" onClick={resetFilters}>
                        <X className="mr-1 h-4 w-4" />
                        Reset
                      </Button>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Industry</label>
                        <Select value={industry} onValueChange={setIndustry}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select industry" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="all">All Industries</SelectItem>
                            <SelectItem value="food">Food & Beverage</SelectItem>
                            <SelectItem value="retail">Retail</SelectItem>
                            <SelectItem value="health">Health & Wellness</SelectItem>
                            <SelectItem value="tech">Technology</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Loan Term: {termRange[0]}-{termRange[1]} months
                        </label>
                        <Slider 
                          value={termRange}
                          min={1}
                          max={36}
                          step={1}
                          onValueChange={(value) => setTermRange(value as number[])}
                          className="my-4"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Amount: ${amountRange[0]}-${amountRange[1]}
                        </label>
                        <Slider 
                          value={amountRange}
                          min={500}
                          max={50000}
                          step={500}
                          onValueChange={(value) => setAmountRange(value as number[])}
                          className="my-4"
                        />
                      </div>
                      
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Interest Rate: {interestRange[0]}%-{interestRange[1]}%
                        </label>
                        <Slider 
                          value={interestRange}
                          min={3}
                          max={15}
                          step={0.5}
                          onValueChange={(value) => setInterestRange(value as number[])}
                          className="my-4"
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-xl font-bold text-gray-900">
              {isLoading 
                ? "Loading opportunities..." 
                : filteredOpportunities && filteredOpportunities.length > 0
                  ? `${filteredOpportunities.length} Opportunities Found`
                  : "No Opportunities Found"}
            </h2>
            
            <Select defaultValue="newest">
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="highest-interest">Highest Interest</SelectItem>
                <SelectItem value="lowest-risk">Lowest Risk</SelectItem>
                <SelectItem value="most-funded">Most Funded</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill(0).map((_, i) => (
                <div key={i} className="bg-white rounded-lg shadow border border-gray-200 h-96 animate-pulse" />
              ))
            ) : filteredOpportunities && filteredOpportunities.length > 0 ? (
              filteredOpportunities.map((opportunity: LoanOpportunity) => (
                <OpportunityCard 
                  key={opportunity.id}
                  opportunity={opportunity}
                  onViewDetails={() => setSelectedOpportunity(opportunity)}
                />
              ))
            ) : (
              <div className="col-span-3 text-center py-12">
                <p className="text-gray-500 mb-4">No opportunities match your current filters.</p>
                <Button onClick={resetFilters}>Clear Filters</Button>
              </div>
            )}
          </div>
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