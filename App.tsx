import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './context/ThemeContext';
import { DataProvider } from './context/DataContext';
import { TokenProvider } from './context/TokenContext';
import Main from './components/Main';

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <TokenProvider>
        <DataProvider>
          <ThemeProvider>
            <Main />
          </ThemeProvider>
        </DataProvider>
      </TokenProvider>
    </NavigationContainer>
  );
}

export default App;
