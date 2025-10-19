import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const Testimonials = () => {
  const testimonials = [
    {
      quote: "Needed a power of attorney notarized urgently. Notroom had me done in 10 minutes via video call. Can't believe how easy this was compared to driving to the bank.",
      author: "Sarah M.",
      location: "Erie, PA",
      avatar: "SM"
    },
    {
      quote: "Used them for a real estate closing. Professional, on-time, and knew exactly what they were doing. Will use again and recommend to other agents.",
      author: "Jennifer T.",
      location: "Real Estate Agent, Erie",
      avatar: "JT"
    },
    {
      quote: "They came to my dad's nursing home to notarize his will. Compassionate, patient, and made a difficult process much easier. Thank you Notroom.",
      author: "Michael K.",
      location: "Millcreek, PA",
      avatar: "MK"
    }
  ];

  return (
    <section className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            What Erie Residents Are Saying
          </h2>
          <div className="inline-flex items-center gap-2 bg-background px-6 py-3 rounded-full shadow-lg">
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <Star key={i} className="w-5 h-5 fill-[hsl(var(--urgency-amber))] text-[hsl(var(--urgency-amber))]" />
              ))}
            </div>
            <span className="text-foreground font-semibold ml-2">4.9 out of 5 on Google</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="bg-background shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-8">
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[1, 2, 3, 4, 5].map((i) => (
                    <Star key={i} className="w-5 h-5 fill-[hsl(var(--urgency-amber))] text-[hsl(var(--urgency-amber))]" />
                  ))}
                </div>

                {/* Quote */}
                <blockquote className="text-foreground mb-6 leading-relaxed text-lg">
                  "{testimonial.quote}"
                </blockquote>

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-white font-bold shadow-md">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-bold text-foreground">{testimonial.author}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.location}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* CTA Link */}
        <div className="text-center mt-12">
          <a href="#reviews" className="text-primary hover:text-accent font-semibold text-lg underline underline-offset-4 transition-colors">
            Read All 50+ Reviews →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
