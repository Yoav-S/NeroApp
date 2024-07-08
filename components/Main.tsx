import React, { useEffect, useContext, useState } from 'react';
import { View, StyleSheet, useColorScheme } from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import * as Keychain from 'react-native-keychain';
import { useToken } from '../context/TokenContext';
import { NotAuthenticatedStackScreen } from '../navigation/NotAuthanticatedStack';
import { AuthenticatedStackScreen } from '../navigation/AuthanticatedStack';
import { useDataContext } from '../context/DataContext';
import LoadingModal from './modals/LoadingModal';

const Main: React.FC = () => {
  const { setTheme, lightTheme, darkTheme, theme } = useContext(ThemeContext);
  const colorScheme = useColorScheme();
  const { setAuthState, authState, validateToken, setCurrentUser } = useToken();
  const [isLoading, setisLoading] = useState(true);
  const { getUserById } = useDataContext();

  useEffect(() => {
    if (colorScheme === 'dark') {
      setTheme(darkTheme);
    } else if (colorScheme === 'light') {
      setTheme(lightTheme);
    }
  }, [colorScheme]);

  useEffect(() => {
    const loadToken = async () => {
      try {
        const credentials = await Keychain.getGenericPassword();
        if (credentials) {
          const token = credentials.password;
          const { isValid, decodedToken } = validateToken(token);
          
          if (isValid && decodedToken && decodedToken.userId) {
            const currentUser = await getUserById(decodedToken.userId, token);
            if (currentUser != null) {
              setCurrentUser(currentUser);
              setAuthState({ token, authenticated: true });
            } else {
              console.log('User not found');
              setAuthState({ token: null, authenticated: false });
            }
          } else {
            console.log('Token is invalid or decodedToken is missing userId');
            setAuthState({ token: null, authenticated: false });
          }
        } else {
          console.log('No valid token found in credentials');
          setAuthState({ token: null, authenticated: false });
        }
        setisLoading(false);
      } catch (error) {
        console.error('Failed to load token:', error);
        setAuthState({ token: null, authenticated: false });
        setisLoading(false);
      }
    };

    loadToken();
  }, []);

  if (isLoading) {
    return <LoadingModal />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.Background.White }]}>
      {authState.authenticated ? (
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
