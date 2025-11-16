import { PaperclipIcon, UploadIcon, XIcon } from 'lucide-react';
import { Button } from '../../components';
import { type FileWithPreview, formatBytes, useFileUpload } from '../../hooks/use-file-upload';
import { cn } from '../../lib/utils';

interface SimpleFileUploaderProps {
  maxSize: number;
  accept: string;
  disabled?: boolean;
  label?: string;
  description?: string;
  className?: string;
  file?: FileWithPreview;
  onFileAdded?: (file: FileWithPreview) => void;
  onRemoveFile?: () => void;
}

export function SimpleFileUploader({
  file,
  maxSize,
  accept,
  disabled = false,
  label = 'Sube tu archivo',
  description,
  className,
  onFileAdded,
  onRemoveFile,
}: SimpleFileUploaderProps) {
  const [
    { isDragging, errors },
    { handleDragEnter, handleDragLeave, handleDragOver, handleDrop, openFileDialog, removeFile, getInputProps },
  ] = useFileUpload({
    maxSize,
    accept,
    multiple: false,
    onFilesAdded: (files) => {
      if (files[0]) {
        onFileAdded?.(files[0]);
      }
    },
  });

  const getErrorMsg = (error: string): string => {
    if (error.includes('File exceeds the maximum size')) {
      return `El archivo excede el tamaño máximo de ${formatBytes(maxSize)}.`;
    } else if (error.includes('is not an accepted file type.')) {
      return 'El tipo de archivo no es aceptado.';
    }
    return error;
  };

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {/* Drop area */}
      <button
        type='button'
        onClick={openFileDialog}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            openFileDialog();
          }
        }}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        data-dragging={isDragging || undefined}
        disabled={disabled || Boolean(file)}
        className={cn(
          'border-input hover:bg-accent/50 data-[dragging=true]:bg-accent/50 select-none flex min-h-40 flex-col items-center justify-center rounded-xl border border-dashed p-4 transition-colors cursor-pointer',
          disabled && 'pointer-events-none opacity-50',
        )}
        tabIndex={0}
      >
        <input {...getInputProps()} className='sr-only' aria-label='Upload file' disabled={disabled || Boolean(file)} />

        <div className='flex flex-col items-center justify-center text-center'>
          <div
            className='bg-background mb-2 flex size-11 shrink-0 items-center justify-center rounded-full border'
            aria-hidden='true'
          >
            <UploadIcon className='size-4 opacity-60' />
          </div>
          <p className='mb-1.5 text-sm font-medium'>{label}</p>
          {description && <p className='text-muted-foreground text-xs'>{description}</p>}
        </div>
      </button>

      {errors.length > 0 && errors[0] && (
        <div className='text-destructive flex items-center gap-1 text-xs' role='alert'>
          <span>{getErrorMsg(errors[0])}</span>
        </div>
      )}

      {/* File */}
      {file && (
        <div className='flex items-center justify-between gap-2 rounded-xl border px-4 py-2'>
          <div className='flex items-center gap-3 overflow-hidden'>
            <PaperclipIcon className='size-4 shrink-0 opacity-60' />
            <div className='min-w-0'>
              <p className='truncate text-[13px] font-medium'>{file.file.name}</p>
            </div>
          </div>
          <Button
            size='icon'
            variant='ghost'
            className='text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent'
            onClick={() => {
              removeFile(file.id);
              onRemoveFile?.();
            }}
            aria-label='Remove file'
          >
            <XIcon className='size-4' />
          </Button>
        </div>
      )}
    </div>
  );
}
