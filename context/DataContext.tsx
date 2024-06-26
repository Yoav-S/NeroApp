import React, { createContext, useContext, useState } from 'react';
import { DataContextType, Props, CurrentUserType, Token } from '../utils/interfaces';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import jwt from 'react-native-pure-jwt';
const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<Props> = ({ children }) => {

    const [authenticated, setAuthenticated] = useState<boolean>(false);
    const [isLoadingModal, setisLoadingModal] = useState<boolean>(false);
    const [token, setToken] = useState<string>('');


    const api: AxiosInstance = axios.create({
        baseURL: 'https://scan-and-go.onrender.com/', // Set your base URL
      });  

      const JWT_SECRET = 'YOUR_JWT_SECRET'; // This should match the secret used on your server





    const contextValue: DataContextType = {
        authenticated,
        setAuthenticated,
        isLoadingModal,
      
      };
    
      return (
        <DataContext.Provider value={contextValue}>
          {children}
        </DataContext.Provider>
      );
    };
    
    // Create a custom hook to use the data context
    export const useDataContext = () => {
      const context = useContext(DataContext);
      if (context === undefined) {
        throw new Error('useDataContext must be used within a DataProvider');
      }
      return context;
    };