import React, { createContext, useContext, useState } from 'react';
import { Theme, ThemeContextType } from '../utils/interfaces';
import { Props } from '../utils/interfaces';

export const ThemeContext = createContext<ThemeContextType>({} as ThemeContextType);

export const ThemeProvider: React.FC<Props> = ({ children }) => {
  const lightTheme: Theme = {
    Main: {
      Black: '#101623',
      BlackGreen: '#02313F',
    },
    Background: {
      White: '#FFFFFF',
      GrayGreen: '#E5EAEB',
    },
    Elements: {
      ButtonDisabled: '#D3D3D9',
      ButtonDefault: '#101623',
      ButtonPressed: '#02313F',
    },
    Text: {
      Black: '#101623',
      AccentIcons: '#101623',
      SecondaryIcons: '#8C8891',
      DisabledIcons: '#F2F2F2',
      ButtonTextPressed: '#EB5757',
      ButtonText: '#FFFFFF',
    },
    Icons: {
      Black: '#101623',
      AccentIcons: '#101623',
      SecondaryIcons: '#8C8891',
      DisabledIcons: '#F2F2F2',
      ButtonTextPressed: '#EB5757',
      ButtonText: '#FFFFFF',
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
    },
    Shadows: {
      ButtonShadow: '0 4px 20px 0 rgba(45, 45, 42, 0.08)',
      ModalShadow: '0 -3px 27px 0 rgba(209, 167, 150, 0.10)',
    },
  };

  const darkTheme: Theme = {
    Main: {
      Black: '#101623',
      BlackGreen: '#02313F',
    },
    Background: {
      White: '#FFFFFF',
      GrayGreen: '#E5EAEB',
    },
    Elements: {
      ButtonDisabled: '#D3D3D9',
      ButtonDefault: '#101623',
      ButtonPressed: '#02313F',
    },
    Text: {
      Black: '#101623',
      AccentIcons: '#101623',
      SecondaryIcons: '#8C8891',
      DisabledIcons: '#F2F2F2',
      ButtonTextPressed: '#EB5757',
      ButtonText: '#FFFFFF',
    },
    Icons: {
      Black: '#101623',
      AccentIcons: '#101623',
      SecondaryIcons: '#8C8891',
      DisabledIcons: '#F2F2F2',
      ButtonTextPressed: '#EB5757',
      ButtonText: '#FFFFFF',
    },
    fonts: {
      regular: 'Roboto-Regular',
      bold: 'Roboto-Bold',
    },
    Shadows: {
      ButtonShadow: '0 4px 20px 0 rgba(45, 45, 42, 0.08)',
      ModalShadow: '0 -3px 27px 0 rgba(209, 167, 150, 0.10)',
    },
  };

  const [theme, setTheme] = useState(lightTheme);

  const value: ThemeContextType = {
    theme,
    setTheme,
    lightTheme,
    darkTheme,
  };

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
