import { create } from './create';
import { deleteOrganizationEvent } from './delete';
import { get } from './get';
import { getById } from './get-by-id';
import { update } from './update';

export const organizationEvents = {
  get,
  getById,
  create,
  update,
  delete: deleteOrganizationEvent,
};
