/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text, Dimensions} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
import LottieView from "lottie-react-native";
import activityIndicatorAnimation from '../../assests/animations/activityIndicator.json'
interface Props {
}
const screen = Dimensions.get('window');

const LoadingModal: React.FC<Props> = () => {
    const { theme } = useContext(ThemeContext);
    const activityIndicatorAnimationObject = (
        <LottieView
          style={{
            width: screen.width * 0.3,
            height: screen.height * 0.2,
            position: 'absolute',
            left: screen.width * 0.35,
            top: screen.height * 0.4,
          }}
          speed={1}
          source={activityIndicatorAnimation}
          autoPlay
          loop={true}
        />
      );
  return (
    <View style={{backgroundColor: theme.Background.loadingModal, position: 'absolute', height: screen.height, width: screen.width}}>
      {activityIndicatorAnimationObject}
    </View>
  );
};

export default LoadingModal;