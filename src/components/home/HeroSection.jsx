import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, CreditCard } from 'lucide-react';

export function HeroSection() {
  return (
    <section className="relative min-h-[90vh] flex items-center">
      {/* Background Image
        add the function to change the background evry render
      */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1920&q=80)',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-foreground/80 via-foreground/50 to-transparent" />
      </div>

      {/* Content */}
      <div className="container-wide relative z-10">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-heading font-semibold text-background mb-6 animate-fade-in-up">
            Authentic Tanzania Tours — Guided by Local Experts
          </h1>
          <p className="text-lg md:text-xl text-background/90 mb-8 animate-fade-in-up animation-delay-100">
            Affordable, safe and unforgettable safaris, day trips and beach holidays.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in-up animation-delay-200">
            <Button asChild variant="hero" size="xl">
              <Link to="/contact">Plan My Trip</Link>
            </Button>
            <Button asChild variant="heroOutline" size="xl">
              <Link to="/tours">Browse Tours</Link>
            </Button>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-6 animate-fade-in-up animation-delay-300">
            <div className="flex items-center gap-2 text-background/90">
              <Shield className="h-5 w-5 text-golden" />
              <span className="text-sm">Licensed Operator</span>
            </div>
            <div className="flex items-center gap-2 text-background/90">
              <Users className="h-5 w-5 text-golden" />
              <span className="text-sm">Local Guides</span>
            </div>
            <div className="flex items-center gap-2 text-background/90">
              <CreditCard className="h-5 w-5 text-golden" />
              <span className="text-sm">Secure Payments</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
