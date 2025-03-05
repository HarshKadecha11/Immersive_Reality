import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Camera, Loader2, User } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface ProfilePictureUploadProps {
  onUpdate?: (avatarUrl: string) => void;
  size?: "sm" | "md" | "lg" | "xl";
}

const ProfilePictureUpload = ({
  onUpdate,
  size = "lg",
}: ProfilePictureUploadProps) => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isUploading, setIsUploading] = useState(false);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(
    user?.user_metadata?.avatar_url || null,
  );

  // Size mapping
  const sizeMap = {
    sm: "h-16 w-16",
    md: "h-24 w-24",
    lg: "h-32 w-32",
    xl: "h-40 w-40",
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !user) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      showNotification("Please select an image file", "error");
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      showNotification("Image size should be less than 5MB", "error");
      return;
    }

    setIsUploading(true);

    try {
      // Upload to Supabase Storage
      const fileName = `avatar-${user.id}-${Date.now()}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Get public URL
      const { data: urlData } = supabase.storage
        .from("avatars")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      // Update user metadata
      const { error: updateError } = await supabase.auth.updateUser({
        data: { avatar_url: publicUrl },
      });

      if (updateError) throw updateError;

      setAvatarUrl(publicUrl);
      if (onUpdate) onUpdate(publicUrl);

      showNotification("Profile picture updated successfully", "success");
    } catch (error: any) {
      console.error("Error uploading profile picture:", error);
      showNotification(
        error.message || "Failed to upload profile picture",
        "error",
      );
    } finally {
      setIsUploading(false);
    }
  };

  // For demo purposes, use a random avatar if no custom one is set
  const getAvatarUrl = () => {
    if (avatarUrl) return avatarUrl;
    return user
      ? `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.id}`
      : "https://api.dicebear.com/7.x/avataaars/svg?seed=default";
  };

  return (
    <div className="relative">
      <Avatar className={sizeMap[size]}>
        <AvatarImage src={getAvatarUrl()} />
        <AvatarFallback>
          <User
            className={size === "lg" || size === "xl" ? "h-12 w-12" : "h-6 w-6"}
          />
        </AvatarFallback>
      </Avatar>

      <div className="absolute bottom-0 right-0">
        <Button
          size="icon"
          className="rounded-full bg-green-600 hover:bg-green-700 relative overflow-hidden"
          disabled={isUploading}
        >
          {isUploading ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <>
              <Camera className="h-4 w-4" />
              <input
                type="file"
                accept="image/*"
                className="absolute inset-0 opacity-0 cursor-pointer"
                onChange={handleFileChange}
                disabled={isUploading}
              />
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProfilePictureUpload;
