import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';
import { Search, Eye, MessageCircle } from 'lucide-react';
import { format } from 'date-fns';

// ---------------------------
// MOCK DATA (Replace later with backend)
// ---------------------------
const MOCK_BOOKINGS = [
  {
    id: "1",
    tour_id: "101",
    tour_name: "Serengeti Safari",
    customer_name: "John Doe",
    customer_email: "john@example.com",
    customer_phone: "255712345678",
    travel_date: "2025-03-10",
    travelers: 2,
    special_requests: "Vegetarian meals",
    total_price: 1200,
    status: "pending",
    notes: "",
    created_at: "2025-01-02"
  }
];

export default function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [filteredBookings, setFilteredBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [notes, setNotes] = useState('');

  // ------------------------------------
  // Load mock bookings (simulate backend)
  // ------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setBookings(MOCK_BOOKINGS);
      setIsLoading(false);
    }, 700);
  }, []);

  useEffect(() => {
    filterBookings();
  }, [bookings, searchQuery, statusFilter]);

  // ---------------------------
  // FILTER BOOKINGS
  // ---------------------------
  const filterBookings = () => {
    let filtered = [...bookings];

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (b) =>
          b.customer_name.toLowerCase().includes(q) ||
          b.customer_email.toLowerCase().includes(q) ||
          b.tour_name.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      filtered = filtered.filter((b) => b.status === statusFilter);
    }

    setFilteredBookings(filtered);
  };

  // ---------------------------
  // UPDATE STATUS (Frontend only)
  // ---------------------------
  const updateStatus = (id, status) => {
    setBookings((prev) =>
      prev.map((b) => (b.id === id ? { ...b, status } : b))
    );

    if (selectedBooking?.id === id) {
      setSelectedBooking({ ...selectedBooking, status });
    }

    toast({
      title: "Status updated",
      description: `Booking marked as ${status}`
    });
  };

  // ---------------------------
  // UPDATE NOTES (Frontend only)
  // ---------------------------
  const updateNotes = () => {
    if (!selectedBooking) return;

    setBookings((prev) =>
      prev.map((b) =>
        b.id === selectedBooking.id ? { ...b, notes } : b
      )
    );

    toast({ title: "Notes saved" });
  };

  // ---------------------------
  // OPEN WHATSAPP
  // ---------------------------
  const openWhatsApp = (booking) => {
    if (!booking.customer_phone) {
      toast({
        title: "No phone number",
        description: "Customer did not provide a phone number",
        variant: "destructive",
      });
      return;
    }

    const message = encodeURIComponent(
      `Hi ${booking.customer_name}! This is Tanzania Tours regarding your booking for "${booking.tour_name}" on ${format(new Date(booking.travel_date), 'PPP')}.`
    );

    window.open(`https://wa.me/${booking.customer_phone}?text=${message}`, "_blank");
  };

  const openDetail = (booking) => {
    setSelectedBooking(booking);
    setNotes(booking.notes || "");
    setIsDetailOpen(true);
  };

  // ---------------------------
  // LOADING STATE
  // ---------------------------
  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // ---------------------------
  // MAIN UI
  // ---------------------------
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

                      <TableCell className="max-w-[200px] truncate">
                        {booking.tour_name}
                      </TableCell>

                      <TableCell>{format(new Date(booking.travel_date), 'PP')}</TableCell>

                      <TableCell>{booking.travelers}</TableCell>

                      <TableCell>
                        <Select
                          value={booking.status}
                          onValueChange={(val) => updateStatus(booking.id, val)}
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

      {/* --------------------------- */}
      {/* BOOKING DETAILS POPUP */}
      {/* --------------------------- */}
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
                  <p className="font-medium">
                    {selectedBooking.customer_phone || 'Not provided'}
                  </p>
                </div>

                <div>
                  <p className="text-muted-foreground">Tour</p>
                  <p className="font-medium">{selectedBooking.tour_name}</p>
                </div>

                <div>
                  <p className="text-muted-foreground">Travel Date</p>
                  <p className="font-medium">
                    {format(new Date(selectedBooking.travel_date), 'PPP')}
                  </p>
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
                  <p className="font-medium">
                    {format(new Date(selectedBooking.created_at), 'PPP')}
                  </p>
                </div>
              </div>

              {selectedBooking.special_requests && (
                <div>
                  <p className="text-muted-foreground text-sm">Special Requests</p>
                  <p className="text-sm bg-muted p-2 rounded mt-1">
                    {selectedBooking.special_requests}
                  </p>
                </div>
              )}

              <div className="space-y-2">
                <Label>Internal Notes</Label>

                <Textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Add internal notes..."
                  rows={3}
                />

                <Button size="sm" onClick={updateNotes}>Save Notes</Button>
              </div>

              <div className="flex gap-2 pt-4 border-t">
                <Button
                  className="flex-1"
                  variant="whatsapp"
                  onClick={() => openWhatsApp(selectedBooking)}
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  WhatsApp
                </Button>

                <Button
                  className="flex-1"
                  variant="outline"
                  onClick={() => window.location.href = `mailto:${selectedBooking.customer_email}`}
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
