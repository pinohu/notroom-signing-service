import Hero from "@/components/Hero";
import Services from "@/components/Services";
import BookingForm from "@/components/BookingForm";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Services />
      <BookingForm />
      
      <footer className="bg-foreground text-background py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm">
            © 2024 Notroom Notary Services. Professional, Fast, Reliable.
          </p>
          <p className="text-xs mt-2 opacity-80">
            Licensed & Bonded in Erie County, PA
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
