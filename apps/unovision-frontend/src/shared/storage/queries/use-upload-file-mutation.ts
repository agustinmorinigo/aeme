import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

interface UploadFileParams {
  bucketName: string;
  file: File;
  filePath: string;
}

/**
 * Generic hook for uploading files to Supabase storage
 * @returns TanStack Query mutation with upload function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: uploadFile, isPending } = useUploadFileMutation();
 * const publicUrl = await uploadFile({ bucketName: 'my-bucket', file, filePath: 'folder/file.pdf' });
 */
export function useUploadFileMutation() {
  return useMutation({
    mutationFn: ({ bucketName, file, filePath }: UploadFileParams) => api.storage.upload(bucketName, file, filePath),
  });
}
