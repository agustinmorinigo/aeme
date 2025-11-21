import { Button, SidebarTrigger } from '@aeme/ui';
import { LogOut, Moon, Sun } from '@aeme/ui/icons';
import useSidebarVisibility from '@/modules/app/hooks/use-sidebar-visibility';
import useTheme from '@/modules/app/providers/theme-provider';
import useSignOutMutation from '@/modules/auth/queries/use-sign-out-mutation';
import RoleSelector from '@/modules/roles/components/role-selector';

export default function Header() {
  const { mutate: signOut } = useSignOutMutation();
  const { toggleTheme, isLight } = useTheme();
  const { toggleSidebar } = useSidebarVisibility();

  return (
    <header className='w-full p-4 flex items-center justify-between border-b shrink-0'>
      <div className='flex items-center gap-4'>
        <SidebarTrigger onClick={toggleSidebar} />
        <h1 className='text-lg font-semibold'>Unovision</h1>
      </div>

      <div className='flex items-center justify-center gap-2'>
        <RoleSelector />

        <Button
          onClick={toggleTheme}
          variant='ghost'
          title={isLight ? 'Cambiar a modo oscuro' : 'Cambiar a modo claro'}
        >
          {isLight ? <Moon /> : <Sun />}
        </Button>

        <Button onClick={() => signOut()} variant='ghost' title='Cerrar sesión'>
          <LogOut />
        </Button>
      </div>
    </header>
  );
}
