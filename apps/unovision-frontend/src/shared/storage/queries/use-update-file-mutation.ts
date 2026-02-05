import { useMutation } from '@tanstack/react-query';
import api from '@/services/api';

interface UpdateFileParams {
  bucketName: string;
  oldFilePath: string;
  newFile: File;
  newFilePath: string;
}

/**
 * Generic hook for updating files in Supabase storage (deletes old, uploads new)
 * @returns TanStack Query mutation with update function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: updateFile, isPending } = useUpdateFileMutation();
 * const publicUrl = await updateFile({
 *   bucketName: 'my-bucket',
 *   oldFilePath: 'folder/old.pdf',
 *   newFile,
 *   newFilePath: 'folder/new.pdf'
 * });
 */
export function useUpdateFileMutation() {
  return useMutation({
    mutationFn: ({ bucketName, oldFilePath, newFile, newFilePath }: UpdateFileParams) =>
      api.storage.update(bucketName, oldFilePath, newFile, newFilePath),
  });
}
