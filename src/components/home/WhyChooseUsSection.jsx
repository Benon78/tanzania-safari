import { Users, Shield, Wallet, Sparkles } from 'lucide-react';

const features = [
  {
    icon: Users,
    title: 'Local Experts',
    description: 'Born and raised in Tanzania, our guides share authentic knowledge and hidden gems.',
  },
  {
    icon: Shield,
    title: 'Safe Vehicles',
    description: 'Well-maintained 4x4 Land Cruisers with pop-up roofs for optimal game viewing.',
  },
  {
    icon: Wallet,
    title: 'Fair Prices',
    description: 'Transparent pricing with no hidden fees. Great value for unforgettable experiences.',
  },
  {
    icon: Sparkles,
    title: 'Custom Tours',
    description: 'Every trip is tailored to your preferences, timeline, and budget.',
  },
];

export function WhyChooseUsSection() {
  return (
    <section className="section-padding bg-background">
      <div className="container-wide">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-heading font-semibold mb-4">
            Why Choose Us
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            We're committed to making your Tanzanian adventure safe, authentic, and unforgettable.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="text-center p-6 rounded-xl bg-card border border-border card-hover animate-fade-in-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 text-primary mb-4">
                <feature.icon className="h-7 w-7" />
              </div>
              <h3 className="text-lg font-heading font-semibold mb-2">
                {feature.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
