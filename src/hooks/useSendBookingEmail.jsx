// hooks/useSendBookingEmail.ts
import { useState } from "react";
import { supabase } from '@/integrations/supabase/client';

export function useSendBookingEmail() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendBookingEmail = async (payload) => {
    setLoading(true);
    setError(null);

    try {
      const { data, error: fnError } = await supabase.functions.invoke(
        "send-booking-email",
        { body: payload }
      );

      if (fnError) {
        console.error("Supabase Function Error:", fnError);
        setError(fnError.message);
        return { success: false, error: fnError.message };
      }

      return { success: true, data };
    } catch (err) {
      console.error("Unexpected error:", err);
      setError(err.message);
      return { success: false, error: err.message };
    } finally {
      setLoading(false);
    }
  };

  return {
    sendBookingEmail,
    loading,
    error,
  };
}
