import { SidebarProvider } from '@aeme/ui';
import useSidebarVisibility from '@/modules/app/hooks/use-sidebar-visibility';
import Body from '@/modules/app/layout/body';
import Header from '@/modules/app/layout/header';
import Sidebar from '@/modules/app/layout/sidebar';

export const Layout = () => {
  const { isOpen } = useSidebarVisibility();

  return (
    <SidebarProvider defaultOpen={isOpen}>
      <Sidebar />
      <main className='size-full overflow-x-hidden overflow-y-auto'>
        <Header />
        <Body />
      </main>
    </SidebarProvider>
  );
};
