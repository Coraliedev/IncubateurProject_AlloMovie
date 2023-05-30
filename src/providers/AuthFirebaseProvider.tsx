import { useEffect, useState } from 'react';
import AuthFirebaseContext from '../context/AuthFirebaseContext';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';

export interface AuthFirebaseProviderProps {
  children?: React.ReactNode;
}

export const AuthFirebaseProvider: React.FC<AuthFirebaseProviderProps> = ({ children
}) => {
  const [currentUser] = useAuthState(auth);
  const [currentUserUid, setCurrentUserUid] = useState<string | null>(null);

 // Update the current user uid when the currentUser changes
  useEffect(() => {
    if (currentUser) {
      setCurrentUserUid(currentUser.uid);
    } else {
      setCurrentUserUid(null);
    }
  }, [currentUser]);

  const login = async (email: string, password: string) => {
    return await signInWithEmailAndPassword(auth, email, password);
  }

  const logout = async () => {
    return await auth.signOut();
  }

  const register = async (email: string, password: string) => {
    return await createUserWithEmailAndPassword(auth, email, password);
  }

  return (
    <AuthFirebaseContext.Provider value={{ currentUserUid, login, logout, register }}>
      {children}
    </AuthFirebaseContext.Provider>)
};