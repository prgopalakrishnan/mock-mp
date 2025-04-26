import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CommunityActivity as CommunityActivityType } from "@shared/schema";
import { 
  User, 
  CheckCircle, 
  MessageCircle, 
  Calendar, 
  Briefcase,
  ChevronRight,
  Heart
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

export default function CommunityPage() {
  // Fetch community activities
  const { data: activities, isLoading: activitiesLoading } = useQuery({
    queryKey: ["/api/community-activities"],
  });
  
  // Format timestamp
  const formatTime = (timestamp: Date) => {
    const now = new Date();
    const diff = now.getTime() - new Date(timestamp).getTime();
    
    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    
    if (days > 0) {
      return days === 1 ? "Yesterday" : `${days} days ago`;
    } else if (hours > 0) {
      return `${hours} ${hours === 1 ? 'hour' : 'hours'} ago`;
    } else if (minutes > 0) {
      return `${minutes} ${minutes === 1 ? 'minute' : 'minutes'} ago`;
    } else {
      return "Just now";
    }
  };
  
  // Mock events data
  const events = [
    {
      id: 1,
      title: "Virtual Pitch Night",
      description: "Join us for an evening of business pitches from Mainpeer loan applicants. Ask questions and learn about their growth plans.",
      date: "May 15, 2023",
      time: "7:00 PM EST",
      type: "virtual",
      image: "https://images.unsplash.com/photo-1591115765373-5207764f72e7?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 2,
      title: "Local Business Fair",
      description: "Meet successful businesses funded through Mainpeer and learn about their growth journeys. Network with lenders and entrepreneurs.",
      date: "June 3, 2023",
      time: "10:00 AM - 4:00 PM",
      type: "in-person",
      location: "Central Park Event Space, Portland",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    },
    {
      id: 3,
      title: "Investor Education Webinar",
      description: "Learn advanced strategies for evaluating business opportunities and building a diversified lending portfolio.",
      date: "May 22, 2023",
      time: "12:00 PM EST",
      type: "virtual",
      image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80"
    }
  ];
  
  // Mock testimonials data
  const testimonials = [
    {
      id: 1,
      quote: "Mainpeer has transformed how I think about investing. I've funded 12 local businesses and earned consistent returns while seeing the real impact in my community.",
      name: "Jennifer T.",
      role: "Lender",
      avatar: "JT"
    },
    {
      id: 2,
      quote: "The funding we received helped us expand our bakery to a second location. What made it special was knowing that many of our customers were also our lenders.",
      name: "Marcus W.",
      role: "Business Owner",
      avatar: "MW"
    },
    {
      id: 3,
      quote: "I never thought I could be an investor until I found Mainpeer. Starting with just $50 per business, I've built a portfolio of 15 investments that's returning 7.2% annually.",
      name: "Sarah L.",
      role: "Lender",
      avatar: "SL"
    },
    {
      id: 4,
      quote: "The process was seamless from application to funding. We raised $35,000 in just 9 days and used it to purchase new equipment that increased our production capacity by 40%.",
      name: "David R.",
      role: "Business Owner",
      avatar: "DR"
    }
  ];
  
  // Mock forum posts data
  const forumPosts = [
    {
      id: 1,
      title: "Tips for evaluating restaurant opportunities?",
      author: "Morgan K.",
      avatar: "MK",
      replies: 12,
      views: 87,
      lastActivity: "2 hours ago"
    },
    {
      id: 2,
      title: "Successfully funded! Here's what worked for our cafe",
      author: "Elena J.",
      avatar: "EJ",
      replies: 24,
      views: 156,
      lastActivity: "6 hours ago"
    },
    {
      id: 3,
      title: "Question about repayment schedules",
      author: "Thomas W.",
      avatar: "TW",
      replies: 8,
      views: 42,
      lastActivity: "1 day ago"
    },
    {
      id: 4,
      title: "Annual returns analysis - my first year as a lender",
      author: "Rachel M.",
      avatar: "RM",
      replies: 31,
      views: 208,
      lastActivity: "2 days ago"
    },
    {
      id: 5,
      title: "How we used our funding to pivot during the pandemic",
      author: "Carlos B.",
      avatar: "CB",
      replies: 19,
      views: 124,
      lastActivity: "3 days ago"
    }
  ];
  
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow bg-gray-50">
        {/* Hero Section */}
        <section className="bg-primary text-white py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Join the Mainpeer Community
              </h1>
              <p className="text-xl opacity-90 mb-6">
                Connect with other lenders and businesses, share insights, and participate in events that strengthen our lending community.
              </p>
              <div className="flex flex-col sm:flex-row justify-center gap-4">
                <Button size="lg" className="bg-white text-primary hover:bg-gray-100">
                  Join Community Forum
                </Button>
                <Button 
                  size="lg" 
                  variant="outline" 
                  className="text-white border-white hover:bg-white/10"
                >
                  Browse Upcoming Events
                </Button>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Activity Feed */}
        <section className="py-12">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left sidebar */}
              <div className="lg:col-span-1">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Community Feed</CardTitle>
                    <CardDescription>
                      Recent activity from lenders and businesses
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {activitiesLoading ? (
                      Array(4).fill(0).map((_, i) => (
                        <div key={i} className="flex items-start space-x-4">
                          <div className="h-10 w-10 rounded-full bg-gray-200 flex-shrink-0" />
                          <div className="space-y-2 flex-grow">
                            <div className="h-4 bg-gray-200 rounded w-3/4" />
                            <div className="h-3 bg-gray-200 rounded w-1/2" />
                          </div>
                        </div>
                      ))
                    ) : activities && activities.length > 0 ? (
                      activities.map((activity: CommunityActivityType) => (
                        <div key={activity.id} className="flex">
                          <div className="flex-shrink-0 mr-4">
                            <div className={`h-10 w-10 rounded-full ${
                              activity.activityType === "funded_complete" 
                                ? "bg-green-500 text-white" 
                                : "bg-gray-200 text-gray-600"
                            } flex items-center justify-center`}>
                              {activity.activityType === "funded_complete" ? (
                                <CheckCircle className="h-5 w-5" />
                              ) : (
                                <User className="h-5 w-5" />
                              )}
                            </div>
                          </div>
                          <div>
                            <div className="text-sm text-gray-600">
                              {activity.activityType === "funded" && (
                                <><span className="font-medium text-gray-900">User {activity.userId}</span> funded <span className="font-medium text-gray-900">${activity.amount}</span> to <span className="font-medium text-gray-900">Business {activity.opportunityId}</span></>
                              )}
                              {activity.activityType === "funded_complete" && (
                                <><span className="font-medium text-gray-900">Business {activity.opportunityId}</span> reached <span className="font-medium text-gray-900">100% funding</span> of their <span className="font-medium text-gray-900">${activity.amount}</span> goal!</>
                              )}
                              {activity.activityType === "repaid" && (
                                <><span className="font-medium text-gray-900">Business {activity.opportunityId}</span> repaid <span className="font-medium text-gray-900">${activity.amount}</span> to lenders</>
                              )}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">{formatTime(activity.createdAt)}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center text-gray-500 py-4">
                        <p>No community activity to display yet.</p>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Activity
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Community Forum</CardTitle>
                    <CardDescription>
                      Popular discussions from our forum
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {forumPosts.map((post) => (
                      <div key={post.id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                        <div className="flex justify-between mb-1">
                          <h3 className="font-medium text-gray-900">{post.title}</h3>
                          <ChevronRight className="h-5 w-5 text-gray-400" />
                        </div>
                        <div className="flex items-center text-sm text-gray-500">
                          <Avatar className="h-5 w-5 mr-2">
                            <AvatarFallback>{post.avatar}</AvatarFallback>
                          </Avatar>
                          <span>{post.author}</span>
                          <span className="mx-2">•</span>
                          <MessageCircle className="h-3 w-3 mr-1" />
                          <span>{post.replies}</span>
                          <span className="mx-2">•</span>
                          <span>{post.lastActivity}</span>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      Visit Forum
                    </Button>
                  </CardFooter>
                </Card>
              </div>
              
              {/* Main content */}
              <div className="lg:col-span-2">
                <Card className="mb-8">
                  <CardHeader>
                    <CardTitle>Upcoming Events</CardTitle>
                    <CardDescription>
                      Join these events to connect with the Mainpeer community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6">
                      {events.map((event) => (
                        <div key={event.id} className="flex flex-col md:flex-row gap-4 border-b border-gray-200 pb-6 last:border-0 last:pb-0">
                          <div className="w-full md:w-1/3 h-40 bg-gray-200 rounded-lg overflow-hidden">
                            <img 
                              src={event.image} 
                              alt={event.title} 
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="w-full md:w-2/3">
                            <div className="flex items-center mb-2">
                              <span className={`text-xs px-2 py-1 rounded-full ${
                                event.type === "virtual" 
                                  ? "bg-blue-100 text-blue-800" 
                                  : "bg-green-100 text-green-800"
                              }`}>
                                {event.type === "virtual" ? "Virtual Event" : "In-Person Event"}
                              </span>
                            </div>
                            <h3 className="text-lg font-bold text-gray-900 mb-1">{event.title}</h3>
                            <p className="text-sm text-gray-600 mb-3">{event.description}</p>
                            <div className="flex flex-wrap items-center text-sm text-gray-500 gap-x-4 gap-y-2">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 mr-1" />
                                <span>{event.time}</span>
                              </div>
                              {event.location && (
                                <div className="flex items-center">
                                  <MapPin className="h-4 w-4 mr-1" />
                                  <span>{event.location}</span>
                                </div>
                              )}
                            </div>
                            <div className="mt-4">
                              <Button variant="outline" size="sm">RSVP Now</Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button variant="outline" className="w-full">
                      View All Events
                    </Button>
                  </CardFooter>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Community Testimonials</CardTitle>
                    <CardDescription>
                      Hear from lenders and businesses in our community
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className="bg-gray-50 p-5 rounded-lg">
                          <div className="flex gap-2 mb-4">
                            {[1, 2, 3, 4, 5].map((star) => (
                              <Heart 
                                key={star}
                                className="h-4 w-4 fill-primary text-primary" 
                              />
                            ))}
                          </div>
                          <p className="text-gray-600 mb-4 italic">"{testimonial.quote}"</p>
                          <div className="flex items-center">
                            <Avatar className="h-10 w-10 mr-3">
                              <AvatarFallback>{testimonial.avatar}</AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-medium text-gray-900">{testimonial.name}</p>
                              <p className="text-sm text-gray-500">{testimonial.role}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
        
        {/* Community Stats Section */}
        <section className="py-12 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Our Community Impact</h2>
              <p className="text-gray-600">Together, we're building stronger local economies</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">2,500+</div>
                <p className="text-gray-600">Community members</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">$1.2M+</div>
                <p className="text-gray-600">Total funded</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">142</div>
                <p className="text-gray-600">Businesses supported</p>
              </div>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">12</div>
                <p className="text-gray-600">Communities served</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Newsletter Section */}
        <section className="py-16 bg-gray-100">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">Join Our Newsletter</h2>
              <p className="text-gray-600 mb-6">
                Stay updated with community events, success stories, and new funding opportunities.
              </p>
              <div className="flex gap-2">
                <Input 
                  type="email" 
                  placeholder="Enter your email address" 
                  className="bg-white"
                />
                <Button>Subscribe</Button>
              </div>
              <p className="text-xs text-gray-500 mt-4">
                We respect your privacy. Unsubscribe at any time.
              </p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
}

// Missing MapPin and Clock component
function MapPin({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function Clock({ className }: { className?: string }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}