import React, { createContext, useContext, useState } from 'react';
import { DataContextType, Props, CurrentUserType } from '../utils/interfaces';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import * as Keychain from 'react-native-keychain';
import jwt, {sign} from 'react-native-pure-jwt'
import { Token } from '../utils/interfaces';
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const api: AxiosInstance = axios.create({
    baseURL: 'https://neroappbackend.onrender.com', // Adjust base URL to match your backend API
  });
  







  const getUserById = async (userId: string | null, token: string | null): Promise<{ user: CurrentUserType | null; error: string | null }> => {
    if (!userId || !token) {
      return { user: null, error: "User ID and token are required" };
    }
  
    try {
      const result: AxiosResponse = await api.get(`/auth/getUserById/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
  
      if (result.data.success) {
        return { user: result.data.user, error: null };
      } else {
        return { user: null, error: result.data.message };
      }
    } catch (error: any) {
      console.error('Error fetching user data:', error);
  
      if (axios.isAxiosError(error)) {
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          return { user: null, error: error.response.data.message || "Error fetching user data" };
        } else if (error.request) {
          // The request was made but no response was received
          return { user: null, error: "Network error. Please check your internet connection." };
        }
      }
  
      // Something happened in setting up the request that triggered an Error
      return { user: null, error: "An unexpected error occurred. Please try again." };
    }
  };

  
  const contextValue: DataContextType = {
    token,
    setToken,
    getUserById,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useDataContext = () => {
  const context = useContext(DataContext);
  if (context === undefined) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
};