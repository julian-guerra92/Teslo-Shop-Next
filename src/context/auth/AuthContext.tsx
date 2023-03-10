
import { createContext } from 'react';
import { IUser } from '../../interfaces';

interface ContextProps {
   isLoggedIn: boolean;
   user?: IUser;
   loginUser: (email: string, password: string) => Promise<boolean>;
   logout: () => void;
   registerUser: (
      firstName: string,
      lastName: string,
      email: string,
      password: string
   ) => Promise<{ hasError: boolean; message?: string | undefined; }>;
}

export const AuthContext = createContext({} as ContextProps);