import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion, AnimatePresence } from "framer-motion";
import {
  Search,
  Eye,
  Users,
  Building2,
  TrendingUp,
  Home as HomeIcon,
  Cog,
  BarChart4,
} from "lucide-react";
import { useStats } from "@/hooks/useStats";
import Navbar from "./Navbar";
import Footer from "./Footer";
import AnimatedGradientBackground from "./ui/animated-gradient-background";
import FeatureCard from "./FeatureCard";
import StatsCard from "./StatsCard";
import { Button } from "./ui/button";
import { useInView } from "framer-motion";

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
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
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
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
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
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
  },
];

const Home = ({ initialProperties = defaultProperties }: HomeProps) => {
  const stats = useStats();
  const { showNotification, showRandomNotification } = useNotification();
  const ref = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show welcome notification with a delay to ensure app is loaded
    const welcomeTimer = setTimeout(() => {
      try {
        showNotification(
          "🏠 Welcome to EstateVista! Where we find you a home before your lease expires (hopefully)!",
          "success",
          8000,
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
    }, 60000); // Every 60 seconds

    return () => {
      clearTimeout(welcomeTimer);
      clearInterval(interval);
    };
  }, [showNotification, showRandomNotification]);

  return (
    <AnimatedGradientBackground className="min-h-screen">
      <Navbar />

      <motion.main
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Hero Section */}
        <section className="pt-20 pb-16">
          <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                The <span className="text-green-600">ultimate</span> <br />
                real estate <br />
                platform
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                Creating exceptional real estate solutions designed to elevate
                your business.
              </p>
              <Button
                size="lg"
                className="bg-green-600 hover:bg-green-700 text-white px-8"
                onClick={() => (window.location.href = "/properties")}
              >
                Get Started
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="relative"
            >
              <img
                src="https://images.unsplash.com/photo-1582376432754-b63cc6a9b8c3?w=800&q=80"
                alt="Real Estate Platform"
                className="rounded-lg shadow-xl w-full"
              />

              <motion.div
                className="absolute -bottom-5 -left-5 bg-white p-4 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, type: "spring" }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <TrendingUp className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Properties</p>
                    <p className="font-bold">
                      {stats.totalProperties.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>

              <motion.div
                className="absolute -top-5 -right-5 bg-white p-4 rounded-lg shadow-lg"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 1, type: "spring" }}
              >
                <div className="flex items-center gap-2">
                  <div className="bg-green-100 p-2 rounded-full">
                    <Users className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Active Users</p>
                    <p className="font-bold">
                      {stats.activeUsers.toLocaleString()}
                    </p>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Strategy Section */}
        <section className="py-20 bg-gray-50 relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 z-0">
            {[...Array(10)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full bg-green-500/10"
                style={{
                  width: `${Math.random() * 200 + 50}px`,
                  height: `${Math.random() * 200 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  x: [0, Math.random() * 50 - 25],
                  y: [0, Math.random() * 50 - 25],
                }}
                transition={{
                  duration: 5 + Math.random() * 5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="order-2 lg:order-1"
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Mobile app"
                  className="rounded-lg shadow-xl mx-auto max-w-md w-full"
                />
              </motion.div>

              <motion.div
                className="order-1 lg:order-2"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Strategy integrating
                  <br />
                  multiple property
                  <br />
                  types
                </h2>
                <p className="text-gray-600 mb-8">
                  We deliver a seamless client experience through a
                  comprehensive strategy based on thorough market research.
                </p>

                <div className="space-y-4">
                  <FeatureCard
                    icon={Search}
                    title="Smart Search"
                    description="Find your dream property with our advanced search filters"
                    index={1}
                  />
                  <FeatureCard
                    icon={Eye}
                    title="Virtual Tours"
                    description="Experience properties in 360° before visiting"
                    index={2}
                  />
                  <FeatureCard
                    icon={Users}
                    title="Expert Agents"
                    description="Get guidance from our experienced real estate agents"
                    index={3}
                  />
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Success Metrics Section */}
        <section className="py-20 relative">
          {/* Animated dots background */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            {[...Array(50)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-1 h-1 md:w-2 md:h-2 rounded-full bg-green-500/20"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.7, 0.3],
                }}
                transition={{
                  duration: 3 + Math.random() * 5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
          <div className="container mx-auto px-4 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Driving Success
              </h2>
              <h3 className="text-2xl font-semibold mb-2">
                Through Real Estate
              </h3>
              <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
                Empowering investors to reach new heights
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  01
                </motion.div>
                <h3 className="font-semibold mb-4">Efficiency</h3>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Efficiency"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  02
                </motion.div>
                <h3 className="font-semibold mb-4">Reliability</h3>
                <img
                  src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80"
                  alt="Reliability"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  03
                </motion.div>
                <h3 className="font-semibold mb-4">
                  Innovation in Real Estate
                </h3>
                <img
                  src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80"
                  alt="Innovation"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>

              <div className="text-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="text-4xl font-bold text-green-600 mb-2"
                >
                  04
                </motion.div>
                <h3 className="font-semibold mb-4">Scalability</h3>
                <img
                  src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80"
                  alt="Scalability"
                  className="rounded-lg shadow-md mx-auto h-32 object-cover"
                />
              </div>
            </div>

            {/* Popular Cities */}
            <h2 className="text-3xl font-bold text-center mb-12">
              Popular Cities
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                {
                  name: "Ahmedabad",
                  image:
                    "https://images.unsplash.com/photo-1599940824399-b87987ceb969?w=800&q=80",
                },
                {
                  name: "Surat",
                  image:
                    "https://images.unsplash.com/photo-1572508588813-77abd219e994?w=800&q=80",
                },
                {
                  name: "Vadodara",
                  image:
                    "https://images.unsplash.com/photo-1580558606307-50d51681045c?w=800&q=80",
                },
                {
                  name: "Rajkot",
                  image:
                    "https://images.unsplash.com/photo-1582376432754-b63cc6a9b8c3?w=800&q=80",
                },
                {
                  name: "Gandhinagar",
                  image:
                    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
                },
                {
                  name: "Bhavnagar",
                  image:
                    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
                },
                {
                  name: "Jamnagar",
                  image:
                    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
                },
                {
                  name: "Junagadh",
                  image:
                    "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
                },
              ].map((city) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  className="relative group cursor-pointer"
                  onClick={() =>
                    (window.location.href = `/properties?city=${city.name.toLowerCase()}`)
                  }
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
        {/* Services Section */}
        <section className="py-20 bg-gray-50">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl md:text-4xl font-bold mb-6">
                  Discover the range
                  <br />
                  of services we can
                  <br />
                  provide for your real
                  <br />
                  estate needs.
                </h2>

                <div className="space-y-6 mt-8">
                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Market Analysis
                    </h3>
                    <p className="text-gray-600">
                      As a leader in commercial real estate, we empower
                      businesses to find the perfect space for their needs.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-2">
                      Commercial Real Estate Services
                    </h3>
                    <p className="text-gray-600">
                      We have extensive experience in commercial real estate,
                      helping clients buy, sell, and lease properties. Explore
                      our portfolio of successful transactions.
                    </p>
                  </div>

                  <Button
                    className="mt-4 bg-green-600 hover:bg-green-700"
                    onClick={() => (window.location.href = "/contact")}
                  >
                    Learn more about our services
                  </Button>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
                  alt="Services"
                  className="rounded-lg shadow-xl mx-auto"
                />
              </motion.div>
            </div>
          </div>
        </section>

        {/* Trusted References */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold mb-2">
                  Trusted references
                </h2>
                <p className="text-gray-600">We are in good company.</p>
                <Button
                  variant="outline"
                  className="mt-4 border-green-600 text-green-600 hover:bg-green-50"
                  onClick={() => (window.location.href = "/about")}
                >
                  See our success stories
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-8 mt-8 md:mt-0">
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Amsterdam</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Firenze</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Nairobi</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Madrid</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">KOBE</span>
                </motion.div>
                <motion.div
                  whileHover={{ y: -5 }}
                  className="flex items-center justify-center"
                >
                  <span className="text-xl font-bold">Berlin</span>
                </motion.div>
              </div>
            </div>
          </div>
        </section>
      </motion.main>
      <Footer />
    </AnimatedGradientBackground>
  );
};

export default Home;
