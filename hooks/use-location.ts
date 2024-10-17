import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState(window.location.hash);

  const handleHashChange = (e: HashChangeEvent) => {
    console.log('hashchange', { e });
    setLocation(window.location.hash);
  };
  useEffect(() => {
    window.onhashchange = handleHashChange;

    return () => {
      window.onhashchange = null;
    };
  });

  return {
    location,
    setLocation,
  };
};
