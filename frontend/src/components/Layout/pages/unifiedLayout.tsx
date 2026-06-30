import { SidebarProvider } from '@/components/ui/sidebar';
import { RootState, useAppSelector } from '@/store';
import React from 'react';
import { Outlet } from 'react-router';
import { Footer } from '../components/Footer';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';
import { useLayoutClassManagement } from '../hooks/useLayoutClassManagement';
import { LayoutConfig } from '../types';
import { AppArea } from '@/config/areas/areaConfig';
import SupportChat from '@/components/SupportChat/SupportChat';

interface UnifiedLayoutProps {
  config: LayoutConfig;
}

const UnifiedLayout: React.FC<UnifiedLayoutProps> = ({ config }) => {
  const { isLoggedIn, user, isDarkTheme, isCompactTheme } = useAppSelector((state: RootState) => state.session);

  useLayoutClassManagement({
    layoutType: config.type as AppArea,
    isLoggedIn,
    isDarkTheme,
    isCompactTheme,
  });

  const iconClasses = 'size-4';

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full overflow-hidden">
        <Sidebar config={config} user={user} />
        <div className="flex flex-col flex-1 overflow-hidden">
          <Header config={config} iconClasses={iconClasses} />
          <main id={config.type === 'default' ? 'contentMain' : undefined} className="flex-1 p-4 sm:p-6 overflow-auto">
            <Outlet />
          </main>
          {config.showFooter && <Footer footerText={config.footerText} />}
        </div>
      </div>
      <SupportChat />
    </SidebarProvider>
  );
};

export default UnifiedLayout;
