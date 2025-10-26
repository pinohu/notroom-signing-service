import Layout from "@/components/Layout";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import WhyNotroom from "@/components/WhyNotroom";
import Testimonials from "@/components/Testimonials";
import RealTestimonials from "@/components/marketing/RealTestimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import BookingForm from "@/components/BookingForm";
import ExitIntent from "@/components/ExitIntent";
import SEO from "@/components/SEO";
import PricingCalculator from "@/components/PricingCalculator";
import GuaranteeSection from "@/components/marketing/GuaranteeSection";
import ValueStack from "@/components/marketing/ValueStack";
import TrustBadges from "@/components/marketing/TrustBadges";
import ComparisonTable from "@/components/marketing/ComparisonTable";
import BeforeAfter from "@/components/marketing/BeforeAfter";
import AuthorityBuilder from "@/components/marketing/AuthorityBuilder";
import LeadMagnet from "@/components/lead-gen/LeadMagnet";
import ServiceQuiz from "@/components/lead-gen/ServiceQuiz";
import TripwireOffer from "@/components/lead-gen/TripwireOffer";
import ValueLadder from "@/components/lead-gen/ValueLadder";

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
        "priceRange": "$60-$399",
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
        description="Complete business services in Erie, PA: Remote & mobile notary (from $60), loan signing ($175), apostille services ($245+), I-9 verification ($85+), LLC formation ($149), and registered office ($149/yr). Licensed, bonded, PA-compliant."
        keywords="notary Erie PA, online notary, mobile notary, loan signing agent, apostille service, I-9 verification, LLC formation Pennsylvania, registered office PA, business filing Erie"
        canonical="https://notroom.com"
        schema={schema}
      />
      <Hero />
      <TrustBadges />
      
      {/* Lead Generation: Value Ladder */}
      <ValueLadder />
      
      <Services />
      <BeforeAfter />
      
      {/* Lead Generation: Service Quiz */}
      <section className="py-16 bg-background" id="service-quiz">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Not Sure Which Service You Need?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Take our 60-second quiz to get a personalized recommendation
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            <ServiceQuiz />
          </div>
        </div>
      </section>
      
      <ValueStack />
      <ComparisonTable />
      
      {/* Lead Generation: Tripwire Offer */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <TripwireOffer />
          </div>
        </div>
      </section>
      
      <ProcessTimeline />
      <AuthorityBuilder />
      <WhyNotroom />
      <RealTestimonials />
      <GuaranteeSection />
      
      {/* Lead Generation: Lead Magnet */}
      <section className="py-16 bg-background" id="lead-magnet">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <LeadMagnet />
          </div>
        </div>
      </section>
      
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <PricingCalculator />
          </div>
        </div>
      </section>
      <FAQ />
      <FinalCTA />
      <BookingForm />
      <ExitIntent />
    </Layout>
  );
};

export default Index;
