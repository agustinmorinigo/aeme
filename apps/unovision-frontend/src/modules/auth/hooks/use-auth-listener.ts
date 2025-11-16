import { useEffect } from 'react';
import supabase from '@/client';
import { resetAllStores } from '@/config/store';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function useAuthListener() {
  useEffect(() => {
    const { setUserId } = useUserStore.getState();

    const { data: subscription } = supabase.auth.onAuthStateChange((_, session) => {
      if (!session) {
        resetAllStores();
        return;
      }

      if (session.user.id !== useUserStore.getState().userId) {
        setUserId(session.user.id);
      }
    });

    return () => {
      subscription.subscription.unsubscribe();
    };
  }, []);
}
