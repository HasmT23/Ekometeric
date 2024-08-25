'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseconfig';

export default function withAuth(WrappedComponent, allowedRoles = []) {
  return function AuthenticatedComponent(props) {
    const router = useRouter();
    const [user, setUser] = useState(null);

    useEffect(() => {
      const unsubscribe = onAuthStateChanged(auth, async (user) => {
        if (user) {
          // Check user role here if needed
          setUser(user);
        } else {
          router.push('/login');
        }
      });

      return () => unsubscribe();
    }, []);

    if (!user) {
      return <div>Loading...</div>;
    }

    return <WrappedComponent {...props} user={user} />;
  };
}
