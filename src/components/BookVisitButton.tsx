import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Button } from "./ui/button";
import { Calendar, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface BookVisitButtonProps {
  propertyId: string;
  propertyTitle: string;
  onOpenScheduleModal: () => void;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg";
  className?: string;
}

const BookVisitButton = ({
  propertyId,
  propertyTitle,
  onOpenScheduleModal,
  variant = "default",
  size = "default",
  className = "",
}: BookVisitButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [isBooked, setIsBooked] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if user has already booked a visit
    const checkIfBooked = async () => {
      if (!isAuthenticated || !user) {
        setIsChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("property_visits")
          .select("*")
          .eq("user_id", user.id)
          .eq("property_id", propertyId)
          .order("visit_date", { ascending: true })
          .limit(1);

        if (error) {
          console.error("Error checking booked visits:", error);
        }

        // Check if there's a future booking
        const hasUpcomingVisit =
          data && data.length > 0 && new Date(data[0].visit_date) > new Date();
        setIsBooked(hasUpcomingVisit);
      } catch (error) {
        console.error("Error checking booked visits:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkIfBooked();
  }, [propertyId, user, isAuthenticated]);

  const handleClick = () => {
    if (!isAuthenticated) {
      showNotification("Please login to schedule a visit", "info");
      return;
    }

    onOpenScheduleModal();
  };

  if (isChecking) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="h-4 w-4 animate-spin mr-2" />
        Checking...
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={handleClick}
    >
      <Calendar className="h-4 w-4 mr-2" />
      {isBooked ? "View Scheduled Visit" : "Schedule a Visit"}
    </Button>
  );
};

export default BookVisitButton;
