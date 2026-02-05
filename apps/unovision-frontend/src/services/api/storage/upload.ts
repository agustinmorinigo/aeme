import { supabase } from '@/client';

/**
 * Uploads a file to a Supabase storage bucket
 * @param bucketName - The name of the storage bucket
 * @param file - The file to upload
 * @param filePath - The path where the file will be stored in the bucket
 * @returns The public URL of the uploaded file
 */
export async function upload(bucketName: string, file: File, filePath: string): Promise<string> {
  const { data, error } = await supabase.storage.from(bucketName).upload(filePath, file, {
    cacheControl: '3600',
    upsert: false,
  });

  if (error) {
    throw new Error(`Error al subir el archivo: ${error.message}`);
  }

  const { data: urlData } = supabase.storage.from(bucketName).getPublicUrl(data.path);

  return urlData.publicUrl;
}
