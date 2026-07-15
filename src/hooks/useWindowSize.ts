import { useState, useEffect } from 'react';

export interface WindowSize {
  width: number;
  height: number;
}

const getWindowSize = (): WindowSize => {
  if (typeof window === 'undefined') {
    return {
      width: 0,
      height: 0,
    };
  }

  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
};

/**
 * useWindowSize - A hook that tracks the dimensions of the browser window.
 * @returns An object containing the current width and height of the window.
 */
const useWindowSize = (): WindowSize => {
  const [windowSize, setWindowSize] = useState<WindowSize>(getWindowSize);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }

    const handleResize = () => {
      setWindowSize(getWindowSize());
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
};

export default useWindowSize;
