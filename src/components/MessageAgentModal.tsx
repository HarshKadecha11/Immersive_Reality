import React, { useState } from "react";
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

interface MessageAgentModalProps {
  isOpen: boolean;
  onClose: () => void;
  agentName?: string;
  propertyTitle?: string;
}

const MessageAgentModal = ({
  isOpen,
  onClose,
  agentName = "Agent",
  propertyTitle = "Property",
}: MessageAgentModalProps) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the message to the agent
    console.log({
      agentName,
      propertyTitle,
      name,
      email,
      phone,
      message,
    });

    // Show success message
    alert(
      `Your message has been sent to ${agentName}. They will contact you shortly.`,
    );
    onClose();
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
            <Button type="submit">Send Message</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default MessageAgentModal;
