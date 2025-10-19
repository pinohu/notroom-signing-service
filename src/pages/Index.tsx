import Hero from "@/components/Hero";
import Services from "@/components/Services";
import ProcessTimeline from "@/components/ProcessTimeline";
import WhyNotroom from "@/components/WhyNotroom";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import BookingForm from "@/components/BookingForm";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <ProcessTimeline />
      <WhyNotroom />
      <Testimonials />
      <FAQ />
      <FinalCTA />
      <BookingForm />
      <Footer />
    </div>
  );
};

export default Index;
