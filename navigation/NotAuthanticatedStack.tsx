import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Signup from '../screens/Signup';
import OpeningScreen from '../screens/OpeningScreen';
import type { NotAuthenticatedStackParamList } from '../utils/interfaces';
import ForgotPassword from '../screens/ForgotPassword';
const NotAuthenticatedStack = createNativeStackNavigator<NotAuthenticatedStackParamList>();

export const NotAuthenticatedStackScreen: React.FC = () => {
  return (
    <NotAuthenticatedStack.Navigator>
      <NotAuthenticatedStack.Screen 
        options={{ headerShown: false }} 
        name="OpeningScreen" 
        component={OpeningScreen} 
      />
      <NotAuthenticatedStack.Screen 
        options={{ headerShown: false }} 
        name="Login" 
        component={Login} 
      />
      <NotAuthenticatedStack.Screen 
        options={{ headerShown: false }} 
        name="Signup" 
        component={Signup} 
      />
        <NotAuthenticatedStack.Screen 
        options={{ headerShown: false }} 
        name="ForgotPassword" 
        component={ForgotPassword} 
      />
    </NotAuthenticatedStack.Navigator>
  );
};
