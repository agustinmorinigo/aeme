import supabase from '@/client';

interface DeleteUserResponse {
  message: string;
}

export async function remove(userId: string) {
  const { data, error } = await supabase.functions.invoke<DeleteUserResponse>(`user-management/${userId}`, {
    method: 'DELETE',
  });

  if (error) throw error;
  return data;
}
