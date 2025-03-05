import React from "react";
import { useParams } from "react-router-dom";
import PropertyDetails from "@/components/PropertyDetails";
import { getPropertyById } from "@/data/properties";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const property = id ? getPropertyById(id) : null;

  if (!property) {
    return <PropertyDetails id={id} />;
  }

  return (
    <PropertyDetails
      id={property.id}
      title={property.title}
      description={property.description}
      price={property.price}
      type={property.type}
      location={property.location}
      coordinates={property.coordinates}
      bedrooms={property.bedrooms}
      bathrooms={property.bathrooms}
      sqft={property.sqft}
      amenities={property.amenities}
      nearbyFacilities={property.nearbyFacilities}
      agent={property.agent}
      status={property.status}
      financingOptions={property.financingOptions}
      images={property.images}
    />
  );
};

export default PropertyPage;
