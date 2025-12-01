import { get } from '@/services/api/users/get';
import { getAll } from '@/services/api/users/get-all';
import { getAllWithPagination } from '@/services/api/users/get-all-with-pagination';
import { getDetails } from '@/services/api/users/get-details';

// ESTO NO VA A IR MÁS.
export const user = {
  get,
  getDetails,
  getAll,
  getAllWithPagination,
};
