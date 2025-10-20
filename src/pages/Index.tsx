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
        "name": "Notroom Notary Services",
        "image": "https://notroom.com/logo.png",
        "description": "Professional notary services in Erie, PA. Online and mobile notarization available.",
        "address": {
          "@type": "PostalAddress",
          "addressLocality": "Erie",
          "addressRegion": "PA",
          "addressCountry": "US"
        },
        "telephone": "814-480-0989",
        "email": "support@notroom.com",
        "priceRange": "$60-$150",
        "url": "https://notroom.com",
        "areaServed": [
          {
            "@type": "City",
            "name": "Erie",
            "containedIn": {
              "@type": "State",
              "name": "Pennsylvania"
            }
          }
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
        title="Notroom | Online & Mobile Notary in Erie, PA | Fast & Convenient"
        description="Professional notary services in Erie, PA. Get documents notarized online ($60) or mobile service ($125+). Licensed, bonded, and background-checked. Same-day appointments available."
        keywords="notary Erie PA, online notary, mobile notary, remote notarization, RON, loan signing agent, Erie County notary"
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
