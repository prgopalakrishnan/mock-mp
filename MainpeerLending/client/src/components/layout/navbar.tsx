import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useAuth } from "@/hooks/use-auth";
import { Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

const Navbar = () => {
  const [, setLocation] = useLocation();
  // Use try-catch to safely use useAuth hook
  let user = null;
  let logoutMutation = { mutateAsync: () => Promise.resolve() };
  
  try {
    const auth = useAuth();
    user = auth.user;
    logoutMutation = auth.logoutMutation;
  } catch (error) {
    console.log("Auth provider not available");
  }
  
  const handleLogout = async () => {
    await logoutMutation.mutateAsync();
    setLocation("/");
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/">
            <a className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Ticket className="text-white h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">Mainpeer</span>
            </a>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link href="/opportunities">
              <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                Browse Opportunities
              </a>
            </Link>
            <Link href="/for-businesses">
              <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                For Businesses
              </a>
            </Link>
            <Link href="/for-lenders">
              <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                For Lenders
              </a>
            </Link>
            <Link href="/learn">
              <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                Learn
              </a>
            </Link>
            <Link href="/community">
              <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                Community
              </a>
            </Link>
          </nav>

          {/* Desktop Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <Button
                  variant="ghost"
                  onClick={() => {
                    if (user.userType === "lender") {
                      setLocation("/lender-dashboard");
                    } else {
                      setLocation("/business-dashboard");
                    }
                  }}
                >
                  Dashboard
                </Button>
                <Button variant="destructive" onClick={handleLogout}>
                  Log out
                </Button>
              </>
            ) : (
              <>
                <Link href="/auth">
                  <a className="text-gray-700 hover:text-primary px-3 py-2 font-medium text-sm rounded-md">
                    Log in
                  </a>
                </Link>
                <Link href="/auth">
                  <Button variant="default">Sign up</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden p-2">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[80%] sm:w-[350px]">
              <div className="flex flex-col h-full py-6">
                <div className="px-4 pb-6 space-y-4 border-b border-gray-200">
                  <Link href="/opportunities">
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                      Browse Opportunities
                    </a>
                  </Link>
                  <Link href="/for-businesses">
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                      For Businesses
                    </a>
                  </Link>
                  <Link href="/for-lenders">
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                      For Lenders
                    </a>
                  </Link>
                  <Link href="/learn">
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                      Learn
                    </a>
                  </Link>
                  <Link href="/community">
                    <a className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100">
                      Community
                    </a>
                  </Link>
                </div>
                <div className="px-4 pt-6 space-y-4">
                  {user ? (
                    <>
                      <Button
                        className="w-full"
                        onClick={() => {
                          if (user.userType === "lender") {
                            setLocation("/lender-dashboard");
                          } else {
                            setLocation("/business-dashboard");
                          }
                        }}
                      >
                        Dashboard
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={handleLogout}
                      >
                        Log out
                      </Button>
                    </>
                  ) : (
                    <>
                      <Link href="/auth">
                        <Button className="w-full">Sign up</Button>
                      </Link>
                      <Link href="/auth">
                        <Button variant="outline" className="w-full">Log in</Button>
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
