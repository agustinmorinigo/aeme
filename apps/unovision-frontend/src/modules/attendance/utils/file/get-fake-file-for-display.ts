import type { FileMetadata } from '@/modules/attendance/types/basic-report-info';

/**
 * Creates a fake `File` object for display purposes based on the provided file metadata.
 *
 * This function is useful when you want to show a file in the UI (e.g., in a file input or preview)
 * without having the actual file data. The returned `File` object contains only the metadata and an empty content.
 *
 * @param fileMetadata - The metadata of the file to be displayed. If `null`, the function returns `null`.
 * @returns A new `File` object with the specified metadata, or `null` if no metadata is provided.
 *
 * @example
 * const metadata = {
 *   name: 'example.pdf',
 *   type: 'application/pdf',
 *   lastModified: 1712345678901,
 * };
 * const fakeFile = getFakeFileForDisplay(metadata);
 * // fakeFile.name === 'example.pdf'
 * // fakeFile.type === 'application/pdf'
 * // fakeFile.lastModified === 1712345678901
 *
 * @example
 * const fakeFile = getFakeFileForDisplay(null);
 * // fakeFile === null
 */
export function getFakeFileForDisplay(fileMetadata: FileMetadata | null): File | null {
  if (!fileMetadata) return null;

  return new File([''], fileMetadata.name, {
    type: fileMetadata.type,
    lastModified: fileMetadata.lastModified,
  });
}
