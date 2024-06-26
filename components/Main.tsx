import React, { useEffect, useState, useContext } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { useDataContext } from '../context/DataContext';
import { AuthenticatedStackScreen } from '../navigation/AuthanticatedStack';
import { NotAuthenticatedStackScreen } from '../navigation/NotAuthanticatedStack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Token } from '../utils/interfaces';
import Splash from '../screens/Splash';
import { ThemeContext } from '../context/ThemeContext';
import jwt from 'react-native-pure-jwt';
import { useToken } from '../context/TokenContext';

const Main: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setTheme, lightTheme, darkTheme, theme } = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const {
    authenticated,
    setAuthenticated,
    isLoadingModal,
  } = useDataContext();
  const { token, setToken } = useToken();

  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(darkTheme);
      
    } else if (colorScheme === 'light') {
      setTheme(lightTheme);
    }
  }, [colorScheme]);



  if (isLoading) {
    return <Splash />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.Background.White }]}>
      {authenticated ? (
        <AuthenticatedStackScreen />
      ) : (
        <NotAuthenticatedStackScreen />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Main;
