import { create } from './create';
import { deleteJustification } from './delete';
import { get } from './get';
import { getById } from './get-by-id';
import { update } from './update';

export const justifications = {
  get,
  getById,
  create,
  update,
  delete: deleteJustification,
};
