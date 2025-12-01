import { auth } from '@/services/api/auth';
import { employees } from '@/services/api/employees';
import { organizations } from '@/services/api/organizations';
import { userManagement } from '@/services/api/user-management';
import { user } from '@/services/api/users';
import { usersOrganizations } from '@/services/api/users-organizations';

const api = {
  auth,
  usersOrganizations,
  organizations,
  user,
  employees,
  userManagement,
};

export default api;
