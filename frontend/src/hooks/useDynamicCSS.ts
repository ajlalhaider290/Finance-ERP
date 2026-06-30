import { useState, useEffect, useRef } from 'react';

interface UseDynamicCSSOptions {
  cssPath: string;
  id?: string;
}

interface UseDynamicCSSReturn {
  isLoading: boolean;
  error: Error | null;
}

/**
 * Hook that dynamically loads CSS files and manages their lifecycle
 * Only loads new CSS if it's different from the currently loaded one
 */
export const useDynamicCSS = ({ cssPath, id = 'dynamic-area-css' }: UseDynamicCSSOptions): UseDynamicCSSReturn => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const previousCSSPath = useRef<string | null>(null);
  const currentLinkElement = useRef<HTMLLinkElement | null>(null);

  useEffect(() => {
    // If the CSS path is the same as the previous one, don't reload
    if (previousCSSPath.current === cssPath) {
      return;
    }

    const loadCSS = async () => {
      setIsLoading(true);
      setError(null);

      try {
        // Create new link element
        const link = document.createElement('link');
        link.id = id;
        link.rel = 'stylesheet';
        link.type = 'text/css';

        // Wait for CSS to load
        await new Promise<void>((resolve, reject) => {
          link.onload = () => resolve();
          link.onerror = () => reject(new Error(`Failed to load CSS: ${cssPath}`));

          // Set href after event listeners are attached
          link.href = cssPath;
          document.head.appendChild(link);
        });

        // Remove old CSS after new one is loaded
        if (currentLinkElement.current) {
          currentLinkElement.current.remove();
        }

        // Update references
        currentLinkElement.current = link;
        previousCSSPath.current = cssPath;

        setIsLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error loading CSS'));
        setIsLoading(false);
      }
    };

    loadCSS();

    // Cleanup function
    return () => {
      // Don't remove on unmount, only when loading a new CSS
      // This prevents flickering when component re-renders
    };
  }, [cssPath, id]);

  return { isLoading, error };
};

export default useDynamicCSS;
