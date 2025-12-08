import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Clock, Check, X, MapPin, MessageCircle, Calendar } from 'lucide-react';
import { useTour } from '@/hooks/useTours';
import { BookingModal } from '@/components/booking/BookingModal';

const TourDetail = () => {
  const { slug } = useParams();
  const { data: tour, isLoading } = useTour(slug);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  if (isLoading) {
    return (
      <Layout>
        <div className="section-padding flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!tour) {
    return (
      <Layout>
        <div className="section-padding text-center">
          <h1 className="text-2xl font-heading mb-4">Tour Not Found</h1>
          <Link to="/tours" className="text-primary hover:underline">
            Browse all tours
          </Link>
        </div>
      </Layout>
    );
  }

  const whatsappMessage = encodeURIComponent(`Hi! I'm interested in the "${tour.title}" tour. Can you provide more information?`);

  const highlights = tour.highlights || [];
  const itinerary = tour.itinerary || [];
  const inclusions = tour.inclusions || [];
  const exclusions = tour.exclusions || [];
  const gallery = tour.gallery || [];

  return (
    <Layout>
      {/* Hero Image */}
      <section className="relative h-[50vh] md:h-[60vh]">
        <img
          src={tour.image || '/images/placeholder.svg'}
          alt={tour.title}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 via-foreground/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 container-wide">
          <div className="max-w-4xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 rounded-full bg-primary text-primary-foreground text-sm font-medium">
                {tour.category.charAt(0).toUpperCase() + tour.category.slice(1)}
              </span>
              <span className="flex items-center gap-1 text-background/90 text-sm">
                <Clock className="h-4 w-4" />
                {tour.duration}
              </span>
            </div>
            <h1 className="text-3xl md:text-5xl font-heading font-semibold text-background mb-4">
              {tour.title}
            </h1>
            <p className="text-2xl md:text-3xl font-heading text-golden">
              From ${tour.price} <span className="text-base text-background/70">per person</span>
            </p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Description */}
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-4">Overview</h2>
                <p className="text-muted-foreground leading-relaxed">{tour.shortDescription}</p>
              </div>

              {/* Highlights */}
              {highlights.length > 0 && (
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-4">Highlights</h2>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {highlights.map((highlight, index) => (
                      <div key={index} className="flex items-start gap-3 p-4 bg-muted rounded-lg">
                        <MapPin className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Itinerary */}
              {itinerary.length > 0 && (
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-6">Day-by-Day Itinerary</h2>
                  <div className="space-y-6">
                    {itinerary.map((day) => (
                      <div key={day.day} className="relative pl-8 pb-6 border-l-2 border-primary/30 last:pb-0">
                        <div className="absolute left-0 top-0 w-4 h-4 -translate-x-[9px] rounded-full bg-primary" />
                        <div className="bg-card p-6 rounded-xl shadow-soft">
                          <span className="text-sm text-primary font-medium">Day {day.day}</span>
                          <h3 className="text-lg font-heading font-semibold mt-1 mb-2">{day.title}</h3>
                          <p className="text-muted-foreground text-sm">{day.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Inclusions/Exclusions */}
              {(inclusions.length > 0 || exclusions.length > 0) && (
                <div className="grid sm:grid-cols-2 gap-8">
                  {inclusions.length > 0 && (
                    <div>
                      <h2 className="text-xl font-heading font-semibold mb-4">What's Included</h2>
                      <ul className="space-y-3">
                        {inclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  {exclusions.length > 0 && (
                    <div>
                      <h2 className="text-xl font-heading font-semibold mb-4">What's Not Included</h2>
                      <ul className="space-y-3">
                        {exclusions.map((item, index) => (
                          <li key={index} className="flex items-start gap-3">
                            <X className="h-5 w-5 text-destructive flex-shrink-0 mt-0.5" />
                            <span className="text-muted-foreground">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              )}

              {/* Gallery */}
              {gallery.length > 0 && (
                <div>
                  <h2 className="text-2xl font-heading font-semibold mb-6">Gallery</h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {gallery.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt={`${tour.title} - Image ${index + 1}`}
                        className="w-full aspect-[4/3] object-cover rounded-lg"
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 bg-card rounded-2xl p-6 shadow-elevated">
                <div className="text-center mb-6">
                  <p className="text-3xl font-heading font-semibold text-primary">${tour.price}</p>
                  <p className="text-muted-foreground text-sm">per person</p>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex items-center gap-3 text-sm">
                    <Clock className="h-5 w-5 text-muted-foreground" />
                    <span>{tour.duration}</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm">
                    <Calendar className="h-5 w-5 text-muted-foreground" />
                    <span>Available year-round</span>
                  </div>
                </div>

                <div className="space-y-3">
                  <Button size="lg" className="w-full" onClick={() => setIsBookingOpen(true)}>
                    Book Now
                  </Button>
                  <Button asChild variant="whatsapp" size="lg" className="w-full">
                    <a 
                      href={`https://wa.me/255742924355?text=${whatsappMessage}`}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <MessageCircle className="h-5 w-5" />
                      WhatsApp Us
                    </a>
                  </Button>
                </div>

                <p className="text-center text-xs text-muted-foreground mt-4">
                  Free cancellation up to 7 days before departure
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Booking Modal */}
      <BookingModal 
        tour={tour} 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
      />
    </Layout>
  );
};

export default TourDetail;
