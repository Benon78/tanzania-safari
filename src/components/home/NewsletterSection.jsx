import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import { Mail, Send } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

export function NewsletterSection() {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email.trim()) {
      toast({
        title: "Email required",
        description: "Please enter your email address.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    const { error } = await supabase.from('newsletter_subscribers').insert({
      email: email.trim().toLowerCase(),
    });

    setIsSubmitting(false);

    if (error) {
      if (error.code === '23505') {
        toast({
          title: "Already subscribed!",
          description: "This email is already on our newsletter list.",
        });
      } else {
        toast({
          title: "Subscription failed",
          description: "Please try again later.",
          variant: "destructive",
        });
      }
      return;
    }

    toast({
      title: "Successfully subscribed!",
      description: "You'll receive updates about new tours and special offers.",
    });
    setEmail('');
  };

  return (
    <section className="py-16 bg-primary">
      <div className="container-wide">
        <div className="max-w-2xl mx-auto text-center">
          <div className="w-16 h-16 bg-background/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Mail className="h-8 w-8 text-primary-foreground" />
          </div>
          <h2 className="text-3xl md:text-4xl font-heading font-semibold text-primary-foreground mb-4">
            Stay Updated
          </h2>
          <p className="text-primary-foreground/80 mb-8">
            Subscribe to our newsletter and be the first to know about new tours, special offers, and travel tips.
          </p>
          
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="bg-background/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 flex-1"
              required
            />
            <Button 
              type="submit" 
              variant="secondary" 
              size="lg"
              disabled={isSubmitting}
              className="whitespace-nowrap"
            >
              {isSubmitting ? (
                'Subscribing...'
              ) : (
                <>
                  <Send className="h-4 w-4 mr-2" />
                  Subscribe
                </>
              )}
            </Button>
          </form>
          
          <p className="text-primary-foreground/60 text-sm mt-4">
            We respect your privacy. Unsubscribe anytime.
          </p>
        </div>
      </div>
    </section>
  );
}