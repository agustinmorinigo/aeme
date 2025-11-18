import type { Profile } from '@/client/entities';

export default function getFormattedUserPhone(profile: Profile): string {
  const { phone } = profile;
  return phone ? phone : '-';
}
