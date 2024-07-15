/* eslint-disable prettier/prettier */
import React, {useContext} from 'react';
import {View, Text, Image} from 'react-native';
import FIButton from '../FIButton';
import { useNavigation } from '@react-navigation/native';
import { ForgotPasswordProps } from '../../../utils/interfaces';
import { ThemeContext } from '../../../context/ThemeContext';
import { englishTranslationedSentences } from '../../../utils/sentences';
interface Props {
}

const PasswordChanged: React.FC<Props> = () => {
  const navigation = useNavigation<ForgotPasswordProps['navigation']>();
  const { theme } = useContext(ThemeContext);

  return (
    <View style={{alignItems: 'center'}}>
            <Image
        source={require('../../../assests/images/openingScreenImage.png')} 
        style={{    width: 190, // Adjust width and height according to your image size requirements
          height: 190,
          marginTop: 94,
          marginBottom: 75,
          marginVertical: 20,}}
        resizeMode='contain'
      /> 
        <FIButton
       disabled={false}
       onPress={() => {navigation.navigate('Login')}}
       backGroundColor={theme.Main.Black}
       buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
       disabledBackgroundColor={theme.Elements.ButtonDisabled}
       textColor={theme.Text.ButtonText}
       text={englishTranslationedSentences.backToLogin}
       borderRadius={10}/>
    </View>
  );
};

export default PasswordChanged;