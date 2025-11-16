import supabase from '@/client';

export default async function getByUserId(userId: string) {
  const { data, error } = await supabase.from('usersOrganizations').select('organizationId').eq('userId', userId);
  if (error) throw error;
  return data;
}
