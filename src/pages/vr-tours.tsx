import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, MapPin, Home, Bed, Bath, Play } from "lucide-react";
import { motion } from "framer-motion";
import AnimatedGradientBackground from "@/components/ui/animated-gradient-background";

const VRToursPage = () => {
  const properties = [
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
      vrTourUrl: "#",
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
      vrTourUrl:
        "https://poly.cam/capture/AA89C8CC-07A4-4E6A-B896-FB7A5B67BAD6",
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
      vrTourUrl: "#",
    },
    {
      id: "4",
      title: "Spacious Bungalow in Rajkot",
      price: 30000000,
      location: "Kalavad Road, Rajkot",
      bedrooms: 4,
      bathrooms: 3,
      sqft: 2800,
      imageUrl:
        "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&dpr=2&q=80",
      vrTourUrl: "#",
    },
    {
      id: "5",
      title: "Luxury Apartment in Ahmedabad",
      price: 28000000,
      location: "Satellite, Ahmedabad",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      imageUrl:
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&dpr=2&q=80",
      vrTourUrl: "#",
    },
    {
      id: "6",
      title: "Modern Villa in Surat",
      price: 38000000,
      location: "Dumas Road, Surat",
      bedrooms: 4,
      bathrooms: 4,
      sqft: 3000,
      imageUrl:
        "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&dpr=2&q=80",
      vrTourUrl: "#",
    },
  ];

  return (
    <AnimatedGradientBackground className="min-h-screen">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-orange-600">
            Virtual Reality Property Tours
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Experience properties in immersive 360° virtual reality before
            scheduling an in-person visit
          </p>
        </motion.div>

        {/* How It Works Section */}
        <motion.div
          className="mb-16"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-semibold mb-8 text-center">
            How It Works
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Eye className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Browse VR Tours</h3>
                <p className="text-muted-foreground">
                  Explore our collection of properties with virtual reality
                  tours
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">
                  Experience in 360°
                </h3>
                <p className="text-muted-foreground">
                  Walk through each room and explore the property as if you were
                  there
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="h-6 w-6 text-primary" />
                </div>
                <h3 className="text-lg font-semibold mb-2">Schedule a Visit</h3>
                <p className="text-muted-foreground">
                  Like what you see? Schedule an in-person visit to your
                  favorite properties
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        {/* Featured VR Tours */}
        <h2 className="text-2xl font-semibold mb-6">Featured VR Tours</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index, duration: 0.5 }}
              whileHover={{ y: -10 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img
                      src={property.imageUrl}
                      alt={property.title}
                      className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <Badge className="absolute top-4 right-4 bg-primary/90 hover:bg-primary">
                    ₹{(property.price / 10000000).toFixed(2)} Cr
                  </Badge>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <a
                      href={
                        property.id === "2"
                          ? "https://poly.cam/capture/AA89C8CC-07A4-4E6A-B896-FB7A5B67BAD6"
                          : "/property-tour"
                      }
                    >
                      <Button className="rounded-full h-16 w-16 bg-black/50 hover:bg-primary/90">
                        <Eye className="h-8 w-8" />
                      </Button>
                    </a>
                  </div>
                </div>

                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1">
                    {property.title}
                  </h3>
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex gap-3 text-sm">
                      <span className="flex items-center">
                        <Bed className="h-4 w-4 mr-1" /> {property.bedrooms}
                      </span>
                      <span className="flex items-center">
                        <Bath className="h-4 w-4 mr-1" /> {property.bathrooms}
                      </span>
                      <span className="flex items-center">
                        <Home className="h-4 w-4 mr-1" /> {property.sqft} sqft
                      </span>
                    </div>
                    <Button size="sm" variant="outline" asChild>
                      <a href={`/property/${property.id}`}>Details</a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="lg">
            Load More VR Tours
          </Button>
        </div>

        {/* VR Headset Compatibility */}
        <div className="mt-16 bg-muted rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Compatible with VR Headsets
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-6">
            For the most immersive experience, our virtual tours are compatible
            with popular VR headsets
          </p>
          <div className="flex justify-center gap-8 flex-wrap">
            {[
              "https://via.placeholder.com/120x60?text=Oculus",
              "https://via.placeholder.com/120x60?text=HTC+Vive",
              "https://via.placeholder.com/120x60?text=PlayStation+VR",
              "https://via.placeholder.com/120x60?text=Google+Cardboard",
            ].map((img, index) => (
              <div key={index} className="bg-white p-4 rounded">
                <img
                  src={img}
                  alt={`VR Headset ${index + 1}`}
                  className="h-12"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </AnimatedGradientBackground>
  );
};

export default VRToursPage;
