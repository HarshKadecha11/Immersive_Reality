import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2, MessageSquare, Phone, Mail, User, Clock } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface AgentContact {
  id: string;
  agent_id: string;
  property_id: string | null;
  message: string;
  status: "sent" | "replied" | "closed";
  created_at: string;
  updated_at: string;
  agent: {
    id: string;
    name: string;
    email: string;
    phone: string;
    photo: string;
  };
  property?: {
    id: string;
    title: string;
  } | null;
}

const AgentContactsList = () => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [contacts, setContacts] = useState<AgentContact[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchContacts = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to get agent contacts with joined agent and property data
        const { data, error } = await supabase
          .from("agent_contacts")
          .select(
            `
            id, agent_id, property_id, message, status, created_at, updated_at,
            agent:agents(id, name, email, phone, photo),
            property:properties(id, title)
          `,
          )
          .eq("user_id", user.id)
          .order("created_at", { ascending: false });

        if (error) {
          console.error("Error fetching agent contacts:", error);
          // If the join fails, fall back to just agent_contacts
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("agent_contacts")
            .select(
              "id, agent_id, property_id, message, status, created_at, updated_at",
            )
            .eq("user_id", user.id)
            .order("created_at", { ascending: false });

          if (fallbackError) throw fallbackError;

          // Create mock agent and property data for demo purposes
          setContacts(
            (fallbackData || []).map((item) => ({
              ...item,
              agent: {
                id: item.agent_id,
                name: item.agent_id.includes("harsh")
                  ? "Harsh Kadecha"
                  : "Abhay Kunpara",
                email: item.agent_id.includes("harsh")
                  ? "2022002415.gcet@cvmu.edu.in"
                  : "2022002431.gcet@cvmu.edu.in",
                phone: item.agent_id.includes("harsh")
                  ? "+91 78638 20635"
                  : "+91 83201 00603",
                photo: `https://api.dicebear.com/7.x/avataaars/svg?seed=${item.agent_id}`,
              },
              property: item.property_id
                ? {
                    id: item.property_id,
                    title: "Property " + item.property_id.substring(0, 5),
                  }
                : null,
            })),
          );
        } else {
          setContacts(data || []);
        }
      } catch (error) {
        console.error("Error fetching agent contacts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchContacts();
  }, [user, isAuthenticated]);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "sent":
        return <Badge className="bg-blue-500">Sent</Badge>;
      case "replied":
        return <Badge className="bg-green-500">Replied</Badge>;
      case "closed":
        return <Badge className="bg-gray-500">Closed</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-green-600" />
      </div>
    );
  }

  if (contacts.length === 0) {
    return (
      <div className="text-center py-12">
        <MessageSquare className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Agent Communications</h3>
        <p className="text-muted-foreground mb-6">
          You haven't contacted any agents yet.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => (window.location.href = "/agents")}
        >
          Find Agents
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {contacts.map((contact) => (
        <Card key={contact.id} className="overflow-hidden">
          <CardContent className="p-4 md:p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="md:w-1/4 flex flex-col items-center text-center">
                <div className="h-20 w-20 rounded-full overflow-hidden mb-2">
                  <img
                    src={contact.agent.photo}
                    alt={contact.agent.name}
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="font-semibold">{contact.agent.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">
                  Property Agent
                </p>

                <div className="flex flex-col gap-2 mt-2 w-full">
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                    onClick={() =>
                      (window.location.href = `tel:${contact.agent.phone}`)
                    }
                  >
                    <Phone className="h-4 w-4" />
                    <span className="text-xs">{contact.agent.phone}</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="flex items-center justify-center gap-2"
                    onClick={() =>
                      (window.location.href = `mailto:${contact.agent.email}`)
                    }
                  >
                    <Mail className="h-4 w-4" />
                    <span className="text-xs truncate max-w-[120px]">
                      {contact.agent.email}
                    </span>
                  </Button>
                </div>
              </div>

              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold">
                        Message to Agent
                      </h3>
                      {getStatusBadge(contact.status)}
                    </div>
                    {contact.property && (
                      <p className="text-sm text-muted-foreground">
                        Regarding: {contact.property.title}
                      </p>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {new Date(contact.created_at).toLocaleString()}
                  </div>
                </div>

                <div className="bg-muted p-3 rounded-lg my-3">
                  <p className="whitespace-pre-wrap">{contact.message}</p>
                </div>

                {contact.status === "replied" && (
                  <div className="mt-4">
                    <h4 className="text-sm font-semibold mb-2">
                      Agent Response:
                    </h4>
                    <div className="bg-green-50 p-3 rounded-lg">
                      <p className="text-sm">
                        Thank you for your interest! I'll be happy to assist you
                        with this property. Would you like to schedule a call or
                        visit?
                      </p>
                    </div>
                  </div>
                )}

                <div className="mt-4 flex justify-end">
                  <Button
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => {
                      if (contact.property) {
                        window.location.href = `/property/${contact.property.id}`;
                      } else {
                        window.location.href = `/agents/${contact.agent.id}`;
                      }
                    }}
                  >
                    {contact.property ? "View Property" : "View Agent Profile"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgentContactsList;
