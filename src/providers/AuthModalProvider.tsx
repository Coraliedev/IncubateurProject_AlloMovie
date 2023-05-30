import { useState } from 'react';
import AuthModalContext from '../context/AuthModalContext';

export interface AuthModalProviderProps {
  children?: React.ReactNode;
}

export const AuthModalProvider: React.FC<AuthModalProviderProps> = ({ children
}) => {
  const [modalVisibility, setModalVisibility] = useState("hidden");
  return (
    <AuthModalContext.Provider value={{ modalVisibility, setModalVisibility }}>
      {children}
    </AuthModalContext.Provider>)
};