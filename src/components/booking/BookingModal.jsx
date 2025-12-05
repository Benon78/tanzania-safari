import { useState } from 'react';
import { format } from 'date-fns';
import { CalendarIcon, Users, Minus, Plus, MessageCircle, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Calendar } from "@/components/ui/calendar";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';

export function BookingModal({ tour, isOpen, onClose }) {
  const [startDate, setStartDate] = useState();
  const [travelers, setTravelers] = useState(2);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const totalPrice = tour.price * travelers;

  const handleTravelersChange = (delta) => {
    setTravelers(prev => Math.max(1, Math.min(20, prev + delta)));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!startDate) {
      toast({
        title: "Please select a date",
        description: "Choose your preferred travel date to continue.",
        variant: "destructive",
      });
      return;
    }

    if (!name.trim() || !email.trim()) {
      toast({
        title: "Please fill in required fields",
        description: "Name and email are required.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    // Simulate submission
    await new Promise(resolve => setTimeout(resolve, 1500));

    setIsSubmitting(false);
    setIsSuccess(true);
  };

  const handleWhatsAppBooking = () => {
    const message = `Hi! I'd like to book the "${tour.title}" tour.\n\n` +
      `Date: ${startDate ? format(startDate, 'PPP') : 'Not selected'}\n` +
      `Travelers: ${travelers}\n` +
      `Total: $${totalPrice}\n\n` +
      `Name: ${name}\n` +
      `Email: ${email}\n` +
      `Phone: ${phone || 'Not provided'}\n\n` +
      `Notes: ${notes || 'None'}`;
    window.open(`https://wa.me/255764422305?text=${encodeURIComponent(message)}`, '_blank');
  };

  const resetForm = () => {
    setStartDate(undefined);
    setTravelers(2);
    setName('');
    setEmail('');
    setPhone('');
    setNotes('');
    setIsSuccess(false);
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  if (isSuccess) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center py-6">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-heading font-semibold mb-2">Booking Request Received!</h3>
            <p className="text-muted-foreground mb-6">
              Thank you for your interest in {tour.title}. We'll contact you within 24 hours to confirm your booking.
            </p>
            <div className="space-y-3">
              <Button onClick={handleWhatsAppBooking} variant="whatsapp" className="w-full">
                <MessageCircle className="h-4 w-4 mr-2" />
                Chat on WhatsApp for Faster Response
              </Button>
              <Button onClick={handleClose} variant="outline" className="w-full">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">Book {tour.title}</DialogTitle>
          <DialogDescription>
            Fill in your details and we'll confirm your booking within 24 hours.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          {/* Tour Summary */}
          <div className="flex gap-4 p-4 bg-muted rounded-lg">
            <img 
              src={tour.image} 
              alt={tour.title}
              className="w-20 h-20 rounded-lg object-cover flex-shrink-0"
            />
            <div>
              <h4 className="font-semibold">{tour.title}</h4>
              <p className="text-sm text-muted-foreground">{tour.duration}</p>
              <p className="text-primary font-semibold">${tour.price} per person</p>
            </div>
          </div>

          {/* Date Picker */}
          <div className="space-y-2">
            <Label>Travel Date *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate ? format(startDate, "PPP") : "Select your travel date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0 z-50" align="start">
                <Calendar
                  mode="single"
                  selected={startDate}
                  onSelect={setStartDate}
                  disabled={(date) => date < new Date()}
                  initialFocus
                  className={cn("p-3 pointer-events-auto")}
                />
              </PopoverContent>
            </Popover>
          </div>

          {/* Travelers Count */}
          <div className="space-y-2">
            <Label>Number of Travelers *</Label>
            <div className="flex items-center gap-4">
              <div className="flex items-center border border-input rounded-lg">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTravelersChange(-1)}
                  disabled={travelers <= 1}
                  className="rounded-r-none"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <div className="w-16 text-center font-semibold flex items-center justify-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  {travelers}
                </div>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  onClick={() => handleTravelersChange(1)}
                  disabled={travelers >= 20}
                  className="rounded-l-none"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
              <div className="text-sm text-muted-foreground">
                Total: <span className="font-semibold text-foreground">${totalPrice}</span>
              </div>
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="booking-name">Full Name *</Label>
              <Input
                id="booking-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Doe"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="booking-email">Email *</Label>
                <Input
                  id="booking-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="booking-phone">Phone (WhatsApp)</Label>
                <Input
                  id="booking-phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+255 764 422 305"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="booking-notes">Special Requests</Label>
              <Textarea
                id="booking-notes"
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder="Any dietary requirements, accessibility needs, or special requests..."
                rows={3}
              />
            </div>
          </div>

          {/* Price Summary */}
          <div className="border-t border-border pt-4">
            <div className="flex justify-between items-center text-sm mb-2">
              <span className="text-muted-foreground">${tour.price} × {travelers} travelers</span>
              <span>${totalPrice}</span>
            </div>
            <div className="flex justify-between items-center font-semibold text-lg">
              <span>Total</span>
              <span className="text-primary">${totalPrice}</span>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              * Final price confirmed upon booking. Payment details will be sent via email.
            </p>
          </div>

          {/* Submit Buttons */}
          <div className="space-y-3">
            <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                'Sending Request...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Request Booking
                </>
              )}
            </Button>
            <Button 
              type="button" 
              variant="whatsapp" 
              size="lg" 
              className="w-full"
              onClick={handleWhatsAppBooking}
            >
              <MessageCircle className="h-4 w-4 mr-2" />
              Book via WhatsApp
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
