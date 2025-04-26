import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { 
  LineChart, 
  PiggyBank,
  TrendingUp,
  Building2,
  BarChart4,
  Lightbulb
} from "lucide-react";

export default function ForLendersPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/90 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Invest in Main Street Businesses
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Earn competitive returns while supporting local businesses and strengthening your community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Start Lending
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                  onClick={() => document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })}
                >
                  Learn How It Works
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Investment Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Benefits of Lending</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Discover why everyday investors are choosing Mainpeer for their investment portfolios
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Competitive Returns</h3>
                <p className="text-gray-600">
                  Earn 5-9% annual returns on your investments, outperforming traditional savings accounts and many retail investment options.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building2 className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Impact</h3>
                <p className="text-gray-600">
                  Support local businesses that create jobs, provide valuable services, and make your community vibrant and unique.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <PiggyBank className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Portfolio Diversification</h3>
                <p className="text-gray-600">
                  Add a new asset class to your investment mix that isn't directly correlated with stock market performance.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Lending Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A simple and transparent process to start investing in local businesses
              </p>
            </div>
            
            <div className="grid md:grid-cols-4 gap-6">
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    1
                  </div>
                  <h3 className="font-bold text-lg mt-4 mb-3">Create an Account</h3>
                  <p className="text-gray-600">
                    Sign up as a lender and verify your identity to start browsing investment opportunities.
                  </p>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    2
                  </div>
                  <h3 className="font-bold text-lg mt-4 mb-3">Browse Opportunities</h3>
                  <p className="text-gray-600">
                    Explore vetted business opportunities and review detailed business profiles, terms, and risk assessments.
                  </p>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    3
                  </div>
                  <h3 className="font-bold text-lg mt-4 mb-3">Invest</h3>
                  <p className="text-gray-600">
                    Choose businesses to support and invest as little as $50 per opportunity. Diversify across multiple businesses.
                  </p>
                </div>
                <div className="hidden md:block absolute -right-3 top-1/2 transform -translate-y-1/2 z-10">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 5L16 12L9 19" stroke="#D1D5DB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </div>
              </div>
              
              <div className="relative">
                <div className="bg-white p-6 rounded-lg shadow border border-gray-200 h-full">
                  <div className="absolute -top-4 -left-4 h-12 w-12 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    4
                  </div>
                  <h3 className="font-bold text-lg mt-4 mb-3">Earn Returns</h3>
                  <p className="text-gray-600">
                    Receive monthly principal and interest payments directly to your Mainpeer account. Track performance in your dashboard.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-12 text-center">
              <Link href="/auth">
                <Button size="lg">Start Lending Now</Button>
              </Link>
            </div>
          </div>
        </section>
        
        {/* Lending Strategy Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Smart Lending Strategies</h2>
                <p className="text-gray-600 mb-6">
                  Maximize your returns and minimize risk with these proven lending approaches:
                </p>
                
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Diversify Your Portfolio</h3>
                      <p className="text-gray-600">
                        Spread your investments across multiple businesses and industries to reduce risk. Start with small amounts across many opportunities.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Balance Risk and Return</h3>
                      <p className="text-gray-600">
                        Consider opportunities with different risk levels. Higher interest rates often indicate higher risk, so balance your portfolio accordingly.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Invest in What You Know</h3>
                      <p className="text-gray-600">
                        Focus on businesses and industries you're familiar with to better evaluate the opportunity and risk factors.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Reinvest Repayments</h3>
                      <p className="text-gray-600">
                        As you receive monthly repayments, reinvest them in new opportunities to compound your returns over time.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div>
                <div className="bg-gray-50 rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold mb-4 text-center">Average Returns by Industry</h3>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Food & Beverage</span>
                        <span className="text-sm font-medium text-gray-700">7.2%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '72%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Retail</span>
                        <span className="text-sm font-medium text-gray-700">6.8%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '68%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Health & Wellness</span>
                        <span className="text-sm font-medium text-gray-700">8.1%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '81%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Professional Services</span>
                        <span className="text-sm font-medium text-gray-700">6.5%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between mb-1">
                        <span className="text-sm font-medium text-gray-700">Technology</span>
                        <span className="text-sm font-medium text-gray-700">8.9%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div className="bg-primary h-2 rounded-full" style={{ width: '89%' }}></div>
                      </div>
                    </div>
                  </div>
                  <p className="text-xs text-gray-500 text-center mt-4">
                    Based on historical performance data. Past performance does not guarantee future results.
                  </p>
                </div>
                
                <div className="mt-6 bg-gray-50 rounded-lg p-6 shadow">
                  <h3 className="text-xl font-bold mb-4">Lender Success Stories</h3>
                  
                  <div className="space-y-4">
                    <div className="pb-4 border-b border-gray-200">
                      <p className="italic text-gray-600 mb-2">
                        "I've invested in 15 local businesses through Mainpeer and earned an average 7.3% return while helping my community grow. It's the perfect addition to my investment portfolio."
                      </p>
                      <p className="font-medium">- Mark T., Portland</p>
                    </div>
                    
                    <div>
                      <p className="italic text-gray-600 mb-2">
                        "As a first-time investor, I appreciate how transparent and straightforward the Mainpeer platform is. I started with just $500 spread across a few businesses and have already received my first repayments."
                      </p>
                      <p className="font-medium">- Leila H., Chicago</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Start Investing in Your Community Today</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join thousands of everyday lenders earning returns while making a difference in their communities.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Create Account
                </Button>
              </Link>
              <Link href="/opportunities">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                >
                  Browse Opportunities
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}