import React, { createContext, useContext, useState } from 'react';
import { DataContextType, Props, CurrentUserType } from '../utils/interfaces';
import axios, { AxiosInstance } from 'axios';
import * as Keychain from 'react-native-keychain';
import jwt, {sign} from 'react-native-pure-jwt'
import { Token } from '../utils/interfaces';
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {
  const [token, setToken] = useState<string>('');

  const api: AxiosInstance = axios.create({
    baseURL: 'https://neroapp.onrender.com/',
  });







  const getUserById = async (userId: string | null, token: string | null): Promise<CurrentUserType | null> => {
    try {
      const response = await api.get(`/auth/user/${userId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching user data:', error);
      return null;
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