import React, { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useNotification } from "@/components/NotificationProvider";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Loader2, Calendar, Clock, MapPin, Home, Eye, X } from "lucide-react";
import { supabase } from "@/lib/supabase";

interface PropertyVisit {
  id: string;
  property_id: string;
  visit_date: string;
  visit_time: string;
  status: "scheduled" | "completed" | "cancelled";
  notes: string | null;
  created_at: string;
  property: {
    id: string;
    title: string;
    location: string;
    imageUrl: string;
  };
}

const PropertyVisitsList = () => {
  const { user, isAuthenticated } = useAuth();
  const { showNotification } = useNotification();
  const [visits, setVisits] = useState<PropertyVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchVisits = async () => {
      if (!isAuthenticated || !user) {
        setIsLoading(false);
        return;
      }

      try {
        // Try to get visits with joined property data
        const { data, error } = await supabase
          .from("property_visits")
          .select(
            `
            id, property_id, visit_date, visit_time, status, notes, created_at,
            property:properties(id, title, location, imageUrl)
          `,
          )
          .eq("user_id", user.id)
          .order("visit_date", { ascending: true });

        if (error) {
          console.error("Error fetching property visits:", error);
          // If the join fails, fall back to just property_visits
          const { data: fallbackData, error: fallbackError } = await supabase
            .from("property_visits")
            .select(
              "id, property_id, visit_date, visit_time, status, notes, created_at",
            )
            .eq("user_id", user.id)
            .order("visit_date", { ascending: true });

          if (fallbackError) throw fallbackError;

          // Create mock property data for demo purposes
          setVisits(
            (fallbackData || []).map((item) => ({
              ...item,
              property: {
                id: item.property_id,
                title: "Property " + item.property_id.substring(0, 5),
                location: "Gujarat",
                imageUrl: `https://images.unsplash.com/photo-${1600585154340 + (parseInt(item.property_id.substring(0, 5), 16) % 10000)}-be6161a56a0c?w=400&q=80`,
              },
            })),
          );
        } else {
          setVisits(data || []);
        }
      } catch (error) {
        console.error("Error fetching property visits:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVisits();
  }, [user, isAuthenticated]);

  const cancelVisit = async (visitId: string) => {
    try {
      const { error } = await supabase
        .from("property_visits")
        .update({ status: "cancelled" })
        .eq("id", visitId);

      if (error) throw error;

      setVisits((prev) =>
        prev.map((visit) =>
          visit.id === visitId ? { ...visit, status: "cancelled" } : visit,
        ),
      );
      showNotification("Visit cancelled successfully", "success");
    } catch (error: any) {
      console.error("Error cancelling visit:", error);
      showNotification(error.message || "Failed to cancel visit", "error");
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "scheduled":
        return <Badge className="bg-green-500">Scheduled</Badge>;
      case "completed":
        return <Badge className="bg-blue-500">Completed</Badge>;
      case "cancelled":
        return <Badge className="bg-red-500">Cancelled</Badge>;
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

  if (visits.length === 0) {
    return (
      <div className="text-center py-12">
        <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
        <h3 className="text-lg font-medium mb-2">No Property Visits</h3>
        <p className="text-muted-foreground mb-6">
          You haven't scheduled any property visits yet.
        </p>
        <Button
          className="bg-green-600 hover:bg-green-700"
          onClick={() => (window.location.href = "/properties")}
        >
          Browse Properties
        </Button>
      </div>
    );
  }

  // Group visits by status
  const upcomingVisits = visits.filter(
    (visit) =>
      visit.status === "scheduled" && new Date(visit.visit_date) >= new Date(),
  );
  const pastVisits = visits.filter(
    (visit) =>
      visit.status === "completed" || new Date(visit.visit_date) < new Date(),
  );
  const cancelledVisits = visits.filter(
    (visit) => visit.status === "cancelled",
  );

  return (
    <div className="space-y-8">
      {upcomingVisits.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Upcoming Visits</h3>
          <div className="space-y-4">
            {upcomingVisits.map((visit) => (
              <Card key={visit.id} className="overflow-hidden">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-32 md:h-auto relative">
                    <img
                      src={visit.property.imageUrl}
                      alt={visit.property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">
                        {visit.property.title}
                      </h3>
                      {getStatusBadge(visit.status)}
                    </div>
                    <p className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />{" "}
                      {visit.property.location}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-green-600" />
                        <span>
                          {new Date(visit.visit_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                        <span>{visit.visit_time}</span>
                      </div>
                    </div>

                    {visit.notes && (
                      <p className="text-sm text-muted-foreground mb-4">
                        <strong>Notes:</strong> {visit.notes}
                      </p>
                    )}

                    <div className="flex justify-between items-center">
                      <Button
                        variant="outline"
                        size="sm"
                        className="text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600"
                        onClick={() => cancelVisit(visit.id)}
                      >
                        <X className="h-4 w-4 mr-2" /> Cancel Visit
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() =>
                          (window.location.href = `/property/${visit.property.id}`)
                        }
                      >
                        <Eye className="h-4 w-4 mr-2" /> View Property
                      </Button>
                    </div>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {pastVisits.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Past Visits</h3>
          <div className="space-y-4">
            {pastVisits.map((visit) => (
              <Card key={visit.id} className="overflow-hidden opacity-80">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-32 md:h-auto relative">
                    <img
                      src={visit.property.imageUrl}
                      alt={visit.property.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">
                        {visit.property.title}
                      </h3>
                      {getStatusBadge(
                        visit.status === "scheduled"
                          ? "completed"
                          : visit.status,
                      )}
                    </div>
                    <p className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />{" "}
                      {visit.property.location}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-green-600" />
                        <span>
                          {new Date(visit.visit_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                        <span>{visit.visit_time}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      className="bg-green-600 hover:bg-green-700"
                      onClick={() =>
                        (window.location.href = `/property/${visit.property.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" /> View Property
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}

      {cancelledVisits.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold mb-4">Cancelled Visits</h3>
          <div className="space-y-4">
            {cancelledVisits.map((visit) => (
              <Card key={visit.id} className="overflow-hidden opacity-60">
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/4 h-32 md:h-auto relative">
                    <img
                      src={visit.property.imageUrl}
                      alt={visit.property.title}
                      className="w-full h-full object-cover grayscale"
                    />
                  </div>
                  <CardContent className="p-4 md:p-6 flex-1">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold">
                        {visit.property.title}
                      </h3>
                      {getStatusBadge(visit.status)}
                    </div>
                    <p className="flex items-center text-muted-foreground text-sm mb-4">
                      <MapPin className="h-4 w-4 mr-1" />{" "}
                      {visit.property.location}
                    </p>

                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2 text-green-600" />
                        <span>
                          {new Date(visit.visit_date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="h-4 w-4 mr-2 text-green-600" />
                        <span>{visit.visit_time}</span>
                      </div>
                    </div>

                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        (window.location.href = `/property/${visit.property.id}`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-2" /> View Property
                    </Button>
                  </CardContent>
                </div>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyVisitsList;
