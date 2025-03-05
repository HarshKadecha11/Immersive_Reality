import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Button } from "./ui/button";
import { Bookmark, BookmarkCheck, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface SavePropertyButtonProps {
  propertyId: string;
  variant?: "default" | "outline" | "ghost";
  size?: "default" | "sm" | "lg" | "icon";
  className?: string;
}

const SavePropertyButton = ({
  propertyId,
  variant = "outline",
  size = "default",
  className = "",
}: SavePropertyButtonProps) => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [isSaved, setIsSaved] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isChecking, setIsChecking] = useState(true);

  useEffect(() => {
    // Check if property is already saved
    const checkIfSaved = async () => {
      if (!isAuthenticated || !user) {
        setIsChecking(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from("saved_properties")
          .select("*")
          .eq("user_id", user.id)
          .eq("property_id", propertyId)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error checking saved property:", error);
        }

        setIsSaved(!!data);
      } catch (error) {
        console.error("Error checking saved property:", error);
      } finally {
        setIsChecking(false);
      }
    };

    checkIfSaved();
  }, [propertyId, user, isAuthenticated]);

  const toggleSave = async () => {
    if (!isAuthenticated) {
      showNotification("Please login to save properties", "info");
      return;
    }

    setIsLoading(true);

    try {
      if (isSaved) {
        // Remove from saved properties
        const { error } = await supabase
          .from("saved_properties")
          .delete()
          .eq("user_id", user!.id)
          .eq("property_id", propertyId);

        if (error) throw error;

        setIsSaved(false);
        showNotification("Property removed from saved list", "info");
      } else {
        // Add to saved properties
        const { error } = await supabase.from("saved_properties").insert({
          user_id: user!.id,
          property_id: propertyId,
          saved_at: new Date(),
        });

        if (error) throw error;

        setIsSaved(true);
        showNotification("Property saved successfully!", "success");
      }
    } catch (error: any) {
      console.error("Error saving property:", error);
      showNotification(error.message || "Failed to save property", "error");
    } finally {
      setIsLoading(false);
    }
  };

  if (isChecking) {
    return (
      <Button variant={variant} size={size} className={className} disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      size={size}
      className={className}
      onClick={toggleSave}
      disabled={isLoading}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : isSaved ? (
        <>
          <BookmarkCheck className="h-4 w-4 mr-2" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4 mr-2" />
          Save
        </>
      )}
    </Button>
  );
};

export default SavePropertyButton;
