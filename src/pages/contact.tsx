import React, { useState } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Clock, MessageSquare } from "lucide-react";

const ContactPage = () => {
  const { showNotification } = useNotification();
  const [messageText, setMessageText] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const officeLocations = [
    {
      city: "Ahmedabad",
      address: "123 Business Hub, Bodakdev, Ahmedabad, Gujarat 380054",
      phone: "+91 78638 20635",
      email: "2022002415.gcet@cvmu.edu.in",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
    {
      city: "Surat",
      address: "456 Diamond Plaza, Vesu, Surat, Gujarat 395007",
      phone: "+91 83201 00603",
      email: "2022002431.gcet@cvmu.edu.in",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
    {
      city: "Vadodara",
      address: "789 Business Center, Alkapuri, Vadodara, Gujarat 390007",
      phone: "+91 78638 20635",
      email: "2022002415.gcet@cvmu.edu.in",
      hours: "Mon-Sat: 9:00 AM - 6:00 PM",
    },
  ];

  const faqs = [
    {
      question: "How do I schedule a property viewing?",
      answer:
        "You can schedule a property viewing by clicking the 'Schedule a Visit' button on any property details page, or by contacting our agents directly.",
    },
    {
      question: "What documents do I need to buy a property?",
      answer:
        "To buy a property, you'll need identity proof, address proof, PAN card, income proof, and property documents. Our agents can guide you through the specific requirements.",
    },
    {
      question: "How can I list my property for sale on EstateVista?",
      answer:
        "You can list your property by clicking the 'Post Property' button in the navigation bar and following the steps to create your listing.",
    },
    {
      question: "What are the payment options for booking a property?",
      answer:
        "We accept various payment methods including bank transfers, checks, and online payments. The specific options will be discussed during the booking process.",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">
          We're here to help with all your real estate needs
        </p>

        {/* Contact Form */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Send Us a Message
                </h2>
                <form
                  className="space-y-4"
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (name && email && messageText) {
                      showNotification(
                        `✉️ Message sent! Our carrier pigeons are on their way to ${name.split(" ")[0]}!`,
                        "success",
                        5000,
                      );
                      setName("");
                      setEmail("");
                      setMessageText("");
                    } else {
                      showNotification(
                        "🙈 Oops! Fill in all fields or our psychic agents won't know who you are!",
                        "warning",
                        4000,
                      );
                    }
                  }}
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Your Name</label>
                      <input
                        type="text"
                        placeholder="Enter your full name"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Email Address
                      </label>
                      <input
                        type="email"
                        placeholder="your@email.com"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        placeholder="Your phone number"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Subject</label>
                      <input
                        type="text"
                        placeholder="What is this regarding?"
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label className="text-sm font-medium">Message</label>
                    <textarea
                      placeholder="How can we help you?"
                      rows={5}
                      className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                      value={messageText}
                      onChange={(e) => setMessageText(e.target.value)}
                    ></textarea>
                  </div>

                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button type="submit" className="w-full md:w-auto">
                      Send Message
                    </Button>
                  </motion.div>
                </form>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card>
              <CardContent className="p-6">
                <h2 className="text-2xl font-semibold mb-6">
                  Contact Information
                </h2>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Head Office</p>
                      <p className="text-muted-foreground">
                        123 Business Hub, Bodakdev, Ahmedabad, Gujarat 380054
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Phone className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+91 78638 20635</p>
                      <p className="text-muted-foreground">+91 83201 00603</p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Mail className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">
                        2022002415.gcet@cvmu.edu.in
                      </p>
                      <p className="text-muted-foreground">
                        2022002431.gcet@cvmu.edu.in
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <div>
                      <p className="font-medium">Business Hours</p>
                      <p className="text-muted-foreground">
                        Monday - Saturday: 9:00 AM - 6:00 PM
                      </p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button className="w-full flex items-center justify-center gap-2">
                      <MessageSquare className="h-4 w-4" />
                      Live Chat
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Office Locations */}
        <h2 className="text-2xl font-semibold mb-6">Our Offices</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {officeLocations.map((office, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-xl font-semibold mb-4">
                  {office.city} Office
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-0.5" />
                    <p className="text-muted-foreground">{office.address}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-5 w-5 text-primary mr-3" />
                    <p className="text-muted-foreground">{office.phone}</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-5 w-5 text-primary mr-3" />
                    <p className="text-muted-foreground">{office.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-5 w-5 text-primary mr-3" />
                    <p className="text-muted-foreground">{office.hours}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Map */}
        <div className="mb-16">
          <h2 className="text-2xl font-semibold mb-6">Find Us</h2>
          <div className="h-[400px] bg-muted rounded-lg flex items-center justify-center">
            <p className="text-muted-foreground">
              Google Map will be displayed here
            </p>
          </div>
        </div>

        {/* FAQs */}
        <h2 className="text-2xl font-semibold mb-6">
          Frequently Asked Questions
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          {faqs.map((faq, index) => (
            <Card key={index}>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-2">{faq.question}</h3>
                <p className="text-muted-foreground">{faq.answer}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-primary text-primary-foreground rounded-lg p-8 text-center">
          <h2 className="text-2xl font-semibold mb-4">
            Ready to Find Your Dream Property?
          </h2>
          <p className="max-w-2xl mx-auto mb-6">
            Our team of experts is ready to help you find the perfect property
            that meets all your requirements.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="secondary">Browse Properties</Button>
            <Button
              variant="outline"
              className="bg-transparent border-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Schedule a Consultation
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ContactPage;
