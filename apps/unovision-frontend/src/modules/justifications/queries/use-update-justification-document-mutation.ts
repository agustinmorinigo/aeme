import { bucketName } from '@/modules/justifications/constants/bucket-name';
import { useUpdateFileMutation } from '@/shared/storage/queries/use-update-file-mutation';
import { extractPathFromPublicUrl } from '@/utils/storage';

interface UpdateJustificationDocumentParams {
  oldPublicUrl: string;
  newFile: File;
  employeeId: string;
}

/**
 * Hook for updating justification documents (deletes old, uploads new)
 * @returns TanStack Query mutation with update function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: updateDocument, isPending } = useUpdateJustificationDocumentMutation();
 * const publicUrl = await updateDocument({ oldPublicUrl: 'https://...', newFile, employeeId: '123' });
 */
export function useUpdateJustificationDocumentMutation() {
  const { mutateAsync, ...rest } = useUpdateFileMutation();

  return {
    mutateAsync: async (params: UpdateJustificationDocumentParams) => {
      const oldFilePath = extractPathFromPublicUrl(params.oldPublicUrl, bucketName);
      const fileExtension = params.newFile.name.split('.').pop();
      const timestamp = Date.now();
      const newFilePath = `${params.employeeId}/${timestamp}.${fileExtension}`;

      return mutateAsync({
        bucketName: bucketName,
        oldFilePath,
        newFile: params.newFile,
        newFilePath,
      });
    },
    ...rest,
  };
}
