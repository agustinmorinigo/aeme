import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

interface DeleteFileParams {
  bucketName: string;
  filePath: string;
}

/**
 * Generic hook for deleting files from Supabase storage
 * @returns TanStack Query mutation with delete function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: deleteFile, isPending } = useDeleteFileMutation();
 * await deleteFile({ bucketName: 'my-bucket', filePath: 'folder/file.pdf' });
 */
export function useDeleteFileMutation() {
  return useMutation({
    mutationFn: ({ bucketName, filePath }: DeleteFileParams) => api.storage.delete(bucketName, filePath),
  });
}
