import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Bath,
  Bed,
  Building,
  Calendar,
  Car,
  Check,
  Home,
  MapPin,
  Maximize2,
  Phone,
  School,
  User,
  Waves,
  Eye,
} from "lucide-react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PropertyMap from "./PropertyMap";
import ScheduleVisitModal from "./ScheduleVisitModal";
import MessageAgentModal from "./MessageAgentModal";
import ChatBot from "./ChatBot";
import SavePropertyButton from "./SavePropertyButton";
import BookVisitButton from "./BookVisitButton";

interface PropertyDetailsProps {
  id?: string;
  title?: string;
  description?: string;
  price?: number;
  type?: string;
  location?: string;
  coordinates?: { lat: number; lng: number };
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  amenities?: string[];
  nearbyFacilities?: Array<{ name: string; distance: string; type: string }>;
  agent?: {
    name: string;
    phone: string;
    email: string;
    photo?: string;
  };
  status?: string;
  financingOptions?: Array<{ name: string; rate: string; term: string }>;
  images?: string[];
}

const defaultAmenities = [
  "Swimming Pool",
  "Garden",
  "Parking",
  "Gym",
  "Security",
  "Power Backup",
  "Children's Play Area",
  "Club House",
];

const defaultNearbyFacilities = [
  { name: "City Hospital", distance: "1.2 km", type: "hospital" },
  { name: "Green Valley School", distance: "0.8 km", type: "school" },
  { name: "Metro Station", distance: "1.5 km", type: "transportation" },
  { name: "Shopping Mall", distance: "2.3 km", type: "shopping" },
];

const defaultFinancingOptions = [
  { name: "Standard Loan", rate: "8.5%", term: "20 years" },
  { name: "First-Time Buyer", rate: "7.9%", term: "25 years" },
  { name: "Investment Plan", rate: "9.2%", term: "15 years" },
];

const PropertyDetails = ({
  id = "prop123",
  title = "Luxury Villa in Ahmedabad",
  description = "This stunning luxury villa is located in the heart of Bodakdev, Ahmedabad. It features modern architecture, premium finishes, and spacious rooms with abundant natural light. The property includes a private garden, swimming pool, and covered parking for 2 cars.",
  price = 35000000,
  type = "Villa",
  location = "Bodakdev, Ahmedabad, Gujarat",
  coordinates = { lat: 23.0225, lng: 72.5714 },
  bedrooms = 4,
  bathrooms = 3,
  sqft = 2500,
  amenities = defaultAmenities,
  nearbyFacilities = defaultNearbyFacilities,
  agent = {
    name: "Harsh Kadecha",
    phone: "+91 78638 20635",
    email: "2022002415.gcet@cvmu.edu.in",
    photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=harsh",
  },
  status = "For Sale",
  financingOptions = defaultFinancingOptions,
  images = [
    "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=800&q=80",
    "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80",
    "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80",
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80",
  ],
}: PropertyDetailsProps) => {
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Property Header */}
        <div className="flex flex-col md:flex-row justify-between items-start gap-4 mb-6">
          <div>
            <h1 className="text-3xl font-bold">{title}</h1>
            <p className="flex items-center text-muted-foreground mt-1">
              <MapPin className="h-4 w-4 mr-1" /> {location}
            </p>
          </div>
          <div className="flex flex-col items-end">
            <p className="text-3xl font-bold text-green-600">
              {price >= 100000
                ? `₹${(price / 10000000).toFixed(2)} Cr`
                : `₹${price.toLocaleString()} /month`}
            </p>
            <Badge className="mt-1">{status}</Badge>
            {price < 25000 && status === "For Rent" && (
              <Badge
                variant="outline"
                className="mt-1 bg-blue-100 text-blue-800 border-blue-200"
              >
                Student Friendly
              </Badge>
            )}
            {price <= 8000000 && price >= 100000 && (
              <Badge
                variant="outline"
                className="mt-1 bg-green-100 text-green-800 border-green-200"
              >
                Middle Class
              </Badge>
            )}
          </div>
        </div>

        {/* Property Images */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:col-span-2 row-span-2">
            <div className="relative aspect-[4/3] rounded-lg overflow-hidden">
              <img
                src={images[0]}
                alt={title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          {images.slice(1, 4).map((image, index) => (
            <div
              key={index}
              className="relative aspect-[4/3] rounded-lg overflow-hidden"
            >
              <img
                src={image}
                alt={`${title} - ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </motion.div>

        {/* Property Content */}
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          {/* Main Content */}
          <div className="lg:col-span-2">
            <Tabs defaultValue="details">
              <TabsList className="mb-4">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="amenities">Amenities</TabsTrigger>
                <TabsTrigger value="location">Location</TabsTrigger>
                <TabsTrigger value="financing">Financing</TabsTrigger>
              </TabsList>

              <TabsContent value="details" key="details" className="space-y-6">
                {/* Property Type and Details */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Property Overview
                    </h2>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Building className="h-6 w-6 mb-2 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Type
                        </span>
                        <span className="font-medium">{type}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Bed className="h-6 w-6 mb-2 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Bedrooms
                        </span>
                        <span className="font-medium">{bedrooms}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Bath className="h-6 w-6 mb-2 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Bathrooms
                        </span>
                        <span className="font-medium">{bathrooms}</span>
                      </div>
                      <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                        <Maximize2 className="h-6 w-6 mb-2 text-green-600" />
                        <span className="text-sm text-muted-foreground">
                          Area
                        </span>
                        <span className="font-medium">{sqft} sqft</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold mb-2">Description</h3>
                    <p className="text-muted-foreground">{description}</p>
                  </CardContent>
                </Card>

                {/* Nearby Facilities */}
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Nearby Facilities
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {nearbyFacilities.map((facility, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 border rounded-lg"
                        >
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            {facility.type === "hospital" ? (
                              <Building className="h-5 w-5 text-green-600" />
                            ) : facility.type === "school" ? (
                              <School className="h-5 w-5 text-green-600" />
                            ) : facility.type === "transportation" ? (
                              <Car className="h-5 w-5 text-green-600" />
                            ) : (
                              <Home className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <div>
                            <p className="font-medium">{facility.name}</p>
                            <p className="text-sm text-muted-foreground">
                              {facility.distance}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="amenities" key="amenities">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Amenities</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {amenities.map((amenity, index) => (
                        <div
                          key={index}
                          className="flex items-center p-3 border rounded-lg"
                        >
                          <div className="p-2 bg-green-100 rounded-full mr-3">
                            {amenity.includes("Pool") ? (
                              <Waves className="h-5 w-5 text-green-600" />
                            ) : amenity.includes("Parking") ? (
                              <Car className="h-5 w-5 text-green-600" />
                            ) : (
                              <Check className="h-5 w-5 text-green-600" />
                            )}
                          </div>
                          <p className="font-medium">{amenity}</p>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="location" key="location">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">Location</h2>
                    <div className="h-[400px] rounded-lg overflow-hidden mb-4">
                      <PropertyMap
                        location={location}
                        coordinates={coordinates}
                      />
                    </div>
                    <p className="flex items-center text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-1" /> {location}
                    </p>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="financing" key="financing">
                <Card>
                  <CardContent className="p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Financing Options
                    </h2>
                    <div className="space-y-4">
                      {financingOptions.map((option, index) => (
                        <div
                          key={index}
                          className="p-4 border rounded-lg hover:border-green-600 transition-colors"
                        >
                          <h3 className="text-lg font-semibold">
                            {option.name}
                          </h3>
                          <div className="grid grid-cols-2 gap-4 mt-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Interest Rate
                              </p>
                              <p className="font-medium">{option.rate}</p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Term
                              </p>
                              <p className="font-medium">{option.term}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Agent Info */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Contact Agent</h2>
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <div className="h-16 w-16 rounded-full overflow-hidden">
                      <img
                        src={agent.photo}
                        alt={agent.name}
                        className="h-full w-full object-cover"
                      />
                    </div>
                  </div>
                  <div>
                    <p className="font-semibold">{agent.name}</p>
                    <p className="text-sm text-muted-foreground">
                      Property Agent
                    </p>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-green-600" />
                    <p>{agent.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-2 text-green-600" />
                    <p>{agent.email}</p>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <Button
                    className="w-full"
                    onClick={() =>
                      (window.location.href = `tel:${agent.phone}`)
                    }
                  >
                    Call Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => setShowMessageModal(true)}
                  >
                    Message Agent
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full mt-2"
                    onClick={() =>
                      (window.location.href = `/property-tour?id=${id}`)
                    }
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    View 360° Tour
                  </Button>
                  <SavePropertyButton
                    propertyId={id}
                    variant="outline"
                    className="w-full"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Availability Status */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">Availability</h2>
                <div className="flex items-center mb-4">
                  <Calendar className="h-5 w-5 mr-2 text-green-600" />
                  <div>
                    <p className="font-medium">Status</p>
                    <p className="text-muted-foreground">{status}</p>
                  </div>
                </div>
                <BookVisitButton
                  propertyId={id}
                  propertyTitle={title}
                  onOpenScheduleModal={() => setShowScheduleModal(true)}
                  className="w-full"
                />
              </CardContent>
            </Card>

            {/* Similar Properties */}
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold mb-4">
                  Similar Properties
                </h2>
                <div className="space-y-4">
                  {[1, 2].map((item) => (
                    <div key={item} className="flex gap-3">
                      <div className="h-20 w-20 rounded-md overflow-hidden flex-shrink-0">
                        <img
                          src={`https://images.unsplash.com/photo-160058515434${item}-be6161a56a0c?w=200&q=80`}
                          alt="Similar property"
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <p className="font-medium line-clamp-1">
                          {item === 1 ? "Modern Apartment" : "Luxury Villa"} in{" "}
                          {item === 1 ? "Surat" : "Vadodara"}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          ₹{(item === 1 ? 1.8 : 2.5).toFixed(1)}L
                        </p>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <span className="flex items-center mr-2">
                            <Bed className="h-3 w-3 mr-1" /> {item + 2}
                          </span>
                          <span className="flex items-center">
                            <Bath className="h-3 w-3 mr-1" /> {item + 1}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />

      {/* Modals */}
      <ScheduleVisitModal
        isOpen={showScheduleModal}
        onClose={() => setShowScheduleModal(false)}
        propertyTitle={title}
      />
      <MessageAgentModal
        isOpen={showMessageModal}
        onClose={() => setShowMessageModal(false)}
        agentName={agent.name}
        propertyTitle={title}
      />

      {/* Chatbot */}
      <ChatBot />
    </div>
  );
};

export default PropertyDetails;
