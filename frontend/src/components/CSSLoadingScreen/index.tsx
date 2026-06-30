import React from 'react';
import { Spinner } from '../ui/spinner';

interface CSSLoadingScreenProps {
  isLoading: boolean;
}

/**
 * Loading screen component displayed while CSS is being loaded
 * Prevents showing incomplete styles during area transitions
 */
export const FullScreenLoader: React.FC<CSSLoadingScreenProps> = ({ isLoading }) => {
  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-50 w-screen h-screen flex items-center justify-center bg-background/90">
      <Spinner />
    </div>
  );
};

export default FullScreenLoader;