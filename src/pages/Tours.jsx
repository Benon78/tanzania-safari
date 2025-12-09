import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { TourCard } from '@/components/tours/TourCard';
import { BookingModal } from '@/components/booking/BookingModal';
import { useTours } from '@/hooks/useTours';
import { usePageTittle } from '@/hooks/usePageTittle';

const categories = [
  { id: 'all', name: 'All Tours' },
  { id: 'safari', name: 'Safari Tours' },
  { id: 'zanzibar', name: 'Zanzibar & Beach' },
  { id: 'day-trip', name: 'Day Trips' },
  { id: 'cultural', name: 'Cultural Tours' },
  { id: 'adventure', name: 'Adventure & Trekking' },
];

const Tours = () => {
  usePageTittle()
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedTour, setSelectedTour] = useState(null);
  const { data: tours = [], isLoading } = useTours();

  const filteredTours = activeCategory === 'all' 
    ? tours 
    : tours.filter(tour => tour.category === activeCategory);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Our Tours
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Handcrafted experiences to show you the best of Tanzania, from thrilling safaris to relaxing beach escapes.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-8 border-b border-border bg-background sticky top-16 md:top-20 z-40">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveCategory(category.id)}
                className="whitespace-nowrap"
              >
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Tours Grid */}
      <section className="section-padding">
        <div className="container-wide">
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredTours.map((tour, index) => (
                  <TourCard 
                    key={tour.id}
                    tour={tour}
                    index={index}
                    onBook={setSelectedTour}
                  />
                ))}
              </div>

              {filteredTours.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-muted-foreground">No tours found in this category.</p>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      {/* Booking Modal */}
      {selectedTour && (
        <BookingModal 
          tour={selectedTour} 
          isOpen={!!selectedTour} 
          onClose={() => setSelectedTour(null)} 
        />
      )}
    </Layout>
  );
};

export default Tours;
