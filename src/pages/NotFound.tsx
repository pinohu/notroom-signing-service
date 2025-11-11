import { useLocation, Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, Search, ArrowLeft, FileQuestion } from "lucide-react";
import Layout from "@/components/Layout";
import SEO from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.error("404 Error: User attempted to access non-existent route:", location.pathname);
    }
  }, [location.pathname]);

  const commonPages = [
    { path: "/", label: "Home", icon: Home },
    { path: "/services/ron", label: "Remote Online Notary" },
    { path: "/services/mobile", label: "Mobile Notary" },
    { path: "/crop", label: "Registered Office & CROP" },
    { path: "/about", label: "About Us" },
    { path: "/contact", label: "Contact" },
  ];

  return (
    <Layout>
      <SEO
        title="404 - Page Not Found | Notroom"
        description="The page you're looking for doesn't exist. Return to Notroom's homepage or browse our services."
        canonical="https://notroom.com/404"
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted px-4 py-20">
        <div className="max-w-2xl w-full text-center">
          {/* 404 Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <FileQuestion className="w-24 h-24 text-muted-foreground/50" aria-hidden="true" />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-6xl font-bold text-foreground">404</span>
              </div>
            </div>
          </div>

          {/* Main Message */}
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Page Not Found
          </h1>
          <p className="text-xl text-muted-foreground mb-2">
            Oops! The page you're looking for doesn't exist.
          </p>
          <p className="text-muted-foreground mb-8">
            The URL <code className="px-2 py-1 bg-muted rounded text-sm font-mono">{location.pathname}</code> could not be found.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button
              size="lg"
              onClick={() => navigate(-1)}
              variant="outline"
              className="min-h-[48px]"
            >
              <ArrowLeft className="w-4 h-4 mr-2" aria-hidden="true" />
              Go Back
            </Button>
            <Button
              size="lg"
              asChild
              className="min-h-[48px]"
            >
              <Link to="/">
                <Home className="w-4 h-4 mr-2" aria-hidden="true" />
                Return to Home
              </Link>
            </Button>
          </div>

          {/* Popular Pages */}
          <div className="bg-card border rounded-lg p-6 text-left">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <Search className="w-5 h-5" aria-hidden="true" />
              Popular Pages
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3" role="list">
              {commonPages.map((page) => {
                const Icon = page.icon;
                return (
                  <li key={page.path} role="listitem">
                    <Link
                      to={page.path}
                      className="flex items-center gap-2 p-3 rounded-lg hover:bg-muted transition-colors text-foreground hover:text-primary focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                    >
                      {Icon && <Icon className="w-4 h-4" aria-hidden="true" />}
                      <span>{page.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Help Text */}
          <p className="mt-8 text-sm text-muted-foreground">
            Need help? <Link to="/contact" className="text-primary hover:underline font-medium">Contact our support team</Link> or call <a href="tel:814-480-0989" className="text-primary hover:underline font-medium">(814) 480-0989</a>
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
