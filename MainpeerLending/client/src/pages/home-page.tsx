import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { AreaChart, BarChart2, Building, Users } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/90 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Community-Powered Business Lending
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Connecting everyday lenders with Main Street businesses seeking short-term growth capital.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Start Lending
                  </Button>
                </Link>
                <Link href="/auth">
                  <Button 
                    size="lg" 
                    variant="outline" 
                    className="text-white border-white hover:bg-white/10"
                  >
                    Get Funded
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Mainpeer Works</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A simple, transparent process connecting lenders with businesses in need of capital
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Building className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Businesses Apply</h3>
                <p className="text-gray-600">
                  Local businesses create profiles and apply for short-term growth funding, providing their business details and funding needs.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Lenders Choose</h3>
                <p className="text-gray-600">
                  Everyday lenders browse opportunities, review business profiles, and choose which businesses to support with investments as small as $50.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AreaChart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Everyone Benefits</h3>
                <p className="text-gray-600">
                  Businesses get the capital they need to grow, while lenders earn monthly returns and support their local economy.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Business Benefits Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">For Businesses</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Simple Application</h3>
                      <p className="text-gray-600">Create your business profile and request funding in minutes</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Fast Funding</h3>
                      <p className="text-gray-600">Receive capital quickly once your funding target is reached</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Community Support</h3>
                      <p className="text-gray-600">Build relationships with customers who become investors</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Transparent Terms</h3>
                      <p className="text-gray-600">Fair interest rates with simple monthly repayments</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/auth">
                    <Button size="lg">Apply for Funding</Button>
                  </Link>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1556740738-b6a63e27c4df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Local business owner" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <BarChart2 className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-xl">Business Growth</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "Mainpeer helped us quickly secure the capital we needed to expand our kitchen. 
                    The process was simple and we loved having our customers invest in our growth."
                  </p>
                  <div className="font-medium">
                    Sarah Johnson, Downtown Bakery
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lender Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-white rounded-lg shadow-lg overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Person investing" 
                  className="w-full h-64 object-cover"
                />
                <div className="p-8">
                  <div className="flex items-center mb-4">
                    <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <AreaChart className="h-5 w-5 text-gray-600" />
                    </div>
                    <h3 className="font-bold text-xl">Impactful Returns</h3>
                  </div>
                  <p className="text-gray-600 mb-4">
                    "I've been investing through Mainpeer for 6 months and love seeing my money help local 
                    businesses while earning better returns than my savings account."
                  </p>
                  <div className="font-medium">
                    Morgan Taylor, Lender
                  </div>
                </div>
              </div>
              
              <div className="order-1 md:order-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">For Lenders</h2>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">1</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Browse Opportunities</h3>
                      <p className="text-gray-600">Explore verified local businesses seeking growth capital</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">2</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Invest Any Amount</h3>
                      <p className="text-gray-600">Start with as little as $50 and build a diversified portfolio</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">3</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Earn Monthly Returns</h3>
                      <p className="text-gray-600">Receive principal and interest payments directly to your account</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <div className="flex-shrink-0 w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-white font-bold">4</span>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-1">Create Local Impact</h3>
                      <p className="text-gray-600">Support businesses that make your community vibrant</p>
                    </div>
                  </div>
                </div>
                <div className="mt-8">
                  <Link href="/auth">
                    <Button size="lg">Start Lending</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Community Impact Section */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Community Impact</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Together, we're building stronger local economies and communities
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold text-primary mb-2">$1.2M+</div>
                <p className="text-gray-600">Funded to date</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">142</div>
                <p className="text-gray-600">Businesses supported</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">6.8%</div>
                <p className="text-gray-600">Average return rate</p>
              </div>
              <div>
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <p className="text-gray-600">Active lenders</p>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to get started?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Join our community of lenders and businesses creating value together.
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
              <Link href="/learn">
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                >
                  Learn More
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
