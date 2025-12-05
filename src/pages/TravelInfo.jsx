import { Layout } from '@/components/layout/Layout';
import { FileText, Heart, Backpack, Sun, Shield } from 'lucide-react';

const sections = [
  {
    id: 'visa',
    icon: FileText,
    title: 'Visa Requirements',
    content: `Most visitors to Tanzania require a visa, which can be obtained on arrival or online in advance.

**Visa on Arrival:**
- Available for most nationalities
- Cost: $50 USD (single entry) or $100 USD (multiple entry)
- Passport must be valid for at least 6 months
- Return ticket and proof of accommodation may be requested

**Online Visa (Recommended):**
- Apply at immigration.go.tz
- Processing takes 3-5 business days
- Print your approval letter before travel

**Visa-Free Countries:**
Some East African Community members and a few other countries don't require visas. Check with your local Tanzanian embassy for specific requirements.`
  },
  {
    id: 'health',
    icon: Heart,
    title: 'Health & Vaccinations',
    content: `Taking the right health precautions ensures a safe and enjoyable trip.

**Required Vaccinations:**
- Yellow Fever: Required if arriving from an endemic country
- Certificate may be checked at immigration

**Recommended Vaccinations:**
- Hepatitis A & B
- Typhoid
- Tetanus
- Meningitis (especially during dry season)
- Rabies (for extended stays)

**Malaria Prevention:**
- Tanzania is a malaria zone
- Take antimalarial medication as prescribed
- Use insect repellent (DEET-based)
- Sleep under mosquito nets
- Wear long sleeves and pants at dusk

**General Health Tips:**
- Drink only bottled or purified water
- Avoid ice in drinks unless at reputable establishments
- Travel insurance with medical evacuation is strongly recommended`
  },
  {
    id: 'packing',
    icon: Backpack,
    title: 'Packing List',
    content: `Pack light but smart for your Tanzanian adventure.

**Safari Essentials:**
- Neutral-colored clothing (khaki, olive, beige)
- Long-sleeved shirts and long pants
- Wide-brimmed hat and sunglasses
- Comfortable walking shoes
- Sandals for lodges
- Warm fleece or jacket (early mornings are cold)
- Binoculars
- Camera with zoom lens
- Power bank

**Beach Essentials (Zanzibar):**
- Swimwear
- Light, breathable clothing
- Reef-safe sunscreen
- Snorkel gear (or rent locally)

**Kilimanjaro Trekking:**
- Layered clothing system
- Waterproof jacket
- Hiking boots (broken in!)
- Warm sleeping bag
- Trekking poles
- Headlamp

**General Items:**
- Passport and copies
- Travel insurance documents
- Sunscreen SPF 50+
- Insect repellent
- Basic first aid kit
- Adapter plugs (UK Type G)`
  },
  {
    id: 'best-time',
    icon: Sun,
    title: 'Best Time to Visit',
    content: `Tanzania is a year-round destination, but timing can enhance your experience.

**Dry Season (June - October):**
- Best for wildlife viewing
- Animals gather around water sources
- Great Migration in Serengeti (July-October)
- Cool, pleasant temperatures
- Peak season - book early!

**Green Season (November - May):**
- Lush landscapes, fewer crowds
- Lower prices
- Short rains (November-December)
- Long rains (March-May)
- Calving season in Serengeti (January-February)
- Best time for bird watching

**Beach Weather:**
- Zanzibar is warm year-round (25-35°C)
- Best beach weather: June-October, December-February
- Avoid April-May (heavy rains)

**Kilimanjaro Climbing:**
- Best months: January-March, June-October
- Avoid April-May rainy season`
  },
  {
    id: 'safety',
    icon: Shield,
    title: 'Safety Tips',
    content: `Tanzania is generally safe for tourists, but basic precautions apply.

**General Safety:**
- Use reputable tour operators (like us!)
- Don't display expensive jewelry or electronics
- Use hotel safes for valuables
- Avoid walking alone at night in cities
- Always carry a copy of your passport

**Safari Safety:**
- Always follow your guide's instructions
- Never get out of the vehicle unless permitted
- Keep hands inside the vehicle
- Don't make sudden movements near animals
- Maintain safe distance from wildlife

**Health Safety:**
- Stay hydrated
- Protect yourself from the sun
- Use insect repellent consistently
- Don't swim in freshwater lakes (bilharzia risk)

**Money Tips:**
- Carry some USD cash (2006 or newer)
- ATMs available in major cities
- Credit cards accepted at most lodges
- Inform your bank of travel plans

**Emergency Contacts:**
- Police: 112 or 999
- Tourism Police Arusha: +255 27 250 3361
- Your embassy contact information`
  },
];

const TravelInfo = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="relative py-24 bg-primary">
        <div className="container-wide text-center">
          <h1 className="text-4xl md:text-5xl font-heading font-semibold text-primary-foreground mb-4">
            Travel Information
          </h1>
          <p className="text-primary-foreground/80 max-w-2xl mx-auto">
            Everything you need to know to prepare for your Tanzanian adventure.
          </p>
        </div>
      </section>

      {/* Quick Links */}
      <section className="py-8 border-b border-border bg-card sticky top-16 md:top-20 z-40">
        <div className="container-wide">
          <div className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 md:mx-0 md:px-0 md:justify-center">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                className="flex items-center gap-2 px-4 py-2 rounded-full bg-muted hover:bg-primary hover:text-primary-foreground transition-colors whitespace-nowrap text-sm"
              >
                <section.icon className="h-4 w-4" />
                {section.title}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Content Sections */}
      <section className="section-padding">
        <div className="container-wide max-w-4xl">
          <div className="space-y-16">
            {sections.map((section) => (
              <div key={section.id} id={section.id} className="scroll-mt-32">
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <section.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-heading font-semibold">
                    {section.title}
                  </h2>
                </div>
                <div className="prose prose-slate max-w-none">
                  {section.content.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                      return (
                        <h3 key={index} className="text-lg font-semibold mt-6 mb-2">
                          {paragraph.replace(/\*\*/g, '')}
                        </h3>
                      );
                    }
                    if (paragraph.startsWith('**')) {
                      const [title, ...rest] = paragraph.split(':**');
                      return (
                        <div key={index} className="mt-4">
                          <h4 className="font-semibold">{title.replace(/\*\*/g, '')}:</h4>
                          <p className="text-muted-foreground whitespace-pre-line">{rest.join(':**')}</p>
                        </div>
                      );
                    }
                    if (paragraph.startsWith('-')) {
                      return (
                        <ul key={index} className="list-disc list-inside text-muted-foreground space-y-1">
                          {paragraph.split('\n').map((item, i) => (
                            <li key={i}>{item.replace(/^- /, '')}</li>
                          ))}
                        </ul>
                      );
                    }
                    return (
                      <p key={index} className="text-muted-foreground whitespace-pre-line">
                        {paragraph}
                      </p>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default TravelInfo;
