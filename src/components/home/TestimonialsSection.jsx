import { Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/tours';

export function TestimonialsSection() {
  return (
    <section className="section-padding bg-primary text-primary-foreground">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            What Our Guests Say
          </h2>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Don't just take our word for it — hear from travelers who've experienced Tanzania with us.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.name}
              className="bg-primary-foreground/10 backdrop-blur-sm rounded-xl p-6 animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-golden mb-4" />
              <p className="text-primary-foreground/90 mb-4 text-sm leading-relaxed">
                "{testimonial.text}"
              </p>
              <div className="flex items-center gap-1 mb-3">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-golden text-golden" />
                ))}
              </div>
              <div>
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-primary-foreground/70 text-sm">{testimonial.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
