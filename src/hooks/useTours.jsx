import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

const transformTour = (dbTour) => ({
  id: dbTour.id,
  slug: dbTour.slug,
  title: dbTour.title,
  category: dbTour.category,
  duration: dbTour.duration,
  price: dbTour.price,
  image: dbTour.image_url || '/images/placeholder.svg',
  shortDescription: dbTour.short_description || '',
  highlights: dbTour.highlights || [],
  itinerary: Array.isArray(dbTour.itinerary) ? dbTour.itinerary : [],
  inclusions: dbTour.inclusions || [],
  exclusions: dbTour.exclusions || [],
  gallery: dbTour.gallery || [],
});

export function useTours() {
  return useQuery({
    queryKey: ['tours'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data.map(transformTour);
    },
  });
}

export function useTour(slug) {
  return useQuery({
    queryKey: ['tour', slug],
    queryFn: async () => {
      if (!slug) return null;

      const { data, error } = await supabase
        .from('tours')
        .select('*')
        .eq('slug', slug)
        .eq('is_active', true)
        .maybeSingle();

      if (error) throw error;
      if (!data) return null;

      return transformTour(data);
    },
    enabled: !!slug,
  });
}
