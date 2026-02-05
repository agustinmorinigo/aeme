import { supabase } from '@/client';

/**
 * Deletes a file from a Supabase storage bucket
 * @param bucketName - The name of the storage bucket
 * @param filePath - The path of the file to delete within the bucket
 */
export async function deleteFile(bucketName: string, filePath: string): Promise<void> {
  const { error } = await supabase.storage.from(bucketName).remove([filePath]);

  if (error) {
    throw new Error(`Error al eliminar el archivo: ${error.message}`);
  }
}
