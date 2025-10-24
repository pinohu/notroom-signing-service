import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Fingerprint, Shield, Clock, BadgeCheck, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { ServiceLocalSEO } from "@/components/local-seo/ServiceLocalSEO";
import FAQSection from "@/components/marketing/FAQSection";
import { generateServiceSchema, generateBreadcrumbSchema } from "@/utils/schemaGenerator";

const Fingerprinting = () => {
  const navigate = useNavigate();

  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const serviceSchema = generateServiceSchema({
    name: "FBI-Approved Fingerprinting Services Erie PA",
    description: "FBI-approved electronic fingerprinting in Erie, PA. For teaching licenses, adoptions, background checks. Mobile service available. $35 + $1.50/mile travel.",
    provider: "Notroom - FBI-Approved Fingerprinting",
    areaServed: "Erie County PA",
    price: "35",
    url: "https://notroom.com/services/fingerprinting"
  });

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Home", url: "https://notroom.com" },
    { name: "Services", url: "https://notroom.com/pricing" },
    { name: "Fingerprinting", url: "https://notroom.com/services/fingerprinting" }
  ]);

  const combinedSchema = {
    "@context": "https://schema.org",
    "@graph": [serviceSchema, breadcrumbSchema]
  };

  return (
    <Layout>
      <SEO
        title="Fingerprinting Services Erie PA | $35 + Travel | FBI-Approved Electronic Fingerprinting"
        description="FBI-approved electronic fingerprinting Northwestern PA. Teaching licenses, adoptions, background checks. Mobile service Erie County. $35 + $1.50/mile travel."
        keywords="fingerprinting Erie PA, FBI fingerprinting Northwestern PA, electronic fingerprinting Erie County, background check fingerprints, teaching license fingerprints Erie, PA Act 34 fingerprinting"
        canonical="https://notroom.com/services/fingerprinting"
        schema={combinedSchema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-background/10 backdrop-blur-sm mb-6">
              <Fingerprint className="w-10 h-10" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">FBI-Approved Fingerprinting Services</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional electronic fingerprinting for background checks, licenses, and certifications. Mobile service available throughout Erie County.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8 py-6">
                Book Mobile Service - $35 + Travel
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
                <h2 className="text-3xl font-bold mb-4">Simple, Transparent Pricing</h2>
                <div className="text-5xl font-bold text-primary mb-2">$35</div>
                <p className="text-xl text-muted-foreground">Base fee + $1.50/mile round-trip from Erie</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <BadgeCheck className="w-5 h-5 text-primary" />
                    What's Included:
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>FBI-approved electronic fingerprinting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Electronic submission to agencies</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Mobile service at your location</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <Check className="w-5 h-5 text-success flex-shrink-0 mt-0.5" />
                      <span>Quick, professional service</span>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <Fingerprint className="w-5 h-5 text-primary" />
                    Common Uses:
                  </h3>
                  <ul className="space-y-2 text-sm">
                    <li>• PA teaching license (Act 34/151 clearances)</li>
                    <li>• Real estate license</li>
                    <li>• Nursing & healthcare licenses</li>
                    <li>• Adoption & foster care</li>
                    <li>• Employment background checks</li>
                    <li>• Immigration (USCIS)</li>
                    <li>• Security clearances</li>
                    <li>• Professional certifications</li>
                  </ul>
                </div>
              </div>

              <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Mobile Service Details:
                </h4>
                <p className="text-sm text-muted-foreground">
                  We bring FBI-approved fingerprinting equipment to your location anywhere in Erie County. 
                  Travel calculated at $1.50/mile round-trip from Erie. Example: 20 miles away = $35 + $60 travel = $95 total.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* PA Act 34/151 Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">Pennsylvania Clearance Requirements</h2>
            <Card className="p-8">
              <p className="text-lg mb-6">Pennsylvania law requires several clearances for individuals working with children, including teachers, coaches, and childcare workers:</p>
              <div className="space-y-4">
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">PA Act 34 - Pennsylvania Criminal History</h3>
                  <p className="text-sm text-muted-foreground">State police background check. Obtained through PA State Police PATCH system. Fingerprinting typically not required unless you've lived out of state.</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">PA Act 151 - FBI Criminal History (Fingerprint-Based)</h3>
                  <p className="text-sm text-muted-foreground">Federal fingerprint background check. <strong>This is where we help!</strong> We provide FBI-approved electronic fingerprinting that gets submitted to the FBI for your federal clearance.</p>
                </div>
                <div className="bg-muted/50 p-4 rounded-lg">
                  <h3 className="font-bold mb-2">PA Act 33/151 - Child Abuse History</h3>
                  <p className="text-sm text-muted-foreground">Pennsylvania Department of Human Services clearance. Obtained through DHS online system. Fingerprints not required for this clearance.</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Fingerprinting Process</h2>
            <div className="space-y-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">1</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Schedule Appointment</h3>
                    <p className="text-muted-foreground">Book your mobile fingerprinting session. Provide your location in Erie County and reason for fingerprinting (PA teaching license, adoption, etc.).</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">2</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Bring Required Information</h3>
                    <p className="text-muted-foreground">Have your ORI number (from requesting agency), reason code, and photo ID ready. For PA teaching license: ORI is PADE130 (PA Department of Education).</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">3</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Electronic Capture</h3>
                    <p className="text-muted-foreground">We use FBI-certified LiveScan equipment to capture your fingerprints electronically. Process takes about 5-10 minutes. No ink mess!</p>
                  </div>
                </div>
              </Card>
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold">4</div>
                  <div>
                    <h3 className="text-xl font-bold mb-2">Electronic Submission</h3>
                    <p className="text-muted-foreground">Fingerprints are transmitted electronically to FBI and PA State Police. Results typically returned to requesting agency within 24-72 hours.</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Who Needs Fingerprinting */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Who Needs FBI Fingerprinting in PA?</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card className="p-6">
                <h3 className="font-bold mb-2">Education Professionals</h3>
                <p className="text-sm text-muted-foreground">Teachers, substitutes, coaches, administrators requiring PA Act 151 clearance.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Healthcare Workers</h3>
                <p className="text-sm text-muted-foreground">Nurses, CNAs, home health aides, medical staff for state licensing.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Adoption & Foster Care</h3>
                <p className="text-sm text-muted-foreground">Prospective adoptive and foster parents for PA DHS requirements.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Professional Licenses</h3>
                <p className="text-sm text-muted-foreground">Real estate agents, insurance agents, security guards, notaries.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Immigration (USCIS)</h3>
                <p className="text-sm text-muted-foreground">Green card applications, citizenship, visa sponsorship, I-485 forms.</p>
              </Card>
              <Card className="p-6">
                <h3 className="font-bold mb-2">Employment Checks</h3>
                <p className="text-sm text-muted-foreground">Pre-employment background checks, security clearances, contractor badges.</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <FAQSection
        faqs={[
          {
            question: "What is the ORI number and where do I get it?",
            answer: "ORI (Originating Agency Identifier) is a code for the agency requesting your fingerprints. For PA teaching licenses, it's PADE130. Your requesting agency (employer, licensing board, adoption agency) will provide your ORI number."
          },
          {
            question: "How long does it take to get FBI fingerprint results back?",
            answer: "Electronic fingerprint results typically return within 24-72 hours to the requesting agency. However, the agency may take additional time to process and send you your clearance certificate. Allow 1-2 weeks total."
          },
          {
            question: "Do I need fingerprints for PA teaching certification?",
            answer: "Yes, if you're applying for PA teaching certification or clearances, you need Act 151 fingerprinting (federal FBI check). This is separate from the PA Act 34 state check and Act 33 child abuse clearance."
          },
          {
            question: "What's the difference between electronic and ink fingerprinting?",
            answer: "Electronic (LiveScan) fingerprinting is more accurate, faster, and cleaner than traditional ink cards. Results are transmitted instantly to FBI. Ink cards must be mailed, take weeks longer, and have higher rejection rates."
          },
          {
            question: "Can I get fingerprinted for USCIS immigration applications?",
            answer: "Yes! We provide FBI-approved fingerprinting for all USCIS purposes including green card applications (I-485), citizenship (N-400), visa sponsorship, and other immigration forms requiring biometric collection."
          },
          {
            question: "Do you travel outside Erie County for fingerprinting?",
            answer: "Yes, we provide mobile fingerprinting throughout Northwestern PA including Crawford, Warren, Mercer, and Venango counties. Travel fees apply at $1.50/mile round-trip from Erie."
          },
          {
            question: "What do I need to bring to my fingerprinting appointment?",
            answer: "Bring: 1) Valid government-issued photo ID, 2) ORI number from requesting agency, 3) Reason code if provided, 4) Payment for service. We handle the rest!"
          }
        ]}
      />

      {/* Local SEO Section */}
      <ServiceLocalSEO 
        serviceName="Fingerprinting Services"
        reviews={[
          { text: "Convenient mobile fingerprinting for my PA teaching license. They came to my school.", author: "Jennifer L.", city: "Erie", rating: 5 },
          { text: "Fast FBI-approved fingerprinting for adoption clearances. Professional service.", author: "Michael S.", city: "Millcreek", rating: 5 },
          { text: "Electronic fingerprints submitted same day. Much better than ink cards.", author: "Rachel W.", city: "Harborcreek", rating: 5 },
          { text: "Mobile service saved me so much time. Great for background check fingerprints.", author: "David P.", city: "Fairview", rating: 5 }
        ]}
      />

      {/* CTA Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-6">Need Fingerprinting Services?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Schedule mobile fingerprinting at your location. FBI-approved equipment and professional service.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="amber" onClick={scrollToBooking} className="text-lg px-8">
                Book Mobile Fingerprinting
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

export default Fingerprinting;
