/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text} from 'react-native';
import { englishTranslationedSentences } from '../../utils/sentences';
import { styles } from '../../utils/styles';
import { ThemeContext } from '../../context/ThemeContext';
const OrLoginWith: React.FC = () => {
    const { theme } = useContext(ThemeContext);

  return (
    <View style={{alignSelf: 'center', flexDirection: 'row', alignItems:'center', marginTop: '5%'}}>
  <View style={{width: 97, borderWidth: 1, height: 1, margin: '3%', borderColor: theme.Elements.ButtonDisabled}}/>
  <Text style={[styles.textLabelStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.orLoginWithText}</Text>
  <View style={{width: 97, borderWidth: 1, height: 1 , margin: '3%' , borderColor: theme.Elements.ButtonDisabled}}/>
    </View>
  );
};

export default OrLoginWith;