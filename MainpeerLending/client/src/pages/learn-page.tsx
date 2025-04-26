import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { 
  BookOpen,
  Video,
  FileText,
  Lightbulb,
  GraduationCap,
  ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function LearnPage() {
  // Fetch educational resources
  const { data: resources, isLoading } = useQuery({
    queryKey: ["/api/educational-resources"],
  });
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Learn About Community Lending
              </h1>
              <p className="text-xl opacity-90 mb-6">
                Educational resources to help you understand peer-to-peer lending, investment strategies, and business financing.
              </p>
            </div>
          </div>
        </section>
        
        {/* Tabbed Content Section */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="for-lenders" className="max-w-4xl mx-auto">
              <div className="flex justify-center mb-8">
                <TabsList>
                  <TabsTrigger value="for-lenders">For Lenders</TabsTrigger>
                  <TabsTrigger value="for-businesses">For Businesses</TabsTrigger>
                  <TabsTrigger value="getting-started">Getting Started</TabsTrigger>
                </TabsList>
              </div>
              
              {/* For Lenders Content */}
              <TabsContent value="for-lenders">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Lending Fundamentals</h2>
                    <p className="text-gray-600 mb-6">
                      Learn how to evaluate opportunities, manage risk, and build a diversified lending portfolio.
                    </p>
                    <div className="space-y-4">
                      <ResourceCard 
                        title="How to Assess Loan Opportunities"
                        description="Key factors to consider when evaluating a business's loan application."
                        type="article"
                        time="8 min read"
                      />
                      <ResourceCard 
                        title="Building a Diversified Lending Portfolio"
                        description="Strategies for spreading risk across multiple businesses and industries."
                        type="video"
                        time="12 min watch"
                      />
                      <ResourceCard 
                        title="Understanding Financial Statements"
                        description="A beginner's guide to reading and interpreting business financials."
                        type="guide"
                        time="15 min read"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Advanced Topics</h2>
                    <p className="text-gray-600 mb-6">
                      Take your lending knowledge to the next level with these in-depth resources.
                    </p>
                    <div className="space-y-4">
                      <ResourceCard 
                        title="Tax Implications of Peer Lending"
                        description="What you need to know about reporting lending income on your taxes."
                        type="article"
                        time="10 min read"
                      />
                      <ResourceCard 
                        title="Navigating Default Scenarios"
                        description="What happens if a business can't repay, and how Mainpeer protects lenders."
                        type="guide"
                        time="7 min read"
                      />
                      <ResourceCard 
                        title="Calculating True ROI on Loans"
                        description="Beyond the stated interest rate: understanding fees and the time value of money."
                        type="video"
                        time="9 min watch"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>What returns can I expect as a lender?</AccordionTrigger>
                      <AccordionContent>
                        Most loan opportunities on Mainpeer offer annual interest rates between 5-9%. Actual returns may vary based on the specific businesses you choose to fund and any defaults that may occur. We recommend diversifying across multiple businesses to balance your risk and return.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What happens if a business can't repay?</AccordionTrigger>
                      <AccordionContent>
                        While rare, defaults can occur. If a business misses a payment, our team will work with them to get back on track. If they ultimately cannot repay, we'll attempt to recover funds through our collections process. To minimize impact on your portfolio, we recommend investing small amounts across many businesses.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How much should I invest in each opportunity?</AccordionTrigger>
                      <AccordionContent>
                        We recommend starting with small amounts ($50-$200) per business, especially if you're new to peer lending. This allows you to diversify across many opportunities and reduce your risk. As you gain experience, you can adjust your strategy based on your risk tolerance and investment goals.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>Can I sell my loans if I need liquidity?</AccordionTrigger>
                      <AccordionContent>
                        Currently, Mainpeer doesn't offer a secondary market for loans. When you invest in a business, you should be prepared to hold that investment until the loan term ends. Monthly repayments provide some ongoing liquidity as you receive portions of your principal back each month.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How does Mainpeer vet businesses?</AccordionTrigger>
                      <AccordionContent>
                        We review each business's financial statements, credit history, business plan, and repayment ability. We only list opportunities from businesses that have been operating for at least one year and can demonstrate consistent revenue. We also conduct identity verification and background checks on business owners.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              {/* For Businesses Content */}
              <TabsContent value="for-businesses">
                <div className="grid md:grid-cols-2 gap-8 mb-10">
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Funding Basics</h2>
                    <p className="text-gray-600 mb-6">
                      Learn how to prepare your business for community funding and create successful campaigns.
                    </p>
                    <div className="space-y-4">
                      <ResourceCard 
                        title="Is Peer Lending Right for Your Business?"
                        description="How to determine if community funding aligns with your growth goals."
                        type="article"
                        time="6 min read"
                      />
                      <ResourceCard 
                        title="Creating an Effective Business Profile"
                        description="Tips for showcasing your business to potential lenders."
                        type="guide"
                        time="10 min read"
                      />
                      <ResourceCard 
                        title="How to Determine Your Funding Amount"
                        description="Calculating your capital needs for maximum growth impact."
                        type="video"
                        time="8 min watch"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <h2 className="text-2xl font-bold mb-4">Success Strategies</h2>
                    <p className="text-gray-600 mb-6">
                      Maximize your chances of funding success with these proven approaches.
                    </p>
                    <div className="space-y-4">
                      <ResourceCard 
                        title="Setting the Right Interest Rate"
                        description="Balancing attractiveness to lenders with affordability for your business."
                        type="article"
                        time="7 min read"
                      />
                      <ResourceCard 
                        title="Leveraging Your Customer Base as Lenders"
                        description="How to engage your existing community to fund your growth."
                        type="guide"
                        time="9 min read"
                      />
                      <ResourceCard 
                        title="Business Success Stories"
                        description="Case studies of businesses that thrived after Mainpeer funding."
                        type="case_study"
                        time="12 min read"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold mb-6">Frequently Asked Questions</h2>
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                      <AccordionTrigger>How quickly can I get funded?</AccordionTrigger>
                      <AccordionContent>
                        Once your funding opportunity is published on our platform, the funding timeline typically ranges from 1-4 weeks depending on the amount requested and lender interest. Once fully funded, we'll transfer the money to your business account within 1-2 business days.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                      <AccordionTrigger>What information do I need to provide about my business?</AccordionTrigger>
                      <AccordionContent>
                        You'll need to create a detailed business profile including your story, team information, business location, industry, years in operation, and what makes your business special. You'll also need to provide financial information including revenue history, profitability, and current debt obligations. This helps lenders make informed decisions.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                      <AccordionTrigger>How do I determine the right interest rate?</AccordionTrigger>
                      <AccordionContent>
                        Interest rates on Mainpeer typically range from 5-9%. The rate you choose should reflect your business's risk profile, how quickly you need funding, and what you can afford to pay. Lower interest rates may take longer to fund but cost less, while higher rates attract lenders more quickly but increase your cost of capital.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-4">
                      <AccordionTrigger>What if I can't make a payment?</AccordionTrigger>
                      <AccordionContent>
                        If you anticipate difficulty making a payment, contact us as soon as possible. We can work with you to modify your repayment schedule or find other solutions. Communication is key - most lenders understand that businesses sometimes face challenges, but they expect transparency and good-faith efforts to resolve issues.
                      </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-5">
                      <AccordionTrigger>How does repayment work?</AccordionTrigger>
                      <AccordionContent>
                        Repayments are made monthly via automatic withdrawals from your business bank account. Each payment includes both principal and interest. You'll have access to a detailed amortization schedule showing exactly how much you'll pay each month and how much goes toward principal versus interest.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              </TabsContent>
              
              {/* Getting Started Content */}
              <TabsContent value="getting-started">
                <div className="bg-white rounded-lg shadow p-8 mb-10">
                  <h2 className="text-2xl font-bold mb-6">Getting Started with Mainpeer</h2>
                  
                  <div className="space-y-8">
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <BookOpen className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">1. Create Your Account</h3>
                        <p className="text-gray-600 mb-4">
                          Sign up as either a lender or a business owner. Complete your profile with accurate information.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Key Steps:</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Provide your basic contact information</li>
                            <li>Verify your email address</li>
                            <li>Complete identity verification</li>
                            <li>Link your bank account for funding/receiving payments</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <GraduationCap className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">2. Explore the Platform</h3>
                        <p className="text-gray-600 mb-4">
                          Familiarize yourself with the platform features, browse opportunities, and review educational resources.
                        </p>
                        <div className="bg-gray-50 p-4 rounded-lg">
                          <h4 className="font-medium mb-2">Recommended Resources:</h4>
                          <ul className="list-disc list-inside text-gray-600 space-y-1">
                            <li>Platform tutorial videos</li>
                            <li>Beginner's guide to peer lending</li>
                            <li>Risk assessment framework</li>
                            <li>Community success stories</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-6">
                      <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white">
                        <Lightbulb className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2">3. Take Action</h3>
                        <p className="text-gray-600 mb-4">
                          Whether lending or seeking funds, take the first step toward financial engagement.
                        </p>
                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">For Lenders:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              <li>Fund your account</li>
                              <li>Browse business opportunities</li>
                              <li>Make your first investment</li>
                              <li>Track your portfolio performance</li>
                            </ul>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <h4 className="font-medium mb-2">For Businesses:</h4>
                            <ul className="list-disc list-inside text-gray-600 space-y-1">
                              <li>Complete your business profile</li>
                              <li>Create your funding opportunity</li>
                              <li>Share with your network</li>
                              <li>Engage with potential lenders</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-8 text-center">
                    <Button size="lg" onClick={() => window.location.href = "/auth"}>
                      Create Your Account Now
                    </Button>
                  </div>
                </div>
                
                <div className="bg-white rounded-lg p-6 shadow">
                  <h2 className="text-xl font-bold mb-6">Platform Walkthrough Videos</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 aspect-video flex items-center justify-center">
                        <Video className="h-12 w-12 text-white opacity-60" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1">Account Setup Guide</h3>
                        <p className="text-sm text-gray-600">3:24 min</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 aspect-video flex items-center justify-center">
                        <Video className="h-12 w-12 text-white opacity-60" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1">Lender Dashboard Tour</h3>
                        <p className="text-sm text-gray-600">4:56 min</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-100 rounded-lg overflow-hidden">
                      <div className="bg-gray-800 aspect-video flex items-center justify-center">
                        <Video className="h-12 w-12 text-white opacity-60" />
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold mb-1">Business Dashboard Tour</h3>
                        <p className="text-sm text-gray-600">5:18 min</p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>
        
        {/* Featured Resources Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold">Popular Resources</h2>
              <p className="text-gray-600">Our most-read articles and guides</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {isLoading ? (
                Array(3).fill(0).map((_, i) => (
                  <div key={i} className="bg-gray-100 rounded-lg h-64 animate-pulse" />
                ))
              ) : resources && resources.length > 0 ? (
                resources.slice(0, 3).map((resource: any) => (
                  <div key={resource.id} className="bg-gray-50 rounded-lg overflow-hidden shadow">
                    <img 
                      src={resource.imageUrl} 
                      alt={resource.title} 
                      className="w-full h-40 object-cover"
                    />
                    <div className="p-4">
                      <span className={`inline-block text-xs px-2 py-1 rounded-full mb-2 ${
                        resource.resourceType === "guide" ? "bg-blue-100 text-blue-800" :
                        resource.resourceType === "video" ? "bg-green-100 text-green-800" :
                        "bg-purple-100 text-purple-800"
                      }`}>
                        {resource.resourceType.charAt(0).toUpperCase() + resource.resourceType.slice(1)}
                      </span>
                      <h3 className="font-bold mb-1">{resource.title}</h3>
                      <p className="text-sm text-gray-600 mb-3">{resource.description}</p>
                      <a 
                        href={resource.link} 
                        className="text-primary hover:text-primary/80 text-sm font-medium flex items-center"
                      >
                        Read more <span className="ml-1">→</span>
                      </a>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-3 text-center">
                  <p className="text-gray-500">No resources available at the moment.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Resource Card Component
function ResourceCard({ 
  title, 
  description, 
  type, 
  time 
}: { 
  title: string; 
  description: string; 
  type: string;
  time: string;
}) {
  const getIcon = () => {
    switch (type) {
      case 'article':
        return <FileText className="h-5 w-5 text-gray-600" />;
      case 'video':
        return <Video className="h-5 w-5 text-gray-600" />;
      case 'guide':
        return <BookOpen className="h-5 w-5 text-gray-600" />;
      case 'case_study':
        return <Lightbulb className="h-5 w-5 text-gray-600" />;
      default:
        return <FileText className="h-5 w-5 text-gray-600" />;
    }
  };
  
  const getTypeName = () => {
    switch (type) {
      case 'article':
        return 'Article';
      case 'video':
        return 'Video';
      case 'guide':
        return 'Guide';
      case 'case_study':
        return 'Case Study';
      default:
        return type.charAt(0).toUpperCase() + type.slice(1);
    }
  };
  
  return (
    <div className="bg-white rounded-lg p-4 shadow border border-gray-200 hover:shadow-md transition">
      <div className="flex items-start gap-3">
        <div className="flex-shrink-0 bg-gray-100 rounded-full p-2">
          {getIcon()}
        </div>
        <div>
          <h3 className="font-bold mb-1">{title}</h3>
          <p className="text-sm text-gray-600 mb-2">{description}</p>
          <div className="flex items-center text-xs text-gray-500">
            <span className="bg-gray-100 px-2 py-0.5 rounded">{getTypeName()}</span>
            <span className="mx-2">•</span>
            <span>{time}</span>
          </div>
        </div>
      </div>
    </div>
  );
}