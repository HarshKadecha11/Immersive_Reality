import React from "react";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ArrowRight, Home, Phone } from "lucide-react";

const CallToAction = () => {
  return (
    <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h2
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Ready to Find Your Dream Home in Gujarat?
          </motion.h2>

          <motion.p
            className="text-lg mb-8 text-white/80"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Join thousands of satisfied customers who found their perfect
            property with EstateVista
          </motion.p>

          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <Button
              size="lg"
              className="bg-white text-green-600 hover:bg-white/90 hover:text-green-700"
              onClick={() => (window.location.href = "/properties")}
            >
              <Home className="mr-2 h-5 w-5" />
              Browse Properties
            </Button>

            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white/20"
              onClick={() => (window.location.href = "/agents")}
            >
              <Phone className="mr-2 h-5 w-5" />
              Contact an Agent
            </Button>
          </motion.div>

          <motion.div
            className="mt-12 flex items-center justify-center gap-2 text-white/80"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            <span>Want to sell your property?</span>
            <a
              href="/contact"
              className="flex items-center font-medium text-white hover:underline"
            >
              List with us <ArrowRight className="ml-1 h-4 w-4" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
