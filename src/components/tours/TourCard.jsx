import { Link } from 'react-router-dom';
import { Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const categoryColors = {
  safari: "bg-primary text-primary-foreground",
  beach: "bg-blue-500 text-white",
  'day-trip': "bg-amber-500 text-white",
  cultural: "bg-purple-500 text-white",
  adventure: "bg-orange-500 text-white",
};

const categoryLabels = {
  safari: "Safari Tours",
  beach: "Zanzibar & Beach",
  'day-trip': "Day Trips",
  cultural: "Cultural Tours",
  adventure: "Adventure & Trekking",
};

export function TourCard({ tour, index = 0, onBook, showCategory = true }) {
  return (
    <div
      className="group bg-card rounded-xl overflow-hidden shadow-soft card-hover animate-fade-in-up"
      style={{ animationDelay: `${index * 50}ms` }}
    >
      <Link to={`/tours/${tour.slug}`} className="block">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={tour.image}
            alt={tour.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          {showCategory && (
            <div className="absolute top-4 left-4">
              <span className={cn(
                "px-3 py-1 rounded-full text-xs font-medium",
                categoryColors[tour.category]
              )}>
                {categoryLabels[tour.category]}
              </span>
            </div>
          )}
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
          {onBook && (
            <Button 
              size="sm" 
              onClick={(e) => {
                e.preventDefault();
                onBook(tour);
              }}
            >
              Book Now
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
