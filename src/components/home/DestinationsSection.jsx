import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useDestinations } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '../ui/button';

export function DestinationsSection() {
  const { data: destinations, isLoading } = useDestinations();

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
          {isLoading ? (
            <>
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="aspect-[4/5] rounded-xl" />
              ))}
            </>
          ) : destinations && destinations.length > 0 ? (
            destinations.slice(0, 4).map((destination, index) => (
              <Link
                key={destination.id}
                to={`/destinations#${destination.slug}`}
                className="group relative aspect-[4/5] rounded-xl overflow-hidden card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <img
                  src={destination.image_url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'}
                  alt={destination.name}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="image-overlay" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-xl font-heading font-semibold text-background mb-1">
                    {destination.name}
                  </h3>
                  {destination.description && (
                    <p className="text-white/50 text-sm mb-3">
                      {destination.description}
                    </p>
                  )}
                  <span className="inline-flex items-center gap-1 text-golden text-sm font-medium group-hover:gap-2 transition-all">
                    Explore <ArrowRight className="h-4 w-4" />
                  </span>
                </div>
              </Link>
            ))
          ) : (
            <p className="col-span-full text-center text-muted-foreground">
              No destinations available.
            </p>
          )}
        </div>
      </div>
     {destinations && destinations.length > 0 && (<div className="text-center mt-12">
            <Button asChild size="lg">
              <Link to="/destinations">View All Destinations</Link>
            </Button>
      </div>)}
    </section>
  );
}
