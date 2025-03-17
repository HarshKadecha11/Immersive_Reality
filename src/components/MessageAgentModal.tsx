import React, { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface MessageAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  propertyTitle?: string;
}

const MessageAgentModal = ({
  isOpen,
  onClose,
  agentName = "Harsh Kadecha",
  propertyTitle = "Property",
}: MessageAgentModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { showNotification } = useNotification();
  const { user, isAuthenticated } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    if (!isAuthenticated || !user) {
      showNotification("Please login to message an agent", "error");
      setIsLoading(false);
      return;
    }

    try {
      // Save message to database
      const agentId = agentName.toLowerCase().replace(/\s+/g, "-");
      const propertyId = propertyTitle
        ? propertyTitle.toLowerCase().replace(/\s+/g, "-")
        : null;

      const { error } = await supabase.from("agent_contacts").insert({
        user_id: user.id,
        agent_id: agentId,
        property_id: propertyId,
        message: message,
        status: "sent",
        created_at: new Date(),
        updated_at: new Date(),
      });

      if (error) throw error;

      showNotification(
        `Message sent to ${agentName}! They will contact you soon.`,
        "success",
      );
      onClose();
    } catch (error: any) {
      console.error("Error sending message:", error);
      showNotification(error.message || "Failed to send message", "error");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Message {agentName}</DialogTitle>
          <DialogDescription>
            Send a message about {propertyTitle} to {agentName}.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Your Name</label>
            <Input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your full name"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Your phone number"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Message</label>
            <Textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={`I'm interested in this property and would like more information...`}
              rows={5}
            />
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Message"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageAgentModal;
