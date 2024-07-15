/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import ArrowBack from '../ArrowBack';
import TitleAndSubTitle from '../TitleAndSubTitle';
import { englishTranslationedSentences } from '../../../utils/sentences';
import { Formik } from 'formik';
import FIInput from '../FIInput';
import FIButton from '../FIButton';
import { ThemeContext } from '../../../context/ThemeContext';
import { verifyEmail } from '../../../utils/verifications';

interface ForgotPasswordProps{
  setOtpNumber: React.Dispatch<React.SetStateAction<{
    number: string;
    toEmail: string;
  }>>;
  handleSendOtp: (email: string) => void;
  isLoading: boolean;
}

const SendOtpToEmail: React.FC<ForgotPasswordProps> = ({ isLoading, handleSendOtp}) => {
    const { theme } = useContext(ThemeContext);
    const [isTypedWrongEmailFormat, setisTypedWrongEmailFormat] = useState(false);
    const [isTypedWrongPasswordFormat, setisTypedWrongPasswordFormat] = useState(false);
    const [email, setEmail] = useState('');
 const handleFormSubmit = async () => {
  const isVeified = await verifyEmail(email);
  if(isVeified){
    setisTypedWrongEmailFormat(false);
    handleSendOtp(email);
  }
  else{
    setEmail('');
    setisTypedWrongEmailFormat(true);
  }
 }

  return (
    <View>

              <FIInput 
                placeholderError={englishTranslationedSentences.placeHolderEmailErrorMessage}
                errorMessage={englishTranslationedSentences.theEmailIsWrong}
                label={englishTranslationedSentences.emailLabelText} 
                value={email}
                startValue={email}
                onChangeText={(email: string) => {setEmail(email);}}
                placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
                isTypedWrongFormat={isTypedWrongEmailFormat}
                setisTypedWrongFormat={setisTypedWrongEmailFormat}
                />
      
      <FIButton
      backGroundColor={theme.Main.Black}
      buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
      disabledBackgroundColor={theme.Elements.ButtonDisabled}
      textColor={theme.Text.ButtonText}
      text={englishTranslationedSentences.sendCode}
      borderRadius={10}
      onPress={handleFormSubmit}
      disabled={email === '' || isLoading} />

    </View>
  );
};

export default SendOtpToEmail;