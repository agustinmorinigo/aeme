import {
  Sidebar as ShadcnSidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@aeme/ui';
import { ListTodo } from '@aeme/ui/icons';
import clsx from 'clsx';
import { Link, useLocation } from 'react-router';
import { getSidebarGroupsByRole } from '@/modules/app/config/sidebar-groups';
import isSidebarItemActive from '@/modules/app/utils/is-sidebar-item-active';
import useUserStore from '@/modules/auth/stores/use-user-store';

export default function Sidebar() {
  const { selectedRole } = useUserStore();
  const location = useLocation();

  if (!selectedRole) return null;

  const visibleGroups = getSidebarGroupsByRole(selectedRole.name);

  return (
    <ShadcnSidebar>
      <SidebarHeader className='border-b border-sidebar-border'>
        <div className='flex items-center gap-2 px-2 py-4'>
          <div className='flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground'>
            <ListTodo className='size-5' />
          </div>
          <div className='flex flex-col'>
            <span className='text-sm font-semibold'>Business Management</span>
            <span className='text-xs text-muted-foreground'>Gestión Empresarial</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        {visibleGroups.map((group) => (
          <SidebarGroup key={group.label}>
            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {group.items.map((item) => {
                  const isActive = isSidebarItemActive(item.path, location.pathname);

                  return (
                    <SidebarMenuItem key={item.path}>
                      <SidebarMenuButton asChild>
                        <Link
                          to={item.path}
                          className={clsx(
                            'flex items-center gap-2 px-2 py-1 rounded-md hover:bg-muted',
                            isActive && 'bg-primary text-primary-foreground hover:bg-primary/90',
                          )}
                        >
                          <item.icon className='h-4 w-4' />
                          <span className='text-sm'>{item.label}</span>
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
    </ShadcnSidebar>
  );
}
