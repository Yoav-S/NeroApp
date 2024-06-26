/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import FIButton from './components/UIComponents/FIButton';
import React , {useState}from 'react';
import type {PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import FIInput from './components/UIComponents/FIInput';
import Main from './components/Main';
import { NavigationContainer } from '@react-navigation/native';
import { TokenProvider } from './context/TokenContext';


function App(): React.JSX.Element {


    
  return (
    <NavigationContainer>
    <DataProvider>
      <TokenProvider>
    <ThemeProvider>
<Main/>
    </ThemeProvider>
    </TokenProvider>
    </DataProvider>
    </NavigationContainer>

  );
}

export default App;
