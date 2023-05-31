import { auth } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const login = async (email: string, password: string) => {
  return await signInWithEmailAndPassword(auth, email, password);
};

export const logout = async () => {
  return await auth.signOut();
};

export const register = async (email: string, password: string) => {
  return await createUserWithEmailAndPassword(auth, email, password);
};
