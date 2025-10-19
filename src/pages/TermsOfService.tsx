import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";

const TermsOfService = () => {
  return (
    <Layout>
      <SEO
        title="Terms of Service - Notroom Notary Services"
        description="Terms of Service for Notroom notary services in Pennsylvania. Service limitations, fee structure, legal compliance, and customer responsibilities."
        canonical="https://notroom.com/terms-of-service"
      />

      <section className="bg-gradient-to-br from-[hsl(var(--hero-gradient-from))] to-[hsl(var(--hero-gradient-to))] text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Terms of Service</h1>
            <p className="text-xl text-white/90">Last Updated: January 2025</p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-8">
            
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-muted-foreground">
                By using Notroom's notary services, you agree to these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using our services.
              </p>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">2. Service Description & Limitations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Notroom provides notary public services in Pennsylvania, including Remote Online Notarization (RON), mobile notary services, loan signing agent services, and apostille assistance.
                </p>
                <div className="bg-muted/30 p-4 rounded-lg">
                  <h3 className="font-bold mb-2 text-foreground">Important Limitations:</h3>
                  <ul className="list-disc list-inside space-y-2 text-sm">
                    <li>Notaries cannot provide legal advice or draft legal documents</li>
                    <li>Notaries cannot issue apostilles (only PA Department of State can)</li>
                    <li>Notaries cannot notarize documents in which they have a personal interest</li>
                    <li>RON services require signers to be physically located in Pennsylvania during the session</li>
                    <li>Notaries cannot notarize documents with blank spaces or incomplete information</li>
                  </ul>
                </div>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">3. Fee Structure & Pennsylvania Law Compliance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All notary fees comply with Pennsylvania law (57 Pa.C.S. Chapter 3). Pennsylvania limits notary fees to $5-15 per signature depending on the type of notarial act.
                </p>
                <h3 className="font-bold text-foreground">Fee Breakdown:</h3>
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Remote Online Notary:</strong> $15 notary fee per signature (PA maximum) + $45 technology platform fee for secure infrastructure, scheduling, storage, and administrative services</li>
                  <li><strong>Mobile Notary:</strong> $5-15 notary fee per signature + separate travel service fees, mileage charges, and administrative costs</li>
                  <li><strong>Loan Signing Agent:</strong> $15 notary fee per signature + $135 signing agent service fee (document review, printing, travel, scanning, shipping)</li>
                  <li><strong>Business Retainer Plans:</strong> Prepaid notarization packages with unused notarizations expiring at contract end</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">4. Geographic Jurisdiction</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Remote Online Notarization (RON):</strong> Available to individuals physically located anywhere in Pennsylvania during the video session. You must confirm your physical location in Pennsylvania at the time of service.
                </p>
                <p>
                  <strong>Mobile Notary Services:</strong> Available for in-person notarization in Erie County and surrounding areas as specified on our service area pages.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">5. Identity Verification & Requirements</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All signers must provide valid government-issued photo identification. For RON services, Knowledge-Based Authentication (KBA) verification is required by Pennsylvania law.
                </p>
                <p>
                  The notary reserves the right to refuse service if identity cannot be verified, if the signer appears to lack understanding of the document, or if the notary suspects fraud or coercion.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">6. Record Retention</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  As required by Pennsylvania law:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>RON session recordings are stored securely for 10 years</li>
                  <li>Notarial journals and records are maintained in accordance with state requirements</li>
                  <li>Electronic notarial certificates and audit trails are preserved</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">7. Scheduling & Cancellations</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Appointments may be scheduled based on notary availability. Cancellations must be made at least 24 hours in advance for a full refund. Cancellations within 24 hours may be subject to a cancellation fee.
                </p>
                <p>
                  The notary reserves the right to cancel appointments due to technical difficulties, emergencies, or other unforeseen circumstances.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">8. Liability & Errors and Omissions Insurance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Notroom maintains errors and omissions (E&O) insurance as required by Pennsylvania law. However, our liability is limited to the notarial act itself and does not extend to the content or legal validity of the underlying documents.
                </p>
                <p>
                  We are not responsible for:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Legal validity or enforceability of documents</li>
                  <li>Consequences of executing the document</li>
                  <li>Technical failures beyond our control</li>
                  <li>Third-party acceptance or rejection of notarized documents</li>
                </ul>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">9. Privacy & Data Security</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We use bank-level 256-bit encryption to protect your documents and personal information. RON sessions are recorded as required by law. Please see our Privacy Policy for detailed information about data handling.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">10. Business Retainer Plans</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Business retainer plans are prepaid notarization packages. Pennsylvania notary fee limits still apply to each individual notarial act. Unused notarizations expire at contract end and are non-refundable. Retainer agreements may be terminated by either party with 30 days written notice.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">11. Apostille Services</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  <strong>Important:</strong> Notaries cannot issue apostilles in Pennsylvania. Only the Pennsylvania Department of State can authenticate documents with an apostille. Our apostille service includes document notarization (if required) and assistance with preparing and submitting your apostille application to the PA Department of State.
                </p>
                <p>
                  Processing times reflect typical PA Department of State turnaround and are not guaranteed. State processing fees are additional.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">12. Legal Compliance</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  All services are provided in compliance with:
                </p>
                <ul className="list-disc list-inside space-y-2">
                  <li>57 Pa.C.S. Chapter 3 (Pennsylvania Revised Uniform Law on Notarial Acts - RULONA)</li>
                  <li>Act 79 of 2020 (Remote Online Notarization authorization)</li>
                  <li>Pennsylvania Department of State notary regulations</li>
                  <li>National Notary Association standards and best practices</li>
                </ul>
                <p className="mt-4">
                  <strong>Notary Commission Information:</strong> Pennsylvania Notary Public Commission #[COMMISSION_NUMBER]
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">13. Modifications to Terms</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to our website. Continued use of our services after changes constitutes acceptance of the modified terms.
                </p>
              </div>
            </Card>

            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-4">14. Contact Information</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  For questions about these Terms of Service, please contact us:
                </p>
                <ul className="space-y-2">
                  <li>Phone: (814) 480-0989</li>
                  <li>Email: support@notroom.com</li>
                  <li>Service Area: Erie, PA & Surrounding Areas</li>
                </ul>
              </div>
            </Card>

          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
