import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthenticatedStackType } from '../utils/interfaces';
import Home from '../screens/Home';
const AuthenticatedStack = createNativeStackNavigator();
export const AuthenticatedStackScreen: React.FC<AuthenticatedStackType> = () => {
    return (
      <AuthenticatedStack.Navigator>
      <AuthenticatedStack.Screen name="Home" component={Home} /> 
      </AuthenticatedStack.Navigator>
    );
  };