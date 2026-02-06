import { attendance } from '@/services/api/attendance';
import { auth } from '@/services/api/auth';
import { organizationEvents } from '@/services/api/organization-events';
import { organizations } from '@/services/api/organizations';
import { storage } from '@/services/api/storage';
import { userManagement } from '@/services/api/user-management';

const api = {
  auth,
  organizations,
  organizationEvents,
  attendance,
  userManagement,
  storage,
};

export default api;
