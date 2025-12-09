import { useState } from 'react';
import { Layout } from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from '@/hooks/use-toast';
import { Mail, Phone, MapPin, Clock, MessageCircle, Send } from 'lucide-react';
import { usePageTittle } from '@/hooks/usePageTittle';
import { sub } from 'date-fns';

const GOOGLE_SCRIPT_URL = "https://script.google.com/macros/s/AKfycbz_N33ucUiLDLs_pWEm4ncwDfP4kBFHszX36MBTIaGDqcWYal2gAmQ4y3X_aOaPVc0dVA/exec";


const Contact = () => {
 usePageTittle()
  const [isLoading, setIsLoading] = useState(false);

  // -----------------
  // Handle SUBMIT
  // -----------------
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const form = e.target;

    const data = {
      Name: form.name.value,
      Email: form.email.value,
      Phone: form.phone.value,
      Subject: form.subject?.value || "",
      Dates: form.dates.value,
      Travelers: form.travelers?.value || "",
      Message: form.message.value,
      TimeStamp: new Date().toLocaleString(),
      formType: 'inquiry'
    };

    try {
      const res = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "cors",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: new URLSearchParams(data).toString(),
      });

      const json = await res.json();

      if (json.success) {
        toast({
          title: "Message Sent!",
          description: "Thank you for contacting us. We'll respond within 24 hours.",
        }); 
      } else {
        toast({
          title: "Error",
          description: "Failed to send message. Try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Network Error",
        description: "Unable to reach the server.",
        variant: "destructive",
      });

    }

    setIsLoading(false);
    // RESET FORM
    form.reset();
  };

  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24" style={{ backgroundColor: 'hsl(var(--primary))' }}>
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-white mb-4">
            Contact Us
          </h1>
          <p className="text-white max-w-2xl mx-auto">
            Ready to plan your Tanzanian adventure? Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Info + Form */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Contact Info */}
            <div className="lg:col-span-1 space-y-8">
              <div>
                <h2 className="text-2xl font-heading font-semibold mb-6">Get in Touch</h2>
                <p className="text-muted-foreground mb-8">
                  Have questions about our tours? Want a custom itinerary? We're here to help make your dream safari a reality.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: Phone, title: 'Phone', value: '+255 742 924 355', href: 'tel:+255764422305' },
                  { icon: MessageCircle, title: 'WhatsApp', value: '+255 742 924 355', href: 'https://wa.me/255742924355' },
                  { icon: Mail, title: 'Email', value: 'info@neyahadventure.com', href: 'mailto:info@neyahadventure.com' },
                ].map((item) => (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                      <item.icon className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-1">{item.title}</h3>
                      <a href={item.href} className="text-muted-foreground hover:text-primary transition-colors">
                        {item.value}
                      </a>
                    </div>
                  </div>
                ))}

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Office</h3>
                    <p className="text-muted-foreground">
                      Kumbukumbu Street, Dar Es Salaam<br />
                      Tanzania
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Hours</h3>
                    <p className="text-muted-foreground">
                      Mon - Sat: 8:00 AM - 6:00 PM<br />
                      Sun: 9:00 AM - 3:00 PM
                    </p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="pt-6">
                <Button asChild variant="whatsapp" size="lg" className="w-full">
                  <a 
                    href="https://wa.me/255742924355?text=Hello!%20I'm%20interested%20in%20booking%20a%20safari."
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <MessageCircle className="h-5 w-5" />
                    Chat on WhatsApp
                  </a>
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="bg-card rounded-2xl p-8 shadow-elevated">
                <h2 className="text-2xl font-heading font-semibold mb-6">Send Us a Message</h2>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Full Name *</Label>
                      <Input id="name" name="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Email Address *</Label>
                      <Input id="email" name="email" type="email" placeholder="john@example.com" required />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" name="phone" type="tel" placeholder="+1 234 567 890" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Select name="subject">
                        <SelectTrigger>
                          <SelectValue  placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="inquiry">General Inquiry</SelectItem>
                          <SelectItem value="booking">Booking Request</SelectItem>
                          <SelectItem value="custom">Custom Tour</SelectItem>
                          <SelectItem value="group">Group Booking</SelectItem>
                          <SelectItem value="support">Support</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="dates">Travel Dates</Label>
                      <Input id="dates" name="dates" placeholder="e.g., July 15-25, 2024" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="travelers">Number of Travelers</Label>
                      <Select  name="travelers">
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
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Your Message *</Label>
                    <Textarea 
                      id="message" 
                      name="message" 
                      placeholder="Tell us about your dream safari, any specific interests, or questions you have..."
                      rows={6}
                      required
                    />
                  </div>

                  <Button type="submit" size="lg" disabled={isLoading} className="w-full sm:w-auto">
                    {isLoading ? 'Sending...' : <>
                      <Send className="h-4 w-4" /> Send Message
                    </>}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="h-[400px] bg-muted">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3961.935160444562!2d39.26330667499526!3d-6.777746393219201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x185c4c69cc589683%3A0x29527fd0cffd21f3!2sFaykat%20Tower!5e0!3m2!1sen!2stz!4v1764928738734!5m2!1sen!2stz" 
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Tanzania Safari Tours Location"
        />
      </section>
    </Layout>
  );
};

export default Contact;
