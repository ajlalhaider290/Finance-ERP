import { useEffect } from 'react';
import { AppArea } from '@/config/areas/areaConfig';
interface UseLayoutClassManagementProps {
  layoutType: AppArea;
  isLoggedIn: boolean;
  isDarkTheme: boolean;
  isCompactTheme: boolean;
}

export const useLayoutClassManagement = ({ layoutType, isLoggedIn, isDarkTheme, isCompactTheme }: UseLayoutClassManagementProps) => {
  useEffect(() => {
    if (layoutType === 'default') {
      const contentMain = document.getElementById('contentMain');
      if (contentMain) {
        const hasLoggedInClass = contentMain.classList.contains('loggedIn');

        if (isLoggedIn && !hasLoggedInClass) {
          contentMain.classList.add('loggedIn');
        } else if (!isLoggedIn && hasLoggedInClass) {
          contentMain.classList.remove('loggedIn');
        }
      }
    }
  }, [isLoggedIn, isDarkTheme, isCompactTheme, layoutType]);
};
