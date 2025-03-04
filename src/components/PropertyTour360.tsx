import React, { useEffect, useRef } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Loader2, Maximize2, RotateCw, ZoomIn, ZoomOut } from "lucide-react";
import { motion } from "framer-motion";

interface PropertyTour360Props {
  imageUrl: string;
  title?: string;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
}

const PropertyTour360 = ({
  imageUrl,
  title = "360° Virtual Tour",
  isFullscreen = false,
  onToggleFullscreen = () => {},
}: PropertyTour360Props) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewerRef = useRef<any>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [zoom, setZoom] = React.useState(100);
  const [isRotating, setIsRotating] = React.useState(false);

  useEffect(() => {
    // Load the Pannellum library dynamically
    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.js";
    script.async = true;

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href =
      "https://cdn.jsdelivr.net/npm/pannellum@2.5.6/build/pannellum.css";

    document.head.appendChild(link);
    document.body.appendChild(script);

    script.onload = initViewer;

    return () => {
      document.body.removeChild(script);
      document.head.removeChild(link);
      if (viewerRef.current) {
        viewerRef.current.destroy();
      }
    };
  }, [imageUrl]);

  useEffect(() => {
    // Handle resize when fullscreen changes
    if (viewerRef.current) {
      viewerRef.current.resize();
    }
  }, [isFullscreen]);

  const initViewer = () => {
    if (!containerRef.current || !window.pannellum) return;

    // Clear previous viewer if exists
    if (viewerRef.current) {
      viewerRef.current.destroy();
    }

    // Initialize the 360 viewer
    viewerRef.current = window.pannellum.viewer(containerRef.current.id, {
      type: "equirectangular",
      panorama: imageUrl,
      autoLoad: true,
      autoRotate: -2,
      compass: true,
      showFullscreenCtrl: false,
      showControls: false,
      hotSpots: [
        {
          pitch: -10,
          yaw: 30,
          type: "info",
          text: "Living Room",
        },
        {
          pitch: -15,
          yaw: 110,
          type: "info",
          text: "Kitchen",
        },
        {
          pitch: -20,
          yaw: 220,
          type: "info",
          text: "Bedroom",
        },
        {
          pitch: -5,
          yaw: 305,
          type: "info",
          text: "Balcony",
        },
      ],
      hfov: 100,
      minHfov: 50,
      maxHfov: 120,
      onLoad: () => {
        setIsLoading(false);
      },
    });
  };

  const handleZoomIn = () => {
    if (viewerRef.current && zoom < 150) {
      const newZoom = zoom + 10;
      setZoom(newZoom);
      viewerRef.current.setHfov(120 - (newZoom - 100) * 0.7);
    }
  };

  const handleZoomOut = () => {
    if (viewerRef.current && zoom > 50) {
      const newZoom = zoom - 10;
      setZoom(newZoom);
      viewerRef.current.setHfov(120 - (newZoom - 100) * 0.7);
    }
  };

  const toggleAutoRotate = () => {
    if (viewerRef.current) {
      if (isRotating) {
        viewerRef.current.stopAutoRotate();
      } else {
        viewerRef.current.startAutoRotate(-2);
      }
      setIsRotating(!isRotating);
    }
  };

  return (
    <Card
      className={`overflow-hidden ${isFullscreen ? "fixed inset-0 z-50 rounded-none" : "w-full"}`}
    >
      <div className="relative">
        <div
          id="panorama-container"
          ref={containerRef}
          className={`w-full ${isFullscreen ? "h-screen" : "h-[500px]"}`}
        >
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-10">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-2 text-primary" />
                <p className="text-sm font-medium">Loading 360° Tour...</p>
              </div>
            </div>
          )}
        </div>

        {/* Controls */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-sm rounded-full px-4 py-2 text-white z-20"
        >
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={handleZoomOut}
          >
            <ZoomOut className="h-5 w-5" />
          </Button>

          <div className="text-sm font-medium">{zoom}%</div>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={handleZoomIn}
          >
            <ZoomIn className="h-5 w-5" />
          </Button>

          <div className="w-px h-6 bg-white/30 mx-1"></div>

          <Button
            variant="ghost"
            size="icon"
            className={`text-white hover:bg-white/20 rounded-full ${isRotating ? "bg-white/20" : ""}`}
            onClick={toggleAutoRotate}
          >
            <RotateCw className="h-5 w-5" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20 rounded-full"
            onClick={onToggleFullscreen}
          >
            <Maximize2 className="h-5 w-5" />
          </Button>
        </motion.div>

        {/* Title */}
        <div className="absolute top-4 left-4 bg-black/50 backdrop-blur-sm rounded-md px-3 py-1.5 text-white z-20">
          <h3 className="text-sm font-medium">{title}</h3>
        </div>
      </div>
    </Card>
  );
};

export default PropertyTour360;
