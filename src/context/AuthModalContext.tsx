import { createContext } from 'react';

interface AuthModalContextType {
  modalVisibility: string;
  setModalVisibility: React.Dispatch<React.SetStateAction<string>>
}

const AuthModalContext = createContext<AuthModalContextType>({
  modalVisibility: '' as string,
  setModalVisibility: {} as React.Dispatch<React.SetStateAction<string>>
});

export default AuthModalContext;