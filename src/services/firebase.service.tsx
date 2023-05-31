import { useAtom } from "jotai";
import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authVisibilityAtom, isConnectedAtom } from "../atoms";

export const useFirebaseAuth = () => {
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom)
  const [ authVisibility, setAuthVisibility ] = useAtom(authVisibilityAtom)

  const login = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
    setIsConnected(true)
    setAuthVisibility("hidden")
  };

  const logout = async () => {
    await auth.signOut();
    setIsConnected(false)
  };

  const register = async (email: string, password: string) => {
    await createUserWithEmailAndPassword(auth, email, password);
    setIsConnected(true)
    setAuthVisibility("hidden")
  };

  return { login, logout, register, isConnected, authVisibility, setAuthVisibility };
};

