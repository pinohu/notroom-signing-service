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
            <strong>Business Filing Services:</strong> I provide administrative document preparation and filing assistance only. I do not choose business structures for clients, draft custom legal documents, or provide legal, tax, or financial advice. All entity decisions must be made by the client or their attorney/CPA.
          </>
        );
      case "ron":
        return (
          <>
            <strong>Remote Online Notarization:</strong> Authorized under Pennsylvania RULONA (Act 97 of 2020). I am registered with the PA Department of State as an electronic/remote notary and use state-approved RON technology platforms.
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
            
            <p className="text-xs italic mt-3">
              Pennsylvania Commission #{" "}[Commission Number] | Bonded & Insured | Registered Remote Notary
            </p>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default LegalDisclaimer;
