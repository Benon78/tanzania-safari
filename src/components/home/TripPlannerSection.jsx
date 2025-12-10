import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';


export function TripPlannerSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [budget, setBudget] = useState('');
  const [tourType, setTourType] = useState('');
  const [travelers, setTravelers] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const travel_dates = formData.get('dates') || null;
    const details = formData.get('message') || null;
    
    const { error } = await supabase.from('trip_planning_inquiries').insert({
      name,
      email,
      travel_dates,
      budget: budget || null,
      tour_type: tourType || null,
      travelers: travelers || null,
      details,
    });

    if (error) {
      toast({
        title: "Error",
        description: "Failed to send inquiry. Please try again.",
      });
    } else {
      // Send email notification
      try {
        await supabase.functions.invoke('send-notification', {
          body: {
            type: 'trip_planning',
            name,
            email,
            travel_dates,
            budget: budget || null,
            tour_type: tourType || null,
            travelers: travelers || null,
            details,
          },
        });
      } catch (emailError) {
        console.error('Email notification failed:', emailError);
      }

      toast({
        title: "Request Received!",
        description: "We'll get back to you within 24 hours with a custom itinerary.",
      });
      e.target.reset();
      setBudget('');
      setTourType('');
      setTravelers('');
    }
    
    setIsSubmitting(false);
  };

  return (
    <section className="section-padding bg-muted">
      <div className="container-wide">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
              Plan Your Trip
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tell us about your dream safari and we'll create a personalized itinerary just for you.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="bg-card rounded-2xl p-8 shadow-soft">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="John Doe" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input id="email" name="email" type="email" placeholder="john@example.com" required />
              </div>

              {/* <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" />
              </div> */}
              
              <div className="space-y-2">
                <Label htmlFor="dates">Preferred Travel Dates</Label>
                <Input id="dates" name="dates" placeholder="e.g., July 15-25, 2024" required />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (USD)</Label>
                <Select name="budget" value={budget} onValueChange={setBudget}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="500-1000">$500 - $1,000</SelectItem>
                    <SelectItem value="1000-2000">$1,000 - $2,000</SelectItem>
                    <SelectItem value="2000-5000">$2,000 - $5,000</SelectItem>
                    <SelectItem value="5000+">$5,000+</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="tourType">Tour Type</Label>
                <Select name="tourType" value={tourType} onValueChange={setTourType}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select tour type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="safari">Safari Tours</SelectItem>
                    <SelectItem value="beach">Zanzibar & Beach</SelectItem>
                    <SelectItem value="daytrip">Day Trips</SelectItem>
                    <SelectItem value="cultural">Cultural Tours</SelectItem>
                    <SelectItem value="adventure">Adventure & Trekking</SelectItem>
                    <SelectItem value="combo">Combination Tour</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="travelers">Number of Travelers</Label>
                <Select name="travelers" value={travelers} onValueChange={setTravelers}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Solo Traveler</SelectItem>
                    <SelectItem value="2">2 Travelers</SelectItem>
                    <SelectItem value="3-4">3-4 Travelers</SelectItem>
                    <SelectItem value="5-8">5-8 Travelers</SelectItem>
                    <SelectItem value="9+">9+ Travelers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="message">Additional Details</Label>
                <Textarea 
                  id="message" 
                  name="message" 
                  placeholder="Tell us about any specific interests, requirements, or questions..."
                  rows={4}
                />
              </div>
            </div>

            <div className="mt-8 text-center">
              <Button type="submit" size="lg" disabled={isSubmitting}>
                {isSubmitting ? (
                  'Sending...'
                ) : (
                  <>
                    <Send className="h-4 w-4 mr-2" />
                    Send Inquiry
                  </>
                )}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
