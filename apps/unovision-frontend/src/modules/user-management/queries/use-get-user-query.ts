import { type UseQueryResult, useQuery } from '@tanstack/react-query';
import { RoleName } from '@/client/entities';
import useHandleUserModalStore from '@/modules/user-management/stores/handle-user-modal-store';
import api from '@/services/api';
import type { UserWithDetails } from '@/shared/users/types';

export type UseGetUsersQueryResponse = UseQueryResult<UserWithDetails, Error>;

export default function useGetUserQuery() {
  const { user } = useHandleUserModalStore();
  
  const query = useQuery({
    queryKey: ['get-user', user?.profile.id],
    queryFn: () => {
      if (!user) return null;

      const needsEmployeeInfo = user.roles.some(role => role.name === RoleName.Employee);
      const needsPatientInfo = user.roles.some(role => role.name === RoleName.Patient);
      const needsDoctorInfo = user.roles.some(role => role.name === RoleName.Doctor);

      const params = {
        userId: user.profile.id,
        needsEmployeeInfo,
        needsPatientInfo,
        needsDoctorInfo,
      }

      return api.user.getDetails(params);
      
    },
    enabled: !!user?.profile.id,
    select(data) {
      if(!data) return null;

      const organizationsParsed = data.organizations.map((item) => item.organizations);
      const rolesParsed = data.roles.map((item) => item.roles);
      const { organizations: _, roles: __, documentType, gender, ...rest } = data;

      return {
        profile: {
          documentType: documentType,
          gender: gender,
          ...rest,
        },
        organizations: organizationsParsed,
        roles: rolesParsed,
      };
    },
  })

  return query;
}
