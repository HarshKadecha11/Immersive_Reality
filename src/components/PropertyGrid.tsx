import React, { useState } from "react";
import { motion } from "framer-motion";
import PropertyCard from "./PropertyCard";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Slider } from "./ui/slider";
import { Search, SlidersHorizontal } from "lucide-react";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  imageUrl: string;
}

interface PropertyGridProps {
  properties?: Property[];
  onLoadMore?: () => void;
  isLoading?: boolean;
}

const defaultProperties: Property[] = [
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

const PropertyGrid = ({
  properties = defaultProperties,
  onLoadMore = () => console.log("Load more clicked"),
  isLoading = false,
}: PropertyGridProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([2000000, 50000000]);

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col gap-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Input placeholder="Search properties..." className="pl-10" />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
          </div>

          <Button
            variant="outline"
            onClick={() => setShowFilters(!showFilters)}
            className="w-full md:w-auto"
          >
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
        </div>

        {/* Filters Panel */}
        <motion.div
          initial={false}
          animate={{ height: showFilters ? "auto" : 0 }}
          className="overflow-hidden"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-white rounded-lg shadow-sm">
            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Property Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="villa">Villa</SelectItem>
              </SelectContent>
            </Select>

            <Select defaultValue="all">
              <SelectTrigger>
                <SelectValue placeholder="Bedrooms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Any</SelectItem>
                <SelectItem value="1">1+</SelectItem>
                <SelectItem value="2">2+</SelectItem>
                <SelectItem value="3">3+</SelectItem>
                <SelectItem value="4">4+</SelectItem>
              </SelectContent>
            </Select>

            <div className="space-y-2">
              <p className="text-sm font-medium">Price Range (₹)</p>
              <Slider
                defaultValue={[20, 500]}
                max={500}
                step={10}
                className="py-4"
                onValueChange={(value) =>
                  setPriceRange([value[0] * 100000, value[1] * 100000])
                }
              />
              <div className="flex justify-between text-sm text-gray-500">
                <span>₹{(priceRange[0] / 10000000).toFixed(1)}Cr</span>
                <span>₹{(priceRange[1] / 10000000).toFixed(1)}Cr</span>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Property Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
            />
          ))}
        </div>

        {/* Load More Button */}
        <div className="flex justify-center mt-8">
          <Button
            variant="outline"
            size="lg"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More Properties"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyGrid;
