import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Card, CardContent } from "./ui/card";
import { Search, Home, TrendingUp, Users } from "lucide-react";

interface HeroSectionProps {
  featuredProperties?: Array<{
    id: string;
    imageUrl: string;
    title: string;
  }>;
  stats?: {
    totalProperties?: number;
    averagePrice?: number;
    activeUsers?: number;
  };
}

const images = [
  {
    id: "1",
    imageUrl:
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
    title: "Luxury Villa in Ahmedabad",
  },
  {
    id: "2",
    imageUrl:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    title: "Modern Apartment in Surat",
  },
  {
    id: "3",
    imageUrl:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    title: "Penthouse in Vadodara",
  },
  {
    id: "4",
    imageUrl:
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
    title: "Luxury Home",
  },
  {
    id: "5",
    imageUrl:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80",
    title: "Modern Villa",
  },
];

const HeroSection = ({
  featuredProperties = [
    {
      id: "1",
      imageUrl:
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80",
      title: "Luxury Villa in Ahmedabad",
    },
    {
      id: "2",
      imageUrl:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
      title: "Modern Apartment in Surat",
    },
    {
      id: "3",
      imageUrl:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
      title: "Penthouse in Vadodara",
    },
  ],
  stats = {
    totalProperties: 5000,
    averagePrice: 7500000,
    activeUsers: 10000,
  },
}: HeroSectionProps) => {
  return (
    <div className="relative w-full h-[600px] bg-gray-100 overflow-hidden">
      {/* Background Slider */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          className="flex h-full"
          animate={{
            x: ["-20%", "-80%"],
          }}
          transition={{
            duration: 60,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {images.map((property) => (
            <div key={property.id} className="relative min-w-full h-full">
              <img
                src={property.imageUrl}
                alt={property.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/50" />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-white">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="text-5xl font-bold text-center mb-6"
        >
          Discover Your Dream Property in Gujarat
        </motion.h1>

        {/* Search Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
          className="w-full max-w-4xl bg-white/10 backdrop-blur-lg rounded-lg p-6 mb-12"
        >
          <div className="flex flex-wrap gap-4">
            <Select defaultValue="ahmedabad">
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Select City" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ahmedabad">Ahmedabad</SelectItem>
                <SelectItem value="surat">Surat</SelectItem>
                <SelectItem value="vadodara">Vadodara</SelectItem>
                <SelectItem value="rajkot">Rajkot</SelectItem>
                <SelectItem value="bhavnagar">Bhavnagar</SelectItem>
                <SelectItem value="jamnagar">Jamnagar</SelectItem>
                <SelectItem value="junagadh">Junagadh</SelectItem>
                <SelectItem value="gandhinagar">Gandhinagar</SelectItem>
                <SelectItem value="anand">Anand</SelectItem>
                <SelectItem value="navsari">Navsari</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Properties</SelectItem>
                <SelectItem value="Villa">Villa</SelectItem>
                <SelectItem value="Apartment">Apartment</SelectItem>
                <SelectItem value="Penthouse">Penthouse</SelectItem>
                <SelectItem value="Bungalow">Bungalow</SelectItem>
                <SelectItem value="Farmhouse">Farmhouse</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger className="w-[200px] bg-white">
                <SelectValue placeholder="Budget" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Price Ranges</SelectItem>
                <SelectItem value="student">Student Rentals</SelectItem>
                <SelectItem value="affordable">Middle Class</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex-1">
              <Input
                type="text"
                placeholder="Search by location or property name"
                className="w-full bg-white"
              />
            </div>

            <Button
              size="lg"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = "/properties")}
            >
              <Search className="mr-2 h-4 w-4" />
              Search
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="flex items-center p-6">
                <Home className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm">Total Properties</p>
                  <motion.p
                    className="text-2xl font-bold"
                    key={stats.totalProperties} // Force animation restart
                    initial={{ scale: 1.5, color: "#22c55e" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ duration: 0.5 }}
                  >
                    {stats.totalProperties.toLocaleString()}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="flex items-center p-6">
                <TrendingUp className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm">Average Price</p>
                  <p className="text-2xl font-bold">
                    ₹{(stats.averagePrice / 100000).toFixed(1)}L
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            <Card className="bg-white/10 backdrop-blur-lg border-0">
              <CardContent className="flex items-center p-6">
                <Users className="h-8 w-8 mr-4 text-green-600" />
                <div>
                  <p className="text-sm">Active Users</p>
                  <motion.p
                    className="text-2xl font-bold"
                    key={stats.activeUsers} // Force animation restart
                    initial={{ scale: 1.2, color: "#3b82f6" }}
                    animate={{ scale: 1, color: "#ffffff" }}
                    transition={{ duration: 0.3 }}
                  >
                    {stats.activeUsers.toLocaleString()}
                  </motion.p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
