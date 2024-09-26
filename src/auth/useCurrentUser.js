import { useEffect, useState } from 'react';
import { auth } from '../firebasaeConfig'; // Adjust the import path according to your project structure

const useCurrentUser = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      setCurrentUser(user);
      setLoading(false);
    });

    // Cleanup subscription on unmount
    return () => unsubscribe();
  }, []);

  return [currentUser, loading];
};

export default useCurrentUser;