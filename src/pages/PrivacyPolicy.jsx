import { Layout } from "@/components/layout/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Privacy Policy
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Your privacy is important to us. This page explains how we handle the information you share with us.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto space-y-8">

          {/* How We Operate */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">How Our Booking System Works</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do <strong>not</strong> require user accounts or logins on this website.  
              All bookings and communication—including confirmations, updates, and support—are done 
              <strong> only through WhatsApp and Email</strong>.  
              No booking history or personal dashboard exists on the website.
            </p>
          </div>

          {/* Information Collection */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Information We Collect</h2>
            <p className="text-muted-foreground leading-relaxed">
              When you contact us or request a booking, you may voluntarily provide:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (for WhatsApp communication)</li>
                <li>Tour preferences or travel details</li>
              </ul>
              We do not collect passwords, payment information, or any sensitive personal data.
            </p>
          </div>

          {/* Use of Information */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">How We Use Your Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use the information you provide solely to:
              <ul className="list-disc ml-6 mt-2 space-y-1">
                <li>Process and confirm your booking</li>
                <li>Communicate through WhatsApp or Email</li>
                <li>Provide tour updates or travel details</li>
              </ul>
              We do not create user accounts or store your data for long-term use.
            </p>
          </div>

          {/* Data Security */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              Information shared through the booking form is transmitted securely.  
              We never sell, rent, or share your personal information with third parties without your consent.
            </p>
          </div>

          {/* Cookies */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may use cookies to improve performance and user experience.  
              Cookies do not collect personal information and can be disabled through your browser settings.
            </p>
          </div>

          {/* Contact */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions regarding this Privacy Policy, please reach out:
              <br/><br/>
              <strong>Email:</strong> info@tanzaniasafari.com<br/>
              <strong>Phone / WhatsApp:</strong> +255 764 422 305
            </p>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
