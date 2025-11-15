import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import type { FileWithPreview } from '../../hooks/use-file-upload';
import SimpleFileUploader from './file-uploader';

const meta: Meta<typeof SimpleFileUploader> = {
  title: 'Components/FileUploader',
  component: SimpleFileUploader,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    maxSize: {
      control: 'number',
      description: 'Maximum file size in bytes',
    },
    accept: {
      control: 'text',
      description: 'Accepted file types',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the file uploader',
    },
    label: {
      control: 'text',
      description: 'Label text for the uploader',
    },
    description: {
      control: 'text',
      description: 'Description text for the uploader',
    },
    onFileAdded: {
      action: 'onFileAdded',
      description: 'Callback when file is added',
    },
    onRemoveFile: {
      action: 'onRemoveFile',
      description: 'Callback when file is removed',
    },
  },
  args: {
    maxSize: 5 * 1024 * 1024, // 5MB
    accept: '.pdf,.doc,.docx,.txt',
    disabled: false,
    label: 'Upload your file',
    description: 'Drag and drop or click to browse',
  },
};

export default meta;
type Story = StoryObj<typeof SimpleFileUploader>;

export const Default: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader {...args} file={file} onFileAdded={setFile} onRemoveFile={() => setFile(undefined)} />
      </div>
    );
  },
};

export const ImagesOnly: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          accept='.jpg,.jpeg,.png,.gif,.webp'
          label='Upload image'
          description='Only image files are allowed'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const DocumentsOnly: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          accept='.pdf,.doc,.docx,.txt,.rtf'
          label='Upload document'
          description='PDF, Word, or text files only'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const SmallSize: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          maxSize={1024 * 1024} // 1MB
          label='Upload small file'
          description='Maximum size: 1MB'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const LargeSize: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          maxSize={50 * 1024 * 1024} // 50MB
          label='Upload large file'
          description='Maximum size: 50MB'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: (args) => (
    <div className='w-96'>
      <SimpleFileUploader {...args} disabled label='Upload disabled' description='This uploader is disabled' />
    </div>
  ),
};

export const CustomLabels: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          label='Selecciona tu archivo'
          description='Arrastra y suelta o haz clic para navegar'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const NoDescription: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-96'>
        <SimpleFileUploader
          {...args}
          label='Upload file'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};

export const WithPreselectedFile: Story = {
  render: (args) => {
    const mockFile: FileWithPreview = {
      id: 'mock-file',
      file: new File(['mock content'], 'example-document.pdf', { type: 'application/pdf' }),
      preview: undefined,
    };

    const [file, setFile] = useState<FileWithPreview | undefined>(mockFile);

    return (
      <div className='w-96'>
        <SimpleFileUploader {...args} file={file} onFileAdded={setFile} onRemoveFile={() => setFile(undefined)} />
      </div>
    );
  },
};

export const Compact: Story = {
  render: (args) => {
    const [file, setFile] = useState<FileWithPreview | undefined>();

    return (
      <div className='w-80'>
        <SimpleFileUploader
          {...args}
          label='Upload'
          className='text-sm'
          file={file}
          onFileAdded={setFile}
          onRemoveFile={() => setFile(undefined)}
        />
      </div>
    );
  },
};
