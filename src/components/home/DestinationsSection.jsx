import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { destinations, tours } from '@/data/tours';
import { Button } from '@/components/ui/button';

export function DestinationsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            Top Destinations
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Explore Tanzania's most breathtaking locations, from vast savannas to pristine beaches.
          </p>
        </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.slice(0,4).map((destination, index) => {
            const toursCount = tours.filter(t => t.destinationSlug === destination.slug).length;
            return (
            <Link
              key={destination.slug}
              to={`/destinations#${destination.slug}`}
              className="group relative aspect-[4/5] rounded-xl overflow-hidden card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={destination.image}
                alt={destination.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="image-overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-xl font-heading font-semibold text-background mb-1">
                  {destination.name}
                </h3>
                <p className="text-white/70 text-sm mb-1">
                  {destination.description}
                </p>
                <p className="text-white/60 text-sm mb-3">{toursCount} tour{toursCount !== 1 ? 's' : ''} available</p>
                <span className="inline-flex items-center gap-1 text-golden text-sm font-medium group-hover:gap-2 transition-all">
                  Explore <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          )})}
        </div>

        <div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/destinations">View All Destinations</Link>
            </Button>
          </div>
      </div>
    </section>
  );
}
