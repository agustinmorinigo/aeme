import { auth } from '@/services/api/auth';
import { employees } from '@/services/api/employees';
import { organizations } from '@/services/api/organizations';
import { userManagement } from '@/services/api/user-management';
import { usersOrganizations } from '@/services/api/users-organizations';

const api = {
  auth,
  usersOrganizations,
  organizations,
  employees,
  userManagement,
};

export default api;
