import React from "react";
import Navbar from "@/components/Navbar";
import PropertyGrid from "@/components/PropertyGrid";
import Footer from "@/components/Footer";

const PropertiesPage = () => {
  return (
    <div className="min-h-screen bg-background pt-16">
      <Navbar />
      <PropertyGrid />
      <Footer />
    </div>
  );
};

export default PropertiesPage;
