import { useEffect, useState } from 'react';

function useWindowSize() {
  const isClient = typeof window === 'object';

  function getSize() {
    return {
      width: isClient ? window.innerWidth : undefined,
      height: isClient ? window.innerHeight : undefined
    };
  }

  const [windowSize, setWindowSize] = useState(getSize);

  useEffect(() => {
    if (!isClient) {
      return;
    }
  
    function handleResize() {
      setWindowSize(getSize());
    }
  
    window.addEventListener('resize', handleResize);
  
    // The cleanup function is called when the effect is unmounted
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;

}

export default useWindowSize;