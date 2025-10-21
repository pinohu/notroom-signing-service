import { AlertCircle } from "lucide-react";
import { Card } from "@/components/ui/card";

interface LegalDisclaimerProps {
  service?: string;
  compact?: boolean;
}

const LegalDisclaimer = ({ service, compact = false }: LegalDisclaimerProps) => {
  const getServiceSpecificText = () => {
    switch (service) {
      case "i9":
        return (
          <>
            <strong>I-9 Verification:</strong> I act as an Authorized Representative for employers, not under my notary commission. This is not a notarial act. No notary seal or title is used per PA Department of State guidance (8 U.S.C. §1324a).
          </>
        );
      case "apostille":
        return (
          <>
            <strong>Apostille Services:</strong> Only the Pennsylvania Department of State can issue apostilles. I provide document notarization and concierge assistance with the apostille application process. I do not give legal advice about which documents require apostilles.
          </>
        );
      case "business":
        return (
          <>
            <strong>Business Filing Services & CROP Registration:</strong> I am registered with the PA Department of State Bureau of Corporations as a Commercial Registered Office Provider (CROP) under 15 Pa.C.S. § 109 and § 415. I maintain a physical Pennsylvania address and will only serve as registered office pursuant to written contract as required by law. <strong className="block mt-2">Scope of Services - Document Preparation Only:</strong> I provide ministerial document preparation and filing assistance. I fill out government forms (Certificate of Organization, Articles of Incorporation, etc.) using information YOU provide. I do NOT: select entity types for you, advise on business structure (LLC vs. Corp, S-Corp vs. C-Corp, etc.), draft custom operating agreements or bylaws, create custom legal provisions, or provide legal, tax, or financial advice. Entity selection, tax elections, and custom legal documents require a licensed attorney or CPA. By Pennsylvania law, I cannot practice law or provide legal advice unless licensed as an attorney (42 Pa C.S. § 2524).
          </>
        );
      case "ron":
        return (
          <>
            <strong>Remote Online Notarization:</strong> Authorized under Pennsylvania RULONA (Act 97 of 2020, effective October 29, 2020). I have notified the PA Department of State of my intent to perform electronic and remote notarizations and use PA Department of State-approved RON technology platforms. <span className="text-destructive">⚠️ [You must specify which approved platform(s) you use: e.g., "Platform: Notarize.com" - see PA DOS approved provider list]</span>
          </>
        );
      default:
        return null;
    }
  };

  if (compact) {
    return (
      <div className="bg-muted/30 border-l-4 border-primary p-4 my-6">
        <p className="text-sm">
          <strong>Legal Disclaimer:</strong> I am not an attorney and do not provide legal advice. Services are limited to notarial acts and administrative document assistance as permitted under Pennsylvania law.
        </p>
      </div>
    );
  }

  return (
    <Card className="p-6 bg-muted/30 border-l-4 border-primary">
      <div className="flex items-start gap-3">
        <AlertCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
        <div className="space-y-3">
          <h3 className="font-bold text-lg">Legal Disclaimer</h3>
          
          {service && (
            <p className="text-sm text-muted-foreground">
              {getServiceSpecificText()}
            </p>
          )}
          
          <div className="space-y-2 text-sm text-muted-foreground">
            <p>
              <strong>I am not an attorney licensed to practice law in Pennsylvania or any other jurisdiction.</strong> I cannot:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide legal advice or interpretation of documents</li>
              <li>Recommend specific actions or legal strategies</li>
              <li>Prepare legal documents (except notarial certificates)</li>
              <li>Act as a legal representative or advocate</li>
              <li>Provide immigration, tax, or financial advice</li>
            </ul>
            
            <p className="mt-3">
              My role is strictly limited to witnessing signatures, administering oaths, verifying identity, and performing other notarial acts as authorized under Pennsylvania's Revised Uniform Law on Notarial Acts (RULONA), 57 Pa. Cons. Stat. §§ 301-352. For legal advice, please consult a licensed attorney.
            </p>
            
            <p className="text-xs italic mt-3 text-center border-t pt-3 mt-4">
              <strong>⚠️ COMPLIANCE REQUIREMENT:</strong> You must add your actual Pennsylvania Notary Public Commission Number here before going live. Example: "Pennsylvania Commission #123456 | Expires: MM/DD/YYYY | Bonded ($10,000) & Insured | Registered Remote Notary"
            </p>
            <p className="text-xs italic mt-2 text-center text-destructive">
              This placeholder must be replaced with your real credentials. Operating without displaying your commission number may violate PA disclosure requirements.
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LegalDisclaimer;
