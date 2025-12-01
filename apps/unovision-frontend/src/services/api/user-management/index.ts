import { create } from '@/services/api/user-management/create';
import { remove } from '@/services/api/user-management/delete';
import { update } from '@/services/api/user-management/update';
// import { get } from '@/services/api/users/get';
// import { getAll } from '@/services/api/users/get-all';
// import { getAllWithPagination } from '@/services/api/users/get-all-with-pagination';
// import { getDetails } from '@/services/api/users/get-details';

export const userManagement = {
  create,
  update,
  delete: remove,
};
