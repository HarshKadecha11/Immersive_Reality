import React from "react";
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
import { Badge } from "./ui/badge";
import { Eye, Home, MapPin, Maximize2 } from "lucide-react";
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
  imageUrl = "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&dpr=2&q=80",
  onViewTour = () => console.log("View tour clicked"),
  onViewDetails = () => console.log("View details clicked"),
}: PropertyCardProps) => {
  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="w-[380px] bg-white overflow-hidden hover:shadow-lg transition-shadow duration-300">
        <div className="relative">
          <div className="aspect-[4/3] relative overflow-hidden">
            <img
              src={imageUrl}
              alt={title}
              className="object-cover w-full h-full hover:scale-110 transition-transform duration-500"
            />
            <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary">
              ₹{(price / 10000000).toFixed(2)} Cr
            </Badge>
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

        <CardFooter className="grid grid-cols-2 gap-2">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => {
                    onViewTour();
                    // Import dynamically to avoid circular dependencies
                    import("@/components/NotificationProvider").then(
                      (module) => {
                        const { useNotification } = module;
                        try {
                          const { showNotification } = useNotification();
                          showNotification(
                            "🕶️ Check out our new Surat property in 360°! Experience virtual reality without the headache!",
                            "info",
                            4000,
                          );
                        } catch (e) {
                          console.log("Notification context not available");
                        }
                      },
                    );
                  }}
                >
                  <Eye className="mr-2 h-4 w-4" />
                  360° Tour
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>View 360° virtual tour</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Button
            className="w-full"
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
        </CardFooter>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
