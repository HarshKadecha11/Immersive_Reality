import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { User, Mail, MapPin, Phone, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface UserProfileFormProps {
  initialData?: {
    name?: string;
    email?: string;
    phone?: string;
    address?: string;
  };
  onProfileUpdate?: (data: any) => void;
}

const UserProfileForm = ({
  initialData = {},
  onProfileUpdate,
}: UserProfileFormProps) => {
  const { user } = useAuth();
  const { showNotification } = useNotification();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: initialData.name || user?.user_metadata?.name || "",
    email: initialData.email || user?.email || "",
    phone: initialData.phone || user?.user_metadata?.phone || "",
    address: initialData.address || user?.user_metadata?.address || "",
  });

  useEffect(() => {
    // Update form data if user changes
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: prev.name || user.user_metadata?.name || "",
        email: user.email || "",
        phone: prev.phone || user.user_metadata?.phone || "",
        address: prev.address || user.user_metadata?.address || "",
      }));
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Update user metadata in Supabase
      const { data, error } = await supabase.auth.updateUser({
        data: {
          name: formData.name,
          phone: formData.phone,
          address: formData.address,
        },
      });

      if (error) throw error;

      // Also update the users table if it exists
      if (user) {
        try {
          await supabase.from("users").upsert({
            id: user.id,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            address: formData.address,
            updated_at: new Date(),
          });
        } catch (dbError) {
          console.log(
            "Database update failed, but auth metadata was updated",
            dbError,
          );
        }
      }

      showNotification("Profile updated successfully!", "success");

      if (onProfileUpdate) {
        onProfileUpdate(data.user);
      }
    } catch (error: any) {
      console.error("Error updating profile:", error);
      showNotification(error.message || "Failed to update profile", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="name">Full Name</Label>
          <div className="relative">
            <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Your full name"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email Address</Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Your email address"
              className="pl-10"
              disabled
            />
          </div>
          <p className="text-xs text-muted-foreground">
            Email cannot be changed
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone">Phone Number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Your phone number"
              className="pl-10"
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Address</Label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              placeholder="Your address"
              className="pl-10"
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        className="bg-green-600 hover:bg-green-700"
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Saving...
          </>
        ) : (
          "Save Changes"
        )}
      </Button>
    </form>
  );
};

export default UserProfileForm;
