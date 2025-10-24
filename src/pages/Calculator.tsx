import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import PricingCalculator from "@/components/PricingCalculator";
import { Calculator as CalcIcon, DollarSign, MapPin } from "lucide-react";

const Calculator = () => {
  return (
    <Layout>
      <SEO
        title="Pricing Calculator | Notroom - Calculate Notary Service Costs"
        description="Calculate the cost of notary services instantly. Get accurate pricing for mobile notary, RON, loan signing, and more in Pennsylvania."
      />

      <section className="pt-32 pb-16 px-4">
        <div className="container mx-auto max-w-6xl">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
              <CalcIcon className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Pricing Calculator
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Get an instant quote for your notary service. Transparent pricing with no hidden fees.
            </p>
          </div>

          {/* Calculator */}
          <div className="mb-16">
            <PricingCalculator />
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <DollarSign className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Transparent Pricing</h3>
              <p className="text-sm text-muted-foreground">
                No hidden fees. What you see is what you pay.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <MapPin className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Distance-Based</h3>
              <p className="text-sm text-muted-foreground">
                Mobile services include accurate mileage calculations.
              </p>
            </div>

            <div className="text-center p-6 rounded-lg bg-card border border-border">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-primary/10 mb-4">
                <CalcIcon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-semibold mb-2">Instant Quotes</h3>
              <p className="text-sm text-muted-foreground">
                Calculate your total cost in seconds.
              </p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Calculator;
