import supabase from '@/client';

export async function get(userId: string) {
  const { data, error } = await supabase
    .from('profiles')
    .select(`
      *,
      organizations:usersOrganizations!profileId(organizations(*)),
      roles:profilesRoles!profileId(roles(*))
    `)
    .eq('id', userId)
    .single();

  if (error) throw error;
  return data;
}
