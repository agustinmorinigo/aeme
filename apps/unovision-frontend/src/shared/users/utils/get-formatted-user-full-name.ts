import type { Profile } from '@aeme/supabase-client/entities';

export default function getFormattedUserFullName(profile: Profile): string {
  const { name, lastName } = profile;
  return `${name} ${lastName}`;
}
