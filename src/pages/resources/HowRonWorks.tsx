import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Video, FileCheck, Shield, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";

const HowRonWorks = () => {
  const navigate = useNavigate();

  const requirements = [
    "Must be physically located in Pennsylvania during the video session",
    "Valid government-issued photo ID (driver's license or passport)",
    "Device with camera and microphone (computer, tablet, or smartphone)",
    "Stable internet connection",
    "Document in PDF or common digital format",
    "Email address to receive notarized document",
    "Ability to complete Knowledge-Based Authentication (KBA) verification"
  ];

  const benefits = [
    { title: "Legally Binding", desc: "RON notarizations are legally recognized in all 50 states" },
    { title: "Secure", desc: "Bank-level 256-bit encryption protects your information" },
    { title: "Convenient", desc: "No travel required - complete from home or office" },
    { title: "Fast", desc: "Most sessions completed in 5-10 minutes" }
  ];

  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    "name": "How Remote Online Notarization (RON) Works",
    "description": "Step-by-step guide to getting documents notarized online via Remote Online Notarization (RON) in Pennsylvania",
    "step": [
      {
        "@type": "HowToStep",
        "name": "Schedule Appointment",
        "text": "Book your online notary session at a convenient time"
      },
      {
        "@type": "HowToStep",
        "name": "Upload Document",
        "text": "Securely upload your document to the notarization platform"
      },
      {
        "@type": "HowToStep",
        "name": "Join Video Call",
        "text": "Connect with a licensed Pennsylvania notary via secure video"
      },
      {
        "@type": "HowToStep",
        "name": "Verify Identity",
        "text": "Present your government ID and complete identity verification"
      },
      {
        "@type": "HowToStep",
        "name": "Review and Sign",
        "text": "Review the document with the notary and electronically sign"
      },
      {
        "@type": "HowToStep",
        "name": "Receive Notarized Document",
        "text": "Get your notarized document with digital certificate via email"
      }
    ]
  };

  return (
    <Layout>
      <SEO
        title="How Remote Online Notarization (RON) Works"
        description="Learn how RON works. Step-by-step guide to getting documents notarized online in Pennsylvania. Secure, fast, and legally binding video notarization explained."
        keywords="how ron works, remote online notarization explained, online notary process, ron pennsylvania, video notarization guide"
        canonical="https://notroom.com/resources/how-ron-works"
        schema={schema}
      />

      {/* Hero Section */}
      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-primary-foreground py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Remote Online Notarization Works
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Get your documents notarized from anywhere via secure video call. Here's everything you need to know about the RON process.
            </p>
          </div>
        </div>
      </section>

      {/* Step-by-Step Process */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">The RON Process: Step by Step</h2>
            
            <div className="space-y-8">
              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    1
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Schedule Your Session</h3>
                    <p className="text-muted-foreground mb-4">
                      Book an appointment online at your convenience. We offer flexible scheduling, including evenings and weekends. Sessions typically last 10-15 minutes.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg">
                      <p className="text-sm font-semibold mb-2">Pro Tip:</p>
                      <p className="text-sm text-muted-foreground">
                        Schedule for a time when you're in a quiet, well-lit location with good internet connectivity.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    2
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Upload Your Document</h3>
                    <p className="text-muted-foreground mb-4">
                      After booking, you'll receive a secure link to upload your document. We accept PDF, Word, and most common file formats. Your document is encrypted immediately upon upload.
                    </p>
                    <div className="flex items-start gap-2 text-sm">
                      <Shield className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">256-bit bank-level encryption protects your documents</span>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    3
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Join the Video Call</h3>
                    <p className="text-muted-foreground mb-4">
                      At your scheduled time, click the link to join a secure video call with a licensed Pennsylvania notary. No special software required - works in your web browser.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Works on desktop, tablet, or smartphone</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Session is recorded and stored for 10 years (PA law requirement)</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    4
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Verify Your Identity</h3>
                    <p className="text-muted-foreground mb-4">
                      Present your valid government-issued photo ID to the camera. The notary will verify your identity using advanced credential analysis technology, which checks for security features and authenticity.
                    </p>
                    <div className="bg-muted/30 p-4 rounded-lg mb-4">
                      <p className="text-sm font-semibold mb-2">Knowledge-Based Authentication (KBA) - Required by PA Law:</p>
                      <p className="text-sm text-muted-foreground">
                        You will be asked to answer questions based on your public records (like previous addresses, loan amounts, or vehicle information). This is a mandatory security measure required by Pennsylvania law for RON services.
                      </p>
                    </div>
                    <div className="bg-primary/10 p-4 rounded-lg border-l-4 border-primary">
                      <p className="text-sm font-semibold mb-2 text-primary">Important Location Requirement:</p>
                      <p className="text-sm">
                        You must be physically located in Pennsylvania during the entire video session. This is a legal requirement under Pennsylvania RON law.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    5
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Review and Sign Your Document</h3>
                    <p className="text-muted-foreground mb-4">
                      The notary will review the document with you to ensure you understand what you're signing. You'll then electronically sign the document using our secure platform. The notary applies their official digital seal and signature.
                    </p>
                    <ul className="space-y-2">
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Notary witnesses your signature in real-time</span>
                      </li>
                      <li className="flex items-center gap-2 text-sm">
                        <CheckCircle className="w-4 h-4 text-success" />
                        <span>Digital signature is tamper-evident</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-xl font-bold">
                    6
                  </div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold mb-3">Receive Your Notarized Document</h3>
                    <p className="text-muted-foreground mb-4">
                      Immediately after the session, you'll receive your notarized document via email with a tamper-evident digital certificate. The original is stored securely for 10 years as required by Pennsylvania law.
                    </p>
                    <div className="flex items-start gap-2 text-sm text-muted-foreground">
                      <FileCheck className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                      <span>Your notarized document is legally valid and can be submitted to any institution</span>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-8">What You'll Need</h2>
            <Card className="p-8">
              <ul className="space-y-4">
                {requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-success flex-shrink-0 mt-0.5" />
                    <span className="text-lg">{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Why Choose RON?</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {benefits.map((benefit, index) => (
                <Card key={index} className="p-6">
                  <h3 className="text-xl font-bold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.desc}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legal Info */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="p-8">
              <div className="flex items-start gap-4">
                <AlertCircle className="w-8 h-8 text-primary flex-shrink-0 mt-1" />
                <div>
                  <h3 className="text-2xl font-bold mb-4">Is RON Legally Valid?</h3>
                  <p className="text-muted-foreground mb-4">
                    Yes! Pennsylvania enacted the Revised Uniform Law on Notarial Acts (RULONA) in 2020, making Remote Online Notarization fully legal and binding. RON notarizations are recognized in all 50 states and accepted by courts, financial institutions, and government agencies nationwide.
                  </p>
                  <p className="text-muted-foreground">
                    All Notroom notaries are commissioned by the Pennsylvania Department of State and maintain comprehensive errors and omissions insurance. Each notarization creates a permanent, tamper-evident audit trail that provides even greater security than traditional paper notarizations.
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Try Remote Online Notarization?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Book your RON session now. Fast, secure, and convenient document notarization from anywhere.
          </p>
          <Button 
            size="lg" 
            onClick={() => navigate("/services/remote-online-notary")}
            variant="secondary"
          >
            Book RON Session - $60
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default HowRonWorks;
