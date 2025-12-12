import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';

export const DESTINATION_REGIONS = [
  'Northern Circuit',
  'Southern Circuit',
  'Western Circuit',
  'Coastal & Islands',
  'Southern Highlands',
  "Lake Zone",
  "Central Circuit",
];

export function useDestinations(region) {
  return useQuery({
    queryKey: ['destinations', region],
    queryFn: async () => {
      let query = supabase
        .from('destinations')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (region) {
        query = query.eq('region', region);
      }
      
      const { data, error } = await query;
      
      if (error) throw error;
      return data || []; // removed "as Destination[]"
    },
  });
}
