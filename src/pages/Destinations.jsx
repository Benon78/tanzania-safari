import { Layout } from '@/components/layout/Layout';
import { useDestinations } from '@/hooks/useDestinations';
import { Skeleton } from '@/components/ui/skeleton';
import { usePageTittle } from '@/hooks/usePageTittle';

const Destinations = () => {
  const { data: destinations, isLoading } = useDestinations();
  usePageTittle()

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Our Destinations
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            From the endless plains of the Serengeti to the spice-scented shores of Zanzibar, discover Tanzania's most spectacular locations.
          </p>
        </div>
      </section>

      {/* Destinations Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {isLoading ? (
            <div className="grid gap-16">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="grid md:grid-cols-2 gap-8 items-center">
                  <Skeleton className="w-full aspect-[4/3] rounded-xl" />
                  <div className="space-y-4">
                    <Skeleton className="h-10 w-48" />
                    <Skeleton className="h-24 w-full" />
                    <Skeleton className="h-32 w-full" />
                  </div>
                </div>
              ))}
            </div>
          ) : destinations && destinations.length > 0 ? (
            <div className="grid gap-16">
              {destinations.map((destination, index) => (
                <div 
                  key={destination.id}
                  id={destination.slug}
                  className={`grid md:grid-cols-2 gap-8 items-center ${index % 2 === 1 ? 'md:flex-row-reverse' : ''}`}
                >
                  <div className={index % 2 === 1 ? 'md:order-2' : ''}>
                    <img
                      src={destination.image_url || 'https://images.unsplash.com/photo-1516426122078-c23e76319801?w=800'}
                      alt={destination.name}
                      className="w-full aspect-[4/3] object-cover rounded-xl shadow-elevated"
                    />
                  </div>
                  <div className={index % 2 === 1 ? 'md:order-1' : ''}>
                    <h2 className="text-3xl font-heading font-semibold mb-4">{destination.name}</h2>
                    {destination.description && (
                      <p className="text-muted-foreground mb-6 leading-relaxed">
                        {destination.description}
                      </p>
                    )}
                    {destination.highlights && destination.highlights.length > 0 && (
                      <ul className="space-y-2 text-sm text-muted-foreground mb-4">
                        {destination.highlights.map((highlight, i) => (
                          <li key={i}>• {highlight}</li>
                        ))}
                      </ul>
                    )}
                    {destination.best_time && (
                      <p className="text-sm text-primary font-medium">
                        Best time to visit: {destination.best_time}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-muted-foreground">No destinations available at the moment.</p>
            </div>
          )}
        </div>
      </section>
    </Layout>
  );
};

export default Destinations;
