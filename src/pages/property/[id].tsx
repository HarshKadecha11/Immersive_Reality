import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PropertyDetails from "@/components/PropertyDetails";
import { supabase } from "@/lib/supabase";
import { Button } from "@/components/ui/button";

const PropertyPage = () => {
  const { id } = useParams<{ id: string }>();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;

      try {
        setLoading(true);
        // This would be replaced with actual Supabase query when DB is set up
        // const { data, error } = await supabase
        //   .from('properties')
        //   .select('*, agent:agents(*)')
        //   .eq('id', id)
        //   .single();

        // if (error) throw error;
        // setProperty(data);

        // For now, use default data
        setTimeout(() => {
          setProperty({
            id: id,
            title: "Luxury Villa in Ahmedabad",
            description:
              "This stunning luxury villa is located in the heart of Bodakdev, Ahmedabad. It features modern architecture, premium finishes, and spacious rooms with abundant natural light. The property includes a private garden, swimming pool, and covered parking for 2 cars.",
            price: 35000000,
            type: "Villa",
            location: "Bodakdev, Ahmedabad, Gujarat",
            coordinates: { lat: 23.0225, lng: 72.5714 },
            bedrooms: 4,
            bathrooms: 3,
            sqft: 2500,
            status: "For Sale",
          });
          setLoading(false);
        }, 1000);
      } catch (error) {
        console.error("Error fetching property:", error);
        setLoading(false);
      }
    };

    fetchProperty();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading property details...</p>
      </div>
    );
  }

  return <PropertyDetails {...property} />;
};

export default PropertyPage;
