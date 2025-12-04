import { create } from '@/services/api/user-management/create';
import { remove } from '@/services/api/user-management/delete';
import { get } from '@/services/api/user-management/get';
import { getById } from '@/services/api/user-management/get-by-id';
import { update } from '@/services/api/user-management/update';

export const userManagement = {
  create,
  update,
  delete: remove,
  get,
  getById,
};
