import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import WhyNotroom from "@/components/WhyNotroom";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import BookingForm from "@/components/BookingForm";
import ExitIntent from "@/components/ExitIntent";
import SEO from "@/components/SEO";
import PricingCalculator from "@/components/PricingCalculator";

const Index = () => {
  const schema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "ProfessionalService",
        "name": "Notroom - Notary, Business Filing & Compliance Services",
        "image": "https://notroom.com/logo.png",
        "description": "Complete business services in Erie, PA: notary (remote & mobile), loan signing, apostille, I-9 verification, LLC formation, and registered office services.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Erie",
          "addressRegion": "PA",
          "addressCountry": "US"
        },
        "telephone": "814-480-0989",
        "email": "support@notroom.com",
        "priceRange": "$35-$495",
        "url": "https://notroom.com",
        "areaServed": [
          {
            "@type": "State",
            "name": "Pennsylvania"
          },
          {
            "@type": "City",
            "name": "Erie",
            "containedIn": {
              "@type": "State",
              "name": "Pennsylvania"
            }
          }
        ],
        "serviceType": [
          "Remote Online Notarization",
          "Mobile Notary Service",
          "Loan Signing Agent",
          "Apostille Services",
          "I-9 Employment Verification",
          "Business Formation",
          "Registered Office Provider"
        ]
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "What is a Remote Online Notary (RON)?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Remote Online Notarization (RON) allows you to get documents notarized via a secure video call with a licensed notary, legally valid in all 50 states."
            }
          }
        ]
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="Notroom | Notary, Business Filing & Compliance Services | Erie, PA"
        description="Complete business services in Erie, PA: Remote & mobile notary (from $35), loan signing ($150+), apostille services ($195+), I-9 verification ($85+), LLC formation ($249), and registered office ($149/yr). Licensed, bonded, PA-compliant."
        keywords="notary Erie PA, online notary, mobile notary, loan signing agent, apostille service, I-9 verification, LLC formation Pennsylvania, registered office PA, business filing Erie"
        canonical="https://notroom.com"
        schema={schema}
      />
      <Hero />
      <Services />
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>
      <ProcessTimeline />
      <WhyNotroom />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <BookingForm />
      <ExitIntent />
    </Layout>
  );
};

export default Index;
