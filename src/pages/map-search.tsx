import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MapSearch from "@/components/MapSearch";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

const MapSearchPage = () => {
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [priceRange, setPriceRange] = useState([20, 500]); // in lakhs

  // Mock properties - would come from Supabase in a real app
  const properties = [
    {
      id: "1",
      title: "Modern Villa in Ahmedabad",
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
      title: "Luxury Apartment in Surat",
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

  const handleLocationSelect = (location) => {
    setSelectedLocation(location);
    // In a real app, you would fetch properties near this location
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-6">Find Properties on Map</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1 space-y-6">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <h2 className="text-xl font-semibold mb-4">Filters</h2>

              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Property Type</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="villa">Villa</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Bedrooms</label>
                  <Select defaultValue="any">
                    <SelectTrigger>
                      <SelectValue placeholder="Any" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="any">Any</SelectItem>
                      <SelectItem value="1">1+</SelectItem>
                      <SelectItem value="2">2+</SelectItem>
                      <SelectItem value="3">3+</SelectItem>
                      <SelectItem value="4">4+</SelectItem>
                      <SelectItem value="5">5+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Price Range (₹)</label>
                  <Slider
                    defaultValue={[20, 500]}
                    max={500}
                    step={10}
                    className="py-4"
                    onValueChange={(value) => setPriceRange(value)}
                  />
                  <div className="flex justify-between text-sm text-muted-foreground">
                    <span>₹{priceRange[0]} Lakhs</span>
                    <span>₹{priceRange[1]} Lakhs</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Status</label>
                  <Select defaultValue="all">
                    <SelectTrigger>
                      <SelectValue placeholder="All" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="for-sale">For Sale</SelectItem>
                      <SelectItem value="for-rent">For Rent</SelectItem>
                      <SelectItem value="sold">Sold</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Amenities</label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      "Swimming Pool",
                      "Garden",
                      "Parking",
                      "Gym",
                      "Security",
                      "Power Backup",
                    ].map((amenity) => (
                      <div key={amenity} className="flex items-center">
                        <input type="checkbox" id={amenity} className="mr-2" />
                        <label htmlFor={amenity} className="text-sm">
                          {amenity}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <Button className="w-full mt-4">Apply Filters</Button>
              </div>
            </div>
          </div>

          {/* Map and Results */}
          <div className="lg:col-span-2 space-y-6">
            <MapSearch onLocationSelect={handleLocationSelect} />

            <div className="space-y-4">
              <h2 className="text-xl font-semibold">
                {selectedLocation
                  ? `Properties near ${selectedLocation.address}`
                  : "Featured Properties"}
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {properties.map((property) => (
                  <PropertyCard
                    key={property.id}
                    title={property.title}
                    price={property.price}
                    location={property.location}
                    bedrooms={property.bedrooms}
                    bathrooms={property.bathrooms}
                    sqft={property.sqft}
                    imageUrl={property.imageUrl}
                    onViewDetails={() =>
                      (window.location.href = `/property/${property.id}`)
                    }
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MapSearchPage;
