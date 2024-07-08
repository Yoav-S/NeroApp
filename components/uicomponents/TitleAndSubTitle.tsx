/* eslint-disable prettier/prettier */
import React, { useContext } from 'react';
import {View, Text} from 'react-native';
import { styles } from '../../utils/styles';
import { ThemeContext } from '../../context/ThemeContext';

interface Props {
  title: string;
  subTitle: string;
}

const TitleAndSubTitle: React.FC<Props> = ({title, subTitle}) => {
    const { theme } = useContext(ThemeContext);
  return (
    <View style={{width: 322, alignSelf: 'center'}}>
      <Text style={[styles.textTitleStyle, {color: theme.Main.Black}]}>{title}</Text>
      <Text style={[styles.textSubTitleStyle, {color: theme.Main.Black, marginTop: 20}]}>{subTitle}</Text>
    </View>
  );
};

export default TitleAndSubTitle;