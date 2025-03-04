import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Building2,
  Users,
  Award,
  Target,
  MapPin,
  Phone,
  Mail,
} from "lucide-react";

const AboutPage = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    // Show a funny notification when about page loads
    showNotification(
      "👋 Our CEO once sold a house to a ghost. Great client, never complained about the neighbors!",
      "info",
      6000,
    );
  }, [showNotification]);

  const teamMembers = [
    {
      name: "Rajesh Patel",
      position: "Founder & CEO",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=rajesh",
      bio: "With over 20 years of experience in real estate, Rajesh founded EstateVista with a vision to transform property buying in Gujarat.",
    },
    {
      name: "Anita Sharma",
      position: "Chief Operating Officer",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=anita",
      bio: "Anita oversees all operations and ensures that EstateVista delivers exceptional service to every client.",
    },
    {
      name: "Suresh Mehta",
      position: "Head of Sales",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=suresh",
      bio: "Suresh leads our sales team with a customer-first approach and deep knowledge of Gujarat's property market.",
    },
    {
      name: "Priya Desai",
      position: "Marketing Director",
      photo: "https://api.dicebear.com/7.x/avataaars/svg?seed=priyad",
      bio: "Priya brings creative marketing strategies that have established EstateVista as a leading real estate brand in Gujarat.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold mb-4">About EstateVista</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your trusted partner in finding the perfect property across Gujarat
            since 2010
          </p>
        </div>

        {/* Our Story */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mb-20">
          <div>
            <h2 className="text-3xl font-semibold mb-6">Our Story</h2>
            <p className="text-muted-foreground mb-4">
              Founded in 2010, EstateVista began with a simple mission: to make
              property buying and selling in Gujarat transparent, efficient, and
              enjoyable. What started as a small team of passionate real estate
              professionals has grown into Gujarat's most trusted property
              platform.
            </p>
            <p className="text-muted-foreground mb-4">
              Over the years, we've helped thousands of families find their
              dream homes and investors discover valuable opportunities across
              Ahmedabad, Surat, Vadodara, Rajkot, and other cities in Gujarat.
            </p>
            <p className="text-muted-foreground">
              Today, we combine deep local expertise with cutting-edge
              technology to provide an unmatched real estate experience. From
              immersive virtual tours to AI-powered property recommendations,
              we're constantly innovating to serve you better.
            </p>
          </div>
          <div className="rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800"
              alt="EstateVista office"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Our Values */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: <Users className="h-8 w-8 text-primary" />,
                title: "Client First",
                description:
                  "We prioritize your needs and preferences above all else, ensuring a personalized experience.",
              },
              {
                icon: <Award className="h-8 w-8 text-primary" />,
                title: "Excellence",
                description:
                  "We strive for excellence in every interaction, transaction, and service we provide.",
              },
              {
                icon: <Building2 className="h-8 w-8 text-primary" />,
                title: "Integrity",
                description:
                  "Honesty and transparency are the foundations of our business relationships.",
              },
              {
                icon: <Target className="h-8 w-8 text-primary" />,
                title: "Innovation",
                description:
                  "We continuously adopt new technologies to enhance your property search experience.",
              },
            ].map((value, index) => (
              <Card key={index}>
                <CardContent className="pt-6">
                  <div className="mb-4">{value.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Our Team */}
        <div className="mb-20">
          <h2 className="text-3xl font-semibold mb-10 text-center">
            Meet Our Leadership Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5, scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                onClick={() =>
                  showNotification(
                    `🎉 Fun fact: ${member.name} can find a house faster than you can say "mortgage approval"!`,
                    "success",
                    4000,
                  )
                }
              >
                <Card>
                  <CardContent className="pt-6 text-center">
                    <div className="w-24 h-24 rounded-full overflow-hidden mx-auto mb-4">
                      <img
                        src={member.photo}
                        alt={member.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <h3 className="text-xl font-semibold">{member.name}</h3>
                    <p className="text-primary mb-3">{member.position}</p>
                    <p className="text-sm text-muted-foreground">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="bg-muted rounded-lg p-8 mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { number: "10,000+", label: "Happy Clients" },
              { number: "15,000+", label: "Properties Sold" },
              { number: "14", label: "Years of Experience" },
              { number: "20+", label: "Cities Covered" },
            ].map((stat, index) => (
              <div key={index}>
                <p className="text-4xl font-bold text-primary mb-2">
                  {stat.number}
                </p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Contact Us */}
        <div className="bg-card rounded-lg p-8 border">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div>
              <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
              <p className="text-muted-foreground mb-6">
                Have questions about our services or want to join our team? We'd
                love to hear from you.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                  <div>
                    <p className="font-medium">Head Office</p>
                    <p className="text-muted-foreground">
                      123 Business Hub, Bodakdev, Ahmedabad, Gujarat 380054
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Phone className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <Mail className="h-5 w-5 text-primary mr-3" />
                  <div>
                    <p className="font-medium">Email</p>
                    <p className="text-muted-foreground">
                      contact@estatevista.com
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Name</label>
                    <input
                      type="text"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium">Subject</label>
                  <input
                    type="text"
                    className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Message</label>
                  <textarea
                    rows={4}
                    className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  ></textarea>
                </div>
                <Button>Send Message</Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
