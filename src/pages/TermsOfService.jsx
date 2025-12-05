import { Layout } from "@/components/layout/Layout";

const TermsOfService = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Terms of Service
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Please read these terms carefully before using our services.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto space-y-8">
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing our website and booking tours, you agree to abide by these terms.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Booking & Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              All bookings require accurate personal information and payment as outlined during the booking process. We reserve the right to cancel bookings in case of invalid or fraudulent information.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Cancellations & Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cancellation policies vary depending on the tour package. Refunds are processed as per the specific tour terms.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">User Conduct</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users must provide truthful information, respect wildlife and local communities, and comply with all applicable laws during tours.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We are not liable for any injuries, losses, or damages incurred during travel or while using our website, except where required by law.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
