/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import {View, Text} from 'react-native';
import ArrowBack from '../ArrowBack';
import TitleAndSubTitle from '../TitleAndSubTitle';
import { englishTranslationedSentences } from '../../../utils/sentences';
import { Formik } from 'formik';
import FIInput from '../FIInput';
import FIButton from '../FIButton';
import SentenceBtn from '../SentenceBtn';
import { ThemeContext } from '../../../context/ThemeContext';
import * as Yup from 'yup';
import { emailSchema } from '../../../utils/statements';
import { useToken } from '../../../context/TokenContext';

const validationSchema = Yup.object().shape({
    email: emailSchema,
  });
interface ForgotPasswordProps{
    setOtpNumber: (otpNumber: string) => void;
}

const SendOtpToEmail: React.FC<ForgotPasswordProps> = () => {
    const { theme } = useContext(ThemeContext);
    const [isLoading, setIsLoading] = useState(false);
    const {sendOtpEmailAttempt} = useToken()
    const handleFormSubmit = async (values: {email: string}) => { 
        setIsLoading(true);
        const result = await sendOtpEmailAttempt(values.email);
        setIsLoading(false);
        const { success, data, error } = result;

      }
  return (
    <View>
            <ArrowBack/>
      <TitleAndSubTitle title={englishTranslationedSentences.forgotPasswordText} subTitle={englishTranslationedSentences.forgotPasswordHelp}/>

      <Formik
            initialValues={{ email: '' }}
            validationSchema={validationSchema}
            onSubmit={handleFormSubmit}
           >
          {({ handleChange, handleSubmit, values, errors, isValid  }) => (
            <>
      <FIInput 
      onChangeText={handleChange('email')}
      label={englishTranslationedSentences.emailLabelText} 
      placeholder={englishTranslationedSentences.yourEmailAddressPlaceholder}
      value={values.email}
      />
      
      <FIButton
      backGroundColor={theme.Main.Black}
      buttonPressedBackgroundColor={theme.Elements.ButtonPressed}
      disabledBackgroundColor={theme.Elements.ButtonDisabled}
      textColor={theme.Text.ButtonText}
      text={englishTranslationedSentences.sendCode}
      borderRadius={10}
      onPress={handleSubmit}
      disabled={!isValid  || values.email === '' || isLoading} />
      </>
          )}
        </Formik>
          <SentenceBtn 
          btnText={englishTranslationedSentences.loginText} 
          sentenceText={englishTranslationedSentences.forgotPasswordText}
          />
    </View>
  );
};

export default SendOtpToEmail;