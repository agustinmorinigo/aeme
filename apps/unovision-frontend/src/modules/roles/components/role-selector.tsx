import type { RoleName } from '@aeme/supabase-client/entities';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from '@aeme/ui';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function RoleSelector() {
  const { roles, selectedRole, setSelectedRole } = useUserStore();

  const handleOnRoleChange = (newRoleName: RoleName) => {
    const selectedRole = roles.find((role) => role.name === newRoleName);
    if (!selectedRole) return;
    setSelectedRole(selectedRole);
  };

  if (roles.length <= 1) return null;

  return (
    <Select value={selectedRole?.name} onValueChange={handleOnRoleChange}>
      <SelectTrigger className='w-[180px]'>
        <SelectValue placeholder='Seleccione el rol' />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Rol</SelectLabel>
          {roles.map((role) => (
            <SelectItem key={role.id} value={role.name}>
              {role.description}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
