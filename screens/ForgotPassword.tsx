/* eslint-disable prettier/prettier */
import React, {useContext, useState} from 'react';
import { ScrollView, SafeAreaView, Dimensions, KeyboardAvoidingView, Platform} from 'react-native';
import { ThemeContext } from '../context/ThemeContext';
import { englishTranslationedSentences } from '../utils/sentences';
import SentenceBtn from '../components/uicomponents/SentenceBtn';
import SendOtpToEmail from '../components/uicomponents/ForgotPasswordComps/SendOtpToEmail';
import ArrowBack from '../components/uicomponents/ArrowBack';
import TitleAndSubTitle from '../components/uicomponents/TitleAndSubTitle';
import OtpInputCom from '../components/uicomponents/ForgotPasswordComps/OtpInputCom';
import { useToken } from '../context/TokenContext';
import ResetPassword from '../components/uicomponents/ForgotPasswordComps/ResetPassword';
import PasswordChanged from '../components/uicomponents/ForgotPasswordComps/PasswordChanged';
const screen = Dimensions.get('window');

const ForgotPassword: React.FC = () => {
  const { theme } = useContext(ThemeContext);
  const {sendOtpEmailAttempt} = useToken();
  const [isloadingOtpSending, setisLoadingOtpSending] = useState(false);
  const [isTypedWrongOtp, setisTypedWrongOtp] = useState(false);
  const [otpNumber, setOtpNumber] = useState<{
    number: string;
    toEmail: string;
  }>({
    number: '',
    toEmail: ''
  });
  const [firstOtpSendingFlag, setOtpSendingFlag] = useState(false); 
  const [otpVerifiedFlag, setOtpVerifiedFlag] = useState(false); 
  const [passwordChangedFlag, setPasswordChangedFlag] = useState(false); 
  const [currentTopSentence, setCurrentTopSentence] = useState(englishTranslationedSentences.forgotPasswordText);
  const [currentBottomSentence, setCurrentBottomSentence] = useState(englishTranslationedSentences.forgotPasswordHelp);

  const sendOtpAgain = async () => {
    setisLoadingOtpSending(true);
    const result = await sendOtpEmailAttempt(otpNumber.toEmail);
    setisLoadingOtpSending(false);
    const { success, data, error } = result;
    setOtpNumber(data.otpNumber);
  }

  const handleOtpAttempt = async (userOtpNumber: string) => {
  if(userOtpNumber === otpNumber.number){
    setOtpVerifiedFlag(true);
    //success code
  }
  else{
    setisTypedWrongOtp(true);
    //failure code
  }
  }

  const handleUserPasswordChange = async (newPassword: string) => {
    console.log(newPassword);
  }


  return (  
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: theme.Background.White }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0} // Adjust offset as needed
    >
    <ArrowBack/>
    <TitleAndSubTitle 
    title={currentTopSentence} 
    subTitle={currentBottomSentence}/>




      <SafeAreaView style={{flex: 1, backgroundColor: theme.Background.White, margin: 4, height: screen.height}}>
        <ScrollView contentContainerStyle={{flexGrow: 1, justifyContent: 'space-between'}}>



         <PasswordChanged/>


          { !firstOtpSendingFlag || !otpVerifiedFlag || !passwordChangedFlag && <SentenceBtn 
            btnText={englishTranslationedSentences.loginText} 
            sentenceText={englishTranslationedSentences.forgotPasswordText}
          />}
        </ScrollView>
      </SafeAreaView>



    </KeyboardAvoidingView>
  );
};

export default ForgotPassword;