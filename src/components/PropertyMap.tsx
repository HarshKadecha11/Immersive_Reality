import React, { useEffect, useRef } from "react";

interface PropertyMapProps {
  location: string;
  coordinates: { lat: number; lng: number };
  zoom?: number;
}

const PropertyMap = ({
  location,
  coordinates,
  zoom = 15,
}: PropertyMapProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    // Initialize map directly without loading script
    // The script will be loaded in the HTML head
    const loadMap = () => {
      if (window.google) {
        initializeMap();
      } else {
        setTimeout(loadMap, 100); // Check again in 100ms
      }
    };

    loadMap();

    return () => {
      // Clean up if needed
    };
  }, [coordinates]);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Create map instance
    const mapOptions: google.maps.MapOptions = {
      center: coordinates,
      zoom,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
    };

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions,
    );

    // Add marker for the property
    new window.google.maps.Marker({
      position: coordinates,
      map: mapInstanceRef.current,
      title: location,
      animation: window.google.maps.Animation.DROP,
    });
  };

  return (
    <div className="w-full h-full bg-gray-100 rounded-lg">
      {/* Fallback content while map loads */}
      <div className="w-full h-full flex items-center justify-center">
        <div ref={mapRef} className="w-full h-full">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyMap;
