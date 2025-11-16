import { auth } from '@/services/api/auth';
import { employees } from '@/services/api/employees';
import { organizations } from '@/services/api/organizations';
import { user } from '@/services/api/users';
import { usersOrganizations } from '@/services/api/users-organizations';

// Each module here refers to a table in the database. Then, in each module, the methods needed to interact with the API are created.
const api = {
  auth,
  usersOrganizations,
  organizations,
  user,
  employees,
};

export default api;
