import { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { Layout } from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Loader2, Calendar, Users, MapPin, MessageCircle, LogOut, ClipboardList } from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { usePageTittle } from '@/hooks/usePageTittle';

const statusColors = {
  pending: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  confirmed: 'bg-green-100 text-green-800 border-green-200',
  cancelled: 'bg-red-100 text-red-800 border-red-200',
  completed: 'bg-blue-100 text-blue-800 border-blue-200',
};

const statusLabels = {
  pending: 'Pending Review',
  confirmed: 'Confirmed',
  cancelled: 'Cancelled',
  completed: 'Completed',
};

export default function MyBookings() {
    usePageTittle()
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signOut } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/account');
    }
  }, [user, authLoading, navigate]);

  useEffect(() => {
    if (user?.email) {
      fetchBookings();
    }
  }, [user?.email]);

  const fetchBookings = async () => {
    if (!user?.email) return;

    setIsLoading(true);

    const { data, error } = await supabase
      .from('booking_inquiries')
      .select('*')
      .eq('customer_email', user.email)
      .order('created_at', { ascending: false });

    if (!error && data) {
      setBookings(data);
    }

    setIsLoading(false);
  };

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const handleWhatsApp = (booking) => {
    const message = encodeURIComponent(
      `Hi! I have a question about my booking:\n\n` +
      `Tour: ${booking.tour_name}\n` +
      `Date: ${format(new Date(booking.travel_date), 'PPP')}\n` +
      `Booking ID: ${booking.id.slice(0, 8)}`
    );

    window.open(`https://wa.me/255742924355?text=${message}`, '_blank');
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <Layout>
      <div className="pt-24 pb-16 min-h-screen bg-muted/30">
        <div className="container-wide">

          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-heading font-bold text-foreground">My Bookings</h1>
              <p className="text-muted-foreground mt-1">
                Signed in as {user?.email}
              </p>
            </div>
            <Button variant="outline" onClick={handleSignOut} className="gap-2">
              <LogOut className="h-4 w-4" />
              Sign Out
            </Button>
          </div>

          {/* Bookings List */}
          {isLoading ? (
            <div className="flex items-center justify-center py-16">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : bookings.length === 0 ? (
            <Card className="text-center py-16">
              <CardContent>
                <ClipboardList className="h-16 w-16 mx-auto text-muted-foreground/50 mb-4" />
                <h2 className="text-xl font-heading font-semibold mb-2">No bookings yet</h2>
                <p className="text-muted-foreground mb-6">
                  Start exploring our tours and book your Tanzania adventure!
                </p>
                <Button asChild>
                  <Link to="/tours">Browse Tours</Link>
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {bookings.map((booking) => (
                <Card key={booking.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex flex-col lg:flex-row">

                      {/* Booking Info */}
                      <div className="flex-1 p-6">
                        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-4">
                          <div>
                            <h3 className="text-lg font-heading font-semibold text-foreground">
                              {booking.tour_name}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Booked on {format(new Date(booking.created_at), 'PPP')}
                            </p>
                          </div>
                          <Badge
                            variant="outline"
                            className={cn('text-xs font-medium', statusColors[booking.status])}
                          >
                            {statusLabels[booking.status]}
                          </Badge>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-primary" />
                            <span>{format(new Date(booking.travel_date), 'PPP')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Users className="h-4 w-4 text-primary" />
                            <span>{booking.travelers} traveler{booking.travelers > 1 ? 's' : ''}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm font-semibold">
                            <span className="text-primary">${booking.total_price}</span>
                            <span className="text-muted-foreground font-normal">total</span>
                          </div>
                        </div>

                        {booking.special_requests && (
                          <div className="text-sm text-muted-foreground bg-muted/50 rounded-lg p-3">
                            <span className="font-medium">Special requests:</span> {booking.special_requests}
                          </div>
                        )}
                      </div>

                      {/* Actions */}
                      <div className="flex lg:flex-col gap-2 p-4 lg:p-6 border-t lg:border-t-0 lg:border-l border-border bg-muted/30">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1 lg:flex-none gap-2"
                          onClick={() => handleWhatsApp(booking)}
                        >
                          <MessageCircle className="h-4 w-4" />
                          Contact Us
                        </Button>

                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-1 lg:flex-none gap-2"
                          asChild
                        >
                          <Link to={`/tours/${booking.tour_id}`}>
                            <MapPin className="h-4 w-4" />
                            View Tour
                          </Link>
                        </Button>
                      </div>

                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Info Card */}
          <Card className="mt-8 bg-primary/5 border-primary/20">
            <CardContent className="p-6">
              <h3 className="font-heading font-semibold mb-2">How booking status works</h3>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
                <div>
                  <Badge variant="outline" className={cn('mb-1', statusColors.pending)}>Pending</Badge>
                  <p className="text-muted-foreground">We're reviewing your request</p>
                </div>
                <div>
                  <Badge variant="outline" className={cn('mb-1', statusColors.confirmed)}>Confirmed</Badge>
                  <p className="text-muted-foreground">Your booking is confirmed</p>
                </div>
                <div>
                  <Badge variant="outline" className={cn('mb-1', statusColors.completed)}>Completed</Badge>
                  <p className="text-muted-foreground">Tour successfully completed</p>
                </div>
                <div>
                  <Badge variant="outline" className={cn('mb-1', statusColors.cancelled)}>Cancelled</Badge>
                  <p className="text-muted-foreground">Booking was cancelled</p>
                </div>
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </Layout>
  );
}
