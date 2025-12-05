import { Link } from 'react-router-dom';
import { Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-foreground text-background">
      <div className="container-wide py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Company Info */}
          <div>
            <h3 className="font-heading text-2xl mb-4">Tanzania Safari</h3>
            <p className="text-background/70 mb-6">
              Authentic Tanzania tours guided by local experts. Creating unforgettable safari experiences since 2010.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-background/70 hover:text-golden transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-golden transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-background/70 hover:text-golden transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-lg mb-4">Explore</h4>
            <ul className="space-y-3">
              <li><Link to="/tours" className="text-background/70 hover:text-primary transition-colors">Safari Tours</Link></li>
              <li><Link to="/tours" className="text-background/70 hover:text-primary transition-colors">Zanzibar Holidays</Link></li>
              <li><Link to="/tours" className="text-background/70 hover:text-primary transition-colors">Day Trips</Link></li>
              <li><Link to="/tours" className="text-background/70 hover:text-primary transition-colors">Adventure Tours</Link></li>
              <li><Link to="/travel-info" className="text-background/70 hover:text-primary transition-colors">Travel Info</Link></li>
            </ul>
          </div>

          {/* Destinations */}
          <div>
            <h4 className="font-heading text-lg mb-4">Destinations</h4>
            <ul className="space-y-3">
              <li><Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">Serengeti</Link></li>
              <li><Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">Zanzibar</Link></li>
              <li><Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">Ngorongoro</Link></li>
              <li><Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">Kilimanjaro</Link></li>
              <li><Link to="/destinations" className="text-background/70 hover:text-primary transition-colors">Mikumi</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-lg mb-4">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="h-5 w-5 text-golden flex-shrink-0 mt-0.5" />
                <span className="text-background/70">Dar Es Salaam, Tanzania</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-golden flex-shrink-0" />
                <a href="tel:+255764422305" className="text-background/70 hover:text-golden transition-colors">
                  +255 764 422 305
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-golden flex-shrink-0" />
                <a href="mailto:info@tanzaniasafari.com" className="text-background/70 hover:text-golden transition-colors">
                  info@tanzaniasafari.com
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-background/60 text-sm">
            © {new Date().getFullYear()} Tanzania Safari Tours. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link to="/privacy" className="text-background/60 hover:text-primary transition-colors">Privacy Policy</Link>
            <Link to="/terms" className="text-background/60 hover:text-primary transition-colors">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
