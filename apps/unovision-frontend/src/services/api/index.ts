import { attendance } from '@/services/api/attendance';
import { auth } from '@/services/api/auth';
import { organizations } from '@/services/api/organizations';
import { storage } from '@/services/api/storage';
import { userManagement } from '@/services/api/user-management';

const api = {
  auth,
  organizations,
  attendance,
  userManagement,
  storage,
};

export default api;
