import supabase from '@/client';

export async function getAll() {
  const { data, error } = await supabase.from('profiles').select(`*, roles:profilesRoles!profileId(roles(*))`);
  if (error) throw error;
  return data;
}