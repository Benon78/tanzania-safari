import { Layout } from '@/components/layout/Layout';
import { Users, Award, Heart, Globe } from 'lucide-react';

const stats = [
  { number: '15+', label: 'Years Experience' },
  { number: '5000+', label: 'Happy Travelers' },
  { number: '50+', label: 'Tour Packages' },
  { number: '100%', label: 'Satisfaction Rate' },
];

const values = [
  {
    icon: Users,
    title: 'Local Expertise',
    description: 'Our team is 100% Tanzanian, born and raised in the regions we guide you through.',
  },
  {
    icon: Award,
    title: 'Quality Service',
    description: 'We maintain the highest standards in vehicles, accommodations, and customer care.',
  },
  {
    icon: Heart,
    title: 'Passion for Wildlife',
    description: "Our guides are passionate conservationists who share their love for Tanzania's wildlife.",
  },
  {
    icon: Globe,
    title: 'Sustainable Tourism',
    description: 'We support local communities and practice responsible tourism to protect Tanzania for future generations.',
  },
];

const About = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 md:py-32">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1489392191049-fc10c97e64b6?w=1920)',
          }}
        >
          <div className="absolute inset-0 bg-foreground/70" />
        </div>
        <div className="container-wide relative z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-background mb-4">
            About Us
          </h1>
          <p className="text-background/80 max-w-2xl mx-auto text-lg">
            Your trusted local partner for authentic Tanzanian adventures since 2010.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 bg-primary">
        <div className="container-wide">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl md:text-4xl font-heading font-bold text-golden mb-1">
                  {stat.number}
                </p>
                <p className="text-primary-foreground/80 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story */}
      <section className="section-padding">
        <div className="container-wide">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-heading font-semibold mb-6">Our Story</h2>
              <div className="space-y-4 text-muted-foreground">
                <p>
                  Neyah Adventure Tours was founded in 2010 by a group of passionate local guides who believed that the best way to experience Tanzania was through the eyes of those who call it home.
                </p>
                <p>
                  What started as a small operation in Dar Es Salaam has grown into one of Tanzania's most trusted tour companies, serving thousands of travelers from around the world while remaining true to our roots.
                </p>
                <p>
                  We believe that travel should be transformative — not just for visitors, but for the communities and landscapes they explore. That's why we're committed to sustainable tourism practices that benefit local people and protect our precious wildlife.
                </p>
                <p>
                  Every member of our team is Tanzanian, from our expert guides to our office staff. When you travel with us, you're not just booking a tour — you're supporting local livelihoods and gaining authentic insights that no guidebook can offer.
                </p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600"
                alt="Safari guide"
                className="rounded-xl w-full aspect-[3/4] object-cover"
              />
              <img
                src="https://images.unsplash.com/photo-1547471080-7cc2caa01a7e?w=600"
                alt="Serengeti wildlife"
                className="rounded-xl w-full aspect-[3/4] object-cover mt-8"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-wide">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-heading font-semibold mb-4">Our Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide everything we do, from planning your itinerary to the moment you say goodbye.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value) => (
              <div key={value.title} className="bg-card p-6 rounded-xl shadow-soft text-center">
                <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-heading font-semibold mb-2">{value.title}</h3>
                <p className="text-muted-foreground text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding">
        <div className="container-wide text-center">
          <h2 className="text-3xl font-heading font-semibold mb-4">Meet Our Team</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            Our experienced guides and staff are the heart of Neyah Adventure.
          </p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👩🏿</span>
              </div>
              <h3 className="font-heading font-semibold">Maryam Yahya</h3>
              <p className="text-muted-foreground text-sm">Founder & Lead Guide</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨🏿</span>
                 {/* <img
                src="https://images.unsplash.com/photo-1516426122078-c23e76319801?w=600"
                alt="Safari guide"
                className="rounded-full w-full aspect-[4/4] object-cover"
              /> */}
              </div>
              <h3 className="font-heading font-semibold">Benjamin William</h3>
              <p className="text-muted-foreground text-sm">Operations Manager</p>
            </div>
            <div className="text-center">
              <div className="w-32 h-32 rounded-full bg-muted mx-auto mb-4 flex items-center justify-center">
                <span className="text-4xl">👨🏿</span>
              </div>
              <h3 className="font-heading font-semibold">Emmanuel Njau</h3>
              <p className="text-muted-foreground text-sm">Senior Safari Guide</p>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default About;
