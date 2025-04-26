import { Link } from "wouter";
import { Ticket, FacebookIcon, TwitterIcon, InstagramIcon, LinkedinIcon } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md bg-primary flex items-center justify-center">
                <Ticket className="text-white h-5 w-5" />
              </div>
              <span className="font-heading font-bold text-xl text-gray-900">Mainpeer</span>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              Empowering everyday people to fund Main Street businesses with short-term growth capital.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <FacebookIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <TwitterIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <InstagramIcon className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-gray-500">
                <LinkedinIcon className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><Link href="/how-it-works"><a className="text-gray-600 hover:text-primary text-sm">How It Works</a></Link></li>
              <li><Link href="/for-businesses"><a className="text-gray-600 hover:text-primary text-sm">For Businesses</a></Link></li>
              <li><Link href="/for-lenders"><a className="text-gray-600 hover:text-primary text-sm">For Lenders</a></Link></li>
              <li><Link href="/success-stories"><a className="text-gray-600 hover:text-primary text-sm">Success Stories</a></Link></li>
              <li><Link href="/blog"><a className="text-gray-600 hover:text-primary text-sm">Blog</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Company</h3>
            <ul className="space-y-2">
              <li><Link href="/about"><a className="text-gray-600 hover:text-primary text-sm">About Us</a></Link></li>
              <li><Link href="/team"><a className="text-gray-600 hover:text-primary text-sm">Our Team</a></Link></li>
              <li><Link href="/careers"><a className="text-gray-600 hover:text-primary text-sm">Careers</a></Link></li>
              <li><Link href="/press"><a className="text-gray-600 hover:text-primary text-sm">Press</a></Link></li>
              <li><Link href="/contact"><a className="text-gray-600 hover:text-primary text-sm">Contact</a></Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-medium text-gray-900 mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/privacy"><a className="text-gray-600 hover:text-primary text-sm">Privacy Policy</a></Link></li>
              <li><Link href="/terms"><a className="text-gray-600 hover:text-primary text-sm">Terms of Service</a></Link></li>
              <li><Link href="/security"><a className="text-gray-600 hover:text-primary text-sm">Security</a></Link></li>
              <li><Link href="/compliance"><a className="text-gray-600 hover:text-primary text-sm">Compliance</a></Link></li>
              <li><Link href="/accessibility"><a className="text-gray-600 hover:text-primary text-sm">Accessibility</a></Link></li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm mb-4 md:mb-0">© {new Date().getFullYear()} Mainpeer, Inc. All rights reserved.</p>
          <div className="flex space-x-6">
            <Link href="/privacy"><a className="text-gray-500 hover:text-gray-600 text-sm">Privacy</a></Link>
            <Link href="/terms"><a className="text-gray-500 hover:text-gray-600 text-sm">Terms</a></Link>
            <Link href="/cookies"><a className="text-gray-500 hover:text-gray-600 text-sm">Cookies</a></Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
