
import { FC, useEffect, useReducer } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { tesloApi } from '../../api';
import { IUser } from '../../interfaces';
import { AuthContext, authReducer } from './';

export interface AuthState {
   isLoggedIn: boolean;
   user?: IUser
}

interface Props {
   children: JSX.Element | JSX.Element[];
}

const Auth_INITIAL_STATE: AuthState = {
   isLoggedIn: false,
   user: undefined
}

export const AuthProvider = ({ children }: Props) => {

   const [state, dispatch] = useReducer(authReducer, Auth_INITIAL_STATE);

   useEffect(() => {
      checkToken();
   }, [])

   const checkToken = async () => {
      try {
         const { data } = await tesloApi.get('/user/validate-token');
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'Auth - Login', payload: user });
      } catch (error) {
         Cookies.remove('token');
      }
   }

   const loginUser = async (email: string, password: string): Promise<boolean> => {
      try {
         const { data } = await tesloApi.post('/user/login', { email, password });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'Auth - Login', payload: user });
         return true;
      } catch (error) {
         return false;
      }
   }

   const registerUser = async (
      firstName: string,
      lastName: string,
      email: string,
      password: string
   ): Promise<{ hasError: boolean, message?: string }> => {
      try {
         const { data } = await tesloApi.post('/user/register', { firstName, lastName, email, password });
         const { token, user } = data;
         Cookies.set('token', token);
         dispatch({ type: 'Auth - Login', payload: user });
         return {
            hasError: false
         }
      } catch (error) {
         if (axios.isAxiosError(error)) {
            return {
               hasError: true,
               message: error.response?.data.message
            }
         }
         return {
            hasError: true,
            message: 'Failed to create user. Try again.'
         }
      }
   }

   return (
      <AuthContext.Provider value={{
         ...state,
         //Methods
         loginUser,
         registerUser
      }}>
         {children}
      </AuthContext.Provider>
   )
}