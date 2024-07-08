/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { SentenceBtnType } from '../../utils/interfaces';
import { styles } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordProps } from '../../utils/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
const SentenceBtn: React.FC<SentenceBtnType> = ({sentenceText, btnText}) => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<ForgotPasswordProps['navigation']>();

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 6, marginTop: 16}}>
      <Text style={[styles.textSubTitleStyle, {color: theme.Main.Black}]}>{sentenceText}</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
        <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>{btnText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SentenceBtn;