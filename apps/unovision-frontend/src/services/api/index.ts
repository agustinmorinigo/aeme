import { attendance } from '@/services/api/attendance';
import { auth } from '@/services/api/auth';
import { organizations } from '@/services/api/organizations';
import { userManagement } from '@/services/api/user-management';

const api = {
  auth,
  organizations,
  attendance,
  userManagement,
};

export default api;
