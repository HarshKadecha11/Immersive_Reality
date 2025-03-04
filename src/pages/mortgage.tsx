import React, { useEffect } from "react";
import { useNotification } from "@/components/NotificationProvider";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import MortgageCalculator from "@/components/MortgageCalculator";
import { Card, CardContent } from "@/components/ui/card";
import {
  Calculator,
  HelpCircle,
  FileText,
  Phone,
  Mail,
  Check,
} from "lucide-react";

const MortgagePage = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    // Show a funny notification when mortgage page loads
    showNotification(
      "💰 Warning: This calculator may cause spontaneous crying and/or hysterical laughter!",
      "warning",
      5000,
    );
  }, [showNotification]);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-8 pt-20">
        <h1 className="text-3xl font-bold mb-2">Mortgage Calculator</h1>
        <p className="text-muted-foreground mb-8">
          Plan your home financing with our easy-to-use mortgage calculator
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <MortgageCalculator />

            <div className="mt-8 space-y-6">
              <h2 className="text-2xl font-semibold">
                Understanding Your Mortgage
              </h2>
              <p className="text-muted-foreground">
                A mortgage is a loan taken out to buy property or land. Most run
                for 25 years but the term can be shorter or longer. The loan is
                'secured' against the value of your home until it's paid off.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <Calculator className="mr-2 h-5 w-5 text-primary" />
                      How It's Calculated
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Your monthly mortgage payment is calculated based on the
                      loan amount, interest rate, and loan term. The formula
                      takes into account compound interest over the life of the
                      loan.
                    </p>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="p-6">
                    <h3 className="text-lg font-semibold mb-3 flex items-center">
                      <HelpCircle className="mr-2 h-5 w-5 text-primary" />
                      Factors Affecting Your Rate
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Several factors affect your mortgage rate, including your
                      credit score, down payment amount, loan term, loan type,
                      and current market conditions.
                    </p>
                  </CardContent>
                </Card>
              </div>

              <h2 className="text-2xl font-semibold mt-8">
                Tips for Home Buyers
              </h2>
              <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                <li>
                  Save for a larger down payment to reduce your loan amount
                </li>
                <li>
                  Improve your credit score before applying for a mortgage
                </li>
                <li>
                  Compare offers from multiple lenders to find the best rate
                </li>
                <li>
                  Consider the total cost of the loan, not just the monthly
                  payment
                </li>
                <li>
                  Factor in additional costs like property taxes and insurance
                </li>
              </ul>
            </div>
          </div>

          <div className="space-y-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Need Help?</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Our mortgage specialists are available to answer your
                  questions and help you find the best financing options for
                  your new home.
                </p>
                <div className="space-y-3">
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-sm">+91 98765 43210</p>
                  </div>
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-primary" />
                    <p className="text-sm">mortgage@estatevista.com</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center">
                  <FileText className="mr-2 h-5 w-5 text-primary" />
                  Documents Required
                </h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    Identity proof (Aadhar, PAN, Passport)
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    Address proof
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    Income proof (Salary slips, IT returns)
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    Bank statements (last 6 months)
                  </li>
                  <li className="flex items-start">
                    <Check className="h-4 w-4 mr-2 mt-0.5 text-green-500" />
                    Property documents
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">
                  Our Lending Partners
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    "https://via.placeholder.com/80x40?text=Bank+1",
                    "https://via.placeholder.com/80x40?text=Bank+2",
                    "https://via.placeholder.com/80x40?text=Bank+3",
                    "https://via.placeholder.com/80x40?text=Bank+4",
                    "https://via.placeholder.com/80x40?text=Bank+5",
                    "https://via.placeholder.com/80x40?text=Bank+6",
                  ].map((img, index) => (
                    <div
                      key={index}
                      className="bg-muted rounded flex items-center justify-center p-2"
                    >
                      <img
                        src={img}
                        alt={`Bank ${index + 1}`}
                        className="max-w-full"
                      />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default MortgagePage;
