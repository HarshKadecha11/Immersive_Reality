import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyGrid from "@/components/PropertyGrid";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { properties as allProperties } from "@/data/properties";

const PropertiesPage = () => {
  const location = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [cityFilter, setCityFilter] = useState<string | null>(null);
  const [typeFilter, setTypeFilter] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  // Parse query parameters
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const city = params.get("city");
    const type = params.get("type");
    const status = params.get("status");

    if (city) setCityFilter(city);
    if (type) setTypeFilter(type);
    if (status) setStatusFilter(status);
  }, [location]);

  const handleSearch = () => {
    // This would update the URL with search parameters in a real app
    console.log("Searching for:", searchTerm);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">Properties</h1>
            <p className="text-muted-foreground">
              {cityFilter
                ? `Find your dream property in ${cityFilter.charAt(0).toUpperCase() + cityFilter.slice(1)}`
                : "Find your dream property in Gujarat"}
            </p>
          </div>

          <div className="flex gap-2 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Input
                placeholder="Search by location..."
                className="pl-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            </div>
            <Button onClick={handleSearch}>Search</Button>
          </div>
        </div>

        <PropertyGrid
          properties={allProperties}
          cityFilter={cityFilter || undefined}
          typeFilter={typeFilter || undefined}
          statusFilter={statusFilter || undefined}
        />
      </div>

      <Footer />
    </div>
  );
};

export default PropertiesPage;
