import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { DestinationsSection } from '@/components/home/DestinationsSection';
import { ToursSection } from '@/components/home/ToursSection';
import { WhyChooseUsSection } from '@/components/home/WhyChooseUsSection';
import { TestimonialsSection } from '@/components/home/TestimonialsSection';
import { TripPlannerSection } from '@/components/home/TripPlannerSection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <DestinationsSection />
      <ToursSection />
      <WhyChooseUsSection />
      <TestimonialsSection />
      <TripPlannerSection />
    </Layout>
  );
};

export default Index;
