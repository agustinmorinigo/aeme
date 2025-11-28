import type { Organization } from '@aeme/supabase-client/entities';
import supabase from '@/client';

export async function getAll(): Promise<Organization[]> {
  const { data, error } = await supabase.from('organizations').select('*');
  if (error) throw error;
  return data;
}
