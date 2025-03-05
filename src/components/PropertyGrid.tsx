import React, { useState, useEffect } from "react";
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
import { Search, SlidersHorizontal, Loader2 } from "lucide-react";
import { properties as allProperties } from "@/data/properties";

interface Property {
  id: string;
  title: string;
  price: number;
  location: string;
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  images: string[];
  type: string;
  status: string;
  city: string;
}

interface PropertyGridProps {
  properties?: Property[];
  onLoadMore?: () => void;
  isLoading?: boolean;
  cityFilter?: string;
  typeFilter?: string;
  statusFilter?: string;
}

const PropertyGrid = ({
  properties: initialProperties,
  onLoadMore = () => console.log("Load more clicked"),
  isLoading: initialLoading = false,
  cityFilter,
  typeFilter,
  statusFilter,
}: PropertyGridProps) => {
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([2000000, 50000000]);
  const [properties, setProperties] = useState<Property[]>([]);
  const [filteredProperties, setFilteredProperties] = useState<Property[]>([]);
  const [displayedProperties, setDisplayedProperties] = useState<Property[]>(
    [],
  );
  const [isLoading, setIsLoading] = useState(initialLoading);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedType, setSelectedType] = useState(typeFilter || "all");
  const [selectedBedrooms, setSelectedBedrooms] = useState("all");
  const [selectedCity, setSelectedCity] = useState(cityFilter || "all");
  const [selectedStatus, setSelectedStatus] = useState(statusFilter || "all");
  const [page, setPage] = useState(1);
  const propertiesPerPage = 9;

  // Add price category filter
  const priceCategories = [
    { label: "All Price Ranges", value: "all" },
    { label: "Budget (Under ₹25K/month)", value: "budget-rent" },
    { label: "Premium Rentals", value: "premium-rent" },
    { label: "Affordable (Under ₹80L)", value: "affordable" },
    { label: "Premium (Above ₹80L)", value: "premium" },
  ];
  const [selectedPriceCategory, setSelectedPriceCategory] = useState("all");

  // Initialize properties
  useEffect(() => {
    if (initialProperties) {
      setProperties(initialProperties);
    } else {
      setProperties(allProperties);
    }
  }, [initialProperties]);

  // Apply filters
  useEffect(() => {
    setIsLoading(true);
    let filtered = [...properties];

    // Apply search term filter
    if (searchTerm) {
      const search = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (property) =>
          property.title.toLowerCase().includes(search) ||
          property.location.toLowerCase().includes(search) ||
          property.type.toLowerCase().includes(search),
      );
    }

    // Apply property type filter
    if (selectedType !== "all") {
      filtered = filtered.filter((property) => property.type === selectedType);
    }

    // Apply bedrooms filter
    if (selectedBedrooms !== "all") {
      const minBedrooms = parseInt(selectedBedrooms);
      filtered = filtered.filter(
        (property) => property.bedrooms >= minBedrooms,
      );
    }

    // Apply city filter
    if (selectedCity !== "all") {
      filtered = filtered.filter((property) =>
        property.location.toLowerCase().includes(selectedCity.toLowerCase()),
      );
    }

    // Apply status filter
    if (selectedStatus !== "all") {
      filtered = filtered.filter(
        (property) => property.status === selectedStatus,
      );
    }

    // Apply price category filter
    if (selectedPriceCategory !== "all") {
      switch (selectedPriceCategory) {
        case "budget-rent":
          filtered = filtered.filter(
            (property) =>
              property.status === "For Rent" && property.price <= 25000,
          );
          break;
        case "premium-rent":
          filtered = filtered.filter(
            (property) =>
              property.status === "For Rent" && property.price > 25000,
          );
          break;
        case "affordable":
          filtered = filtered.filter(
            (property) =>
              property.status !== "For Rent" && property.price <= 8000000,
          );
          break;
        case "premium":
          filtered = filtered.filter(
            (property) =>
              property.status !== "For Rent" && property.price > 8000000,
          );
          break;
      }
    } else {
      // Apply price range filter only if price category is not selected
      filtered = filtered.filter(
        (property) =>
          property.price >= priceRange[0] && property.price <= priceRange[1],
      );
    }

    setFilteredProperties(filtered);
    setPage(1); // Reset to first page when filters change

    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  }, [
    properties,
    searchTerm,
    selectedType,
    selectedBedrooms,
    selectedCity,
    selectedStatus,
    selectedPriceCategory,
    priceRange,
  ]);

  // Paginate results
  useEffect(() => {
    const startIndex = 0;
    const endIndex = page * propertiesPerPage;
    setDisplayedProperties(filteredProperties.slice(startIndex, endIndex));
  }, [filteredProperties, page]);

  // Get unique cities from properties
  const cities = [
    "all",
    ...new Set(
      properties.map((p) => {
        const cityPart = p.location.split(",")[1]?.trim();
        return cityPart || p.city;
      }),
    ),
  ];

  // Get unique property types
  const propertyTypes = ["all", ...new Set(properties.map((p) => p.type))];

  // Get unique property statuses
  const propertyStatuses = ["all", ...new Set(properties.map((p) => p.status))];

  const handleLoadMore = () => {
    setPage(page + 1);
    onLoadMore();
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 py-8 bg-gray-50">
      <div className="flex flex-col gap-6">
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
          <div className="flex-1 w-full md:w-auto">
            <div className="relative">
              <Input
                placeholder="Search properties..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
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
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Property Type</label>
                <Select value={selectedType} onValueChange={setSelectedType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Property Type" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type === "all" ? "All Types" : type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">City</label>
                <Select value={selectedCity} onValueChange={setSelectedCity}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select City" />
                  </SelectTrigger>
                  <SelectContent>
                    {cities.map((city) => (
                      <SelectItem key={city} value={city}>
                        {city === "all" ? "All Cities" : city}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium">Bedrooms</label>
                <Select
                  value={selectedBedrooms}
                  onValueChange={setSelectedBedrooms}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Bedrooms" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Any</SelectItem>
                    <SelectItem value="1">1+</SelectItem>
                    <SelectItem value="2">2+</SelectItem>
                    <SelectItem value="3">3+</SelectItem>
                    <SelectItem value="4">4+</SelectItem>
                    <SelectItem value="5">5+</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Status</label>
                <Select
                  value={selectedStatus}
                  onValueChange={setSelectedStatus}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Property Status" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyStatuses.map((status) => (
                      <SelectItem key={status} value={status}>
                        {status === "all" ? "All Statuses" : status}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="text-sm font-medium">Price Category</label>
                <Select
                  value={selectedPriceCategory}
                  onValueChange={setSelectedPriceCategory}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Price Category" />
                  </SelectTrigger>
                  <SelectContent>
                    {priceCategories.map((category) => (
                      <SelectItem key={category.value} value={category.value}>
                        {category.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

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

        {/* Results count */}
        <div className="flex justify-between items-center">
          <p className="text-sm text-gray-500">
            Showing {displayedProperties.length} of {filteredProperties.length}{" "}
            properties
          </p>

          {selectedType !== "all" ||
          selectedBedrooms !== "all" ||
          selectedCity !== "all" ||
          selectedStatus !== "all" ||
          selectedPriceCategory !== "all" ||
          searchTerm ? (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                setSelectedType("all");
                setSelectedBedrooms("all");
                setSelectedCity("all");
                setSelectedStatus("all");
                setSelectedPriceCategory("all");
                setSearchTerm("");
                setPriceRange([2000000, 50000000]);
              }}
            >
              Clear Filters
            </Button>
          ) : null}
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-green-600" />
          </div>
        ) : displayedProperties.length === 0 ? (
          <div className="text-center py-20">
            <h3 className="text-xl font-semibold mb-2">No properties found</h3>
            <p className="text-gray-500 mb-4">
              Try adjusting your filters to see more results
            </p>
            <Button
              onClick={() => {
                setSelectedType("all");
                setSelectedBedrooms("all");
                setSelectedCity("all");
                setSelectedStatus("all");
                setSelectedPriceCategory("all");
                setSearchTerm("");
                setPriceRange([2000000, 50000000]);
              }}
            >
              Reset Filters
            </Button>
          </div>
        ) : (
          /* Property Grid */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayedProperties.map((property) => (
              <PropertyCard
                key={property.id}
                title={property.title}
                price={property.price}
                location={property.location.split(",")[0]}
                bedrooms={property.bedrooms}
                bathrooms={property.bathrooms}
                sqft={property.sqft}
                imageUrl={property.images[0]}
                onViewDetails={() =>
                  (window.location.href = `/property/${property.id}`)
                }
              />
            ))}
          </div>
        )}

        {/* Load More Button */}
        {!isLoading &&
          displayedProperties.length > 0 &&
          displayedProperties.length < filteredProperties.length && (
            <div className="flex justify-center mt-8">
              <Button
                variant="outline"
                size="lg"
                onClick={handleLoadMore}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Loading...
                  </>
                ) : (
                  "Load More Properties"
                )}
              </Button>
            </div>
          )}
      </div>
    </div>
  );
};

export default PropertyGrid;
