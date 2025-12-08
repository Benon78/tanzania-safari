import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Clock, ArrowRight } from 'lucide-react';
import { useTours } from '@/hooks/useTours';
import { BookingModal } from '@/components/booking/BookingModal';

export function ToursSection() {
  const { data: tours = [], isLoading } = useTours();
  const popularTours = tours.slice(0, 6);
  const [selectedTour, setSelectedTour] = useState(null);

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            Popular Tours
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Hand-picked experiences designed to show you the best of Tanzania.
          </p>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-16">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
          </div>
        ) : popularTours.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">No tours available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularTours.map((tour, index) => (
              <div
                key={tour.id}
                className="group bg-card rounded-xl overflow-hidden shadow-soft card-hover animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <Link to={`/tours/${tour.slug}`} className="block">
                  <div className="relative aspect-[16/10] overflow-hidden">
                    <img
                      src={tour.image}
                      alt={tour.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute top-4 right-4 bg-background/95 backdrop-blur-sm px-3 py-1.5 rounded-full">
                      <span className="text-sm font-semibold text-primary">
                        ${tour.price}
                      </span>
                    </div>
                  </div>
                </Link>
                <div className="p-6">
                  <div className="flex items-center gap-2 text-muted-foreground text-sm mb-2">
                    <Clock className="h-4 w-4" />
                    <span>{tour.duration}</span>
                  </div>
                  <Link to={`/tours/${tour.slug}`}>
                    <h3 className="text-lg font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
                      {tour.title}
                    </h3>
                  </Link>
                  <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
                    {tour.shortDescription}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link 
                      to={`/tours/${tour.slug}`}
                      className="inline-flex items-center gap-1 text-primary text-sm font-medium group-hover:gap-2 transition-all"
                    >
                      View Details <ArrowRight className="h-4 w-4" />
                    </Link>
                    <Button 
                      size="sm" 
                      onClick={() => setSelectedTour(tour)}
                    >
                      Book
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="text-center mt-12">
          <Button asChild size="lg">
            <Link to="/tours">View All Tours</Link>
          </Button>
        </div>
      </div>

      {/* Booking Modal */}
      {selectedTour && (
        <BookingModal 
          tour={selectedTour} 
          isOpen={!!selectedTour} 
          onClose={() => setSelectedTour(null)} 
        />
      )}
    </section>
  );
}
