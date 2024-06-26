/* eslint-disable prettier/prettier */
import React,{useContext} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import { englishTranslationedSentences } from '../../utils/sentences';
import { styles } from '../../utils/styles';
import { useNavigation } from '@react-navigation/native';
import { ThemeContext } from '../../context/ThemeContext';
import { SignupScreenProps } from '../../utils/interfaces';
interface Props {
}

const AlreadyHaveAccount: React.FC<Props> = () => {
    const { theme } = useContext(ThemeContext);
    const navigation = useNavigation<SignupScreenProps['navigation']>();

  return (
    <View style={{flexDirection: 'row', alignItems: 'center', gap: 6, alignSelf: 'center', marginTop: '5%'}}>
        <Text style={[styles.textLabelStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.alreadyHaveAccountText}</Text>
        <TouchableOpacity onPress={() => {navigation.navigate("Login")}}>
        <Text style={[styles.forgotPasswordTextStyle, {color: theme.Main.Black}]}>{englishTranslationedSentences.loginText}</Text>
        </TouchableOpacity>
    </View>
  );
};

export default AlreadyHaveAccount;