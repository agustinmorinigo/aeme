/**
 * Extracts the file path from a Supabase storage public URL
 * @param publicUrl - The full public URL from Supabase storage
 * @param bucketName - The name of the storage bucket
 * @returns The file path within the bucket
 * @example
 * extractPathFromPublicUrl(
 *   'https://project.supabase.co/storage/v1/object/public/my-bucket/folder/file.pdf',
 *   'my-bucket'
 * ) // Returns: 'folder/file.pdf'
 */
export function extractPathFromPublicUrl(publicUrl: string, bucketName: string): string {
  // URL format: https://<project>.supabase.co/storage/v1/object/public/<bucket>/<path>
  const url = new URL(publicUrl);
  const pathParts = url.pathname.split('/');

  // Find the bucket name in the path
  const bucketIndex = pathParts.indexOf(bucketName);
  if (bucketIndex === -1) {
    throw new Error(`Bucket name "${bucketName}" not found in URL: ${publicUrl}`);
  }

  // Everything after the bucket name is the file path
  const filePath = pathParts.slice(bucketIndex + 1).join('/');

  if (!filePath) {
    throw new Error(`Could not extract file path from URL: ${publicUrl}`);
  }

  return filePath;
}
