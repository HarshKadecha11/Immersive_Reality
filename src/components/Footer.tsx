import {
  Building2,
  Facebook,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Twitter,
} from "lucide-react";
import { Button } from "./ui/button";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-primary" />
              <span className="text-xl font-bold">EstateVista</span>
            </div>
            <p className="text-gray-400">
              Your trusted partner in finding the perfect property across
              Gujarat.
            </p>
            <div className="flex gap-4">
              <Button variant="ghost" size="icon">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Linkedin className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Buy Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Sell Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Rent Property
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Calculate Mortgage
                </a>
              </li>
            </ul>
          </div>

          {/* Cities */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Popular Cities</h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Ahmedabad
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Surat
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Vadodara
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-400 hover:text-white">
                  Rajkot
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-gray-400">
                <MapPin className="h-5 w-5" />
                <span>123 Business Hub, Ahmedabad, Gujarat</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Phone className="h-5 w-5" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2 text-gray-400">
                <Mail className="h-5 w-5" />
                <span>contact@estatevista.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>© 2024 EstateVista. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
