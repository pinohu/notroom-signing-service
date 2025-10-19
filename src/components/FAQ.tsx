import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "How much does online notarization cost?",
      answer: "Remote online notarization (RON) is $60 for the first document and $20 for each additional document in the same session. This includes the notary fee, platform fee, and digital certificate. No hidden charges."
    },
    {
      question: "Is online notarization legal in Pennsylvania?",
      answer: "Yes! Pennsylvania permanently authorized remote online notarization in 2020 under Act 97. Documents notarized online through our PA-approved platform are legally valid and accepted nationwide."
    },
    {
      question: "How fast can you get to my location for mobile service?",
      answer: "For Erie County, we offer same-day service with typical arrival within 2-4 hours of booking. Emergency/urgent requests can often be accommodated within 1-2 hours for an additional rush fee. We also offer scheduled appointments for your convenience."
    },
    {
      question: "What do I need for an online notarization?",
      answer: "You'll need: (1) A valid government-issued photo ID (driver's license or passport), (2) A device with camera and microphone (computer or smartphone), (3) Stable internet connection, (4) Your unsigned document in PDF format. The entire process takes about 10-15 minutes."
    },
    {
      question: "Do you notarize wills and estate documents?",
      answer: "Yes, we notarize powers of attorney, living wills, and many estate documents. However, Pennsylvania law requires certain documents (like last wills and testaments) to have witnesses present. For these, we recommend our mobile service where we can bring witnesses if needed. Contact us to discuss your specific document."
    },
    {
      question: "Are your notaries background-checked?",
      answer: "Absolutely. All Notroom notaries are Pennsylvania-commissioned, bonded, and have undergone comprehensive background checks. Our loan signing agents also carry E&O insurance and are NNA certified. Your security and privacy are our top priorities."
    }
  ];

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            Frequently Asked Questions
          </h2>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-muted rounded-lg px-6 border-none shadow-sm"
              >
                <AccordionTrigger className="text-left text-lg font-semibold text-foreground hover:text-primary py-6">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed pb-6">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
