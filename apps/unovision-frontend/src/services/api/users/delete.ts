import supabase from '@/client';

interface DeleteUserResponse {
  message: string;
}

interface RemoveUserBody {
  userId: string;
}

export async function remove(body: RemoveUserBody) {
  const { data, error } = await supabase.functions.invoke<DeleteUserResponse>('delete-user', { body });
  if (error) throw error;
  return data;
}
