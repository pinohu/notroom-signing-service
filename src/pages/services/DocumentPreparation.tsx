import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import EnhancedUPLDisclaimer from "@/components/EnhancedUPLDisclaimer";
import LegalDisclaimer from "@/components/LegalDisclaimer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, FileText, Shield, Clock, BadgeCheck, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import FAQSection from "@/components/marketing/FAQSection";
import { generateFAQSchema, generateBreadcrumbSchema, generateServiceSchema } from "@/utils/schemaGenerator";

const DocumentPreparation = () => {
  const navigate = useNavigate();

  const serviceSchema = generateServiceSchema({
    name: "Document Preparation Services",
    description: "Professional document preparation and formatting in Erie PA. Affidavits, contracts, legal forms prepared by experienced document preparers. Not legal advice. Starting at $100.",
    provider: "Notroom - Document Preparation",
    areaServed: "Pennsylvania",
    price: "100",
    url: "https://notroom.com/services/document-preparation"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com/" },
    { name: "Services", url: "https://notroom.com/#services" },
    { name: "Document Preparation", url: "https://notroom.com/services/document-preparation" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  return (
    <Layout>
      <SEO
        title="Document Preparation Services Erie PA | Legal Forms, Affidavits, Contracts | $100+"
        description="Professional document preparation in Erie PA - $100+. Affidavits, contracts, agreements, legal forms. Expert formatting & review. Not legal advice. Serving Erie, Crawford, Warren counties."
        keywords="document preparation Erie PA, legal document preparation, affidavit preparation, contract drafting, form completion pennsylvania, document typing service"
        canonical="https://notroom.com/services/document-preparation"
        schema={combinedSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <FileText className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Professional Document Preparation</h1>
            <p className="text-xl mb-8 opacity-90">
              Get your legal documents professionally formatted and prepared. Affordable alternative to attorney fees for standard forms.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Now - From $100
              </Button>
              <Button size="lg" variant="amberOutline" onClick={() => navigate("/calculator")}>
                Calculate Your Cost
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <Card className="p-8 border-primary border-2">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$100+</div>
                <p className="text-xl text-muted-foreground">Varies by document complexity</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    What We Do:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Format documents to legal standards</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Type and organize your information</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Review for completeness</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Same-day turnaround available</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-primary" />
                    Common Documents:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• Affidavits</li>
                    <li>• Living wills & advance directives</li>
                    <li>• Business contracts</li>
                    <li>• Purchase agreements</li>
                    <li>• Demand letters</li>
                    <li>• Personal agreements</li>
                    <li>• Real estate forms</li>
                    <li>• Custom documents</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  <strong>Important:</strong> We prepare documents based on your instructions but do not provide legal advice. 
                  For legal advice or complex matters, please consult with an attorney.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Our Document Preparation Process</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Initial Consultation</h3>
                    <p className="text-muted-foreground">Share your document needs and provide necessary information. We'll confirm the document type and complexity to provide accurate pricing.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Document Drafting</h3>
                    <p className="text-muted-foreground">We format your document according to PA standards, using your provided information. We type, organize, and ensure proper legal formatting.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Review & Revisions</h3>
                    <p className="text-muted-foreground">You review the draft document. We make any necessary formatting corrections or incorporate changes to information you provide.</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Final Delivery</h3>
                    <p className="text-muted-foreground">Receive your professionally formatted document via email or printed copy. Notarization available separately if needed.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Common Documents Detail */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Documents We Prepare</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3">Affidavits & Declarations</h3>
                <p className="text-sm text-muted-foreground mb-3">Sworn statements for court, government, or private use. Starting at $100.</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Affidavit of identity</li>
                  <li>• Affidavit of heirship</li>
                  <li>• Affidavit of residency</li>
                  <li>• General affidavit</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3">Business Documents</h3>
                <p className="text-sm text-muted-foreground mb-3">Contracts and agreements for business transactions. Starting at $150.</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Service agreements</li>
                  <li>• Independent contractor agreements</li>
                  <li>• Non-disclosure agreements</li>
                  <li>• Purchase agreements</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3">Personal Legal Documents</h3>
                <p className="text-sm text-muted-foreground mb-3">Important personal planning documents. Starting at $125.</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Living wills</li>
                  <li>• Advance directives</li>
                  <li>• Personal agreements</li>
                  <li>• Demand letters</li>
                </ul>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold text-lg mb-3">Real Estate Forms</h3>
                <p className="text-sm text-muted-foreground mb-3">Standard real estate transaction documents. Starting at $100.</p>
                <ul className="text-xs text-muted-foreground space-y-1">
                  <li>• Lease agreements</li>
                  <li>• Purchase agreements</li>
                  <li>• Disclosure forms</li>
                  <li>• Property agreements</li>
                </ul>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* What We Don't Do */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8 border-amber-500 border-2">
              <div className="flex items-start gap-4 mb-6">
                <AlertCircle className="w-8 h-8 text-amber-500 flex-shrink-0" />
                <div>
                  <h2 className="text-2xl font-bold mb-4">Important: What We Cannot Do</h2>
                  <div className="space-y-3 text-muted-foreground">
                    <p>✗ <strong>No Legal Advice:</strong> We cannot advise whether a document is right for your situation, what clauses to include, or legal implications.</p>
                    <p>✗ <strong>No Practice of Law:</strong> Per Pennsylvania UPL statutes, we cannot select legal forms for you or draft custom legal provisions.</p>
                    <p>✗ <strong>No Court Representation:</strong> We cannot represent you in legal proceedings or draft court pleadings.</p>
                    <p>✗ <strong>Formatting Only:</strong> We prepare documents based solely on information and instructions you provide.</p>
                    <p className="pt-3 border-t">For complex legal matters, estate planning, business entity formation, or legal strategy, consult a licensed Pennsylvania attorney.</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Local SEO */}
      <ServiceLocalSEO 
        serviceName="Document Preparation"
        reviews={[
          { text: "Affordable document preparation service. They formatted my affidavit perfectly.", author: "Maria G.", city: "Erie", rating: 5 },
          { text: "Much cheaper than a lawyer for simple document typing. Professional work.", author: "James T.", city: "Meadville", rating: 5 },
          { text: "Fast document preparation for my business contract. Great service.", author: "Linda R.", city: "Warren", rating: 5 },
          { text: "They prepared my living will document quickly and professionally.", author: "Robert K.", city: "Harborcreek", rating: 5 }
        ]}
      />

      {/* FAQs */}
      <FAQSection
        faqs={[
          {
            question: "What is the difference between document preparation and legal services?",
            answer: "Document preparation involves typing, formatting, and organizing documents based on your provided information. We do not provide legal advice, select document types for you, or draft custom legal provisions. For legal advice or representation, consult a licensed attorney."
          },
          {
            question: "How much does document preparation cost in Pennsylvania?",
            answer: "Pricing starts at $100 for simple documents like affidavits, up to $200+ for complex business contracts. Final cost depends on document type, length, and complexity. We provide quotes before starting work."
          },
          {
            question: "Can you prepare my will or trust documents?",
            answer: "No. Estate planning documents like wills, trusts, and powers of attorney should be prepared by a licensed Pennsylvania attorney. These require legal advice about your specific situation and must comply with complex PA estate laws."
          },
          {
            question: "How long does document preparation take?",
            answer: "Most standard documents are completed within 1-2 business days. Rush service (24 hours) is available for an additional fee. Complex documents may require 3-5 business days."
          },
          {
            question: "Do you notarize the documents you prepare?",
            answer: "Notarization is a separate service. If your document requires notarization, we can provide that service for an additional fee (PA notary fees $5-15 per signature plus any applicable service fees)."
          },
          {
            question: "Can you file my document with the court or government agency?",
            answer: "We prepare documents for your use but generally do not file them on your behalf. Court filings may require legal representation. Government filings (like business registrations) may be available through our business filing services."
          },
          {
            question: "What information do I need to provide for document preparation?",
            answer: "You must provide all content, details, names, dates, terms, and specific information to include in the document. We format and organize the information you provide but do not create or suggest content."
          }
        ]}
      />

      {/* UPL Disclaimer */}
      <EnhancedUPLDisclaimer service="document-prep" />

      {/* Legal Disclaimers */}
      <div className="container mx-auto px-4 py-8">
        <LegalDisclaimer variant="compact" />
      </div>

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need a Document Prepared?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Get professional document preparation without the high cost of attorney fees. Starting at just $100.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
                Book Appointment
              </Button>
              <Button size="lg" variant="outline" onClick={() => navigate("/pricing")}>
                View All Services
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-6">
              Questions? Call us at <a href="tel:814-480-0989" className="text-primary hover:underline">(814) 480-0989</a>
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default DocumentPreparation;
