import type { Profile } from '@/client/entities';

export default function getFormattedUserFullName(profile: Profile): string {
  const { name, lastName } = profile;
  return `${name} ${lastName}`;
}
