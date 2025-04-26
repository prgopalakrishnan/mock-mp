import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { 
  Building2, 
  LineChart, 
  Briefcase,
  Clock,
  DollarSign,
  ArrowRight,
  CheckCircle
} from "lucide-react";

export default function ForBusinessesPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary/90 to-blue-700 text-white py-20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                Grow Your Business with Community Funding
              </h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Access growth capital directly from everyday lenders who want to support local businesses like yours.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Link href="/auth">
                  <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                    Apply for Funding
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

        {/* Benefits Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Choose Mainpeer</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get the capital you need to grow without the typical constraints of traditional lending
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fast Funding Process</h3>
                <p className="text-gray-600">
                  Create your business profile and funding opportunity in minutes. Receive capital within days of reaching your funding goal.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <DollarSign className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Fair & Transparent Terms</h3>
                <p className="text-gray-600">
                  Simple fixed interest rates with straightforward monthly repayments. No hidden fees or complicated covenants.
                </p>
              </div>
              
              <div className="bg-gray-50 p-8 rounded-lg text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-2">Community Support</h3>
                <p className="text-gray-600">
                  Turn your customers and community into investors who are personally invested in your success.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* How It Works Section */}
        <section id="how-it-works" className="py-16 bg-gray-50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">How Mainpeer Works for Businesses</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our straightforward process gets you the capital you need with minimal hassle
              </p>
            </div>
            
            <div className="max-w-4xl mx-auto">
              <div className="relative">
                {/* Timeline line */}
                <div className="absolute left-[29px] top-0 h-full w-0.5 bg-gray-200"></div>
                
                {/* Step 1 */}
                <div className="relative flex gap-6 mb-12">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    1
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">Create Your Business Profile</h3>
                    <p className="text-gray-600 mb-4">
                      Sign up and create a detailed business profile including your story, team, financial information, and business goals.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        The more complete your profile, the more trust you'll build with potential lenders.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 2 */}
                <div className="relative flex gap-6 mb-12">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    2
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">Create a Funding Opportunity</h3>
                    <p className="text-gray-600 mb-4">
                      Specify how much funding you need, what it's for, the loan term, and the interest rate you're willing to pay.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        We'll help you set competitive terms that work for both you and your lenders.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 3 */}
                <div className="relative flex gap-6 mb-12">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    3
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">Get Funded</h3>
                    <p className="text-gray-600 mb-4">
                      Everyday lenders browse our marketplace and invest in your opportunity. Once you reach your funding goal, the money is transferred to your account.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        Share your opportunity with your customers and community to accelerate funding.
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Step 4 */}
                <div className="relative flex gap-6">
                  <div className="flex-shrink-0 h-14 w-14 rounded-full bg-primary flex items-center justify-center text-white font-bold text-xl z-10">
                    4
                  </div>
                  <div className="pt-1">
                    <h3 className="text-xl font-bold mb-2">Grow and Repay</h3>
                    <p className="text-gray-600 mb-4">
                      Use the capital to grow your business while making simple monthly repayments over the agreed term.
                    </p>
                    <div className="bg-white p-4 rounded-lg border border-gray-200">
                      <p className="text-sm text-gray-500">
                        Building a strong repayment history makes it easier to secure funding in the future.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Eligible Businesses Section */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Who Can Apply?</h2>
                <p className="text-gray-600 mb-6">
                  We focus on established small businesses that need growth capital. Ideal businesses for Mainpeer funding:
                </p>
                
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">At least 1 year in operation</h3>
                      <p className="text-gray-600">With demonstrated revenue and customer base</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Strong community connection</h3>
                      <p className="text-gray-600">Businesses with loyal customers who might become lenders</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Clear growth opportunity</h3>
                      <p className="text-gray-600">Specific plans for how additional capital will grow your business</p>
                    </div>
                  </div>
                  
                  <div className="flex gap-3">
                    <CheckCircle className="h-6 w-6 text-green-500 flex-shrink-0" />
                    <div>
                      <h3 className="font-bold">Funding needs between $5,000-$50,000</h3>
                      <p className="text-gray-600">With loan terms typically between 6-36 months</p>
                    </div>
                  </div>
                </div>
                
                <div className="mt-8">
                  <Link href="/auth">
                    <Button size="lg">Apply Now</Button>
                  </Link>
                </div>
              </div>
              
              <div className="space-y-6">
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="font-bold text-lg mb-2">Retail Business</h3>
                  <p className="text-gray-600 mb-3">
                    "We used Mainpeer to fund $20,000 in new inventory for our boutique. Many of our customers became lenders and now feel even more connected to our shop."
                  </p>
                  <p className="font-medium">- Sarah, Boutique Owner</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="font-bold text-lg mb-2">Food & Beverage</h3>
                  <p className="text-gray-600 mb-3">
                    "Expanding our kitchen seemed impossible until we found Mainpeer. We raised $35,000 from 42 lenders, many of whom were regular customers."
                  </p>
                  <p className="font-medium">- Miguel, Restaurant Owner</p>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border-l-4 border-primary">
                  <h3 className="font-bold text-lg mb-2">Service Business</h3>
                  <p className="text-gray-600 mb-3">
                    "As a local salon, we used Mainpeer to finance our expansion to a larger location. The process was fast and our clients loved being part of our growth."
                  </p>
                  <p className="font-medium">- Jade, Salon Owner</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-16 bg-primary text-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to grow your business?</h2>
            <p className="text-xl mb-8 opacity-90 max-w-3xl mx-auto">
              Get the funding you need backed by the community that believes in you.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/auth">
                <Button 
                  size="lg" 
                  className="bg-white text-primary hover:bg-gray-100"
                >
                  Apply for Funding
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