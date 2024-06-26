import React, { useContext } from 'react';
import {View, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { ThemeContext } from '../../context/ThemeContext';
import { useNavigation } from '@react-navigation/native';

interface Props {
}

const ArrowBack: React.FC<Props> = () => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation();

  return (
    <View style={{margin: '5%'}}>
    <Icon onPress={() => {navigation.goBack()}} name="arrow-left" color={theme.Main.Black} size={25} />
    </View>
  );
};

export default ArrowBack;