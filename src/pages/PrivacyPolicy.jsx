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
            Your privacy is important to us. This page outlines how we handle your information.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl mx-auto space-y-8">
          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Information Collection</h2>
            <p className="text-muted-foreground leading-relaxed">
              We collect information you provide when you book tours or contact us. This includes your name, email, phone number, and travel preferences.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Use of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your information is used to provide our services, communicate updates, improve our offerings, and ensure your experience is seamless.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Data Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We employ industry-standard security measures to protect your information and never share your data with third parties without consent.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website uses cookies to enhance your experience. You can manage cookies through your browser settings.
            </p>
          </div>

          <div className="bg-card p-8 rounded-xl shadow-elevated">
            <h2 className="text-2xl font-heading font-semibold mb-4">Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have questions regarding this policy, please contact us at: <br/>
              <strong>Email:</strong> info@tanzaniasafari.com <br/>
              <strong>Phone:</strong> +255 764 422 305
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PrivacyPolicy;
