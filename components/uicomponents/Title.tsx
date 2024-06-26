import React, { useContext } from 'react';
import {View, Text} from 'react-native';
import { ThemeContext } from '../../context/ThemeContext';
interface TitleProps {
  name: string;
}

const Title: React.FC<TitleProps> = ({name}) => {
    const { theme } = useContext(ThemeContext);

  return (
    <View style={{alignSelf: 'center'}}>
      <Text style={{color: theme.Elements.ButtonPressed, 
        textAlign: 'center', 
        fontFamily: 'Noto Sans', 
        fontWeight: 700, 
        fontSize: 32, 
        width: 95, 
        marginTop: 68,
        height: 44, }}>{name}</Text>
    </View>
  );
};

export default Title;