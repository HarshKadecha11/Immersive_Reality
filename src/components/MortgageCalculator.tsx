import React, { useState, useEffect } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Slider } from "./ui/slider";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Calculator, Home, Percent, Calendar } from "lucide-react";

const MortgageCalculator = () => {
  const [loanAmount, setLoanAmount] = useState(2500000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [monthlyPayment, setMonthlyPayment] = useState(0);
  const [totalPayment, setTotalPayment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  useEffect(() => {
    calculateMortgage();
  }, [loanAmount, interestRate, loanTerm]);

  const calculateMortgage = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    // Total number of payments
    const payments = loanTerm * 12;
    // Calculate monthly payment
    const x = Math.pow(1 + monthlyRate, payments);
    const monthly = (loanAmount * x * monthlyRate) / (x - 1);

    if (isFinite(monthly)) {
      // Update state with calculated values
      setMonthlyPayment(monthly);
      setTotalPayment(monthly * payments);
      setTotalInterest(monthly * payments - loanAmount);
    }
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Card className="w-full">
      <CardHeader className="bg-primary text-primary-foreground">
        <CardTitle className="flex items-center">
          <Calculator className="mr-2 h-5 w-5" />
          Mortgage Calculator
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium flex items-center">
                <Home className="mr-2 h-4 w-4" /> Loan Amount
              </label>
              <span className="text-sm font-semibold">
                {formatCurrency(loanAmount)}
              </span>
            </div>
            <Slider
              value={[loanAmount]}
              min={500000}
              max={10000000}
              step={100000}
              onValueChange={(value) => setLoanAmount(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>₹5 Lakhs</span>
              <span>₹1 Crore</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium flex items-center">
                <Percent className="mr-2 h-4 w-4" /> Interest Rate (%)
              </label>
              <span className="text-sm font-semibold">{interestRate}%</span>
            </div>
            <Slider
              value={[interestRate]}
              min={5}
              max={15}
              step={0.1}
              onValueChange={(value) => setInterestRate(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5%</span>
              <span>15%</span>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <label className="text-sm font-medium flex items-center">
                <Calendar className="mr-2 h-4 w-4" /> Loan Term (Years)
              </label>
              <span className="text-sm font-semibold">{loanTerm} years</span>
            </div>
            <Slider
              value={[loanTerm]}
              min={5}
              max={30}
              step={1}
              onValueChange={(value) => setLoanTerm(value[0])}
            />
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>5 years</span>
              <span>30 years</span>
            </div>
          </div>

          <div className="pt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Monthly Payment</p>
              <p className="text-xl font-bold">
                {formatCurrency(monthlyPayment)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Payment</p>
              <p className="text-xl font-bold">
                {formatCurrency(totalPayment)}
              </p>
            </div>
            <div className="p-4 bg-muted rounded-lg text-center">
              <p className="text-sm text-muted-foreground">Total Interest</p>
              <p className="text-xl font-bold">
                {formatCurrency(totalInterest)}
              </p>
            </div>
          </div>
        </div>

        <div className="text-xs text-muted-foreground text-center">
          This calculator provides an estimate only. Contact our financial
          advisors for personalized mortgage options.
        </div>
      </CardContent>
    </Card>
  );
};

export default MortgageCalculator;
