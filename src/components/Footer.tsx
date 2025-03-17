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
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative overflow-hidden">
      {/* Glass-like background with gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/90 to-gray-900/95 backdrop-blur-lg z-0"></div>

      {/* Animated particles */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-500/20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, Math.random() * -100],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 5 + Math.random() * 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="container relative mx-auto px-4 py-12 text-white z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-2">
              <Building2 className="h-6 w-6 text-green-500" />
              <span className="text-xl font-bold">EstateVista</span>
            </div>
            <p className="text-gray-300">
              Your trusted partner in finding the perfect property across
              Gujarat.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-500/20"
                >
                  <Facebook className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-500/20"
                >
                  <Twitter className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-500/20"
                >
                  <Instagram className="h-5 w-5" />
                </Button>
              </motion.div>
              <motion.div whileHover={{ y: -5, scale: 1.1 }}>
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:bg-green-500/20"
                >
                  <Linkedin className="h-5 w-5" />
                </Button>
              </motion.div>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { label: "Buy Property", href: "/properties?type=buy" },
                { label: "Sell Property", href: "/properties?type=sell" },
                { label: "Rent Property", href: "/properties?type=rent" },
                {
                  label: "Student Rentals",
                  href: "/properties?priceCategory=budget-rent",
                },
                {
                  label: "Middle Class Properties",
                  href: "/properties?priceCategory=affordable",
                },
                { label: "Calculate Mortgage", href: "/mortgage" },
              ].map((link, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={link.href}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {link.label}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Cities */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Popular Cities
            </h3>
            <ul className="space-y-2">
              {[
                "Ahmedabad",
                "Surat",
                "Vadodara",
                "Rajkot",
                "Gandhinagar",
                "Bhavnagar",
                "Jamnagar",
                "Junagadh",
              ].map((city, index) => (
                <motion.li key={index} whileHover={{ x: 5 }}>
                  <a
                    href={`/properties?city=${city.toLowerCase()}`}
                    className="text-gray-300 hover:text-green-400 transition-colors duration-300"
                  >
                    {city}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-lg font-semibold mb-4 text-green-400">
              Contact Us
            </h3>
            <ul className="space-y-3">
              <motion.li
                className="flex items-center gap-2 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <MapPin className="h-5 w-5 text-green-500" />
                <span>123 Business Hub, Ahmedabad, Gujarat</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Phone className="h-5 w-5 text-green-500" />
                <span>+91 78638 20635 / +91 83201 00603</span>
              </motion.li>
              <motion.li
                className="flex items-center gap-2 text-gray-300"
                whileHover={{ x: 5 }}
              >
                <Mail className="h-5 w-5 text-green-500" />
                <span>2022002415.gcet@cvmu.edu.in</span>
              </motion.li>
            </ul>
          </motion.div>
        </div>

        <motion.div
          className="border-t border-gray-700/50 mt-12 pt-8 text-center text-gray-300"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
        >
          <p>© 2024 EstateVista. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
