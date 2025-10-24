import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileSearch, Shield, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";

const DocumentRetrieval = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Layout>
      <SEO
        title="Document Retrieval Services | $75+ | Erie, PA"
        description="Professional document retrieval from courthouses, vital records, government offices in Pennsylvania. Fast turnaround. From $75 + fees."
        keywords="document retrieval Erie PA, court document retrieval, vital records retrieval, certified copies retrieval"
        canonical="https://notroom.com/services/document-retrieval"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileSearch className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Document Retrieval Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Save time and hassle. We'll retrieve certified copies and documents from courthouses, vital records offices, and government agencies.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
              Request Retrieval - From $75
            </Button>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Flexible Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$75+</div>
                <p className="text-xl text-muted-foreground">Base fee + government fees</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4">What We Retrieve:</h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Court documents & records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Birth & death certificates</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Marriage & divorce records</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Property deeds & records</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4">Who Uses This:</h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Law firms & attorneys</li>
                    <li>• Title companies</li>
                    <li>• Estate administrators</li>
                    <li>• Genealogy researchers</li>
                    <li>• Business professionals</li>
                    <li>• Individuals needing records</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>How It Works:</strong> Tell us what documents you need and from which office/courthouse. We'll retrieve them 
                  and deliver certified copies to you. Pricing includes our service fee plus any government fees for the documents. 
                  Expedited service available for urgent requests.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Documents Retrieved?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Save time and hassle. We'll handle the retrieval process for you. Fast, professional, and reliable.
            </p>
            <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
              Request Service
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DocumentRetrieval;
