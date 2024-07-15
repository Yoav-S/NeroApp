import React, { createContext, useContext, useState } from 'react';
import { TokenContextType, Token, Props, CurrentUserType } from '../utils/interfaces';
import axios, { AxiosInstance, AxiosResponse, AxiosError } from 'axios';
import * as Keychain from 'react-native-keychain';

import { jwtDecode } from 'jwt-decode';
const TokenContext = createContext<TokenContextType | undefined>(undefined);
const TOKEN_KEY = process.env.TOKEN_KEY



// Type guard for error response






export const TokenProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<Token | null>(null);
  const [currentUser, setCurrentUser] = useState<CurrentUserType | null>(null);
  const [authenticated, setAuthenticated] = useState<boolean>(false);
  const [authState, setAuthState] = useState<{
    token: string | null;
    authenticated: boolean | null;
  }>({
    token: null,
    authenticated: null
  });

  const api: AxiosInstance = axios.create({
    baseURL: 'https://neroappbackend.onrender.com', // Adjust base URL to match your backend API
  });
  

  const validateToken = (token: string | null): {
    isValid: boolean;
    decodedToken: Token | null;
  } => {
    if (!token) {
      return { isValid: false, decodedToken: null };
    }

    try {
      const decodedToken: Token = jwtDecode(token);
      const currentTime = Math.floor(Date.now() / 1000);

      if (decodedToken.exp < currentTime) {
        handleTokenError();
        return { isValid: false, decodedToken };
      }

      return { isValid: true, decodedToken };
    } catch (error) {
      console.error('Failed to decode token:', error);
      return { isValid: false, decodedToken: null };
    }
  };
  const loginAttempt = async (email: string, password: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const result = await api.post('/auth/login', { email, password });
      if (result.data && result.data.user) {
        setAuthState({
          token: result.data.user.token,
          authenticated: true
        });
        console.log(result.data);
        setToken(result.data.user.token);
        setCurrentUser(result.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${result.data.user.token}`;
        await Keychain.setGenericPassword(TOKEN_KEY || '', result.data.user.token);
        
        return { success: true, data: result.data.user, error: result.data.message };
      } else {
        return { success: false, error: result.data.message };
      }
    } catch (error: any) {
      return { success: false, error: error.response.data.message };
    }
  }
  


  
  
  
  
  async function handleTokenError(): Promise<void> {
    // show the dialog 
    logoutAttempt();
  }
  const signupAttempt = async (email: string, password: string, firstName: string, lastName: string, phone: string): Promise<{ success: boolean; data?: any; error?: string }> => {
    try {
      const response = await api.post('/auth/signup', { email, password, firstName, lastName, phone });
      console.log(response.data); 
      return { success: true, data: response.data.user, error: response.data.message };
    } catch (error: any) {
      return { success: false, error: error.message };
    }
  };

  const logoutAttempt = async (): Promise<{ success: boolean; error?: string }> => {
    try {
      // Clear stored credentials
      await Keychain.resetGenericPassword();
      axios.defaults.headers.common['Authorization'] = '';
      setAuthState({
        token: null,
        authenticated: false
      });
      
      return { success: true };
    } catch (error: any) {
      return { success: false, error: 'Error trying to logout' };
    }
  };
  
  const resetPasswordAttempt = async (password: string, email: string): Promise<{isChanged: any; success: boolean; error?: string}> => {
try{
  const response = await api.post(`/auth/resetPassword`, {password, email});
  return { isChanged: response.data, success: true, error: response.data.message };   
} catch (error: any) {
  return { isChanged: false,success: false, error: error.message };
}
  }

  const sendOtpEmailAttempt = async (email: string): Promise<{data?: any; success: boolean; error?: string}> => {
    try {
      console.log('Sending OTP to email:', email);
      const response = await api.post(`/auth/sendEmailOTP/${encodeURIComponent(email)}`);
      console.log('OTP sending response:', response.data.otp);
      if(response.data.otp.length === 4){
        return { data: response.data.otp, success: true, error: response.data.message };
      }
      else{
        return {data: response.data.otp ,success: false, error: response.data.message };// even that it not sended
      }
    } catch (error: any) {
      return { success: false, error: error.message };// even that it not sended
    }
  }
  const loginAsAGuestAttempt = async () => {
    
  }
  return (
    <TokenContext.Provider value={{ 
      token, 
      setToken, 
      loginAttempt, 
      signupAttempt, 
      logoutAttempt, 
      currentUser,
      setCurrentUser, 
      authenticated,
      setAuthenticated,
      setAuthState,
      authState,
      validateToken ,
      sendOtpEmailAttempt,
      resetPasswordAttempt,
      loginAsAGuestAttempt}}>
      {children}
    </TokenContext.Provider>
  );
};

export const useToken = () => {
  const context = useContext(TokenContext);
  if (!context) {
    throw new Error('useToken must be used within a TokenProvider');
  }
  return context;
};