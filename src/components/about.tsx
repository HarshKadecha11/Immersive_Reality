import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Linkedin } from "lucide-react";

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto text-center mb-12"
        >
          <h1 className="text-4xl font-bold mb-4">About EstateVista</h1>
          <p className="text-xl text-muted-foreground">
            Your trusted partner in finding the perfect property across Gujarat.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <img
              src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&q=80"
              alt="Our Office"
              className="rounded-lg shadow-xl w-full"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <p className="text-lg mb-4">
              EstateVista was founded with a vision to transform the real estate
              experience in Gujarat. We believe that finding your dream property
              should be an exciting journey, not a stressful process.
            </p>
            <p className="text-lg mb-6">
              Our platform combines cutting-edge technology with local expertise
              to provide you with the most comprehensive property listings and
              tools to make informed decisions.
            </p>
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => (window.location.href = "/contact")}
            >
              Get in Touch
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col items-center p-6 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=harsh"
                      alt="Harsh Kadecha"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Harsh Kadecha</h3>
                  <p className="text-green-600 font-medium mb-4">
                    Founder & CEO
                  </p>
                  <p className="text-muted-foreground mb-6">
                    With over 20 years of experience in real estate, Harsh
                    founded EstateVista with a vision to transform property
                    buying in Gujarat.
                  </p>
                  <a
                    href="https://www.linkedin.com/in/harsh-kadecha-20b288330/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn Profile
                  </a>
                </div>
              </CardContent>
            </Card>

            <Card className="overflow-hidden">
              <CardContent className="p-0">
                <div className="flex flex-col items-center p-6 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mb-4">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=abhay"
                      alt="Abhay Kunpara"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <h3 className="text-2xl font-bold">Abhay Kunpara</h3>
                  <p className="text-green-600 font-medium mb-4">
                    Chief Operating Officer
                  </p>
                  <p className="text-muted-foreground mb-6">
                    Abhay oversees all operations and ensures that EstateVista
                    delivers exceptional service to every client.
                  </p>
                  <a
                    href="https://www.linkedin.com/feed/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center text-blue-600 hover:underline"
                  >
                    <Linkedin className="h-5 w-5 mr-2" />
                    LinkedIn Profile
                  </a>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-4xl mx-auto text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-6">Our Mission</h2>
          <p className="text-xl mb-8">
            To revolutionize the real estate industry in Gujarat by providing
            transparent, efficient, and personalized property solutions that
            exceed our clients' expectations.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Innovation</h3>
                <p>
                  Constantly improving our platform with cutting-edge technology
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Integrity</h3>
                <p>Building trust through transparent and honest practices</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6">
                <h3 className="text-xl font-bold mb-2">Excellence</h3>
                <p>
                  Delivering exceptional service and results for our clients
                </p>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default AboutPage;
