import React, { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent } from "./ui/card";
import { MapPin, Search, X } from "lucide-react";

interface MapSearchProps {
  onLocationSelect?: (location: {
    address: string;
    coordinates: { lat: number; lng: number };
  }) => void;
}

const MapSearch = ({ onLocationSelect }: MapSearchProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);
  const markersRef = useRef<google.maps.Marker[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<{
    address: string;
    coordinates: { lat: number; lng: number };
  } | null>(null);

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
      // Clean up markers
      if (markersRef.current) {
        markersRef.current.forEach((marker) => marker.setMap(null));
      }
    };
  }, []);

  const initializeMap = () => {
    if (!mapRef.current || !window.google) return;

    // Default to Gujarat, India
    const defaultLocation = { lat: 22.2587, lng: 71.1924 };

    // Create map instance
    const mapOptions: google.maps.MapOptions = {
      center: defaultLocation,
      zoom: 8,
      mapTypeControl: false,
      fullscreenControl: true,
      streetViewControl: true,
      zoomControl: true,
    };

    mapInstanceRef.current = new window.google.maps.Map(
      mapRef.current,
      mapOptions,
    );

    // Create search box
    const input = document.getElementById(
      "map-search-input",
    ) as HTMLInputElement;
    searchBoxRef.current = new window.google.maps.places.SearchBox(input);

    // Bias the SearchBox results towards current map's viewport
    mapInstanceRef.current.addListener("bounds_changed", () => {
      if (searchBoxRef.current && mapInstanceRef.current) {
        searchBoxRef.current.setBounds(
          mapInstanceRef.current.getBounds() as google.maps.LatLngBounds,
        );
      }
    });

    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place
    searchBoxRef.current.addListener("places_changed", () => {
      if (!searchBoxRef.current || !mapInstanceRef.current) return;

      const places = searchBoxRef.current.getPlaces();

      if (!places || places.length === 0) return;

      // Clear existing markers
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];

      // For each place, get the icon, name and location
      const bounds = new window.google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) return;

        // Create a marker for each place
        const marker = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          title: place.name,
          position: place.geometry.location,
          animation: window.google.maps.Animation.DROP,
        });

        markersRef.current.push(marker);

        // Set selected location
        const newLocation = {
          address: place.formatted_address || place.name || "",
          coordinates: {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
          },
        };

        setSelectedLocation(newLocation);
        if (onLocationSelect) {
          onLocationSelect(newLocation);
        }

        if (place.geometry.viewport) {
          // Only geocodes have viewport
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });

      mapInstanceRef.current.fitBounds(bounds);
    });

    // Add click listener to map
    mapInstanceRef.current.addListener(
      "click",
      (event: google.maps.MapMouseEvent) => {
        if (!event.latLng || !mapInstanceRef.current) return;

        // Clear existing markers
        markersRef.current.forEach((marker) => marker.setMap(null));
        markersRef.current = [];

        // Create a marker at the clicked location
        const marker = new window.google.maps.Marker({
          map: mapInstanceRef.current,
          position: event.latLng,
          animation: window.google.maps.Animation.DROP,
        });

        markersRef.current.push(marker);

        // Get address from coordinates (reverse geocoding)
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ location: event.latLng }, (results, status) => {
          if (status === "OK" && results && results[0]) {
            const newLocation = {
              address: results[0].formatted_address,
              coordinates: {
                lat: event.latLng.lat(),
                lng: event.latLng.lng(),
              },
            };

            setSelectedLocation(newLocation);
            setSearchValue(results[0].formatted_address);
            if (onLocationSelect) {
              onLocationSelect(newLocation);
            }
          }
        });
      },
    );
  };

  const clearSearch = () => {
    setSearchValue("");
    setSelectedLocation(null);

    // Clear existing markers
    if (markersRef.current) {
      markersRef.current.forEach((marker) => marker.setMap(null));
      markersRef.current = [];
    }

    // Reset map view to Gujarat
    if (mapInstanceRef.current) {
      mapInstanceRef.current.setCenter({ lat: 22.2587, lng: 71.1924 });
      mapInstanceRef.current.setZoom(8);
    }

    if (onLocationSelect) {
      onLocationSelect(null);
    }
  };

  return (
    <div className="w-full space-y-4">
      <div className="relative">
        <Input
          id="map-search-input"
          placeholder="Search for a location in Gujarat..."
          className="pl-10 pr-10"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        {searchValue && (
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-8 w-8"
            onClick={clearSearch}
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {selectedLocation && (
        <Card className="bg-muted">
          <CardContent className="p-4">
            <div className="flex items-start gap-2">
              <MapPin className="h-5 w-5 text-primary mt-0.5" />
              <div>
                <p className="font-medium">Selected Location</p>
                <p className="text-sm text-muted-foreground">
                  {selectedLocation.address}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="w-full h-[500px] rounded-lg overflow-hidden border">
        <div ref={mapRef} className="w-full h-full">
          <div className="w-full h-full flex items-center justify-center">
            <p className="text-muted-foreground">Loading map...</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapSearch;
