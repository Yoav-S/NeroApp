import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { TokenProvider } from './context/TokenContext';
import Main from './components/Main';
import { ToastProvider } from './context/ToastContext';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TokenProvider>

        <DataProvider>

          <ThemeProvider>
          <ToastProvider>
            <Main />
            </ToastProvider>

          </ThemeProvider>

        </DataProvider>

      </TokenProvider>
    </NavigationContainer>
  );
}

export default App;
