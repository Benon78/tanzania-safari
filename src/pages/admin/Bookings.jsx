import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { usePageTittle } from '@/hooks/usePageTittle';
import { Search, Eye, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

export default function Bookings() {
  usePageTittle()
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [notes, setNotes] = useState('');

  useEffect(() => {
    fetchBookings();
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchQuery, statusFilter]);

  const fetchBookings = async () => {
    const { data, error } = await supabase
      .from('booking_inquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      toast({ 
        title: 'Error', 
        description: 'Failed to fetch bookings', 
        // variant: 'destructive' 
      });
    } else {
      setBookings(data || []);
    }
    setIsLoading(false);
  };

  const filterBookings = () => {
    let filtered = [...bookings];

    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.customer_name.toLowerCase().includes(query) ||
          b.customer_email.toLowerCase().includes(query) ||
          b.tour_name.toLowerCase().includes(query)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  const updateStatus = async (id, status) => {
    const { error } = await supabase
      .from('booking_inquiries')
      .update({ status })
      .eq('id', id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to update status', variant: 'destructive' });
    } else {
      setBookings(bookings.map((b) => (b.id === id ? { ...b, status } : b)));
      if (selectedBooking?.id === id) {
        setSelectedBooking({ ...selectedBooking, status });
      }
      toast({ title: 'Status updated', description: `Booking marked as ${status}` });
    }
  };

  const updateNotes = async () => {
    if (!selectedBooking) return;

    const { error } = await supabase
      .from('booking_inquiries')
      .update({ notes })
      .eq('id', selectedBooking.id);

    if (error) {
      toast({ title: 'Error', description: 'Failed to save notes', variant: 'destructive' });
    } else {
      setBookings(bookings.map((b) => (b.id === selectedBooking.id ? { ...b, notes } : b)));
      toast({ title: 'Notes saved' });
    }
  };

  const openWhatsApp = (booking) => {
    if (!booking.customer_phone) {
      toast({ title: 'No phone number', description: 'Customer did not provide a phone number', variant: 'destructive' });
      return;
    }
    const message = encodeURIComponent(
      `Hi ${booking.customer_name}! This is Neyah Adventure regarding your booking for "${booking.tour_name}" on ${format(new Date(booking.travel_date), 'PPP')}.`
    );
    window.open(`https://wa.me/${booking.customer_phone.replace(/\D/g, '')}?text=${message}`, '_blank');
  };

  const openDetail = (booking) => {
    setSelectedBooking(booking);
    setNotes(booking.notes || '');
    setIsDetailOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-heading font-bold">Bookings</h1>
        <p className="text-muted-foreground">Manage booking inquiries</p>
      </div>

      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row gap-4 justify-between">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by name, email, or tour..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Filter status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          {filteredBookings.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">No bookings found</p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tour</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Travelers</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredBookings.map((booking) => (
                    <TableRow key={booking.id}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{booking.customer_name}</p>
                          <p className="text-sm text-muted-foreground">{booking.customer_email}</p>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px] truncate">{booking.tour_name}</TableCell>
                      <TableCell>{format(new Date(booking.travel_date), 'PP')}</TableCell>
                      <TableCell>{booking.travelers}</TableCell>
                      <TableCell>
                        <Select
                          value={booking.status}
                          onValueChange={(value) => updateStatus(booking.id, value)}
                        >
                          <SelectTrigger className="w-28 h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="confirmed">Confirmed</SelectItem>
                            <SelectItem value="cancelled">Cancelled</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="icon" onClick={() => openDetail(booking)}>
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => openWhatsApp(booking)}>
                            <MessageCircle className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={isDetailOpen} onOpenChange={setIsDetailOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Booking Details</DialogTitle>
            <DialogDescription>View and manage booking information</DialogDescription>
          </DialogHeader>

          {selectedBooking && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Customer</p>
                  <p className="font-medium">{selectedBooking.customer_name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Email</p>
                  <p className="font-medium">{selectedBooking.customer_email}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Phone</p>
                  <p className="font-medium">{selectedBooking.customer_phone || 'Not provided'}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Tour</p>
                  <p className="font-medium">{selectedBooking.tour_name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Travel Date</p>
                  <p className="font-medium">{format(new Date(selectedBooking.travel_date), 'PPP')}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Travelers</p>
                  <p className="font-medium">{selectedBooking.travelers}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Total Price</p>
                  <p className="font-medium">${selectedBooking.total_price || 0}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Submitted</p>
                  <p className="font-medium">{format(new Date(selectedBooking.created_at), 'PPP')}</p>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div>
                  <p className="text-muted-foreground text-sm">Special Requests</p>
                  <p className="text-sm bg-muted p-2 rounded mt-1">{selectedBooking.special_requests}</p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Internal Notes</Label>
                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes about this booking..."
                  rows={3}
                />
                <Button onClick={updateNotes} size="sm">Save Notes</Button>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button onClick={() => openWhatsApp(selectedBooking)} variant="whatsapp" className="flex-1">
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>

                <Button
                  onClick={() => window.location.href = `mailto:${selectedBooking.customer_email}`}
                  variant="outline"
                  className="flex-1"
                >
                  Send Email
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
