import { deleteFile } from './delete';
import { update } from './update';
import { upload } from './upload';

export const storage = {
  upload,
  delete: deleteFile,
  update,
};
