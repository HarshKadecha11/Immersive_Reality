import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Star, MapPin, Phone, Mail, Search, Filter } from "lucide-react";

const AgentsPage = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    // Show a funny notification when agents page loads
    showNotification(
      "🕵️ Our agents can find houses so well they're banned from playing hide and seek!",
      "info",
      5000,
    );
  }, [showNotification]);
  const agents = [
    {
      id: "1",
      name: "Rahul Sharma",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rahul",
      rating: 4.8,
      experience: 8,
      propertiesSold: 124,
      specialization: "Residential",
      city: "Ahmedabad",
      phone: "+91 98765 43210",
      email: "rahul@estatevista.com",
    },
    {
      id: "2",
      name: "Priya Patel",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=priya",
      rating: 4.9,
      experience: 10,
      propertiesSold: 156,
      specialization: "Luxury Homes",
      city: "Surat",
      phone: "+91 98765 43211",
      email: "priya@estatevista.com",
    },
    {
      id: "3",
      name: "Amit Desai",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=amit",
      rating: 4.7,
      experience: 6,
      propertiesSold: 98,
      specialization: "Commercial",
      city: "Vadodara",
      phone: "+91 98765 43212",
      email: "amit@estatevista.com",
    },
    {
      id: "4",
      name: "Neha Mehta",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=neha",
      rating: 4.6,
      experience: 5,
      propertiesSold: 76,
      specialization: "Residential",
      city: "Rajkot",
      phone: "+91 98765 43213",
      email: "neha@estatevista.com",
    },
    {
      id: "5",
      name: "Vikram Singh",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=vikram",
      rating: 4.9,
      experience: 12,
      propertiesSold: 210,
      specialization: "Luxury Homes",
      city: "Ahmedabad",
      phone: "+91 98765 43214",
      email: "vikram@estatevista.com",
    },
    {
      id: "6",
      name: "Meera Joshi",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=meera",
      rating: 4.8,
      experience: 7,
      propertiesSold: 112,
      specialization: "Commercial",
      city: "Surat",
      phone: "+91 98765 43215",
      email: "meera@estatevista.com",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-2">Find Real Estate Agents</h1>
        <p className="text-muted-foreground mb-8">
          Connect with the top real estate professionals across Gujarat
        </p>

        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Input
              placeholder="Search by name, city, or specialization"
              className="pl-10"
            />
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button>Search</Button>
          </div>
        </div>

        {/* Agent Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {agents.map((agent, index) => (
            <motion.div
              key={agent.id}
              whileHover={{ y: -10 }}
              whileTap={{ scale: 0.98 }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-0">
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <div className="h-16 w-16 rounded-full overflow-hidden bg-muted">
                        <img
                          src={agent.photo}
                          alt={agent.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-semibold text-lg">{agent.name}</h3>
                        <div className="flex items-center gap-1 text-amber-500">
                          <Star className="fill-amber-500 h-4 w-4" />
                          <span className="text-sm">{agent.rating}</span>
                          <span className="text-xs text-muted-foreground ml-1">
                            ({agent.propertiesSold} sales)
                          </span>
                        </div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <MapPin className="h-3 w-3 mr-1" />
                          {agent.city}
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid grid-cols-2 gap-2">
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">
                          Experience
                        </p>
                        <p className="font-medium">{agent.experience} years</p>
                      </div>
                      <div className="bg-muted p-2 rounded-md text-center">
                        <p className="text-xs text-muted-foreground">
                          Specialization
                        </p>
                        <p className="font-medium">{agent.specialization}</p>
                      </div>
                    </div>

                    <div className="mt-4 space-y-2">
                      <div className="flex items-center text-sm">
                        <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{agent.phone}</span>
                      </div>
                      <div className="flex items-center text-sm">
                        <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                        <span>{agent.email}</span>
                      </div>
                    </div>
                  </div>

                  <div className="border-t p-4 flex justify-between">
                    <Badge variant="outline">
                      {agent.propertiesSold} Properties Sold
                    </Badge>
                    <Button
                      size="sm"
                      onClick={() =>
                        showNotification(
                          `📱 ${agent.name} is currently pretending to be busy to seem important. Try again in 5 minutes!`,
                          "warning",
                          4000,
                        )
                      }
                    >
                      Contact
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-8">
          <Button variant="outline" size="sm" className="mx-1">
            1
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            2
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            3
          </Button>
          <Button variant="outline" size="sm" className="mx-1">
            Next
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AgentsPage;
