import type { Profile } from '@aeme/supabase-client/entities';
import { formatDoc } from '@/shared/documents/utils/format-doc';

export default function getFormattedUserDocument(profile: Profile): string {
  const { documentType, documentValue } = profile;
  return `${documentType} ${formatDoc(documentValue)}`;
}
