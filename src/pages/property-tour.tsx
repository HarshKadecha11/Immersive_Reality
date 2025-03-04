import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyTour360 from "@/components/PropertyTour360";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import {
  MapPin,
  Home,
  Bed,
  Bath,
  Calendar,
  ArrowLeft,
  ArrowRight,
  X,
} from "lucide-react";

const PropertyTourPage = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(0);

  const property = {
    id: "1",
    title: "Luxury Villa in Ahmedabad",
    price: 35000000,
    location: "Bodakdev, Ahmedabad",
    bedrooms: 4,
    bathrooms: 3,
    sqft: 2500,
    description:
      "Experience this stunning luxury villa located in the heart of Bodakdev, Ahmedabad. The property features modern architecture, premium finishes, and spacious rooms with abundant natural light.",
    agent: {
      name: "Rahul Sharma",
      phone: "+91 98765 43210",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
    },
    rooms: [
      {
        name: "Living Room",
        imageUrl:
          "https://poly.cam/capture/AA89C8CC-07A4-4E6A-B896-FB7A5B67BAD6", // Using the Surat property 360 image
        description:
          "Spacious living room with premium Italian marble flooring and large windows offering abundant natural light.",
      },
      {
        name: "Kitchen",
        imageUrl: "https://pannellum.org/images/bma-1.jpg", // Using a sample 360 image
        description:
          "Modern kitchen with high-end appliances, granite countertops, and custom cabinetry.",
      },
      {
        name: "Master Bedroom",
        imageUrl: "https://pannellum.org/images/bma-2.jpg", // Using a sample 360 image
        description:
          "Luxurious master bedroom with attached bathroom and walk-in closet.",
      },
      {
        name: "Balcony",
        imageUrl: "https://pannellum.org/images/jfk.jpg", // Using a sample 360 image
        description:
          "Private balcony offering panoramic views of the city skyline.",
      },
    ],
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const nextRoom = () => {
    setCurrentRoom((prev) => (prev + 1) % property.rooms.length);
  };

  const prevRoom = () => {
    setCurrentRoom(
      (prev) => (prev - 1 + property.rooms.length) % property.rooms.length,
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {!isFullscreen && <Navbar />}

      <div
        className={`${isFullscreen ? "" : "container mx-auto px-4 py-8 pt-20"}`}
      >
        {!isFullscreen && (
          <div className="mb-6">
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
              <a href="/" className="hover:text-primary">
                Home
              </a>
              <span>/</span>
              <a href="/properties" className="hover:text-primary">
                Properties
              </a>
              <span>/</span>
              <a
                href={`/property/${property.id}`}
                className="hover:text-primary"
              >
                {property.title}
              </a>
              <span>/</span>
              <span>Virtual Tour</span>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
              <div>
                <h1 className="text-3xl font-bold">{property.title}</h1>
                <p className="flex items-center text-muted-foreground mt-1">
                  <MapPin className="h-4 w-4 mr-1" /> {property.location}
                </p>
              </div>
              <div className="flex flex-col items-end">
                <p className="text-3xl font-bold text-primary">
                  ₹{(property.price / 10000000).toFixed(2)} Cr
                </p>
                <Badge className="mt-1">For Sale</Badge>
              </div>
            </div>
          </div>
        )}

        {/* 360 Tour Viewer */}
        <PropertyTour360
          imageUrl={property.rooms[currentRoom].imageUrl}
          title={`${property.rooms[currentRoom].name} - 360° Tour`}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
        />

        {!isFullscreen && (
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              {/* Room Navigation */}
              <Card>
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-semibold">Navigate Rooms</h2>
                    <div className="flex gap-2">
                      <Button variant="outline" size="icon" onClick={prevRoom}>
                        <ArrowLeft className="h-4 w-4" />
                      </Button>
                      <Button variant="outline" size="icon" onClick={nextRoom}>
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {property.rooms.map((room, index) => (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.05 }}
                        className={`cursor-pointer rounded-lg overflow-hidden border-2 ${currentRoom === index ? "border-primary" : "border-transparent"}`}
                        onClick={() => setCurrentRoom(index)}
                      >
                        <div className="aspect-square bg-muted relative">
                          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-medium">
                            {room.name}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Room Description */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-2">
                    {property.rooms[currentRoom].name}
                  </h2>
                  <p className="text-muted-foreground">
                    {property.rooms[currentRoom].description}
                  </p>
                </CardContent>
              </Card>

              {/* Property Overview */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Property Overview
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Home className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Type
                      </span>
                      <span className="font-medium">Villa</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Bed className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Bedrooms
                      </span>
                      <span className="font-medium">{property.bedrooms}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Bath className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Bathrooms
                      </span>
                      <span className="font-medium">{property.bathrooms}</span>
                    </div>
                    <div className="flex flex-col items-center p-3 bg-muted rounded-lg">
                      <Home className="h-6 w-6 mb-2 text-primary" />
                      <span className="text-sm text-muted-foreground">
                        Area
                      </span>
                      <span className="font-medium">{property.sqft} sqft</span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">
                    {property.description}
                  </p>
                </CardContent>
              </Card>
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
                          src={property.agent.photo}
                          alt={property.agent.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                    </div>
                    <div>
                      <p className="font-semibold">{property.agent.name}</p>
                      <p className="text-sm text-muted-foreground">
                        Property Agent
                      </p>
                    </div>
                  </div>

                  <div className="mt-6 space-y-3">
                    <Button className="w-full">Call Agent</Button>
                    <Button variant="outline" className="w-full">
                      Message Agent
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Schedule Visit */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Schedule a Visit
                  </h2>
                  <p className="text-sm text-muted-foreground mb-4">
                    Like what you see in the virtual tour? Schedule an in-person
                    visit to experience the property firsthand.
                  </p>
                  <div className="flex items-center mb-4">
                    <Calendar className="h-5 w-5 mr-2 text-primary" />
                    <div>
                      <p className="font-medium">Available for Viewing</p>
                      <p className="text-muted-foreground">
                        Mon-Sat: 10:00 AM - 6:00 PM
                      </p>
                    </div>
                  </div>
                  <Button className="w-full">Schedule a Visit</Button>
                </CardContent>
              </Card>

              {/* Share */}
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Share This Tour
                  </h2>
                  <div className="flex gap-2">
                    <Button variant="outline" className="flex-1">
                      Copy Link
                    </Button>
                    <Button variant="outline" className="flex-1">
                      Share
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {isFullscreen && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-4 right-4 bg-black/50 text-white hover:bg-black/70 z-50"
            onClick={toggleFullscreen}
          >
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>

      {!isFullscreen && <Footer />}
    </div>
  );
};

export default PropertyTourPage;
