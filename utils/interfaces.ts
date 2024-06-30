import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { Dispatch, SetStateAction } from "react";
import {TextInput} from 'react-native'
import { AppError } from './errors';
export interface CurrentUserType{
  _id: string;

  fullName: string;

  roles: string[]

  email: string;


  password: string;


  isActive: boolean

  schemaVersion: number

  deviceToken: string

  createdAt: Date

  lastActivity: Date

}
export interface Token {
  exp: number;
  iat: number;
  id: string;
  roles: Role[];
}

export interface Props {
    children?: React.ReactNode
}
export enum Role {
    USER = "user",
    ADMIN = "admin",
    GUEST = "guest"
}

export interface TokenContextType {
  token: Token | null;
  setToken: (token: Token | null) => void;
  signupAttempt: (email: string, password: string, firstName: string, lastName: string, phone: string) => Promise<{ 
      success: boolean; 
      data?: any; 
      error?: AppError 
  }>;
  loginAttempt: (email: string, password: string) => Promise<{ 
      success: boolean; 
      data?: any; 
      error?: AppError 
  }>;
  logoutAttempt: () => Promise<{ 
      success: boolean; 
      error?: AppError 
  }>;
  authenticated: boolean;
  setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>; 
  currentUser: CurrentUserType | null;
  setCurrentUser: (currentUser: CurrentUserType) => void;
  setAuthState: Dispatch<SetStateAction<{ 
      token: string | null; 
      authenticated: boolean | null; 
  }>>; 
  authState: {
      token: string | null;
      authenticated: boolean | null;
  },
  validateToken: (token: string | null) => { 
    isValid: boolean; 
    decodedToken: Token | null 
};
}

  export  interface ThemeContextType {
    theme: Theme;
    setTheme: React.Dispatch<React.SetStateAction<Theme>>;
    lightTheme: Theme;
    darkTheme: Theme;

}
export interface Theme {
  Main: {
    Black: string;
    BlackGreen: string;
  };
  Background: {
    White: string;
    GrayGreen: string;
  };
  Elements: {
    ButtonDisabled: string;
    ButtonDefault: string;
    ButtonPressed: string;
  };
  Text: {
    Black: string;
    AccentIcons: string;
    SecondaryIcons: string;
    DisabledIcons: string;
    ButtonTextPressed: string;
    ButtonText: string;
  };
  Icons: {
    Black: string;
    AccentIcons: string;
    SecondaryIcons: string;
    DisabledIcons: string;
    ButtonTextPressed: string;
    ButtonText: string;
  };
  fonts: {
    regular: string;
    bold: string;
  };
  Shadows: {
    ButtonShadow: string;
    ModalShadow: string;
  };
}


  export interface DataContextType {


    token: string;
    setToken: (token: string) => void;
    getUserById: (userId: string, token: string) => Promise<CurrentUserType | null>
  }
  export interface CurrentUserType {

    _id: string;

    fullName: string;

    roles: string[]

    email: string;

    password: string;

    gender: string

    birthDate: Date

    isActive: boolean

    schemaVersion: number

    deviceToken: string

    createdAt: Date

    transactionsAmount: number

    lastActivity: Date

}
export interface FIButtonType{
  icon?: string
  text: string
  disabled: boolean
  onPress: () => void;
  backGroundColor: string;
  disabledBackgroundColor: string;
  textColor: string;
  borderWidth?: number;
  borderColor?: string;
  borderRadius?: number;
  buttonPressedBackgroundColor?: string;
}
export interface FIInputType{
  placeholder: string;
  onChangeText: (value: string) => void;
  label: string;
  value?: string;
  validator?: boolean;
  errorMessage?: string | undefined;
  startValue?: string;
  isApplied?: boolean;
  isAttempted?: boolean;
  focus?: boolean;
  onPress?: () => void;  // Changed this line
  numeric?: boolean;
  ref?: React.RefObject<TextInput>;
  maxLength?: number;
}
export interface AuthenticatedStackType{
  
}

// Define the parameter list for the NotAuthenticatedStack
export type NotAuthenticatedStackParamList = {
  OpeningScreen: undefined;
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

// Define the props for each screen in the stack
export type OpeningScreenProps = NativeStackScreenProps<
  NotAuthenticatedStackParamList,
  'OpeningScreen'
>;
export type ForgotPasswordProps = NativeStackScreenProps<
  NotAuthenticatedStackParamList,
  'ForgotPassword'
>;
export type LoginScreenProps = NativeStackScreenProps<
  NotAuthenticatedStackParamList,
  'Login'
>;

export type SignupScreenProps = NativeStackScreenProps<
  NotAuthenticatedStackParamList,
  'Signup'
>;
