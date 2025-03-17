import React, { useState } from "react";
import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Button } from "./ui/button";
import SavePropertyButton from "./SavePropertyButton";
import { Badge } from "./ui/badge";
import { Eye, Home, MapPin, Maximize2, Bookmark } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

interface PropertyCardProps {
  title?: string;
  price?: number;
  location?: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  imageUrl?: string;
  onViewTour?: () => void;
  onViewDetails?: () => void;
}

const PropertyCard = ({
  title = "Luxury Villa in Ahmedabad",
  price = 25000000,
  location = "Bodakdev, Ahmedabad",
  bedrooms = 4,
  bathrooms = 3,
  sqft = 2500,
  imageUrl = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
  onViewTour = () => console.log("View tour clicked"),
  onViewDetails = () => console.log("View details clicked"),
}: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <Card className="w-[380px] bg-white/90 backdrop-blur-sm overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-green-100">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary">
                {price >= 100000
                  ? `₹${(price / 10000000).toFixed(2)} Cr`
                  : `₹${price.toLocaleString()} /month`}
              </Badge>
            </motion.div>
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300"
              whileHover={{ opacity: 1 }}
            />
          </div>
        </div>

        <CardHeader>
          <CardTitle className="line-clamp-1">{title}</CardTitle>
          <CardDescription className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            {location}
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{bedrooms} Beds</span>
            </div>
            <div className="flex items-center gap-1">
              <Home className="h-4 w-4" />
              <span>{bathrooms} Baths</span>
            </div>
            <div className="flex items-center gap-1">
              <Maximize2 className="h-4 w-4" />
              <span>{sqft} sqft</span>
            </div>
          </div>
        </CardContent>

        <CardFooter className="grid grid-cols-3 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => {
                      onViewTour();
                      // Redirect to VR tour page with this property
                      window.location.href = `/property-tour?id=${title.toLowerCase().replace(/\s+/g, "-")}`;
                    }}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    360° Tour
                  </Button>
                </motion.div>
              </TooltipTrigger>
              <TooltipContent>
                <p>View 360° virtual tour</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <SavePropertyButton
              propertyId={title.toLowerCase().replace(/\s+/g, "-")}
              size="sm"
            />
          </motion.div>

          <motion.div
            className="col-span-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Button
              className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              onClick={() => {
                onViewDetails();
                // Import dynamically to avoid circular dependencies
                import("@/components/NotificationProvider").then((module) => {
                  const { useNotification } = module;
                  try {
                    const { showNotification } = useNotification();
                    showNotification(
                      "🔍 Checking if this property has enough closet space for your emotional baggage...",
                      "info",
                      4000,
                    );
                  } catch (e) {
                    console.log("Notification context not available");
                  }
                });
              }}
            >
              View Details
            </Button>
          </motion.div>
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
