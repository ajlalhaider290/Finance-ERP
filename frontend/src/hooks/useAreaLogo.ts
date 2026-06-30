import { useMemo } from 'react';
  import { useCurrentArea } from './useCurrentArea';
  import { useAppSelector } from '@/store';
  import { AppArea } from '@/config/areas/areaConfig';

  export const useAreaLogo = () => {
    const currentArea = useCurrentArea();
    const isDarkTheme = useAppSelector((state) => state.session.isDarkTheme);

    const logoPath = useMemo(() => {
      const theme = isDarkTheme ? 'dark' : 'light';

      const projectLightLogo = undefined;
      const projectDarkLogo = undefined;

      const logoMap: Partial<Record<AppArea, {light: string | undefined, dark: string | undefined}>> = {
        
        public: {light: '/logo-light.png', dark: '/logo-dark.png'},
      };

      const areaLogo = logoMap[currentArea as AppArea];

      if(theme === 'light') {
        return areaLogo?.light || projectLightLogo || '/logo.png';
      } else {
        return areaLogo?.dark || projectDarkLogo || '/logo.png';
      }
    }, [currentArea, isDarkTheme]);

    return {
      logoPath,
      currentArea,
      isDarkTheme,
    };
  };

  export default useAreaLogo;