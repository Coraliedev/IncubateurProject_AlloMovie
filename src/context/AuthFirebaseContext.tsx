import { createContext } from 'react';
import { UserCredential } from 'firebase/auth';

interface AuthFirebaseContextType {
  currentUserUid : string | null;
  login : (email : string, password : string) => Promise<UserCredential>;
  logout : () => Promise<void>;
  register : (email : string, password : string) => Promise<UserCredential>;
}

const AuthFirebaseContext = createContext<AuthFirebaseContextType>({
  currentUserUid: '' as string | null,
  login : () => Promise.resolve({} as UserCredential),
  logout : () => Promise.resolve(),
  register : () => Promise.resolve({} as UserCredential)
} );

export default AuthFirebaseContext;