import supabase from '@/client';
import type { Organization } from '@/client/entities';

export async function getAll(): Promise<Organization[]> {
  const { data, error } = await supabase.from('organizations').select('*');
  if (error) throw error;
  return data;
}
