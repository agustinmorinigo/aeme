/**
 * File upload constants for justification documents
 */

export const maxFileSize = 5 * 1024 * 1024; // 5MB

export const acceptedFileTypes = [
  { extension: '.pdf', mimeType: 'application/pdf', label: 'PDF' },
  { extension: '.jpg', mimeType: 'image/jpeg', label: 'JPG' },
  { extension: '.jpeg', mimeType: 'image/jpeg', label: 'JPEG' },
  { extension: '.png', mimeType: 'image/png', label: 'PNG' },
  { extension: '.webp', mimeType: 'image/webp', label: 'WEBP' },
  { extension: '.doc', mimeType: 'application/msword', label: 'DOC' },
  {
    extension: '.docx',
    mimeType: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    label: 'DOCX',
  },
] as const;

/**
 * Get array of file extensions (e.g., ['.pdf', '.jpg', ...])
 */
export const getFileExtensions = () => acceptedFileTypes.map((type) => type.extension);

/**
 * Get array of MIME types (e.g., ['application/pdf', 'image/jpeg', ...])
 */
export const getFileMimeTypes = () => acceptedFileTypes.map((type) => type.mimeType);

/**
 * Get comma-separated list of file type labels (e.g., 'PDF, JPG, JPEG, PNG, DOC, DOCX')
 */
export const getFileTypeLabels = () => acceptedFileTypes.map((type) => type.label).join(', ');
