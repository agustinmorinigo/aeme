import { bucketName } from '@/modules/justifications/constants/bucket-name';
import { useUploadFileMutation } from '@/shared/storage/queries/use-upload-file-mutation';

interface UploadJustificationDocumentParams {
  file: File;
  employeeId: string;
}

/**
 * Hook for uploading justification documents
 * @returns TanStack Query mutation with upload function and state (isPending, isError, etc.)
 * @example
 * const { mutateAsync: uploadDocument, isPending } = useUploadJustificationDocumentMutation();
 * const publicUrl = await uploadDocument({ file, employeeId: '123' });
 */
export function useUploadJustificationDocumentMutation() {
  const { mutateAsync, ...rest } = useUploadFileMutation();

  return {
    mutateAsync: async (params: UploadJustificationDocumentParams) => {
      const fileExtension = params.file.name.split('.').pop();
      const timestamp = Date.now();
      const filePath = `${params.employeeId}/${timestamp}.${fileExtension}`;

      return mutateAsync({
        bucketName: bucketName,
        file: params.file,
        filePath,
      });
    },
    ...rest,
  };
}
