import type { Profile } from '@aeme/supabase-client/entities';

export default function getFormattedUserDocument(profile: Profile): string {
  const { documentType, documentValue } = profile;
  return `${documentType} ${documentValue}`;
}
