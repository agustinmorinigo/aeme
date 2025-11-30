import type { Profile } from '@aeme/supabase-client/entities';

export default function getFormattedUserPhone(profile: Profile): string {
  const { phone } = profile;
  return phone ? phone : '-';
}
