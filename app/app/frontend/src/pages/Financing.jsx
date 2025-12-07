import React, { useState, useMemo } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Slider } from '../components/ui/slider';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Calculator, TrendingDown, Calendar, DollarSign } from 'lucide-react';

const Financing = () => {
  const [vehiclePrice, setVehiclePrice] = useState(250000);
  const [downPayment, setDownPayment] = useState(50000);
  const [interestRate, setInterestRate] = useState(4.5);
  const [loanTerm, setLoanTerm] = useState(60);

  const calculations = useMemo(() => {
    const principal = vehiclePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const monthlyPayment = principal * (monthlyRate * Math.pow(1 + monthlyRate, loanTerm)) / (Math.pow(1 + monthlyRate, loanTerm) - 1);
    const totalPayment = monthlyPayment * loanTerm + downPayment;
    const totalInterest = totalPayment - vehiclePrice;

    return {
      monthlyPayment: isFinite(monthlyPayment) ? monthlyPayment : 0,
      totalPayment: isFinite(totalPayment) ? totalPayment : 0,
      totalInterest: isFinite(totalInterest) ? totalInterest : 0,
      principal
    };
  }, [vehiclePrice, downPayment, interestRate, loanTerm]);

  return (
    <div className="financing-page">
      <div className="financing-header">
        <div className="section-container">
          <h1 className="page-title">Financing Calculator</h1>
          <p className="page-subtitle">Calculate your monthly payment and explore financing options</p>
        </div>
      </div>

      <div className="financing-content">
        <div className="section-container">
          <div className="financing-grid">
            {/* Calculator Form */}
            <div className="calculator-section">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calculator className="h-5 w-5" />
                    Loan Calculator
                  </CardTitle>
                  <CardDescription>
                    Adjust the values to estimate your monthly payment
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="form-group">
                    <Label htmlFor="vehiclePrice">Vehicle Price</Label>
                    <Input
                      id="vehiclePrice"
                      type="number"
                      value={vehiclePrice}
                      onChange={(e) => setVehiclePrice(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      value={[vehiclePrice]}
                      onValueChange={([value]) => setVehiclePrice(value)}
                      min={100000}
                      max={500000}
                      step={5000}
                      className="mt-2"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="downPayment">Down Payment</Label>
                    <Input
                      id="downPayment"
                      type="number"
                      value={downPayment}
                      onChange={(e) => setDownPayment(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      value={[downPayment]}
                      onValueChange={([value]) => setDownPayment(value)}
                      min={0}
                      max={vehiclePrice}
                      step={5000}
                      className="mt-2"
                    />
                    <p className="text-sm text-muted-foreground mt-1">
                      {((downPayment / vehiclePrice) * 100).toFixed(1)}% of vehicle price
                    </p>
                  </div>

                  <div className="form-group">
                    <Label htmlFor="interestRate">Interest Rate (%)</Label>
                    <Input
                      id="interestRate"
                      type="number"
                      step="0.1"
                      value={interestRate}
                      onChange={(e) => setInterestRate(Number(e.target.value))}
                      className="text-lg"
                    />
                    <Slider
                      value={[interestRate]}
                      onValueChange={([value]) => setInterestRate(value)}
                      min={2}
                      max={10}
                      step={0.1}
                      className="mt-2"
                    />
                  </div>

                  <div className="form-group">
                    <Label htmlFor="loanTerm">Loan Term (months)</Label>
                    <Input
                      id="loanTerm"
                      type="number"
                      value={loanTerm}
                      onChange={(e) => setLoanTerm(Number(e.target.value))}
                      className="text-lg"
                    />
                    <div className="term-options">
                      {[36, 48, 60, 72].map(term => (
                        <Button
                          key={term}
                          variant={loanTerm === term ? "default" : "outline"}
                          size="sm"
                          onClick={() => setLoanTerm(term)}
                        >
                          {term} mo
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Results */}
            <div className="results-section">
              <div className="result-highlight">
                <div className="result-icon">
                  <DollarSign className="h-8 w-8" />
                </div>
                <div>
                  <p className="result-label">Estimated Monthly Payment</p>
                  <p className="result-value">${calculations.monthlyPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                  <p className="result-subtext">per month for {loanTerm} months</p>
                </div>
              </div>

              <div className="results-grid">
                <Card>
                  <CardContent className="pt-6">
                    <div className="result-card-content">
                      <TrendingDown className="result-card-icon" />
                      <div>
                        <p className="result-card-label">Loan Amount</p>
                        <p className="result-card-value">${calculations.principal.toLocaleString()}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="result-card-content">
                      <Calendar className="result-card-icon" />
                      <div>
                        <p className="result-card-label">Total Interest</p>
                        <p className="result-card-value">${calculations.totalInterest.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="result-card-content">
                      <Calculator className="result-card-icon" />
                      <div>
                        <p className="result-card-label">Total Payment</p>
                        <p className="result-card-value">${calculations.totalPayment.toLocaleString('en-US', { maximumFractionDigits: 0 })}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card className="financing-info-card">
                <CardHeader>
                  <CardTitle>Competitive Financing</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="financing-benefits">
                    <li>Rates as low as 3.99% APR for qualified buyers</li>
                    <li>Flexible terms from 36 to 84 months</li>
                    <li>Quick pre-approval process</li>
                    <li>Trade-in options available</li>
                    <li>Special financing programs for McLaren vehicles</li>
                  </ul>
                  <Button size="lg" className="w-full mt-4">
                    Apply for Financing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Financing;