import supabase from '@/client';

export async function getAllByOrgId(orgId: string) {
  const { data: orgProfileIds, error: orgError } = await supabase
    .from('usersOrganizations')
    .select('profileId')
    .eq('organizationId', orgId);

  if (orgError) throw orgError;
  if (!orgProfileIds?.length) return [];

  const profileIds = orgProfileIds.map((u) => u.profileId);

  const { data, error } = await supabase
    .from('employees')
    .select(`
      *,
      profile:profiles!inner(*),
      employeeSchedules(*)
    `)
    .in('profileId', profileIds);

  if (error) throw error;
  return data;
}