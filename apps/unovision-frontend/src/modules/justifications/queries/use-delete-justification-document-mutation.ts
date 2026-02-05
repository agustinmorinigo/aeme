import { bucketName } from '@/modules/justifications/constants/bucket-name';
import { useDeleteFileMutation } from '@/shared/storage/queries/use-delete-file-mutation';
import { extractPathFromPublicUrl } from '@/utils/storage';

interface DeleteJustificationDocumentParams {
  publicUrl: string;
}

/**
 * Hook for deleting justification documents
 * @returns TanStack Query mutation with delete function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: deleteDocument, isPending } = useDeleteJustificationDocumentMutation();
 * await deleteDocument({ publicUrl: 'https://...' });
 */
export function useDeleteJustificationDocumentMutation() {
  const { mutateAsync, ...rest } = useDeleteFileMutation();

  return {
    mutateAsync: async (params: DeleteJustificationDocumentParams) => {
      const filePath = extractPathFromPublicUrl(params.publicUrl, bucketName);

      return mutateAsync({
        bucketName: bucketName,
        filePath,
      });
    },
    ...rest,
  };
}
