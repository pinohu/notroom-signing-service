import Layout from "@/components/Layout";
import SEO from "@/components/SEO";
import { Card } from "@/components/ui/card";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <SEO
        title="Privacy Policy"
        description="Notroom's privacy policy. Learn how we protect your personal information and notarization records."
        canonical="https://notroom.com/privacy-policy"
      />

      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl font-bold mb-6">Privacy Policy</h1>
            <p className="text-muted-foreground mb-8">Last updated: {new Date().toLocaleDateString()}</p>

            <Card className="p-8 space-y-8">
              <section>
                <h2 className="text-2xl font-bold mb-4">Information We Collect</h2>
                <p className="text-muted-foreground mb-4">
                  We collect information necessary to provide notary services, including name, contact information, 
                  government ID details, and documents requiring notarization. All data is encrypted and stored securely.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">How We Use Your Information</h2>
                <ul className="list-disc pl-6 space-y-2 text-muted-foreground">
                  <li>Perform notarization services</li>
                  <li>Verify your identity as required by Pennsylvania law</li>
                  <li>Maintain records as mandated by state regulations (10 years)</li>
                  <li>Communicate about your notarization</li>
                  <li>Improve our services</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Data Security</h2>
                <p className="text-muted-foreground">
                  We use bank-level 256-bit encryption, secure servers, and comply with SOC 2 standards. All video 
                  sessions are recorded and stored securely as required by Pennsylvania notary law.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Your Rights</h2>
                <p className="text-muted-foreground">
                  You have the right to access, correct, or request deletion of your personal information (subject to 
                  legal record retention requirements). Contact us at support@notroom.com for requests.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
                <p className="text-muted-foreground">
                  For privacy questions, contact us at support@notroom.com or (814) 480-0989.
                </p>
              </section>
            </Card>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
