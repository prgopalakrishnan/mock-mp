import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { useAuth } from "@/hooks/use-auth";
import StatisticCard from "@/components/statistic-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { 
  Building2,
  DollarSign, 
  Users, 
  Calendar, 
  Milestone,
  ShieldCheck 
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Business Profile Form Schema
const businessSchema = z.object({
  name: z.string().min(2, "Business name is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  industry: z.string().min(1, "Industry is required"),
  location: z.string().min(2, "Location is required"),
  yearFounded: z.coerce.number().int().positive().optional(),
  employeeCount: z.coerce.number().int().positive().optional(),
  ownerName: z.string().min(2, "Owner name is required"),
  ownerRole: z.string().min(2, "Owner role is required"),
});

type BusinessForm = z.infer<typeof businessSchema>;

// Loan Opportunity Form Schema
const loanOpportunitySchema = z.object({
  title: z.string().min(5, "Title is required"),
  description: z.string().min(20, "Please provide a detailed description"),
  amount: z.coerce.number().positive("Amount must be positive"),
  term: z.coerce.number().int().positive("Term must be a positive number"),
  interestRate: z.coerce.number().positive("Interest rate must be positive"),
  purpose: z.string().min(10, "Please describe the purpose of the loan"),
  riskLevel: z.string().min(1, "Risk level is required"),
  deadline: z.string().min(1, "Deadline is required"),
});

type LoanOpportunityForm = z.infer<typeof loanOpportunitySchema>;

export default function BusinessDashboard() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("dashboard");
  
  // Fetch business profile
  const { 
    data: business,
    isLoading: businessLoading,
    refetch: refetchBusiness
  } = useQuery({
    queryKey: ["/api/users", user?.id, "business"],
    enabled: !!user?.id,
  });
  
  // Fetch loan opportunities for this business
  const { 
    data: opportunities,
    isLoading: opportunitiesLoading,
    refetch: refetchOpportunities
  } = useQuery({
    queryKey: ["/api/loan-opportunities"],
    select: (data) => data.filter((opp) => opp.businessId === business?.id),
    enabled: !!business?.id,
  });
  
  // Business Profile Form
  const businessForm = useForm<BusinessForm>({
    resolver: zodResolver(businessSchema),
    defaultValues: {
      name: "",
      description: "",
      industry: "",
      location: "",
      yearFounded: undefined,
      employeeCount: undefined,
      ownerName: "",
      ownerRole: "",
    },
  });
  
  // Loan Opportunity Form
  const loanOpportunityForm = useForm<LoanOpportunityForm>({
    resolver: zodResolver(loanOpportunitySchema),
    defaultValues: {
      title: "",
      description: "",
      amount: undefined,
      term: undefined,
      interestRate: undefined,
      purpose: "",
      riskLevel: "medium",
      deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 30 days from now
    },
  });
  
  // Prefill business form when data is loaded
  useState(() => {
    if (business && !businessLoading) {
      businessForm.reset({
        name: business.name,
        description: business.description,
        industry: business.industry,
        location: business.location,
        yearFounded: business.yearFounded,
        employeeCount: business.employeeCount,
        ownerName: business.ownerName || "",
        ownerRole: business.ownerRole || "",
      });
    }
  });
  
  // Create/Update Business Mutation
  const businessMutation = useMutation({
    mutationFn: async (data: BusinessForm) => {
      const res = await apiRequest("POST", "/api/businesses", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Business profile has been saved",
      });
      refetchBusiness();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Create Loan Opportunity Mutation
  const loanOpportunityMutation = useMutation({
    mutationFn: async (data: LoanOpportunityForm) => {
      const res = await apiRequest("POST", "/api/loan-opportunities", data);
      return await res.json();
    },
    onSuccess: () => {
      toast({
        title: "Success",
        description: "Loan opportunity has been created",
      });
      loanOpportunityForm.reset();
      refetchOpportunities();
      setActiveTab("dashboard");
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
  
  // Submit handlers
  const onSubmitBusiness = (data: BusinessForm) => {
    businessMutation.mutate(data);
  };
  
  const onSubmitLoanOpportunity = (data: LoanOpportunityForm) => {
    loanOpportunityMutation.mutate(data);
  };
  
  // Calculate statistics
  const totalFunded = opportunities?.reduce(
    (sum, opp) => sum + parseFloat(opp.progressAmount.toString()), 
    0
  ) || 0;
  
  const activeOpportunities = opportunities?.filter(
    (opp) => opp.status === "active"
  ).length || 0;
  
  const fundedOpportunities = opportunities?.filter(
    (opp) => opp.status === "funded"
  ).length || 0;

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex space-x-8" aria-label="User Type Tabs">
              <button 
                className="border-b-2 border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 whitespace-nowrap py-4 px-1 font-medium text-sm"
                onClick={() => window.location.href = "/lender-dashboard"}
              >
                Lender View
              </button>
              <button 
                className="border-b-2 border-primary text-primary whitespace-nowrap py-4 px-1 font-medium text-sm"
                aria-current="page"
              >
                Business View
              </button>
            </nav>
          </div>
        </div>
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Dashboard Header */}
          <div className="mb-8">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
              {business ? `Welcome back, ${business.name}` : 'Complete Your Business Profile'}
            </h1>
            <p className="text-gray-600">
              {business 
                ? 'Manage your funding opportunities and track your progress.' 
                : 'Get started by setting up your business profile to attract lenders.'}
            </p>
          </div>
          
          {!business && !businessLoading ? (
            <Card className="mb-8">
              <CardHeader>
                <CardTitle>Create Your Business Profile</CardTitle>
                <CardDescription>
                  Tell potential lenders about your business to build trust and credibility.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...businessForm}>
                  <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <FormField
                        control={businessForm.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Business Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Enter your business name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="industry"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Industry</FormLabel>
                            <Select 
                              onValueChange={field.onChange}
                              defaultValue={field.value}
                            >
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select your industry" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="retail">Retail</SelectItem>
                                <SelectItem value="food">Food & Beverage</SelectItem>
                                <SelectItem value="health">Health & Fitness</SelectItem>
                                <SelectItem value="technology">Technology</SelectItem>
                                <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                <SelectItem value="services">Professional Services</SelectItem>
                                <SelectItem value="education">Education</SelectItem>
                                <SelectItem value="other">Other</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="location"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Location</FormLabel>
                            <FormControl>
                              <Input placeholder="City, State" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="yearFounded"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Year Founded</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="YYYY" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="employeeCount"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Number of Employees</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="e.g. 5" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="ownerName"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner Name</FormLabel>
                            <FormControl>
                              <Input placeholder="Your full name" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="ownerRole"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Owner Title/Role</FormLabel>
                            <FormControl>
                              <Input placeholder="e.g. CEO, Owner, Founder" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={businessForm.control}
                        name="description"
                        render={({ field }) => (
                          <FormItem className="md:col-span-2">
                            <FormLabel>Business Description</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Tell potential lenders about your business, products/services, customers, and what makes you unique." 
                                className="min-h-[120px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      className="w-full md:w-auto"
                      disabled={businessMutation.isPending}
                    >
                      {businessMutation.isPending ? "Saving..." : "Save Business Profile"}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>
          ) : (
            <Tabs defaultValue="dashboard" value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-8">
                <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
                <TabsTrigger value="create-opportunity">Create Funding Opportunity</TabsTrigger>
                <TabsTrigger value="profile">Business Profile</TabsTrigger>
              </TabsList>
              
              <TabsContent value="dashboard">
                {/* Statistics Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                  <StatisticCard
                    title="Total Raised"
                    value={`$${totalFunded.toFixed(2)}`}
                    icon={<DollarSign />}
                    trend={fundedOpportunities > 0 ? `${fundedOpportunities} fully funded` : undefined}
                    trendPositive={true}
                  />
                  
                  <StatisticCard
                    title="Active Opportunities"
                    value={activeOpportunities.toString()}
                    icon={<Milestone />}
                    description={opportunities?.length ? `Out of ${opportunities.length} total opportunities` : undefined}
                  />
                  
                  <StatisticCard
                    title="Avg. Interest Rate"
                    value={`${opportunities?.length 
                      ? (opportunities.reduce((sum, opp) => sum + parseFloat(opp.interestRate.toString()), 0) / opportunities.length).toFixed(1) 
                      : 0}%`}
                    icon={<Calendar />}
                    description="Based on all your opportunities"
                  />
                  
                  <StatisticCard
                    title="Lender Count"
                    value="34"
                    icon={<Users />}
                    description="People supporting your business"
                  />
                </div>
                
                {/* Active Opportunities */}
                <Card className="mb-10">
                  <CardHeader>
                    <CardTitle>Your Funding Opportunities</CardTitle>
                    <CardDescription>
                      Track the progress of your active funding opportunities
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {opportunitiesLoading ? (
                      <div className="space-y-4">
                        {Array(2).fill(0).map((_, i) => (
                          <div key={i} className="h-24 bg-gray-100 animate-pulse rounded-md" />
                        ))}
                      </div>
                    ) : opportunities?.length ? (
                      <div className="space-y-6">
                        {opportunities.map((opportunity) => {
                          const totalAmount = parseFloat(opportunity.amount.toString());
                          const progressAmount = parseFloat(opportunity.progressAmount.toString());
                          const progressPercentage = (progressAmount / totalAmount) * 100;
                          
                          return (
                            <div key={opportunity.id} className="border rounded-lg p-4">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-lg">{opportunity.title}</h3>
                                  <p className="text-sm text-gray-600 mb-1">
                                    {opportunity.term} months at {opportunity.interestRate}% interest
                                  </p>
                                </div>
                                <div>
                                  <div className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                    opportunity.status === 'active' 
                                      ? 'bg-blue-100 text-blue-800' 
                                      : opportunity.status === 'funded'
                                      ? 'bg-green-100 text-green-800'
                                      : 'bg-gray-100 text-gray-800'
                                  }`}>
                                    {opportunity.status === 'active' 
                                      ? 'Active' 
                                      : opportunity.status === 'funded' 
                                      ? 'Fully Funded'
                                      : 'Closed'}
                                  </div>
                                </div>
                              </div>
                              
                              <div className="mb-2">
                                <div className="flex justify-between text-sm mb-1">
                                  <span className="text-gray-600">Funding Progress</span>
                                  <span className="font-medium">
                                    ${progressAmount.toFixed(2)} of ${totalAmount.toFixed(2)}
                                  </span>
                                </div>
                                <div className="w-full bg-gray-200 rounded-full h-2">
                                  <div 
                                    className="bg-primary h-2 rounded-full" 
                                    style={{ width: `${Math.min(progressPercentage, 100)}%` }}
                                  ></div>
                                </div>
                                <div className="flex justify-between text-xs text-gray-500 mt-1">
                                  <span>{progressPercentage.toFixed(0)}% funded</span>
                                  <span>
                                    {opportunity.deadline 
                                      ? `Deadline: ${new Date(opportunity.deadline).toLocaleDateString()}`
                                      : ''}
                                  </span>
                                </div>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Building2 className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-1">No opportunities yet</h3>
                        <p className="text-gray-600 mb-4">
                          Create your first funding opportunity to start attracting lenders.
                        </p>
                        <Button onClick={() => setActiveTab("create-opportunity")}>
                          Create Opportunity
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
                
                {/* Lender Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Lender Activity</CardTitle>
                    <CardDescription>
                      See the latest investments in your business
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    {opportunities?.length ? (
                      <div className="space-y-4">
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Alex T.</span> funded 
                              <span className="font-medium text-gray-900"> $1,500</span> to your business
                            </p>
                            <p className="text-xs text-gray-500 mt-1">2 days ago</p>
                          </div>
                        </div>
                        
                        <div className="flex items-start">
                          <div className="flex-shrink-0 mr-4">
                            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
                              <Users className="h-5 w-5 text-gray-600" />
                            </div>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">
                              <span className="font-medium text-gray-900">Jamie L.</span> funded 
                              <span className="font-medium text-gray-900"> $750</span> to your business
                            </p>
                            <p className="text-xs text-gray-500 mt-1">1 week ago</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-6">
                        <p className="text-gray-600">
                          No lender activity yet. Create your first funding opportunity to attract lenders.
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="create-opportunity">
                <Card>
                  <CardHeader>
                    <CardTitle>Create Funding Opportunity</CardTitle>
                    <CardDescription>
                      Tell lenders about your funding needs and how the capital will be used.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...loanOpportunityForm}>
                      <form onSubmit={loanOpportunityForm.handleSubmit(onSubmitLoanOpportunity)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={loanOpportunityForm.control}
                            name="title"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Opportunity Title</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. Expansion Funding" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="amount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Funding Amount ($)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 10000" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="term"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Term (Months)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 12" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="interestRate"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Interest Rate (%)</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 7.5" step="0.1" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="riskLevel"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Risk Level</FormLabel>
                                <Select 
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select risk level" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="low">Low</SelectItem>
                                    <SelectItem value="medium">Medium</SelectItem>
                                    <SelectItem value="high">High</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="deadline"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Funding Deadline</FormLabel>
                                <FormControl>
                                  <Input type="date" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Opportunity Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Describe your business and this funding opportunity in detail" 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={loanOpportunityForm.control}
                            name="purpose"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Purpose of Funding</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Explain how you plan to use the funds" 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <div className="bg-yellow-50 border border-yellow-200 rounded-md p-4 flex items-start gap-3">
                          <ShieldCheck className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
                          <div>
                            <h4 className="font-semibold text-yellow-800 mb-1">About Interest Rates</h4>
                            <p className="text-sm text-yellow-700">
                              Setting a competitive interest rate is important. The average rate on our platform is 6-8%. 
                              Higher risk opportunities typically offer higher interest rates to attract lenders.
                            </p>
                          </div>
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto"
                          disabled={loanOpportunityMutation.isPending}
                        >
                          {loanOpportunityMutation.isPending ? "Creating..." : "Create Opportunity"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="profile">
                <Card>
                  <CardHeader>
                    <CardTitle>Business Profile</CardTitle>
                    <CardDescription>
                      Update your business information for potential lenders
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Form {...businessForm}>
                      <form onSubmit={businessForm.handleSubmit(onSubmitBusiness)} className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <FormField
                            control={businessForm.control}
                            name="name"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Business Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Enter your business name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="industry"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Industry</FormLabel>
                                <Select 
                                  onValueChange={field.onChange}
                                  defaultValue={field.value}
                                >
                                  <FormControl>
                                    <SelectTrigger>
                                      <SelectValue placeholder="Select your industry" />
                                    </SelectTrigger>
                                  </FormControl>
                                  <SelectContent>
                                    <SelectItem value="retail">Retail</SelectItem>
                                    <SelectItem value="food">Food & Beverage</SelectItem>
                                    <SelectItem value="health">Health & Fitness</SelectItem>
                                    <SelectItem value="technology">Technology</SelectItem>
                                    <SelectItem value="manufacturing">Manufacturing</SelectItem>
                                    <SelectItem value="services">Professional Services</SelectItem>
                                    <SelectItem value="education">Education</SelectItem>
                                    <SelectItem value="other">Other</SelectItem>
                                  </SelectContent>
                                </Select>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="location"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Location</FormLabel>
                                <FormControl>
                                  <Input placeholder="City, State" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="yearFounded"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Year Founded</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="YYYY" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="employeeCount"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Number of Employees</FormLabel>
                                <FormControl>
                                  <Input type="number" placeholder="e.g. 5" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="ownerName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Owner Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Your full name" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="ownerRole"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Owner Title/Role</FormLabel>
                                <FormControl>
                                  <Input placeholder="e.g. CEO, Owner, Founder" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          
                          <FormField
                            control={businessForm.control}
                            name="description"
                            render={({ field }) => (
                              <FormItem className="md:col-span-2">
                                <FormLabel>Business Description</FormLabel>
                                <FormControl>
                                  <Textarea 
                                    placeholder="Tell potential lenders about your business, products/services, customers, and what makes you unique." 
                                    className="min-h-[120px]"
                                    {...field} 
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        
                        <Button 
                          type="submit" 
                          className="w-full md:w-auto"
                          disabled={businessMutation.isPending}
                        >
                          {businessMutation.isPending ? "Saving..." : "Save Changes"}
                        </Button>
                      </form>
                    </Form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
}
