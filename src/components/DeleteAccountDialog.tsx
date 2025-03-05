import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface DeleteAccountDialogProps {
  isOpen: boolean;
  onClose: () => void;
}

const DeleteAccountDialog = ({ isOpen, onClose }: DeleteAccountDialogProps) => {
  const { user, signOut } = useAuth();
  const { showNotification } = useNotification();
  const [confirmation, setConfirmation] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleDeleteAccount = async () => {
    if (!user) return;

    if (confirmation !== "DELETE") {
      showNotification(
        "Please type DELETE to confirm account deletion",
        "error",
      );
      return;
    }

    setIsLoading(true);

    try {
      // First delete from users table if it exists
      try {
        await supabase.from("users").delete().eq("id", user.id);
      } catch (dbError) {
        console.log("Database delete failed or table doesn't exist", dbError);
      }

      // Then delete the auth user
      const { error } = await supabase.auth.admin.deleteUser(user.id);

      if (error) throw error;

      showNotification("Your account has been deleted successfully", "success");
      await signOut();
      window.location.href = "/";
    } catch (error: any) {
      console.error("Error deleting account:", error);
      showNotification(error.message || "Failed to delete account", "error");
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle className="text-red-600">
            Delete Account
          </AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="py-4">
          <Label htmlFor="confirmation" className="text-sm font-medium">
            Type <span className="font-bold">DELETE</span> to confirm
          </Label>
          <Input
            id="confirmation"
            value={confirmation}
            onChange={(e) => setConfirmation(e.target.value)}
            className="mt-2"
            placeholder="DELETE"
          />
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            variant="destructive"
            onClick={handleDeleteAccount}
            disabled={isLoading || confirmation !== "DELETE"}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Deleting...
              </>
            ) : (
              "Delete Account"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteAccountDialog;
