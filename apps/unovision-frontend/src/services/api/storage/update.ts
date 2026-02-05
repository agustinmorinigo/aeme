import { deleteFile } from './delete';
import { upload } from './upload';

/**
 * Updates a file in a Supabase storage bucket (deletes old, uploads new)
 * @param bucketName - The name of the storage bucket
 * @param oldFilePath - The path of the file to replace within the bucket
 * @param newFile - The new file to upload
 * @param newFilePath - The path where the new file will be stored
 * @returns The public URL of the newly uploaded file
 */
export async function update(
  bucketName: string,
  oldFilePath: string,
  newFile: File,
  newFilePath: string,
): Promise<string> {
  // Delete the old file first
  await deleteFile(bucketName, oldFilePath);

  // Upload the new file
  return upload(bucketName, newFile, newFilePath);
}
