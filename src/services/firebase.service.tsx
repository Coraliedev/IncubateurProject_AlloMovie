import { useAtom } from "jotai";
import { auth, db } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { authVisibilityAtom, isConnectedAtom } from "../atoms";
import { doc, setDoc } from "firebase/firestore";
import { useEffect } from "react";

export const useFirebaseAuth = () => {
  const [isConnected, setIsConnected] = useAtom(isConnectedAtom)
  const [authVisibility, setAuthVisibility] = useAtom(authVisibilityAtom)

  useEffect (() => {
 // check if user is connected or not at opening of the app
    auth.onAuthStateChanged((user) => {
      if (user) {
        setIsConnected(true)
      } else {
        setIsConnected(false)
      }
    }
    )
  }, [setIsConnected])

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
    setDoc(doc(db, 'users', email), {
      savedShows: []
    })
  };

  return { login, logout, register, isConnected, authVisibility, setAuthVisibility };
};

