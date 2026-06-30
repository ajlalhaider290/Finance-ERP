import { useEffect, useMemo } from 'react';
import { useCurrentArea } from './useCurrentArea';
import { useDynamicCSS } from './useDynamicCSS';
import { getAreaConfig } from '@/config/areas/areaConfig';

export const useAreaStyles = () => {
  const currentArea = useCurrentArea();
  const areaConfig = getAreaConfig(currentArea);

  // Build the CSS path from the styleSheet property
  const cssPath = useMemo(() => {
    if (!areaConfig.styleSheet) {
      return '';
    }
    return `/style/${areaConfig.styleSheet}`;
  }, [areaConfig.styleSheet]);

  // Dynamically load the CSS file for the current area
  const { isLoading, error } = useDynamicCSS({
    cssPath,
    id: 'dynamic-area-theme-css',
  });

  useEffect(() => {
    const body = document.body;

    // Remove all area classes first
    body.classList.remove('area-default');

    // Add the current area class
    body.classList.add(`area-${currentArea}`);

    // No cleanup needed - classes are removed at the start of the effect
    // This prevents the class from being removed during route changes
  }, [currentArea]);

  // Switch theme by updating data attribute on HTML element
  useEffect(() => {
    // Set data attribute on HTML element for CSS scoping
    document.documentElement.setAttribute('data-area-theme', currentArea);

    // No cleanup needed - we always want a theme active
    // The attribute will be updated when currentArea changes
  }, [currentArea]);

  return {
    currentArea,
    areaClass: `area-${currentArea}`,
    isLoadingCSS: isLoading,
    cssError: error,
  };
};

export default useAreaStyles;
