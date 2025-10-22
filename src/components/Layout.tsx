import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import BackToTop from "./BackToTop";
import ScrollProgress from "./ScrollProgress";
import { Button } from "./ui/button";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  const scrollToBooking = () => {
    if (isHomePage) {
      document.getElementById("booking-form")?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.location.href = "/#booking-form";
    }
  };

  return (
    <div className="min-h-screen">
      <ScrollProgress />
      <Header />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
      <BackToTop />
      
      {/* Mobile Sticky CTA */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background/95 backdrop-blur-md border-t border-border lg:hidden z-40 animate-slide-up">
        <Button 
          className="w-full bg-amber text-white hover:bg-amber/90 shadow-lg" 
          size="lg"
          onClick={scrollToBooking}
        >
          📅 Book Now • From $45
        </Button>
      </div>
    </div>
  );
};

export default Layout;
