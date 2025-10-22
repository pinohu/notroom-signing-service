import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, Car, FileText, Globe, Users, Building2, Briefcase, MapPin, ArrowRight, CheckCircle, Phone } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { CommunityData, getNearbyLinks } from "@/data/communityData";

interface CommunityPageProps {
  community: CommunityData;
}

const CommunityPage = ({ community }: CommunityPageProps) => {
  const navigate = useNavigate();
  
  const scrollToBooking = () => {
    navigate("/");
    setTimeout(() => {
      const element = document.getElementById("booking-form");
      element?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const services = [
    { icon: Video, title: "Remote Online Notary (RON)", price: "$50", description: `Online notarization 24/7 for ${community.name} residents`, link: "/services/remote-online-notary" },
    { icon: Car, title: "Mobile Notary", price: "$50 + mileage", description: `We come to your location in ${community.name}`, link: "/services/mobile-notary" },
    { icon: FileText, title: "Loan Signing Agent", price: "$175", description: `Real estate closing services in ${community.name}`, link: "/services/loan-signing-agent" },
    { icon: Globe, title: "Apostille Services", price: "$245+", description: "International document authentication", link: "/services/apostille" },
    { icon: Users, title: "I-9 Verification", price: "$85+", description: `Employment verification for ${community.name} businesses`, link: "/services/i9-verification" },
    { icon: Building2, title: "LLC Formation", price: "$149+", description: `Start your ${community.name} business today`, link: "/services/registered-office" },
    { icon: Briefcase, title: "Business Retainer", price: "$399+", description: `Monthly plans for ${community.name} companies`, link: "/services/business-retainer" }
  ];

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": `Erie Notary - Professional Notary Services in ${community.name}, PA`,
    "image": "https://notroom.com/logo.png",
    "description": `Licensed mobile notary and remote online notary (RON) services in ${community.name}, ${community.county}, Pennsylvania. Specializing in apostille, loan signing, I-9 verification, and business services.`,
    "address": {
      "@type": "PostalAddress",
      "addressLocality": community.name,
      "addressRegion": "PA",
      "addressCountry": "US",
      "postalCode": community.zipCodes[0]
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": "",
      "longitude": ""
    },
    "url": `https://notroom.com/areas/cities/${community.slug}`,
    "telephone": "(814) 480-0989",
    "priceRange": "$50-$399",
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        "opens": "09:00",
        "closes": "18:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Saturday",
        "opens": "10:00",
        "closes": "16:00"
      },
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": "Sunday",
        "opens": "00:00",
        "closes": "23:59",
        "description": "Remote Online Notary (RON) available 24/7 by appointment"
      }
    ],
    "areaServed": [
      {
        "@type": "City",
        "name": community.name,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "PA",
          "addressCountry": "US"
        }
      },
      ...community.nearbyComm.map(nearby => ({
        "@type": "City",
        "name": nearby,
        "address": {
          "@type": "PostalAddress",
          "addressRegion": "PA",
          "addressCountry": "US"
        }
      }))
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Notary Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mobile Notary Service",
            "description": `Professional mobile notary service in ${community.name}, PA. We come to your location.`
          },
          "price": "50.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Remote Online Notary (RON)",
            "description": `24/7 online notarization for ${community.name} residents via secure video call.`
          },
          "price": "50.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Apostille Services",
            "description": `International document authentication and apostille services for ${community.name}.`
          },
          "price": "245.00",
          "priceCurrency": "USD"
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Loan Signing Agent",
            "description": `Professional real estate closing and loan signing services in ${community.name}.`
          },
          "price": "175.00",
          "priceCurrency": "USD"
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50+"
    }
  };

  const nearbyLinks = getNearbyLinks(community.nearbyComm);

  // Generate localized keywords
  const localKeywords = [
    `${community.name} notary`,
    `mobile notary ${community.name}`,
    `apostille ${community.name}`,
    `notary ${community.name} PA`,
    `${community.name} notary public`,
    `loan signing agent ${community.name}`,
    `RON ${community.name}`,
    `remote online notary ${community.name}`,
    `${community.county} notary`,
    `notary near ${community.landmarks[0]}`,
    `${community.name} mobile notary service`,
    `same day notary ${community.name}`,
    `24/7 notary ${community.name}`,
    `I-9 verification ${community.name}`,
    `business notary ${community.name}`
  ].join(', ');

  return (
    <Layout>
      <SEO
        title={`${community.name} Notary Public PA | Mobile Notary & RON ${community.name} | Apostille Services`}
        description={`#1 rated notary services in ${community.name}, ${community.county}, PA. Mobile notary, Remote Online Notary (RON), apostille, loan signing, I-9 verification. Serving ${community.landmarks.slice(0, 3).join(', ')}. Same-day & 24/7 available. Licensed & insured.`}
        keywords={localKeywords}
        canonical={`https://notroom.com/areas/cities/${community.slug}`}
        schema={localBusinessSchema}
      />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-primary via-primary-dark to-accent overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full mb-6 border border-white/20">
              <MapPin className="w-4 h-4" />
              <span className="text-sm font-medium">Serving All of {community.name}, PA</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              {community.name} Notary Public<br />
              <span className="text-3xl md:text-5xl">Mobile Notary & RON Services in {community.name}, PA</span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Professional notary and business services in {community.name}, {community.county}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Button size="lg" onClick={scrollToBooking} className="bg-white text-primary hover:bg-white/90 text-lg px-8 py-6 h-auto shadow-xl">
                Book {community.name} Notary
              </Button>
              <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-8 py-6 h-auto">
                <a href="tel:814-480-0989"><Phone className="w-5 h-5 mr-2" />Call (814) 480-0989</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <section className="py-4 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link to="/" className="hover:text-primary">Home</Link>
            <ArrowRight className="w-4 h-4" />
            <Link to={`/areas/${community.county.toLowerCase().replace(/\s+/g, '-')}`} className="hover:text-primary">{community.county}</Link>
            <ArrowRight className="w-4 h-4" />
            <span className="text-foreground">{community.name}</span>
          </div>
        </div>
      </section>

      {/* Local Introduction */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-center">
              Trusted Notary Services in {community.name}
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
              Welcome to Erie Notary's professional services for {community.name}, {community.description}. 
              {community.population && ` With a population of ${community.population}, `}
              {community.name} residents and businesses trust us for reliable, convenient notary services. 
              Whether you're near {community.landmarks.slice(0, 2).join(' or ')}, we bring notary services 
              directly to your location with our mobile notary team, or serve you online 24/7 with Remote Online Notarization.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              {community.uniqueTrait}. Our licensed Pennsylvania notaries understand the unique needs of {community.name} 
              residents and provide fast, professional service with transparent pricing and same-day availability.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
            Complete Notary Services in {community.name}
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-background">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                  <div className="text-2xl font-bold text-primary mb-3">{service.price}</div>
                  <p className="text-muted-foreground mb-4 text-sm">{service.description}</p>
                  <Button asChild className="w-full">
                    <Link to={service.link}>Learn More</Link>
                  </Button>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Why Choose Us - Local Focus */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-center">
              Why {community.name} Residents Choose Erie Notary
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Local Knowledge</h3>
                  <p className="text-muted-foreground text-sm">
                    We know {community.name} and serve locations near {community.landmarks[0]} and throughout the area.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Same-Day Service</h3>
                  <p className="text-muted-foreground text-sm">
                    Mobile notary available same-day in {community.name}. RON available 24/7 by appointment.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Transparent Pricing</h3>
                  <p className="text-muted-foreground text-sm">
                    Clear, upfront pricing with no hidden fees. PA-compliant notary fees.
                  </p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="flex-shrink-0">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold mb-2">Licensed & Insured</h3>
                  <p className="text-muted-foreground text-sm">
                    Fully licensed Pennsylvania notaries with $25,000 E&O insurance coverage.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Nearby Communities */}
      {nearbyLinks.length > 0 && (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">
                We Also Serve Nearby Communities
              </h2>
              <p className="text-muted-foreground mb-8">
                Professional notary services throughout {community.county}
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                {nearbyLinks.map((nearby, index) => (
                  <Button key={index} variant="outline" asChild>
                    <Link to={`/areas/cities/${nearby.slug}`}>
                      {nearby.name} Notary
                    </Link>
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">
            Book Your {community.name} Notary Today
          </h2>
          <p className="text-xl mb-8 text-white/90">
            Fast, professional notary services in {community.name}, PA. Mobile or online – you choose!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" onClick={scrollToBooking} className="bg-white text-primary hover:bg-white/90">
              Book Appointment
            </Button>
            <Button size="lg" variant="outline" asChild className="border-2 border-white text-white hover:bg-white hover:text-primary">
              <Link to={`/areas/${community.county.toLowerCase().replace(/\s+/g, '-')}`}>
                View All {community.county} Services
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default CommunityPage;
