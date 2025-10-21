import { Card } from "@/components/ui/card";
import { Quote, Star } from "lucide-react";

interface Testimonial {
  name: string;
  role: string;
  content: string;
  rating: number;
}

interface SocialProofProps {
  service?: "ron" | "mobile" | "loan" | "apostille" | "i9" | "business" | "registered";
}

const SocialProof = ({ service = "ron" }: SocialProofProps) => {
  const testimonials: Record<string, Testimonial[]> = {
    ron: [
      {
        name: "Sarah M.",
        role: "Real Estate Attorney",
        content: "The remote notary service saved me hours. I had documents notarized during my lunch break without leaving my office. Fast, professional, and legally solid.",
        rating: 5
      },
      {
        name: "James K.",
        role: "Small Business Owner",
        content: "I needed a power of attorney notarized urgently. Booked online, had my session the same day, and received my documents within minutes. Incredible service!",
        rating: 5
      },
      {
        name: "Linda P.",
        role: "Retiree",
        content: "As someone not very tech-savvy, I was nervous about online notarization. The process was simple and the notary walked me through everything. Highly recommend!",
        rating: 5
      }
    ],
    mobile: [
      {
        name: "Robert D.",
        role: "Caregiver",
        content: "My elderly mother needed documents notarized but couldn't travel. The mobile notary came to her home and made the process stress-free. Worth every penny.",
        rating: 5
      },
      {
        name: "Jennifer L.",
        role: "HR Director",
        content: "We needed several employees' documents notarized. The mobile service came to our office and handled everything in one visit. Very efficient!",
        rating: 5
      }
    ],
    loan: [
      {
        name: "Mark T.",
        role: "Title Company Manager",
        content: "We've worked with many signing agents, but this level of professionalism and reliability is rare. Documents always perfect, never late. Our go-to for Erie closings.",
        rating: 5
      },
      {
        name: "Patricia S.",
        role: "Mortgage Broker",
        content: "The borrowers raved about how smooth the signing went. Professional, thorough, and made them feel comfortable. That reflects well on us too!",
        rating: 5
      }
    ],
    apostille: [
      {
        name: "Michael R.",
        role: "International Teacher",
        content: "Needed my diploma apostilled for a teaching position in Spain. They handled everything—notarization, application, submission. Received my apostilled documents in 3 weeks.",
        rating: 5
      },
      {
        name: "Ana C.",
        role: "Expat",
        content: "The apostille process seemed overwhelming until I found this service. They explained everything clearly and took care of all the paperwork. Life saver!",
        rating: 5
      }
    ],
    i9: [
      {
        name: "Kevin W.",
        role: "Staffing Agency Owner",
        content: "Remote I-9 verification has transformed our onboarding. We can hire people anywhere in PA without scheduling issues. Great pricing for volume too.",
        rating: 5
      },
      {
        name: "Susan H.",
        role: "Restaurant Manager",
        content: "With seasonal hiring, I-9s were a nightmare. Mobile verification service comes to us and handles multiple employees at once. Game changer for busy seasons.",
        rating: 5
      }
    ],
    business: [
      {
        name: "David L.",
        role: "Law Firm Partner",
        content: "The retainer plan saves us thousands annually. Priority scheduling means our clients never wait, and billing is straightforward. Highly recommend for any firm.",
        rating: 5
      },
      {
        name: "Michelle B.",
        role: "Real Estate Broker",
        content: "With 15 agents, we need constant notarization. The Professional plan gives us everything we need with predictable costs. Best business decision we made.",
        rating: 5
      }
    ],
    registered: [
      {
        name: "Tom R.",
        role: "Startup Founder",
        content: "The Business Launch Pack was perfect. They handled everything—LLC formation, EIN, operating agreement. Had my business up and running in two weeks!",
        rating: 5
      },
      {
        name: "Rachel N.",
        role: "Freelancer",
        content: "Using a registered office keeps my home address private. The mail scanning is incredibly convenient and they never miss an important deadline reminder.",
        rating: 5
      }
    ]
  };

  const serviceTestimonials = testimonials[service] || testimonials.ron;

  return (
    <section className="py-16 bg-gradient-to-br from-primary/5 to-primary/10">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">What Our Clients Say</h2>
            <p className="text-muted-foreground">Real experiences from real people</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {serviceTestimonials.map((testimonial, index) => (
              <Card key={index} className="p-6 relative">
                <Quote className="w-8 h-8 text-primary/20 absolute top-4 right-4" />
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                  ))}
                </div>
                <p className="text-sm mb-4 italic">{testimonial.content}</p>
                <div className="border-t pt-4">
                  <div className="font-bold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
