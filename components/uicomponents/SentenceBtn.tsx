/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, TouchableOpacity, KeyboardAvoidingView} from 'react-native';
import { SentenceBtnType } from '../../utils/interfaces';
import { styles } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordProps } from '../../utils/interfaces';
import { ThemeContext } from '../../context/ThemeContext';
const SentenceBtn: React.FC<SentenceBtnType> = ({sentenceText, btnText}) => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<ForgotPasswordProps['navigation']>();

  return (
    <KeyboardAvoidingView style={{ marginTop: 16, flex: 1, justifyContent: 'flex-end', alignItems: 'center', marginBottom: 50}}>
      <View style={{flexDirection: 'row',alignItems: 'center', gap: 6}}>

      <Text style={[styles.textSubTitleStyle, {color: theme.Main.Black}]}>{sentenceText}</Text>
      <TouchableOpacity onPress={() => {navigation.navigate('Login')}}>
        <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>{btnText}</Text>
      </TouchableOpacity>
      </View>

    </KeyboardAvoidingView>
  );
};

export default SentenceBtn;