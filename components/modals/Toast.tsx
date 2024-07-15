import React, { useContext, useEffect, useRef } from 'react';
import { View, Text, Animated, Dimensions, TouchableOpacity } from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import Icon from 'react-native-vector-icons/FontAwesome';

export interface ToastProps {
  id: number;
  title: string;
  subtitle: string;
  position: 'top' | 'bottom';
  type: 'success' | 'error';
  timestamp: number;
  onDismiss: () => void; // Ensure this callback is properly provided
}

const screen = Dimensions.get('window');

const Toast: React.FC<ToastProps> = ({ title, subtitle, position, type, timestamp, onDismiss }) => {
  const { theme } = useContext(ThemeContext);
  const translateY = useRef(new Animated.Value(position === 'top' ? -screen.height * 0.2 : screen.height * 0.15)).current;

  useEffect(() => {
    // Animate toast in
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
    }).start();

    // Animate toast out after 3 seconds
    const timer = setTimeout(() => {
      dismissToast(); // Dismiss the toast after timeout
    }, 3000);

    return () => {
      clearTimeout(timer);
    };
  }, [timestamp]); // Trigger effect when timestamp changes

  const dismissToast = () => {
    Animated.timing(translateY, {
      toValue: position === 'top' ? -screen.height * 0.2 : screen.height * 0.15,
      duration: 300,
      useNativeDriver: true,
    }).start(() => {
      onDismiss(); // Call onDismiss callback when animation completes
    });
  };

  const handlePress = () => {
    dismissToast(); // Dismiss the toast when clicked
  };

  return (
    <Animated.View
      style={[
        {
          backgroundColor: type === 'success' ? 'rgba(0, 154, 8, 1)' : 'red',
          alignSelf: 'center',
          height: screen.height * 0.14,
          width: screen.width * 0.98,
          position: 'absolute',
          top: position === 'top' ? 5 : undefined,
          bottom: position === 'bottom' ? 15 : undefined,
          borderRadius: 24,
          padding: 12,
          justifyContent: 'center',
          paddingHorizontal: 20,
          paddingVertical: 10,
          transform: [{ translateY }],
        }
      ]}
    >
      <View >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <Text style={{ fontSize: 26, fontWeight: '700', color: theme.Background.White }}>{title}</Text>
            <Text style={{ fontSize: 16, color: theme.Background.White }}>{subtitle}</Text>
          </View>
          <Icon onPress={handlePress} name="remove" size={20} color={theme.Icons.DisabledIcons} style={{ position: 'absolute', right: 0, top: 0 }} />
        </View>
      </View>
    </Animated.View>
  );
};

export default Toast;
