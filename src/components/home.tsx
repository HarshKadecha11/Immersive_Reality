import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import { Search, Eye, Users } from "lucide-react";
import { useStats } from "@/hooks/useStats";
import Navbar from "./Navbar";
import HeroSection from "./HeroSection";
import PropertyGrid from "./PropertyGrid";
import Footer from "./Footer";

interface HomeProps {
  initialProperties?: Array<{
    id: string;
    title: string;
    price: number;
    location: string;
    bedrooms: number;
    bathrooms: number;
    sqft: number;
    imageUrl: string;
  }>;
}

const defaultProperties = [
  {
    id: "1",
    title: "Luxury Villa in Ahmedabad",
    price: 35000000,
    location: "Bodakdev, Ahmedabad",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    imageUrl:
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&dpr=2&q=80",
  },
  {
    id: "2",
    title: "Modern Apartment in Surat",
    price: 25000000,
    location: "Vesu, Surat",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1800,
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&dpr=2&q=80",
  },
  {
    id: "3",
    title: "Penthouse in Vadodara",
    price: 45000000,
    location: "Alkapuri, Vadodara",
    bedrooms: 5,
    bathrooms: 4,
    sqft: 3200,
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&dpr=2&q=80",
  },
];

const Home = ({ initialProperties = defaultProperties }: HomeProps) => {
  const stats = useStats();
  const { showNotification, showRandomNotification } = useNotification();

  useEffect(() => {
    // Show welcome notification with a delay to ensure app is loaded
    const welcomeTimer = setTimeout(() => {
      try {
        showNotification(
          "🏠 Welcome to EstateVista! Where we find you a home before your lease expires (hopefully)!",
          "success",
          5000,
        );
      } catch (error) {
        console.error("Error showing welcome notification:", error);
      }
    }, 2000);

    // Show random notifications periodically
    const interval = setInterval(() => {
      try {
        showRandomNotification(Math.random() > 0.7 ? "success" : "info");
      } catch (error) {
        console.error("Error showing random notification:", error);
      }
    }, 45000); // Every 45 seconds

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(interval);
    };
  }, [showNotification, showRandomNotification]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <HeroSection
          featuredProperties={initialProperties.map((prop) => ({
            id: prop.id,
            imageUrl: prop.imageUrl,
            title: prop.title,
          }))}
          stats={stats}
        />

        {/* Features Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Why Choose EstateVista?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="p-6 bg-white rounded-lg shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Smart Search</h3>
                <p className="text-gray-600">
                  Find your dream property with our advanced search filters
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="p-6 bg-white rounded-lg shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Virtual Tours</h3>
                <p className="text-gray-600">
                  Experience properties in 360° before visiting
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="p-6 bg-white rounded-lg shadow-sm text-center"
              >
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Expert Agents</h3>
                <p className="text-gray-600">
                  Get guidance from our experienced real estate agents
                </p>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Cities Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">
              Popular Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Ahmedabad",
                  image:
                    "https://images.unsplash.com/photo-1599940824399-b87987ceb969?w=800",
                },
                {
                  name: "Surat",
                  image:
                    "https://images.unsplash.com/photo-1572508588813-77abd219e994?w=800",
                },
                {
                  name: "Vadodara",
                  image:
                    "https://images.unsplash.com/photo-1580558606307-50d51681045c?w=800",
                },
                {
                  name: "Rajkot",
                  image:
                    "https://images.unsplash.com/photo-1597047084897-51e81819a499?w=800",
                },
              ].map((city) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative group cursor-pointer"
                >
                  <div className="aspect-[4/3] rounded-lg overflow-hidden">
                    <img
                      src={city.image}
                      alt={city.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <h3 className="text-white text-xl font-semibold">
                        {city.name}
                      </h3>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </div>
  );
};

export default Home;
