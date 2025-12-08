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
            Please read these terms carefully before using our website.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto space-y-8">

          {/* Acceptance */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing or using this website, you agree to these Terms of Service. 
              This website provides general tour information and a booking request form.
            </p>
          </div>

          {/* No User Accounts */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">No User Accounts or Online Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not provide user accounts, dashboards, or online tracking systems. 
              You cannot log in, view booking history, or track your booking progress through the website.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              All booking communication—including confirmation, updates, changes, 
              or payment instructions—will be sent directly through <strong>WhatsApp or Email only</strong>.
            </p>
          </div>

          {/* Booking Process */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Booking Requests</h2>
            <p className="text-muted-foreground leading-relaxed">
              Submitting a booking request does not guarantee immediate confirmation. 
              Our team will contact you via WhatsApp or Email to verify details, finalize availability, 
              and provide payment instructions.
            </p>
            <p className="text-muted-foreground leading-relaxed mt-4">
              Bookings may be declined if information is incomplete, inaccurate, or unverifiable.
            </p>
          </div>

          {/* Payments */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Payments</h2>
            <p className="text-muted-foreground leading-relaxed">
              Payments are not processed through this website. All payments are handled manually through 
              channels shared by our team (e.g., Mobile Money, bank transfer). 
              We do not store or process card or financial information online.
            </p>
          </div>

          {/* Cancellations */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Cancellations & Refunds</h2>
            <p className="text-muted-foreground leading-relaxed">
              Cancellation and refund policies differ based on the selected tour. 
              Our team will provide clear instructions and conditions for each booking during communication.
            </p>
          </div>

          {/* User Responsibilities */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">User Responsibilities</h2>
            <p className="text-muted-foreground leading-relaxed">
              You agree to provide accurate information when requesting a booking 
              and to communicate through the provided WhatsApp or Email channels. 
              Users must also comply with all rules, safety guidelines, and local laws during tours.
            </p>
          </div>

          {/* Liability */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              Neyah Adventure is not responsible for losses or delays caused by inaccurate information, 
              network issues, or third-party communication problems. 
              We are not liable for injuries or damages during travel except where required by law.
            </p>
          </div>

          {/* Changes */}
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Changes to These Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update these Terms periodically. Continuing to use the website means 
              you agree to the updated version.
            </p>
          </div>

        </div>
      </section>
    </Layout>
  );
};

export default TermsOfService;
