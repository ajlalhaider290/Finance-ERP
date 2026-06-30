import { useMemo } from 'react';
import { RootState, useAppSelector } from '@/store';
import { useCurrentArea } from './useCurrentArea';
import { getAreaConfig } from '@/config/areas/areaConfig';

/**
 * Hook to get area-specific theme information and utilities
 * Useful for component-level theme customization
 */
export const useAreaTheme = () => {
  const currentArea = useCurrentArea();
  const isDarkTheme = useAppSelector((state: RootState) => state.session.isDarkTheme);
  const isCompactTheme = useAppSelector((state: RootState) => state.session.isCompactTheme);
  
  const areaConfig = useMemo(() => getAreaConfig(currentArea), [currentArea]);
  
  return {
    // Current area info
    currentArea,
    areaConfig,
    
    // Theme state
    isDarkTheme,
    isCompactTheme,    
    isArea: (area: string) => currentArea === area,
  };
};

export default useAreaTheme; 